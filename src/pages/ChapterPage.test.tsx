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
    if (chapterId === 'ch20') {
      return {
        data: {
          chapter: {
            id: 'ch20',
            number: 20,
            title: 'Articles and nouns',
            slug: 'articles-and-nouns',
            world_number: 4,
            world_name: 'Mundo 4: Les Nuances et le Virtuel',
            page_range: '226–246',
            topics_count: 6,
            exercise_groups_count: 9,
            total_questions: 90,
            theory_markdown: '## Articles and nouns (Les articles et les noms)\n\nLes articles définis, partitifs et prépositions géographiques.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch20-t01', title: 'Les articles définis, indéfinis et partitifs', order_index: 1 },
            { id: 'ch20-t02', title: 'La négation des partitifs', order_index: 2 },
            { id: 'ch20-t03', title: 'Le genre des noms', order_index: 3 },
            { id: 'ch20-t04', title: 'Féminisation et pluriel', order_index: 4 },
            { id: 'ch20-t05', title: 'Le genre des pays', order_index: 5 },
            { id: 'ch20-t06', title: 'La provenance géographique', order_index: 6 },
          ],
          exerciseSets: [
            { id: 'ch20-ex01', title: 'Exercice 20.1', instruction: 'Articles partitifs', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 },
            { id: 'ch20-ex02', title: 'Exercice 20.2', instruction: 'Le ou la', interaction_type: 'fill_blank', questions_count: 10, order_index: 2 },
            { id: 'ch20-ex03', title: 'Exercice 20.3', instruction: 'Au masculin', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 3 },
            { id: 'ch20-ex04', title: 'Exercice 20.4', instruction: 'Au féminin', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 4 },
            { id: 'ch20-ex05', title: 'Exercice 20.5', instruction: 'Genre pays', interaction_type: 'fill_blank', questions_count: 10, order_index: 5 },
            { id: 'ch20-ex06', title: 'Exercice 20.6', instruction: 'Prépositions', interaction_type: 'fill_blank', questions_count: 10, order_index: 6 },
            { id: 'ch20-ex07', title: 'Exercice 20.7', instruction: 'Habiter puzzle', interaction_type: 'ordering', questions_count: 10, order_index: 7 },
            { id: 'ch20-ex08', title: 'Exercice 20.8', instruction: 'Provenance', interaction_type: 'fill_blank', questions_count: 10, order_index: 8 },
            { id: 'ch20-ex09', title: 'Exercice 20.9', instruction: 'Traduction', interaction_type: 'translation', questions_count: 10, order_index: 9 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch21') {
      return {
        data: {
          chapter: {
            id: 'ch21',
            number: 21,
            title: 'All the pronouns',
            slug: 'all-the-pronouns',
            world_number: 4,
            world_name: 'Mundo 4: Les Nuances et le Virtuel',
            page_range: '247–270',
            topics_count: 5,
            exercise_groups_count: 12,
            total_questions: 110,
            theory_markdown: '## All the pronouns (Tous les pronoms)\n\nLes pronoms sujets, COD, COI, y, en et disjoints.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch21-t01', title: 'Pronoms sujets et pronom on', order_index: 1 },
            { id: 'ch21-t02', title: 'Pronoms COD et accords', order_index: 2 },
            { id: 'ch21-t03', title: 'Pronoms COI lui et leur', order_index: 3 },
            { id: 'ch21-t04', title: 'Pronoms y, en et doubles pronoms', order_index: 4 },
            { id: 'ch21-t05', title: 'Pronoms toniques et personnes', order_index: 5 },
          ],
          exerciseSets: [
            { id: 'ch21-ex01', title: 'Exercice 21.1', instruction: 'Pronoms COD', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 1 },
            { id: 'ch21-ex02', title: 'Exercice 21.2', instruction: 'Traduction COD', interaction_type: 'translation', questions_count: 10, order_index: 2 },
            { id: 'ch21-ex03', title: 'Exercice 21.3', instruction: 'Pronoms COI', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 3 },
            { id: 'ch21-ex04', title: 'Exercice 21.4', instruction: 'Traduction COI', interaction_type: 'translation', questions_count: 10, order_index: 4 },
            { id: 'ch21-ex05', title: 'Exercice 21.5', instruction: 'Pronom y', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 5 },
            { id: 'ch21-ex06', title: 'Exercice 21.6', instruction: 'Pronom en', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 6 },
            { id: 'ch21-ex07', title: 'Exercice 21.7', instruction: 'Matching', interaction_type: 'matching', questions_count: 5, order_index: 7 },
            { id: 'ch21-ex08', title: 'Exercice 21.8', instruction: 'Doubles pronoms', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 8 },
            { id: 'ch21-ex09', title: 'Exercice 21.9', instruction: 'Traduction mixte', interaction_type: 'translation', questions_count: 10, order_index: 9 },
            { id: 'ch21-ex10', title: 'Exercice 21.10', instruction: 'Cest qui', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 10 },
            { id: 'ch21-ex11', title: 'Exercice 21.11', instruction: 'Toniques personnes', interaction_type: 'translation', questions_count: 10, order_index: 11 },
            { id: 'ch21-ex12', title: 'Exercice 21.12', instruction: 'Aussi non plus', interaction_type: 'fill_blank', questions_count: 5, order_index: 12 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch22') {
      return {
        data: {
          chapter: {
            id: 'ch22',
            number: 22,
            title: 'Adjectives and comparisons',
            slug: 'adjectives-and-comparisons',
            world_number: 4,
            world_name: 'Mundo 4: Les Nuances et le Virtuel',
            page_range: '271–282',
            topics_count: 5,
            exercise_groups_count: 7,
            total_questions: 55,
            theory_markdown: '## Adjectives and comparisons (Les adjectifs et les comparaisons)\n\nL\'accord des adjectifs, la place (BANGS) et les comparatifs.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch22-t01', title: 'Accord en genre et féminins irréguliers', order_index: 1 },
            { id: 'ch22-t02', title: 'Adjectifs spéciaux devant voyelle', order_index: 2 },
            { id: 'ch22-t03', title: 'Place de l\'adjectif et changements de sens', order_index: 3 },
            { id: 'ch22-t04', title: 'Adjectifs de couleur', order_index: 4 },
            { id: 'ch22-t05', title: 'Comparatifs et superlatifs', order_index: 5 },
          ],
          exerciseSets: [
            { id: 'ch22-ex01', title: 'Exercice 22.1', instruction: 'Traduction adjectifs', interaction_type: 'translation', questions_count: 10, order_index: 1 },
            { id: 'ch22-ex02', title: 'Exercice 22.2', instruction: 'Adjectif logique', interaction_type: 'fill_blank', questions_count: 5, order_index: 2 },
            { id: 'ch22-ex03', title: 'Exercice 22.3', instruction: 'Féminin Patrick Sonia', interaction_type: 'fill_blank', questions_count: 10, order_index: 3 },
            { id: 'ch22-ex04', title: 'Exercice 22.4', instruction: 'Comparatifs contexte', interaction_type: 'translation', questions_count: 10, order_index: 4 },
            { id: 'ch22-ex05', title: 'Exercice 22.5', instruction: 'Formulation comparatif', interaction_type: 'sentence_rewrite', questions_count: 5, order_index: 5 },
            { id: 'ch22-ex06', title: 'Exercice 22.6', instruction: 'Traduction synthèse', interaction_type: 'translation', questions_count: 10, order_index: 6 },
            { id: 'ch22-ex07', title: 'Exercice 22.7', instruction: 'Matching sens', interaction_type: 'matching', questions_count: 5, order_index: 7 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch23') {
      return {
        data: {
          chapter: {
            id: 'ch23',
            number: 23,
            title: 'Demonstrative adjectives and pronouns',
            slug: 'demonstrative-adjectives-and-pronouns',
            world_number: 4,
            world_name: 'Mundo 4: Les Nuances et le Virtuel',
            page_range: '283–297',
            topics_count: 5,
            exercise_groups_count: 9,
            total_questions: 82,
            theory_markdown: '## Demonstrative adjectives and pronouns (Les démonstratifs et possessifs)\n\nLes adjectifs démonstratifs et possessifs, pronoms et tournures idiomatiques.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch23-t01', title: 'Adjectifs démonstratifs et suffixes -ci / -là', order_index: 1 },
            { id: 'ch23-t02', title: 'Adjectifs possessifs et règle euphonique devant voyelle', order_index: 2 },
            { id: 'ch23-t03', title: 'Pronoms possessifs, contractions et être à', order_index: 3 },
            { id: 'ch23-t04', title: 'Pronoms démonstratifs simples et composés', order_index: 4 },
            { id: 'ch23-t05', title: 'Pronom neutre ce (c\'), ceci/cela/ça et expressions', order_index: 5 },
          ],
          exerciseSets: [
            { id: 'ch23-ex01', title: 'Exercice 23.1', instruction: 'Adjectifs démonstratifs', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 },
            { id: 'ch23-ex02', title: 'Exercice 23.2', instruction: 'Distinction -ci et -là', interaction_type: 'fill_blank', questions_count: 10, order_index: 2 },
            { id: 'ch23-ex03', title: 'Exercice 23.3', instruction: 'Adjectifs possessifs', interaction_type: 'fill_blank', questions_count: 10, order_index: 3 },
            { id: 'ch23-ex04', title: 'Exercice 23.4', instruction: 'Correspondance possessifs', interaction_type: 'matching', questions_count: 5, order_index: 4 },
            { id: 'ch23-ex05', title: 'Exercice 23.5', instruction: 'Traduction pronoms possessifs', interaction_type: 'fill_blank', questions_count: 10, order_index: 5 },
            { id: 'ch23-ex06', title: 'Exercice 23.6', instruction: 'Comparaisons avec possessifs', interaction_type: 'translation', questions_count: 10, order_index: 6 },
            { id: 'ch23-ex07', title: 'Exercice 23.7', instruction: 'Démonstratifs dialogue', interaction_type: 'translation', questions_count: 10, order_index: 7 },
            { id: 'ch23-ex08', title: 'Exercice 23.8', instruction: 'Remplacement composés', interaction_type: 'sentence_rewrite', questions_count: 10, order_index: 8 },
            { id: 'ch23-ex09', title: 'Exercice 23.9', instruction: 'Expressions idiomatiques', interaction_type: 'translation', questions_count: 7, order_index: 9 },
          ],
        },
        isLoading: false,
        error: null,
      };
    }
    if (chapterId === 'ch24') {
      return {
        data: {
          chapter: {
            id: 'ch24',
            number: 24,
            title: 'Relative pronouns',
            slug: 'relative-pronouns',
            world_number: 4,
            world_name: 'Mundo 4: Les Nuances et le Virtuel',
            page_range: '298–312',
            topics_count: 6,
            exercise_groups_count: 9,
            total_questions: 85,
            theory_markdown: '## Relative pronouns (Les pronoms relatifs)\n\nLes pronoms relatifs qui, que, où, dont, lequel et les formes indéfinies ce qui, ce que, ce dont, ce à quoi.',
            editorial_status: 'published',
          },
          topics: [
            { id: 'ch24-t01', title: 'Introduction aux pronoms relatifs et le pronom sujet Qui', order_index: 1 },
            { id: 'ch24-t02', title: 'Le pronom objet direct Que / Qu\' et l\'accord du participe passé', order_index: 2 },
            { id: 'ch24-t03', title: 'Les pronoms relatifs avec prépositions : Lequel, Laquelle, Lesquels, Lesquelles', order_index: 3 },
            { id: 'ch24-t04', title: 'Le pronom relatif de lieu et de temps : Où', order_index: 4 },
            { id: 'ch24-t05', title: 'Le pronom relatif Dont et l\'expression de la possession', order_index: 5 },
            { id: 'ch24-t06', title: 'Les pronoms relatifs indéfinis : Ce qui, Ce que, Ce dont, Ce à quoi et le subjonctif', order_index: 6 },
          ],
          exerciseSets: [
            { id: 'ch24-ex01', title: 'Exercice 24.1', instruction: 'Accord verbe après C\'est ... qui', interaction_type: 'fill_blank', questions_count: 10, order_index: 1 },
            { id: 'ch24-ex02', title: 'Exercice 24.2', instruction: 'Qui ou que', interaction_type: 'fill_blank', questions_count: 10, order_index: 2 },
            { id: 'ch24-ex03', title: 'Exercice 24.3', instruction: 'Accord participe passé', interaction_type: 'matching', questions_count: 5, order_index: 3 },
            { id: 'ch24-ex04', title: 'Exercice 24.4', instruction: 'Préposition + relatif', interaction_type: 'fill_blank', questions_count: 10, order_index: 4 },
            { id: 'ch24-ex05', title: 'Exercice 24.5', instruction: 'Qui, que, dont', interaction_type: 'fill_blank', questions_count: 10, order_index: 5 },
            { id: 'ch24-ex06', title: 'Exercice 24.6', instruction: 'Traduction avec relatifs', interaction_type: 'translation', questions_count: 10, order_index: 6 },
            { id: 'ch24-ex07', title: 'Exercice 24.7', instruction: 'Pronoms neutres ce qui / ce que', interaction_type: 'fill_blank', questions_count: 10, order_index: 7 },
            { id: 'ch24-ex08', title: 'Exercice 24.8', instruction: 'Mise en relief ce qui / ce dont', interaction_type: 'translation', questions_count: 10, order_index: 8 },
            { id: 'ch24-ex09', title: 'Exercice 24.9', instruction: 'Bilan de synthèse relatifs', interaction_type: 'fill_blank', questions_count: 10, order_index: 9 },
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

  it('affiche la théorie, les 9 séries d exercices et les astuces FLE pour le chapitre 20 (Articles and nouns)', () => {
    renderWithProviders('/chapters/ch20');

    expect(screen.getByText('Articles and nouns')).toBeInTheDocument();

    // Onglet Théorie actif par défaut
    expect(screen.getByText(/Les articles définis, partitifs et prépositions géographiques/i)).toBeInTheDocument();

    // Passage à l'onglet Exercices
    const exercisesTab = screen.getByRole('tab', { name: /Exercices \(9\)/i });
    fireEvent.click(exercisesTab);

    expect(screen.getByText('Exercice 20.1')).toBeInTheDocument();
    expect(screen.getByText('Exercice 20.7')).toBeInTheDocument();
    expect(screen.getByText('Exercice 20.9')).toBeInTheDocument();

    // Passage à l'onglet Astuces FLE
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/L'Article Partitif Obligatoire/i)).toBeInTheDocument();
    expect(screen.getByText(/La Règle d'Or de la Négation \(DE \/ D'\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre des Pays : La Règle Magique du « -E » Final/i)).toBeInTheDocument();
    expect(screen.getByText(/Homonymes de Genre : Deux Sens Totalement Différents !/i)).toBeInTheDocument();
  });

  it('affiche la théorie, les 12 séries d exercices et les astuces FLE pour le chapitre 21 (All the pronouns)', () => {
    renderWithProviders('/chapters/ch21');

    expect(screen.getByText('All the pronouns')).toBeInTheDocument();

    // Onglet Théorie actif par défaut
    expect(screen.getByText(/Les pronoms sujets, COD, COI, y, en et disjoints/i)).toBeInTheDocument();

    // Passage à l'onglet Exercices (12)
    const exercisesTab = screen.getByRole('tab', { name: /Exercices \(12\)/i });
    fireEvent.click(exercisesTab);

    expect(screen.getByText('Exercice 21.1')).toBeInTheDocument();
    expect(screen.getByText('Exercice 21.7')).toBeInTheDocument();
    expect(screen.getByText('Exercice 21.12')).toBeInTheDocument();

    // Passage à l'onglet Astuces FLE
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/L'Accord du Participe Passé avec le COD Antécédent/i)).toBeInTheDocument();
    expect(screen.getByText(/Le Duo « Lui » et « Leur » : Unisexe et Invariable/i)).toBeInTheDocument();
    expect(screen.getByText(/Choses vs Personnes : Le Grand Piège de « Y » et « EN »/i)).toBeInTheDocument();
    expect(screen.getByText(/L'Ordre des Doubles Pronoms : Le Schéma Infaillible/i)).toBeInTheDocument();
    expect(screen.getByText(/Les 5 Visages du Pronom « On »/i)).toBeInTheDocument();
    expect(screen.getByText(/Mise en Relief : C'est... qui et l'Accord Verbal/i)).toBeInTheDocument();
  });

  it('affiche la théorie, les 7 séries d exercices et les astuces FLE pour le chapitre 22 (Adjectives and comparisons)', () => {
    renderWithProviders('/chapters/ch22');

    expect(screen.getByText('Adjectives and comparisons')).toBeInTheDocument();

    // Onglet Théorie actif par défaut
    expect(screen.getByText(/L'accord des adjectifs, la place \(BANGS\) et les comparatifs/i)).toBeInTheDocument();

    // Passage à l'onglet Exercices (7)
    const exercisesTab = screen.getByRole('tab', { name: /Exercices \(7\)/i });
    fireEvent.click(exercisesTab);

    expect(screen.getByText('Exercice 22.1')).toBeInTheDocument();
    expect(screen.getByText('Exercice 22.2')).toBeInTheDocument();
    expect(screen.getByText('Exercice 22.7')).toBeInTheDocument();

    // Passage à l'onglet Astuces FLE
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/L'Effet Phonétique du « -e » Féminin/i)).toBeInTheDocument();
    expect(screen.getByText(/Les 5 Formes Euphoniques Devant Voyelle/i)).toBeInTheDocument();
    expect(screen.getByText(/La Règle BANGS : Les Rares Adjectifs Avant le Nom/i)).toBeInTheDocument();
    expect(screen.getByText(/Changement de Sens selon la Place/i)).toBeInTheDocument();
    expect(screen.getByText(/L'Invariabilité des Couleurs Composées et Fruits/i)).toBeInTheDocument();
    expect(screen.getByText(/Comparatifs : AUSSI vs AUTANT \(Le Piège Lusophone\)/i)).toBeInTheDocument();
  });

  it('affiche la théorie, les 9 séries d exercices et les astuces FLE pour le chapitre 23 (Demonstrative adjectives and pronouns)', () => {
    renderWithProviders('/chapters/ch23');

    expect(screen.getByText('Demonstrative adjectives and pronouns')).toBeInTheDocument();

    // Onglet Théorie actif par défaut
    expect(screen.getByText(/Les adjectifs démonstratifs et possessifs, pronoms et tournures idiomatiques/i)).toBeInTheDocument();

    // Passage à l'onglet Exercices (9)
    const exercisesTab = screen.getByRole('tab', { name: /Exercices \(9\)/i });
    fireEvent.click(exercisesTab);

    expect(screen.getByText('Exercice 23.1')).toBeInTheDocument();
    expect(screen.getByText('Exercice 23.4')).toBeInTheDocument();
    expect(screen.getByText('Exercice 23.9')).toBeInTheDocument();

    // Passage à l'onglet Astuces FLE
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/L'Euphonie de « Cet » : Éviter le Choc de Deux Voyelles/i)).toBeInTheDocument();
    expect(screen.getByText(/Adjectifs Possessifs : L'Accord avec l'Objet Possédé !/i)).toBeInTheDocument();
    expect(screen.getByText(/La Règle d'Or d'Euphonie : « Mon amie », « Son honnêteté »/i)).toBeInTheDocument();
    expect(screen.getByText(/Pronoms Possessifs : Circonflexe et Contractions/i)).toBeInTheDocument();
    expect(screen.getByText(/Pronoms Démonstratifs : Simples vs Composés \(-ci \/ -là\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Le Neutre « C'est » et les Expressions Idiomatiques/i)).toBeInTheDocument();
  });

  it('affiche la théorie, les 9 séries d exercices et les astuces FLE pour le chapitre 24 (Relative pronouns)', () => {
    renderWithProviders('/chapters/ch24');

    expect(screen.getByText('Relative pronouns')).toBeInTheDocument();

    // Onglet Théorie actif par défaut
    expect(screen.getByText(/Les pronoms relatifs qui, que, où, dont, lequel et les formes indéfinies/i)).toBeInTheDocument();

    // Passage à l'onglet Exercices (9)
    const exercisesTab = screen.getByRole('tab', { name: /Exercices \(9\)/i });
    fireEvent.click(exercisesTab);

    expect(screen.getByText('Exercice 24.1')).toBeInTheDocument();
    expect(screen.getByText('Exercice 24.4')).toBeInTheDocument();
    expect(screen.getByText('Exercice 24.9')).toBeInTheDocument();

    // Passage à l'onglet Astuces FLE
    const tipsTab = screen.getByRole('tab', { name: /Astuces FLE/i });
    fireEvent.click(tipsTab);

    expect(screen.getByText(/Qui vs Que : La Frontière Sujet vs Complément d'Objet/i)).toBeInTheDocument();
    expect(screen.getByText(/L'Élision Phonétique : « Qui » JAMAIS, « Que » TOUJOURS !/i)).toBeInTheDocument();
    expect(screen.getByText(/« C'est moi qui... » : Accord Obligatoire du Verbe/i)).toBeInTheDocument();
    expect(screen.getByText(/Temps Composés avec « Que » : L'Accord du Participe Passé/i)).toBeInTheDocument();
    expect(screen.getByText(/Le Pronom « Dont » : Verbes en « De » et Possession/i)).toBeInTheDocument();
    expect(screen.getByText(/Repère Temporel « Où » et Neutres « Ce qui \/ Ce que »/i)).toBeInTheDocument();
  });
});
