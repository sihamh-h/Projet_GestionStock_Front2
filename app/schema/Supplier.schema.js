import { z } from "zod";

export const supplierSchema = z.object({
  number: z.string().min(1, "Le numéro est requis").max(50),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  companyName: z.string().min(2, "Le nom de la société est requis").max(100),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    "Numéro français invalide"
  ),
});