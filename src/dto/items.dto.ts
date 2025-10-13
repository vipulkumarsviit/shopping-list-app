import { z } from "zod";

export const createItemSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    quantity: z.number().finite().nonnegative("Quantity must be a non-negative number"),
    unit: z.string().trim().min(1).optional(),
    notes: z.string().trim().min(1).optional()
});

export type CreateItemDTO = z.infer<typeof createItemSchema>;

export const updateItemSchema = z.object({
    name: z.string().trim().min(1).optional(),
    quantity: z.number().finite().nonnegative("Quantity must be a non-negative number").optional(),
    unit: z.string().trim().min(1).optional(),
    notes: z.string().trim().min(1).optional(),
    purchased: z.boolean().optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
});

export type UpdateItemDTO = z.infer<typeof updateItemSchema>;

export const purchasedSchema = z.object({
    purchased: z.boolean()
});
export type PurchasedDTO = z.infer<typeof purchasedSchema>;
