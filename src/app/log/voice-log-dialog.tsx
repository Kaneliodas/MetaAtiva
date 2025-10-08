
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { voiceActivatedWorkoutLogging, VoiceActivatedWorkoutLoggingOutput } from '@/ai/flows/voice-activated-workout-logging';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type VoiceLogDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: VoiceActivatedWorkoutLoggingOutput) => void;
};

export function VoiceLogDialog({ open, onOpenChange, onSuccess }: VoiceLogDialogProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleParse = async () => {
    if (!inputText.trim()) {
      setError('Por favor, forneça uma descrição do seu treino.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const result = await voiceActivatedWorkoutLogging(inputText);
      toast({
        title: "Treino Analisado!",
        description: "Seu formulário de treino foi pré-preenchido.",
      });
      onSuccess(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      setError(`Falha ao analisar o treino: ${errorMessage}`);
       toast({
        variant: "destructive",
        title: "Falha na Análise",
        description: `Não foi possível entender o treino. Tente novamente ou preencha o formulário manualmente.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar com Voz</DialogTitle>
          <DialogDescription>
            Descreva seu treino em voz alta (ou digite abaixo). Por exemplo, "Eu fiz 3 séries de 10 repetições de supino com 70 quilos".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="workout-description">Descrição do Treino</Label>
            <Textarea
              id="workout-description"
              placeholder="Digite o que você diria aqui..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleParse} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Analisando...' : 'Analisar Treino'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
