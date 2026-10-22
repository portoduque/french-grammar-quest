import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/services/studentService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPassword, loginWithMagicLink, setMockUser, isLoading, authError, clearError } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';
  const initialTab = searchParams.get('tab') === 'magic' ? 'magic' : 'password';

  const [activeTab, setActiveTab] = useState<'password' | 'magic'>(initialTab);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

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

  const handleMagicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    clearError();
    setSentMessage(null);

    const result = await loginWithMagicLink(cleanEmail);
    if (result.success) {
      setSentMessage(result.message);
    }
  };

  const handleAdminDirectLogin = () => {
    clearError();
    setMockUser(DEFAULT_ADMIN_EMAIL, 'admin');
    navigate(redirectTarget, { replace: true });
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
            <div>
              {/* Tab Selector */}
              <div
                className="login-tabs-nav"
                role="tablist"
                aria-label="Méthode de connexion"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4px',
                  backgroundColor: 'var(--color-bg-subtle, rgba(255,255,255,0.05))',
                  padding: '4px',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'password'}
                  onClick={() => {
                    clearError();
                    setActiveTab('password');
                  }}
                  style={{
                    minHeight: '44px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'password' ? 700 : 500,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: activeTab === 'password' ? 'var(--color-primary, #2563EB)' : 'transparent',
                    color: activeTab === 'password' ? '#FFFFFF' : 'var(--color-text-muted, #94A3B8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span aria-hidden="true">🔑</span>
                  <span>Mot de Passe</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'magic'}
                  onClick={() => {
                    clearError();
                    setActiveTab('magic');
                  }}
                  style={{
                    minHeight: '44px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'magic' ? 700 : 500,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: activeTab === 'magic' ? 'var(--color-primary, #2563EB)' : 'transparent',
                    color: activeTab === 'magic' ? '#FFFFFF' : 'var(--color-text-muted, #94A3B8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span aria-hidden="true">✨</span>
                  <span>Lien Magique</span>
                </button>
              </div>

              {authError && (
                <div className="login-error-banner" role="alert" style={{ marginBottom: '1rem' }}>
                  <span aria-hidden="true">⚠️</span>
                  <span>{authError}</span>
                </div>
              )}

              {activeTab === 'password' ? (
                /* Tab 1: Password Login Form */
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
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            minWidth: '44px',
                            minHeight: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)',
                          }}
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
                    className="btn-full-width"
                    style={{ minHeight: '48px', marginTop: '0.5rem' }}
                  >
                    Se connecter 🚀
                  </Button>
                </form>
              ) : (
                /* Tab 2: Magic Link Form */
                <form onSubmit={handleMagicSubmit} className="login-form">
                  <div className="login-card-header">
                    <h2 className="login-title">Connexion par Lien Magique</h2>
                    <p className="login-description">
                      Accès privé par invitation. Entrez votre adresse e-mail pour recevoir votre lien sécurisé.
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
                      aria-label="Adresse e-mail pour lien magique"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    disabled={!email || !email.includes('@') || isLoading}
                    className="btn-full-width"
                    style={{ minHeight: '48px', marginTop: '0.5rem' }}
                  >
                    Recevoir mon lien magique ✨
                  </Button>
                </form>
              )}

              <div className="login-divider" style={{ margin: '1.25rem 0' }}>
                <span>accès réservé</span>
              </div>

              <div className="admin-login-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleAdminDirectLogin}
                  className="btn-full-width btn-admin-demo"
                  style={{ minHeight: '44px' }}
                >
                  Entrer comme Administrateur ({DEFAULT_ADMIN_EMAIL}) 👨‍🏫
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEmail(DEFAULT_ADMIN_EMAIL);
                    setPassword(DEFAULT_ADMIN_PASSWORD);
                  }}
                  className="btn-full-width"
                  style={{ minHeight: '44px', fontSize: '0.825rem' }}
                >
                  🔑 Préremplir le formulaire avec l'Admin
                </Button>
              </div>
            </div>
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
