import { z } from "zod";

export const orderSchema = z.object({
  orderNumber: z
    .string()
    .min(1, "Le numéro de commande est requis")
    .max(50, "Maximum 50 caractères"),

  supplierId: z.coerce
    .number({ invalid_type_error: "Veuillez sélectionner un fournisseur" })
    .positive("Veuillez sélectionner un fournisseur"),

  lines: z.array(
    z.object({
      productId: z.coerce
        .number({ invalid_type_error: "Veuillez sélectionner un produit" })
        .positive("Veuillez sélectionner un produit"),
      quantity: z.coerce
        .number({ invalid_type_error: "La quantité doit être un nombre" })
        .positive("La quantité doit être positive")
        .int("La quantité doit être un entier"),
      unitPrice: z.coerce
        .number({ invalid_type_error: "Le prix doit être un nombre" })
        .positive("Le prix doit être positif"),
    })
  ).min(1, "Ajoutez au moins une ligne"),
});