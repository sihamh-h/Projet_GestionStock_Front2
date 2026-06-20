export function translateMovementError(err) {
  const message =
    err?.response?.data?.properties?.error ??
    err?.response?.data?.detail ??
    err?.response?.data?.error ??
    err?.response?.data?.message ??
    err?.message ??
    "";

  if (message.includes("Insufficient stock"))
    return "Stock insuffisant pour effectuer cette sortie.";
  if (message.includes("requested") && message.includes("available")) {
    const match = message.match(/requested (\d+), available (\d+)/);
    if (match) return `Stock insuffisant — demandé : ${match[1]}, disponible : ${match[2]}.`;
  }
  if (message.includes("Product with ID") && message.includes("not found"))
    return "Produit introuvable. Vérifiez l'ID produit.";
  if (message.includes("not found"))
    return "Mouvement introuvable.";
  if (message.includes("Invalid MovementRequestDTO") || message.includes("Invalid"))
    return "Données invalides. Vérifiez les champs saisis.";

  return "Une erreur est survenue, veuillez réessayer.";
}