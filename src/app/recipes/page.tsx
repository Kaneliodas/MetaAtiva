
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
import { recipes } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Plus, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function RecipesPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Livro de Receitas</h1>
            <p className="text-muted-foreground">
              Inspirações saudáveis para potencializar seus resultados.
            </p>
          </div>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Receita
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
           <div className="flex gap-2 flex-wrap">
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tipo de Refeição" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="breakfast">Café da manhã</SelectItem>
                        <SelectItem value="lunch">Almoço</SelectItem>
                        <SelectItem value="dinner">Jantar</SelectItem>
                        <SelectItem value="snack">Lanche</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="easy">Fácil</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tempo de Preparo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">Até 10 min</SelectItem>
                        <SelectItem value="30">10–30 min</SelectItem>
                        <SelectItem value="31">+30 min</SelectItem>
                    </SelectContent>
                </Select>
           </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Mais Filtros
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuLabel>Objetivo Fitness</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Ganho de massa</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Emagrecimento</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Manutenção</DropdownMenuCheckboxItem>
                <DropdownMenuLabel className="mt-2">Tipo de Dieta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Vegetariana</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Vegana</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Cetogênica</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Low carb</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Rica em proteínas</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>


        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Receita</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da sua nova receita.
              </DialogDescription>
            </DialogHeader>
            <div className="grid max-h-[70vh] gap-6 py-4 overflow-y-auto px-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipe-name" className="text-right">
                  Nome
                </Label>
                <Input id="recipe-name" className="col-span-3" placeholder="Ex: Salmão Grelhado com Legumes" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipe-description" className="text-right">
                  Descrição
                </Label>
                <Textarea id="recipe-description" className="col-span-3" placeholder="Uma breve descrição da sua receita." />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipe-photo" className="text-right">
                  Foto
                </Label>
                <Input id="recipe-photo" type="file" className="col-span-3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prep-time">Tempo de Preparo</Label>
                  <Input id="prep-time" placeholder="Ex: 15 min" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="cook-time">Tempo de Cozimento</Label>
                  <Input id="cook-time" placeholder="Ex: 20 min" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="servings" className="text-right">
                  Porções
                </Label>
                <Input id="servings" type="number" className="col-span-3" placeholder="Ex: 2" />
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="ingredients" className="text-right mt-2">
                  Ingredientes
                </Label>
                <Textarea id="ingredients" className="col-span-3" placeholder="Liste cada ingrediente em uma nova linha." rows={6} />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="instructions" className="text-right mt-2">
                  Modo de Preparo
                </Label>
                <Textarea id="instructions" className="col-span-3" placeholder="Descreva o passo a passo do preparo." rows={8} />
              </div>
              
               <div className="col-span-4">
                  <Label>Informação Nutricional (Opcional)</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                       <Input placeholder="Calorias (kcal)" />
                       <Input placeholder="Proteínas (g)" />
                       <Input placeholder="Carboidratos (g)" />
                       <Input placeholder="Gorduras (g)" />
                  </div>
              </div>

            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>Salvar Receita</Button>
            </DialogFooter>
          </DialogContent>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => {
            const coverImage = PlaceHolderImages.find(
              (p) => p.id === recipe.coverImageId
            );
            return (
              <Card key={recipe.slug} className="overflow-hidden flex flex-col">
                <CardHeader className="p-0">
                  {coverImage && (
                    <div className="aspect-video relative">
                      <Image
                        src={coverImage.imageUrl}
                        alt={recipe.title}
                        data-ai-hint={coverImage.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 pb-2">
                    <CardTitle>{recipe.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{recipe.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/recipes/${recipe.slug}`}>
                      Ver Receita <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
}

    