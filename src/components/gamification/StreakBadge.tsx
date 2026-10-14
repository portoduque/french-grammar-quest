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
  return (
    <div
      className={`streak-badge ${days > 0 ? 'streak-active' : 'streak-inactive'} ${className}`}
      title={`${days} dias consecutivos de estudo`}
      aria-label={`${days} dias de streak`}
    >
      <span className="streak-flame" aria-hidden="true">
        {days > 0 ? '🔥' : '❄️'}
      </span>
      <span className="streak-count">{days}</span>
      {hasFreeze && (
        <span
          className="streak-freeze-shield"
          title="Streak Freeze ativo (protegido contra perda)"
          aria-label="Streak Freeze ativo"
        >
          🛡️
        </span>
      )}
    </div>
  );
};
