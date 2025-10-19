
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trainingPlans as initialTrainingPlans } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";


type ScheduleDay = {
  day: number;
  exercises: string[];
};


export default function PlansPage() {
  const [trainingPlans, setTrainingPlans] = useState(initialTrainingPlans);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  
  // State for new plan form
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanDescription, setNewPlanDescription] = useState('');
  const [newPlanLevel, setNewPlanLevel] = useState('');
  const [newPlanSchedule, setNewPlanSchedule] = useState<ScheduleDay[]>([{ day: 1, exercises: [''] }]);

  const handleAddDay = () => {
    setNewPlanSchedule([...newPlanSchedule, { day: newPlanSchedule.length + 1, exercises: [''] }]);
  };

  const handleRemoveDay = (index: number) => {
    const updatedSchedule = newPlanSchedule.filter((_, i) => i !== index)
      .map((day, i) => ({ ...day, day: i + 1 }));
    setNewPlanSchedule(updatedSchedule);
  };
  
  const handleAddExercise = (dayIndex: number) => {
    const updatedSchedule = [...newPlanSchedule];
    updatedSchedule[dayIndex].exercises.push('');
    setNewPlanSchedule(updatedSchedule);
  };

  const handleExerciseChange = (dayIndex: number, exerciseIndex: number, value: string) => {
    const updatedSchedule = [...newPlanSchedule];
    updatedSchedule[dayIndex].exercises[exerciseIndex] = value;
    setNewPlanSchedule(updatedSchedule);
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedSchedule = [...newPlanSchedule];
    updatedSchedule[dayIndex].exercises = updatedSchedule[dayIndex].exercises.filter((_, i) => i !== exerciseIndex);
    setNewPlanSchedule(updatedSchedule);
  };
  
  const handleSavePlan = () => {
      const scheduleObject = newPlanSchedule.reduce((acc, current) => {
        const dayKey = `Dia ${current.day}`;
        acc[dayKey] = current.exercises.filter(ex => ex.trim() !== '');
        return acc;
      }, {} as Record<string, string[]>);

      const newPlan = {
          slug: newPlanTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          title: newPlanTitle,
          description: newPlanDescription,
          level: newPlanLevel,
          coverImageId: 'plan-cover-1', // Default or random image
          schedule: scheduleObject
      };
      
      setTrainingPlans(prev => [newPlan, ...prev]);
      
      // Reset form and close dialog
      setIsAddPlanDialogOpen(false);
      setNewPlanTitle('');
      setNewPlanDescription('');
      setNewPlanLevel('');
      setNewPlanSchedule([{ day: 1, exercises: [''] }]);
  }


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Treino</h1>
          <p className="text-muted-foreground">
            Planos selecionados para ajudá-lo a alcançar seus objetivos de fitness.
          </p>
        </div>
        <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Criar Plano Personalizado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Plano Personalizado</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para criar seu próprio plano de treino.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="grid gap-4 py-4 px-6">
                <div className="space-y-2">
                  <Label htmlFor="plan-title">Título</Label>
                  <Input id="plan-title" placeholder="Ex: Força Total" value={newPlanTitle} onChange={(e) => setNewPlanTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-description">Descrição</Label>
                  <Textarea id="plan-description" placeholder="Uma breve descrição do seu plano." value={newPlanDescription} onChange={(e) => setNewPlanDescription(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-level">Nível</Label>
                  <Select value={newPlanLevel} onValueChange={setNewPlanLevel}>
                      <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Iniciante">Iniciante</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                          <SelectItem value="Todos os Níveis">Todos os Níveis</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                    <Label>Cronograma</Label>
                    {newPlanSchedule.map((day, dayIndex) => (
                      <Card key={dayIndex} className="bg-muted/50 p-4">
                        <CardHeader className="p-0 pb-4">
                            <CardTitle className="text-lg flex justify-between items-center">
                                <span>Dia {day.day}</span>
                                {newPlanSchedule.length > 1 && (
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveDay(dayIndex)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className="flex items-center gap-2">
                              <Input 
                                placeholder={`Exercício ${exerciseIndex + 1}`} 
                                value={exercise}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, e.target.value)}
                              />
                               {day.exercises.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                               )}
                            </div>
                          ))}
                           <Button variant="outline" size="sm" onClick={() => handleAddExercise(dayIndex)}>
                              <Plus className="mr-2 h-4 w-4" /> Adicionar Exercício
                           </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="secondary" className="w-full" onClick={handleAddDay}>
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Dia de Treino
                    </Button>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="px-6 pb-4">
              <Button type="submit" onClick={handleSavePlan}>
                Salvar Plano
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainingPlans.map((plan) => {
          const coverImage = PlaceHolderImages.find(
            (p) => p.id === plan.coverImageId
          );
          return (
            <Card key={plan.slug} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                {coverImage && (
                  <div className="aspect-video relative">
                    <Image
                      src={coverImage.imageUrl}
                      alt={plan.title}
                      data-ai-hint={coverImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 pb-2">
                  <Badge variant="secondary" className="mb-2">{plan.level}</Badge>
                  <CardTitle>{plan.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{plan.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/plans/${plan.slug}`}>
                    Ver Plano <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

    