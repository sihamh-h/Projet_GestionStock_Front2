import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(12, "Minimum 12 caractères")
    .max(50)
    .regex(/[A-Z]/, "Doit contenir une majuscule")
    .regex(/[a-z]/, "Doit contenir une minuscule")
    .regex(/[0-9]/, "Doit contenir un chiffre")
    .regex(/[#?!@$%^&*\-]/, "Doit contenir un caractère spécial")
    .regex(/^\S*$/, "Ne doit pas contenir d'espaces"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});