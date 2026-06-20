export function Privacy() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Politique de Confidentialité
        </h1>
        <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : janvier 2026</p>

        <section className="space-y-8 text-gray-300 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-semibold text-base mb-2">1. Responsable du traitement</h2>
            <p>Le responsable du traitement des données personnelles collectées via StockiFlow est l'équipe StockiFlow, joignable à l'adresse : <span className="text-blue-400">contact@stockiflow.com</span>.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">2. Données collectées</h2>
            <p>Dans le cadre de l'utilisation de StockiFlow, nous collectons les données suivantes :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li>Nom et prénom</li>
              <li>Adresse email (utilisée pour l'authentification et l'activation du compte)</li>
              <li>Mot de passe (stocké de manière chiffrée, non accessible en clair)</li>
              <li>Logs d'activité (actions effectuées dans l'application, horodatées)</li>
              <li>Photo de profil (optionnelle)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li>Gérer l'accès et l'authentification des utilisateurs</li>
              <li>Assurer la traçabilité des actions dans l'application</li>
              <li>Envoyer les emails d'activation et de réinitialisation de mot de passe</li>
              <li>Améliorer la sécurité et les performances du service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">4. Base légale</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li>L'exécution du contrat (utilisation du service)</li>
              <li>Le consentement de l'utilisateur lors de l'inscription</li>
              <li>L'intérêt légitime (sécurité, logs d'activité)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">5. Durée de conservation</h2>
            <p>Les données personnelles sont conservées pendant la durée d'utilisation du compte. En cas de suppression du compte, les données sont effacées dans un délai de 30 jours, sauf obligation légale de conservation.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">6. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li><span className="text-white">Droit d'accès</span> — consulter vos données personnelles</li>
              <li><span className="text-white">Droit de rectification</span> — corriger des données inexactes</li>
              <li><span className="text-white">Droit à l'effacement</span> — supprimer vos données</li>
              <li><span className="text-white">Droit à la portabilité</span> — recevoir vos données dans un format lisible</li>
              <li><span className="text-white">Droit d'opposition</span> — vous opposer à certains traitements</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits, contactez-nous à : <span className="text-blue-400">contact@stockiflow.com</span></p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">7. Sécurité des données</h2>
            <p>StockiFlow met en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li>Authentification par JWT avec refresh token</li>
              <li>Mots de passe chiffrés (BCrypt)</li>
              <li>Activation du compte par email</li>
              <li>Traçabilité complète des actions via les logs d'activité</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">8. Cookies</h2>
            <p>StockiFlow utilise uniquement des cookies techniques nécessaires au bon fonctionnement de l'application (gestion de session, token d'authentification). Aucun cookie publicitaire ou de tracking n'est utilisé.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">9. Contact et réclamation</h2>
            <p>Pour toute question relative à la protection de vos données, contactez-nous à <span className="text-blue-400">contact@stockiflow.com</span>.</p>
            <p className="mt-2">Vous avez également le droit d'introduire une réclamation auprès de la <span className="text-white">CNIL</span> (Commission Nationale de l'Informatique et des Libertés) : <span className="text-blue-400">www.cnil.fr</span>.</p>
          </div>

        </section>
      </div>
    </main>
  );
}