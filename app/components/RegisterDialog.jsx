import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/Register.schema";
import { X, Mail, Lock, Eye, EyeOff, UserPlus, User, Phone, Calendar } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const ROLE_OPTIONS = [
  { value: "ROLE_ADMIN",    label: "Administrateur" },
  { value: "ROLE_MANAGER",  label: "Gestionnaire" },
  { value: "ROLE_EMPLOYEE", label: "Employé" },
];

const inputStyle = (hasError) => ({
  background: "rgba(255,255,255,0.06)",
  border: hasError
    ? "0.5px solid rgba(248,113,113,0.6)"
    : "0.5px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(8px)",
});

export default function RegisterDialog({ open, onClose, onSuccess }) {
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirm,  setShowConfirm]         = useState(false);
  const [serverError,  setServerError]         = useState("");
  const [selectedRole, setSelectedRole]        = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "", lastname: "", username: "",
      email: "", password: "", confirmPassword: "",
      birthdate: "", phoneNumber: "", roles: [],
    },
  });

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setValue("roles", [value], { shouldValidate: true });
  };

  const { registerInfo } = useAuth();

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const { confirmPassword, ...payload } = data;
      await registerInfo(payload);
      onClose();
      onSuccess?.(); // callback optionnel (ex: afficher message succès)
    } catch (err) {
      setServerError(
        err.message ?? "Erreur lors de l'inscription"
      );
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden my-4"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.85) 40%, rgba(30,41,59,0.7) 70%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          border: "0.5px solid rgba(255,255,255,0.18)",
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reflet haut */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)", borderRadius: "24px 24px 0 0" }}
        />

        {/* Orbe bleu */}
        <div className="absolute pointer-events-none"
          style={{ top: "-30%", right: "-20%", width: "220px", height: "220px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(103,232,249,0.08) 50%, transparent 70%)",
            filter: "blur(24px)" }}
        />

        <div className="relative z-10 p-8">
          {/* Fermer */}
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200">
            <X size={16} />
          </button>

          {/* Titre */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(103,232,249,0.15) 100%)",
                border: "0.5px solid rgba(96,165,250,0.4)", backdropFilter: "blur(8px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <UserPlus size={24} className="text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold"
              style={{ background: "linear-gradient(90deg, #f1f5f9 0%, #93c5fd 50%, #67e8f9 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Inscription
            </h2>
            <p className="text-sm text-slate-400 mt-1">Créer un nouveau compte</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* Ligne Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              {/* Prénom */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Prénom</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("firstname")} placeholder="Jean"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.firstname)} />
                </div>
                {errors.firstname && <p className="text-xs text-red-400">{errors.firstname.message}</p>}
              </div>

              {/* Nom */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nom</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("lastname")} placeholder="Dupont"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.lastname)} />
                </div>
                {errors.lastname && <p className="text-xs text-red-400">{errors.lastname.message}</p>}
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Nom d'utilisateur</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input {...register("username")} placeholder="jean.dupont"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  style={inputStyle(errors.username)} />
              </div>
              {errors.username && <p className="text-xs text-red-400">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input {...register("email")} type="email" placeholder="jean@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  style={inputStyle(errors.email)} />
              </div>
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Ligne Date + Téléphone */}
            <div className="grid grid-cols-2 gap-3">
              {/* Birthdate */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Date de naissance</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("birthdate")} type="date"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ ...inputStyle(errors.birthdate), colorScheme: "dark" }} />
                </div>
                {errors.birthdate && <p className="text-xs text-red-400">{errors.birthdate.message}</p>}
              </div>

              {/* Téléphone */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Téléphone</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("phoneNumber")} placeholder="06 12 34 56 78"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.phoneNumber)} />
                </div>
                {errors.phoneNumber && <p className="text-xs text-red-400">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            {/* Rôle */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Rôle</label>
              <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none appearance-none"
                style={{ ...inputStyle(errors.roles), background: "rgba(255,255,255,0.06)" }}
              >
                <option value="" disabled style={{ background: "#1e293b" }}>Sélectionner un rôle</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: "#1e293b" }}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.roles && <p className="text-xs text-red-400">{errors.roles.message}</p>}
            </div>

            {/* Mot de passe */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Mot de passe</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  style={inputStyle(errors.password)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Confirmer mot de passe */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"} placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  style={inputStyle(errors.confirmPassword)} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            {/* Erreur serveur */}
            {serverError && (
              <div className="px-4 py-3 rounded-xl text-sm text-red-300 text-center"
                style={{ background: "rgba(248,113,113,0.1)", border: "0.5px solid rgba(248,113,113,0.3)" }}>
                {serverError}
              </div>
            )}

            {/* Bouton */}
            <button type="submit" disabled={isSubmitting}
              className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mt-2"
              style={{
                background: isSubmitting
                  ? "rgba(96,165,250,0.3)"
                  : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,1) 50%, rgba(59,130,246,0.6) 100%)",
                border: "0.5px solid rgba(96,165,250,0.4)",
                backdropFilter: "blur(8px)",
                boxShadow: isSubmitting ? "none" : "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(59,130,246,0.3)",
              }}>
              {isSubmitting ? (
                <span className="animate-pulse">Inscription en cours...</span>
              ) : (
                <><UserPlus size={16} />S'inscrire</>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}