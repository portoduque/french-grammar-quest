import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPassword, isLoading, authError, clearError } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Preserve full path including search query params on redirect
  const fromState = (location.state as { from?: { pathname?: string; search?: string } })?.from;
  const redirectTarget = fromState ? `${fromState.pathname || '/dashboard'}${fromState.search || ''}` : '/dashboard';

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return;

    clearError();
    const res = await loginWithPassword(cleanEmail, password);
    if (res.success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="page page-login">
      <div className="login-container">
        <header className="login-brand">
          <span className="login-brand-icon" aria-hidden="true">⚜️</span>
          <h1 className="login-brand-title">French Grammar Quest</h1>
          <p className="login-brand-subtitle">
            Maîtrisez la grammaire française de manière ludique et intuitive
          </p>
        </header>

        <Card variant="elevated" className="login-card">
          {authError && (
            <div className="login-error-banner" role="alert">
              <span aria-hidden="true">⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="login-form">
            <div className="login-card-header">
              <h2 className="login-title">Connexion avec Mot de Passe</h2>
              <p className="login-description">
                Accès réservé aux élèves inscrits par l'administration.
              </p>
            </div>

            <div className="login-field-group">
              <Input
                type="email"
                label="Adresse e-mail"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                icon="✉️"
                aria-label="Adresse e-mail"
              />
            </div>

            <div className="login-field-group" style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Mot de passe"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon="🔒"
                aria-label="Mot de passe"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    title={showPassword ? 'Masquer' : 'Afficher'}
                    className="login-password-toggle-btn"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!email || !password || isLoading}
              className="btn-full-width btn-login-submit"
            >
              Se connecter 🚀
            </Button>
          </form>
        </Card>

        <footer className="login-footer">
          <p className="text-muted">
            Conçu avec rigueur pédagogique (FLE) · 28 chapitres · 2.227 exercices
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
