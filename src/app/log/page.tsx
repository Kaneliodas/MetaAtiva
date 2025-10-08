'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microphone, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { exerciseLog } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { VoiceLogDialog } from './voice-log-dialog';

type WorkoutData = {
  exercise: string;
  sets?: number;
  reps?: number;
  weight?: number;
  unit?: string;
  duration?: number;
  intensity?: number;
  effort?: string;
};


export default function LogPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isVoiceLogOpen, setIsVoiceLogOpen] = useState(false);

    const handleVoiceLogSuccess = (data: Partial<WorkoutData>) => {
        console.log('Received data from voice log:', data);
        setIsVoiceLogOpen(false);
        // Here you would typically pre-fill the form with this data
        // For now, we'll just open the regular form
        setIsFormOpen(true);
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Exercise Log</CardTitle>
            <CardDescription>
              A record of all your completed workouts.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsVoiceLogOpen(true)}>
                <Microphone className="mr-2 h-4 w-4" />
                Log with Voice
            </Button>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Log Workout
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Log New Workout</DialogTitle>
                    <DialogDescription>
                        Add the details of your workout session. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="exercise" className="text-right">Exercise</Label>
                            <Input id="exercise" defaultValue="Bench Press" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sets" className="text-right">Sets</Label>
                            <Input id="sets" type="number" defaultValue="3" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reps" className="text-right">Reps</Label>
                            <Input id="reps" type="number" defaultValue="8" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
                            <Input id="weight" type="number" defaultValue="60" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Perceived Effort</Label>
                            <RadioGroup defaultValue="😐" className="col-span-3 flex gap-2">
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="😊" id="r1" />
                                    <Label htmlFor="r1">😊</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="🙂" id="r2" />
                                    <Label htmlFor="r2">🙂</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="😐" id="r3" />
                                    <Label htmlFor="r3">😐</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="😕" id="r4" />
                                    <Label htmlFor="r4">😕</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="😫" id="r5" />
                                    <Label htmlFor="r5">😫</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" onClick={() => setIsFormOpen(false)}>Save Workout</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <VoiceLogDialog open={isVoiceLogOpen} onOpenChange={setIsVoiceLogOpen} onSuccess={handleVoiceLogSuccess} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Exercise</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Effort</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exerciseLog.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell className="font-medium">{log.exercise}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell className="text-right">{log.effort}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
