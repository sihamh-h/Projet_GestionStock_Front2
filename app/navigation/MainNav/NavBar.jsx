import logo from "/images/logo5.webp";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import SideRays from "@/components/SideRays";

export default function Navbar({ onLoginOpen, onRegisterOpen }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  
  const navLinks = [
    { name: "Fonctionnalités", sectionId: "features" },
    { name: "Solutions", sectionId: "solutions" },
    { name: "Demo", sectionId: "demo" },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-base lg:text-lg font-medium transition-all duration-300 relative ${
      isActive
        ? "text-emerald-400 border-b-1 border-emerald-400"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 transition-all duration-300 
  bg-white/5 backdrop-blur-sm backdrop-saturate-150
  border-b border-white/10
  shadow-[0_1px_0_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            <NavLink
              to="/"
              className="flex items-center -space-x-4 shrink-0 pr-2 group cursor-pointer relative"
            >
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "-32px",
                  width: "1000px",
                  height: "600px",

                  pointerEvents: "none",
                  zIndex: -1,
                  overflow: "visible",
                }}
              >
                <SideRays
                  speed={1}
                  rayColor1="#ffffff"
                  rayColor2="#4f7ec9"
                  intensity={1.5}
                  spread={2.5}
                  origin="top-left"
                  tilt={10}
                  saturation={1.5}
                  blend={0.5}
                  falloff={1.8}
                  opacity={0.5}
                />
              </div>

              <div>
                <img
                  src={logo}
                  alt="Logo StockiFlow"
                  className="w-28 h-20 sm:w-32 sm:h-24"
                />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Stocki<span className="font-extrabold italic">Flow</span>
              </span>
            </NavLink>

            <nav className="hidden md:flex flex-1 justify-center items-center space-x-4 lg:space-x-8">
              {navLinks.map(({ name, sectionId }) => (
                <button
                  key={name}
                  onClick={() => scrollToSection(sectionId)}
                  className="text-base lg:text-lg font-medium transition-all duration-300 text-gray-300 hover:text-white"
                >
                  {name}
                </button>
              ))}
            </nav>
            <div className="hidden md:flex shrink-0 pl-2 items-center space-x-3 lg:space-x-6">
              <button
                onClick={onLoginOpen}
                className="whitespace-nowrap shrink-0 text-base lg:text-lg font-medium transition-all duration-300 relative text-gray-300 hover:text-white"
              >
                Connexion
              </button>
              <motion.button
                onClick={onRegisterOpen}
                className="hidden md:flex shrink-0 whitespace-nowrap px-6 lg:px-10 py-2.5 lg:py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300 relative border border-white/15 bg-slate-900/45 backdrop-blur-md text-slate-100 hover:text-white hover:bg-slate-800/55"
                style={{
                  boxShadow:
                    "inset 1px 1px 0 rgba(255,255,255,0.12), inset -1px -1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 1px 1px 0 rgba(255,255,255,0.18), inset -1px -1px 0 rgba(255,255,255,0.08), 0 12px 28px rgba(0,0,0,0.45), 0 0 20px rgba(56,189,248,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 1px 1px 0 rgba(255,255,255,0.12), inset -1px -1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.35)";
                }}
              >
                Inscription
              </motion.button>
            </div>

            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            >
              {mobileMenuIsOpen ? (
                <X />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuIsOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-700">
            <div className="text-gray-300 px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuIsOpen(false)}
                  className="block text-center hover:text-white "
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-700/60 space-y-3">
                <button
                  className="w-full text-center text-base font-medium py-2 rounded-full text-gray-300 hover:text-white transition-all duration-300"
                  onClick={() => {
                    setMobileMenuIsOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  Connexion
                </button>
                <button
                  className="w-full py-2.5 rounded-full text-base font-medium border border-white/15 bg-slate-900/45 backdrop-blur-lg text-slate-100 hover:text-white hover:bg-slate-800/55 transition-all duration-300"
                  onClick={() => {
                    setMobileMenuIsOpen(false);
                    setRegisterOpen(true);
                  }}
                >
                  Inscription
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
    </>
  );
}
