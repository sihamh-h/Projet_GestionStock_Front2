export function Terms() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : janvier 2026</p>

        <section className="space-y-8 text-gray-300 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-semibold text-base mb-2">1. Objet</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de l'application StockiFlow, ainsi que les droits et obligations des utilisateurs.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">2. Accès au service</h2>
            <p>L'accès à StockiFlow nécessite la création d'un compte utilisateur. L'inscription est soumise à la validation d'une adresse email. Chaque utilisateur est responsable de la confidentialité de ses identifiants de connexion.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">3. Utilisation du service</h2>
            <p>L'utilisateur s'engage à utiliser StockiFlow de manière conforme à sa destination et aux présentes CGU. Il est notamment interdit de :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
              <li>Utiliser le service à des fins illicites ou frauduleuses</li>
              <li>Tenter d'accéder à des données non autorisées</li>
              <li>Perturber le bon fonctionnement de l'application</li>
              <li>Partager ses identifiants avec des tiers non autorisés</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">4. Rôles et permissions</h2>
            <p>StockiFlow propose un système de rôles (administrateur, gestionnaire, employé). Les droits d'accès sont définis par l'administrateur du compte. Chaque utilisateur ne peut accéder qu'aux fonctionnalités correspondant à son rôle.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">5. Disponibilité du service</h2>
            <p>StockiFlow s'efforce d'assurer la disponibilité du service 24h/24 et 7j/7. Toutefois, des interruptions pour maintenance ou mise à jour peuvent survenir. Nous ne saurions être tenus responsables des conséquences d'une indisponibilité temporaire.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">6. Modification des CGU</h2>
            <p>StockiFlow se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification significative. La poursuite de l'utilisation du service vaut acceptation des nouvelles conditions.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">7. Droit applicable</h2>
            <p>Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents.</p>
          </div>

        </section>
      </div>
    </main>
  );
}