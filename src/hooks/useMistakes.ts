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

export function useMistakes(options: UseMistakesOptions = {}) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const { chapterId = null, status = 'pending' } = options;

  const query = useQuery<UserMistakeDetail[]>({
    queryKey: ['user-mistakes', user?.id, chapterId, status],
    queryFn: async (): Promise<UserMistakeDetail[]> => {
      if (!supabase || !user) {
        let filtered = MOCK_MISTAKES;
        if (chapterId) {
          filtered = filtered.filter((m) => m.chapter_id === chapterId);
        }
        if (status) {
          filtered = filtered.filter((m) => m.status === status);
        }
        return filtered;
      }

      const { data, error } = await supabase.rpc('get_user_mistakes', {
        p_chapter_id: chapterId,
        p_status: status
      });

      if (error) {
        console.warn('[useMistakes] Erro ao buscar erros:', error.message);
        return [];
      }

      return (data as UserMistakeDetail[]) || [];
    }
  });

  const completeReviewMutation = useMutation({
    mutationFn: async (resolvedQuestionIds: string[]) => {
      if (!supabase || !user) {
        return { success: true, resolved_count: resolvedQuestionIds.length, xp_granted: 5 };
      }

      const { data, error } = await supabase.rpc('complete_review_session', {
        p_resolved_question_ids: resolvedQuestionIds
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-mistakes'] });
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  });

  return {
    mistakes: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    completeReview: completeReviewMutation.mutateAsync,
    isCompletingReview: completeReviewMutation.isPending
  };
}
