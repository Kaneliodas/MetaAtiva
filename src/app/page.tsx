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
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userGoals.length}</div>
            <p className="text-xs text-muted-foreground">Keep pushing!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">New achievement unlocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current BMI</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.5</div>
            <p className="text-xs text-muted-foreground">Healthy range</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity /> Recent Activity
            </CardTitle>
            <CardDescription>
              Here are your latest logged workouts.
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
                View All
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target /> Goal Progress
            </CardTitle>
            <CardDescription>
              You're doing great! Here is your progress.
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
                    <Badge variant="secondary" className="mt-2 text-green-400 border-green-400/50">Completed!</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
             <Button asChild size="sm" className="w-full gap-1">
              <Link href="/goals">
                Manage Goals
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
