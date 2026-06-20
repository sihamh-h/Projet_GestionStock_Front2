import logo from "/images/logo5.png";
import { NavLink } from "react-router";


const footerLinks = {
  navigation: [
    { name: "Fonctionnalités", sectionId: "features" },
    { name: "Solutions", sectionId: "solutions" },
    { name: "Demo", sectionId: "demo"  },
  ],
  legal: [
    { name: "Mentions légales", path: "/legal" },
    { name: "CGU", path: "/terms" },
    { name: "Confidentialité", path: "/privacy" },
  ],
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MailIcon, href: "mailto:contact@stockiflow.com", label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10 overflow-hidden">
      {/* Blob de fond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + tagline */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="flex items-center -space-x-4 mb-4">
              <img src={logo} alt="Logo StockiFlow" className="w-24 h-16" />
              <span className="text-xl font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Stocki<span className="font-extrabold italic">Flow</span>
              </span>
            </NavLink>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              La plateforme intelligente pour piloter vos stocks en temps réel.
              Anticipez les ruptures, optimisez vos coûts et prenez les bonnes
              décisions.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map(({ name, sectionId }) => (
                <li key={name}>
                  <a  href={`#${sectionId}`}
          className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
        >
          {name}
        </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Séparateur + copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-md text-gray-500 ">
            © {currentYear} StockiFlow. Tous droits réservés.
          </p>
          
        </div>
      </div>
    </footer>
  );
}