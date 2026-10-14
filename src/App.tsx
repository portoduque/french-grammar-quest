import React from 'react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { AppRouter } from '@/app/Router';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
