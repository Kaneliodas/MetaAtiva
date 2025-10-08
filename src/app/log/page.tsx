
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

export default function LogPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [effort, setEffort] = useState(5);


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Registro de Exercícios</CardTitle>
            <CardDescription>
              Um registro de todos os seus treinos concluídos.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="exercise" className="text-right">Exercício</Label>
                            <Input id="exercise" defaultValue="Supino" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sets" className="text-right">Séries</Label>
                            <Input id="sets" type="number" defaultValue="3" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reps" className="text-right">Reps</Label>
                            <Input id="reps" type="number" defaultValue="8" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="weight" className="text-right">Peso (kg)</Label>
                            <Input id="weight" type="number" defaultValue="60" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Esforço (0-10)</Label>
                            <div className="col-span-3 flex items-center gap-4">
                              <Slider
                                defaultValue={[effort]}
                                max={10}
                                step={1}
                                onValueChange={(value) => setEffort(value[0])}
                              />
                               <span className="font-bold w-6 text-center">{effort}</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" onClick={() => setIsFormOpen(false)}>Salvar Treino</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Exercício</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead className="text-right">Esforço (0-10)</TableHead>
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
