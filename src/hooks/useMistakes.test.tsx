import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMistakes } from './useMistakes';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('useMistakes hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'user-123', email: 'etudiant@example.com' } as any,
      profile: { id: 'user-123', email: 'etudiant@example.com' } as any,
      isInitialized: true,
      authError: null
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('busca erros do usuário via RPC get_user_mistakes', async () => {
    const mockRpcMistakes = [
      {
        mistake_id: 'm-1',
        question_id: 'q-101',
        exercise_set_id: 'set-1',
        chapter_id: 'ch01',
        last_wrong_answer: 'Je sont',
        wrong_count: 2,
        status: 'pending',
        last_attempted_at: '2026-10-14T10:00:00Z',
        prompt: 'Je ___ prêt.',
        instruction: 'Complétez avec le verbe être',
        interaction_type: 'fill_in_blank',
        accepted_answers: ['suis'],
        explanation: 'Je suis au présent.'
      }
    ];

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: mockRpcMistakes,
      error: null
    });

    const { result } = renderHook(() => useMistakes({ chapterId: 'ch01', status: 'pending' }), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('get_user_mistakes', {
      p_chapter_id: 'ch01',
      p_status: 'pending'
    });
    expect(result.current.mistakes).toHaveLength(1);
    expect(result.current.mistakes[0].last_wrong_answer).toBe('Je sont');
  });

  it('permite concluir sessão de revisão via RPC complete_review_session', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: [],
      error: null
    });

    const { result } = renderHook(() => useMistakes(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true, resolved_count: 1, xp_granted: 5 },
      error: null
    });

    const res = await result.current.completeReview(['q-101']);
    expect(supabase!.rpc).toHaveBeenCalledWith('complete_review_session', {
      p_resolved_question_ids: ['q-101']
    });
    expect(res).toEqual({ success: true, resolved_count: 1, xp_granted: 5 });
  });

  it('retorna dados de demonstração quando usuário não está logado', async () => {
    useAuthStore.setState({ user: null });

    const { result } = renderHook(() => useMistakes(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.mistakes.length).toBeGreaterThan(0);
    expect(result.current.mistakes[0].mistake_id).toContain('mock-m');
  });
});
