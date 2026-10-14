import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthGuard, AdminGuard } from './AuthGuard';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@supabase/supabase-js';

describe('AuthGuard & AdminGuard', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      isInitialized: true,
      authError: null,
      isMockMode: true,
    });
  });

  describe('AuthGuard', () => {
    it('shows loading indicator when auth is not initialized or loading', () => {
      useAuthStore.setState({ isInitialized: false, isLoading: true });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <AuthGuard>
                  <div>Secret Content</div>
                </AuthGuard>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Chargement de votre session...')).toBeInTheDocument();
      expect(screen.queryByText('Secret Content')).toBeNull();
    });

    it('redirects unauthenticated users to /login', () => {
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <AuthGuard>
                  <div>Secret Content</div>
                </AuthGuard>
              }
            />
            <Route path="/login" element={<div>Login Page Mock</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Login Page Mock')).toBeInTheDocument();
      expect(screen.queryByText('Secret Content')).toBeNull();
    });

    it('renders protected content when user is authenticated', () => {
      useAuthStore.setState({
        user: { id: 'u1', email: 'test@user.fr' } as User,
        profile: {
          id: 'u1',
          email: 'test@user.fr',
          display_name: 'Testeur',
          avatar_url: null,
          role: 'student',
          timezone: 'UTC',
          preferences: null,
          hearts: 5,
          max_hearts: 5,
          xp: 10,
          level: 1,
          streak_days: 0,
          streak_frozen: false,
          last_active_date: null,
          created_at: '',
          updated_at: '',
        },
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <AuthGuard>
                  <div>Secret Content</div>
                </AuthGuard>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Secret Content')).toBeInTheDocument();
    });
  });

  describe('AdminGuard', () => {
    it('redirects students to /dashboard', () => {
      useAuthStore.setState({
        user: { id: 'u2', email: 'etudiant@user.fr' } as User,
        profile: {
          id: 'u2',
          email: 'etudiant@user.fr',
          display_name: 'Étudiant',
          avatar_url: null,
          role: 'student',
          timezone: 'UTC',
          preferences: null,
          hearts: 5,
          max_hearts: 5,
          xp: 10,
          level: 1,
          streak_days: 0,
          streak_frozen: false,
          last_active_date: null,
          created_at: '',
          updated_at: '',
        },
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <div>Admin Secret</div>
                </AdminGuard>
              }
            />
            <Route path="/dashboard" element={<div>Dashboard Mock</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Dashboard Mock')).toBeInTheDocument();
      expect(screen.queryByText('Admin Secret')).toBeNull();
    });

    it('allows admin users to view admin content', () => {
      useAuthStore.setState({
        user: { id: 'u3', email: 'prof@user.fr' } as User,
        profile: {
          id: 'u3',
          email: 'prof@user.fr',
          display_name: 'Professeur Admin',
          avatar_url: null,
          role: 'admin',
          timezone: 'UTC',
          preferences: null,
          hearts: 5,
          max_hearts: 5,
          xp: 1000,
          level: 10,
          streak_days: 15,
          streak_frozen: false,
          last_active_date: null,
          created_at: '',
          updated_at: '',
        },
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <div>Admin Secret</div>
                </AdminGuard>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Admin Secret')).toBeInTheDocument();
    });
  });
});
