import api from "./api";
import { getAccessToken } from "@/utils/tokenUtils";

export const alertService = {
  // GET /api/rest/alerts
  getActiveAlerts: async () => {
    const response = await api.get("/api/rest/alerts");
    return response.data;
  },

  // PATCH /api/rest/alerts/{id}/resolve
  resolveAlert: async (id) => {
    await api.patch(`/api/rest/alerts/${id}/resolve`);
  },

  
};