
'use client';

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { achievementsData as initialAchievementsData } from "@/lib/data";
import { Award, Lock, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Achievement = (typeof initialAchievementsData)[0];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievementsData);
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    const allCategories = achievements.map(a => a.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    if (filter === 'all') {
      return achievements;
    }
    return achievements.filter(a => a.category === filter);
  }, [achievements, filter]);

  const unlockedCount = useMemo(() => achievements.filter(a => a.isUnlocked).length, [achievements]);
  const totalCount = achievements.length;
  const totalPoints = useMemo(() => achievements.reduce((sum, a) => a.isUnlocked ? sum + parseInt(a.reward.split(' ')[0]) : sum, 0), [achievements]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suas Conquistas</h1>
          <p className="text-muted-foreground">
            Sua galeria de troféus e desafios superados.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Conquistas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-bold">{unlockedCount} / {totalCount}</span>
                <span className="text-muted-foreground">Conquistas Desbloqueadas</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="font-bold">{totalPoints}</span>
                 <span className="text-muted-foreground">Pontos Totais</span>
            </div>
        </CardContent>
      </Card>
      
      <Separator />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Galeria</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'Todas as Categorias' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAchievements.map(achievement => (
          <Card 
            key={achievement.id}
            className={cn(
                "flex flex-col items-center justify-center p-6 text-center transition-all duration-300",
                achievement.isUnlocked 
                    ? "border-yellow-400/50 bg-amber-500/5 hover:shadow-lg hover:shadow-yellow-500/10" 
                    : "bg-muted/50"
            )}
          >
            <div className={cn(
                "mb-4 flex h-20 w-20 items-center justify-center rounded-full",
                 achievement.isUnlocked ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" : "bg-muted-foreground/20 text-muted-foreground"
            )}>
              {achievement.isUnlocked ? (
                <Award className="h-10 w-10" />
              ) : (
                <Lock className="h-10 w-10" />
              )}
            </div>
            <CardTitle className="text-lg mb-1">{achievement.title}</CardTitle>
            <CardDescription className="text-xs mb-3">
                <Badge variant={achievement.isUnlocked ? "default" : "secondary"} className={cn(achievement.isUnlocked && "bg-yellow-500/20 text-yellow-700 border-yellow-500/50")}>{achievement.category}</Badge>
            </CardDescription>
            <p className="text-sm text-muted-foreground mb-4 h-12">
              {achievement.description}
            </p>
            <div className="flex items-center gap-2 font-semibold">
              <Star className={cn("h-4 w-4", achievement.isUnlocked ? "text-yellow-500" : "text-muted-foreground/50")} />
              <span>{achievement.reward}</span>
            </div>
            {achievement.isUnlocked && (
                 <div className="mt-4 flex items-center text-green-500 text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Desbloqueado</span>
                 </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
