
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recipes } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Clock, Utensils, Heart, BookCheck, Flame, Beef, Wheat, Carrot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = recipes.find((p) => p.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  const coverImage = PlaceHolderImages.find(
    (p) => p.id === recipe.coverImageId
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{recipe.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {recipe.description}
          </p>
          <div className="mt-4 flex items-center flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Preparo: {recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Cozimento: {recipe.cookTime}</span>
              </div>
               <div className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                <span>Serve: {recipe.servings}</span>
              </div>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Favoritar
            </Button>
            <Button>
                <BookCheck className="mr-2 h-4 w-4" />
                Registrar Refeição
            </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
           {recipe.nutrition && (
            <Card>
              <CardHeader>
                <CardTitle>Análise Nutricional</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-2 bg-muted rounded-lg">
                  <Flame className="mx-auto h-6 w-6 mb-1 text-red-500" />
                  <p className="font-bold text-lg">{recipe.nutrition.calories}</p>
                  <p className="text-xs text-muted-foreground">Calorias</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <Beef className="mx-auto h-6 w-6 mb-1 text-blue-500" />
                  <p className="font-bold text-lg">{recipe.nutrition.protein}</p>
                  <p className="text-xs text-muted-foreground">Proteínas</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <Wheat className="mx-auto h-6 w-6 mb-1 text-yellow-500" />
                  <p className="font-bold text-lg">{recipe.nutrition.carbs}</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <Carrot className="mx-auto h-6 w-6 mb-1 text-green-500" />
                  <p className="font-bold text-lg">{recipe.nutrition.fat}</p>
                  <p className="text-xs text-muted-foreground">Gorduras</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
                        <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                    {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
            {coverImage &&
                <Card className="overflow-hidden">
                    <div className="aspect-video relative">
                    <Image
                        src={coverImage.imageUrl}
                        alt={recipe.title}
                        data-ai-hint={coverImage.imageHint}
                        fill
                        className="object-cover"
                    />
                    </div>
                </Card>
            }
           <Button variant="outline" asChild className="w-full">
            <Link href="/recipes">Voltar para Todas as Receitas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
