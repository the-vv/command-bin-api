import { ESource } from "src/models/commons";
import { z } from "zod";

export const nameSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
})
export type TNameSchema = z.infer<typeof nameSchema>;


export const sourceSchema = z.object({
    source: z.nativeEnum(ESource),
    sourceId: z.string().optional(),
}).refine(
    (data) => {
        if (data.source === ESource.CATEGORY || data.source === ESource.FOLDER) {
            return !!data.sourceId && data.sourceId.length > 0;
        }
        return true;
    },
    {
        message: "sourceId is required when source is category or folder",
        path: ["sourceId"],
    }
);
export type TSourceSchema = z.infer<typeof sourceSchema>;