import React from 'react';

export interface XpCounterProps {
  xp: number;
  level?: number;
  combo?: number;
  className?: string;
}

export const XpCounter: React.FC<XpCounterProps> = ({
  xp,
  level,
  combo = 0,
  className = '',
}) => {
  return (
    <div className={`xp-counter ${className}`} aria-label={`${xp} XP`}>
      <span className="xp-star" aria-hidden="true">⭐</span>
      <span className="xp-value">{xp.toLocaleString('pt-BR')} XP</span>
      {level !== undefined && (
        <span className="xp-level-pill" aria-label={`Nível ${level}`}>
          Nv. {level}
        </span>
      )}
      {combo >= 3 && (
        <span
          className="xp-combo-badge"
          aria-label={`Combo ${combo} acertos seguidos`}
          title={`${combo} acertos em sequência!`}
        >
          {combo}x 🔥
        </span>
      )}
    </div>
  );
};
