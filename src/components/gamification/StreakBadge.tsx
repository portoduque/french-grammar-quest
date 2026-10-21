import React from 'react';

export interface StreakBadgeProps {
  days: number;
  hasFreeze?: boolean;
  className?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  days,
  hasFreeze = false,
  className = '',
}) => {
  const safeDays = Math.max(0, Math.floor(Number.isFinite(days) ? days : 0));

  return (
    <div
      className={`streak-badge ${safeDays > 0 ? 'streak-active' : 'streak-inactive'} ${className}`}
      title={`${safeDays} jour${safeDays > 1 ? 's' : ''} consécutif${safeDays > 1 ? 's' : ''} d’apprentissage`}
      aria-label={`${safeDays} dias de streak`}
    >
      <span className="streak-flame" aria-hidden="true">
        {safeDays > 0 ? '🔥' : '❄️'}
      </span>
      <span className="streak-count">{safeDays}</span>
      {hasFreeze && (
        <span
          className="streak-freeze-shield"
          title="Gel de série actif (série protégée)"
          aria-label="Streak Freeze ativo"
        >
          🛡️
        </span>
      )}
    </div>
  );
};
