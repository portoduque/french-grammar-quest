import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ExerciseSet, Question } from '@/types/database';

import {
  CHAPTER_01_EXERCISE_SETS,
  CHAPTER_01_QUESTIONS_MAP
} from '@/data/chapter01Data';

export interface ExerciseSetWithQuestions {
  exerciseSet: ExerciseSet;
  questions: Question[];
}

function getFallbackSet(
  exerciseSetId: string,
  existingSet?: ExerciseSet | null,
  existingQuestions?: Question[] | null
): ExerciseSetWithQuestions {
  if (CHAPTER_01_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_01_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch01',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 1.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_01_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_01_QUESTIONS_MAP[exerciseSetId]
    };
  }

  const fallbackSet: ExerciseSet = existingSet || {
    id: exerciseSetId,
    chapter_id: exerciseSetId.split('-')[0] || 'ch01',
    order_index: 1,
    title: `Exercice ${exerciseSetId}`,
    instruction: 'Mettre les verbes entre parenthèses au présent.',
    interaction_type: 'fill_blank',
    questions_count: 3,
    created_at: new Date().toISOString()
  };

  const fallbackQuestions: Question[] = (existingQuestions && existingQuestions.length > 0)
    ? existingQuestions
    : [
        {
          id: `${exerciseSetId}-q01`,
          exercise_set_id: exerciseSetId,
          order_index: 1,
          prompt: 'Lucie _________________ (travailler) à Lyon.',
          instruction: null,
          tokens: null,
          options: null,
          accepted_answers: ['travaille'],
          explanation: 'Verbe du 1er groupe en -er : terminaison -e pour Lucie (elle).',
          created_at: new Date().toISOString()
        },
        {
          id: `${exerciseSetId}-q02`,
          exercise_set_id: exerciseSetId,
          order_index: 2,
          prompt: 'Mon frère et moi, nous _________________ (accepter) votre invitation.',
          instruction: null,
          tokens: null,
          options: null,
          accepted_answers: ['acceptons'],
          explanation: 'Avec « nous », la terminaison est presque toujours -ons.',
          created_at: new Date().toISOString()
        },
        {
          id: `${exerciseSetId}-q03`,
          exercise_set_id: exerciseSetId,
          order_index: 3,
          prompt: 'Je _________________ (habiter) à Paris.',
          instruction: null,
          tokens: null,
          options: null,
          accepted_answers: ['habite', "j'habite"],
          explanation: 'Élision obligatoire devant voyelle ou h muet : J\'habite.',
          created_at: new Date().toISOString()
        }
      ];

  return {
    exerciseSet: fallbackSet,
    questions: fallbackQuestions
  };
}

export function useExerciseSet(exerciseSetId: string | undefined) {
  return useQuery<ExerciseSetWithQuestions, Error>({
    queryKey: ['exercise-set', exerciseSetId],
    queryFn: async () => {
      if (!exerciseSetId) {
        throw new Error('ID d\'exercice requis');
      }

      if (!supabase) {
        return getFallbackSet(exerciseSetId);
      }

      // 1. Buscar metadados do exercise_set
      const { data: setRow, error: setError } = await supabase
        .from('exercise_sets')
        .select('*')
        .eq('id', exerciseSetId)
        .maybeSingle();

      if (setError) {
        console.warn('[useExerciseSet] Erro ao buscar exercise_set:', exerciseSetId, setError);
      }

      // 2. Buscar perguntas associadas ordenadas por order_index
      const { data: questionsRows, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('exercise_set_id', exerciseSetId)
        .order('order_index', { ascending: true });

      if (questionsError) {
        console.warn('[useExerciseSet] Erro ao buscar questions:', exerciseSetId, questionsError);
      }

      // Se encontrou dados no banco
      if (setRow && questionsRows && questionsRows.length > 0) {
        const fallbackList = CHAPTER_01_QUESTIONS_MAP[exerciseSetId];
        const enrichedQuestions = fallbackList
          ? (questionsRows as Question[]).map(q => {
              const matchedFallback = fallbackList.find(fb => fb.id === q.id);
              return {
                ...q,
                explanation: q.explanation || matchedFallback?.explanation || null,
                options: q.options || matchedFallback?.options || null,
                accepted_answers: Array.from(new Set([...(q.accepted_answers || []), ...(matchedFallback?.accepted_answers || [])]))
              };
            })
          : (questionsRows as Question[]);

        return {
          exerciseSet: setRow as ExerciseSet,
          questions: enrichedQuestions
        };
      }

      return getFallbackSet(exerciseSetId, setRow as ExerciseSet | null, questionsRows as Question[] | null);
    },
    enabled: Boolean(exerciseSetId),
    staleTime: 5 * 60 * 1000 // Cache de 5 minutos
  });
}
