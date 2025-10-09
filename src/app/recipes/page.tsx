
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
import { Badge } from "@/components/ui/badge";


export default function RecipesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Livro de Receitas</h1>
            <p className="text-muted-foreground">
              Inspirações saudáveis para potencializar seus resultados.
            </p>
          </div>
          <Button asChild>
            <Link href="/recipes/new">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Receita
            </Link>
          </Button>
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
                    <div className="flex flex-wrap gap-2 mb-2">
                        {recipe.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
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
    </div>
  );
}
