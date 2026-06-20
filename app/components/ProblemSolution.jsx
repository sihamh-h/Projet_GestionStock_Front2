import { problemSolutionCards } from "@/data/ProblemSolutionData";
import FloatingCard from "@/components/FloatingCard";

export default function ProblemSolution() {
  return (
    <section id="solutions" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Arrêtez de Perdre de l'Argent
            </span>
            <br />
            <span className="text-white/80 text-2xl sm:text-3xl lg:text-4xl font-medium">
              à Cause d'une Mauvaise Gestion des Stocks
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Le suivi manuel entraîne des ruptures de stock, du surstockage,
            du gaspillage et des pertes de revenus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {problemSolutionCards.map(({ id, icon: Icon, title, featured, borderColor, iconColor, glowColor, items, floatingCard }) => (
            <div
              key={id}
              className={`relative rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${borderColor} ${featured ? "md:-translate-y-4" : ""}`}
              style={{
                background: `linear-gradient(135deg, ${glowColor} 0%, rgba(255,255,255,0.03) 100%)`,
                boxShadow: `0 0 ${featured ? "40px" : "20px"} ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.07)`,
              }}
            >
              {/* Reflet */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 40%)" }}
              />

              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-semibold bg-blue-500/20 border border-blue-400/30 text-blue-300 backdrop-blur-sm">
                    ✦ Recommandé
                  </span>
                </div>
              )}

              <Icon className={`relative w-8 h-8 mb-4 ${iconColor}`} />
              <h3 className="relative text-xl font-bold text-white mb-6">{title}</h3>

              <ul className="relative space-y-3 mb-6">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${iconColor} bg-current`} />
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* FloatingCard réutilisé */}
              <FloatingCard {...floatingCard} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}