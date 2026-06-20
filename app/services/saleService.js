import api from "./api";

export const saleService = {
  // GET /api/rest/sales
  getAll: async () => {
    const response = await api.get("/api/rest/sales");
    return response.data;
  },

  // GET /api/rest/sales/{id}
  getById: async (id) => {
    const response = await api.get(`/api/rest/sales/${id}`);
    return response.data;
  },

  // POST /api/rest/sales/create
  // payload: { saleNumber, lines: [{ productId, quantity }] }
  create: async (data) => {
    const response = await api.post("/api/rest/sales/create", data);
    return response.data;
  },
};