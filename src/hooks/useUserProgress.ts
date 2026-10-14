import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { UserProgress, StudySession } from '@/types/database';

export interface ProgressSummary {
  progressList: UserProgress[];
  completedCount: number;
  inProgressCount: number;
  totalStars: number;
  accuracyAverage: number;
  progressBySet: Record<string, UserProgress>;
  progressByChapter: Record<string, { completed: number; inProgress: number; stars: number }>;
  recentProgress: UserProgress | null;
}

export function useUserProgress() {
  const user = useAuthStore((s) => s.user);

  return useQuery<ProgressSummary>({
    queryKey: ['user-progress', user?.id],
    queryFn: async (): Promise<ProgressSummary> => {
      if (!supabase || !user) {
        return {
          progressList: [],
          completedCount: 0,
          inProgressCount: 0,
          totalStars: 0,
          accuracyAverage: 0,
          progressBySet: {},
          progressByChapter: {},
          recentProgress: null
        };
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('last_attempted_at', { ascending: false });

      if (error) {
        console.warn('[useUserProgress] Erro ao carregar progresso:', error.message);
        return {
          progressList: [],
          completedCount: 0,
          inProgressCount: 0,
          totalStars: 0,
          accuracyAverage: 0,
          progressBySet: {},
          progressByChapter: {},
          recentProgress: null
        };
      }

      const list: UserProgress[] = (data as UserProgress[]) || [];
      const completed = list.filter((p) => p.status === 'completed');
      const inProgress = list.filter((p) => p.status === 'in_progress');
      const totalStars = list.reduce((sum, p) => sum + (p.best_stars || 0), 0);
      const totalAccuracy = completed.reduce((sum, p) => sum + (p.accuracy_percent || 0), 0);
      const accuracyAverage = completed.length > 0 ? Math.round(totalAccuracy / completed.length) : 0;

      const progressBySet: Record<string, UserProgress> = {};
      const progressByChapter: Record<string, { completed: number; inProgress: number; stars: number }> = {};

      for (const p of list) {
        progressBySet[p.exercise_set_id] = p;

        if (!progressByChapter[p.chapter_id]) {
          progressByChapter[p.chapter_id] = { completed: 0, inProgress: 0, stars: 0 };
        }
        if (p.status === 'completed') {
          progressByChapter[p.chapter_id].completed += 1;
        } else if (p.status === 'in_progress') {
          progressByChapter[p.chapter_id].inProgress += 1;
        }
        progressByChapter[p.chapter_id].stars += p.best_stars || 0;
      }

      return {
        progressList: list,
        completedCount: completed.length,
        inProgressCount: inProgress.length,
        totalStars,
        accuracyAverage,
        progressBySet,
        progressByChapter,
        recentProgress: list.length > 0 ? list[0] : null
      };
    },
    enabled: Boolean(user)
  });
}

export function useRecentSession() {
  const user = useAuthStore((s) => s.user);

  return useQuery<StudySession | null>({
    queryKey: ['recent-session', user?.id],
    queryFn: async (): Promise<StudySession | null> => {
      if (!supabase || !user) return null;

      const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('[useRecentSession] Erro ao carregar sessão recente:', error.message);
        return null;
      }

      return (data as StudySession) || null;
    },
    enabled: Boolean(user)
  });
}
