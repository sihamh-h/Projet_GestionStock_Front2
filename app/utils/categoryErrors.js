export function translateCategoryError(err) {
  const message =
    err.response?.data?.detail ??
    err.response?.data?.error ??
    err.response?.data?.message ??
    err.message ?? "";

  if (message.includes("already exists"))
    return "Une catégorie avec ce nom existe déjà.";
  if (message.includes("not found"))
    return "Catégorie introuvable.";
  if (message.includes("products"))
    return "Impossible de supprimer une catégorie qui contient des produits.";

  return "Une erreur est survenue, veuillez réessayer.";
}