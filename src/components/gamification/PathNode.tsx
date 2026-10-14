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

        {isCompleted && stars > 0 && (
          <span className="path-node-stars" aria-label={`${stars} étoiles`}>
            {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
          </span>
        )}
      </button>
      <span className="path-node-title">{title}</span>
    </div>
  );
};
