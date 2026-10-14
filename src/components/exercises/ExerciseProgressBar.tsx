import React from 'react';

export interface ExerciseProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  comboCount?: number;
  onClose?: () => void;
}

export const ExerciseProgressBar: React.FC<ExerciseProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  comboCount = 0,
  onClose
}) => {
  const percent = totalQuestions > 0 ? Math.min(100, Math.round(((currentIndex + 1) / totalQuestions) * 100)) : 0;

  return (
    <header className="exercise-progress-header" role="region" aria-label="Progression de l'exercice">
      {onClose && (
        <button
          type="button"
          className="exercise-close-btn"
          onClick={onClose}
          aria-label="Quitter l'exercice"
          title="Quitter"
        >
          ✕
        </button>
      )}

      <div
        className="exercise-progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Question ${currentIndex + 1} sur ${totalQuestions}`}
      >
        <div
          className="exercise-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="exercise-progress-meta">
        <span className="exercise-step-indicator">
          {currentIndex + 1} / {totalQuestions}
        </span>

        {comboCount >= 2 && (
          <span className="exercise-combo-badge animate-pulse" title={`${comboCount} réponses correctes d'affilée !`}>
            🔥 {comboCount}
          </span>
        )}
      </div>
    </header>
  );
};
