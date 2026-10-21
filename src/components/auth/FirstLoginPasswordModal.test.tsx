import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FirstLoginPasswordModal } from './FirstLoginPasswordModal';
import * as authHook from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth');

describe('FirstLoginPasswordModal', () => {
  const mockDismissFirstLoginNotice = vi.fn();
  const mockUpdatePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (authHook.useAuth as any).mockReturnValue({
      user: { id: 'u1', email: 'etudiant@example.com' },
      isTemporaryPassword: true,
      firstLoginPromptDismissed: false,
      dismissFirstLoginNotice: mockDismissFirstLoginNotice,
      updatePassword: mockUpdatePassword,
    });
  });

  it('renders nothing when isOpen is false', () => {
    (authHook.useAuth as any).mockReturnValue({
      user: { id: 'u1' },
      isTemporaryPassword: false,
      firstLoginPromptDismissed: false,
      dismissFirstLoginNotice: mockDismissFirstLoginNotice,
      updatePassword: mockUpdatePassword,
    });

    const { container } = render(<FirstLoginPasswordModal />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal when user has temporary password and has not dismissed prompt', () => {
    render(<FirstLoginPasswordModal />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Bienvenue dans votre espace !/i)).toBeInTheDocument();
    expect(screen.getByText(/Votre compte a été initialisé avec un mot de passe par défaut/i)).toBeInTheDocument();
    expect(screen.getByText('Conserver le mot de passe actuel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enregistrer mon nouveau mot de passe/i })).toBeDisabled();
  });

  it('calls dismiss when "Conserver le mot de passe actuel" is clicked', () => {
    const onDismissProp = vi.fn();
    render(<FirstLoginPasswordModal onDismiss={onDismissProp} />);

    const dismissBtn = screen.getByText('Conserver le mot de passe actuel');
    fireEvent.click(dismissBtn);

    expect(onDismissProp).toHaveBeenCalledTimes(1);
  });

  it('calls default dismissFirstLoginNotice when onDismiss prop is not provided', () => {
    render(<FirstLoginPasswordModal />);

    const dismissBtn = screen.getByText('Conserver le mot de passe actuel');
    fireEvent.click(dismissBtn);

    expect(mockDismissFirstLoginNotice).toHaveBeenCalledTimes(1);
  });

  it('toggles password visibility with accessible button', () => {
    render(<FirstLoginPasswordModal />);

    const passwordInput = screen.getByLabelText(/^Nouveau mot de passe/i) as HTMLInputElement;
    expect(passwordInput.type).toBe('password');

    const toggleBtn = screen.getByLabelText(/Afficher le mot de passe/i);
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('password');
  });

  it('validates password requirements and enables submit when criteria match', async () => {
    mockUpdatePassword.mockResolvedValueOnce(undefined);
    const onSuccessProp = vi.fn();

    render(<FirstLoginPasswordModal onSuccess={onSuccessProp} />);

    const passwordInput = screen.getByLabelText(/^Nouveau mot de passe/i);
    const confirmInput = screen.getByLabelText(/Confirmer le mot de passe/i);
    const submitBtn = screen.getByRole('button', { name: /Enregistrer mon nouveau mot de passe/i });

    // Weak password
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.change(confirmInput, { target: { value: 'short' } });
    expect(submitBtn).toBeDisabled();

    // Valid strong password but mismatch
    fireEvent.change(passwordInput, { target: { value: 'Francais2026!' } });
    fireEvent.change(confirmInput, { target: { value: 'Francais2026?' } });
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();

    // Matching valid password
    fireEvent.change(confirmInput, { target: { value: 'Francais2026!' } });
    expect(submitBtn).toBeEnabled();

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith('Francais2026!');
      expect(onSuccessProp).toHaveBeenCalled();
      expect(screen.getByText(/Mot de passe mis à jour !/i)).toBeInTheDocument();
    });
  });

  it('displays error message when updatePassword fails', async () => {
    mockUpdatePassword.mockRejectedValueOnce(new Error('Erreur de connexion au serveur'));

    render(<FirstLoginPasswordModal />);

    const passwordInput = screen.getByLabelText(/^Nouveau mot de passe/i);
    const confirmInput = screen.getByLabelText(/Confirmer le mot de passe/i);
    const submitBtn = screen.getByRole('button', { name: /Enregistrer mon nouveau mot de passe/i });

    fireEvent.change(passwordInput, { target: { value: 'Francais2026!' } });
    fireEvent.change(confirmInput, { target: { value: 'Francais2026!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Erreur de connexion au serveur/i);
    });
  });
});
