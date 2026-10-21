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

  // Format compact on very large XP numbers (e.g. 1.2M or 150k) to prevent mobile header blowout
  const formattedXp = safeXp >= 1_000_000
    ? `${(safeXp / 1_000_000).toFixed(1).replace('.0', '')}M XP`
    : safeXp >= 100_000
    ? `${Math.round(safeXp / 1_000)}k XP`
    : `${safeXp.toLocaleString('fr-FR')} XP`;

  return (
    <div
      className={`xp-counter ${className}`}
      aria-label={`${safeXp} XP`}
      title={`${safeXp.toLocaleString('fr-FR')} XP au total`}
    >
      <span className="xp-star" aria-hidden="true">⭐</span>
      <span className="xp-value">{formattedXp}</span>
      {level !== undefined && Number.isFinite(level) && (
        <span className="xp-level-pill" aria-label={`Nível ${level}`} title={`Niveau ${level}`}>
          Nv. {level}
        </span>
      )}
      {safeCombo >= 3 && (
        <span
          className="xp-combo-badge"
          aria-label={`Combo ${combo} acertos seguidos`}
          title={`${combo} bonnes réponses consécutives !`}
        >
          {combo}x 🔥
        </span>
      )}
    </div>
  );
};
