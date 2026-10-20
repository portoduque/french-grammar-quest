import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ExerciseSet, Question } from '@/types/database';

import {
  CHAPTER_01_EXERCISE_SETS,
  CHAPTER_01_QUESTIONS_MAP
} from '@/data/chapter01Data';

import {
  CHAPTER_02_EXERCISE_SETS,
  CHAPTER_02_QUESTIONS_MAP
} from '@/data/chapter02Data';

import {
  CHAPTER_03_EXERCISE_SETS,
  CHAPTER_03_QUESTIONS_MAP
} from '@/data/chapter03Data';

import {
  CHAPTER_04_EXERCISE_SETS,
  CHAPTER_04_QUESTIONS_MAP
} from '@/data/chapter04Data';

import {
  CHAPTER_05_EXERCISE_SETS,
  CHAPTER_05_QUESTIONS_MAP
} from '@/data/chapter05Data';

import {
  CHAPTER_06_EXERCISE_SETS,
  CHAPTER_06_QUESTIONS_MAP
} from '@/data/chapter06Data';

import {
  CHAPTER_07_EXERCISE_SETS,
  CHAPTER_07_QUESTIONS_MAP
} from '@/data/chapter07Data';

import {
  CHAPTER_08_EXERCISE_SETS,
  CHAPTER_08_QUESTIONS_MAP
} from '@/data/chapter08Data';

import {
  CHAPTER_09_EXERCISE_SETS,
  CHAPTER_09_QUESTIONS_MAP
} from '@/data/chapter09Data';

import {
  CHAPTER_10_EXERCISE_SETS,
  CHAPTER_10_QUESTIONS_MAP
} from '@/data/chapter10Data';

import {
  CHAPTER_11_EXERCISE_SETS,
  CHAPTER_11_QUESTIONS_MAP
} from '@/data/chapter11Data';

import {
  CHAPTER_12_EXERCISE_SETS,
  CHAPTER_12_QUESTIONS_MAP
} from '@/data/chapter12Data';

import {
  CHAPTER_13_EXERCISE_SETS,
  CHAPTER_13_QUESTIONS_MAP
} from '@/data/chapter13Data';

import {
  CHAPTER_14_EXERCISE_SETS,
  CHAPTER_14_QUESTIONS_MAP
} from '@/data/chapter14Data';

import {
  CHAPTER_15_EXERCISE_SETS,
  CHAPTER_15_QUESTIONS_MAP
} from '@/data/chapter15Data';

import {
  CHAPTER_16_EXERCISE_SETS,
  CHAPTER_16_QUESTIONS_MAP
} from '@/data/chapter16Data';

import {
  CHAPTER_17_EXERCISE_SETS,
  CHAPTER_17_QUESTIONS_MAP
} from '@/data/chapter17Data';

import {
  CHAPTER_18_EXERCISE_SETS,
  CHAPTER_18_QUESTIONS_MAP
} from '@/data/chapter18Data';

import {
  CHAPTER_19_EXERCISE_SETS,
  CHAPTER_19_QUESTIONS_MAP
} from '@/data/chapter19Data';

import {
  CHAPTER_20_EXERCISE_SETS,
  CHAPTER_20_QUESTIONS_MAP
} from '@/data/chapter20Data';

import {
  CHAPTER_21_EXERCISE_SETS,
  CHAPTER_21_QUESTIONS_MAP
} from '@/data/chapter21Data';

import {
  CHAPTER_22_EXERCISE_SETS,
  CHAPTER_22_QUESTIONS_MAP
} from '@/data/chapter22Data';

import {
  CHAPTER_23_EXERCISE_SETS,
  CHAPTER_23_QUESTIONS_MAP
} from '@/data/chapter23Data';

import {
  CHAPTER_24_EXERCISE_SETS,
  CHAPTER_24_QUESTIONS_MAP
} from '@/data/chapter24Data';

import {
  CHAPTER_25_EXERCISE_SETS,
  CHAPTER_25_QUESTIONS_MAP
} from '@/data/chapter25Data';

