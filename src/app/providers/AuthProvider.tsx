import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  return <>{children}</>;
};
