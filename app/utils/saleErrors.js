export function translateSaleError(err) {
  const message =
    err?.response?.data?.properties?.error ??
    err?.response?.data?.detail ??
    err?.response?.data?.message ??
    err?.message ?? "";

  if (message.includes("Insufficient stock"))
    return "Stock insuffisant pour ce produit.";
  if (message.includes("already exists") || message.includes("Duplicate"))
    return "Ce numéro de vente existe déjà.";
  if (message.includes("Product not found"))
    return "Produit introuvable.";
  if (message.includes("Duplicate") || message.includes("already exists") || message.includes("conflict"))
  return "Ce numéro de vente existe déjà.";

  return "Une erreur est survenue, veuillez réessayer.";
}