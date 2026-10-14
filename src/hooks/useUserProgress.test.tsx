import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserProgress, useRecentSession } from './useUserProgress';
import { useAuthStore } from '@/stores/authStore';

// Mock do supabase
vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('useUserProgress & useRecentSession', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'user-prog-1', email: 'jean@example.com' } as any,
      profile: {
        id: 'user-prog-1',
        email: 'jean@example.com',
        role: 'student',
        xp: 120,
        level: 1,
        hearts: 5,
        max_hearts: 5,
        streak_days: 1,
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

  it('calcula estatísticas consolidadas e agrupa progresso por capítulo', async () => {
    const mockProgressData = [
      {
        id: 'prog-1',
        user_id: 'user-prog-1',
        chapter_id: 'ch01',
        exercise_set_id: 'ch01-ex01',
        status: 'completed',
        best_stars: 3,
        accuracy_percent: 100,
        attempts_count: 1,
        last_attempted_at: '2026-10-14T12:00:00Z',
        created_at: '2026-10-14T12:00:00Z'
      },
      {
        id: 'prog-2',
        user_id: 'user-prog-1',
        chapter_id: 'ch01',
        exercise_set_id: 'ch01-ex02',
        status: 'completed',
        best_stars: 2,
        accuracy_percent: 85,
        attempts_count: 2,
        last_attempted_at: '2026-10-14T12:30:00Z',
        created_at: '2026-10-14T12:15:00Z'
      },
      {
        id: 'prog-3',
        user_id: 'user-prog-1',
        chapter_id: 'ch02',
        exercise_set_id: 'ch02-ex01',
        status: 'in_progress',
        best_stars: 0,
        accuracy_percent: 0,
        attempts_count: 1,
        last_attempted_at: '2026-10-14T13:00:00Z',
        created_at: '2026-10-14T13:00:00Z'
      }
    ];

    (supabase!.from as any).mockImplementation((table: string) => {
      if (table === 'user_progress') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: mockProgressData,
                error: null
              })
            }))
          }))
        };
      }
      return {};
    });

    const { result } = renderHook(() => useUserProgress(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.completedCount).toBe(2);
    expect(result.current.data?.inProgressCount).toBe(1);
    expect(result.current.data?.totalStars).toBe(5); // 3 + 2
    expect(result.current.data?.accuracyAverage).toBe(93); // round((100 + 85) / 2) = 93%

    // Agrupamento por capítulo
    const ch01 = result.current.data?.progressByChapter['ch01'];
    expect(ch01).toEqual({
      completed: 2,
      inProgress: 0,
      stars: 5
    });

    const ch02 = result.current.data?.progressByChapter['ch02'];
    expect(ch02).toEqual({
      completed: 0,
      inProgress: 1,
      stars: 0
    });
  });

  it('retorna a sessão de estudo mais recente com useRecentSession', async () => {
    const mockRecent = {
      id: 'sess-recent-9',
      user_id: 'user-prog-1',
      exercise_set_id: 'ch01-ex05',
      chapter_id: 'ch01',
      status: 'in_progress',
      current_question_index: 3,
      total_questions: 10,
      correct_count: 3,
      reviewed_count: 0,
      earned_xp: 30,
      stars: 0,
      content_version: 'v1.0.0',
      created_at: '2026-10-14T13:10:00Z',
      updated_at: '2026-10-14T13:20:00Z'
    };

    (supabase!.from as any).mockImplementation((table: string) => {
      if (table === 'study_sessions') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn(() => ({
                limit: vi.fn(() => ({
                  maybeSingle: vi.fn().mockResolvedValue({
                    data: mockRecent,
                    error: null
                  })
                }))
              }))
            }))
          }))
        };
      }
      return {};
    });

    const { result } = renderHook(() => useRecentSession(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe('sess-recent-9');
    expect(result.current.data?.exercise_set_id).toBe('ch01-ex05');
    expect(result.current.data?.current_question_index).toBe(3);
  });
});
