
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
import { recipes as allRecipes } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Plus, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from 'react';
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
    const [mealType, setMealType] = useState('all');
    const [difficulty, setDifficulty] = useState('all');
    const [prepTime, setPrepTime] = useState('all');
    const [extraFilters, setExtraFilters] = useState<string[]>([]);


    const filteredRecipes = useMemo(() => {
        let recipes = allRecipes;

        if (mealType !== 'all') {
            recipes = recipes.filter(r => r.tags.some(tag => tag.toLowerCase() === mealType));
        }

        if (difficulty !== 'all') {
            recipes = recipes.filter(r => r.difficulty.toLowerCase() === difficulty);
        }
        
        if (prepTime !== 'all') {
            const maxTime = parseInt(prepTime, 10);
            if (maxTime === 10) {
                 recipes = recipes.filter(r => parseInt(r.prepTime.replace(' min', '')) <= 10);
            } else if (maxTime === 30) {
                recipes = recipes.filter(r => {
                    const time = parseInt(r.prepTime.replace(' min', ''));
                    return time > 10 && time <= 30;
                });
            } else if (maxTime === 31) {
                recipes = recipes.filter(r => parseInt(r.prepTime.replace(' min', '')) > 30);
            }
        }

        if (extraFilters.length > 0) {
            recipes = recipes.filter(r => extraFilters.every(filter => r.tags.map(t => t.toLowerCase().replace(' ', '-')).includes(filter)));
        }

        return recipes;

    }, [mealType, difficulty, prepTime, extraFilters]);

    const handleExtraFilterChange = (filter: string, checked: boolean) => {
        setExtraFilters(prev => 
            checked ? [...prev, filter] : prev.filter(f => f !== filter)
        );
    }
  
    const extraFilterOptions = {
        'Objetivo Fitness': ['ganho-de-massa', 'emagrecimento', 'manutencao'],
        'Tipo de Dieta': ['vegetariana', 'vegana', 'cetogenica', 'low-carb', 'rica-em-proteinas'],
    }

    const getLabelForFilter = (filter: string) => {
        return filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

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
                <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tipo de Refeição" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="café da manhã">Café da manhã</SelectItem>
                        <SelectItem value="almoço">Almoço</SelectItem>
                        <SelectItem value="jantar">Jantar</SelectItem>
                        <SelectItem value="lanche">Lanche</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="fácil">Fácil</SelectItem>
                        <SelectItem value="médio">Médio</SelectItem>
                        <SelectItem value="difícil">Difícil</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={prepTime} onValueChange={setPrepTime}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tempo de Preparo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Qualquer</SelectItem>
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
                   {extraFilters.length > 0 && <Badge variant="secondary" className="ml-2">{extraFilters.length}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                {Object.entries(extraFilterOptions).map(([label, options]) => (
                    <React.Fragment key={label}>
                        <DropdownMenuLabel>{label}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {options.map(option => (
                             <DropdownMenuCheckboxItem
                                key={option}
                                checked={extraFilters.includes(option)}
                                onCheckedChange={(checked) => handleExtraFilterChange(option, !!checked)}
                             >
                                {getLabelForFilter(option)}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => {
            const coverImage = PlaceHolderImages.find(
              (p) => p.id === recipe.coverImageId
            );
            return (
              <Card key={recipe.slug} className="overflow-hidden flex flex-col animate-in fade-in duration-300 transition-all hover:scale-105 hover:shadow-xl">
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
