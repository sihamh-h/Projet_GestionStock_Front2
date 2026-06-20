import { z } from "zod";

export const movementSchema = z.object({
 type: z.union([
  z.enum(["IN", "OUT"]),
  z.array(z.enum(["IN", "OUT"])).transform((arr) => arr[0]),
], {
  errorMap: () => ({ message: "Le type doit être IN ou OUT" }),
}),

  quantity: z.coerce
    .number({ invalid_type_error: "La quantité doit être un nombre" })
    .positive("La quantité doit être positive")
    .int("La quantité doit être un entier"),

  productId: z.coerce
    .number({ invalid_type_error: "Veuillez sélectionner un produit" })
    .positive("Veuillez sélectionner un produit"),
});