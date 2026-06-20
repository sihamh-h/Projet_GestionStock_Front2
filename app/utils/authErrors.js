export function translateAuthError(error) {
  if (!error) return "Erreur de connexion";

  const normalized = error.toLowerCase();

  if (normalized.includes("disabled")) {
    return "Veuillez activer votre compte avant de vous connecter.";
  }

  if (normalized.includes("incorrect") || normalized.includes("invalid")) {
    return "Email ou mot de passe incorrecte.";
  }

   if (normalized.includes("must change password")) {
    return "Vous devez changer votre mot de passe avant de continuer.";
  }

  if (normalized.includes("already exists")) {
    return "Un utilisateur avec le même email, nom d'utilisateur ou numéro de téléphone existe déjà.";
  }

  return "Erreur lors de la connexion.";
}
