import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ExerciseSession } from './ExerciseSession';
import { AccentToolbar } from './AccentToolbar';
import { FillBlankInteraction } from './interactions/FillBlankInteraction';
import { MatchingInteraction } from './interactions/MatchingInteraction';
import { OrderingInteraction } from './interactions/OrderingInteraction';
import { MultipleChoiceInteraction } from './interactions/MultipleChoiceInteraction';
import { ExerciseSet, Question } from '@/types/database';

describe('AccentToolbar (Clavier des accents)', () => {
  it('insere caracteres franceses com acento ao clicar', () => {
    const handleInsert = vi.fn();
    render(<AccentToolbar onInsert={handleInsert} />);

    const eAccentBtn = screen.getByLabelText('Insérer la lettre é');
    expect(eAccentBtn).toBeInTheDocument();
    fireEvent.click(eAccentBtn);

    expect(handleInsert).toHaveBeenCalledWith('é');
  });

  it('alterna para maiúsculas com o botão shift', () => {
    const handleInsert = vi.fn();
    render(<AccentToolbar onInsert={handleInsert} />);

    const shiftBtn = screen.getByLabelText('Activer majuscules');
    fireEvent.click(shiftBtn);

    const eMajBtn = screen.getByLabelText('Insérer la lettre É');
    expect(eMajBtn).toBeInTheDocument();
    fireEvent.click(eMajBtn);

    expect(handleInsert).toHaveBeenCalledWith('É');
  });
});

describe('Interações Individuais', () => {
  it('FillBlankInteraction: insere acentos no input e dispara onChange', () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();

    render(
      <FillBlankInteraction
        prompt="Lucie _________________ (travailler) à Lyon."
        value="travaill"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );

    const input = screen.getByLabelText('Mot à compléter');
    expect(input).toHaveValue('travaill');

    const eKey = screen.getByLabelText('Insérer la lettre é');
    fireEvent.click(eKey);
    expect(handleChange).toHaveBeenCalled();
  });

  it('MatchingInteraction: permite selecionar uma opção de correspondência', () => {
    const handleChange = vi.fn();
    render(
      <MatchingInteraction
        prompt="Il épelle"
        options={[
          { label: 'a', text: 'dans l’Atlantique' },
          { label: 'i', text: 'le mot' }
        ]}
        value=""
        onChange={handleChange}
      />
    );

    const optionBtn = screen.getByText('le mot');
    fireEvent.click(optionBtn);
    expect(handleChange).toHaveBeenCalledWith('i');
  });

  it('OrderingInteraction: monta frase tocando nos tokens do banco de palavras', () => {
    const handleChange = vi.fn();
    render(
      <OrderingInteraction
        prompt="Reconstituez la phrase"
        tokens={['suis', 'Je', 'content']}
        value=""
        onChange={handleChange}
      />
    );

    const jeBtn = screen.getByText('Je');
    fireEvent.click(jeBtn);
    expect(handleChange).toHaveBeenCalled();
  });

  it('MultipleChoiceInteraction: seleciona opção por clique', () => {
    const handleChange = vi.fn();
    render(
      <MultipleChoiceInteraction
        prompt="Elle ________ français."
        options={['parle', 'parles', 'parlent']}
        value=""
        onChange={handleChange}
      />
    );

    const opt = screen.getByText('parle');
    fireEvent.click(opt);
    expect(handleChange).toHaveBeenCalledWith('parle');
  });
});

