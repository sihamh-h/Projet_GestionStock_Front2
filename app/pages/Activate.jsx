import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import { authService  } from "@/services/authService";

export function Activate() {
  const navigate = useNavigate();
  const [error,   setError]   = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");

    if (!token) { navigate("/"); return; }

    authService.activateAccount(token)
      .then((data) => {
        // setupToken = PASSWORD_RESET token
        navigate(`/reset-password?token=${data.setupToken}`);
      })
      .catch((err) => {
        const msg = err.response?.data?.message ?? "Lien invalide ou expiré";
        if (msg.toLowerCase().includes("already")) {
          navigate("/");
        } else {
          setError(msg);
        }
      });
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {error ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="px-6 py-4 rounded-2xl text-sm text-red-300"
            style={{ background: "rgba(248,113,113,0.1)", border: "0.5px solid rgba(248,113,113,0.3)" }}>
            {error}
          </div>
          <button onClick={() => navigate("/")}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Retour à l'accueil
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 size={32} className="animate-spin text-blue-400" />
          <p className="text-sm">Activation en cours...</p>
        </div>
      )}
    </main>
  );
}