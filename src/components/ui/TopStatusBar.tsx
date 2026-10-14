import React from 'react';
import { StreakBadge } from '@/components/gamification/StreakBadge';
import { XpCounter } from '@/components/gamification/XpCounter';
import { useTheme } from '@/app/providers/ThemeProvider';

export interface TopStatusBarProps {
  hearts?: number;
  streakDays?: number;
  hasFreeze?: boolean;
  totalXp?: number;
  level?: number;
  className?: string;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  hearts = 5,
  streakDays = 3,
  hasFreeze = true,
  totalXp = 120,
  level = 2,
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`top-status-bar ${className}`} role="banner">
      <div className="top-status-left">
        <span className="brand-mini-icon" aria-hidden="true">⚜️</span>
        <span className="brand-mini-title">Grammar Quest</span>
      </div>

      <div className="top-status-center">
        <div className="hearts-display" title={`${hearts} vidas restantes`} aria-label={`${hearts} vidas`}>
          <span className="heart-icon" aria-hidden="true">❤️</span>
          <span className="heart-count">{hearts}</span>
        </div>

        <StreakBadge days={streakDays} hasFreeze={hasFreeze} />

        <XpCounter xp={totalXp} level={level} />
      </div>

      <div className="top-status-right">
        <button
          type="button"
          className="theme-mini-toggle"
          onClick={toggleTheme}
          aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
