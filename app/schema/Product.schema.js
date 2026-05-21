import { z } from "zod";

export const productSchema = z.object({
  reference: z
    .string()
    .min(1, "La référence est obligatoire")
    .max(50, "La référence ne peut pas dépasser 50 caractères"),

  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  description: z
    .string()
    .max(100, "La description ne peut pas dépasser 100 caractères")
    .optional()
    .or(z.literal("")),

  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le prix doit être un nombre" })
      .nonnegative("Le prix doit être positif ou zéro")
  ),

  actualStock: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le stock doit être un nombre" })
      .int("Le stock doit être un entier")
      .nonnegative("Le stock doit être positif ou zéro")
  ),

  minStock: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le stock minimum doit être un nombre" })
      .int("Le stock minimum doit être un entier")
      .nonnegative("Le stock minimum doit être positif ou zéro")
  ),

  categoryName: z
    .string()
    .min(1, "La catégorie est obligatoire"),

  imageUrl: z
    .string()
    .url("URL invalide")
    .optional()
    .or(z.literal("")),
});