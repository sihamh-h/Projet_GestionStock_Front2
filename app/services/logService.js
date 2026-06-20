import api from "./api";

export const logService = {
  // GET /api/rest/logs?page=0&size=20&action=...&userId=...&success=...
  getLogs: async ({ action, userId, success, page = 0, size = 20 } = {}) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (action)               params.append("action",  action);
    if (userId)               params.append("userId",  userId);
    if (success !== undefined && success !== null) params.append("success", success);

    const response = await api.get(`/api/rest/logs?${params.toString()}`);
    return response.data;
  },
};