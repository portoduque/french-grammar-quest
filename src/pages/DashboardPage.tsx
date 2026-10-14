import React from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/stores/authStore';
import { useUserProgress, useRecentSession } from '@/hooks/useUserProgress';

const DashboardPage: React.FC = () => {
  const profile = useAuthStore((s) => s.profile);
  const { data: progressData } = useUserProgress();
  const { data: recentSession } = useRecentSession();

  const totalExercises = CHAPTERS_SUMMARY.reduce((sum, ch) => sum + ch.exerciseGroups, 0);
  const completedCount = progressData?.completedCount ?? 0;
  const totalStars = progressData?.totalStars ?? 0;
  const accuracyAverage = progressData?.accuracyAverage ?? 0;
  const progressPercent = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Destino do botão de continuação: última sessão ativa, ou último progresso, ou catálogo
  const continueLink = recentSession?.exercise_set_id
    ? `/exercise/${recentSession.exercise_set_id}`
    : progressData?.recentProgress?.exercise_set_id
    ? `/exercise/${progressData.recentProgress.exercise_set_id}`
    : '/chapters';

  const continueLabel = recentSession?.exercise_set_id
    ? `Reprendre la Série (${recentSession.exercise_set_id})`
    : progressData?.recentProgress?.exercise_set_id
    ? 'Continuer l’Apprentissage'
    : 'Commencer l’Aventure';

  return (
    <div className="page page-dashboard">
      {/* Welcome Section */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-hero-tag">
            {profile?.display_name ? `Bienvenue, ${profile.display_name}` : 'Bienvenue'}
          </span>
          <h1 className="dashboard-hero-title">
            Votre Quête de la <span className="text-gradient">Grammaire Française</span>
          </h1>
          <p className="dashboard-hero-subtitle">
            Maîtrisez les 28 chapitres structurés à travers des exercices interactifs,
            des retours formatifs et une progression sauvegardée en temps réel.
          </p>
          <div className="dashboard-hero-actions">
            <Link to={continueLink} className="btn btn-primary btn-lg">
              <span className="btn-label">{continueLabel} 🚀</span>
            </Link>
            <Link to="/chapters" className="btn btn-secondary btn-lg">
              <span className="btn-label">Explorer la Carte 🗺️</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="dashboard-stats" aria-label="Statistiques d'apprentissage">
        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">⭐</div>
          <div className="stat-value">{(profile?.xp ?? 0).toLocaleString('fr-FR')}</div>
          <div className="stat-label">XP Total</div>
        </Card>

        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">✍️</div>
          <div className="stat-value">
            {completedCount} <span className="stat-max">/ {totalExercises}</span>
          </div>
          <div className="stat-label">Séries Complétées</div>
        </Card>

        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">✨</div>
          <div className="stat-value">{totalStars} ★</div>
          <div className="stat-label">Étoiles Obtenues</div>
        </Card>

        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">🎯</div>
          <div className="stat-value">
            {progressPercent}%
            {accuracyAverage > 0 && <span className="stat-sub"> ({accuracyAverage}% réc.)</span>}
          </div>
          <div className="stat-label">Progression Globale</div>
        </Card>
      </section>

      {/* Recent Chapters Preview */}
      <section className="dashboard-chapters">
        <div className="section-header">
          <h2 className="section-title">Chapitres du Parcours</h2>
          <Link to="/chapters" className="section-link">
            Voir tous les 28 chapitres →
          </Link>
        </div>
        <div className="chapters-preview-grid">
          {CHAPTERS_SUMMARY.slice(0, 6).map((ch) => {
            const chProgress = progressData?.progressByChapter[ch.id];
            const chCompleted = chProgress?.completed ?? 0;
            const chStars = chProgress?.stars ?? 0;

            return (
              <Card key={ch.id} variant="interactive" className="chapter-card">
                <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
                  <div className="chapter-card-badges">
                    <Badge variant="cyan" className="chapter-num-badge">
                      Chapitre {String(ch.number).padStart(2, '0')}
                    </Badge>
                    {chCompleted > 0 && (
                      <Badge variant="emerald" className="chapter-progress-badge">
                        {chCompleted}/{ch.exerciseGroups} ✓ ({chStars} ★)
                      </Badge>
                    )}
                  </div>
                  <h3 className="chapter-title">{ch.title}</h3>
                  <div className="chapter-meta">
                    <span>{ch.exerciseGroups} exercices</span>
                    <span>{ch.topicsCount} points de grammaire</span>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
