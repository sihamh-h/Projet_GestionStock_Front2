import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email invalide")
    .min(6, "L'email doit contenir au moins 6 caractères")
    .max(50, "L'email ne peut pas dépasser 50 caractères"),

  password: z
    .string()
    .min(12, "Le mot de passe doit contenir au moins 12 caractères")
    .max(50, "Le mot de passe ne peut pas dépasser 50 caractères")
    .regex(/[A-Z]/, "Doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Doit contenir au moins un chiffre")
    .regex(/[#?!@$%^&*\-]/, "Doit contenir au moins un caractère spécial")
    .regex(/^\S*$/, "Ne doit pas contenir d'espaces"),
});