import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChapterPage } from './ChapterPage';

// Mock useTheory to return chapter 1 theory
vi.mock('@/hooks/useTheory', () => ({
  useTheory: vi.fn((chapterId) => {
    if (chapterId === 'ch01') {
      return {
        data: {
          chapter: {
            id: 'ch01',
            number: 1,
            title: 'The present tense of regular -er verbs',
            slug: 'the-present-tense-of-regular-er-verbs',
            world_number: 1,
            world_name: 'Mundo 1: Les Fondations',
            page_range: '14–30',
            topics_count: 3,
            exercise_groups_count: 10,
            total_questions: 100,
            theory_markdown: '## Règles de conjugaison\n\nPour conjuguer les verbes en -er, on ajoute: -e, -es, -e, -ons, -ez, -ent.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch01-t01', title: 'Regular -er verbs in the present', order_index: 1 },
          ],
          exerciseSets: [
            { id: 'ch01-ex01', title: 'Exercice 1.1', instruction: 'Mettre les verbes entre parenthèses au présent.', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 },
            { id: 'ch01-ex02', title: 'Exercice 1.2', instruction: 'Traduire en français.', interaction_type: 'translation', questions_count: 10, order_index: 2 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch02') {
      return {
        data: {
          chapter: {
            id: 'ch02',
            number: 2,
            title: 'The present tense of -ir and -re verbs',
            slug: 'the-present-tense-of-ir-and-re-verbs',
            world_number: 1,
            world_name: 'Mundo 1: Les Fondations',
            page_range: '31–45',
            topics_count: 4,
            exercise_groups_count: 11,
            total_questions: 110,
            theory_markdown: '## Les Deux Types de Verbes en -IR\n\nType 1 régulier (choisir) et Type 2 irrégulier (sortir).',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch02-t01', title: '-ir verbs in the present', order_index: 1 },
          ],
          exerciseSets: [
            { id: 'ch02-ex01', title: 'Exercice 2.1', instruction: 'Mettre les verbes entre parenthèses au présent.', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 },
            { id: 'ch02-ex02', title: 'Exercice 2.2', instruction: 'Faire correspondre les deux colonnes.', interaction_type: 'matching', questions_count: 10, order_index: 2 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch04') {
      return {
        data: {
          chapter: {
            id: 'ch04',
            number: 4,
            title: 'More irregular verbs',
            slug: 'more-irregular-verbs',
            world_number: 1,
            world_name: 'Mundo 1: Les Fondations',
            page_range: '60–72',
            topics_count: 6,
            exercise_groups_count: 9,
            total_questions: 85,
            theory_markdown: null,
            editorial_status: 'review',
          },
          topics: [],
          exerciseSets: [],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch03') {
      return {
        data: {
          chapter: {
            id: 'ch03',
            number: 3,
            title: 'Chapitre en Maintenance',
            slug: 'chapitre-en-maintenance',
            world_number: 1,
            world_name: 'Mundo 1: Les Fondations',
            page_range: '46–60',
            topics_count: 2,
            exercise_groups_count: 2,
            total_questions: 20,
            theory_markdown: '## Règles',
            editorial_status: 'blocked',
          },
          topics: [],
          exerciseSets: [
            { id: 'ch03-ex01', title: 'Exercice 3.1', instruction: 'Exercice test', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 }
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch28') {
      return {
        data: {
          chapter: {
            id: 'ch28',
            number: 28,
            title: 'Pot-pourri',
            slug: 'pot-pourri',
            world_number: 5,
            world_name: 'Mundo 5: Le Sommet de la Maîtrise',
            page_range: '495–527',
            topics_count: 5,
            exercise_groups_count: 35,
            total_questions: 345,
            theory_markdown: '## Révision Générale',
            editorial_status: 'published',
          },
          topics: [],
          exerciseSets: [],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch19') {
      return {
        data: {
          chapter: {
            id: 'ch19',
            number: 19,
            title: 'The imperative mood',
            slug: 'the-imperative-mood',
            world_number: 4,
            world_name: 'Mundo 4: Le Discours et la Maîtrise',
            page_range: '219–225',
            topics_count: 3,
            exercise_groups_count: 3,
            total_questions: 30,
            theory_markdown: '## The imperative mood (L’impératif)\n\nFormation et règles FLE.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch19-t01', title: "Formation de l'impératif", order_index: 1 },
            { id: 'ch19-t02', title: "Impératifs irréguliers", order_index: 2 },
            { id: 'ch19-t03', title: "Verbes pronominaux", order_index: 3 },
          ],
          exerciseSets: [
            { id: 'ch19-ex01', title: 'Exercice 19.1', instruction: 'Formation de l\'impératif', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 1 },
            { id: 'ch19-ex02', title: 'Exercice 19.2', instruction: 'Verbes pronominaux', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 2 },
            { id: 'ch19-ex03', title: 'Exercice 19.3', instruction: 'Traduction thématique', interaction_type: 'translation', questions_count: 10, order_index: 3 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    return { data: null, isLoading: false, error: null };
  }),
}));

const renderWithProviders = (initialRoute = '/chapters/ch01') => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/chapters/:chapterId" element={<ChapterPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ChapterPage Component', () => {
  it('renders chapter metadata and header properly', () => {
    renderWithProviders('/chapters/ch01');

    expect(screen.getAllByText('The present tense of regular -er verbs').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Chapitre 01').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/1 sujets/i)).toBeInTheDocument();
  });

  it('renders theory by default and allows switching to exercises tab', () => {
    renderWithProviders('/chapters/ch01');

    // Theory is visible
    expect(screen.getByText(/Pour conjuguer les verbes en -er/i)).toBeInTheDocument();

    // Roadmap call-to-action banner is visible at the end of theory
    expect(screen.getByText(/Théorie assimilée \? Place à la pratique !/i)).toBeInTheDocument();
    const startExercisesBtn = screen.getByRole('button', { name: /Passer aux Exercices 🚀/i });
    expect(startExercisesBtn).toBeInTheDocument();

    // Clicking roadmap CTA switches to exercises tab
    fireEvent.click(startExercisesBtn);

    // Exercise sets visible
    expect(screen.getByText('Exercice 1.1')).toBeInTheDocument();
    expect(screen.getByText('Mettre les verbes entre parenthèses au présent.')).toBeInTheDocument();
  });

  it('renders pedagogical Astuces FLE tab with all 6 professor tips for lusophones', () => {
    renderWithProviders('/chapters/ch01');

    // Click tips tab
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText('Les Terminaisons Muettes')).toBeInTheDocument();
    expect(screen.getByText("L'Élision Obligatoire avec « Je »")).toBeInTheDocument();
    expect(screen.getByText('La Liaison Euphonique')).toBeInTheDocument();
    expect(screen.getByText('Le Pronom « On » (Le "A Gente" Français)')).toBeInTheDocument();
    expect(screen.getByText('Ajustements Euphoniques (-cer & -ger)')).toBeInTheDocument();
    expect(screen.getByText("L'Action Continue avec « Depuis »")).toBeInTheDocument();
  });

  it('renders empty state for invalid chapter ID', () => {
    renderWithProviders('/chapters/invalid-id');

    expect(screen.getByText(/Chapitre introuvable/i)).toBeInTheDocument();
  });

  it('renders editorial pending card when theory is null and allows navigating to exercises', () => {
    renderWithProviders('/chapters/ch04');

    expect(screen.getByText(/Théorie en cours de révision éditoriale/i)).toBeInTheDocument();

    const switchBtn = screen.getByRole('button', { name: /Passer aux Exercices/i });
    fireEvent.click(switchBtn);

    // Verify exercises tab became active
    const exercisesTab = screen.getByRole('tab', { name: /Exercices/i });
    expect(exercisesTab).toHaveAttribute('aria-selected', 'true');
  });

  it('renders Chapter 2 theory and pedagogical tips correctly', () => {
    renderWithProviders('/chapters/ch02');

    // Should render the chapter title
    expect(screen.getByText(/The present tense of -ir and -re verbs/i)).toBeInTheDocument();

    // Verify Theory Reader is present (not editorial pending)
    expect(screen.queryByText(/Théorie en cours de révision éditoriale/i)).not.toBeInTheDocument();

    // Check Astuces FLE tab for Chapter 2
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/Les Deux Types de Verbes en -IR/i)).toBeInTheDocument();
    expect(screen.getByText(/Les « Faux -IR »/i)).toBeInTheDocument();
    expect(screen.getByText(/La Règle d'Or de « Ni/i)).toBeInTheDocument();
  });

  it('affiche une bannière d avertissement et désactive les exercices lorsque le chapitre est suspendu (soft-hide)', () => {
    renderWithProviders('/chapters/ch03');

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Chapitre temporairement suspendu pour révision éditoriale/i)).toBeInTheDocument();

    const exercisesTab = screen.getByRole('tab', { name: /Exercices/i });
    fireEvent.click(exercisesTab);

    const btn = screen.getByRole('button', { name: /Suspendu 🚫/i });
    expect(btn).toBeDisabled();
  });

  it('affiche la bannière épique du Final Boss avec les 7 checkpoints pour le chapitre 28 (AC-16)', () => {
    renderWithProviders('/chapters/ch28');

    expect(screen.getByText('Le Grand Boss : Pot-pourri des 28 Chapitres')).toBeInTheDocument();
    expect(screen.getByText('35 séries · 345 questions')).toBeInTheDocument();
    expect(screen.getByText('7 Checkpoints')).toBeInTheDocument();
  });

  it('affiche les astuces FLE pédagogiques du chapitre 19 pour l\'impératif et les verbes pronominaux', () => {
    renderWithProviders('/chapters/ch19');

    expect(screen.getByText('The imperative mood')).toBeInTheDocument();

    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/A Queda Obrigatória do « -s » no Tu dos Verbos em -ER/i)).toBeInTheDocument();
    expect(screen.getByText(/Verbos Pronnominais : A Dança da Posição dos Pronomes/i)).toBeInTheDocument();
    expect(screen.getByText(/Os 4 Comandantes Irregulares do Subjuntivo/i)).toBeInTheDocument();
  });
});
