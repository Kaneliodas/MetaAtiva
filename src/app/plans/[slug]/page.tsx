
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trainingPlans } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = trainingPlans.find((p) => p.slug === params.slug);

  if (!plan) {
    notFound();
  }

  const coverImage = PlaceHolderImages.find(
    (p) => p.id === plan.coverImageId
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <div>
          <Badge className="mb-2">{plan.level}</Badge>
          <h1 className="text-4xl font-bold tracking-tight">{plan.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {plan.description}
          </p>
        </div>
        <Button size="lg">Iniciar Este Plano</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Treino</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="day-1">
                {Object.entries(plan.schedule).map(([day, exercises], index) => (
                  <AccordionItem value={`day-${index + 1}`} key={day}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {day}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pl-4">
                        {exercises.map((exercise, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
                            <span>{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
            {coverImage &&
                <Card className="overflow-hidden">
                    <div className="aspect-video relative">
                    <Image
                        src={coverImage.imageUrl}
                        alt={plan.title}
                        data-ai-hint={coverImage.imageHint}
                        fill
                        className="object-cover"
                    />
                    </div>
                </Card>
            }
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral do Plano</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Nível:</strong> {plan.level}</p>
                <p><strong>Frequência:</strong> {Object.keys(plan.schedule).length} dias por semana</p>
                <p><strong>Foco:</strong> Varia por dia</p>
            </CardContent>
          </Card>
           <Button variant="outline" asChild className="w-full">
            <Link href="/plans">Voltar para Todos os Planos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
