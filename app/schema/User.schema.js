import { z } from "zod";

export const userSchema = z.object({
  firstname:   z.string().min(2, "Minimum 2 caractères").max(50),
  lastname:    z.string().min(2, "Minimum 2 caractères").max(50),
  email:       z.string().email("Email invalide"),
  phoneNumber: z.string().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    "Numéro français invalide"
  ),
  birthdate: z.string()
    .min(1, "Date requise")
    .refine((v) => !isNaN(Date.parse(v)) && new Date(v) < new Date(), "Date invalide"),
  roles: z.array(
    z.enum(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE"])
  ).min(1, "Au moins un rôle requis"),
});