import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStudySession } from './useStudySession';
import { useAuthStore } from '@/stores/authStore';

// Mock do supabase
vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('useStudySession', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'user-abc-123', email: 'etudiant@example.com' } as any,
      profile: {
        id: 'user-abc-123',
        email: 'etudiant@example.com',
        role: 'student',
        xp: 150,
        level: 1,
        hearts: 5,
        max_hearts: 5,
        streak_days: 3,
        streak_frozen: false,
        last_active_date: null,
        avatar_url: null,
        display_name: 'Jean',
        timezone: 'UTC',
        preferences: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      isInitialized: true,
      authError: null
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('inicia uma nova sessão via RPC start_or_resume_session', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: {
        session_id: 'session-999',
        exercise_set_id: 'ch01-ex01',
        chapter_id: 'ch01',
        status: 'in_progress',
        current_question_index: 0,
        total_questions: 10,
        correct_count: 0,
        reviewed_count: 0,
        earned_xp: 0,
        content_version: 'v1.0.0'
      },
      error: null
    });

    const { result } = renderHook(() => useStudySession(undefined), { wrapper });

    await act(async () => {
      await result.current.initSession('ch01-ex01');
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('start_or_resume_session', {
      p_exercise_set_id: 'ch01-ex01'
    });

    expect(result.current.session.sessionId).toBe('session-999');
    expect(result.current.session.totalQuestions).toBe(10);
    expect(result.current.session.currentQuestionIndex).toBe(0);
  });

  it('retoma sessão em andamento no índice correto (AC-03, T-018)', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: {
        session_id: 'session-resume-1',
        exercise_set_id: 'ch01-ex02',
        chapter_id: 'ch01',
        status: 'in_progress',
        current_question_index: 4, // Retoma na questão 5
        total_questions: 10,
        correct_count: 4,
        reviewed_count: 0,
        earned_xp: 40,
        content_version: 'v1.0.0'
      },
      error: null
    });

    const { result } = renderHook(() => useStudySession(undefined), { wrapper });

    await act(async () => {
      await result.current.initSession('ch01-ex02');
    });

    expect(result.current.session.currentQuestionIndex).toBe(4);
    expect(result.current.session.correctCount).toBe(4);
    expect(result.current.session.earnedXp).toBe(40);
  });

  it('registra tentativa com saveAttempt e atualiza XP no Zustand (AC-04, T-006, T-010)', async () => {
    (supabase!.rpc as any)
      .mockResolvedValueOnce({
        data: {
          session_id: 'session-att-1',
          exercise_set_id: 'ch01-ex01',
          chapter_id: 'ch01',
          status: 'in_progress',
          current_question_index: 0,
          total_questions: 5,
          correct_count: 0,
          reviewed_count: 0,
          earned_xp: 0
        },
        error: null
      })
      .mockResolvedValueOnce({
        data: {
          success: true,
          xp_granted: 10,
          session_id: 'session-att-1',
          evaluation_status: 'correct'
        },
        error: null
      });

    const { result } = renderHook(() => useStudySession(undefined), { wrapper });

    await act(async () => {
      await result.current.initSession('ch01-ex01');
    });

    await act(async () => {
      await result.current.saveAttempt('ch01-ex01-q01', 'travaille', 'correct', 1.0);
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('record_question_attempt', {
      p_session_id: 'session-att-1',
      p_question_id: 'ch01-ex01-q01',
      p_user_answer: 'travaille',
      p_evaluation_status: 'correct',
      p_score: 1.0
    });

    expect(result.current.session.correctCount).toBe(1);
    expect(result.current.session.earnedXp).toBe(10);
    expect(result.current.session.currentQuestionIndex).toBe(1);
    // Profile XP no Zustand deve ter aumentado de 150 para 160
    expect(useAuthStore.getState().profile?.xp).toBe(160);
  });

  it('conclui a sessão com finishSession, concedendo estrelas oficiais e XP bônus (RF-048, T-028)', async () => {
    (supabase!.rpc as any)
      .mockResolvedValueOnce({
        data: {
          session_id: 'session-finish-1',
          exercise_set_id: 'ch01-ex01',
          chapter_id: 'ch01',
          status: 'in_progress',
          current_question_index: 2,
          total_questions: 2,
          correct_count: 2,
          reviewed_count: 0,
          earned_xp: 20
        },
        error: null
      })
      .mockResolvedValueOnce({
        data: {
          session_id: 'session-finish-1',
          status: 'completed',
          stars: 3,
          accuracy_percent: 100,
          correct_count: 2,
          reviewed_count: 0,
          total_questions: 2,
          completion_xp: 5
        },
        error: null
      });

    const { result } = renderHook(() => useStudySession(undefined), { wrapper });

    await act(async () => {
      await result.current.initSession('ch01-ex01');
    });

    let finishResult: any;
    await act(async () => {
      finishResult = await result.current.finishSession();
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('complete_study_session', {
      p_session_id: 'session-finish-1'
    });

    expect(finishResult).toEqual({
      stars: 3,
      earnedXp: 25 // 20 iniciais + 5 bônus de conclusão
    });

    expect(result.current.session.isCompleted).toBe(true);
    expect(result.current.session.stars).toBe(3);
    // Profile XP no Zustand deve ter aumentado +5 do completion_xp (150 -> 155)
    expect(useAuthStore.getState().profile?.xp).toBe(155);
  });
});
