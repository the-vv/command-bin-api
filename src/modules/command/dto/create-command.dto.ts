import { z } from 'zod';

export const createCommandInputSchema = z.object({
    command: z.string().min(1, 'Command is required'),
    userId: z.string().min(1, 'UserId is required'),
    description: z.string().optional(),
});

export type CreateCommandInput = z.infer<typeof createCommandInputSchema>;
