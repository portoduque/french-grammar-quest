import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReviewPage } from './ReviewPage';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('ReviewPage (Mon Coffre d\'Erreurs)', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });

    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'user-rev-1', email: 'etudiant@example.com' } as any,
      profile: { id: 'user-rev-1', email: 'etudiant@example.com' } as any,
      isInitialized: true,
      authError: null
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ReviewPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it('renderiza o cabeçalho e as abas da página de revisão', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: [],
      error: null
    });

    renderComponent();

    expect(screen.getByText(/Mon Coffre d'Erreurs/i)).toBeInTheDocument();
    expect(screen.getByText('À retravailler')).toBeInTheDocument();
    expect(screen.getByText('Erreurs maîtrisées')).toBeInTheDocument();
  });

  it('exibe o empty state didático quando não há erros pendentes (T-027)', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: [],
      error: null
    });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(/Félicitations ! Aucune erreur en attente/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Votre carnet d'études est impeccable/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/parcours d'apprentissage/i)
      ).toBeInTheDocument();
    });
  });

  it('exibe cards com erros, permite treinar com AccentToolbar e concluir sessão interativa', async () => {
    const mockMistakes = [
      {
        mistake_id: 'm-1',
        question_id: 'q-101',
        exercise_set_id: 'set-1',
        chapter_id: 'ch01',
        last_wrong_answer: 'Je parle pas',
        wrong_count: 1,
        status: 'pending',
        last_attempted_at: '2026-10-14T10:00:00Z',
        prompt: 'Formez la négation : Je parle.',
        instruction: 'Ajoutez ne... pas',
        interaction_type: 'fill_in_blank',
        accepted_answers: ['Je ne parle pas'],
        explanation: 'En français standard, la négation encadre le verbe : ne + verbe + pas.'
      }
    ];

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: mockMistakes,
      error: null
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Lancer la Révision \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText('Formez la négation : Je parle.')).toBeInTheDocument();
      expect(screen.getByText('Je parle pas')).toBeInTheDocument();
      expect(screen.getByText('Je ne parle pas')).toBeInTheDocument();
    });

    // Clicar em Lancer la Révision abre a sessão interativa
    const startBtn = screen.getByText(/Lancer la Révision/i);
    fireEvent.click(startBtn);

    expect(screen.getByText(/Révision Active/i)).toBeInTheDocument();

    // AccentToolbar está disponível para digitação de caracteres acentuados
    expect(screen.getByRole('toolbar', { name: /Caracteres acentuados franceses/i })).toBeInTheDocument();

    // Digita resposta correta
    const input = screen.getByPlaceholderText(/Tapez ici/i);
    fireEvent.change(input, { target: { value: 'Je ne parle pas' } });

    // Clica em verificar
    const checkBtn = screen.getByRole('button', { name: /Vérifier/i });
    fireEvent.click(checkBtn);

    // Motor FLE avalia e dá feedback de acerto
    await waitFor(() => {
      expect(screen.getByText(/Excellente réponse/i)).toBeInTheDocument();
    });

    // Mock do retorno da RPC complete_review_session
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true, resolved_count: 1, xp_granted: 5 },
      error: null
    });

    // Conclui a sessão
    const finishBtn = screen.getByRole('button', { name: /Terminer la session/i });
    fireEvent.click(finishBtn);

    await waitFor(() => {
      expect(screen.getByText(/Session de Révision Terminée/i)).toBeInTheDocument();
      expect(screen.getByText(/\+5 XP de Révision/i)).toBeInTheDocument();
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('complete_review_session', {
      p_resolved_question_ids: ['q-101']
    });
  });

  it('permite marcar um erro como assimilado diretamente no card', async () => {
    const mockMistakes = [
      {
        mistake_id: 'm-2',
        question_id: 'q-102',
        exercise_set_id: 'set-1',
        chapter_id: 'ch01',
        last_wrong_answer: 'Tu es',
        wrong_count: 1,
        status: 'pending',
        last_attempted_at: '2026-10-14T10:00:00Z',
        prompt: 'Complétez : Vous ___ ici.',
        instruction: 'Verbe être',
        interaction_type: 'fill_in_blank',
        accepted_answers: ['êtes'],
        explanation: 'Vous êtes.'
      }
    ];

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: mockMistakes,
      error: null
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Complétez : Vous ___ ici.')).toBeInTheDocument();
    });

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true, resolved_count: 1, xp_granted: 5 },
      error: null
    });

    const resolveBtn = screen.getByRole('button', { name: /Marquer comme assimilé/i });
    fireEvent.click(resolveBtn);

    await waitFor(() => {
      expect(supabase!.rpc).toHaveBeenCalledWith('complete_review_session', {
        p_resolved_question_ids: ['q-102']
      });
    });
  });

  it('funciona perfeitamente em modo demonstração (isMockMode: true) com mock mistakes locais', async () => {
    useAuthStore.setState({
      user: { id: 'demo-student', email: 'etudiant@frenchgrammarquest.app' } as any,
      profile: { id: 'demo-student', email: 'etudiant@frenchgrammarquest.app' } as any,
      isMockMode: true,
      isInitialized: true
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Mon Coffre d'Erreurs/i)).toBeInTheDocument();
      // Em modo demonstração, mock mistakes padrão estão disponíveis
      expect(screen.getByText(/Lancer la Révision/i)).toBeInTheDocument();
    });
  });
});
