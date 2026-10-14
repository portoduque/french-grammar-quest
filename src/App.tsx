import React from 'react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { AppRouter } from '@/app/Router';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  );
};
