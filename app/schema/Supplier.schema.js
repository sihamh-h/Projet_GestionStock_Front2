import { z } from "zod";

export const supplierSchema = z.object({
  number: z
    .string()
    .min(1, "Le numéro est requis")
    .max(50, "Maximum 50 caractères"),

  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Maximum 50 caractères"),

  companyName: z
    .string()
    .max(50, "Maximum 50 caractères")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .max(50, "Maximum 50 caractères")
    .optional()
    .or(z.literal("")),

  siret: z
    .string()
    .regex(/^\d{14}$/, "Le SIRET doit contenir exactement 14 chiffres")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("Email invalide")
    .max(100, "Maximum 100 caractères"),

  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro français invalide"
    ),

  address: z
    .string()
    .max(100, "Maximum 100 caractères")
    .optional()
    .or(z.literal("")),
});