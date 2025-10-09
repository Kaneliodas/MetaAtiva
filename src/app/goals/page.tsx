
'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { userGoals as initialUserGoals } from "@/lib/data";
import { Plus, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type Goal = typeof initialUserGoals[0];

export default function GoalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [userGoals, setUserGoals] = useState(initialUserGoals);
  const [newProgress, setNewProgress] = useState(0);

  const handleUpdateClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setNewProgress(goal.current);
    setIsUpdateDialogOpen(true);
  };
  
  const handleSaveChanges = () => {
    if (selectedGoal) {
      const updatedGoals = userGoals.map(goal =>
        goal.id === selectedGoal.id ? { ...goal, current: newProgress } : goal
      );
      setUserGoals(updatedGoals);
    }
    setIsUpdateDialogOpen(false);
    setSelectedGoal(null);
  };
  
  const isWeightLossGoal = selectedGoal?.title.toLowerCase().includes('perder peso') && selectedGoal?.unit === 'kg';
  const sliderMin = isWeightLossGoal ? selectedGoal?.target ?? 0 : 0;
  const sliderMax = isWeightLossGoal ? selectedGoal?.start ?? selectedGoal?.target ?? 100 : selectedGoal?.target ?? 100;


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suas Metas</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie suas ambições de fitness.
          </p>
        </div>
      </div>
      
       <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Progresso</DialogTitle>
            {selectedGoal && (
                <DialogDescription>
                Você está quase lá! Qual é o seu progresso atual para "{selectedGoal.title}"?
                </DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="progress" className="text-right">
                    Progresso
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                    <Slider
                        value={[newProgress]}
                        min={sliderMin}
                        max={sliderMax}
                        step={isWeightLossGoal ? 0.1 : 1}
                        onValueChange={(value) => setNewProgress(value[0])}
                        className="w-[80%]"
                    />
                    <span className="font-bold w-[50px] text-center text-sm">
                        {newProgress.toFixed(isWeightLossGoal ? 1 : 0)}
                    </span>
                </div>
              </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userGoals.map((goal) => {
          const isWeightLoss = goal.title.toLowerCase().includes('perder peso') && goal.unit === 'kg';
          
          let progress = 0;
          let isCompleted = false;

          if (isWeightLoss) {
              const startWeight = goal.start ?? goal.target; 
              const totalToLose = startWeight - goal.target;
              if (totalToLose > 0) {
                const weightLost = startWeight - goal.current;
                progress = (weightLost / totalToLose) * 100;
              }
              isCompleted = goal.current <= goal.target;
          } else {
              progress = (goal.current / goal.target) * 100;
              isCompleted = goal.current >= goal.target;
          }
          
          progress = Math.max(0, Math.min(progress, 100));


          return (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{goal.title}</span>
                  {isCompleted && (
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  )}
                </CardTitle>
                <CardDescription>
                  Meta: {goal.target} {goal.unit}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center text-4xl font-bold text-primary">
                  {goal.current}
                  <span className="text-lg text-muted-foreground">
                    /{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="mt-4">
                  <Progress value={progress} indicatorClassName="bg-accent" />
                </div>
              </CardContent>
              <CardFooter>
                {isCompleted ? (
                  <Badge
                    variant="outline"
                    className="w-full justify-center text-green-400 border-green-400/50 py-2"
                  >
                    Meta Concluída!
                  </Badge>
                ) : (
                  <Button variant="secondary" className="w-full" onClick={() => handleUpdateClick(goal)}>
                    Atualizar Progresso
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center border-dashed cursor-pointer hover:border-primary transition-colors min-h-[200px]">
                    <CardHeader>
                    <CardTitle>Criar Nova Meta</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Button size="lg" variant="outline">
                        <Plus className="mr-2 h-5 w-5" />
                        Adicionar Nova Meta
                    </Button>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar Nova Meta</DialogTitle>
                <DialogDescription>
                Defina o que você quer alcançar. Você consegue!
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                    Título
                </Label>
                <Input
                    id="title"
                    defaultValue="Correr 5km"
                    className="col-span-3"
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                    Valor Alvo
                </Label>
                <Input
                    id="target"
                    type="number"
                    defaultValue="5"
                    className="col-span-3"
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                    Unidade
                </Label>
                <Select defaultValue="km">
                    <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="km">km (quilômetros)</SelectItem>
                    <SelectItem value="kg">kg (quilogramas)</SelectItem>
                    <SelectItem value="sessoes">sessões</SelectItem>
                    <SelectItem value="min">minutos</SelectItem>
                    <SelectItem value="reps">reps</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Salvar Meta
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
