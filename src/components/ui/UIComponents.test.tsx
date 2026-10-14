import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { TopStatusBar } from './TopStatusBar';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

describe('UI Base Components', () => {
  describe('Button', () => {
    it('renders with label and responds to clicks', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Commencer</Button>);

      const btn = screen.getByRole('button', { name: /Commencer/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass('btn-primary');

      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant and disabled states correctly', () => {
      const handleClick = vi.fn();
      render(
        <Button variant="secondary" disabled onClick={handleClick}>
          Passer
        </Button>
      );

      const btn = screen.getByRole('button', { name: /Passer/i });
      expect(btn).toHaveClass('btn-secondary');
      expect(btn).toBeDisabled();

      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders spinner and disables button when loading', () => {
      render(<Button loading>Vérifier</Button>);

      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      expect(btn).toHaveClass('btn-loading');
    });
  });

  describe('Card', () => {
    it('renders content inside card container', () => {
      render(
        <Card variant="elevated">
          <h2>Le Présent</h2>
          <p>Les verbes du premier groupe.</p>
        </Card>
      );

      expect(screen.getByText('Le Présent')).toBeInTheDocument();
      expect(screen.getByText('Les verbes du premier groupe.')).toBeInTheDocument();
    });

    it('triggers click and keyboard activation when interactive', () => {
      const handleClick = vi.fn();
      render(
        <Card variant="interactive" onClick={handleClick}>
          <span>Cliquez ici</span>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(2);

      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Badge', () => {
    it('renders text with appropriate variant and pulse dot', () => {
      render(
        <Badge variant="emerald" pulse>
          Grammaire A1
        </Badge>
      );

      const badge = screen.getByText('Grammaire A1');
      expect(badge).toHaveClass('badge-emerald');
      expect(badge.querySelector('.pulse-dot')).toBeInTheDocument();
    });
  });

  describe('TopStatusBar', () => {
    it('renders hearts, streak, xp and toggles theme', () => {
      render(
        <ThemeProvider>
          <TopStatusBar hearts={4} streakDays={7} hasFreeze totalXp={350} level={3} />
        </ThemeProvider>
      );

      expect(screen.getByLabelText(/4 vidas/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/7 dias de streak/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Streak Freeze ativo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/350 XP/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nível 3/i)).toBeInTheDocument();

      const themeToggle = screen.getByRole('button', { name: /Alternar para tema/i });
      expect(themeToggle).toBeInTheDocument();

      fireEvent.click(themeToggle);
      expect(screen.getByRole('button', { name: /Alternar para tema/i })).toBeInTheDocument();
    });
  });
});
