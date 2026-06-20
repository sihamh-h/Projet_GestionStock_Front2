import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "@/data/FaqData";

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-xs sm:text-sm text-blue-300 font-medium">
              ✦ FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Questions Fréquemment Posées
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Tout ce que vous devez savoir sur StockiFlow.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqData.map(({ id, question, answer }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`relative rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                  isOpen
                    ? "border-blue-400/30"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: isOpen
                    ? "0 0 30px rgba(96,165,250,0.1), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Reflet */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
                  }}
                />

                {/* Question */}
                <button
                  onClick={() => toggle(id)}
                  className="relative w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? "text-blue-300" : "text-white"}`}>
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-blue-400" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="relative px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}