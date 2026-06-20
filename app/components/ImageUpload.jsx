import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

export default function ImageUpload({ value, onChange, uploadFn }) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    console.log("file sélectionné:", file);
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Fichier invalide — image uniquement.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Fichier trop lourd — max 5MB.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const url = await uploadFn(file);  // ← fonction passée en prop
      onChange(url);
    } catch {
      setError("Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)" }}>
          <img src={value} alt="preview" className="w-full h-full object-contain" />
          <button type="button" onClick={() => onChange("")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition-colors">
            <X size={12} className="text-white" />
          </button>
        </div>
      )}

      {!value && (
        <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl cursor-pointer transition-all"
          style={{ background: "rgba(255,255,255,0.06)", border: "0.5px dashed rgba(255,255,255,0.2)" }}>
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-blue-400" />
          ) : (
            <>
              <ImagePlus size={24} className="text-slate-400 mb-1" />
              <span className="text-xs text-slate-400">Cliquer pour uploader (max 5MB)</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}