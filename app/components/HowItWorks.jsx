import { howItWorksSteps } from "@/data/HowItWorksData";

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-xs sm:text-sm text-blue-300 font-medium">
              ✦ Comment ça marche
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Démarrez Rapidement
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Notre processus simplifié vous permet d'être opérationnel en moins
            d'une journée.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Ligne de connexion desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.3), rgba(96,165,250,0.5), rgba(96,165,250,0.3), transparent)",
            }}
          />

          {howItWorksSteps.map(({ id, title, description }) => (
            <div key={id} className="relative flex flex-col items-center text-center group">
              {/* Numéro */}
              <div className="relative mb-6 z-10">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white border border-blue-400/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400/60"
                  style={{
                    background: "linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(34,211,238,0.15) 100%)",
                    boxShadow: "0 0 20px rgba(96,165,250,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  {id}
                </div>
              </div>

              {/* Contenu */}
              <div
                className="relative w-full rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                {/* Reflet */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
                  }}
                />
                <h3 className="relative text-base font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="relative text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}