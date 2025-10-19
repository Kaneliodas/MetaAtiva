
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from "@/components/ui/progress";
import { trainingChallenges as initialTrainingChallenges, challengeHistory as initialChallengeHistory } from "@/lib/data";
import { Flame, Star, Zap, CheckCircle2, History, TrendingUp, Trophy } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type DailyChallenge = typeof initialTrainingChallenges.daily;
type WeeklyChallenge = typeof initialTrainingChallenges.weekly[0];
type ChallengeHistoryItem = typeof initialChallengeHistory[0];


export default function TrainingRoomPage() {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(initialTrainingChallenges.daily);
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>(initialTrainingChallenges.weekly);
  const [challengeHistory, setChallengeHistory] = useState<ChallengeHistoryItem[]>(initialChallengeHistory);
  
  const [selectedChallenge, setSelectedChallenge] = useState<WeeklyChallenge | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('all');

  const { monthlyProgress, totalPoints } = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const challengesThisMonth = challengeHistory.filter(c => {
        const [day, month, year] = c.date.split('/');
        return parseInt(month, 10) - 1 === currentMonth && parseInt(year, 10) === currentYear;
    });

    const completedChallenges = challengesThisMonth.filter(c => c.status === 'Concluído').length;
    const monthlyProgress = challengesThisMonth.length > 0 ? (completedChallenges / challengesThisMonth.length) * 100 : 0;
    
    const totalPoints = challengeHistory.reduce((sum, challenge) => sum + (challenge.status === 'Concluído' ? challenge.points : 0), 0);
    
    return { monthlyProgress, totalPoints };
  }, [challengeHistory]);

  const handleCompleteDailyChallenge = () => {
    if (dailyChallenge.currentProgress < 100) {
      setDailyChallenge({ ...dailyChallenge, currentProgress: 100 });
      
      const newHistoryItem: ChallengeHistoryItem = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        title: dailyChallenge.title,
        status: 'Concluído',
        points: parseInt(dailyChallenge.reward.split(' ')[0]),
      };
      setChallengeHistory([newHistoryItem, ...challengeHistory]);
    }
  };
  
  const handleUpdateClick = (challenge: WeeklyChallenge) => {
    setSelectedChallenge(challenge);
    setNewProgress(challenge.current);
    setIsUpdateDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedChallenge) {
      const updatedChallenges = weeklyChallenges.map(challenge =>
        challenge.id === selectedChallenge.id ? { ...challenge, current: newProgress } : challenge
      );
      setWeeklyChallenges(updatedChallenges);

      // Check if the challenge is now completed
      if (newProgress >= selectedChallenge.target) {
        // Avoid adding duplicate history entries if it's already completed and in history
        const challengeInHistory = challengeHistory.find(
          (item) => item.challengeId === selectedChallenge.id
        );

        if (!challengeInHistory) {
          const newHistoryItem: ChallengeHistoryItem = {
            id: Date.now(),
            challengeId: selectedChallenge.id,
            date: new Date().toLocaleDateString('pt-BR'),
            title: selectedChallenge.title,
            status: 'Concluído',
            points: parseInt(selectedChallenge.reward.split(' ')[0]),
          };
          setChallengeHistory([newHistoryItem, ...challengeHistory]);
        }
      }
    }
    setIsUpdateDialogOpen(false);
    setSelectedChallenge(null);
  };
  
  const isDailyChallengeCompleted = dailyChallenge.currentProgress >= 100;

  const monthOptions = useMemo(() => {
    const months = new Set<string>();
    challengeHistory.forEach(item => {
      const [day, month, year] = item.date.split('/');
      months.add(`${month}/${year}`);
    });
    return Array.from(months).sort((a,b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');
      return new Date(parseInt(yearB), parseInt(monthB) -1).getTime() - new Date(parseInt(yearA), parseInt(monthA) - 1).getTime();
    });
  }, [challengeHistory]);
  
  const filteredHistory = useMemo(() => {
    if (selectedMonth === 'all') {
      return challengeHistory;
    }
    return challengeHistory.filter(item => {
      const [day, month, year] = item.date.split('/');
      return `${month}/${year}` === selectedMonth;
    })
  }, [selectedMonth, challengeHistory]);

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

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Seu Progresso Mensal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>Pontuação Total: {totalPoints}</span>
                </div>
                <span>{Math.round(monthlyProgress)}%</span>
            </div>
            <Progress value={monthlyProgress} />
            <CardDescription>
                Esta barra de progresso reseta todo mês. Continue firme para alcançar 100%!
            </CardDescription>
        </CardContent>
      </Card>


      {/* Daily Challenge */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-yellow-400" />
            Desafio Diário
          </CardTitle>
          <CardDescription>{dailyChallenge.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{dailyChallenge.details}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            Recompensa: {dailyChallenge.reward}
          </div>
          {isDailyChallengeCompleted ? (
             <Badge variant="outline" className="border-green-400/50 text-green-400">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Concluído!
              </Badge>
          ) : (
            <Button onClick={handleCompleteDailyChallenge}>Marcar como Concluído</Button>
          )}
        </CardFooter>
      </Card>

      {/* Weekly Challenges */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Desafios Semanais</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {weeklyChallenges.map((challenge) => {
            const progress = Math.min(100, (challenge.current / challenge.target) * 100);
            const isCompleted = challenge.current >= challenge.target;

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
                    {isCompleted ? (
                       <Badge variant="outline" className="border-green-400/50 text-green-400">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Concluído!
                        </Badge>
                    ) : (
                      <Button variant="secondary" onClick={() => handleUpdateClick(challenge)}>Atualizar</Button>
                    )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      
       <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Progresso do Desafio</DialogTitle>
             {selectedChallenge && (
                <DialogDescription>
                  Atualize seu progresso para "{selectedChallenge.title}".
                </DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
             {selectedChallenge && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="progress" className="text-right">
                        Progresso ({selectedChallenge.unit})
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                        <Slider
                            value={[newProgress]}
                            min={0}
                            max={selectedChallenge.target}
                            step={1}
                            onValueChange={(value) => setNewProgress(value[0])}
                            className="w-[80%]"
                        />
                        <span className="font-bold w-[50px] text-center text-sm">
                            {newProgress}
                        </span>
                    </div>
              </div>
             )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Challenge History */}
      <Card>
        <CardHeader>
           <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <History />
                    Histórico de Desafios
                </CardTitle>
                <CardDescription>
                    Seu desempenho nos desafios anteriores.
                </CardDescription>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Meses</SelectItem>
                {monthOptions.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Desafio</TableHead>
                <TableHead>Pontos</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="font-semibold text-primary">{item.status === 'Concluído' ? `+${item.points}` : '-'}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn(
                      item.status === 'Concluído' ? "text-green-500 border-green-500/50" : "text-destructive border-destructive/50"
                    )}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
