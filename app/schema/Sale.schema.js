import { z } from "zod";

export const saleSchema = z.object({
  saleNumber: z
    .string()
    .min(1, "Le numéro de vente est requis")
    .max(50, "Maximum 50 caractères"),

  lines: z
    .array(
      z.object({
        productId: z.coerce
          .number({ invalid_type_error: "Veuillez sélectionner un produit" })
          .positive("Veuillez sélectionner un produit"),

        quantity: z.coerce
          .number({ invalid_type_error: "La quantité doit être un nombre" })
          .positive("La quantité doit être positive")
          .int("La quantité doit être un entier"),
      })
    )
    .min(1, "Ajoutez au moins une ligne de vente"),
});