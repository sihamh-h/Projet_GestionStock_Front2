import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Mail, CheckCircle } from "lucide-react";
import { authService } from "@/services/authService";

const schema = z.object({
  email: z.string().email("Email invalide"),
});

export function ForgotPasswordDialog({ open, onClose }) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await authService.forgotPassword(data.email);
      setSuccess(true);
    } catch {
      // Message générique — ne pas révéler si l'email existe
      setSuccess(true);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.85) 40%, rgba(30,41,59,0.7) 70%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          border: "0.5px solid rgba(255,255,255,0.18)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}>

        <div className="relative z-10 p-8">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <X size={16} />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.3), rgba(103,232,249,0.15))",
                border: "0.5px solid rgba(96,165,250,0.4)" }}>
              <Mail size={24} className="text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold"
              style={{ background: "linear-gradient(90deg, #f1f5f9 0%, #93c5fd 50%, #67e8f9 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Mot de passe oublié
            </h2>
            <p className="text-sm text-slate-400 mt-1">Entrez votre email pour recevoir un lien</p>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle size={48} className="text-emerald-400" />
              <p className="text-emerald-400 font-medium text-center">
                Si cet email correspond à un compte, vous recevrez un lien sous peu.
              </p>
              <button onClick={onClose}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("email")} type="email" placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={{ background: "rgba(255,255,255,0.06)",
                      border: errors.email ? "0.5px solid rgba(248,113,113,0.6)" : "0.5px solid rgba(255,255,255,0.12)" }} />
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: isSubmitting ? "rgba(96,165,250,0.3)"
                    : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,1) 50%, rgba(59,130,246,0.6) 100%)",
                  border: "0.5px solid rgba(96,165,250,0.4)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(59,130,246,0.3)",
                }}>
                {isSubmitting ? <span className="animate-pulse">Envoi en cours...</span> : "Envoyer le lien"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}