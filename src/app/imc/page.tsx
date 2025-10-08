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
import { useState } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';

export default function ImcPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

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
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 24.9) return 'Healthy Weight';
    if (bmiValue < 29.9) return 'Overweight';
    return 'Obesity';
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IMC / BMI</h1>
          <p className="text-muted-foreground">
            Calculate and track your Body Mass Index.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>
              Enter your height and weight to calculate your BMI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                placeholder="e.g., 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateBmi} className="w-full">
              Calculate BMI
            </Button>
            {bmi !== null && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Your BMI is</p>
                <p className="text-5xl font-bold text-primary">{bmi}</p>
                <p className="font-semibold">{getBmiCategory(bmi)}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BMI Evolution</CardTitle>
            <CardDescription>Your BMI trend over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={bmiHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                        content={<ChartTooltipContent />}
                        cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.5 }}
                    />
                    <Line type="monotone" dataKey="bmi" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Body Measurements</CardTitle>
            <CardDescription>A log of your body measurements over time.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Chest</TableHead>
                        <TableHead>Waist</TableHead>
                        <TableHead>Hips</TableHead>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
