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
import { userGoals } from "@/lib/data";
import { Plus, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GoalsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Goals</h1>
          <p className="text-muted-foreground">
            Track and manage your fitness ambitions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userGoals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.current >= goal.target;

          return (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{goal.title}</span>
                  {isCompleted && <Trophy className="w-6 h-6 text-yellow-400" />}
                </CardTitle>
                <CardDescription>
                  Target: {goal.target} {goal.unit}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center text-4xl font-bold text-primary">
                  {goal.current}
                  <span className="text-lg text-muted-foreground">/{goal.target} {goal.unit}</span>
                </div>
                <div className="mt-4">
                  <Progress value={progress} indicatorClassName="bg-accent" />
                </div>
              </CardContent>
              <CardFooter>
                {isCompleted ? (
                   <Badge variant="outline" className="w-full justify-center text-green-400 border-green-400/50 py-2">
                    Goal Achieved!
                  </Badge>
                ) : (
                  <Button variant="secondary" className="w-full">
                    Update Progress
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
         <Card className="flex flex-col items-center justify-center border-dashed">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Add New Goal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
