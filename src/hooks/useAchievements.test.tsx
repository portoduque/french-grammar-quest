import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAchievements } from './useAchievements';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: vi.fn(),
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('useAchievements hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'user-777', email: 'champion@example.com' } as any,
      profile: { id: 'user-777', email: 'champion@example.com' } as any,
      isInitialized: true,
      authError: null
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('carrega catálogo e marca conquistas desbloqueadas do usuário', async () => {
    const mockCatalog = [
      {
        id: 'first_mission',
        title: 'Premier Pas',
        description: 'Première série terminée',
        icon: '🚀',
        category: 'progress',
        xp_reward: 20,
        requirement_type: 'first_session',
        requirement_value: 1,
        created_at: '2026-10-14T00:00:00Z'
      },
      {
        id: 'perfect_stars',
        title: 'Perfection',
        description: '3 étoiles',
        icon: '⭐',
        category: 'mastery',
        xp_reward: 30,
        requirement_type: 'perfect_stars',
        requirement_value: 3,
        created_at: '2026-10-14T00:00:00Z'
      }
    ];

    const mockUserAchievements = [
      {
        id: 'ua-1',
        user_id: 'user-777',
        achievement_id: 'first_mission',
        unlocked_at: '2026-10-14T12:00:00Z'
      }
    ];

    (supabase!.from as any).mockImplementation((table: string) => {
      if (table === 'achievements') {
        return {
          select: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockCatalog, error: null })
          })
        };
      }
      if (table === 'user_achievements') {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: mockUserAchievements, error: null })
          })
        };
      }
      return { select: vi.fn() };
    });

    const { result } = renderHook(() => useAchievements(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.totalCount).toBe(2);
    expect(result.current.unlockedCount).toBe(1);

    const first = result.current.achievements.find((a) => a.id === 'first_mission');
    const second = result.current.achievements.find((a) => a.id === 'perfect_stars');

    expect(first?.unlocked).toBe(true);
    expect(first?.unlocked_at).toBe('2026-10-14T12:00:00Z');
    expect(second?.unlocked).toBe(false);
  });

  it('permite avaliar conquistas via checkAndAward chamando a RPC correspondente', async () => {
    (supabase!.from as any).mockImplementation((_table: string) => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
        eq: vi.fn().mockResolvedValue({ data: [], error: null })
      })
    }));

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true, newly_awarded: ['first_mission'], total_unlocked: 1 },
      error: null
    });

    const { result } = renderHook(() => useAchievements(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const awardRes = await result.current.checkAndAward();
    expect(supabase!.rpc).toHaveBeenCalledWith('check_and_award_achievements');
    expect(awardRes.newly_awarded).toContain('first_mission');
  });
});
