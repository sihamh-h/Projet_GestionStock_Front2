import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schema/resetPassword.schema";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { authService } from "@/services/authService";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [showPassword,  setShowPassword]  = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [serverError,   setServerError]   = useState("");
  const [success,       setSuccess]       = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await authService.resetPassword(token, data.password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setServerError(err.response?.data?.message ?? "Lien invalide ou expiré");
    }
  };

  const inputStyle = (hasError) => ({
    background: "rgba(255,255,255,0.06)",
    border: hasError
      ? "0.5px solid rgba(248,113,113,0.6)"
      : "0.5px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
  });

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.85) 40%, rgba(30,41,59,0.7) 70%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          border: "0.5px solid rgba(255,255,255,0.18)",
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}>

        <div className="relative z-10 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(103,232,249,0.15) 100%)",
                border: "0.5px solid rgba(96,165,250,0.4)" }}>
              <Lock size={24} className="text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold"
              style={{ background: "linear-gradient(90deg, #f1f5f9 0%, #93c5fd 50%, #67e8f9 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nouveau mot de passe
            </h2>
            <p className="text-sm text-slate-400 mt-1">Choisissez un mot de passe sécurisé</p>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle size={48} className="text-emerald-400" />
              <p className="text-emerald-400 font-medium text-center">
                Mot de passe modifié avec succès !
              </p>
              <p className="text-slate-400 text-sm text-center">
                Redirection vers l'accueil dans 3 secondes...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Nouveau mot de passe */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("password")} type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.password)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              </div>

              {/* Confirmer */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.confirmPassword)} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
              </div>

              {serverError && (
                <div className="px-4 py-3 rounded-xl text-sm text-red-300 text-center"
                  style={{ background: "rgba(248,113,113,0.1)", border: "0.5px solid rgba(248,113,113,0.3)" }}>
                  {serverError}
                </div>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: isSubmitting ? "rgba(96,165,250,0.3)"
                    : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,1) 50%, rgba(59,130,246,0.6) 100%)",
                  border: "0.5px solid rgba(96,165,250,0.4)",
                  boxShadow: isSubmitting ? "none" : "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(59,130,246,0.3)",
                }}>
                {isSubmitting ? <span className="animate-pulse">Enregistrement...</span> : "Enregistrer"}
              </button>

            </form>
          )}
        </div>
      </div>
    </main>
  );
}