import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useExerciseSet } from './useExerciseSet';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useExerciseSet Hook — Séries et Moteurs de Jeu du Chapitre 1', () => {
  it('charge la série 1.1 avec 10 questions de conjugaison fill_blank', async () => {
    const { result } = renderHook(() => useExerciseSet('ch01-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.exerciseSet.id).toBe('ch01-ex01');
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toContain('Lucie');
    expect(data?.questions[0].accepted_answers).toContain('travaille');
    expect(data?.questions[0].explanation).toBeDefined();
  });

  it('charge la série 1.7 (matching) avec les 10 options réelles et complètes (a à j)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch01-ex07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(10);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Il épelle');
    expect(q1?.options).toBeDefined();
    expect(q1?.options).toHaveLength(10);

    // Vérifie les étiquettes et textes réels des colonnes du livre
    const labels = (q1?.options as Array<{ label: string; text: string }>).map((o) => o.label);
    expect(labels).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);

    const optionI = (q1?.options as Array<{ label: string; text: string }>).find((o) => o.label === 'i');
    expect(optionI?.text).toBe('le mot');
    expect(q1?.accepted_answers).toContain('i');
  });

  it('charge la série 1.8 (être en train de) avec 10 questions de type sentence_rewrite', async () => {
    const { result } = renderHook(() => useExerciseSet('ch01-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Nous chantons une chanson.');
    expect(data?.questions[0].accepted_answers).toContain('Nous sommes en train de chanter une chanson.');
    // Vérifie l'élision sur la question 4 (d'effacer)
    expect(data?.questions[3].accepted_answers).toContain("Tu es en train d'effacer le tableau.");
  });

  it('charge la série 1.9 (depuis) et supporte les variantes je/nous légitimes', async () => {
    const { result } = renderHook(() => useExerciseSet('ch01-ex09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.questions).toHaveLength(10);

    // Question 4: adressée à vous -> accepte J'habite ET Nous habitons
    const q4 = data?.questions[3];
    expect(q4?.prompt).toContain('Montpellier');
    expect(q4?.accepted_answers).toContain("J'habite à Montpellier depuis 2022.");
    expect(q4?.accepted_answers).toContain("Nous habitons à Montpellier depuis 2022.");
  });

  it('charge la série 1.10 (traduction avec inversion) avec 10 questions', async () => {
    const { result } = renderHook(() => useExerciseSet('ch01-ex10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('I study French.');
    expect(data?.questions[0].accepted_answers).toContain("J'étudie le français.");
  });

  it('charge la série 2.1 (verbes en -ir) avec 10 questions de type fill_blank', async () => {
    const { result } = renderHook(() => useExerciseSet('ch02-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.id).toBe('ch02-ex01');
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toContain('cueillir');
    expect(data?.questions[0].accepted_answers).toContain('cueillons');
    expect(data?.questions[9].prompt).toContain('mourir');
    expect(data?.questions[9].accepted_answers).toContain('meurt');
  });

  it('charge la série 2.2 (matching -ir) avec prompts propres et 10 options réelles', async () => {
    const { result } = renderHook(() => useExerciseSet('ch02-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(10);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Il agrandit');
    expect(q1?.options).toHaveLength(10);
    expect(q1?.accepted_answers).toContain('h');

    const optionH = (q1?.options as Array<{ label: string; text: string }>).find((o) => o.label === 'h');
    expect(optionH?.text).toBe('la photo');
  });

  it('charge la série 2.5 (matching -re) avec prompts propres et 10 options', async () => {
    const { result } = renderHook(() => useExerciseSet('ch02-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(10);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Le chat mord');
    expect(q1?.accepted_answers).toContain('h');
  });

  it('charge la série 2.8 (inversion) avec le -t- euphonique et les 10 questions', async () => {
    const { result } = renderHook(() => useExerciseSet('ch02-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);

    // Question 4 : Préfère-t-elle avec -t- euphonique
    const q4 = data?.questions[3];
    expect(q4?.prompt).toContain('Elle préfère voyager en Italie.');
    expect(q4?.accepted_answers).toContain('Préfère-t-elle voyager en Italie ?');
  });

  it('charge la série 2.11 (défi synthèse) avec ni... ni... et inversion', async () => {
    const { result } = renderHook(() => useExerciseSet('ch02-ex11'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);

    // Question 3 : She eats neither meat nor cheese -> omission des partitifs
    const q3 = data?.questions[2];
    expect(q3?.prompt).toBe('She eats neither meat nor cheese.');
    expect(q3?.accepted_answers).toContain('Elle ne mange ni viande ni fromage.');

    // Question 6 : They like neither tea nor coffee -> maintien des articles définis
    const q6 = data?.questions[5];
    expect(q6?.prompt).toBe('They like neither tea nor coffee.');
    expect(q6?.accepted_answers).toContain("Ils n'aiment ni le thé ni le café.");
  });

  it('charge la série 3.1 avec 10 questions de conjugaison du verbe être', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.id).toBe('ch03-ex01');
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toContain('Le château');
    expect(data?.questions[0].accepted_answers).toContain('est');
  });

  it('charge la série 3.2 avec 10 questions sentence_rewrite de réponses affirmatives', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe("Est-ce qu'ils sont en retard ?");
    expect(data?.questions[0].accepted_answers).toContain('Oui, ils sont en retard.');
  });

  it('charge la série 3.4 (matching) avec les 10 expressions idiomatiques réelles du livre', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(10);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe("J'ai faim, alors");
    expect(q1?.options).toHaveLength(10);
    expect(q1?.accepted_answers).toContain('g');
  });

  it('charge la série 3.8 (Connaître ou savoir ?)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toContain('pourquoi il est absent');
    expect(data?.questions[0].accepted_answers).toContain('sais');
    expect(data?.questions[3].prompt).toContain('la fille de José');
    expect(data?.questions[3].accepted_answers).toContain('connaissons');
  });

  it('charge la série 3.10 avec les verbes en -oir et défectifs', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[2].prompt).toContain('pleuvoir');
    expect(data?.questions[2].accepted_answers).toContain('pleut');
    expect(data?.questions[4].prompt).toContain('décevoir');
    expect(data?.questions[4].accepted_answers).toContain('déçois');
    expect(data?.questions[7].prompt).toContain('falloir');
    expect(data?.questions[7].accepted_answers).toContain('faut');
  });

  it('charge la série 3.11 avec la traduction intégrative', async () => {
    const { result } = renderHook(() => useExerciseSet('ch03-ex11'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Can you swim?');
    expect(data?.questions[0].accepted_answers).toContain('Est-ce que tu sais nager ?');
    expect(data?.questions[4].prompt).toBe('She knows Caroline.');
    expect(data?.questions[4].accepted_answers).toContain('Elle connaît Caroline.');
  });
});
