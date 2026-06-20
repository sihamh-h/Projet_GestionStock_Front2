import { create } from "zustand";
import { authService } from "@/services/authService";
import {
  saveTokens, clearTokens, saveUser, getSavedUser,
  getAccessToken, isTokenExpired,
} from "@/utils/tokenUtils";
import { translateAuthError } from "@/utils/authErrors";

const ROLE_REDIRECT = {
  ROLE_ADMIN:    "/admin/dashboard",
  ROLE_MANAGER:  "/manager/dashboard",
  ROLE_EMPLOYEE: "/employee/dashboard",
};

const ROLE_PRIORITY = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE"];

function getRedirectFromRoles(roles = []) {
  for (const priorityRole of ROLE_PRIORITY) {
    if (roles.includes(priorityRole)) {
      return ROLE_REDIRECT[priorityRole];
    }
  }
  return "/unauthorized";
 // ou "/login" selon le choix il faut creer unauthorized.jsx dans app/page/unauthorized.jsx pour afficher un message d'accès refusé.
}

function getInitialUser() {
  if (typeof window === "undefined") return null;
  const token = getAccessToken();
  if (!token || isTokenExpired(token)) {
    clearTokens(); // nettoie si expiré
    return null;
  }
  return getSavedUser(); // ← user complet depuis localStorage
}

export const useAuthStore = create((set) => ({
  user:    getInitialUser(),
  loading: false,
  error:   null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const userData = await authService.login(credentials);
       console.log("userData reçu:", userData);          
       console.log("roles:", userData.roles); 
      saveTokens(userData.token, userData.refreshToken);
      saveUser(userData);   
      console.log("user sauvegardé:", getSavedUser());
      set({ user: userData, loading: false });
      return getRedirectFromRoles(userData.roles ?? []);
      console.log("redirect:", redirect);
    }  catch (err) {
    const backendError =
      err.response?.data?.properties?.error ||
      err.response?.data?.error ||
      err.response?.data?.detail ||
      err.response?.data?.message ||
      err.message;
      
    const translated = translateAuthError(backendError);
   
    set({ error: translated, loading: false });
      
      throw new Error(translated);
    }
  },

  registerInfo: async (data) => {
    set({ loading: true, error: null });
    try {
      await authService.registerInfo(data);
      set({loading: false });
    } catch (err) {
    const backendError =
      err.response?.data?.properties?.error ||
      err.response?.data?.detail ||
      err.response?.data?.message ||
      err.message;

    const translated = translateAuthError(backendError);

    set({ error: translated, loading: false });

    throw new Error(translated);
    }
  },

  logout: () => {
    clearTokens(); // supprime access + refresh + user
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));