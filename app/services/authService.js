import api from "./api";
import {toBackendDate} from "@/utils/formaDate";

export const authService = {

  login: async ({ email, password }) => {
    const response = await api.post("/api/rest/auth/login", { email, password });
    return response.data.User;
  },


  registerInfo: async (data) => {
     const payload = {
    ...data,
    birthdate: toBackendDate(data.birthdate),
  };
    const response = await api.post("/api/rest/auth/register", payload);
    return response.data;
  },

  forgotPassword: async (email) => {
  await api.post("/api/rest/auth/forgot-password", { email });
},
resetPassword: async (token, password) => {
  await api.post("/api/rest/auth/reset-password", { token, password });
},

activateAccount: async (token) => {
    const response = await api.get(`/api/rest/auth/activate?token=${token}`);
    return response.data; 
  },

   

  refresh: async (refreshToken) => {
    const response = await api.post("/api/rest/auth/refresh", { refreshToken });
    return response.data;
  },

  
};