describe('ExerciseSession (Orchestrateur)', () => {
  const mockSet: ExerciseSet = {
    id: 'ch01-ex01',
    chapter_id: 'ch01',
    order_index: 1,
    title: 'Exercice 1.1',
    instruction: 'Mettre les verbes entre parenthèses au présent.',
    interaction_type: 'fill_blank',
    questions_count: 2,
    created_at: new Date().toISOString()
  };

  const mockQuestions: Question[] = [
    {
      id: 'ch01-ex01-q01',
      exercise_set_id: 'ch01-ex01',
      order_index: 1,
      prompt: 'Lucie _________________ (travailler) à Lyon.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['travaille'],
      explanation: 'Verbe en -er avec Lucie (elle)',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex01-q02',
      exercise_set_id: 'ch01-ex01',
      order_index: 2,
      prompt: 'Je _________________ (habiter) à Paris.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['habite', "j'habite"],
      explanation: 'Élision avec Je',
      created_at: new Date().toISOString()
    }
  ];

  it('renderiza o exercício com a primeira questão e a barra de progresso', () => {
    render(
      <ExerciseSession
        exerciseSet={mockSet}
        questions={mockQuestions}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText('Exercice 1.1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText(/Lucie/)).toBeInTheDocument();
  });

  it('valida resposta correta, exibe feedback positivo e avança para a próxima questão', () => {
    render(
      <ExerciseSession
        exerciseSet={mockSet}
        questions={mockQuestions}
        onClose={vi.fn()}
      />
    );

    const input = screen.getByLabelText('Mot à compléter');
    fireEvent.change(input, { target: { value: 'travaille' } });

    const verifyBtn = screen.getByText(/Vérifier/);
    fireEvent.click(verifyBtn);

    // Feedback deve aparecer
    expect(screen.getByText(/C’est exact/)).toBeInTheDocument();

    // Botão de continuar avança para questão 2
    const continueBtn = screen.getByText(/Continuer/);
    fireEvent.click(continueBtn);

    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    expect(screen.getByText(/habiter/)).toBeInTheDocument();
  });

  it('completa a sessão e exibe tela de vitória ao concluir todas as questões', () => {
    render(
      <ExerciseSession
        exerciseSet={mockSet}
        questions={mockQuestions}
        onClose={vi.fn()}
      />
    );

    // Questão 1
    const input1 = screen.getByLabelText('Mot à compléter');
    fireEvent.change(input1, { target: { value: 'travaille' } });
    fireEvent.click(screen.getByText(/Vérifier/));
    fireEvent.click(screen.getByText(/Continuer/));

    // Questão 2
    const input2 = screen.getByLabelText('Mot à compléter');
    fireEvent.change(input2, { target: { value: "J'habite" } });
    fireEvent.click(screen.getByText(/Vérifier/));
    fireEvent.click(screen.getByText(/Continuer/));

    // Tela de conclusão
    expect(screen.getByText('Félicitations !')).toBeInTheDocument();
    expect(screen.getByText('Précision')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('chama onSaveAttempt ao verificar resposta e onFinishSession ao completar', async () => {
    const handleSaveAttempt = vi.fn();
    const handleFinishSession = vi.fn().mockResolvedValue({ stars: 3, earnedXp: 25 });

    render(
      <ExerciseSession
        exerciseSet={mockSet}
        questions={mockQuestions}
        onSaveAttempt={handleSaveAttempt}
        onFinishSession={handleFinishSession}
        onClose={vi.fn()}
      />
    );

    // Questão 1
    const input1 = screen.getByLabelText('Mot à compléter');
    fireEvent.change(input1, { target: { value: 'travaille' } });
    await act(async () => {
      fireEvent.click(screen.getByText(/Vérifier/));
    });

    expect(handleSaveAttempt).toHaveBeenCalledWith(
      'ch01-ex01-q01',
      'travaille',
      'correct',
      1.0
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Continuer/));
    });

    // Questão 2
    const input2 = screen.getByLabelText('Mot à compléter');
    fireEvent.change(input2, { target: { value: "J'habite" } });
    await act(async () => {
      fireEvent.click(screen.getByText(/Vérifier/));
    });

    expect(handleSaveAttempt).toHaveBeenCalledWith(
      'ch01-ex01-q02',
      "J'habite",
      'correct',
      1.0
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Continuer/));
    });

    expect(handleFinishSession).toHaveBeenCalled();
  });

  it('inicia na questão indicada por initialIndex para retomada cross-device (AC-03, T-018)', () => {
    render(
      <ExerciseSession
        exerciseSet={mockSet}
        questions={mockQuestions}
        initialIndex={1}
        onClose={vi.fn()}
      />
    );

    // Deve iniciar diretamente na questão 2/2 ("Je ... habiter")
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    expect(screen.getByText(/habiter/)).toBeInTheDocument();
  });
});
