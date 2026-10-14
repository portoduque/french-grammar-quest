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
    });
  });

  it('exibe cards com erros e botão de iniciar revisão quando há pendências', async () => {
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
  });
});
