import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(2, "Minimum 2 caractères").max(50),
  lastname:  z.string().min(2, "Minimum 2 caractères").max(50),
  username:  z.string().min(3, "Minimum 3 caractères").max(50),
  email: z.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Email invalide"),
  password: z.string()
    .min(12, "Minimum 12 caractères")
    .max(50)
    .regex(/[A-Z]/,           "Doit contenir une majuscule")
    .regex(/[a-z]/,           "Doit contenir une minuscule")
    .regex(/[0-9]/,           "Doit contenir un chiffre")
    .regex(/[#?!@$%^&*\-]/,  "Doit contenir un caractère spécial")
    .regex(/^\S*$/,           "Ne doit pas contenir d'espaces"),
  confirmPassword: z.string(),
  birthdate: z.string()
    .min(1, "Date requise")
    .refine((v) => !isNaN(Date.parse(v)) && new Date(v) < new Date(), "Doit être dans le passé"),
  phoneNumber: z.string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro français invalide"),
  roles: z.array(
    z.enum(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE"])
  ).min(1, "Au moins un rôle requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});