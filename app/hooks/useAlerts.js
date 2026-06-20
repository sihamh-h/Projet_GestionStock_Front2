import { useState, useEffect, useCallback } from "react";
import { alertService } from "@/services/alertService";
import { getAccessToken } from "@/utils/tokenUtils";

export function useAlerts() {
  const [alerts,  setAlerts]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await alertService.getActiveAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();

    const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
    const token = getAccessToken();

    const es = new EventSource(`${baseUrl}/api/rest/alerts/stream?token=${token}`);

    es.onopen    = () => console.log("[SSE] connexion ouverte");
    es.onmessage = (event) => {
      try {
        const newAlert = JSON.parse(event.data);
        setAlerts((prev) => {
          const exists = prev.find((a) => a.id === newAlert.id);
          if (exists) return prev.map((a) => a.id === newAlert.id ? newAlert : a);
          return [newAlert, ...prev];
        });
      } catch {
        fetchAlerts();
      }
    };
    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  const resolveAlert = async (id) => {
    await alertService.resolveAlert(id);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return { alerts, loading, error, fetchAlerts, resolveAlert };
}