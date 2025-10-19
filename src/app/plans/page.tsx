
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
import { ArrowRight, Plus } from "lucide-react";
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


export default function PlansPage() {
  const [trainingPlans, setTrainingPlans] = useState(initialTrainingPlans);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);

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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Plano Personalizado</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para criar seu próprio plano de treino.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-title" className="text-right">
                  Título
                </Label>
                <Input id="plan-title" placeholder="Ex: Força Total" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-description" className="text-right">
                  Descrição
                </Label>
                <Textarea id="plan-description" placeholder="Uma breve descrição do seu plano." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-level" className="text-right">
                  Nível
                </Label>
                <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="todos">Todos os Níveis</SelectItem>
                    </SelectContent>
                </Select>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-schedule" className="text-right">
                  Cronograma
                </Label>
                <Textarea id="plan-schedule" placeholder="Ex: Dia 1: Peito e Tríceps..." className="col-span-3" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddPlanDialogOpen(false)}>
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
