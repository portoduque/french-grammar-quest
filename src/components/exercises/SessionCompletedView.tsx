import React from 'react';
import { Button } from '@/components/ui/Button';

export interface SessionCompletedViewProps {
  exerciseTitle: string;
  totalQuestions: number;
  correctCount: number;
  reviewedCount: number;
  earnedXp: number;
  stars?: number;
  onRetry: () => void;
  onBackToChapter: () => void;
  onNextExercise?: () => void;
}

export const SessionCompletedView: React.FC<SessionCompletedViewProps> = ({
  exerciseTitle,
  totalQuestions,
  correctCount,
  reviewedCount,
  earnedXp,
  stars,
  onRetry,
  onBackToChapter,
  onNextExercise
}) => {
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Cálculo de estrelas (PRD §11.1, RF-048 / T-028)
  let fallbackStars = 1;
  if (accuracy >= 90) fallbackStars = 3;
  else if (accuracy >= 80) fallbackStars = 2;

  const activeStars = stars !== undefined ? stars : fallbackStars;

  return (
    <div className="session-completed-view card card-default" role="region" aria-label="Résultats de l'exercice">
      <div className="session-trophy-badge" aria-hidden="true">
        🏆
      </div>

      <h2 className="session-completed-title">Félicitations !</h2>
      <p className="session-completed-subtitle">
        Vous avez terminé <strong lang="fr">{exerciseTitle}</strong>
      </p>

      {/* Estrelas */}
      <div className="session-stars-row" aria-label={`${activeStars} étoiles sur 3`}>
        <span className={`star-item ${activeStars >= 1 ? 'star-gold' : 'star-dim'}`}>★</span>
        <span className={`star-item ${activeStars >= 2 ? 'star-gold' : 'star-dim'}`}>★</span>
        <span className={`star-item ${activeStars >= 3 ? 'star-gold' : 'star-dim'}`}>★</span>
      </div>

      {/* Grid de estatísticas */}
      <div className="session-stats-grid">
        <div className="session-stat-card">
          <span className="stat-label">Précision</span>
          <span className="stat-value stat-accuracy">{accuracy}%</span>
        </div>

        <div className="session-stat-card">
          <span className="stat-label">XP Gagnés</span>
          <span className="stat-value stat-xp">+{earnedXp} XP</span>
        </div>

        <div className="session-stat-card">
          <span className="stat-label">Réussies</span>
          <span className="stat-value stat-correct">
            {correctCount} / {totalQuestions}
          </span>
        </div>

        {reviewedCount > 0 && (
          <div className="session-stat-card">
            <span className="stat-label">Auto-évaluées</span>
            <span className="stat-value stat-reviewed">{reviewedCount}</span>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="session-completed-actions">
        {onNextExercise && (
          <Button
            variant="primary"
            size="lg"
            onClick={onNextExercise}
            className="session-next-btn"
          >
            Exercice suivant 🚀
          </Button>
        )}

        <Button
          variant="secondary"
          size="md"
          onClick={onRetry}
          className="session-retry-btn"
        >
          🔄 Recommencer
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={onBackToChapter}
          className="session-back-btn"
        >
          📖 Retour au chapitre
        </Button>
      </div>
    </div>
  );
};
