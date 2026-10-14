import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import LearningPathPage from '@/pages/LearningPathPage';
import { ChapterPage } from '@/pages/ChapterPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { ReferencesPage } from '@/pages/ReferencesPage';
import { evaluateAnswer } from '@/utils/answerEvaluator';

// Mock do Supabase
vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  signOutUser: vi.fn().mockResolvedValue(undefined),
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
    auth: {
      signInWithOtp: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      })
    }
  }
}));

import { supabase } from '@/lib/supabase';

describe('E2E Complete User Journey Flow (PRD §24.1 — Etapa 8)', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    // Mock das tabelas Supabase para o fluxo E2E
    (supabase!.from as any).mockImplementation((table: string) => {
      switch (table) {
        case 'chapters':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [
                  {
                    id: 'ch01',
                    number: 1,
                    title: 'The present tense of regular -er verbs',
                    slug: 'present-er-verbs',
                    world_number: 1,
                    world_name: 'Mundo 1: Les Fondations',
                    page_range: '23-39',
                    topics_count: 3,
                    exercise_groups_count: 10,
                    total_questions: 100,
                    editorial_status: 'published'
                  }
                ],
                error: null
              })
            })
          };
        case 'user_mistakes':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [],
                error: null
              })
            })
          };
        default:
          return { select: vi.fn() };
      }
    });
  });

  it('executa a jornada completa: convite -> login -> dashboard -> trilha -> teoria -> correção FLE -> referências -> logout', async () => {
    // 1. Início na tela de Login com e-mail convidado
    const { unmount } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/login?email=etudiant.teste%40fqg.com']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/Adresse e-mail/i) as HTMLInputElement;
    expect(emailInput.value).toBe('etudiant.teste@fqg.com');

    // 2. Simula login com sucesso
    useAuthStore.setState({
      user: { id: 'user-e2e-1', email: 'etudiant.teste@fqg.com' } as any,
      profile: {
        id: 'user-e2e-1',
        email: 'etudiant.teste@fqg.com',
        role: 'student',
        display_name: 'Étudiant E2E',
        xp: 150,
        hearts: 5,
        streak_days: 3
      } as any,
      isLoading: false,
      isInitialized: true,
      authError: null
    });

    unmount();

    // 3. Renderiza Dashboard com estado autenticado
    const { unmount: unmountDash } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Bienvenue, Étudiant E2E/i)).toBeInTheDocument();
    expect(screen.getByText(/Votre Quête de la/i)).toBeInTheDocument();

    unmountDash();

    // 4. Navega para a Trilha de Aprendizagem
    const { unmount: unmountPath } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/chapters']}>
          <Routes>
            <Route path="/chapters" element={<LearningPathPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Trilha de Aprendizado/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('The present tense of regular -er verbs')).toBeInTheDocument();
    });

    unmountPath();

    // 5. Entra no Capítulo 01 e lê a Teoria
    const { unmount: unmountChapter } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/chapters/ch01']}>
          <Routes>
            <Route path="/chapters/:chapterId" element={<ChapterPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getAllByText('The present tense of regular -er verbs').length).toBeGreaterThanOrEqual(1);

    // 6. Avaliação de resposta pelo motor pedagógico FLE (sem acento errado / sensível a acento)
    const exactEvaluation = evaluateAnswer('Je parle', ['je parle'], { interactionType: 'fill_blank' });
    expect(exactEvaluation.status).toBe('correct');
    expect(exactEvaluation.score).toBe(1.0);

    const accentMismatch = evaluateAnswer('a', ['à'], { interactionType: 'fill_blank' });
    expect(accentMismatch.status).toBe('incorrect');
    expect(accentMismatch.feedback.pedagogicalTip).toContain('accents');

    unmountChapter();

    // 7. Consulta a página de Referências Gramaticais FLE
    const { unmount: unmountRef } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/references']}>
          <Routes>
            <Route path="/references" element={<ReferencesPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Références & Tables Grammaticales/i)).toBeInTheDocument();
    expect(screen.getByText('Verbe Auxiliaire : Être')).toBeInTheDocument();

    unmountRef();

    // 8. Consulta o Caderno de Revisão Inteligente (Mon Coffre d'Erreurs)
    const { unmount: unmountReview } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/review']}>
          <Routes>
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Mon Coffre d'Erreurs/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Félicitations ! Aucune erreur en attente/i)).toBeInTheDocument();
    });

    unmountReview();

    // 9. Logout
    await useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
