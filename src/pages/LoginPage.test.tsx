import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuthStore } from '@/stores/authStore';

describe('LoginPage', () => {
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
    localStorage.clear();
  });

  it('renders login form with brand header, password tab and inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('French Grammar Quest')).toBeInTheDocument();
    expect(screen.getByText('Connexion avec Mot de Passe')).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Mot de passe$/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Se connecter/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button and allows login with password', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/^Mot de passe$/i);

    fireEvent.change(emailInput, { target: { value: 'etudiant@frenchgrammarquest.app' } });
    fireEvent.change(passwordInput, { target: { value: 'Quest2026!' } });

    const submitBtn = screen.getByRole('button', { name: /Se connecter/i });
    expect(submitBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(useAuthStore.getState().user).not.toBeNull();
    expect(useAuthStore.getState().profile?.role).toBe('student');
  });

  it('toggles password visibility with accessible eye button', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^Mot de passe$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleBtn = screen.getByRole('button', { name: /Afficher le mot de passe/i });
    fireEvent.click(toggleBtn);

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /Masquer le mot de passe/i })).toBeInTheDocument();
  });

  it('switches to magic link tab and renders magic link form', async () => {
    render(
      <MemoryRouter initialEntries={['/login?tab=magic']}>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Connexion par Lien Magique')).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/Adresse e-mail pour lien magique/i);
    fireEvent.change(emailInput, { target: { value: 'etudiant@exemple.fr' } });

    const submitBtn = screen.getByRole('button', { name: /Recevoir mon lien magique/i });
    expect(submitBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(useAuthStore.getState().user).not.toBeNull();
  });

  it('allows one-click demo login as student', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const demoStudentBtn = screen.getByRole('button', { name: /Entrer comme Étudiant/i });
    fireEvent.click(demoStudentBtn);

    expect(useAuthStore.getState().user).not.toBeNull();
    expect(useAuthStore.getState().profile?.role).toBe('student');
  });

  it('allows one-click demo login as administrator', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const demoAdminBtn = screen.getByRole('button', { name: /Entrer comme Professeur \/ Admin/i });
    fireEvent.click(demoAdminBtn);

    expect(useAuthStore.getState().user).not.toBeNull();
    expect(useAuthStore.getState().profile?.role).toBe('admin');
  });
});
