
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewRecipePage() {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/recipes">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Criar Nova Receita</h1>
                    <p className="text-muted-foreground">
                        Preencha os detalhes da sua nova receita.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalhes da Receita</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipe-name">Nome da Receita</Label>
                            <Input id="recipe-name" placeholder="Ex: Salmão Grelhado com Legumes" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recipe-photo">Foto</Label>
                            <Input id="recipe-photo" type="file" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="recipe-description">Descrição</Label>
                        <Textarea id="recipe-description" placeholder="Uma breve descrição da sua receita." />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="prep-time">Tempo de Preparo</Label>
                            <Input id="prep-time" placeholder="Ex: 15 min" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cook-time">Tempo de Cozimento</Label>
                            <Input id="cook-time" placeholder="Ex: 20 min" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="servings">Porções</Label>
                            <Input id="servings" type="number" placeholder="Ex: 2" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="ingredients">Ingredientes</Label>
                        <Textarea id="ingredients" placeholder="Liste cada ingrediente em uma nova linha." rows={8} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instructions">Modo de Preparo</Label>
                        <Textarea id="instructions" placeholder="Descreva o passo a passo do preparo." rows={10} />
                    </div>
                     <div className="space-y-2">
                        <Label>Informação Nutricional (Opcional)</Label>
                        <Card className="p-4 bg-muted/50">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input placeholder="Calorias (kcal)" />
                                <Input placeholder="Proteínas (g)" />
                                <Input placeholder="Carboidratos (g)" />
                                <Input placeholder="Gorduras (g)" />
                            </div>
                        </Card>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild>
                           <Link href="/recipes">Cancelar</Link>
                        </Button>
                        <Button>Salvar Receita</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
