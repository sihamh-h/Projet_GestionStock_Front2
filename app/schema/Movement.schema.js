import { z } from "zod";

export const movementSchema = z.object({
  productId: z
    .number({ invalid_type_error: "L'ID produit doit être un nombre" })
    .positive("L'ID produit doit être positif"),

  type: z.enum(["IN", "OUT"], {
    errorMap: () => ({ message: "Le type doit être IN ou OUT" }),
  }),

  quantity: z
    .number({ invalid_type_error: "La quantité doit être un nombre" })
    .positive("La quantité doit être positive")
    .int("La quantité doit être un entier"),
});