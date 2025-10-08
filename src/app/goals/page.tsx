
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
import { userGoals } from "@/lib/data";
import { Plus, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GoalsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Suas Metas</h1>
            <p className="text-muted-foreground">
              Acompanhe e gerencie suas ambições de fitness.
            </p>
          </div>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Meta
            </Button>
          </DialogTrigger>
        </div>

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
            <Button type="submit" onClick={() => setIsDialogOpen(false)}>
              Salvar Meta
            </Button>
          </DialogFooter>
        </DialogContent>

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
                    <Button variant="secondary" className="w-full">
                      Atualizar Progresso
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center border-dashed cursor-pointer hover:border-primary transition-colors">
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
        </div>
      </Dialog>
    </div>
  );
}
