import { z } from 'zod';

export const signinDto = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninDto = z.infer<typeof signinDto>;