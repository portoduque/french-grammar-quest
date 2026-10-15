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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('I study French.');
    expect(data?.questions[0].accepted_answers).toContain("J'étudie le français.");
  });
});
