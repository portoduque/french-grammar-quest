import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithMagicLink, setMockUser, isLoading, authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  // Default redirect is /dashboard or where user came from
  const fromLocation = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    clearError();
    setSentMessage(null);

    const result = await loginWithMagicLink(email.trim());
    if (result.success) {
      setSentMessage(result.message);
    }
  };

  const handleDemoLogin = (role: 'student' | 'admin') => {
    setMockUser(role === 'admin' ? 'professeur@frenchgrammarquest.app' : 'etudiant@frenchgrammarquest.app', role);
    navigate(fromLocation, { replace: true });
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
          {sentMessage ? (
            <div className="login-success-state" role="alert">
              <span className="success-icon" aria-hidden="true">📩</span>
              <h2 className="login-title">Consultez votre boîte mail !</h2>
              <p className="login-description">{sentMessage}</p>
              <p className="login-tip">
                <em>Astuce :</em> Cliquez sur le lien reçu pour vous connecter automatiquement sans mot de passe.
              </p>
              <Button
                variant="secondary"
                className="btn-full-width"
                onClick={() => setSentMessage(null)}
              >
                Essayer avec une autre adresse
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-card-header">
                <h2 className="login-title">Connexion par Lien Magique</h2>
                <p className="login-description">
                  Accès privé par invitation. Entrez votre adresse e-mail pour recevoir votre lien sécurisé.
                </p>
              </div>

              {authError && (
                <div className="login-error-banner" role="alert">
                  <span aria-hidden="true">⚠️</span>
                  <span>{authError}</span>
                </div>
              )}

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
                  aria-label="Adresse e-mail pour lien magique"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                disabled={!email || !email.includes('@')}
                className="btn-full-width"
              >
                Recevoir mon lien magique ✨
              </Button>

              <div className="login-divider">
                <span>ou continuez pour tester l’application</span>
              </div>

              <div className="demo-login-actions">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => handleDemoLogin('student')}
                  className="btn-full-width"
                >
                  Entrer comme Étudiant (Démo) 🎒
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="btn-full-width btn-admin-demo"
                >
                  Entrer comme Professeur / Admin 👨‍🏫
                </Button>
              </div>
            </form>
          )}
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
