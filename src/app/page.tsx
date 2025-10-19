
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  PlusCircle,
  Target,
  Trophy,
  BarChart,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { recentActivities, userGoals } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 flex-wrap">
        <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treinos Esta Semana</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 desde a semana passada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userGoals.length}</div>
            <p className="text-xs text-muted-foreground">Continue firme!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Concluídas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Nova conquista desbloqueada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IMC Atual</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.5</div>
            <p className="text-xs text-muted-foreground">Faixa saudável</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity /> Atividade Recente
            </CardTitle>
            <CardDescription>
              Aqui estão seus últimos treinos registrados.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.exercise}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/log">
                Ver Tudo
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target /> Progresso das Metas
            </CardTitle>
            <CardDescription>
              Você está indo ótimo! Aqui está o seu progresso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userGoals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                  <Progress
                    value={(goal.current / goal.target) * 100}
                    indicatorClassName="bg-accent"
                  />
                  {goal.current >= goal.target && (
                    <Badge variant="secondary" className="mt-2 text-green-400 border-green-400/50">Concluído!</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
             <Button asChild size="sm" className="w-full gap-1">
              <Link href="/goals">
                Gerenciar Metas
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
