import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Achievement, UserAchievement } from '@/types/database';

export interface EnrichedAchievement extends Achievement {
  unlocked: boolean;
  unlocked_at: string | null;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_mission',
    title: 'Premier Pas',
    description: 'Terminez votre toute première série d’exercices avec succès.',
    icon: '🚀',
    category: 'progress',
    xp_reward: 20,
    requirement_type: 'first_session',
    requirement_value: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'perfect_stars',
    title: 'Perfection',
    description: 'Obtenez 3 étoiles parfaites (≥ 90% de précision vérifiée) sur une série.',
    icon: '⭐',
    category: 'mastery',
    xp_reward: 30,
    requirement_type: 'perfect_stars',
    requirement_value: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'chapter_master',
    title: 'Maître du Chapitre',
    description: 'Complétez l’intégralité des séries d’exercices d’un chapitre.',
    icon: '🏰',
    category: 'mastery',
    xp_reward: 50,
    requirement_type: 'chapter_completed',
    requirement_value: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'mistake_hunter',
    title: 'Chasseur d’Erreurs',
    description: 'Surmontez et corrigez votre première erreur dans le carnet d’études.',
    icon: '🎯',
    category: 'review',
    xp_reward: 25,
    requirement_type: 'mistakes_corrected',
    requirement_value: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'three_day_streak',
    title: 'Flamme Ardente',
    description: 'Maintenez une régularité d’étude pendant 3 jours consécutifs.',
    icon: '🔥',
    category: 'streak',
    xp_reward: 30,
    requirement_type: 'streak_days',
    requirement_value: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'seven_day_streak',
    title: 'Discipline Olympienne',
    description: 'Atteignez un palier de 7 jours consécutifs d’apprentissage.',
    icon: '⚡',
    category: 'streak',
    xp_reward: 50,
    requirement_type: 'streak_days',
    requirement_value: 7,
    created_at: new Date().toISOString()
  },
  {
    id: 'review_champion',
    title: 'Champion de la Révision',
    description: 'Terminez une session ciblée complète de révision de vos erreurs.',
    icon: '📚',
    category: 'review',
    xp_reward: 40,
    requirement_type: 'review_completed',
    requirement_value: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'centurion_xp',
    title: 'Centurion de Grammaire',
    description: 'Accumulez 100 points d’expérience (XP) dans votre quête.',
    icon: '💎',
    category: 'progress',
    xp_reward: 30,
    requirement_type: 'xp_milestone',
    requirement_value: 100,
    created_at: new Date().toISOString()
  }
];

function evaluateLocalAchievements(profile: any, catalog: Achievement[]): EnrichedAchievement[] {
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_days ?? 0;
  const level = profile?.level ?? 1;

  return catalog.map((ach) => {
    let unlocked = false;
    if (ach.id === 'first_mission' && xp >= 20) unlocked = true;
    if (ach.id === 'three_day_streak' && streak >= 3) unlocked = true;
    if (ach.id === 'seven_day_streak' && streak >= 7) unlocked = true;
    if (ach.id === 'centurion_xp' && xp >= 100) unlocked = true;
    if (ach.id === 'perfect_stars' && level >= 2) unlocked = true;

    return {
      ...ach,
      unlocked,
      unlocked_at: unlocked ? (profile?.updated_at || new Date().toISOString()) : null
    };
  });
}

export function useAchievements() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const isMockMode = useAuthStore((s) => s.isMockMode);
  const queryClient = useQueryClient();

  const query = useQuery<{ catalog: Achievement[]; userAchievements: UserAchievement[]; enriched: EnrichedAchievement[] }>({
    queryKey: ['user-achievements', user?.id, isMockMode],
    queryFn: async () => {
      if (isMockMode || !supabase || !user) {
        const enriched = evaluateLocalAchievements(profile, MOCK_ACHIEVEMENTS);
        return {
          catalog: MOCK_ACHIEVEMENTS,
          userAchievements: [],
          enriched
        };
      }

      try {
        const [catRes, userRes] = await Promise.all([
          supabase.from('achievements').select('*').order('xp_reward', { ascending: true }),
          supabase.from('user_achievements').select('*').eq('user_id', user.id)
        ]);

        if (catRes.error) {
          console.warn('[useAchievements] Erro ao buscar catálogo de conquistas:', catRes.error.message);
        }
        if (userRes.error) {
          console.warn('[useAchievements] Erro ao buscar conquistas do usuário:', userRes.error.message);
        }

        // If userRes failed due to permission or offline, fall back locally
        if (userRes.error) {
          const catalog = (catRes.data as Achievement[]) || MOCK_ACHIEVEMENTS;
          const enriched = evaluateLocalAchievements(profile, catalog);
          return { catalog, userAchievements: [], enriched };
        }

        const catalog = (catRes.data as Achievement[]) || MOCK_ACHIEVEMENTS;
        const userAchievements = (userRes.data as UserAchievement[]) || [];

        const userMap = new Map<string, string>();
        for (const ua of userAchievements) {
          userMap.set(ua.achievement_id, ua.unlocked_at);
        }

        const enriched: EnrichedAchievement[] = catalog.map((ach) => ({
          ...ach,
          unlocked: userMap.has(ach.id),
          unlocked_at: userMap.get(ach.id) || null
        }));

        return { catalog, userAchievements, enriched };
      } catch {
        const enriched = evaluateLocalAchievements(profile, MOCK_ACHIEVEMENTS);
        return { catalog: MOCK_ACHIEVEMENTS, userAchievements: [], enriched };
      }
    }
  });

  const checkAndAwardMutation = useMutation({
    mutationFn: async () => {
      if (isMockMode || !supabase || !user) {
        const enriched = evaluateLocalAchievements(profile, MOCK_ACHIEVEMENTS);
        return { success: true, newly_awarded: [], total_unlocked: enriched.filter((a) => a.unlocked).length };
      }

      try {
        const { data, error } = await supabase.rpc('check_and_award_achievements');
        if (error) {
          console.warn('[useAchievements] Erro na RPC check_and_award_achievements:', error.message);
          const enriched = evaluateLocalAchievements(profile, MOCK_ACHIEVEMENTS);
          return { success: true, newly_awarded: [], total_unlocked: enriched.filter((a) => a.unlocked).length };
        }

        return data as { success: boolean; newly_awarded: string[]; total_unlocked: number };
      } catch {
        const enriched = evaluateLocalAchievements(profile, MOCK_ACHIEVEMENTS);
        return { success: true, newly_awarded: [], total_unlocked: enriched.filter((a) => a.unlocked).length };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  });

  const enriched = query.data?.enriched || [];
  const unlockedCount = enriched.filter((a) => a.unlocked).length;
  const totalCount = enriched.length;

  return {
    achievements: enriched,
    unlockedCount,
    totalCount,
    isLoading: query.isLoading,
    isError: query.isError,
    checkAndAward: checkAndAwardMutation.mutateAsync,
    isChecking: checkAndAwardMutation.isPending
  };
}
