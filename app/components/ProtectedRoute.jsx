import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children, requiredRole }) {
   const { isAuthenticated, user, loading } = useAuth();
   const [mounted, setMounted] = useState(false);


   useEffect(() => {
    setMounted(true);
  }, []);

   console.log("ProtectedRoute:", { isAuthenticated, user, loading });

  if (loading) return null;


   if (!mounted || loading) return null;

  // Pas connecté → retour à l'accueil
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Rôle insuffisant → accueil
  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}