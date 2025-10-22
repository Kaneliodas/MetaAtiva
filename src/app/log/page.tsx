
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { exerciseLog as initialExerciseLog } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LogPage() {
  const [logs, setLogs] = useState(initialExerciseLog);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<number | null>(null);
  
  // State for form fields
  const [exercise, setExercise] = useState('Supino');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('8');
  const [weight, setWeight] = useState('60');
  const [effort, setEffort] = useState(5);

  const handleSaveWorkout = () => {
    if (!exercise || !sets || !reps) return; // Basic validation

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
      exercise: exercise,
      details: `${sets} séries, ${reps} reps, ${weight}kg`,
      effort: effort,
    };

    setLogs([newLog, ...logs]);
    
    // Close dialog and reset form
    setIsFormOpen(false);
    setExercise('Supino');
    setSets('3');
    setReps('8');
    setWeight('60');
    setEffort(5);
  };

  const confirmDeleteLog = () => {
    if (logToDelete !== null) {
      setLogs(logs.filter(log => log.id !== logToDelete));
      setLogToDelete(null);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Registro de Exercícios</CardTitle>
            <CardDescription>
              Um registro de todos os seus treinos concluídos.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Registrar Treino
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Registrar Novo Treino</DialogTitle>
                    <DialogDescription>
                        Adicione os detalhes da sua sessão de treino. Clique em salvar quando terminar.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="exercise" className="text-left md:text-right">Exercício</Label>
                            <Input id="exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} className="col-span-1 md:col-span-3" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="sets" className="text-left md:text-right">Séries</Label>
                            <Input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} className="col-span-1 md:col-span-3" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="reps" className="text-left md:text-right">Reps</Label>
                            <Input id="reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="col-span-1 md:col-span-3" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="weight" className="text-left md:text-right">Peso (kg)</Label>
                            <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="col-span-1 md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label className="text-left md:text-right">Esforço (0-10)</Label>
                            <div className="col-span-1 md:col-span-3 flex items-center gap-4">
                              <Slider
                                value={[effort]}
                                max={10}
                                step={1}
                                onValueChange={(value) => setEffort(value[0])}
                              />
                               <span className="font-bold w-6 text-center">{effort}</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" onClick={handleSaveWorkout}>Salvar Treino</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Exercício</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Esforço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.date.replace(/-/g, '/')}</TableCell>
                    <TableCell className="font-medium">{log.exercise}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{log.effort}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setLogToDelete(log.id)}>
                          <Trash2 className="h-4 w-4 text-primary" />
                          <span className="sr-only">Deletar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <AlertDialog open={logToDelete !== null} onOpenChange={(open) => !open && setLogToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente este registro de treino.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteLog} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Deletar
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
