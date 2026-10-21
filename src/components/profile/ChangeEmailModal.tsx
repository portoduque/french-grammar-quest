import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface ChangeEmailModalProps {
  open: boolean;
  onClose: () => void;
  currentEmail: string;
  onUpdateEmail: (newEmail: string) => Promise<{
    success: boolean;
    message: string;
    requiresConfirmation?: boolean;
  }>;
}

export const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  open,
  onClose,
  currentEmail,
  onUpdateEmail,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (open) {
      setNewEmail('');
      setConfirmEmail('');
      setError(null);
      setFeedback(null);
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);

    const cleanNew = newEmail.trim().toLowerCase();
    const cleanConfirm = confirmEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanNew) {
      setError('Veuillez renseigner votre nouvelle adresse e-mail.');
      return;
    }

    if (!emailRegex.test(cleanNew)) {
      setError('Format d’adresse e-mail invalide (ex: nom@domaine.fr).');
      return;
    }

    if (currentEmail && cleanNew === currentEmail.trim().toLowerCase()) {
      setError('La nouvelle adresse doit être différente de l’adresse actuelle.');
      return;
    }

    if (cleanNew !== cleanConfirm) {
      setError('Les deux adresses e-mail saisies ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await onUpdateEmail(cleanNew);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message });
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Une erreur inattendue est survenue lors de la mise à jour.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Modifier mon Adresse E-mail" size="md">
      <form onSubmit={handleSubmit} className="security-modal-form" noValidate>
        {/* Current Email Info */}
        <div className="security-current-badge-box">
          <span className="security-badge-label">Adresse e-mail actuelle</span>
          <span className="security-current-email">{currentEmail || 'Non configurée'}</span>
        </div>

        {/* Security Alert / Explanatory Notice */}
        <div className="security-notice-callout">
          <span className="security-notice-icon" aria-hidden="true">🛡️</span>
          <div className="security-notice-body">
            <strong>Protection de vos données :</strong>
            <p>
              Pour des raisons de sécurité, un courriel de validation sera transmis à la nouvelle adresse. Votre session actuelle reste active.
            </p>
          </div>
        </div>

        {feedback && feedback.type === 'success' && (
          <div className="security-success-banner" role="status">
            <span aria-hidden="true">✅</span>
            <span>{feedback.message}</span>
          </div>
        )}

        {error && (
          <div className="security-error-banner" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="security-field-group">
          <Input
            type="email"
            label="Nouvelle adresse e-mail"
            placeholder="etudiant.nouveau@exemple.fr"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              if (error) setError(null);
            }}
            icon="✉️"
            required
            autoComplete="email"
            disabled={isSubmitting || !!(feedback && feedback.type === 'success')}
            aria-label="Nouvelle adresse e-mail"
          />
        </div>

        <div className="security-field-group">
          <Input
            type="email"
            label="Confirmer la nouvelle adresse"
            placeholder="etudiant.nouveau@exemple.fr"
            value={confirmEmail}
            onChange={(e) => {
              setConfirmEmail(e.target.value);
              if (error) setError(null);
            }}
            icon="✉️"
            required
            autoComplete="email"
            disabled={isSubmitting || !!(feedback && feedback.type === 'success')}
            aria-label="Confirmer la nouvelle adresse e-mail"
          />
        </div>

        {/* Action Buttons */}
        <div className="security-modal-actions">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isSubmitting}
            className="security-btn"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            disabled={!newEmail || !confirmEmail || isSubmitting || !!(feedback && feedback.type === 'success')}
            className="security-btn"
          >
            Confirmer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
