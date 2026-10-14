import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  AccentToolbar,
  PathNode,
  StreakBadge,
  XpCounter,
  TipsBottomSheet,
} from './index';

describe('Gamification Components', () => {
  describe('AccentToolbar', () => {
    it('renders accents and calls onInsert with the clicked character', () => {
      const handleInsert = vi.fn();
      render(<AccentToolbar onInsert={handleInsert} />);

      const accentE = screen.getByRole('button', { name: 'Inserir é' });
      expect(accentE).toBeInTheDocument();

      fireEvent.click(accentE);
      expect(handleInsert).toHaveBeenCalledWith('é');

      const cedilla = screen.getByRole('button', { name: 'Inserir ç' });
      fireEvent.click(cedilla);
      expect(handleInsert).toHaveBeenCalledWith('ç');
    });
  });

  describe('PathNode', () => {
    it('disables locked nodes and prevents clicks', () => {
      const handleClick = vi.fn();
      render(
        <PathNode
          id="ch-02"
          number={2}
          title="Verbes en -ir"
          status="locked"
          onClick={handleClick}
        />
      );

      const nodeBtn = screen.getByRole('button', {
        name: /Chapitre 2: Verbes en -ir — locked/i,
      });
      expect(nodeBtn).toBeDisabled();

      fireEvent.click(nodeBtn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders active node with Commencer badge and handles click', () => {
      const handleClick = vi.fn();
      render(
        <PathNode
          id="ch-01"
          number={1}
          title="Verbes en -er"
          status="active"
          onClick={handleClick}
        />
      );

      const nodeBtn = screen.getByRole('button', {
        name: /Chapitre 1: Verbes en -er — active/i,
      });
      expect(nodeBtn).not.toBeDisabled();
      expect(screen.getByText('Commencer')).toBeInTheDocument();

      fireEvent.click(nodeBtn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders completed node with stars', () => {
      render(
        <PathNode
          id="ch-01"
          number={1}
          title="Verbes en -er"
          status="completed"
          stars={3}
        />
      );

      expect(screen.getByLabelText('3 étoiles')).toBeInTheDocument();
      expect(screen.getByText('★★★')).toBeInTheDocument();
    });

    it('renders boss node correctly', () => {
      render(
        <PathNode
          id="ch-28"
          number={28}
          title="Grand Examen Final"
          status="boss"
        />
      );

      const bossBtn = screen.getByRole('button', {
        name: /Chapitre 28: Grand Examen Final — boss/i,
      });
      expect(bossBtn).toBeInTheDocument();
    });
  });

  describe('StreakBadge', () => {
    it('shows flame and streak count when active', () => {
      render(<StreakBadge days={12} hasFreeze />);

      expect(screen.getByLabelText('12 dias de streak')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByLabelText('Streak Freeze ativo')).toBeInTheDocument();
    });

    it('shows snowflake when streak is 0', () => {
      render(<StreakBadge days={0} />);

      expect(screen.getByLabelText('0 dias de streak')).toBeInTheDocument();
      expect(screen.getByText('❄️')).toBeInTheDocument();
    });
  });

  describe('XpCounter', () => {
    it('renders xp total, level and combo streak', () => {
      render(<XpCounter xp={1250} level={5} combo={4} />);

      expect(screen.getByLabelText('1250 XP')).toBeInTheDocument();
      expect(screen.getByText('Nv. 5')).toBeInTheDocument();
      expect(screen.getByLabelText('Combo 4 acertos seguidos')).toBeInTheDocument();
    });
  });

  describe('TipsBottomSheet', () => {
    it('renders nothing when closed', () => {
      const { container } = render(
        <TipsBottomSheet
          open={false}
          onClose={() => {}}
          title="Dica de Ouro"
          summary="Explicação resumida"
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders content, Astuce du Prof and conjugation grid when open', () => {
      const handleClose = vi.fn();
      render(
        <TipsBottomSheet
          open={true}
          onClose={handleClose}
          title="Verbos do 1º Grupo (-er)"
          summary="A regra de ouro da terminação no presente."
          teacherTip="Atenção à terminação -ent na 3ª pessoa do plural: as letras -ent são sempre mudas!"
          conjugations={[
            { pronoun: 'je', verb: 'parle', english: 'eu falo' },
            { pronoun: 'ils', verb: 'parlent', english: 'eles falam (som /paʁl/)' },
          ]}
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Verbos do 1º Grupo (-er)')).toBeInTheDocument();
      expect(screen.getByText(/A regra de ouro/i)).toBeInTheDocument();
      expect(screen.getByText(/Astuce du Prof:/i)).toBeInTheDocument();
      expect(
        screen.getByText(/as letras -ent são sempre mudas!/i)
      ).toBeInTheDocument();
      expect(screen.getByText('parlent')).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: 'Fechar dicas' });
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalledTimes(1);

      const doneBtn = screen.getByRole('button', {
        name: 'Compreendi, voltar ao exercício!',
      });
      fireEvent.click(doneBtn);
      expect(handleClose).toHaveBeenCalledTimes(2);
    });

    it('closes on Escape key press', () => {
      const handleClose = vi.fn();
      render(
        <TipsBottomSheet
          open={true}
          onClose={handleClose}
          title="Dica"
          summary="Resumo"
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
