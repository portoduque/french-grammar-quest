import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export interface AuthGuardProps {
  children?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized || isLoading) {
    return (
      <div className="auth-loading-screen" role="status" aria-label="Chargement de votre session">
        <div className="loader-spinner" />
        <p className="loader-text">Chargement de votre session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const AdminGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized || isLoading) {
    return (
      <div className="auth-loading-screen" role="status" aria-label="Vérification des permissions">
        <div className="loader-spinner" />
        <p className="loader-text">Vérification des permissions administrateur...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
