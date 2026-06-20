import { featuresData } from "@/data/FeaturesData";

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blobs de fond */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-xs sm:text-sm text-blue-300 font-medium">
              ✦ Fonctionnalités
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Tout ce Dont Vous Avez Besoin
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Des fonctionnalités puissantes conçues pour piloter votre stock
            avec précision et simplicité.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map(({ id, icon: Icon, title, description, iconColor, bgColor, borderColor }) => (
            <div
              key={id}
              className={`relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 group ${borderColor}`}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              {/* Reflet haut */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
                }}
              />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bgColor}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="relative text-base font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}