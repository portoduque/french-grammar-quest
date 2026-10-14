import React from 'react';

export type NodeStatus = 'locked' | 'active' | 'completed' | 'boss';

export interface PathNodeProps {
  id: string;
  number: number;
  title: string;
  status: NodeStatus;
  stars?: number;
  offset?: 'left' | 'center' | 'right';
  onClick?: () => void;
  icon?: string;
}

export const PathNode: React.FC<PathNodeProps> = ({
  number,
  title,
  status,
  stars = 0,
  offset = 'center',
  onClick,
  icon,
}) => {
  const isLocked = status === 'locked';
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isBoss = status === 'boss';

  const defaultIcon = isBoss ? '👑' : isCompleted ? '⭐' : isActive ? '📍' : '🔒';

  const clampedStars = Math.max(0, Math.min(3, Math.floor(stars || 0)));

  return (
    <div className={`path-node-wrapper path-offset-${offset}`}>
      <button
        type="button"
        className={`path-node path-node-${status}`}
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        aria-label={`Chapitre ${number}: ${title} — ${status}`}
      >
        <span className="path-node-inner">
          <span className="path-node-icon" aria-hidden="true">
            {icon || defaultIcon}
          </span>
          <span className="path-node-number">{number}</span>
        </span>

        {isActive && (
          <span className="path-node-active-badge" aria-hidden="true">
            Commencer
          </span>
        )}

        {isCompleted && clampedStars > 0 && (
          <span className="path-node-stars" aria-label={`${clampedStars} étoiles`}>
            {'★'.repeat(clampedStars)}{'☆'.repeat(3 - clampedStars)}
          </span>
        )}
      </button>
      <span className="path-node-title">{title}</span>
    </div>
  );
};
