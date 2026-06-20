export function Legal() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Mentions Légales
        </h1>
        <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : janvier 2026</p>

        <section className="space-y-8 text-gray-300 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-semibold text-base mb-2">1. Éditeur du site</h2>
            <p>StockiFlow est une application web de gestion de stocks développée dans le cadre d'un projet de formation CDA (Concepteur Développeur d'Applications).</p>
            <p className="mt-2">Responsable de publication : Équipe StockiFlow</p>
            <p>Email : contact@stockiflow.com</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">2. Hébergement</h2>
            <p>Le site est hébergé par des prestataires tiers. Les informations relatives à l'hébergeur seront mises à jour lors du déploiement en production.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">3. Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur StockiFlow (textes, images, logos, icônes, code source) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">4. Limitation de responsabilité</h2>
            <p>StockiFlow s'efforce de fournir des informations exactes et à jour. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation des informations est sous la responsabilité exclusive de l'utilisateur.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-2">5. Droit applicable</h2>
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </div>

        </section>
      </div>
    </main>
  );
}