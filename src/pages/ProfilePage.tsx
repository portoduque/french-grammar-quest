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

export const ProfilePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, user, logout, isMockMode } = useAuth();
  const { data: progressSummary } = useUserProgress();
  const { achievements, unlockedCount, totalCount, isLoading: isAchLoading, checkAndAward, isChecking } = useAchievements();
  const navigate = useNavigate();
  const [awardFeedback, setAwardFeedback] = useState<string | null>(null);

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

  return (
    <div className="page page-profile" style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
          Profil & Progression
        </h1>
        <p className="page-subtitle" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
          Votre passeport d'apprentissage, statistiques et récompenses en langue française
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* User Card */}
        <Card variant="elevated" className="profile-card profile-user-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              className="profile-avatar-circle"
              aria-hidden="true"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                fontSize: '1.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
              }}
            >
              {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="profile-user-info" style={{ flex: 1, minWidth: '220px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
                {profile?.display_name || 'Étudiant'}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                {profile?.email || user?.email || 'Non connecté'}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
                {isMockMode && <Badge variant="amber">Mode Démo Local</Badge>}
              </div>
            </div>
          </div>
        </Card>

        {/* Global Statistics */}
        <Card variant="elevated" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            📊 Statistiques d'Apprentissage & Gamification
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem'
            }}
          >
            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }} aria-hidden="true">⭐</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {(profile?.xp ?? 0).toLocaleString('fr-FR')}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>XP Total</div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }} aria-hidden="true">🔥</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F59E0B' }}>
                {profile?.streak_days ?? 0}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Jours de Streak</div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }} aria-hidden="true">🎯</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>
                {completedSets}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Séries Terminées</div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }} aria-hidden="true">🌟</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EAB308' }}>
                {totalStars}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Étoiles Maîtrisées</div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }} aria-hidden="true">📈</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6366F1' }}>
                {accuracyAvg}%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Précision Moyenne</div>
            </div>
          </div>
        </Card>

        {/* Achievements Showcase (RF-056) */}
        <Card variant="elevated" style={{ padding: '1.5rem' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <Skeleton height="110px" />
              <Skeleton height="110px" />
              <Skeleton height="110px" />
              <Skeleton height="110px" />
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                      filter: ach.unlocked ? 'none' : 'grayscale(1)'
                    }}
                    aria-hidden="true"
                  >
                    {ach.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
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
        <Card variant="elevated" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            ⚙️ Préférences d'Interface
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
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
            >
              {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
            </Button>
          </div>
        </Card>

        {/* Account actions */}
        <Card variant="elevated" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🔐 Compte & Sécurité
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            Session chiffrée sécurisée via Supabase Authentication avec isolation stricte des données (RLS actif).
          </p>
          <Button
            variant="ghost"
            size="md"
            onClick={handleLogout}
            style={{ color: '#EF4444' }}
          >
            Se déconnecter 🚪
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
