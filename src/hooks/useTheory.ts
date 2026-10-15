import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Chapter, Topic, ExerciseSet } from '@/types/database';

export interface ChapterTheoryData {
  chapter: Chapter;
  topics: Topic[];
  exerciseSets: ExerciseSet[];
}

const CH01_FALLBACK_THEORY: ChapterTheoryData = {
  chapter: {
    id: 'ch01',
    number: 1,
    title: 'The present tense of regular -er verbs',
    slug: 'present-er-verbs',
    world_number: 1,
    world_name: 'Mundo 1: Les Fondations',
    page_range: '23-39',
    topics_count: 3,
    exercise_groups_count: 10,
    total_questions: 100,
    theory_markdown: `# Chapitre 01 — Le Présent de l'Indicatif des Verbes Réguliers en -ER

> [!TIP]
> ### 👨‍🏫 Astuce du Prof : Les Trois Invariants du Présent en -ER
> 1. **Terminaisons muettes** : À l'oral, les terminaisons \`-e\`, \`-es\` et \`-ent\` sont **totalement silencieuses**. *Je parle*, *tu parles*, *il parle*, *ils parlent* ont exactement la même prononciation **/paʁl/**.
> 2. **Élision obligatoire** : Devant une voyelle ou un *h* muet, **je** devient **j'** (*J'habite*, *J'aime*).
> 3. **Liaison euphonique** : Avec *nous*, *vous*, *ils*, *elles*, le \`-s\` final se lie au verbe débutant par une voyelle avec le son **[z]** (*Ils habitent* -> *[il-z-abit]*).

---

## 1. Formation Régulière

Pour conjuguer un verbe régulier en **-er** au présent, on prend le radical (infinitif sans *-er*) et on ajoute les terminaisons :

| Pronom | Terminaison | Parler | Habiter |
| :--- | :--- | :--- | :--- |
| **Je / J'** | **-e** | Je parle | J'habite |
| **Tu** | **-es** | Tu parles | Tu habites |
| **Il / Elle / On** | **-e** | Il parle | Elle habite |
| **Nous** | **-ons** | Nous parlons | Nous habitons |
| **Vous** | **-ez** | Vous parlez | Vous habitez |
| **Ils / Elles** | **-ent** | Ils parlent | Elles habitent |

---

## 2. Particularités Orthographiques

Certains verbes en **-er** subissent des ajustements orthographiques pour préserver la prononciation :

- **Verbes en -ger** (ex: *manger*, *voyager*) : ajout d'un **e** devant la terminaison *-ons* pour garder le son [ʒ] :
  - *Nous mangeons*, *Nous voyageons*.
- **Verbes en -cer** (ex: *commencer*, *avancer*) : le **c** prend une cédille (**ç**) devant *-ons* pour garder le son [s] :
  - *Nous commençons*, *Nous avançons*.
- **Verbes en -eler / -eter** (ex: *appeler*, *jeter*) : doublent la consonne devant un *e* muet :
  - *J'appelle*, *tu appelles*, *nous appelons*, *ils appellent*.
  - *Je jette*, *tu jettes*, *nous jetons*, *ils jettent*.
- **Verbes avec e / é avant la finale** (ex: *acheter*, *préférer*) : changent en **è** devant syllabe muette :
  - *J'achète*, *tu achètes*, *nous achetons*.
  - *Je préfère*, *tu préfères*, *nous préférons*.

---

## 3. L'Expression du Présent Continu et de la Durée

En français, il n'existe pas de forme verbale progressive comme le présent continu anglais (*I am speaking*). Le présent simple traduit les deux nuances :
- *Je parle français.* = I speak French / I am speaking French.

Pour insister sur une action en cours d'accomplissement, on utilise la locution :
**Être en train de + infinitif**
- *Je suis en train de travailler.* (I am currently working).

Pour exprimer une action commencée dans le passé et qui continue dans le présent :
**Présent + Depuis**
- *J'étudie le français depuis six mois.* (I have been studying French for six months).`,
    release_id: null,
    editorial_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  topics: [
    {
      id: 'ch01-top01',
      chapter_id: 'ch01',
      order_index: 1,
      title: "Formation et terminaisons du présent des verbes en -er",
      rule_summary: "Les terminaisons régulières sont -e, -es, -e, -ons, -ez, -ent.",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-top02',
      chapter_id: 'ch01',
      order_index: 2,
      title: "Particularités orthographiques (-ger, -cer, -eler, -eter)",
      rule_summary: "Modifications euphoniques pour préserver le son d'origine.",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-top03',
      chapter_id: 'ch01',
      order_index: 3,
      title: "Présent continu (être en train de) et durée (depuis)",
      rule_summary: "Être en train de + infinitif pour l'action en cours; depuis pour la durée.",
      created_at: new Date().toISOString()
    }
  ],
  exerciseSets: [
    {
      id: 'ch01-ex01',
      chapter_id: 'ch01',
      order_index: 1,
      title: 'Exercice 1.1',
      instruction: 'Mettre les verbes entre parenthèses au présent.',
      interaction_type: 'fill_blank',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex02',
      chapter_id: 'ch01',
      order_index: 2,
      title: 'Exercice 1.2',
      instruction: 'Traduire en français.',
      interaction_type: 'translation',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex03',
      chapter_id: 'ch01',
      order_index: 3,
      title: 'Exercice 1.3',
      instruction: 'Mettre au présent les verbes entre parenthèses.',
      interaction_type: 'fill_blank',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex04',
      chapter_id: 'ch01',
      order_index: 4,
      title: 'Exercice 1.4',
      instruction: 'Mettre au présent les verbes entre parenthèses.',
      interaction_type: 'fill_blank',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex05',
      chapter_id: 'ch01',
      order_index: 5,
      title: 'Exercice 1.5',
      instruction: 'Mettre au présent les verbes entre parenthèses.',
      interaction_type: 'fill_blank',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex06',
      chapter_id: 'ch01',
      order_index: 6,
      title: 'Exercice 1.6',
      instruction: 'Mettre au présent les verbes entre parenthèses.',
      interaction_type: 'fill_blank',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex07',
      chapter_id: 'ch01',
      order_index: 7,
      title: 'Exercice 1.7',
      instruction: 'Faire correspondre les deux colonnes.',
      interaction_type: 'matching',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex08',
      chapter_id: 'ch01',
      order_index: 8,
      title: 'Exercice 1.8',
      instruction: 'Reformuler les phrases en utilisant être en train de + infinitif.',
      interaction_type: 'sentence_rewrite',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex09',
      chapter_id: 'ch01',
      order_index: 9,
      title: 'Exercice 1.9',
      instruction: 'Répondre aux questions en utilisant le présent et depuis.',
      interaction_type: 'translation',
      questions_count: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'ch01-ex10',
      chapter_id: 'ch01',
      order_index: 10,
      title: 'Exercice 1.10',
      instruction: 'Traduire les phrases suivantes en utilisant vous et l’inversion si nécessaire.',
      interaction_type: 'translation',
      questions_count: 10,
      created_at: new Date().toISOString()
    }
  ]
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
          chapter: chapterData as Chapter,
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
