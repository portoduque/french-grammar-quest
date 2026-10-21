import React from 'react';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { XpCounter } from '@/components/gamification/XpCounter';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';

export interface TopStatusBarProps {
  hearts?: number;
  streakDays?: number;
  hasFreeze?: boolean;
  totalXp?: number;
  level?: number;
  className?: string;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  hearts,
  streakDays,
  hasFreeze,
  totalXp,
  level,
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();

  const resolvedHearts = hearts !== undefined ? hearts : (profile?.hearts ?? 5);
  const resolvedStreak = streakDays !== undefined ? streakDays : (profile?.streak_days ?? 0);
  const resolvedFreeze = hasFreeze !== undefined ? hasFreeze : (profile?.streak_frozen ?? false);
  const resolvedXp = totalXp !== undefined ? totalXp : (profile?.xp ?? 0);
  const resolvedLevel = level !== undefined ? level : (profile?.level ?? 1);

  const safeHearts = Math.max(0, Math.floor(Number.isFinite(resolvedHearts) ? resolvedHearts : 0));

  return (
    <header className={`top-status-bar ${className}`} role="banner">
      <div className="top-status-left">
        <span className="brand-mini-icon" aria-hidden="true">⚜️</span>
        <span className="brand-mini-title">Grammar Quest</span>
      </div>

      <div className="top-status-center">
        <div
          className="hearts-display"
          title={`${safeHearts} vie${safeHearts > 1 ? 's' : ''} restante${safeHearts > 1 ? 's' : ''}`}
          aria-label={`${safeHearts} vidas`}
        >
          <span className="heart-icon" aria-hidden="true">❤️</span>
          <span className="heart-count">{safeHearts}</span>
        </div>

        <StreakBadge days={resolvedStreak} hasFreeze={resolvedFreeze} />

        <XpCounter xp={resolvedXp} level={resolvedLevel} />
      </div>

      <div className="top-status-right">
        <button
          type="button"
          className="theme-mini-toggle"
          onClick={toggleTheme}
          aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          title={`Passer au thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
