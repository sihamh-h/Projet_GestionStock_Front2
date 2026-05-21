import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  description: z
    .string()
    .max(100, "La description ne peut pas dépasser 100 caractères")
    .optional()
    .or(z.literal("")),
});