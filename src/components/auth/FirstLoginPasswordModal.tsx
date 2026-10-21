import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export interface FirstLoginPasswordModalProps {
  isOpen?: boolean;
  onDismiss?: () => void;
  onSuccess?: () => void;
}

export const FirstLoginPasswordModal: React.FC<FirstLoginPasswordModalProps> = ({
  isOpen: propsIsOpen,
  onDismiss: propsOnDismiss,
  onSuccess: propsOnSuccess,
}) => {
  const { isTemporaryPassword, firstLoginPromptDismissed, dismissFirstLoginNotice, updatePassword } = useAuth();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : (isTemporaryPassword && !firstLoginPromptDismissed);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        handleDismiss();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting]);

  if (!isOpen) return null;

  const criteria = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const allCriteriaMet =
    criteria.length && criteria.upper && criteria.lower && criteria.number && criteria.special;
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit = allCriteriaMet && passwordsMatch && !isSubmitting;

  const handleDismiss = () => {
    if (propsOnDismiss) {
      propsOnDismiss();
    } else {
      dismissFirstLoginNotice();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await updatePassword(newPassword);
      setIsSuccess(true);
      if (propsOnSuccess) propsOnSuccess();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Une erreur est survenue lors du changement de mot de passe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="first-login-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-login-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleDismiss();
        }
      }}
    >
      <div
        className="first-login-modal-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface, #1e293b)',
          color: 'var(--color-text, #f8fafc)',
          border: '1px solid var(--color-border, #334155)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
          boxSizing: 'border-box',
        }}
      >
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <h2
              id="first-login-modal-title"
              style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}
            >
              Mot de passe mis à jour !
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted, #94a3b8)',
                lineHeight: 1.5,
                margin: '0 0 1.5rem 0',
              }}
            >
              Votre nouveau mot de passe personnalisé est bien enregistré. Vous pourrez l'utiliser lors de vos prochaines connexions.
            </p>
            <Button
              variant="primary"
              onClick={handleDismiss}
              style={{
                width: '100%',
                minHeight: '44px',
                minWidth: '44px',
                fontWeight: 700,
              }}
            >
              Accéder à mon parcours d'apprentissage 🚀
            </Button>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>🔐</div>
                <h2
                  id="first-login-modal-title"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Bienvenue dans votre espace !
                </h2>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Fermer la boîte de dialogue"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted, #94a3b8)',
                  cursor: 'pointer',
                  padding: '8px',
                  minHeight: '44px',
                  minWidth: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  borderRadius: '8px',
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted, #94a3b8)',
                lineHeight: 1.5,
                margin: '0 0 1rem 0',
              }}
            >
              Votre compte a été initialisé avec un mot de passe par défaut. Vous pouvez le personnaliser dès maintenant pour sécuriser votre compte, ou conserver le mot de passe actuel.
            </p>

            {errorMessage && (
              <div
                role="alert"
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="new-password-input"
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  Nouveau mot de passe
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="new-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 caractères sécurisés"
                    autoComplete="new-password"
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '0.65rem 2.75rem 0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border, #334155)',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      color: 'var(--color-text, #f8fafc)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    style={{
                      position: 'absolute',
                      right: '2px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted, #94a3b8)',
                      minHeight: '44px',
                      minWidth: '44px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Password criteria checklist */}
              <div
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid var(--color-border, #334155)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.75rem',
                  marginBottom: '1rem',
                  fontSize: '0.775rem',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-muted, #94a3b8)' }}>
                  Exigences de sécurité :
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem' }}>
                  <div style={{ color: criteria.length ? '#10B981' : 'var(--color-text-muted, #94a3b8)' }}>
                    {criteria.length ? '✓' : '○'} Au moins 8 caractères
                  </div>
                  <div style={{ color: criteria.upper ? '#10B981' : 'var(--color-text-muted, #94a3b8)' }}>
                    {criteria.upper ? '✓' : '○'} Une majuscule (A-Z)
                  </div>
                  <div style={{ color: criteria.lower ? '#10B981' : 'var(--color-text-muted, #94a3b8)' }}>
                    {criteria.lower ? '✓' : '○'} Une minuscule (a-z)
                  </div>
                  <div style={{ color: criteria.number ? '#10B981' : 'var(--color-text-muted, #94a3b8)' }}>
                    {criteria.number ? '✓' : '○'} Un chiffre (0-9)
                  </div>
                  <div style={{ color: criteria.special ? '#10B981' : 'var(--color-text-muted, #94a3b8)' }}>
                    {criteria.special ? '✓' : '○'} Un caractère spécial (!@#$...)
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="confirm-password-input"
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirm-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répétez le nouveau mot de passe"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${
                      confirmPassword.length > 0 && !passwordsMatch
                        ? '#EF4444'
                        : 'var(--color-border, #334155)'
                    }`,
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    color: 'var(--color-text, #f8fafc)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', display: 'block', marginTop: '0.25rem' }}>
                    Les mots de passe ne correspondent pas
                  </span>
                )}
              </div>

              {/* Action buttons stacked for mobile ergonomics */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canSubmit}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    minWidth: '44px',
                    fontWeight: 700,
                  }}
                >
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer mon nouveau mot de passe'}
                </Button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    minWidth: '44px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border, #334155)',
                    color: 'var(--color-text-muted, #94a3b8)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxSizing: 'border-box',
                  }}
                >
                  Conserver le mot de passe actuel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
