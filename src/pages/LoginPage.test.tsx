import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuthStore } from '@/stores/authStore';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, registerNewStudent } from '@/services/studentService';

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

  it('enables submit button and allows login with registered student credentials', async () => {
    await registerNewStudent({
      email: 'etudiant.inscrit@ecole.fr',
      full_name: 'Étudiant Inscrit',
      password: 'PassSecurise123!',
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/^Mot de passe$/i);

    fireEvent.change(emailInput, { target: { value: 'etudiant.inscrit@ecole.fr' } });
    fireEvent.change(passwordInput, { target: { value: 'PassSecurise123!' } });

    const submitBtn = screen.getByRole('button', { name: /Se connecter/i });
    expect(submitBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(useAuthStore.getState().user).not.toBeNull();
    expect(useAuthStore.getState().user?.email).toBe('etudiant.inscrit@ecole.fr');
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

  it('displays error and rejects login for unregistered student', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/^Mot de passe$/i);

    fireEvent.change(emailInput, { target: { value: 'non.inscrit@ecole.fr' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass12345!' } });

    const submitBtn = screen.getByRole('button', { name: /Se connecter/i });
    expect(submitBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(useAuthStore.getState().user).toBeNull();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Ce compte n'est pas encore inscrit/i)).toBeInTheDocument();
  });

  it('allows direct administrator login for portoduque@outlook.com', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const demoAdminBtn = screen.getByRole('button', { name: /Entrer comme Administrateur/i });
    await act(async () => {
      fireEvent.click(demoAdminBtn);
    });

    expect(useAuthStore.getState().user).not.toBeNull();
    expect(useAuthStore.getState().user?.email).toBe(DEFAULT_ADMIN_EMAIL);
    expect(useAuthStore.getState().profile?.role).toBe('admin');
  });

  it('prefills form inputs with administrator credentials on helper click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const prefillBtn = screen.getByRole('button', { name: /Préremplir le formulaire/i });
    fireEvent.click(prefillBtn);

    const emailInput = screen.getByLabelText(/Adresse e-mail/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Mot de passe$/i) as HTMLInputElement;

    expect(emailInput.value).toBe(DEFAULT_ADMIN_EMAIL);
    expect(passwordInput.value).toBe(DEFAULT_ADMIN_PASSWORD);
  });
});
