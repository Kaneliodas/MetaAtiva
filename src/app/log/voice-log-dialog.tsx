
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
      setError('Please provide a description of your workout.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const result = await voiceActivatedWorkoutLogging(inputText);
      toast({
        title: "Workout Parsed!",
        description: "Your workout form has been pre-filled.",
      });
      onSuccess(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to parse workout: ${errorMessage}`);
       toast({
        variant: "destructive",
        title: "Parsing Failed",
        description: `Could not understand the workout. Please try again or fill the form manually.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log with Voice</DialogTitle>
          <DialogDescription>
            Describe your workout out loud (or type it below). For example, "I did 3 sets of 10 reps of bench press with 150 pounds".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="workout-description">Workout Description</Label>
            <Textarea
              id="workout-description"
              placeholder="Type what you would say here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleParse} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Parsing...' : 'Parse Workout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
