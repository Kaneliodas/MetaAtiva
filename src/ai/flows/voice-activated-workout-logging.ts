'use server';

/**
 * @fileOverview A voice-activated workout logging AI agent.
 *
 * - voiceActivatedWorkoutLogging - A function that handles the workout logging process from voice input.
 * - VoiceActivatedWorkoutLoggingInput - The input type for the voiceActivatedWorkoutLogging function.
 * - VoiceActivatedWorkoutLoggingOutput - The return type for the voiceActivatedWorkoutLogging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceActivatedWorkoutLoggingInputSchema = z.string().describe('The voice input describing the workout.');
export type VoiceActivatedWorkoutLoggingInput = z.infer<typeof VoiceActivatedWorkoutLoggingInputSchema>;

const VoiceActivatedWorkoutLoggingOutputSchema = z.object({
  exercise: z.string().describe('The name of the exercise performed.'),
  sets: z.number().int().positive().describe('The number of sets performed.'),
  reps: z.number().int().positive().describe('The number of repetitions performed in each set.'),
  weight: z.number().positive().optional().describe('The weight used for the exercise, if applicable.'),
  unit: z.string().optional().describe('The unit of weight used (e.g., kg, lbs), if applicable.'),
});
export type VoiceActivatedWorkoutLoggingOutput = z.infer<typeof VoiceActivatedWorkoutLoggingOutputSchema>;

export async function voiceActivatedWorkoutLogging(input: VoiceActivatedWorkoutLoggingInput): Promise<VoiceActivatedWorkoutLoggingOutput> {
  return voiceActivatedWorkoutLoggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceActivatedWorkoutLoggingPrompt',
  input: {schema: VoiceActivatedWorkoutLoggingInputSchema},
  output: {schema: VoiceActivatedWorkoutLoggingOutputSchema},
  prompt: `You are a personal workout assistant who parses voice input to extract workout details.

  Given the following voice input, extract the exercise, sets, reps, weight and unit.

  Voice Input: {{{$input}}}

  Ensure that sets, reps and weights are positive numbers. If weight is not applicable, omit it.
  Also omit the unit if weight is not applicable.
  If the user doesn't specify a weight unit assume it is in kg.
  Output in JSON format.
  `,
});

const voiceActivatedWorkoutLoggingFlow = ai.defineFlow(
  {
    name: 'voiceActivatedWorkoutLoggingFlow',
    inputSchema: VoiceActivatedWorkoutLoggingInputSchema,
    outputSchema: VoiceActivatedWorkoutLoggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
