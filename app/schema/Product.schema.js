import { z } from "zod";

export const productSchema = z.object({
  reference: z.string().min(1, "La référence est obligatoire").max(50),
  name:      z.string().min(1, "Le nom est obligatoire").max(50),
  
  description: z.string().max(100).optional().or(z.literal("")),
  
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le prix doit être un nombre" })
      .nonnegative("Le prix doit être positif ou zéro")
  ),

  actualStock: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le stock doit être un nombre" })
      .int("Le stock doit être un entier")
      .nonnegative("Le stock doit être positif ou zéro")
  ),

  minStock: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Le stock minimum doit être un nombre" })
      .int("Le stock minimum doit être un entier")
      .nonnegative("Le stock minimum doit être positif ou zéro")
  ),

  categoryId: z.preprocess(  // ← categoryId pas categoryName
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "La catégorie est obligatoire" })
      .int()
      .positive("Veuillez sélectionner une catégorie")
  ),

  imageUrl: z.string().optional().or(z.literal("")),  // ← pas de .url()
});