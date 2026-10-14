import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { CHAPTERS_SUMMARY, ChapterSummary } from '@/data/chaptersSummary';
import { Chapter } from '@/types/database';

export interface WorldDefinition {
  worldNumber: number;
  worldName: string;
  description: string;
  badge: string;
  chaptersRange: [number, number];
}

export const WORLDS_CONFIG: WorldDefinition[] = [
  {
    worldNumber: 1,
    worldName: 'Mundo 1: Les Fondations',
    description: 'Le présent des verbes en -er, -ir, -re, Être, Avoir et verbes pronominaux',
    badge: '🏰',
    chaptersRange: [1, 6],
  },
  {
    worldNumber: 2,
    worldName: 'Mundo 2: Les Temps du Passé',
    description: 'Passé composé, Imparfait, Plus-que-parfait et Futur simple',
    badge: '⏳',
    chaptersRange: [7, 12],
  },
  {
    worldNumber: 3,
    worldName: 'Mundo 3: L’Espace et les Pronoms',
    description: 'Subjonctif, Infinitif, Participe présent, Passé simple et Voix passive',
    badge: '🧭',
    chaptersRange: [13, 18],
  },
  {
    worldNumber: 4,
    worldName: 'Mundo 4: Les Nuances et le Virtuel',
    description: 'Impératif, Articles, Pronoms compléments, Adjectifs et Relatifs',
    badge: '🔮',
    chaptersRange: [19, 24],
  },
  {
    worldNumber: 5,
    worldName: 'Mundo 5: Le Sommet de la Maîtrise',
    description: 'Adverbes, Nombres, Pot-pourri et Révision Finale des 28 chapitres',
    badge: '👑',
    chaptersRange: [25, 28],
  },
];

export interface EnrichedChapterItem {
  id: string;
  number: number;
  title: string;
  slug: string;
  worldNumber: number;
  worldName: string;
  pageRange: string;
  topicsCount: number;
  exerciseGroupsCount: number;
  totalQuestions: number;
  editorialStatus: string;
}

export function getWorldForChapter(chapterNumber: number): { worldNumber: number; worldName: string } {
  const world = WORLDS_CONFIG.find(
    (w) => chapterNumber >= w.chaptersRange[0] && chapterNumber <= w.chaptersRange[1]
  );
  return world
    ? { worldNumber: world.worldNumber, worldName: world.worldName }
    : { worldNumber: 1, worldName: 'Mundo 1: Les Fondations' };
}

/**
 * Builds the fallback catalog from static summary
 */
function getFallbackCatalog(): EnrichedChapterItem[] {
  return CHAPTERS_SUMMARY.map((ch: ChapterSummary) => {
    const world = getWorldForChapter(ch.number);
    return {
      id: ch.id,
      number: ch.number,
      title: ch.title,
      slug: ch.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      worldNumber: world.worldNumber,
      worldName: world.worldName,
      pageRange: ch.pageRange,
      topicsCount: ch.topicsCount,
      exerciseGroupsCount: ch.exerciseGroups,
      totalQuestions: ch.exerciseGroups * 10,
      editorialStatus: 'published',
    };
  });
}

export function useCatalog() {
  const query = useQuery<EnrichedChapterItem[], Error>({
    queryKey: ['content', 'catalog'],
    queryFn: async () => {
      try {
        if (!supabase) {
          return getFallbackCatalog();
        }

        const { data, error } = await supabase
          .from('chapters')
          .select('id, number, title, slug, world_number, world_name, page_range, topics_count, exercise_groups_count, total_questions, editorial_status')
          .order('number', { ascending: true });

        if (error || !data || data.length === 0) {
          // Graceful fallback to static metadata
          return getFallbackCatalog();
        }

        return (data as Chapter[]).map((row) => ({
          id: row.id,
          number: row.number,
          title: row.title,
          slug: row.slug,
          worldNumber: row.world_number,
          worldName: row.world_name,
          pageRange: row.page_range,
          topicsCount: row.topics_count,
          exerciseGroupsCount: row.exercise_groups_count,
          totalQuestions: row.total_questions,
          editorialStatus: row.editorial_status,
        }));
      } catch {
        return getFallbackCatalog();
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutes cache
  });

  const chapters = query.data ?? getFallbackCatalog();

  const chaptersByWorld = WORLDS_CONFIG.map((world) => ({
    ...world,
    chapters: chapters.filter((c) => c.worldNumber === world.worldNumber),
  }));

  return {
    ...query,
    chapters,
    chaptersByWorld,
  };
}
