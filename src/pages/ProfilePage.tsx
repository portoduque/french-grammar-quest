import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { useNavigate } from 'react-router-dom';
import { ProfileEditModal } from '@/components/profile/ProfileEditModal';
import { ChangeEmailModal } from '@/components/profile/ChangeEmailModal';
import { ChangePasswordModal } from '@/components/profile/ChangePasswordModal';

export const ProfilePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, user, logout, isMockMode, updateProfile, updateEmail, updatePassword } = useAuth();
  const { data: progressSummary } = useUserProgress();
  const { achievements, unlockedCount, totalCount, isLoading: isAchLoading, checkAndAward, isChecking } = useAchievements();
  const navigate = useNavigate();

  const [awardFeedback, setAwardFeedback] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCheckAchievements = async () => {
    try {
      const res = await checkAndAward();
      if (res.newly_awarded && res.newly_awarded.length > 0) {
        setAwardFeedback(`🎉 Félicitations ! ${res.newly_awarded.length} nouvelle(s) conquête(s) débloquée(s) !`);
      } else {
        setAwardFeedback('Vos conquêtes sont à jour. Continuez à vous entraîner !');
      }
      setTimeout(() => setAwardFeedback(null), 4000);
    } catch (err) {
      console.warn('[ProfilePage] Erro ao verificar conquistas:', err);
    }
  };

  const handleSaveProfile = async (updates: {
    display_name: string;
    avatar_url: string | null;
    preferences: Record<string, any>;
  }) => {
    await updateProfile(updates);
    setSuccessFeedback('✨ Profil et préférences mis à jour avec succès !');
    setTimeout(() => setSuccessFeedback(null), 4000);
  };

  const handleUpdateEmail = async (newEmail: string) => {
    const res = await updateEmail(newEmail);
    if (res.success) {
      setSuccessFeedback(res.message);
      setTimeout(() => setSuccessFeedback(null), 5000);
    }
    return res;
  };

  const handleUpdatePassword = async (newPassword: string) => {
    const res = await updatePassword(newPassword);
    if (res.success) {
      setSuccessFeedback(res.message);
      setTimeout(() => setSuccessFeedback(null), 5000);
    }
    return res;
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

  const completedSets = progressSummary?.completedCount ?? 0;
  const totalStars = progressSummary?.totalStars ?? 0;
  const accuracyAvg = progressSummary?.accuracyAverage ?? 0;

  const currentPreferences = (profile?.preferences as Record<string, any>) || {};
  const dailyGoalXp = currentPreferences.daily_goal_xp || 50;

  const isImageAvatar = profile?.avatar_url?.startsWith('data:image/') || profile?.avatar_url?.startsWith('http');
  const isGlyphAvatar = profile?.avatar_url && !isImageAvatar;

  return (
    <div className="page page-profile">
      <div className="page-header">
        <h1 className="page-title">
          Profil & Progression
        </h1>
        <p className="page-subtitle">
          Votre passeport d'apprentissage, statistiques et récompenses en langue française
        </p>
      </div>

      {successFeedback && (
        <div
          role="status"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            fontWeight: 600,
            fontSize: '0.9rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {successFeedback}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* User Card */}
        <Card variant="elevated" className="profile-card profile-user-card">
          <div className="profile-user-card-inner">
            <div className="profile-avatar-wrapper">
              <div
                className="profile-avatar-circle"
                role="button"
                tabIndex={0}
                onClick={() => setIsEditModalOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsEditModalOpen(true); }}
                title="Modifier mon avatar"
                aria-label="Modifier l'avatar du profil"
              >
                {isImageAvatar ? (
                  <img
                    src={profile!.avatar_url!}
                    alt={`Avatar de ${profile?.display_name || 'l\'étudiant'}`}
                    className="profile-avatar-img"
                  />
                ) : isGlyphAvatar ? (
                  <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{profile!.avatar_url}</span>
                ) : (
                  <span>{profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : '👤'}</span>
                )}
              </div>
              <button
                type="button"
                className="profile-avatar-badge"
                onClick={() => setIsEditModalOpen(true)}
                aria-label="Modifier l'avatar et la photo"
                title="Modifier l'avatar"
              >
                ✏️
              </button>
            </div>

            <div className="profile-user-info">
              <div className="profile-user-name-row">
                <h2 className="profile-display-name">
                  {profile?.display_name || 'Étudiant'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditModalOpen(true)}
                  icon="✏️"
                  aria-label="Modifier le profil"
                  style={{ minHeight: '36px', padding: '4px 10px', fontSize: '0.8125rem' }}
                >
                  Modifier
                </Button>
              </div>

              <p className="profile-user-email">
                {profile?.email || user?.email || 'Non connecté'}
              </p>

              <div className="profile-badges-row">
                <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
                {isMockMode && <Badge variant="amber">Mode Démo Local</Badge>}
                {profile?.role === 'admin' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/admin')}
                    style={{ minHeight: '36px' }}
                  >
                    Panneau Admin 🛠️
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Global Statistics */}
        <Card variant="elevated" className="profile-card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            📊 Statistiques d'Apprentissage & Gamification
          </h2>
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="profile-stat-icon" aria-hidden="true">⭐</div>
              <div className="profile-stat-num" style={{ color: 'var(--color-primary)' }}>
                {(profile?.xp ?? 0).toLocaleString('fr-FR')}
              </div>
              <div className="profile-stat-label">XP Total</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon" aria-hidden="true">🔥</div>
              <div className="profile-stat-num" style={{ color: '#F59E0B' }}>
                {profile?.streak_days ?? 0}
              </div>
              <div className="profile-stat-label">Jours de Streak</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon" aria-hidden="true">🎯</div>
              <div className="profile-stat-num" style={{ color: '#10B981' }}>
                {completedSets}
              </div>
              <div className="profile-stat-label">Séries Terminées</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon" aria-hidden="true">🌟</div>
              <div className="profile-stat-num" style={{ color: '#EAB308' }}>
                {totalStars}
              </div>
              <div className="profile-stat-label">Étoiles Maîtrisées</div>
            </div>

            <div className="profile-stat-box span-full">
              <div className="profile-stat-icon" aria-hidden="true">📈</div>
              <div className="profile-stat-num" style={{ color: '#6366F1' }}>
                {accuracyAvg}%
              </div>
              <div className="profile-stat-label">Précision Moyenne</div>
            </div>
          </div>
        </Card>

        {/* Achievements Showcase (RF-056) */}
        <Card variant="elevated" className="profile-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
                🏆 Vitrine des Conquêtes & Badges
              </h2>
              <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>
                {unlockedCount} sur {totalCount} conquêtes débloquées ({totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%)
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCheckAchievements}
              disabled={isChecking}
              icon="🔄"
              style={{ minHeight: '44px' }}
            >
              {isChecking ? 'Évaluation...' : 'Actualiser mes Badges'}
            </Button>
          </div>

          {awardFeedback && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}
            >
              {awardFeedback}
            </div>
          )}

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-border)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}
          >
            <div
              style={{
                width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%`,
                height: '100%',
                backgroundColor: '#F59E0B',
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          {isAchLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <Skeleton height="110px" />
              <Skeleton height="110px" />
              <Skeleton height="110px" />
              <Skeleton height="110px" />
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: ach.unlocked ? '2px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--color-border)',
                    backgroundColor: ach.unlocked ? 'rgba(245, 158, 11, 0.04)' : 'var(--color-bg-secondary, rgba(0,0,0,0.02))',
                    opacity: ach.unlocked ? 1 : 0.65,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      fontSize: '2rem',
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: ach.unlocked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0,0,0,0.06)',
                      filter: ach.unlocked ? 'none' : 'grayscale(1)',
                      flexShrink: 0
                    }}
                    aria-hidden="true"
                  >
                    {ach.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                        {ach.title}
                      </h3>
                      <Badge variant={ach.unlocked ? 'amber' : 'default'}>
                        +{ach.xp_reward} XP
                      </Badge>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                      {ach.description}
                    </p>

                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: ach.unlocked ? '#10B981' : 'var(--color-text-muted)' }}>
                      {ach.unlocked ? '✨ Débloquée' : '🔒 Verrouillée'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Preferences */}
        <Card variant="elevated" className="profile-card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            ⚙️ Préférences d'Interface & Apprentissage
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>Thème Visuel</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Basculez entre le mode sombre profond et le mode clair haute lisibilité
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? '☀️' : '🌙'}
              style={{ minHeight: '44px' }}
            >
              {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
            </Button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>Objectif Quotidien</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {dailyGoalXp} XP / jour ({dailyGoalXp === 20 ? 'Découverte • ~5 min' : dailyGoalXp === 100 ? 'Intensif • ~30 min' : 'Régulier • ~15 min'})
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              icon="🎯"
              style={{ minHeight: '44px' }}
            >
              Ajuster l'Objectif
            </Button>
          </div>
        </Card>

        {/* Account actions */}
        <Card variant="elevated" className="profile-card profile-security-card">
          <div className="profile-security-header">
            <div className="profile-security-title-row">
              <h2 className="profile-security-title">
                🔐 Compte & Sécurité
              </h2>
              <Badge variant="emerald">Session active</Badge>
            </div>
            <p className="profile-security-sub">
              Gestion de vos identifiants d'accès et protection cryptographique de session
            </p>
          </div>

          <div className="profile-security-account-info">
            <div className="profile-account-row">
              <span className="profile-account-key">Adresse e-mail associée</span>
              <span className="profile-account-value">{profile?.email || user?.email || 'Non connecté'}</span>
            </div>
          </div>

          <div className="profile-security-actions-grid">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsEmailModalOpen(true)}
              icon="✉️"
              className="security-action-btn"
            >
              Modifier l'adresse e-mail
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsPasswordModalOpen(true)}
              icon="🔑"
              className="security-action-btn"
            >
              Changer le mot de passe
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={handleLogout}
              className="security-action-btn security-logout-btn"
            >
              Se déconnecter 🚪
            </Button>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Change Email Modal */}
      <ChangeEmailModal
        open={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        currentEmail={profile?.email || user?.email || ''}
        onUpdateEmail={handleUpdateEmail}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onUpdatePassword={handleUpdatePassword}
      />
    </div>
  );
};

export default ProfilePage;
