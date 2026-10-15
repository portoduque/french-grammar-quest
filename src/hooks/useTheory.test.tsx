import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useTheory } from './useTheory';

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

describe('useTheory Hook — Pédagogie FLE du Chapitre 1', () => {
  it('fournit la théorie pédagogique complète et rigoureuse pour ch01', async () => {
    const { result } = renderHook(() => useTheory('ch01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(1);
    expect(data?.chapter.title).toBe('The present tense of regular -er verbs');
    expect(data?.chapter.page_range).toBe('14–30');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Terminações Silenciosas (Muettes)");
    expect(markdown).toContain("Élision Obrigatória com « Je »");
    expect(markdown).toContain("Liaison Sonora");
    expect(markdown).toContain("Guia dos Pronomes Pessoais e o Segredo do Pronome « On »");
    expect(markdown).toContain("Ajustes Ortográficos de Preservação Fonética");
    expect(markdown).toContain("Os 7 Usos Fundamentais do Presente do Indicativo");
    expect(markdown).toContain("Être en train de + Infinitif");
    expect(markdown).toContain("Ação Iniciada no Passado que Continua no Presente : « Depuis »");
    expect(markdown.toLowerCase()).toContain("parler");
    expect(markdown.toLowerCase()).toContain("chanter");
  });

  it('charge les 10 séries d exercices officielles du Chapitre 1 avec les bons types d interaction', async () => {
    const { result } = renderHook(() => useTheory('ch01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(10);

    // Vérifie la séquence pédagogique des moteurs de jeu (fill_blank -> translation -> matching -> rewrite -> ...)
    expect(sets[0].id).toBe('ch01-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');

    expect(sets[1].id).toBe('ch01-ex02');
    expect(sets[1].interaction_type).toBe('translation');

    expect(sets[2].id).toBe('ch01-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');

    expect(sets[6].id).toBe('ch01-ex07');
    expect(sets[6].interaction_type).toBe('matching');

    expect(sets[7].id).toBe('ch01-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');

    expect(sets[8].id).toBe('ch01-ex09');
    expect(sets[8].interaction_type).toBe('sentence_rewrite');

    expect(sets[9].id).toBe('ch01-ex10');
    expect(sets[9].interaction_type).toBe('translation');
  });

  it('fournit les 3 sujets principaux du chapitre', async () => {
    const { result } = renderHook(() => useTheory('ch01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch01-t01');
    expect(topics[1].id).toBe('ch01-t02');
    expect(topics[2].id).toBe('ch01-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch02 (verbes en -ir et -re, inversion, négation)', async () => {
    const { result } = renderHook(() => useTheory('ch02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(2);
    expect(data?.chapter.title).toBe('The present tense of -ir and -re verbs');
    expect(data?.chapter.page_range).toBe('31–45');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Os Dois Tipos de Verbos em -IR");
    expect(markdown).toContain("A Família dos \"Falsos -IR\" Conjugados como -ER");
    expect(markdown).toContain("Verbos em -RE : O 'D' Permanece na 3ª Pessoa");
    expect(markdown).toContain("A Inversão Interrogativa e o Enigmático « -t- » Eufônico");
    expect(markdown).toContain("A Regra de Ouro da Negação « Ni ... Ni ... »");
    expect(markdown).toContain("Quelle langue parlez-vous ?");
    expect(markdown.toLowerCase()).toContain("choisir");
    expect(markdown.toLowerCase()).toContain("vendre");
    expect(markdown.toLowerCase()).toContain("prendre");
  });

  it('charge les 11 séries d exercices officielles du Chapitre 2 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(11);

    // Vérifie les moteurs de jeu spécifiques
    expect(sets[0].id).toBe('ch02-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');

    expect(sets[1].id).toBe('ch02-ex02');
    expect(sets[1].interaction_type).toBe('matching');

    expect(sets[2].id).toBe('ch02-ex03');
    expect(sets[2].interaction_type).toBe('translation');

    expect(sets[3].id).toBe('ch02-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');

    expect(sets[4].id).toBe('ch02-ex05');
    expect(sets[4].interaction_type).toBe('matching');

    expect(sets[5].id).toBe('ch02-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');

    expect(sets[6].id).toBe('ch02-ex07');
    expect(sets[6].interaction_type).toBe('translation');

    expect(sets[7].id).toBe('ch02-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');

    expect(sets[8].id).toBe('ch02-ex09');
    expect(sets[8].interaction_type).toBe('sentence_rewrite');

    expect(sets[9].id).toBe('ch02-ex10');
    expect(sets[9].interaction_type).toBe('sentence_rewrite');

    expect(sets[10].id).toBe('ch02-ex11');
    expect(sets[10].interaction_type).toBe('translation');
  });
});
