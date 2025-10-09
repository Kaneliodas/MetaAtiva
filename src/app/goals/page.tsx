
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

type Goal = typeof initialUserGoals[0];

export default function GoalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [userGoals, setUserGoals] = useState(initialUserGoals);
  const [newProgress, setNewProgress] = useState("");

  const handleUpdateClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setNewProgress(goal.current.toString());
    setIsUpdateDialogOpen(true);
  };
  
  const handleSaveChanges = () => {
    if (selectedGoal) {
      const updatedGoals = userGoals.map(goal =>
        goal.id === selectedGoal.id ? { ...goal, current: Number(newProgress) } : goal
      );
      setUserGoals(updatedGoals);
    }
    setIsUpdateDialogOpen(false);
    setSelectedGoal(null);
    setNewProgress("");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suas Metas</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie suas ambições de fitness.
          </p>
        </div>
        <DialogTrigger asChild>
           <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Meta
          </Button>
        </DialogTrigger>
      </div>
      
      {/* Add Goal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
      
      {/* Update Progress Dialog */}
       <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Progresso</DialogTitle>
            <DialogDescription>
              Você está quase lá! Qual é o seu progresso atual para "{selectedGoal?.title}"?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right">
                Progresso Atual
              </Label>
              <Input
                id="progress"
                type="number"
                value={newProgress}
                onChange={(e) => setNewProgress(e.target.value)}
                className="col-span-3"
              />
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
          const progress = Math.min(
            (goal.current / goal.target) * 100,
            100
          );
          const isCompleted = goal.current >= goal.target;

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
         <Card className="flex flex-col items-center justify-center border-dashed cursor-pointer hover:border-primary transition-colors" onClick={() => setIsAddDialogOpen(true)}>
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
      </div>
    </div>
  );
}
