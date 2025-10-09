
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recipes } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecipesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Livro de Receitas</h1>
          <p className="text-muted-foreground">
            Inspirações saudáveis para potencializar seus resultados.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Receita
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => {
          const coverImage = PlaceHolderImages.find(
            (p) => p.id === recipe.coverImageId
          );
          return (
            <Card key={recipe.slug} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                {coverImage && (
                  <div className="aspect-video relative">
                    <Image
                      src={coverImage.imageUrl}
                      alt={recipe.title}
                      data-ai-hint={coverImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 pb-2">
                  <CardTitle>{recipe.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{recipe.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/recipes/${recipe.slug}`}>
                    Ver Receita <ArrowRight className="ml-2 h-4 w-4" />
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
