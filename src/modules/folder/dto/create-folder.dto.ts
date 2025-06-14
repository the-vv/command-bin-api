import z from "zod";

export const createFolderInputSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    userId: z.string(),
});

export type CreateFolderInput = z.infer<typeof createFolderInputSchema>;