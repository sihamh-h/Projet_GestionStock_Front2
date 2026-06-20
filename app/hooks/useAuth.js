import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, loading, error, login, logout, clearError, registerInfo, } = useAuthStore();

  const isAuthenticated = !!user;
  const isAdmin    = user?.roles?.includes("ROLE_ADMIN")    ?? false;
  const isManager  = user?.roles?.includes("ROLE_MANAGER")  ?? false;
  const isEmployee = user?.roles?.includes("ROLE_EMPLOYEE") ?? false;

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated,
    isAdmin,
    isManager,
    isEmployee,
    registerInfo,
  };
}