import { z } from "zod";

export const createUserSchema = z.object({
  firstname:   z.string().min(2, "Minimum 2 caractères").max(50),
  lastname:    z.string().min(2, "Minimum 2 caractères").max(50),
  email:       z.string().email("Email invalide").min(6).max(50),
  username:    z.string().min(3, "Minimum 3 caractères").max(50),
  phoneNumber: z.string().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    "Numéro français invalide"
  ),
  birthdate: z.string()
    .min(1, "Date requise")
    .refine((v) => !isNaN(Date.parse(v)) && new Date(v) < new Date(), "Doit être dans le passé"),
  roles: z.array(
    z.enum(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE"])
  ).min(1, "Au moins un rôle requis"),
});