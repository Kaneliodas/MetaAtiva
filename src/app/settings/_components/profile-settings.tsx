'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Público</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" defaultValue="Seu Nome" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Conte um pouco sobre você..."
            defaultValue="Entusiasta de fitness e vida saudável."
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
}
