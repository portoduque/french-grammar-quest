import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Chapter, Topic, ExerciseSet } from '@/types/database';

export interface ChapterTheoryData {
  chapter: Chapter;
  topics: Topic[];
  exerciseSets: ExerciseSet[];
}

import {
  CHAPTER_01_THEORY_MARKDOWN,
  CHAPTER_01_TOPICS,
  CHAPTER_01_EXERCISE_SETS
} from '@/data/chapter01Data';

const CH01_FALLBACK_THEORY: ChapterTheoryData = {
  chapter: {
    id: 'ch01',
    number: 1,
    title: 'The present tense of regular -er verbs',
    slug: 'the-present-tense-of-regular-er-verbs',
    world_number: 1,
    world_name: 'Mundo 1: Les Fondations',
    page_range: '14–30',
    topics_count: 3,
    exercise_groups_count: 10,
    total_questions: 100,
    theory_markdown: CHAPTER_01_THEORY_MARKDOWN,
    release_id: null,
    editorial_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  topics: CHAPTER_01_TOPICS,
  exerciseSets: CHAPTER_01_EXERCISE_SETS
};

export function useTheory(chapterId?: string) {
  return useQuery<ChapterTheoryData | null, Error>({
    queryKey: ['content', 'theory', chapterId],
    queryFn: async () => {
      if (!chapterId) return null;

      if (!supabase) {
        if (chapterId === 'ch01') {
          return CH01_FALLBACK_THEORY;
        }
        return null;
      }

      try {
        // 1. Fetch chapter theory
        const { data: chapterData, error: chapterError } = await supabase
          .from('chapters')
          .select('*')
          .eq('id', chapterId)
          .maybeSingle();

        if (chapterError) {
          console.warn(`[useTheory] Falha ao carregar do Supabase:`, chapterError.message);
          if (chapterId === 'ch01') return CH01_FALLBACK_THEORY;
          throw new Error(`Failed to load chapter theory: ${chapterError.message}`);
        }

        if (!chapterData) {
          if (chapterId === 'ch01') return CH01_FALLBACK_THEORY;
          return null;
        }

        // 2. Fetch chapter topics
        const { data: topicsData, error: topicsError } = await supabase
          .from('topics')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('order_index', { ascending: true });

        if (topicsError) {
          console.warn('Could not load topics:', topicsError.message);
        }

        // 3. Fetch chapter exercise sets
        const { data: exercisesData, error: exercisesError } = await supabase
          .from('exercise_sets')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('order_index', { ascending: true });

        if (exercisesError) {
          console.warn('Could not load exercise sets:', exercisesError.message);
        }

        const loadedSets = (exercisesData || []) as ExerciseSet[];
        const finalSets = loadedSets.length > 0 ? loadedSets : (chapterId === 'ch01' ? CH01_FALLBACK_THEORY.exerciseSets : []);

        return {
          chapter: {
            ...(chapterData as Chapter),
            theory_markdown: chapterId === 'ch01' ? CHAPTER_01_THEORY_MARKDOWN : (chapterData as Chapter).theory_markdown,
          },
          topics: (topicsData && topicsData.length > 0 ? topicsData : (chapterId === 'ch01' ? CH01_FALLBACK_THEORY.topics : [])) as Topic[],
          exerciseSets: finalSets,
        };
      } catch (err) {
        if (chapterId === 'ch01') return CH01_FALLBACK_THEORY;
        throw err;
      }
    },
    enabled: Boolean(chapterId),
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });
}
