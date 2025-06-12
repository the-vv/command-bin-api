import { z } from 'zod';

export const signinDtoSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninDtoSchema = z.infer<typeof signinDtoSchema>;