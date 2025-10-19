
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
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { trainingChallenges as initialTrainingChallenges } from "@/lib/data";
import { Flame, Star, Zap } from "lucide-react";
import React, { useState } from "react";

type DailyChallenge = typeof initialTrainingChallenges.daily;
type WeeklyChallenge = typeof initialTrainingChallenges.weekly[0];
type Challenge = DailyChallenge | WeeklyChallenge;

export default function TrainingRoomPage() {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(initialTrainingChallenges.daily);
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>(initialTrainingChallenges.weekly);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [newProgress, setNewProgress] = useState(0);

  const handleUpdateClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    if ('currentProgress' in challenge) {
      setNewProgress(challenge.currentProgress);
    } else {
      setNewProgress(challenge.current);
    }
    setIsUpdateDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedChallenge) return;

    if ('currentProgress' in selectedChallenge) { // Daily Challenge
      setDailyChallenge({ ...dailyChallenge, currentProgress: newProgress });
    } else { // Weekly Challenge
      const updatedWeeklyChallenges = weeklyChallenges.map(challenge =>
        challenge.id === selectedChallenge.id ? { ...challenge, current: newProgress } : challenge
      );
      setWeeklyChallenges(updatedWeeklyChallenges);
    }
    setIsUpdateDialogOpen(false);
    setSelectedChallenge(null);
  };
  
  const getChallengeTarget = (challenge: Challenge | null) => {
    if (!challenge) return 100;
    if ('currentProgress' in challenge) return 100; // Daily challenges are percentage based
    return challenge.target;
  }
  
  const getChallengeUnit = (challenge: Challenge | null) => {
    if (!challenge) return '%';
    if ('currentProgress' in challenge) return '%';
    return challenge.unit;
  }


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
          <CardDescription>{dailyChallenge.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{dailyChallenge.details}</p>
          <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Progresso</p>
                <p className="text-sm font-bold">{dailyChallenge.currentProgress}%</p>
            </div>
            <Progress value={dailyChallenge.currentProgress} indicatorClassName="bg-yellow-400" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            Recompensa: {dailyChallenge.reward}
          </div>
          <Button onClick={() => handleUpdateClick(dailyChallenge)}>Registrar Progresso</Button>
        </CardFooter>
      </Card>

      {/* Weekly Challenges */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Desafios Semanais</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {weeklyChallenges.map((challenge) => {
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
                    <Button variant="secondary" onClick={() => handleUpdateClick(challenge)}>Atualizar</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

       {/* Update Progress Dialog */}
       <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Progresso do Desafio</DialogTitle>
            {selectedChallenge && (
                <DialogDescription>
                  Qual é o seu progresso atual para "{selectedChallenge.title}"?
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
                        min={0}
                        max={getChallengeTarget(selectedChallenge)}
                        step={1}
                        onValueChange={(value) => setNewProgress(value[0])}
                        className="w-[80%]"
                    />
                    <span className="font-bold w-[60px] text-center text-sm">
                        {newProgress.toFixed(0)} {getChallengeUnit(selectedChallenge)}
                    </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="progress-input" className="text-right">
                    Valor
                </Label>
                <Input
                    id="progress-input"
                    type="number"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="col-span-3"
                />
              </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveChanges}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
