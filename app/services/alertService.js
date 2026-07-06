import api from "./api";
import { getAccessToken } from "@/utils/tokenUtils";

/**
 * Service de gestion des alertes de stocks.
 *  Fournit les méthodes pour récupérer les alertes actives et les résoudre.
 * 
 */
export const alertService = {
  /**
   * Récupère les alertes de stocks actives.
   * @returns {Promise<Array>} Liste des alertes actives.
   */
  getActiveAlerts: async () => {
    const response = await api.get("/api/rest/alerts");
    return response.data;
  },

  /**
   * Résout une alerte de stock.
   * @param {string} id - L'ID de l'alerte à résoudre.
   * @returns {Promise<void>}
   */
  resolveAlert: async (id) => {
    await api.patch(`/api/rest/alerts/${id}/resolve`);
  },

  
};
