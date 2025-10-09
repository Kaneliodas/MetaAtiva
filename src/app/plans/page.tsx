
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trainingPlans } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Treino</h1>
          <p className="text-muted-foreground">
            Planos selecionados para ajudá-lo a alcançar seus objetivos de fitness.
          </p>
        </div>
        <Button variant="outline">Criar Plano Personalizado</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainingPlans.map((plan) => {
          const coverImage = PlaceHolderImages.find(
            (p) => p.id === plan.coverImageId
          );
          return (
            <Card key={plan.slug} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                {coverImage && (
                  <div className="aspect-video relative">
                    <Image
                      src={coverImage.imageUrl}
                      alt={plan.title}
                      data-ai-hint={coverImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 pb-2">
                  <Badge variant="secondary" className="mb-2">{plan.level}</Badge>
                  <CardTitle>{plan.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{plan.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/plans/${plan.slug}`}>
                    Ver Plano <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
