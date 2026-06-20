import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, User, Phone, Calendar, Mail, Shield, Camera } from "lucide-react";
import { Avatar, CircularProgress } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { uploadService } from "@/services/uploadService";
import { toBackendDate, toInputDate } from "@/utils/formaDate";

const profileSchema = z.object({
  firstname:   z.string().min(1, "Prénom requis"),
  lastname:    z.string().min(1, "Nom requis"),
  phoneNumber: z.string().min(1, "Téléphone requis"),
  birthdate:   z.string().min(1, "Date de naissance requise"),
});

const inputStyle = (hasError) => ({
  background: "rgba(255,255,255,0.06)",
  border: hasError
    ? "0.5px solid rgba(248,113,113,0.6)"
    : "0.5px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(8px)",
});

const readOnlyStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "0.5px solid rgba(255,255,255,0.06)",
  backdropFilter: "blur(8px)",
  cursor: "not-allowed",
  opacity: 0.6,
};

const ROLE_LABELS = {
  ROLE_ADMIN:    "Administrateur",
  ROLE_MANAGER:  "Gestionnaire",
  ROLE_EMPLOYEE: "Employé",
};

export default function ProfileDialog({ open, onClose }) {
  const { user } = useAuth();
  const [serverError,    setServerError]    = useState("");
  const [successMsg,     setSuccessMsg]     = useState("");
  const [imageUrl,       setImageUrl]       = useState("");
  const [uploadLoading,  setUploadLoading]  = useState(false);
  

  const initials = user?.firstname && user?.lastname
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  const roleLabel = user?.roles?.[0]
    ? ROLE_LABELS[user.roles[0]] ?? user.roles[0]
    : "—";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname:   user?.firstname   ?? "",
      lastname:    user?.lastname    ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      birthdate:   "",
    },
  });

  useEffect(() => {
    if (!open || !user?.id) return;
    userService.getUserById(user.id).then((data) => {
      reset({
        firstname:   data.firstname   ?? "",
        lastname:    data.lastname    ?? "",
        phoneNumber: data.phoneNumber ?? "",
        birthdate:   data.birthdate ? toInputDate(data.birthdate) : "",
      });
      setImageUrl(data.imageUrl ?? "");
    });
  }, [open, user?.id]);

  // ── Upload image ────────────────────────────────────────
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadLoading(true);
    try {
      const url = await uploadService.uploadProfileImage(file);
      setImageUrl(url);
    } catch {
      setServerError("Erreur lors de l'upload de l'image.");
    } finally {
      setUploadLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");
    try {
      await userService.updateUser(user.id, {
        firstname:   data.firstname,
        lastname:    data.lastname,
        phoneNumber: data.phoneNumber,
        email:       user.email,
        birthdate:   data.birthdate,
        roles:       user.roles,
        imageUrl:    imageUrl,
      });
      setSuccessMsg("Profil mis à jour avec succès !");
    } catch (err) {
      console.log("erreur complète:", err.response?.data);
      setServerError(
        err.response?.data?.properties?.error ??
        err.response?.data?.message ??
        err.message ??
        "Une erreur est survenue."
      );
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
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

          {/* Avatar + upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              {imageUrl ? (
                <img src={imageUrl} alt="profil"
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: "2px solid rgba(96,165,250,0.4)" }} />
              ) : (
                <Avatar sx={{
                  width: 64, height: 64,
                  fontSize: 22, fontWeight: 700,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                }}>
                  {initials}
                </Avatar>
              )}

              {/* Bouton upload */}
              <label className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all"
                style={{ background: "rgba(59,130,246,0.9)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
                {uploadLoading
                  ? <CircularProgress size={12} sx={{ color: "#fff" }} />
                  : <Camera size={12} color="white" />
                }
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploadLoading} />
              </label>
            </div>

            <h2 className="text-xl font-bold text-white">
              {user?.firstname} {user?.lastname}
            </h2>
            <span className="text-xs text-slate-400 mt-0.5">{user?.email}</span>
            <span className="mt-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(96,165,250,0.15)", border: "0.5px solid rgba(96,165,250,0.3)", color: "#60a5fa" }}>
              {roleLabel}
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Prénom</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("firstname")} placeholder="Prénom"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.firstname)} />
                </div>
                {errors.firstname && <p className="text-xs text-red-400">{errors.firstname.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nom</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input {...register("lastname")} placeholder="Nom"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                    style={inputStyle(errors.lastname)} />
                </div>
                {errors.lastname && <p className="text-xs text-red-400">{errors.lastname.message}</p>}
              </div>
            </div>

            {/* Email — lecture seule */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Email <span className="text-slate-500">(non modifiable)</span></label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input value={user?.email ?? ""} readOnly
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-slate-400 outline-none"
                  style={readOnlyStyle} />
              </div>
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

            {/* Date de naissance */}
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

            {/* Rôle — lecture seule */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Rôle <span className="text-slate-500">(non modifiable)</span></label>
              <div className="relative">
                <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input value={roleLabel} readOnly
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-slate-400 outline-none"
                  style={readOnlyStyle} />
              </div>
            </div>

            {/* Messages */}
            {serverError && (
              <div className="px-4 py-3 rounded-xl text-sm text-red-300 text-center"
                style={{ background: "rgba(248,113,113,0.1)", border: "0.5px solid rgba(248,113,113,0.3)" }}>
                {serverError}
              </div>
            )}
            {successMsg && (
              <div className="px-4 py-3 rounded-xl text-sm text-green-300 text-center"
                style={{ background: "rgba(52,211,153,0.1)", border: "0.5px solid rgba(52,211,153,0.3)" }}>
                {successMsg}
              </div>
            )}

            {/* Bouton */}
            <button type="submit" disabled={isSubmitting || (!isDirty && !imageUrl)}
              className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mt-2"
              style={{
                background: isSubmitting
                  ? "rgba(96,165,250,0.2)"
                  : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,1) 50%, rgba(59,130,246,0.6) 100%)",
                border: "0.5px solid rgba(96,165,250,0.4)",
                backdropFilter: "blur(8px)",
                boxShadow: isSubmitting ? "none" : "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(59,130,246,0.3)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}>
              {isSubmitting ? "Enregistrement..." : "Sauvegarder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}