import {
  CH26_FALLBACK_EXERCISE_SETS,
  CHAPTER_26_QUESTIONS_MAP
} from '@/data/chapter26Data';




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

  if (CHAPTER_02_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_02_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch02',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 2.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_02_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_02_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_03_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_03_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch03',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 3.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_03_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_03_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_04_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_04_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch04',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 4.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_04_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_04_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_05_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_05_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch05',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 5.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_05_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_05_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_06_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_06_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch06',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 6.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_06_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_06_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_07_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_07_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch07',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 7.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_07_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_07_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_08_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_08_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch08',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 8.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_08_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_08_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_09_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_09_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch09',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 9.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_09_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_09_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_10_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_10_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch10',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 10.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_10_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_10_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_11_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_11_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch11',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 11.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_11_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_11_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_12_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_12_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch12',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 12.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'translation',
      questions_count: CHAPTER_12_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_12_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_13_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_13_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch13',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 13.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_13_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_13_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_14_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_14_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch14',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 14.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_14_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_14_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_15_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_15_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch15',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 15.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: 'fill_blank',
      questions_count: CHAPTER_15_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_15_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_16_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_16_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch16',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 16.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice de grammaire française.',
      interaction_type: exerciseSetId.endsWith('ex03') ? 'translation' : 'fill_blank',
      questions_count: CHAPTER_16_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_16_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_17_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_17_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch17',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 17.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur la voix passive.',
      interaction_type: exerciseSetId.endsWith('ex03') ? 'translation' : 'sentence_rewrite',
      questions_count: CHAPTER_17_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_17_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_18_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_18_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch18',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 18.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur le discours indirect et la concordance des temps.',
      interaction_type: exerciseSetId.endsWith('ex04') ? 'translation' : 'sentence_rewrite',
      questions_count: CHAPTER_18_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_18_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_19_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_19_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch19',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 19.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur le mode impératif.',
      interaction_type: exerciseSetId.endsWith('ex03') ? 'translation' : 'sentence_rewrite',
      questions_count: CHAPTER_19_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_19_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_20_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_20_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch20',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 20.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les articles et les noms.',
      interaction_type: exerciseSetId.endsWith('ex07')
        ? 'ordering'
        : exerciseSetId.endsWith('ex09')
        ? 'translation'
        : exerciseSetId.endsWith('ex03') || exerciseSetId.endsWith('ex04')
        ? 'sentence_rewrite'
        : 'fill_blank',
      questions_count: CHAPTER_20_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_20_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_21_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_21_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch21',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 21.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur tous les pronoms.',
      interaction_type: exerciseSetId.endsWith('ex07')
        ? 'matching'
        : exerciseSetId.endsWith('ex12')
        ? 'fill_blank'
        : (exerciseSetId.endsWith('ex02') || exerciseSetId.endsWith('ex04') || exerciseSetId.endsWith('ex09') || exerciseSetId.endsWith('ex11'))
        ? 'translation'
        : 'sentence_rewrite',
      questions_count: CHAPTER_21_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_21_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_22_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_22_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch22',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 22.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les adjectifs et les comparaisons.',
      interaction_type: exerciseSetId.endsWith('ex07')
        ? 'matching'
        : exerciseSetId.endsWith('ex02') || exerciseSetId.endsWith('ex03')
        ? 'fill_blank'
        : exerciseSetId.endsWith('ex05')
        ? 'sentence_rewrite'
        : 'translation',
      questions_count: CHAPTER_22_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_22_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_23_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_23_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch23',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 23.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les démonstratifs et les possessifs.',
      interaction_type: exerciseSetId.endsWith('ex04')
        ? 'matching'
        : (exerciseSetId.endsWith('ex01') || exerciseSetId.endsWith('ex02') || exerciseSetId.endsWith('ex03') || exerciseSetId.endsWith('ex05'))
        ? 'fill_blank'
        : exerciseSetId.endsWith('ex08')
        ? 'sentence_rewrite'
        : 'translation',
      questions_count: CHAPTER_23_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_23_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_24_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_24_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch24',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 24.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les pronoms relatifs.',
      interaction_type: exerciseSetId.endsWith('ex03')
        ? 'matching'
        : (exerciseSetId.endsWith('ex06') || exerciseSetId.endsWith('ex08'))
        ? 'translation'
        : 'fill_blank',
      questions_count: CHAPTER_24_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_24_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_25_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CHAPTER_25_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch25',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 25.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les adverbes et expressions de temps, de fréquence et de lieu.',
      interaction_type: (exerciseSetId.endsWith('ex02') || exerciseSetId.endsWith('ex08'))
        ? 'translation'
        : (exerciseSetId.endsWith('ex04') || exerciseSetId.endsWith('ex05') || exerciseSetId.endsWith('ex06'))
        ? 'sentence_rewrite'
        : 'fill_blank',
      questions_count: CHAPTER_25_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_25_QUESTIONS_MAP[exerciseSetId]
    };
  }

  if (CHAPTER_26_QUESTIONS_MAP[exerciseSetId]) {
    const foundSet = CH26_FALLBACK_EXERCISE_SETS.find(s => s.id === exerciseSetId) || {
      id: exerciseSetId,
      chapter_id: 'ch26',
      order_index: parseInt(exerciseSetId.split('-ex')[1] || '1', 10),
      title: `Exercice 26.${parseInt(exerciseSetId.split('-ex')[1] || '1', 10)}`,
      instruction: 'Exercice sur les nombres cardinaux, ordinaux et les grands nombres.',
      interaction_type: (exerciseSetId.endsWith('ex02') || exerciseSetId.endsWith('ex05'))
        ? 'translation'
        : (exerciseSetId.endsWith('ex04') || exerciseSetId.endsWith('ex06') || exerciseSetId.endsWith('ex07'))
        ? 'sentence_rewrite'
        : 'fill_blank',
      questions_count: CHAPTER_26_QUESTIONS_MAP[exerciseSetId].length,
      created_at: new Date().toISOString()
    };

    return {
      exerciseSet: existingSet || foundSet,
      questions: (existingQuestions && existingQuestions.length > 0)
        ? existingQuestions
        : CHAPTER_26_QUESTIONS_MAP[exerciseSetId]
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
        const fallbackList =
          CHAPTER_01_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_02_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_03_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_04_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_05_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_06_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_07_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_08_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_09_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_10_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_11_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_12_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_13_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_14_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_15_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_16_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_17_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_18_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_19_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_20_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_21_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_22_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_23_QUESTIONS_MAP[exerciseSetId] ||
          CHAPTER_24_QUESTIONS_MAP[exerciseSetId];
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
