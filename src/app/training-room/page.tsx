
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
import { Progress } from "@/components/ui/progress";
import { trainingChallenges } from "@/lib/data";
import { Flame, Star, Zap } from "lucide-react";
import React from "react";

export default function TrainingRoomPage() {
  const { daily, weekly } = trainingChallenges;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sala de Treinamento</h1>
          <p className="text-muted-foreground">
            Complete desafios, ganhe recompensas e acelere sua evolução.
          </p>
        </div>
      </div>

      {/* Daily Challenge */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-yellow-400" />
            Desafio Diário
          </CardTitle>
          <CardDescription>{daily.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{daily.details}</p>
          <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Progresso</p>
                <p className="text-sm font-bold">{daily.currentProgress}%</p>
            </div>
            <Progress value={daily.currentProgress} indicatorClassName="bg-yellow-400" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            Recompensa: {daily.reward}
          </div>
          <Button>Registrar Progresso</Button>
        </CardFooter>
      </Card>

      {/* Weekly Challenges */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Desafios Semanais</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {weekly.map((challenge) => {
            const progress = (challenge.current / challenge.target) * 100;
            return (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="text-red-500" />
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>{challenge.details}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold text-primary">
                      {challenge.current}
                      <span className="text-lg text-muted-foreground">
                        /{challenge.target} {challenge.unit}
                      </span>
                    </p>
                    <p className="text-sm font-bold">{Math.round(progress)}%</p>
                  </div>
                  <Progress value={progress} />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary" />
                        Recompensa: {challenge.reward}
                    </div>
                    <Button variant="secondary">Atualizar</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
