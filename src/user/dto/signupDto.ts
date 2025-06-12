import { z } from 'zod';

export const signupDtoSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

export type SignupDtoSchema = z.infer<typeof signupDtoSchema>;