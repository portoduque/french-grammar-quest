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
  });

  it('renders login form with title, email input and submit button', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('French Grammar Quest')).toBeInTheDocument();
    expect(screen.getByText('Connexion par Lien Magique')).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse e-mail/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Recevoir mon lien magique/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button when valid email is entered', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    fireEvent.change(emailInput, { target: { value: 'marie.curie@sorbonne.fr' } });

    const submitBtn = screen.getByRole('button', { name: /Recevoir mon lien magique/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it('logs in and displays feedback when submitting demo form', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    fireEvent.change(emailInput, { target: { value: 'etudiant@exemple.fr' } });

    const submitBtn = screen.getByRole('button', { name: /Recevoir mon lien magique/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // In mock mode, immediately logs in and shows success or demo banner
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
