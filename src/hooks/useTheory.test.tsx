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

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

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

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

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

  it('fournit la théorie pédagogique complète et rigoureuse pour ch03 (être, avoir, expressions idiomatiques, verbes en -oir)', async () => {
    const { result } = renderHook(() => useTheory('ch03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(3);
    expect(data?.chapter.title).toBe('To be and to have');
    expect(data?.chapter.page_range).toBe('46–59');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("O Grande Duelo: Être vs Avoir nos Estados Físicos e Idade");
    expect(markdown).toContain("A Fronteira Sonora Crucial: « Ils ont » [il-z-ɔ̃] vs « Ils sont » [il-s-ɔ̃]");
    expect(markdown).toContain("A Queda dos Artigos na Negação com Avoir");
    expect(markdown).toContain("Savoir vs Connaître : A Regra de Ouro Sintática");
    expect(markdown).toContain("A Inversão Formal de Pouvoir: « Puis-je »");
    expect(markdown).toContain("Verbos Defectivos Impessoais: Falloir e Pleuvoir");
    expect(markdown).toContain("beau / bel");
    expect(markdown).toContain("belle");
    expect(markdown).toContain("nouveau / nouvel");
    expect(markdown).toContain("nouvelle");
    expect(markdown).toContain("vieux / vieil");
    expect(markdown).toContain("vieille");
    expect(markdown.toLowerCase()).toContain("avoir faim");
    expect(markdown.toLowerCase()).toContain("avoir mal à");
    expect(markdown.toLowerCase()).toContain("avoir du mal à");
  });

  it('charge les 11 séries d exercices officielles du Chapitre 3 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(11);

    // 3.1: Être au présent -> fill_blank
    expect(sets[0].id).toBe('ch03-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');

    // 3.2: Réponses affirmatives -> sentence_rewrite
    expect(sets[1].id).toBe('ch03-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');

    // 3.3: Avoir au présent -> fill_blank
    expect(sets[2].id).toBe('ch03-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');

    // 3.4: Correspondance colonnes (expressions avoir) -> matching
    expect(sets[3].id).toBe('ch03-ex04');
    expect(sets[3].interaction_type).toBe('matching');

    // 3.5: Traduction avec vous et inversion -> translation
    expect(sets[4].id).toBe('ch03-ex05');
    expect(sets[4].interaction_type).toBe('translation');

    // 3.6: Savoir au présent -> fill_blank
    expect(sets[5].id).toBe('ch03-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');

    // 3.7: Connaître au présent -> fill_blank
    expect(sets[6].id).toBe('ch03-ex07');
    expect(sets[6].interaction_type).toBe('fill_blank');

    // 3.8: Connaître ou savoir ? -> fill_blank
    expect(sets[7].id).toBe('ch03-ex08');
    expect(sets[7].interaction_type).toBe('fill_blank');

    // 3.9: Pouvoir et vouloir -> fill_blank
    expect(sets[8].id).toBe('ch03-ex09');
    expect(sets[8].interaction_type).toBe('fill_blank');

    // 3.10: Autres verbes en -oir & défectifs -> fill_blank
    expect(sets[9].id).toBe('ch03-ex10');
    expect(sets[9].interaction_type).toBe('fill_blank');

    // 3.11: Traduction intégrative avec tu et est-ce que -> translation
    expect(sets[10].id).toBe('ch03-ex11');
    expect(sets[10].interaction_type).toBe('translation');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch04 (aller, futur proche, venir, passé récent, tenir, faire, causatif)', async () => {
    const { result } = renderHook(() => useTheory('ch04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(4);
    expect(data?.chapter.title).toBe('More irregular verbs');
    expect(data?.chapter.page_range).toBe('60–72');
    expect(data?.chapter.total_questions).toBe(85);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("A Família do « Aller » e a Contração Preposicional Obrigatória");
    expect(markdown).toContain("O « Futur Proche » (Futur Immédiat)");
    expect(markdown).toContain("O « Passé Récent » (Passé Immédiat)");
    expect(markdown).toContain("O Verbo VENIR e seus Derivados");
    expect(markdown).toContain("O Verbo TENIR e sua Riqueza Polissêmica");
    expect(markdown).toContain("O Verbo FAIRE : Pronúncia [fəzɔ̃]");
    expect(markdown).toContain("A Forma Causativa (« Faire Causatif »)");
    expect(markdown).toContain("Les 7 Jours de la Semaine");
    expect(markdown).toContain("Les 12 Mois de l'Année");
    expect(markdown).toContain("Les 4 Saisons");
    expect(markdown).toContain("Tenir à");
    expect(markdown).toContain("Tenir de");
    expect(markdown.toLowerCase()).toContain("faire les courses");
    expect(markdown.toLowerCase()).toContain("il pleut");
    expect(markdown.toLowerCase()).toContain("nous faisons");
    expect(markdown.toLowerCase()).toContain("vous faites");
  });

  it('charge les 9 séries d exercices officielles du Chapitre 4 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(9);

    // 4.1: Aller au présent -> fill_blank (10 questions)
    expect(sets[0].id).toBe('ch04-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 4.2: Futur immédiat -> sentence_rewrite (10 questions)
    expect(sets[1].id).toBe('ch04-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');
    expect(sets[1].questions_count).toBe(10);

    // 4.3: Venir et ses dérivés -> fill_blank (10 questions)
    expect(sets[2].id).toBe('ch04-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 4.4: Passé immédiat -> sentence_rewrite (10 questions)
    expect(sets[3].id).toBe('ch04-ex04');
    expect(sets[3].interaction_type).toBe('sentence_rewrite');
    expect(sets[3].questions_count).toBe(10);

    // 4.5: Traduction avec tu et inversion -> translation (10 questions)
    expect(sets[4].id).toBe('ch04-ex05');
    expect(sets[4].interaction_type).toBe('translation');
    expect(sets[4].questions_count).toBe(10);

    // 4.6: Tenir matching -> matching (5 questions)
    expect(sets[5].id).toBe('ch04-ex06');
    expect(sets[5].interaction_type).toBe('matching');
    expect(sets[5].questions_count).toBe(5);

    // 4.7: Faire au présent -> fill_blank (10 questions)
    expect(sets[6].id).toBe('ch04-ex07');
    expect(sets[6].interaction_type).toBe('fill_blank');
    expect(sets[6].questions_count).toBe(10);

    // 4.8: Forme causative -> sentence_rewrite (10 questions)
    expect(sets[7].id).toBe('ch04-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');
    expect(sets[7].questions_count).toBe(10);

    // 4.9: Traduction avec vous et est-ce que -> translation (10 questions)
    expect(sets[8].id).toBe('ch04-ex09');
    expect(sets[8].interaction_type).toBe('translation');
    expect(sets[8].questions_count).toBe(10);
  });

  it('fournit les 7 sujets principaux du chapitre 4', async () => {
    const { result } = renderHook(() => useTheory('ch04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(7);
    expect(topics[0].id).toBe('ch04-t01');
    expect(topics[1].id).toBe('ch04-t02');
    expect(topics[2].id).toBe('ch04-t03');
    expect(topics[3].id).toBe('ch04-t04');
    expect(topics[4].id).toBe('ch04-t05');
    expect(topics[5].id).toBe('ch04-t06');
    expect(topics[6].id).toBe('ch04-t07');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch05 (devoir, il y a, il s’agit de, -eindre/-aindre)', async () => {
    const { result } = renderHook(() => useTheory('ch05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(5);
    expect(data?.chapter.title).toBe('Devoir and its many facets');
    expect(data?.chapter.page_range).toBe('73–80');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Morphologie et Phonétique");
    expect(markdown).toContain("Les 4 Visages Sémantiques de « Devoir »");
    expect(markdown).toContain("Faux-Ami Négatif");
    expect(markdown).toContain("Le Vocabulaire des Transports et Déplacements");
    expect(markdown).toContain("L'Expression Impersonnelle « Il y a »");
    expect(markdown).toContain("La Formule Impersonnelle « Il s'agit de »");
    expect(markdown).toContain("Les Verbes en « -eindre » et « -aindre »");
    expect(markdown).toContain("L'Apparition du « GN »");
  });

  it('charge les 5 séries d exercices officielles du Chapitre 5 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(5);

    // 5.1: Conjugaison de devoir -> fill_blank (10 questions)
    expect(sets[0].id).toBe('ch05-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 5.2: Traduction active -> translation (10 questions)
    expect(sets[1].id).toBe('ch05-ex02');
    expect(sets[1].interaction_type).toBe('translation');
    expect(sets[1].questions_count).toBe(10);

    // 5.3: Nuances sémantiques matching -> matching (5 questions)
    expect(sets[2].id).toBe('ch05-ex03');
    expect(sets[2].interaction_type).toBe('matching');
    expect(sets[2].questions_count).toBe(5);

    // 5.4: Verbes en -eindre/-aindre -> fill_blank (10 questions)
    expect(sets[3].id).toBe('ch05-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');
    expect(sets[3].questions_count).toBe(10);

    // 5.5: Thème intégratif -> translation (10 questions)
    expect(sets[4].id).toBe('ch05-ex05');
    expect(sets[4].interaction_type).toBe('translation');
    expect(sets[4].questions_count).toBe(10);
  });

  it('fournit les 4 sujets principaux du chapitre 5', async () => {
    const { result } = renderHook(() => useTheory('ch05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(4);
    expect(topics[0].id).toBe('ch05-t01');
    expect(topics[1].id).toBe('ch05-t02');
    expect(topics[2].id).toBe('ch05-t03');
    expect(topics[3].id).toBe('ch05-t04');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch06 (verbes pronominaux)', async () => {
    const { result } = renderHook(() => useTheory('ch06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(6);
    expect(data?.chapter.title).toBe('Pronominal verbs');
    expect(data?.chapter.page_range).toBe('81–88');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Tableau de Conjugaison au Présent de l'Indicatif");
    expect(markdown).toContain("Les Verbes Réfléchis");
    expect(markdown).toContain("Les Verbes Réciproques");
    expect(markdown).toContain("Les Verbes Pronominaux Passifs");
    expect(markdown).toContain("Les Verbes Subjectifs ou Essentiellement Pronominaux");
    expect(markdown).toContain("L'Impératif des Verbes Pronominaux");
    expect(markdown).toContain("Les Pronominaux à l'Infinitif : La Règle d'Or de l'Accord");
    expect(markdown).toContain("Vocabulaire du Corps Humain et des Soins");
  });

  it('charge les 6 séries d exercices officielles du Chapitre 6 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(6);

    // 6.1: Verbes réfléchis -> fill_blank (10 questions)
    expect(sets[0].id).toBe('ch06-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 6.2: Verbes réciproques -> fill_blank (10 questions)
    expect(sets[1].id).toBe('ch06-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 6.3: Verbes subjectifs -> fill_blank (10 questions)
    expect(sets[2].id).toBe('ch06-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 6.4: Accord à l'infinitif -> fill_blank (10 questions)
    expect(sets[3].id).toBe('ch06-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');
    expect(sets[3].questions_count).toBe(10);

    // 6.5: Matching réciproque/subjectif -> matching (5 questions)
    expect(sets[4].id).toBe('ch06-ex05');
    expect(sets[4].interaction_type).toBe('matching');
    expect(sets[4].questions_count).toBe(5);

    // 6.6: Traduction active avec tu et inversion -> translation (10 questions)
    expect(sets[5].id).toBe('ch06-ex06');
    expect(sets[5].interaction_type).toBe('translation');
    expect(sets[5].questions_count).toBe(10);
  });

  it('fournit les 5 sujets principaux du chapitre 6', async () => {
    const { result } = renderHook(() => useTheory('ch06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(5);
    expect(topics[0].id).toBe('ch06-t01');
    expect(topics[1].id).toBe('ch06-t02');
    expect(topics[2].id).toBe('ch06-t03');
    expect(topics[3].id).toBe('ch06-t04');
    expect(topics[4].id).toBe('ch06-t05');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch07 (passé composé, être vs avoir, accords, double auxiliaire, pronominaux)', async () => {
    const { result } = renderHook(() => useTheory('ch07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(7);
    expect(data?.chapter.title).toBe('The passé composé');
    expect(data?.chapter.page_range).toBe('89–102');
    expect(data?.chapter.total_questions).toBe(90);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("La Formation Régulière du Participe Passé");
    expect(markdown).toContain("Le Participe Passé avec AVOIR et l'Accord du C.O.D.");
    expect(markdown).toContain("Les Participes Passés Irréguliers par Familles");
    expect(markdown).toContain("Le Passé Composé avec ÊTRE (La Maison d'Être)");
    expect(markdown).toContain("Les Verbes à Double Auxiliaire");
    expect(markdown).toContain("Les Verbes Pronominaux au Passé Composé");
  });

  it('charge les 10 séries d exercices officielles du Chapitre 7 avec les moteurs de jeu calibrés (90 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(10);

    // 7.1: Réguliers en -er avec avoir -> fill_blank (10)
    expect(sets[0].id).toBe('ch07-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 7.2: Réguliers en -ir et -re avec avoir -> fill_blank (10)
    expect(sets[1].id).toBe('ch07-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 7.3: Traduction active avec avoir -> translation (10)
    expect(sets[2].id).toBe('ch07-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // 7.4: Participes passés irréguliers fréquents -> fill_blank (10)
    expect(sets[3].id).toBe('ch07-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');
    expect(sets[3].questions_count).toBe(10);

    // 7.5: Association logique verbe et complément -> matching (5)
    expect(sets[4].id).toBe('ch07-ex05');
    expect(sets[4].interaction_type).toBe('matching');
    expect(sets[4].questions_count).toBe(5);

    // 7.6: Passé composé avec être et inversion -> fill_blank (10)
    expect(sets[5].id).toBe('ch07-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');
    expect(sets[5].questions_count).toBe(10);

    // 7.7: Traduction active avoir ou être -> translation (10)
    expect(sets[6].id).toBe('ch07-ex07');
    expect(sets[6].interaction_type).toBe('translation');
    expect(sets[6].questions_count).toBe(10);

    // 7.8: Verbes pronominaux au passé composé -> fill_blank (10)
    expect(sets[7].id).toBe('ch07-ex08');
    expect(sets[7].interaction_type).toBe('fill_blank');
    expect(sets[7].questions_count).toBe(10);

    // 7.9: Verbes à double auxiliaire -> matching (5)
    expect(sets[8].id).toBe('ch07-ex09');
    expect(sets[8].interaction_type).toBe('matching');
    expect(sets[8].questions_count).toBe(5);

    // 7.10: Traduction de synthèse -> translation (10)
    expect(sets[9].id).toBe('ch07-ex10');
    expect(sets[9].interaction_type).toBe('translation');
    expect(sets[9].questions_count).toBe(10);
  });

  it('fournit les 6 sujets principaux du chapitre 7', async () => {
    const { result } = renderHook(() => useTheory('ch07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(6);
    expect(topics[0].id).toBe('ch07-t01');
    expect(topics[1].id).toBe('ch07-t02');
    expect(topics[2].id).toBe('ch07-t03');
    expect(topics[3].id).toBe('ch07-t04');
    expect(topics[4].id).toBe('ch07-t05');
    expect(topics[5].id).toBe('ch07-t06');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch08 (imparfait, radical de nous, valeurs d\'emploi, si on, duel imparfait vs passé composé)', async () => {
    const { result } = renderHook(() => useTheory('ch08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(8);
    expect(data?.chapter.title).toBe('The imparfait');
    expect(data?.chapter.page_range).toBe('103–112');
    expect(data?.chapter.total_questions).toBe(70);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Formation Régulière de l'Imparfait");
    expect(markdown).toContain("Les Trois Grandes Valeurs de l'Imparfait");
    expect(markdown).toContain("Le Grand Duel : Imparfait vs Passé Composé");
    expect(markdown).toContain("Constructions Spéciales avec l'Imparfait");
  });

  it('charge les 7 séries d exercices officielles du Chapitre 8 avec les moteurs de jeu calibrés (70 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(7);

    // 8.1: Conjugaison régulière -> fill_blank (10)
    expect(sets[0].id).toBe('ch08-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 8.2: Description et états d'esprit -> fill_blank (10)
    expect(sets[1].id).toBe('ch08-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 8.3: Habitude et répétition -> fill_blank (10)
    expect(sets[2].id).toBe('ch08-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 8.4: Action continue interrompue -> fill_blank (10)
    expect(sets[3].id).toBe('ch08-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');
    expect(sets[3].questions_count).toBe(10);

    // 8.5: Traduction active -> translation (10)
    expect(sets[4].id).toBe('ch08-ex05');
    expect(sets[4].interaction_type).toBe('translation');
    expect(sets[4].questions_count).toBe(10);

    // 8.6: Suggestions avec Si on -> fill_blank (10)
    expect(sets[5].id).toBe('ch08-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');
    expect(sets[5].questions_count).toBe(10);

    // 8.7: Passé composé ou imparfait -> fill_blank (10)
    expect(sets[6].id).toBe('ch08-ex07');
    expect(sets[6].interaction_type).toBe('fill_blank');
    expect(sets[6].questions_count).toBe(10);
  });

  it('fournit les 3 sujets principaux du chapitre 8', async () => {
    const { result } = renderHook(() => useTheory('ch08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch08-t01');
    expect(topics[1].id).toBe('ch08-t02');
    expect(topics[2].id).toBe('ch08-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch09', async () => {
    const { result } = renderHook(() => useTheory('ch09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(9);
    expect(data?.chapter.title).toBe('The futur simple and the futur antérieur');
    expect(data?.chapter.page_range).toBe('113–125');
    expect(data?.chapter.world_number).toBe(2);

    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain('O Segredo Histórico das Terminações : O Presente de AVOIR');
    expect(markdown).toContain('As Orações Temporais (« Quand / Dès que »)');
    expect(markdown).toContain('O Clube do Duplo « R »');
    expect(markdown).toContain('Futur Antérieur : Ação Concluída no Futuro');
    expect(markdown).toContain('A Proibição Absoluta do « Si » Condicional');
    expect(markdown).toContain('passer un examen');
  });

  it('charge les 8 séries d exercices officielles du Chapitre 9 avec les bons types d interaction', async () => {
    const { result } = renderHook(() => useTheory('ch09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(8);

    // 9.1: Conjugaison régulière -> fill_blank (10)
    expect(sets[0].id).toBe('ch09-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 9.2: Radicaux irréguliers -> fill_blank (10)
    expect(sets[1].id).toBe('ch09-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 9.3: Phrases composées temporelles -> fill_blank (10)
    expect(sets[2].id).toBe('ch09-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 9.4: Du futur immédiat au futur simple -> sentence_rewrite (10)
    expect(sets[3].id).toBe('ch09-ex04');
    expect(sets[3].interaction_type).toBe('sentence_rewrite');
    expect(sets[3].questions_count).toBe(10);

    // 9.5: Correspondance colonnes -> matching (5)
    expect(sets[4].id).toBe('ch09-ex05');
    expect(sets[4].interaction_type).toBe('matching');
    expect(sets[4].questions_count).toBe(5);

    // 9.6: Futur antérieur -> fill_blank (10)
    expect(sets[5].id).toBe('ch09-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');
    expect(sets[5].questions_count).toBe(10);

    // 9.7: Traduction active -> translation (10)
    expect(sets[6].id).toBe('ch09-ex07');
    expect(sets[6].interaction_type).toBe('translation');
    expect(sets[6].questions_count).toBe(10);

    // 9.8: Conjonctions de l indicatif -> fill_blank (10)
    expect(sets[7].id).toBe('ch09-ex08');
    expect(sets[7].interaction_type).toBe('fill_blank');
    expect(sets[7].questions_count).toBe(10);
  });

  it('fournit les 3 sujets principaux du chapitre 9', async () => {
    const { result } = renderHook(() => useTheory('ch09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch09-t01');
    expect(topics[1].id).toBe('ch09-t02');
    expect(topics[2].id).toBe('ch09-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch10 (le plus-que-parfait)', async () => {
    const { result } = renderHook(() => useTheory('ch10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(10);
    expect(data?.chapter.title).toBe('The plus-que-parfait');
    expect(data?.chapter.page_range).toBe('126–133');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Antériorité");
    expect(markdown).toContain("Auxiliaires");
    expect(markdown).toContain("Maison d'Être");
    expect(markdown).toContain("Accord");
    expect(markdown).toContain("S'écrire");
    expect(markdown).toContain("Si seulement");
    expect(markdown).toContain("pharmacie");
  });

  it('charge les 6 séries d exercices officielles du Chapitre 10 avec les bons types d interaction', async () => {
    const { result } = renderHook(() => useTheory('ch10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(6);

    // 10.1: Conjugaison régulière -> fill_blank (10)
    expect(sets[0].id).toBe('ch10-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 10.2: Verbes pronominaux et accords -> fill_blank (10)
    expect(sets[1].id).toBe('ch10-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 10.3: Antériorité dans les phrases complexes -> fill_blank (10)
    expect(sets[2].id).toBe('ch10-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 10.4: Cause et conséquence -> matching (5)
    expect(sets[3].id).toBe('ch10-ex04');
    expect(sets[3].interaction_type).toBe('matching');
    expect(sets[3].questions_count).toBe(5);

    // 10.5: Si seulement -> sentence_rewrite (10)
    expect(sets[4].id).toBe('ch10-ex05');
    expect(sets[4].interaction_type).toBe('sentence_rewrite');
    expect(sets[4].questions_count).toBe(10);

    // 10.6: Traduction active -> translation (10)
    expect(sets[5].id).toBe('ch10-ex06');
    expect(sets[5].interaction_type).toBe('translation');
    expect(sets[5].questions_count).toBe(10);

    // Total questions check
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(55);
  });

  it('fournit les 3 sujets principaux du chapitre 10', async () => {
    const { result } = renderHook(() => useTheory('ch10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch10-t01');
    expect(topics[1].id).toBe('ch10-t02');
    expect(topics[2].id).toBe('ch10-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch11 (Conditionnel présent et passé)', async () => {
    const { result } = renderHook(() => useTheory('ch11'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(11);
    expect(data?.chapter.title).toBe('The present conditional and the past conditional');
    expect(data?.chapter.page_range).toBe('134–147');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Les SI n'aiment pas les -RAIS !");
    expect(markdown).toContain("Je ferai");
    expect(markdown).toContain("Formules de Politesse et Inversion");
    expect(markdown).toContain("Conditionnel Journalistique");
    expect(markdown).toContain("Au cas où");
    expect(markdown).toContain("Le Règne Animal");
    expect(markdown.toLowerCase()).toContain("grenouille");
    expect(markdown.toLowerCase()).toContain("rhinocéros");
  });

  it('charge les 10 séries d exercices officielles du Chapitre 11 avec les bons moteurs de jeu (90 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch11'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(10);

    // 11.1: Conditionnel Présent (Conjugaisons régulières et irrégulières) -> fill_blank (10)
    expect(sets[0].id).toBe('ch11-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 11.2: Conditionnel Passé -> fill_blank (10)
    expect(sets[1].id).toBe('ch11-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 11.3: Si + Imparfait -> sentence_rewrite (10)
    expect(sets[2].id).toBe('ch11-ex03');
    expect(sets[2].interaction_type).toBe('sentence_rewrite');
    expect(sets[2].questions_count).toBe(10);

    // 11.4: Si + Plus-que-parfait -> sentence_rewrite (10)
    expect(sets[3].id).toBe('ch11-ex04');
    expect(sets[3].interaction_type).toBe('sentence_rewrite');
    expect(sets[3].questions_count).toBe(10);

    // 11.5: Traduction active -> translation (10)
    expect(sets[4].id).toBe('ch11-ex05');
    expect(sets[4].interaction_type).toBe('translation');
    expect(sets[4].questions_count).toBe(10);

    // 11.6: Matching Si + Imparfait -> matching (5)
    expect(sets[5].id).toBe('ch11-ex06');
    expect(sets[5].interaction_type).toBe('matching');
    expect(sets[5].questions_count).toBe(5);

    // 11.7: Réécriture Si + Imparfait -> sentence_rewrite (10)
    expect(sets[6].id).toBe('ch11-ex07');
    expect(sets[6].interaction_type).toBe('sentence_rewrite');
    expect(sets[6].questions_count).toBe(10);

    // 11.8: Réécriture Si + Plus-que-parfait -> sentence_rewrite (10)
    expect(sets[7].id).toBe('ch11-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');
    expect(sets[7].questions_count).toBe(10);

    // 11.9: Traduction journalistique et avancée -> translation (10)
    expect(sets[8].id).toBe('ch11-ex09');
    expect(sets[8].interaction_type).toBe('translation');
    expect(sets[8].questions_count).toBe(10);

    // 11.10: Matching Si + Plus-que-parfait -> matching (5)
    expect(sets[9].id).toBe('ch11-ex10');
    expect(sets[9].interaction_type).toBe('matching');
    expect(sets[9].questions_count).toBe(5);

    // Total questions check
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(90);
  });

  it('fournit les 4 sujets principaux du chapitre 11', async () => {
    const { result } = renderHook(() => useTheory('ch11'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(4);
    expect(topics[0].id).toBe('ch11-t01');
    expect(topics[1].id).toBe('ch11-t02');
    expect(topics[2].id).toBe('ch11-t03');
    expect(topics[3].id).toBe('ch11-t04');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch12 (Could, should, would?)', async () => {
    const { result } = renderHook(() => useTheory('ch12'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(12);
    expect(data?.chapter.title).toBe('Could, should, would?');
    expect(data?.chapter.page_range).toBe('148–157');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Desvendando o « COULD » com o verbo POUVOIR");
    expect(markdown).toContain("Desvendando o « SHOULD » com o verbo DEVOIR");
    expect(markdown).toContain("Comment traduire « Would » en français ?");
    expect(markdown).toContain("Vocabulaire Thématique : Les Instruments de Musique");
    expect(markdown.toLowerCase()).toContain("jouer du piano");
    expect(markdown.toLowerCase()).toContain("jouer de la guitare");
  });

  it('charge les 6 séries d exercices officielles du Chapitre 12 avec 55 questions au total', async () => {
    const { result } = renderHook(() => useTheory('ch12'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(6);

    // 12.1: Could -> translation (10)
    expect(sets[0].id).toBe('ch12-ex01');
    expect(sets[0].interaction_type).toBe('translation');
    expect(sets[0].questions_count).toBe(10);

    // 12.2: Should -> translation (10)
    expect(sets[1].id).toBe('ch12-ex02');
    expect(sets[1].interaction_type).toBe('translation');
    expect(sets[1].questions_count).toBe(10);

    // 12.3: Would (past habit & refusal) -> translation (10)
    expect(sets[2].id).toBe('ch12-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // 12.4: Mixed Modal Review -> translation (10)
    expect(sets[3].id).toBe('ch12-ex04');
    expect(sets[3].interaction_type).toBe('translation');
    expect(sets[3].questions_count).toBe(10);

    // 12.5: Musical Instruments & Jouer de -> translation (10)
    expect(sets[4].id).toBe('ch12-ex05');
    expect(sets[4].interaction_type).toBe('translation');
    expect(sets[4].questions_count).toBe(10);

    // 12.6: Modal Clauses Matching -> matching (5)
    expect(sets[5].id).toBe('ch12-ex06');
    expect(sets[5].interaction_type).toBe('matching');
    expect(sets[5].questions_count).toBe(5);

    // Total questions check (55 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(55);
  });

  it('fournit les 3 sujets principaux du chapitre 12', async () => {
    const { result } = renderHook(() => useTheory('ch12'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch12-t01');
    expect(topics[1].id).toBe('ch12-t02');
    expect(topics[2].id).toBe('ch12-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch13 (The present and past subjunctive)', async () => {
    const { result } = renderHook(() => useTheory('ch13'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(13);
    expect(data?.chapter.title).toBe('The present subjunctive and the past subjunctive');
    expect(data?.chapter.page_range).toBe('158–172');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Formation du Présent du Subjonctif");
    expect(markdown).toContain("Les Verbes Totalement Irréguliers");
    expect(markdown).toContain("Expressions Impersonnelles : Indicatif vs Subjonctif");
    expect(markdown).toContain("L'Expression « Pourvu que » et les Superlatifs");
    expect(markdown).toContain("Le Passé du Subjonctif");
    expect(markdown).toContain("L'Informatique et le Monde Numérique");
    expect(markdown.toLowerCase()).toContain("ordinateur");
    expect(markdown.toLowerCase()).toContain("logiciel");
  });

  it('charge les 9 séries d exercices officielles du Chapitre 13 avec les bons types d interaction (85 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch13'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(9);

    // 13.1: Verbes de volonté, émotion et doute -> fill_blank (10)
    expect(sets[0].id).toBe('ch13-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 13.2: Expressions impersonnelles -> fill_blank (10)
    expect(sets[1].id).toBe('ch13-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 13.3: Conjonctions de subordination -> fill_blank (10)
    expect(sets[2].id).toBe('ch13-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 13.4: Duel Indicatif ou Subjonctif -> fill_blank (10)
    expect(sets[3].id).toBe('ch13-ex04');
    expect(sets[3].interaction_type).toBe('fill_blank');
    expect(sets[3].questions_count).toBe(10);

    // 13.5: Subordonnées complexes et nuances -> fill_blank (10)
    expect(sets[4].id).toBe('ch13-ex05');
    expect(sets[4].interaction_type).toBe('fill_blank');
    expect(sets[4].questions_count).toBe(10);

    // 13.6: Traduction active -> translation (10)
    expect(sets[5].id).toBe('ch13-ex06');
    expect(sets[5].interaction_type).toBe('translation');
    expect(sets[5].questions_count).toBe(10);

    // 13.7: Conjugaison au passé du subjonctif -> fill_blank (10)
    expect(sets[6].id).toBe('ch13-ex07');
    expect(sets[6].interaction_type).toBe('fill_blank');
    expect(sets[6].questions_count).toBe(10);

    // 13.8: Transformation présent vers passé -> sentence_rewrite (10)
    expect(sets[7].id).toBe('ch13-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');
    expect(sets[7].questions_count).toBe(10);

    // 13.9: Matching des propositions logiques -> matching (5)
    expect(sets[8].id).toBe('ch13-ex09');
    expect(sets[8].interaction_type).toBe('matching');
    expect(sets[8].questions_count).toBe(5);

    // Total questions check (85 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(85);
  });

  it('fournit les 4 sujets principaux du chapitre 13', async () => {
    const { result } = renderHook(() => useTheory('ch13'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(4);
    expect(topics[0].id).toBe('ch13-t01');
    expect(topics[1].id).toBe('ch13-t02');
    expect(topics[2].id).toBe('ch13-t03');
    expect(topics[3].id).toBe('ch13-t04');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch14 (The infinitive mood)', async () => {
    const { result } = renderHook(() => useTheory('ch14'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(14);
    expect(data?.chapter.title).toBe('The infinitive mood');
    expect(data?.chapter.page_range).toBe('173–187');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("L'Infinitif Présent");
    expect(markdown).toContain("La Règle d'Or de la Négation");
    expect(markdown).toContain("Emplois Particuliers de l'Infinitif");
    expect(markdown).toContain("L'Infinitif Passé");
    expect(markdown).toContain("Le Contraste Capital : « Avant de » vs « Après »");
    expect(markdown).toContain("Les Prépositions après les Verbes");
    expect(markdown).toContain("Vocabulaire Thématique : Les Arts Culinaires et la Cuisine");
    expect(markdown.toLowerCase()).toContain("éplucher");
    expect(markdown.toLowerCase()).toContain("bouillir");
    expect(markdown.toLowerCase()).toContain("râper");
  });

  it('charge les 7 séries d exercices officielles du Chapitre 14 avec les bons types d interaction (70 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch14'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(7);

    // 14.1: Traduction de l'infinitif sujet et négation en bloc -> translation (10)
    expect(sets[0].id).toBe('ch14-ex01');
    expect(sets[0].interaction_type).toBe('translation');
    expect(sets[0].questions_count).toBe(10);

    // 14.2: Infinitif en contexte et expressions avec "à" -> sentence_rewrite (10)
    expect(sets[1].id).toBe('ch14-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');
    expect(sets[1].questions_count).toBe(10);

    // 14.3: Formation de l'infinitif passé -> fill_blank (10)
    expect(sets[2].id).toBe('ch14-ex03');
    expect(sets[2].interaction_type).toBe('fill_blank');
    expect(sets[2].questions_count).toBe(10);

    // 14.4: Transformation avant de (présent) -> après (passé) -> sentence_rewrite (10)
    expect(sets[3].id).toBe('ch14-ex04');
    expect(sets[3].interaction_type).toBe('sentence_rewrite');
    expect(sets[3].questions_count).toBe(10);

    // 14.5: Conjugaison du verbe principal suivi d'un infinitif direct -> fill_blank (10)
    expect(sets[4].id).toBe('ch14-ex05');
    expect(sets[4].interaction_type).toBe('fill_blank');
    expect(sets[4].questions_count).toBe(10);

    // 14.6: Choix de préposition : à ou de -> fill_blank (10)
    expect(sets[5].id).toBe('ch14-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');
    expect(sets[5].questions_count).toBe(10);

    // 14.7: Thème grammatical et intégration -> translation (10)
    expect(sets[6].id).toBe('ch14-ex07');
    expect(sets[6].interaction_type).toBe('translation');
    expect(sets[6].questions_count).toBe(10);

    // Total questions check (70 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(70);
  });

  it('fournit les 4 sujets principaux du chapitre 14', async () => {
    const { result } = renderHook(() => useTheory('ch14'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(4);
    expect(topics[0].id).toBe('ch14-t01');
    expect(topics[1].id).toBe('ch14-t02');
    expect(topics[2].id).toBe('ch14-t03');
    expect(topics[3].id).toBe('ch14-t04');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch15 (The present participle and the gerundive)', async () => {
    const { result } = renderHook(() => useTheory('ch15'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(15);
    expect(data?.chapter.title).toBe('The present participle and the gerundive');
    expect(data?.chapter.page_range).toBe('188–194');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Le Participe Présent (The Present Participle)");
    expect(markdown).toContain("Ajustements Orthographiques (-cer et -ger)");
    expect(markdown).toContain("Les Trois Seules Exceptions Irrévocables");
    expect(markdown).toContain("Le Gérondif (The Gerundive)");
    expect(markdown).toContain("L'Opposition et la Concession avec « Tout en »");
    expect(markdown).toContain("Vocabulaire Thématique : Les Sports, les Jeux et la Compétition");
    expect(markdown.toLowerCase()).toContain("natation");
    expect(markdown.toLowerCase()).toContain("cyclisme");
    expect(markdown.toLowerCase()).toContain("raquette");
  });

  it('charge les 3 séries d exercices officielles du Chapitre 15 avec les bons types d interaction (30 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch15'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(3);

    // 15.1: Morphologie du participe présent -> fill_blank (10)
    expect(sets[0].id).toBe('ch15-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 15.2: Gérondif en contexte avec en et tout en -> fill_blank (10)
    expect(sets[1].id).toBe('ch15-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 15.3: Traduction active intégrative -> translation (10)
    expect(sets[2].id).toBe('ch15-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // Total questions check (30 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(30);
  });

  it('fournit les 2 sujets principaux du chapitre 15', async () => {
    const { result } = renderHook(() => useTheory('ch15'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(2);
    expect(topics[0].id).toBe('ch15-t01');
    expect(topics[1].id).toBe('ch15-t02');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch16 (passé simple, verbes en -cer/-ger, verbes irréguliers et vocabulaire de l art)', async () => {
    const { result } = renderHook(() => useTheory('ch16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(16);
    expect(data?.chapter.title).toBe('The passé simple');
    expect(data?.chapter.page_range).toBe('195–202');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Formation des Verbes Réguliers en -ER");
    expect(markdown).toContain("Ajustements Orthographiques Indispensables (-cer et -ger)");
    expect(markdown).toContain("Formation des Verbes en -IR et -RE");
    expect(markdown).toContain("Les Deux Piliers Fondamentaux : AVOIR et ÊTRE");
    expect(markdown).toContain("Vocabulaire Thématique : L'Art, les Beaux-Arts et la Culture");
    expect(markdown).toContain("Les Verbes Irréguliers au Passé Simple");
    expect(markdown).toContain("Les 5 Réflexes d'Or du Professeur FLE");
    expect(markdown.toLowerCase()).toContain("vernissage");
    expect(markdown.toLowerCase()).toContain("chevalet");
    expect(markdown.toLowerCase()).toContain("aliénor d'aquitaine");
  });

  it('charge les 3 séries d exercices officielles du Chapitre 16 avec les bons types d interaction (30 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(3);

    // 16.1: Reconnaissance morphologique (infinitif) -> fill_blank (10)
    expect(sets[0].id).toBe('ch16-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 16.2: Conjugaison historique au passé simple -> fill_blank (10)
    expect(sets[1].id).toBe('ch16-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 16.3: Traduction littéraire vers le passé simple -> translation (10)
    expect(sets[2].id).toBe('ch16-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // Total questions check (30 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(30);
  });

  it('fournit les 2 sujets principaux du chapitre 16', async () => {
    const { result } = renderHook(() => useTheory('ch16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(2);
    expect(topics[0].id).toBe('ch16-t01');
    expect(topics[1].id).toBe('ch16-t02');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch17 (la voix passive)', async () => {
    const { result } = renderHook(() => useTheory('ch17'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(17);
    expect(data?.chapter.title).toBe('The passive voice');
    expect(data?.chapter.page_range).toBe('203–209');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("The passive voice (La voix passive)");
    expect(markdown).toContain("Formation Complète de la Voix Passive");
    expect(markdown).toContain("L'Accord Obligatoire du Participe Passé");
    expect(markdown).toContain("Le Grand Duel « PAR » vs « DE »");
    expect(markdown).toContain("Comment Éviter la Voix Passive en Français");
    expect(markdown).toContain("Le Pronom Indéfini « ON »");
    expect(markdown).toContain("Le Passif Pronominal");
    expect(markdown).toContain("Vocabulaire Thématique : La Police, la Justice et les Faits Divers");
    expect(markdown.toLowerCase()).toContain("croisés");
    expect(markdown.toLowerCase()).toContain("médecin légiste");
    expect(markdown.toLowerCase()).toContain("blanchiment d'argent");
  });

  it('charge les 3 séries d exercices officielles du Chapitre 17 avec les bons types d interaction (30 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch17'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(3);

    // 17.1: Active -> Passive -> sentence_rewrite (10)
    expect(sets[0].id).toBe('ch17-ex01');
    expect(sets[0].interaction_type).toBe('sentence_rewrite');
    expect(sets[0].questions_count).toBe(10);

    // 17.2: Passive -> Active -> sentence_rewrite (10)
    expect(sets[1].id).toBe('ch17-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');
    expect(sets[1].questions_count).toBe(10);

    // 17.3: English -> French Passive Translation -> translation (10)
    expect(sets[2].id).toBe('ch17-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // Total questions check (30 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(30);
  });

  it('fournit les 3 sujets principaux du chapitre 17', async () => {
    const { result } = renderHook(() => useTheory('ch17'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch17-t01');
    expect(topics[1].id).toBe('ch17-t02');
    expect(topics[2].id).toBe('ch17-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch18 (Indirect speech, concordance des temps, politique)', async () => {
    const { result } = renderHook(() => useTheory('ch18'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(18);
    expect(data?.chapter.title).toBe('Indirect speech');
    expect(data?.chapter.page_range).toBe('210–218');

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Indirect speech (Le discours indirect)");
    expect(markdown).toContain("Discours Direct vs Discours Indirect");
    expect(markdown).toContain("Le Répertoire des Verbes Introducteurs");
    expect(markdown).toContain("Les Connecteurs Interrogatifs : Passer au Style Indirect");
    expect(markdown).toContain("La Concordance des Temps");
    expect(markdown).toContain("Lexique Thématique : La Politique et les Élections");
    expect(markdown).toContain("Les 5 Commandements FLE pour Lusophones");
    expect(markdown.toLowerCase()).toContain("suffrage universel");
    expect(markdown.toLowerCase()).toContain("boycotter");
  });

  it('charge les 4 séries d exercices officielles du Chapitre 18 avec les bons types d interaction (40 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch18'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(4);

    // 18.1: Questions indirectes avec Si -> sentence_rewrite (10)
    expect(sets[0].id).toBe('ch18-ex01');
    expect(sets[0].interaction_type).toBe('sentence_rewrite');
    expect(sets[0].questions_count).toBe(10);

    // 18.2: Relier avec Que -> sentence_rewrite (10)
    expect(sets[1].id).toBe('ch18-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');
    expect(sets[1].questions_count).toBe(10);

    // 18.3: Concordance au passé -> sentence_rewrite (10)
    expect(sets[2].id).toBe('ch18-ex03');
    expect(sets[2].interaction_type).toBe('sentence_rewrite');
    expect(sets[2].questions_count).toBe(10);

    // 18.4: Traduction anglaise -> française -> translation (10)
    expect(sets[3].id).toBe('ch18-ex04');
    expect(sets[3].interaction_type).toBe('translation');
    expect(sets[3].questions_count).toBe(10);

    // Total questions check (40 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(40);
  });

  it('fournit les 2 sujets principaux du chapitre 18', async () => {
    const { result } = renderHook(() => useTheory('ch18'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(2);
    expect(topics[0].id).toBe('ch18-t01');
    expect(topics[1].id).toBe('ch18-t02');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch19 (The imperative mood, verbes en -er sans -s, pronominaux, état civil)', async () => {
    const { result } = renderHook(() => useTheory('ch19'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(19);
    expect(data?.chapter.title).toBe('The imperative mood');
    expect(data?.chapter.page_range).toBe('219–225');
    expect(data?.chapter.total_questions).toBe(30);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("The imperative mood (L'impératif)");
    expect(markdown).toContain("Formation Régulière de l'Impératif");
    expect(markdown).toContain("La Règle Capitale de la Chute du « -s »");
    expect(markdown).toContain("La Forme Négative de l'Impératif");
    expect(markdown).toContain("Les Impératifs Irréguliers");
    expect(markdown).toContain("L'Impératif des Verbes Pronominaux");
    expect(markdown).toContain("L'Astuce Phonétique du « -s » Eufonique devant Y et EN");
    expect(markdown).toContain("Vocabulaire Cívico & Administrativo");
    expect(markdown).toContain("Les 6 Commandements FLE pour Lusophones");
    expect(markdown.toLowerCase()).toContain("carte d’identité");
    expect(markdown.toLowerCase()).toContain("vas-y");
    expect(markdown.toLowerCase()).toContain("lave-toi");
  });

  it('charge les 3 séries d exercices officielles du Chapitre 19 avec les bons types d interaction (30 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch19'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(3);

    // 19.1: Formation de l'impératif -> sentence_rewrite (10)
    expect(sets[0].id).toBe('ch19-ex01');
    expect(sets[0].interaction_type).toBe('sentence_rewrite');
    expect(sets[0].questions_count).toBe(10);

    // 19.2: Verbes pronominaux à l'impératif -> sentence_rewrite (10)
    expect(sets[1].id).toBe('ch19-ex02');
    expect(sets[1].interaction_type).toBe('sentence_rewrite');
    expect(sets[1].questions_count).toBe(10);

    // 19.3: Traduction thématique et impératif -> translation (10)
    expect(sets[2].id).toBe('ch19-ex03');
    expect(sets[2].interaction_type).toBe('translation');
    expect(sets[2].questions_count).toBe(10);

    // Total questions check (30 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(30);
  });

  it('fournit les 3 sujets principaux du chapitre 19', async () => {
    const { result } = renderHook(() => useTheory('ch19'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(3);
    expect(topics[0].id).toBe('ch19-t01');
    expect(topics[1].id).toBe('ch19-t02');
    expect(topics[2].id).toBe('ch19-t03');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch20 (articles et noms)', async () => {
    const { result } = renderHook(() => useTheory('ch20'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(20);
    expect(data?.chapter.title).toBe('Articles and nouns');
    expect(data?.chapter.page_range).toBe('226–246');
    expect(data?.chapter.total_questions).toBe(90);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain("Articles and nouns (Les articles et les noms)");
    expect(markdown).toContain("Les Articles Définis (L'article défini)");
    expect(markdown).toContain("Les Articles Indéfinis et Partitifs");
    expect(markdown).toContain("La Règle d'Or de la Négation avec les Partitifs et Indéfinis");
    expect(markdown).toContain("L'Exception Capitale : Le Verbe ÊTRE !");
    expect(markdown).toContain("Le Genre des Noms : Reconnaître le Masculin et le Féminin");
    expect(markdown).toContain("Noms à Double Genre et Sens Différent (Homonymes de Genre)");
    expect(markdown).toContain("Le Pluriel des Noms");
    expect(markdown).toContain("Le Genre des Pays et Prépositions Géographiques");
    expect(markdown).toContain("Prépositions de Provenance (Venir de / Rentrer de / Originaire de...)");
    expect(markdown).toContain("Vocabulaire Thématique Officiel du Chapitre 20");
    expect(markdown).toContain("Les 7 Commandements FLE pour Lusophones");

    // Valide le lexique et exemples essentiels
    expect(markdown.toLowerCase()).toContain("du pain");
    expect(markdown.toLowerCase()).toContain("ail");
    expect(markdown.toLowerCase()).toContain("le mexique");
    expect(markdown.toLowerCase()).toContain("le courage");
    expect(markdown.toLowerCase()).toContain("la planète");
    expect(markdown.toLowerCase()).toContain("le livre");
    expect(markdown.toLowerCase()).toContain("la livre");
  });

  it('charge les 9 séries d exercices officielles du Chapitre 20 avec les bons types d interaction (90 questions au total)', async () => {
    const { result } = renderHook(() => useTheory('ch20'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(9);

    // 20.1: Articles partitifs -> fill_blank (10)
    expect(sets[0].id).toBe('ch20-ex01');
    expect(sets[0].interaction_type).toBe('fill_blank');
    expect(sets[0].questions_count).toBe(10);

    // 20.2: Masculin ou féminin (le/la) -> fill_blank (10)
    expect(sets[1].id).toBe('ch20-ex02');
    expect(sets[1].interaction_type).toBe('fill_blank');
    expect(sets[1].questions_count).toBe(10);

    // 20.3: Mettre au masculin avec article -> sentence_rewrite (10)
    expect(sets[2].id).toBe('ch20-ex03');
    expect(sets[2].interaction_type).toBe('sentence_rewrite');
    expect(sets[2].questions_count).toBe(10);

    // 20.4: Mettre au féminin -> sentence_rewrite (10)
    expect(sets[3].id).toBe('ch20-ex04');
    expect(sets[3].interaction_type).toBe('sentence_rewrite');
    expect(sets[3].questions_count).toBe(10);

    // 20.5: Genre des pays (le/la/l') -> fill_blank (10)
    expect(sets[4].id).toBe('ch20-ex05');
    expect(sets[4].interaction_type).toBe('fill_blank');
    expect(sets[4].questions_count).toBe(10);

    // 20.6: Prépositions géographiques destination (en/au/aux/à) -> fill_blank (10)
    expect(sets[5].id).toBe('ch20-ex06');
    expect(sets[5].interaction_type).toBe('fill_blank');
    expect(sets[5].questions_count).toBe(10);

    // 20.7: Habiter ville et pays -> ordering (puzzle) (10)
    expect(sets[6].id).toBe('ch20-ex07');
    expect(sets[6].interaction_type).toBe('ordering');
    expect(sets[6].questions_count).toBe(10);

    // 20.8: Prépositions provenance (de/d'/du/des) -> fill_blank (10)
    expect(sets[7].id).toBe('ch20-ex08');
    expect(sets[7].interaction_type).toBe('fill_blank');
    expect(sets[7].questions_count).toBe(10);

    // 20.9: Traduction thématique synthèse -> translation (10)
    expect(sets[8].id).toBe('ch20-ex09');
    expect(sets[8].interaction_type).toBe('translation');
    expect(sets[8].questions_count).toBe(10);

    // Total questions check (90 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(90);
  });

  it('fournit les 6 sujets principaux du chapitre 20', async () => {
    const { result } = renderHook(() => useTheory('ch20'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(6);
    expect(topics[0].id).toBe('ch20-t01');
    expect(topics[1].id).toBe('ch20-t02');
    expect(topics[2].id).toBe('ch20-t03');
    expect(topics[3].id).toBe('ch20-t04');
    expect(topics[4].id).toBe('ch20-t05');
    expect(topics[5].id).toBe('ch20-t06');
  });

  it('fournit la théorie pédagogique complète et rigoureuse pour ch21 (tous les pronoms)', async () => {
    const { result } = renderHook(() => useTheory('ch21'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data).toBeDefined();
    expect(data?.chapter.number).toBe(21);
    expect(data?.chapter.title).toBe('All the pronouns');
    expect(data?.chapter.page_range).toBe('247–270');
    expect([110, 120]).toContain(data?.chapter.total_questions);

    // Valide le contenu pédagogique FLE pour lusophones
    const markdown = data?.chapter.theory_markdown || '';
    expect(markdown).toContain('Tous les pronoms');
    expect(markdown).toContain('Les Pronoms Sujets');
    expect(markdown).toContain('Le Pronom Caméléon « ON » : Ses 5 Facettes');
    expect(markdown).toContain('Les Professions');
    expect(markdown).toContain('Les Pronoms Objets Directs');
    expect(markdown).toContain("l'Accord du Participe Passé avec le COD");
    expect(markdown).toContain('Les Pronoms Objets Indirects');
    expect(markdown).toContain('Les Pronoms Adverbiaux « Y » et « EN »');
    expect(markdown).toContain("L'Ordre des Doubles Pronoms");
    expect(markdown).toContain('Les Pronoms Disjoints / Toniques');
    expect(markdown).toContain('Personnes vs Choses avec « À » et « DE »');
  });

  it('charge les 12 séries d exercices officielles du Chapitre 21 avec les moteurs de jeu calibrés', async () => {
    const { result } = renderHook(() => useTheory('ch21'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const sets = result.current.data?.exerciseSets || [];
    expect(sets).toHaveLength(12);

    // 21.1: COD remplacement -> sentence_rewrite (10)
    expect(sets[0].id).toBe('ch21-ex01');
    expect(sets[0].interaction_type).toBe('sentence_rewrite');
    expect(sets[0].questions_count).toBe(10);

    // 21.2: Traduction COD + inversion -> translation (10)
    expect(sets[1].id).toBe('ch21-ex02');
    expect(sets[1].interaction_type).toBe('translation');
    expect(sets[1].questions_count).toBe(10);

    // 21.3: COI remplacement -> sentence_rewrite (10)
    expect(sets[2].id).toBe('ch21-ex03');
    expect(sets[2].interaction_type).toBe('sentence_rewrite');
    expect(sets[2].questions_count).toBe(10);

    // 21.4: Traduction COI + impératif -> translation (10)
    expect(sets[3].id).toBe('ch21-ex04');
    expect(sets[3].interaction_type).toBe('translation');
    expect(sets[3].questions_count).toBe(10);

    // 21.5: Pronom Y -> sentence_rewrite (10)
    expect(sets[4].id).toBe('ch21-ex05');
    expect(sets[4].interaction_type).toBe('sentence_rewrite');
    expect(sets[4].questions_count).toBe(10);

    // 21.6: Pronom EN -> sentence_rewrite (10)
    expect(sets[5].id).toBe('ch21-ex06');
    expect(sets[5].interaction_type).toBe('sentence_rewrite');
    expect(sets[5].questions_count).toBe(10);

    // 21.7: Matching verbes prépositionnels -> matching (5)
    expect(sets[6].id).toBe('ch21-ex07');
    expect(sets[6].interaction_type).toBe('matching');
    expect(sets[6].questions_count).toBe(5);

    // 21.8: Ordre des doubles pronoms -> sentence_rewrite (10)
    expect(sets[7].id).toBe('ch21-ex08');
    expect(sets[7].interaction_type).toBe('sentence_rewrite');
    expect(sets[7].questions_count).toBe(10);

    // 21.9: Traduction doubles pronoms, Y et EN -> translation (10)
    expect(sets[8].id).toBe('ch21-ex09');
    expect(sets[8].interaction_type).toBe('translation');
    expect(sets[8].questions_count).toBe(10);

    // 21.10: C'est... qui avec toniques -> sentence_rewrite (10)
    expect(sets[9].id).toBe('ch21-ex10');
    expect(sets[9].interaction_type).toBe('sentence_rewrite');
    expect(sets[9].questions_count).toBe(10);

    // 21.11: Traduction toniques & personnes -> translation (10)
    expect(sets[10].id).toBe('ch21-ex11');
    expect(sets[10].interaction_type).toBe('translation');
    expect(sets[10].questions_count).toBe(10);

    // 21.12: Réponses courtes aussi / non plus -> fill_blank (5)
    expect(sets[11].id).toBe('ch21-ex12');
    expect(sets[11].interaction_type).toBe('fill_blank');
    expect(sets[11].questions_count).toBe(5);

    // Total questions check (110 questions)
    const totalQ = sets.reduce((acc, s) => acc + s.questions_count, 0);
    expect(totalQ).toBe(110);
  });

  it('fournit les 5 sujets principaux du chapitre 21', async () => {
    const { result } = renderHook(() => useTheory('ch21'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const topics = result.current.data?.topics || [];
    expect(topics).toHaveLength(5);
    expect(topics[0].id).toBe('ch21-t01');
    expect(topics[1].id).toBe('ch21-t02');
    expect(topics[2].id).toBe('ch21-t03');
    expect(topics[3].id).toBe('ch21-t04');
    expect(topics[4].id).toBe('ch21-t05');
  });
});
