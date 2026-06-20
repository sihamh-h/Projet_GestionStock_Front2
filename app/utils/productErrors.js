export function translateProductError(err) {
  const message =
    err.response?.data?.detail ??
    err.response?.data?.error ??
    err.response?.data?.message ??
    err.message ?? "";

  if (message.includes("same reference already exists"))
    return "Un produit avec cette référence existe déjà.";
  if (message.includes("Category with ID"))
    return "Catégorie introuvable.";
  if (message.includes("not found"))
    return "Produit introuvable.";
  if (message.includes("Duplicate entry"))
    return "Cette valeur existe déjà dans la base de données.";

  return "Une erreur est survenue, veuillez réessayer.";
}