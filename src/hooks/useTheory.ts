import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Chapter, Topic, ExerciseSet } from '@/types/database';

export interface ChapterTheoryData {
  chapter: Chapter;
  topics: Topic[];
  exerciseSets: ExerciseSet[];
}

export function useTheory(chapterId?: string) {
  return useQuery<ChapterTheoryData | null, Error>({
    queryKey: ['content', 'theory', chapterId],
    queryFn: async () => {
      if (!chapterId || !supabase) return null;

      // 1. Fetch chapter theory
      const { data: chapterData, error: chapterError } = await supabase
        .from('chapters')
        .select('*')
        .eq('id', chapterId)
        .maybeSingle();

      if (chapterError) {
        throw new Error(`Failed to load chapter theory: ${chapterError.message}`);
      }

      if (!chapterData) {
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

      return {
        chapter: chapterData as Chapter,
        topics: (topicsData || []) as Topic[],
        exerciseSets: (exercisesData || []) as ExerciseSet[],
      };
    },
    enabled: Boolean(chapterId),
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });
}
