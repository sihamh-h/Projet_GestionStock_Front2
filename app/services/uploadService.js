import api from "./api";

export const uploadService = {
  uploadProductImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/rest/upload/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.url;
  },

  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/rest/upload/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.url;
  },
};