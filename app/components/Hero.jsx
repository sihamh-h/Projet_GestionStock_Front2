import { useEffect, useState } from "react";
import {
  heroTabs,
  heroKpis,
  heroCharts,
  heroAlerts,
  heroInventoryRows,
  floatingCards,
} from "../data/HeroData";
import AlertCard from "@/components/AlertCard";
import InventoryTable from "@/components/InventoryTable";
import Graph from "@/components/Graph";
import HeroKpisGrid from "@/components/HeroKpisGrid";
import FloatingCard from "@/components/FloatingCard";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(heroTabs[0].id);

  const chartConfig = heroCharts[activeTab] ?? heroCharts.dashboard;

  const currentFloatingCard = floatingCards.find(
    (card) => card.id === activeTab,
  );

  const chartData = chartConfig.labels.map((label, index) => {
    const dataPoint = { label };
    chartConfig.series.forEach((series) => {
      dataPoint[series.name] = series.values[index];
    });
    return dataPoint;
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-auto md:overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Blobs animés */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Contenu principal */}
      <div className="py-16 max-w-7xl mx-auto text-center relative w-full">
        <div className="max-w-7xl mx-auto flex flex-col text-center  gap-6 sm:gap-8 lg:gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-1000 mx-auto">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300">
                {" "}
                Le flux intelligent de votre stock{" "}
              </span>
            </div>
            <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-200 delay-300 leading-tight">
              <span className="bg-linear-to-r from-white via-blue-400 to-cyan-200 bg-clip-text text-transparent block mb-1 sm:mb-2  sm:-translate-x-24 lg:-translate-x-60 md:-translate-x-24">
                Maitrisez votre <b>Stock</b>
              </span>
              <span className="bg-linear-to-r from-white via-blue-400 to-cyan-200 bg-clip-text text-transparent block mb-1 sm:mb-2 lg:translate-x-44 md:translate-x-32 sm:translate-x-24">
                en toute simplicité
              </span>
            </h1>

            <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-400 leading-relaxed">
              Pilotez vos inventaires avec une plateforme moderne et intuitive.
              Anticipez les ruptures, optimisez vos coûts et prenez les bonnes
              décisions.
            </p>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
              <button className="group rounded-full w-full border border-white/15 backdrop-blur-lg px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-b from-blue-400 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
                <span>Commencer maintenant</span>
                <div className="p-2 bg-white/10 rounded-full items-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <button className="group rounded-full w-full  px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-b from-white/15 backdrop-blur-lg border border-white/10 font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2">
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 duration-300 transition-colors">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                </div>
                <span>Voir la démonstration</span>
              </button>
            </div>
          </div>

          <div className="relative order-2 w-full">
            <div className="relative rounded-3xl  bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.15)_100%)] backdrop-blur-xl sm:rounded-2xl p-3 sm:p-4 lg:h-auto shadow-2xl border border-white/15">
              <div className=" rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0.08)_100%)] backdrop-blur-xl backdrop-saturate-150 lg:h-auto border border-white/15">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "35%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    borderRadius: "22px 22px 0 0",
                  }}
                />

                {/* Reflet diagonal */}
                <div
                  style={{
                    position: "absolute",
                    top: "-40%",
                    left: "-10%",
                    width: "45%",
                    height: "120%",
                    background:
                      "linear-gradient(130deg, rgba(255,255,255,0.07) 0%, transparent 60%)",
                    transform: "rotate(-10deg)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* IDE HEADER */}
                <div className="relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 rounded-3xl">
                  <span className="text-[13px] sm:text-sm text-white/70 font-bold">
                    {" "}
                    StockiFlow
                  </span>
                  <div className="flex gap-2">
                    {heroTabs.map((tab) => {
                      const isActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 py-2.5 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm border ${
                            isActive
                              ? "border-white/20 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] bg-linear-to-b from-blue-400 via-blue-400 to-black/45"
                              : "border-white/15 text-white/50 bg-white/[0.07]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/*contenu carré Kpi*/}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <HeroKpisGrid heroKpis={heroKpis} />
                </div>

                <div className="mt-8 rounded-xl bg-slate-200/0 border border-slate-300/30 p-4 backdrop-blur-md">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-white/60 uppercase tracking-[0.14em]">
                        {chartConfig.title}
                      </p>
                      <p className="text-[12px] font-bold text-white/50 mt-1">
                        {chartConfig.subtitle}
                      </p>
                    </div>

                    {chartConfig.threshold && (
                      <span className="text-[11px] font-bold text-white/50 bg-white/6 border border-white/10 px-3 py-1 rounded-full">
                        Seuil critique: {chartConfig.threshold} u.
                      </span>
                    )}
                  </div>

                  {/* Graphique */}
                  <div className="h-44">
                    <Graph chartData={chartData} chartConfig={chartConfig} />
                  </div>
                </div>

                {/* Liste d'alertes */}
                {activeTab === "alerts" && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {heroAlerts.map((a, i) => (
                      <AlertCard key={a.id} alert={a} index={i} />
                    ))}
                  </div>
                )}

                {/* Inventaires */}
                {activeTab === "dashboard" && (
                  <div className="mt-8">
                    <InventoryTable
                      items={heroInventoryRows}
                      title="Inventaires"
                    />
                  </div>
                )}
              </div>
              {/* Floating Card */}
              {currentFloatingCard && (
                <FloatingCard currentFloatingCard={currentFloatingCard} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
