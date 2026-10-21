import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfilePage } from './ProfilePage';
import { useAuthStore } from '@/stores/authStore';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

// Mock dialog element showModal/close for jsdom
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

describe('ProfilePage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    useAuthStore.setState({
      user: {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'etudiant@frenchgrammarquest.app',
      } as any,
      profile: {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'etudiant@frenchgrammarquest.app',
        display_name: 'Émile Zola',
        avatar_url: '⚜️',
        role: 'student',
        timezone: 'Europe/Paris',
        preferences: { theme: 'light', sound: true, daily_goal_xp: 50 },
        hearts: 5,
        max_hearts: 5,
        xp: 150,
        level: 2,
        streak_days: 3,
        streak_frozen: false,
        last_active_date: '2026-10-21',
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-10-21T00:00:00Z',
      },
      isLoading: false,
      isInitialized: true,
      authError: null,
      isMockMode: true,
    });
  });

  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <ProfilePage />
          </QueryClientProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

  it('renders profile title, user name, email, badges and statistics', () => {
    renderWithProviders();

    expect(screen.getByText('Profil & Progression')).toBeInTheDocument();
    expect(screen.getByText('Émile Zola')).toBeInTheDocument();
    expect(screen.getAllByText('etudiant@frenchgrammarquest.app').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Étudiant')).toBeInTheDocument();
    expect(screen.getByText('Mode Démo Local')).toBeInTheDocument();

    // Stats
    expect(screen.getByText('XP Total')).toBeInTheDocument();
    expect(screen.getByText('Jours de Streak')).toBeInTheDocument();
    expect(screen.getByText('Séries Terminées')).toBeInTheDocument();
    expect(screen.getByText('Étoiles Maîtrisées')).toBeInTheDocument();
    expect(screen.getByText('Précision Moyenne')).toBeInTheDocument();
  });

  it('opens ProfileEditModal when clicking on Modifier button', async () => {
    renderWithProviders();

    const modifyBtn = screen.getByRole('button', { name: /Modifier le profil/i });
    fireEvent.click(modifyBtn);

    expect(screen.getByText('Modifier mon Profil')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom d'affichage ou Pseudonyme/i)).toBeInTheDocument();
    expect(screen.getByText(/Insignes FLE/i)).toBeInTheDocument();
    expect(screen.getByText(/Photo Personnelle/i)).toBeInTheDocument();
  });

  it('allows updating display name and saving profile', async () => {
    renderWithProviders();

    // Open modal
    const modifyBtn = screen.getByRole('button', { name: /Modifier le profil/i });
    fireEvent.click(modifyBtn);

    // Edit display name
    const input = screen.getByLabelText(/Nom d'affichage ou Pseudonyme/i);
    fireEvent.change(input, { target: { value: 'Gustave Flaubert' } });

    // Select avatar preset
    const presetBtn = screen.getByTitle('Gourmet');
    fireEvent.click(presetBtn);

    // Click submit
    const saveBtn = screen.getByRole('button', { name: /Enregistrer les modifications/i });
    await act(async () => {
      fireEvent.click(saveBtn);
    });

    // Check store updated
    expect(useAuthStore.getState().profile?.display_name).toBe('Gustave Flaubert');
    expect(useAuthStore.getState().profile?.avatar_url).toBe('🥐');

    // Check success feedback appears
    await waitFor(() => {
      expect(screen.getByText(/Profil et préférences mis à jour avec succès/i)).toBeInTheDocument();
    });
  });

  it('allows checking and refreshing badges without error', async () => {
    renderWithProviders();

    const refreshBadgesBtn = screen.getByRole('button', { name: /Actualiser mes Badges/i });
    await act(async () => {
      fireEvent.click(refreshBadgesBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Vos conquêtes sont à jour/i)).toBeInTheDocument();
    });
  });

  it('toggles theme when clicking on Mode Sombre / Mode Clair', () => {
    renderWithProviders();

    const themeToggleBtn = screen.getByRole('button', { name: /Mode Sombre|Mode Clair/i });
    fireEvent.click(themeToggleBtn);

    // Theme toggled
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();
  });

  it('renders Compte & Sécurité section with email and security buttons', () => {
    renderWithProviders();

    expect(screen.getByText(/Compte & Sécurité/i)).toBeInTheDocument();
    expect(screen.getByText(/Session active/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Modifier l'adresse e-mail/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Changer le mot de passe/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se déconnecter/i })).toBeInTheDocument();
  });

  it('opens ChangeEmailModal, validates input, and updates email', async () => {
    renderWithProviders();

    const emailBtn = screen.getByRole('button', { name: /Modifier l'adresse e-mail/i });
    fireEvent.click(emailBtn);

    expect(screen.getByText('Modifier mon Adresse E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nouvelle adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmer la nouvelle adresse e-mail/i)).toBeInTheDocument();

    const newEmailInput = screen.getByLabelText(/^Nouvelle adresse e-mail/i);
    const confirmEmailInput = screen.getByLabelText(/Confirmer la nouvelle adresse e-mail/i);

    fireEvent.change(newEmailInput, { target: { value: 'victor.hugo@french.app' } });
    fireEvent.change(confirmEmailInput, { target: { value: 'victor.hugo@french.app' } });

    const submitBtn = screen.getByRole('button', { name: /Confirmer/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(useAuthStore.getState().profile?.email).toBe('victor.hugo@french.app');
  });

  it('opens ChangePasswordModal, displays criteria checklist, and updates password', async () => {
    renderWithProviders();

    const passBtn = screen.getByRole('button', { name: /Changer le mot de passe/i });
    fireEvent.click(passBtn);

    expect(screen.getByText('Modifier mon Mot de Passe')).toBeInTheDocument();
    expect(screen.getByText('Exigences de sécurité :')).toBeInTheDocument();
    expect(screen.getByText('Au moins 8 caractères')).toBeInTheDocument();

    const passInput = screen.getByLabelText(/^Nouveau mot de passe/i);
    const confirmInput = screen.getByLabelText(/Confirmer le nouveau mot de passe/i);

    // Type strong password
    fireEvent.change(passInput, { target: { value: 'Paris@2026!' } });
    fireEvent.change(confirmInput, { target: { value: 'Paris@2026!' } });

    const submitBtn = screen.getByRole('button', { name: /Enregistrer/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Votre mot de passe a été mis à jour avec succès/i).length).toBeGreaterThanOrEqual(1);
    });
  });
});
