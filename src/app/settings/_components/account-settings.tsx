'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conta</CardTitle>
        <CardDescription>
          Gerencie as configurações da sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="usuario@email.com" disabled />
        </div>
        <div className="space-y-2">
            <Label>Notificações</Label>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <p className="text-sm">Receber notificações por email</p>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3">
                <p className="text-sm">Permitir que outros vejam seu perfil</p>
                <Switch defaultChecked />
            </div>
        </div>
         <div className="space-y-2">
            <Label>Mudar Senha</Label>
            <Input id="current-password" type="password" placeholder="Senha Atual" />
            <Input id="new-password" type="password" placeholder="Nova Senha" />
        </div>
      </CardContent>
       <CardFooter className="flex-col items-start gap-4">
        <Button>Atualizar Senha</Button>
        <Button variant="destructive">Deletar Conta</Button>
      </CardFooter>
    </Card>
  );
}
