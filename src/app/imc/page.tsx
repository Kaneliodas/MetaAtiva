
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bmiHistory, bodyMeasurements } from '@/lib/data';
import { useState, useEffect } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';

const chartConfig = {
  bmi: {
    label: 'IMC',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function ImcPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const savedHeight = localStorage.getItem('userHeight');
    const savedWeight = localStorage.getItem('userWeight');
    if (savedHeight) {
      setHeight(savedHeight);
    }
    if (savedWeight) {
      setWeight(savedWeight);
    }
  }, []);

  useEffect(() => {
    if (height) {
      localStorage.setItem('userHeight', height);
    }
    if (weight) {
      localStorage.setItem('userWeight', weight);
    }
  }, [height, weight]);

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h / 100) ** 2;
      setBmi(parseFloat(bmiValue.toFixed(1)));
    } else {
      setBmi(null);
    }
  };

  const getBmiCategory = (bmiValue: number | null) => {
    if (bmiValue === null) return '';
    if (bmiValue < 18.5) return 'Abaixo do peso';
    if (bmiValue < 24.9) return 'Peso saudável';
    if (bmiValue < 29.9) return 'Sobrepeso';
    return 'Obesidade';
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IMC / BMI</h1>
          <p className="text-muted-foreground">
            Calcule e acompanhe seu Índice de Massa Corporal.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de IMC</CardTitle>
            <CardDescription>
              Insira sua altura e peso para calcular seu IMC.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                type="number"
                id="height"
                placeholder="ex: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                type="number"
                id="weight"
                placeholder="ex: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateBmi} className="w-full">
              Calcular IMC
            </Button>
            {bmi !== null && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Seu IMC é</p>
                <p className="text-5xl font-bold text-primary">{bmi}</p>
                <p className="font-semibold">{getBmiCategory(bmi)}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Evolução do IMC</CardTitle>
            <CardDescription>Sua tendência de IMC nos últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={bmiHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                          content={<ChartTooltipContent />}
                          cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.5 }}
                      />
                      <Line type="monotone" dataKey="bmi" stroke="var(--color-bmi)" strokeWidth={2} dot={{ fill: 'var(--color-bmi)', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Medidas Corporais</CardTitle>
            <CardDescription>Um registro de suas medidas corporais ao longo do tempo.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full whitespace-nowrap">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Peito</TableHead>
                        <TableHead>Cintura</TableHead>
                        <TableHead>Quadril</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bodyMeasurements.map((m, i) => (
                        <TableRow key={i}>
                            <TableCell>{m.date}</TableCell>
                            <TableCell>{m.chest}</TableCell>
                            <TableCell>{m.waist}</TableCell>
                            <TableCell>{m.hips}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
