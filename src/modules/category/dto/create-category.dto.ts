import { z } from 'zod';

export const createCategoryInputSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    userId: z.string().min(1, 'UserId is required'),
    description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;
