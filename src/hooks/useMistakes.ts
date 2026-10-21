import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { UserMistakeDetail } from '@/types/database';

export interface UseMistakesOptions {
  chapterId?: string | null;
  status?: 'pending' | 'resolved' | 'dismissed' | null;
}

const MOCK_MISTAKES: UserMistakeDetail[] = [
  {
    mistake_id: 'mock-m-1',
    question_id: 'q-ch01-01',
    exercise_set_id: 'ex-ch01-01',
    chapter_id: 'ch01',
    last_wrong_answer: 'Je parle',
    wrong_count: 2,
    status: 'pending',
    last_attempted_at: new Date().toISOString(),
    prompt: "Conjuguez le verbe 'être' à la 1re personne du singulier : Je ___ étudiant.",
    instruction: "Complétez avec la forme correcte du verbe être au présent de l'indicatif.",
    interaction_type: 'fill_in_blank',
    accepted_answers: ['suis'],
    explanation: "Attention : le verbe 'être' est irrégulier au présent : je suis, tu es, il/elle/on est, nous sommes, vous êtes, ils/elles sont."
  },
  {
    mistake_id: 'mock-m-2',
    question_id: 'q-ch01-02',
    exercise_set_id: 'ex-ch01-01',
    chapter_id: 'ch01',
    last_wrong_answer: 'Ils ont',
    wrong_count: 1,
    status: 'pending',
    last_attempted_at: new Date().toISOString(),
    prompt: "Choisissez la forme correcte du verbe 'avoir' : Nous ___ faim.",
    instruction: "Sélectionnez la conjugaison appropriée.",
    interaction_type: 'multiple_choice',
    accepted_answers: ['avons'],
    explanation: "Au présent de l'indicatif, la 1re personne du pluriel du verbe 'avoir' s'écrit 'nous avons' (sans 's' après 'avon', et ne pas confondre avec 'ils ont')."
  }
];

const STORAGE_KEY = 'fgq_user_mistakes';

function getStoredMistakes(): UserMistakeDetail[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback if localStorage is disabled or corrupted
  }
  return MOCK_MISTAKES;
}

function saveStoredMistakes(mistakes: UserMistakeDetail[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
  } catch {
    // fallback
  }
}

export function useMistakes(options: UseMistakesOptions = {}) {
  const user = useAuthStore((s) => s.user);
  const isMockMode = useAuthStore((s) => s.isMockMode);
  const queryClient = useQueryClient();
  const { chapterId = null, status = 'pending' } = options;

  const query = useQuery<{
    mistakes: UserMistakeDetail[];
    pendingCount: number;
    resolvedCount: number;
  }>({
    queryKey: ['user-mistakes', user?.id, isMockMode, chapterId, status],
    queryFn: async () => {
      // If unauthenticated or in mock mode
      if (isMockMode || !supabase || !user) {
        const stored = getStoredMistakes();
        const pendingCount = stored.filter((m) => m.status === 'pending').length;
        const resolvedCount = stored.filter((m) => m.status === 'resolved').length;

        let filtered = stored;
        if (chapterId) {
          filtered = filtered.filter((m) => m.chapter_id === chapterId);
        }
        if (status) {
          filtered = filtered.filter((m) => m.status === status);
        }
        return { mistakes: filtered, pendingCount, resolvedCount };
      }

      try {
        const res = await supabase.rpc('get_user_mistakes', {
          p_chapter_id: chapterId,
          p_status: status
        });

        if (res?.error) {
          console.warn('[useMistakes] Erro ao buscar erros via RPC:', res.error.message);
          return { mistakes: [], pendingCount: 0, resolvedCount: 0 };
        }

        const mistakes = (res?.data as UserMistakeDetail[]) || [];
        const pendingCount = status === 'pending' ? mistakes.length : 0;
        const resolvedCount = status === 'resolved' ? mistakes.length : 0;
        return { mistakes, pendingCount, resolvedCount };
      } catch {
        return { mistakes: [], pendingCount: 0, resolvedCount: 0 };
      }
    }
  });

  const completeReviewMutation = useMutation({
    mutationFn: async (resolvedQuestionIds: string[]) => {
      if (isMockMode || !supabase || !user) {
        const stored = getStoredMistakes();
        const updated = stored.map((m) => {
          if (resolvedQuestionIds.includes(m.question_id)) {
            return { ...m, status: 'resolved' as const };
          }
          return m;
        });
        saveStoredMistakes(updated);
        // Award XP
        await useAuthStore.getState().addXp(5);
        return { success: true, resolved_count: resolvedQuestionIds.length, xp_granted: 5 };
      }

      const res = await supabase.rpc('complete_review_session', {
        p_resolved_question_ids: resolvedQuestionIds
      });

      if (res?.error) {
        throw new Error(res.error.message);
      }

      return res?.data ?? { success: true, resolved_count: resolvedQuestionIds.length, xp_granted: 5 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-mistakes'] });
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  });

  return {
    mistakes: query.data?.mistakes || [],
    pendingCount: query.data?.pendingCount ?? (query.data?.mistakes?.filter((m) => m.status === 'pending').length || 0),
    resolvedCount: query.data?.resolvedCount ?? (query.data?.mistakes?.filter((m) => m.status === 'resolved').length || 0),
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    completeReview: completeReviewMutation.mutateAsync,
    isCompletingReview: completeReviewMutation.isPending
  };
}
