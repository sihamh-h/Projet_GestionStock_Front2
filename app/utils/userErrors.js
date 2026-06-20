export function translateUserError(err) {
  const message =
    err?.response?.data?.properties?.error ??
    err.response?.data?.detail ??
    err.response?.data?.error ??
    err.response?.data?.message ??
    err.message ??
    "";

 if (message.includes("email already exists"))        return "Cet email est déjà utilisé.";
  if (message.includes("Username already exists"))     return "Ce nom d'utilisateur est déjà pris.";
  if (message.includes("Phone number already exists")) return "Ce numéro de téléphone est déjà utilisé.";


  if (message.includes("Email already exists"))        return "Cet email est déjà utilisé.";
  if (message.includes("Phone number already exists")) return "Ce numéro de téléphone est déjà utilisé.";
  if (message.includes("Maximum number of ADMIN"))
    return "Le nombre maximum d'administrateurs a été atteint.";
  if (message.includes("Role not found")) return "Rôle invalide.";
  if (message.includes("last remaining admin"))
    return "Impossible de supprimer le dernier administrateur.";
  if (message.includes("Cannot remove ADMIN role"))
    return "Impossible de retirer le rôle Admin au dernier administrateur.";
  if (message.includes("not found")) return "Utilisateur introuvable.";

  return "Une erreur est survenue, veuillez réessayer.";
}
