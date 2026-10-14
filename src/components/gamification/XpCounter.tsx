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
  const safeXp = Math.max(0, Math.floor(Number.isFinite(xp) ? xp : 0));
  const safeCombo = Math.max(0, Math.floor(Number.isFinite(combo) ? combo : 0));

  return (
    <div className={`xp-counter ${className}`} aria-label={`${safeXp} XP`}>
      <span className="xp-star" aria-hidden="true">⭐</span>
      <span className="xp-value">{safeXp.toLocaleString('pt-BR')} XP</span>
      {level !== undefined && Number.isFinite(level) && (
        <span className="xp-level-pill" aria-label={`Nível ${level}`}>
          Nv. {level}
        </span>
      )}
      {safeCombo >= 3 && (
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
