import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onUpdatePassword: (newPassword: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onUpdatePassword,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (open) {
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirm(false);
      setError(null);
      setFeedback(null);
      setIsSubmitting(false);
    }
  }, [open]);

  // Validation rules evaluation
  const criteria = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };
  }, [password]);

  const allCriteriaMet =
    criteria.length &&
    criteria.uppercase &&
    criteria.lowercase &&
    criteria.number &&
    criteria.special;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);

    if (!password) {
      setError('Veuillez saisir votre nouveau mot de passe.');
      return;
    }

    if (!allCriteriaMet) {
      setError('Le mot de passe doit remplir l’ensemble des critères de sécurité ci-dessous.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les deux mots de passe saisis ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await onUpdatePassword(password);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message });
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Une erreur est survenue lors du changement de mot de passe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Modifier mon Mot de Passe" size="md">
      <form onSubmit={handleSubmit} className="security-modal-form" noValidate>
        {/* Educational / Security Callout */}
        <div className="security-notice-callout">
          <span className="security-notice-icon" aria-hidden="true">💡</span>
          <div className="security-notice-body">
            <p>
              Combinez majuscules, minuscules, chiffres et symboles pour protéger votre compte FLE.
            </p>
          </div>
        </div>

        {feedback && feedback.type === 'success' && (
          <div className="security-success-banner" role="status">
            <span aria-hidden="true">🔒</span>
            <span>{feedback.message}</span>
          </div>
        )}

        {error && (
          <div className="security-error-banner" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* New Password Input with Show/Hide toggle */}
        <div className="security-field-group">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Nouveau mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            icon="🔑"
            required
            autoComplete="new-password"
            disabled={isSubmitting || !!(feedback && feedback.type === 'success')}
            aria-label="Nouveau mot de passe"
            rightElement={
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                title={showPassword ? 'Masquer' : 'Afficher'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            }
          />
        </div>

        {/* Real-time Security Criteria Checklist */}
        <div className="password-criteria-panel" aria-live="polite">
          <span className="password-criteria-title">Exigences de sécurité :</span>
          <ul className="password-criteria-list">
            <li className={`password-criterion ${criteria.length ? 'met' : 'unmet'}`}>
              <span className="criterion-icon" aria-hidden="true">
                {criteria.length ? '✓' : '○'}
              </span>
              <span>Au moins 8 caractères</span>
            </li>
            <li className={`password-criterion ${criteria.uppercase ? 'met' : 'unmet'}`}>
              <span className="criterion-icon" aria-hidden="true">
                {criteria.uppercase ? '✓' : '○'}
              </span>
              <span>1 lettre majuscule (A-Z)</span>
            </li>
            <li className={`password-criterion ${criteria.lowercase ? 'met' : 'unmet'}`}>
              <span className="criterion-icon" aria-hidden="true">
                {criteria.lowercase ? '✓' : '○'}
              </span>
              <span>1 lettre minuscule (a-z)</span>
            </li>
            <li className={`password-criterion ${criteria.number ? 'met' : 'unmet'}`}>
              <span className="criterion-icon" aria-hidden="true">
                {criteria.number ? '✓' : '○'}
              </span>
              <span>1 chiffre (0-9)</span>
            </li>
            <li className={`password-criterion ${criteria.special ? 'met' : 'unmet'}`}>
              <span className="criterion-icon" aria-hidden="true">
                {criteria.special ? '✓' : '○'}
              </span>
              <span>1 caractère spécial (!@#)</span>
            </li>
          </ul>
        </div>

        {/* Confirm Password Input */}
        <div className="security-field-group">
          <Input
            type={showConfirm ? 'text' : 'password'}
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError(null);
            }}
            icon="🔐"
            required
            autoComplete="new-password"
            disabled={isSubmitting || !!(feedback && feedback.type === 'success')}
            aria-label="Confirmer le nouveau mot de passe"
            rightElement={
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                title={showConfirm ? 'Masquer' : 'Afficher'}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            }
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
            disabled={!password || !confirmPassword || !allCriteriaMet || isSubmitting || !!(feedback && feedback.type === 'success')}
            className="security-btn"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
