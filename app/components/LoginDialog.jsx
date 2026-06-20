import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/Login.schema";
import { X, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {ForgotPasswordDialog} from "@/components/ForgotPasswordDialog";



// ── LoginDialog ─────────────────────────────────────────────────
export default function LoginDialog({ open, onClose }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

 const onSubmit = async (data) => {
    setServerError("");
    try {
      const redirectTo = await login(data); // appel réel au back
      onClose();
      setTimeout(() => navigate(redirectTo), 50); // redirige selon le rôle
    } catch (err) {
      setServerError(err.message ?? "Email ou mot de passe incorrecte");
    }
  };

  if (!open && !forgotOpen) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      >
        {/* ── Dialog ── */}
        <div
          className="relative w-full max-w-md rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.85) 40%, rgba(30,41,59,0.7) 70%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(40px) saturate(200%)",
            border: "0.5px solid rgba(255,255,255,0.18)",
            boxShadow:
              "0 0 0 0.5px rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Reflet haut */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "45%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Orbe bleu */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-30%", right: "-20%",
              width: "220px", height: "220px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(103,232,249,0.08) 50%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* ── Contenu ── */}
          <div className="relative z-10 p-8">

            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={16} />
            </button>

            {/* Icône + Titre */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(103,232,249,0.15) 100%)",
                  border: "0.5px solid rgba(96,165,250,0.4)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <LogIn size={24} className="text-blue-300" />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #f1f5f9 0%, #93c5fd 50%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Connexion
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Accédez à votre espace StockiFlow
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="votre@email.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: errors.email
                        ? "0.5px solid rgba(248,113,113,0.6)"
                        : "0.5px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(8px)",
                    }}
                    onFocus={(e) => {
                      if (!errors.email)
                        e.target.style.border =
                          "0.5px solid rgba(96,165,250,0.6)";
                    }}
                    onBlur={(e) => {
                      if (!errors.email)
                        e.target.style.border =
                          "0.5px solid rgba(255,255,255,0.12)";
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: errors.password
                        ? "0.5px solid rgba(248,113,113,0.6)"
                        : "0.5px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(8px)",
                    }}
                    onFocus={(e) => {
                      if (!errors.password)
                        e.target.style.border =
                          "0.5px solid rgba(96,165,250,0.6)";
                    }}
                    onBlur={(e) => {
                      if (!errors.password)
                        e.target.style.border =
                          "0.5px solid rgba(255,255,255,0.12)";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Mot de passe oublié */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { onClose(); setForgotOpen(true); }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Mot de passe oublié ?
                </button>

              </div>

              {/* Erreur serveur */}
              {serverError && (
                <div
                  className="px-4 py-3 rounded-xl text-sm text-red-300 text-center"
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    border: "0.5px solid rgba(248,113,113,0.3)",
                  }}
                >
                  {serverError}
                </div>
              )}

              {/* Bouton connexion */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: isSubmitting
                    ? "rgba(96,165,250,0.3)"
                    : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,1) 50%, rgba(59,130,246,0.6) 100%)",
                  border: "0.5px solid rgba(96,165,250,0.4)",
                  backdropFilter: "blur(8px)",
                  boxShadow: isSubmitting
                    ? "none"
                    : "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(59,130,246,0.3)",
                }}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Connexion en cours...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    Se connecter
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
        {/* Dialog mot de passe oublié */}
<ForgotPasswordDialog open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}