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

    // Click exercises tab
    const exercisesTab = screen.getByRole('tab', { name: /Exercices/i });
    fireEvent.click(exercisesTab);

    // Exercise sets visible
    expect(screen.getByText('Exercice 1.1')).toBeInTheDocument();
    expect(screen.getByText('Mettre les verbes entre parenthèses au présent.')).toBeInTheDocument();
  });

  it('renders pedagogical Astuces FLE tab with professor tips', () => {
    renderWithProviders('/chapters/ch01');

    // Click tips tab
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText('Les Terminaisons Muettes')).toBeInTheDocument();
    expect(screen.getByText("L'Élision Obligatoire avec « Je »")).toBeInTheDocument();
    expect(screen.getByText('La Liaison Euphonique')).toBeInTheDocument();
  });

  it('renders empty state for invalid chapter ID', () => {
    renderWithProviders('/chapters/invalid-id');

    expect(screen.getByText(/Chapitre introuvable/i)).toBeInTheDocument();
  });

  it('renders editorial pending card when theory is null and allows navigating to exercises', () => {
    renderWithProviders('/chapters/ch02');

    expect(screen.getByText(/Théorie en cours de révision éditoriale/i)).toBeInTheDocument();

    const switchBtn = screen.getByRole('button', { name: /Passer aux Exercices/i });
    fireEvent.click(switchBtn);

    // Verify exercises tab became active
    const exercisesTab = screen.getByRole('tab', { name: /Exercices/i });
    expect(exercisesTab).toHaveAttribute('aria-selected', 'true');
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
});
