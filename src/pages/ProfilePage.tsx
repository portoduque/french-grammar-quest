import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, user, logout, isMockMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const roleLabel =
    profile?.role === 'admin'
      ? 'Administrateur'
      : profile?.role === 'teacher'
      ? 'Professeur'
      : 'Étudiant';

  const roleBadgeVariant =
    profile?.role === 'admin'
      ? 'rose'
      : profile?.role === 'teacher'
      ? 'violet'
      : 'emerald';

  return (
    <div className="page page-profile">
      <div className="page-header">
        <h1 className="page-title">Profil & Paramètres</h1>
        <p className="page-subtitle">Votre progression d’apprentissage et vos informations</p>
      </div>

      <div className="profile-grid">
        {/* User Card */}
        <Card variant="elevated" className="profile-card profile-user-card">
          <div className="profile-avatar-circle" aria-hidden="true">
            {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div className="profile-user-info">
            <h2 className="profile-user-name">
              {profile?.display_name || 'Utilisateur'}
            </h2>
            <p className="profile-user-email">{profile?.email || user?.email || 'Non connecté'}</p>
            <div className="profile-badges">
              <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
              {isMockMode && <Badge variant="amber">Mode Démo Local</Badge>}
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Statistiques d'Apprentissage</h2>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-icon" aria-hidden="true">⭐</span>
              <span className="profile-stat-value">{(profile?.xp ?? 0).toLocaleString('pt-BR')}</span>
              <span className="profile-stat-label">XP Total</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-icon" aria-hidden="true">🔥</span>
              <span className="profile-stat-value">{profile?.streak_days ?? 0}</span>
              <span className="profile-stat-label">Jours de Streak</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-icon" aria-hidden="true">❤️</span>
              <span className="profile-stat-value">{profile?.hearts ?? 5}/5</span>
              <span className="profile-stat-label">Vies Actuelles</span>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Préférences</h2>
          <div className="profile-setting">
            <span>Thème Visuel</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? '☀️' : '🌙'}
            >
              {theme === 'dark' ? 'Passer au Mode Clair' : 'Passer au Mode Sombre'}
            </Button>
          </div>
        </Card>

        {/* Account actions */}
        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Compte</h2>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>
            Session sécurisée via Supabase Authentication (RLS actif).
          </p>
          <Button
            variant="ghost"
            size="md"
            onClick={handleLogout}
            className="btn-danger-text"
          >
            Se déconnecter 🚪
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
