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

  it('charge la série 4.1 avec 10 questions de conjugaison fill_blank sur aller', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toContain('plage');
    expect(data?.questions[0].accepted_answers).toContain('allons');
    expect(data?.questions[1].accepted_answers).toContain('vont');
    expect(data?.questions[9].prompt).toContain('Comment');
    expect(data?.questions[9].accepted_answers).toContain('allez');
  });

  it('charge la série 4.2 au futur immédiat avec sentence_rewrite', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Nous achetons une nouvelle machine à laver.');
    expect(data?.questions[0].accepted_answers).toContain('Nous allons acheter une nouvelle machine à laver.');
    expect(data?.questions[4].prompt).toBe('Cette agence promeut cette marchandise.');
    expect(data?.questions[4].accepted_answers).toContain('Cette agence va promouvoir cette marchandise.');
  });

  it('charge la série 4.4 au passé immédiat avec sentence_rewrite et élisions', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je téléphone à Bernard.');
    expect(data?.questions[0].accepted_answers).toContain('Je viens de téléphoner à Bernard.');
    expect(data?.questions[1].prompt).toBe('Il annule son vol.');
    expect(data?.questions[1].accepted_answers).toContain("Il vient d'annuler son vol.");
    expect(data?.questions[6].prompt).toBe('Tu as trente ans.');
    expect(data?.questions[6].accepted_answers).toContain("Tu viens d'avoir trente ans.");
  });

  it('charge la série 4.6 (matching) avec les 5 options de correspondances de tenir', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Il tient à sa voiture.');
    expect(q1?.accepted_answers).toContain('c');
    expect(q1?.options).toHaveLength(5);

    const q3 = data?.questions[2];
    expect(q3?.prompt).toBe('Il ne tient pas ses promesses.');
    expect(q3?.accepted_answers).toContain('e');
  });

  it('charge la série 4.8 à la forme causative avec sentence_rewrite', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je lis le dossier.');
    expect(data?.questions[0].accepted_answers).toContain('Je fais lire le dossier.');
    expect(data?.questions[1].prompt).toBe('Vous lavez la voiture.');
    expect(data?.questions[1].accepted_answers).toContain('Vous faites laver la voiture.');
  });

  it('charge la série 4.9 avec la traduction intégrative vous et est-ce que', async () => {
    const { result } = renderHook(() => useExerciseSet('ch04-ex09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('They have the letter sent to Paris.');
    expect(data?.questions[0].accepted_answers).toContain('Ils font envoyer la lettre à Paris.');
    expect(data?.questions[7].prompt).toBe('Can you cook?');
    expect(data?.questions[7].accepted_answers).toContain('Est-ce que vous savez faire la cuisine ?');
    expect(data?.questions[9].prompt).toBe("It's cold.");
    expect(data?.questions[9].accepted_answers).toContain('Il fait froid.');
  });

  it('charge la série 5.1 avec 10 questions de conjugaison de devoir (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch05-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Elle (devoir) __ prévenir sa mère.');
    expect(data?.questions[0].accepted_answers).toContain('doit');
    expect(data?.questions[2].prompt).toBe('Vous (devoir) __ refuser leur offre.');
    expect(data?.questions[2].accepted_answers).toContain('devez');
    expect(data?.questions[4].prompt).toBe('Ils (ne pas devoir) __ arriver avant dimanche.');
    expect(data?.questions[4].accepted_answers).toContain('ne doivent pas');
  });

  it('charge la série 5.2 avec 10 questions de traduction de devoir (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch05-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('You must cook tonight.');
    expect(data?.questions[0].accepted_answers).toContain('Vous devez faire la cuisine ce soir.');
    expect(data?.questions[1].prompt).toBe('She must not work today.');
    expect(data?.questions[1].accepted_answers).toContain('Elle ne doit pas travailler aujourd’hui.');
    expect(data?.questions[8].prompt).toBe('You should call Vincent.');
    expect(data?.questions[8].accepted_answers).toContain('Vous devriez appeler Vincent.');
  });

  it('charge la série 5.3 (matching) avec les 5 options de correspondances logiques de devoir', async () => {
    const { result } = renderHook(() => useExerciseSet('ch05-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Elle a des dettes.');
    expect(q1?.accepted_answers).toContain('e');
    expect(q1?.options).toHaveLength(5);

    const q2 = data?.questions[1];
    expect(q2?.prompt).toBe('Elle n’est pas morte.');
    expect(q2?.accepted_answers).toContain('a');

    const q5 = data?.questions[4];
    expect(q5?.prompt).toBe('Elle hésite encore.');
    expect(q5?.accepted_answers).toContain('b');
  });

  it('charge la série 5.4 avec 10 questions de verbes en -eindre/-aindre (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch05-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Elle (craindre) __ de profonds changements.');
    expect(data?.questions[0].accepted_answers).toContain('craint');
    expect(data?.questions[2].prompt).toBe('Ils (plaindre) __ la pauvre femme.');
    expect(data?.questions[2].accepted_answers).toContain('plaignent');
    expect(data?.questions[9].prompt).toBe('Elle (se plaindre) __ tout le temps.');
    expect(data?.questions[9].accepted_answers).toContain('se plaint');
  });

  it('charge la série 5.5 avec 10 questions de thème (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch05-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('She is painting the kitchen.');
    expect(data?.questions[0].accepted_answers).toContain('Elle peint la cuisine.');
    expect(data?.questions[1].prompt).toBe('There is a dog in the car.');
    expect(data?.questions[1].accepted_answers).toContain('Il y a un chien dans la voiture.');
    expect(data?.questions[3].prompt).toBe('This book is about the French president.');
    expect(data?.questions[3].accepted_answers).toContain('Dans ce livre, il s’agit du président français.');
    expect(data?.questions[9].prompt).toBe("It’s a matter of passion.");
    expect(data?.questions[9].accepted_answers).toContain('Il s’agit de passion.');
  });

  it('charge la série 6.1 avec 10 questions de verbes réfléchis (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je (s’habiller) __ avant de prendre le petit déjeuner.');
    expect(data?.questions[0].accepted_answers).toContain("m'habille");
    expect(data?.questions[1].prompt).toBe('Nous (se lever) __ tôt le matin.');
    expect(data?.questions[1].accepted_answers).toContain('nous levons');
    expect(data?.questions[2].prompt).toBe('Elle (se couper) __ les cheveux elle-même.');
    expect(data?.questions[2].accepted_answers).toContain('se coupe');
  });

  it('charge la série 6.2 avec 10 questions de verbes réciproques (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Ils (se marier) __ la semaine prochaine.');
    expect(data?.questions[0].accepted_answers).toContain('se marient');
    expect(data?.questions[1].prompt).toBe('Vous (s’embrasser) __ sur le balcon.');
    expect(data?.questions[1].accepted_answers).toContain('vous embrassez');
    expect(data?.questions[2].prompt).toBe('Nous (s’écrire) __ une fois par an.');
    expect(data?.questions[2].accepted_answers).toContain('nous écrivons');
  });

  it('charge la série 6.3 avec 10 questions de verbes subjectifs (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Elle (s’apercevoir) __ de sa gaffe.');
    expect(data?.questions[0].accepted_answers).toContain("s'aperçoit");
    expect(data?.questions[2].prompt).toBe('Tu (s’attendre) __ à sa visite.');
    expect(data?.questions[2].accepted_answers).toContain("t'attends");
    expect(data?.questions[5].prompt).toBe('Je (se rendre compte) __ de mon erreur.');
    expect(data?.questions[5].accepted_answers).toContain('me rends compte');
  });

  it('charge la série 6.4 avec 10 questions d’accord du pronom à l’infinitif (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('J’aime (se promener) __ le long de la Seine.');
    expect(data?.questions[0].accepted_answers).toContain('me promener');
    expect(data?.questions[1].prompt).toBe('À quelle heure est-ce que tu vas (se lever) __ ?');
    expect(data?.questions[1].accepted_answers).toContain('te lever');
    expect(data?.questions[2].prompt).toBe('Nous venons de (se rendre compte) __ des conséquences.');
    expect(data?.questions[2].accepted_answers).toContain('nous rendre compte');
  });

  it('charge la série 6.5 (matching) avec les 5 options de correspondances logiques', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);

    const q1 = data?.questions[0];
    expect(q1?.prompt).toBe('Ils sont toujours ensemble.');
    expect(q1?.accepted_answers).toContain('e');
    expect(q1?.options).toHaveLength(5);

    const q2 = data?.questions[1];
    expect(q2?.prompt).toBe('Ils communiquent sans cesse.');
    expect(q2?.accepted_answers).toContain('a');

    const q5 = data?.questions[4];
    expect(q5?.prompt).toBe('Ils ne se parlent jamais.');
    expect(q5?.accepted_answers).toContain('b');
  });

  it('charge la série 6.6 avec 10 questions de thème (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch06-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Get up!');
    expect(data?.questions[0].accepted_answers).toContain('Lève-toi !');
    expect(data?.questions[1].prompt).toBe('She is getting dressed for the party.');
    expect(data?.questions[1].accepted_answers).toContain('Elle s’habille pour la soirée.');
    expect(data?.questions[6].prompt).toBe('They just got married.');
    expect(data?.questions[6].accepted_answers).toContain('Ils viennent de se marier.');
    expect(data?.questions[9].prompt).toBe('They love each other.');
    expect(data?.questions[9].accepted_answers).toContain('Ils s’aiment.');
  });

  it('charge la série 7.1 avec 10 questions régulières en -er avec avoir (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il (inviter) ___ beaucoup de monde.');
    expect(data?.questions[0].accepted_answers).toContain('a invité');
    expect(data?.questions[3].prompt).toBe('Il (comprendre) ___ l\'intrigue.');
    expect(data?.questions[3].accepted_answers).toContain('a compris');
    expect(data?.questions[5].prompt).toBe('Je (voyager) ___ avec Rémi.');
    expect(data?.questions[5].accepted_answers).toContain('J\'ai voyagé');
  });

  it('charge la série 7.2 avec 10 questions régulières en -ir et -re avec avoir (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Ils (investir) ___ une grosse somme.');
    expect(data?.questions[0].accepted_answers).toContain('ont investi');
    expect(data?.questions[4].prompt).toBe('Ils (attendre) ___ le train une demi-heure.');
    expect(data?.questions[4].accepted_answers).toContain('ont attendu');
  });

  it('charge la série 7.3 avec 10 questions de thème / traduction (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Traduire : "They sold the house in France."');
    expect(data?.questions[0].accepted_answers).toContain('Ils ont vendu la maison en France.');
    expect(data?.questions[0].accepted_answers).toContain('Elles ont vendu la maison en France.');
  });

  it('charge la série 7.4 avec 10 questions de participes passés irréguliers (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je (prendre) ___ le train à Lille.');
    expect(data?.questions[0].accepted_answers).toContain('J\'ai pris');
    expect(data?.questions[1].prompt).toBe('Nous (ne pas pouvoir) ___ joindre les Quentin.');
    expect(data?.questions[1].accepted_answers).toContain('n\'avons pas pu');
    expect(data?.questions[3].prompt).toBe('Elle (peindre) ___ un paysage breton.');
    expect(data?.questions[3].accepted_answers).toContain('a peint');
  });

  it('charge la série 7.5 (matching) avec les 5 options de correspondances logiques', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);
    expect(data?.questions[0].prompt).toBe('Elle a conduit');
    expect(data?.questions[0].accepted_answers).toContain('e');
    expect(data?.questions[1].prompt).toBe('Tu as compris');
    expect(data?.questions[1].accepted_answers).toContain('d');
    expect(data?.questions[4].prompt).toBe('Nous avons fait');
    expect(data?.questions[4].accepted_answers).toContain('c');
  });

  it('charge la série 7.6 avec 10 questions avec l\'auxiliaire être et accords (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('À quel âge ce comédien (monter) ___ sur scène?');
    expect(data?.questions[0].accepted_answers).toContain('est-il monté');
    expect(data?.questions[1].prompt).toBe('Nous (rentrer) ___ du théâtre à minuit.');
    expect(data?.questions[1].accepted_answers).toContain('sommes rentrés');
    expect(data?.questions[8].prompt).toBe('Molière (mourir) ___ en 1673.');
    expect(data?.questions[8].accepted_answers).toContain('est mort');
  });

  it('charge la série 7.7 avec 10 questions de traduction avoir vs être (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[1].prompt).toBe('Traduire : "We went to Paris."');
    expect(data?.questions[1].accepted_answers).toContain('Nous sommes allés à Paris.');
    expect(data?.questions[5].prompt).toBe('Traduire : "Zola died in 1902."');
    expect(data?.questions[5].accepted_answers).toContain('Zola est mort en 1902.');
  });

  it('charge la série 7.8 avec 10 questions de verbes pronominaux et accords fins (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Ils (se promener) ___ le long de la rivière.');
    expect(data?.questions[0].accepted_answers).toContain('se sont promenés');
    // Règle du COI sans accord
    expect(data?.questions[3].prompt).toBe('Ils (s\'écrire) ___ régulièrement.');
    expect(data?.questions[3].accepted_answers).toContain('se sont écrit');
    // Règle des parties du corps sans accord
    expect(data?.questions[8].prompt).toBe('Tu (se couper) ___ le doigt.');
    expect(data?.questions[8].accepted_answers).toContain('t\'es coupé');
  });

  it('charge la série 7.9 (matching) avec 5 paires sur les verbes à double auxiliaire', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex09'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);
    expect(data?.questions[0].prompt).toBe('Elle a sorti');
    expect(data?.questions[0].accepted_answers).toContain('e');
    expect(data?.questions[1].prompt).toBe('Il a retourné');
    expect(data?.questions[1].accepted_answers).toContain('a');
    expect(data?.questions[2].prompt).toBe('Elle est rentrée');
    expect(data?.questions[2].accepted_answers).toContain('d');
  });

  it('charge la série 7.10 avec 10 questions de thème de synthèse (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch07-ex10'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Traduire : "They spent a month in China."');
    expect(data?.questions[0].accepted_answers).toContain('Ils ont passé un mois en Chine.');
    expect(data?.questions[4].prompt).toBe('Traduire : "She took the suitcases down."');
    expect(data?.questions[4].accepted_answers).toContain('Elle a descendu les valises.');
    expect(data?.questions[5].prompt).toBe('Traduire : "He brushed his teeth."');
    expect(data?.questions[5].accepted_answers).toContain('Il s\'est brossé les dents.');
    expect(data?.questions[7].prompt).toBe('Traduire : "They wrote each other regularly."');
    expect(data?.questions[7].accepted_answers).toContain('Ils se sont écrit régulièrement.');
  });

  it('charge la série 8.1 avec 10 questions de conjugaison régulière à l\'imparfait (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il (voyager) ___ chaque année en Australie.');
    expect(data?.questions[0].accepted_answers).toContain('voyageait');
    expect(data?.questions[2].prompt).toBe('Nous (être) ___ enchantés de notre expédition.');
    expect(data?.questions[2].accepted_answers).toContain('étions');
    expect(data?.questions[4].prompt).toBe('Je (être) ___ champion de tennis.');
    expect(data?.questions[4].accepted_answers).toContain('J\'étais');
    expect(data?.questions[8].prompt).toBe('Le guide (encourager) ___ les marcheurs.');
    expect(data?.questions[8].accepted_answers).toContain('encourageait');
  });

  it('charge la série 8.2 avec 10 questions de description et états d\'esprit (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il (croire) ___ que tu ne voulais pas venir.');
    expect(data?.questions[0].accepted_answers).toContain('croyait');
    expect(data?.questions[4].prompt).toBe('Elle (avoir) ___ très faim.');
    expect(data?.questions[4].accepted_answers).toContain('avait');
    expect(data?.questions[7].prompt).toBe('Vous (paraître) ___ sceptique.');
    expect(data?.questions[7].accepted_answers).toContain('paraissiez');
  });

  it('charge la série 8.3 avec 10 questions d\'habitude et répétition (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Nous (suivre) ___ des cours de danse tous les mardis.');
    expect(data?.questions[0].accepted_answers).toContain('suivions');
    expect(data?.questions[3].prompt).toBe('Nous (faire) ___ la grasse matinée tous les dimanches.');
    expect(data?.questions[3].accepted_answers).toContain('faisions');
    expect(data?.questions[8].prompt).toBe('Dans le passé, vous (se voir) ___ plus souvent.');
    expect(data?.questions[8].accepted_answers).toContain('vous voyiez');
  });

  it('charge la série 8.4 avec 10 questions d\'action continue interrompue (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il (faire) ___ un discours quand quelqu\'un dans l\'assistance l\'a interrompu.');
    expect(data?.questions[0].accepted_answers).toContain('faisait');
    expect(data?.questions[1].prompt).toBe('Je (dormir) ___ quand le chat a sauté sur mon lit.');
    expect(data?.questions[1].accepted_answers).toContain('dormais');
    expect(data?.questions[9].prompt).toBe('Je (attendre) ___ Roland depuis dix minutes quand enfin il est arrivé.');
    expect(data?.questions[9].accepted_answers).toContain('J\'attendais');
  });

  it('charge la série 8.5 avec 10 questions de thème / traduction (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Traduire : "I used to play tennis every Thursday."');
    expect(data?.questions[0].accepted_answers).toContain('Je jouais au tennis tous les jeudis.');
    expect(data?.questions[3].prompt).toBe('Traduire : "The restaurant was crowded."');
    expect(data?.questions[3].accepted_answers).toContain('Le restaurant était bondé.');
    expect(data?.questions[5].prompt).toBe('Traduire : "They looked tired."');
    expect(data?.questions[5].accepted_answers).toContain('Ils avaient l\'air fatigué.');
  });

  it('charge la série 8.6 avec 10 questions de suggestions Si on (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Si on (aller) ___ se promener dans la forêt?');
    expect(data?.questions[0].accepted_answers).toContain('allait');
    expect(data?.questions[1].prompt).toBe('Si on (déjeuner) ___ ensemble?');
    expect(data?.questions[1].accepted_answers).toContain('déjeunait');
  });

  it('charge la série 8.7 avec 10 questions de choix passé composé ou imparfait (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch08-ex07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je (aller) ___ chez le dentiste hier.');
    expect(data?.questions[0].accepted_answers).toContain('Je suis allé');
    expect(data?.questions[1].prompt).toBe('Quand il (être) ___ adolescent, il (jouer) ___ au football.');
    expect(data?.questions[1].accepted_answers).toContain('était, jouait');
    expect(data?.questions[3].prompt).toBe('Ils (randonner) ___ dans les Alpes le week-end passé.');
    expect(data?.questions[3].accepted_answers).toContain('ont randonné');
    expect(data?.questions[8].prompt).toBe('Je (regarder) ___ un film quand elle (arriver) ___ .');
    expect(data?.questions[8].accepted_answers).toContain('regardais, est arrivée');
  });

  it('charge la série 9.1 avec 10 questions de conjugaison régulière au futur simple (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Vous (suivre) ___ un cours de français.');
    expect(data?.questions[0].accepted_answers).toContain('suivrez');
    expect(data?.questions[1].prompt).toBe('Nous (dîner) ___ chez Yann la semaine prochaine.');
    expect(data?.questions[1].accepted_answers).toContain('dînerons');
    expect(data?.questions[4].prompt).toBe('Ils (ne jamais oublier) ___ votre générosité.');
    expect(data?.questions[4].accepted_answers).toContain("n'oublieront jamais");
  });

  it('charge la série 9.2 avec 10 questions de radicaux irréguliers (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il (être) ___ déçu de ne pas vous voir.');
    expect(data?.questions[0].accepted_answers).toContain('sera');
    expect(data?.questions[1].prompt).toBe('L’étudiant (faire) ___ un stage à Nantes.');
    expect(data?.questions[1].accepted_answers).toContain('fera');
    expect(data?.questions[6].prompt).toBe('Nous (voir) ___ un bon film au cinéma.');
    expect(data?.questions[6].accepted_answers).toContain('verrons');
    expect(data?.questions[8].prompt).toBe('Elle (pouvoir) ___ aller à la campagne avec nous.');
    expect(data?.questions[8].accepted_answers).toContain('pourra');
  });

  it('charge la série 9.3 avec 10 questions de phrases composées temporelles (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Vous (aller) ___ à l’opéra quand vos amis (être) ___ à Lyon.');
    expect(data?.questions[0].accepted_answers).toContain('irez, seront');
    expect(data?.questions[5].prompt).toBe('Tant qu’il y (avoir) ___ des hommes, il y (avoir) ___ des guerres.');
    expect(data?.questions[5].accepted_answers).toContain('aura, aura');
  });

  it('charge la série 9.4 avec 10 questions de transformation futur immédiat au futur simple (sentence_rewrite)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('L’avion va décoller à onze heures.');
    expect(data?.questions[0].accepted_answers).toContain('L’avion décollera à onze heures.');
    expect(data?.questions[1].prompt).toBe('Tu vas apprendre à conduire.');
    expect(data?.questions[1].accepted_answers).toContain('Tu apprendras à conduire.');
    expect(data?.questions[8].prompt).toBe('Ils vont aller en Bolivie.');
    expect(data?.questions[8].accepted_answers).toContain('Ils iront en Bolivie.');
  });

  it('charge la série 9.5 avec 5 questions de correspondance de deux colonnes (matching)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);
    expect(data?.questions[0].prompt).toBe('Elle recevra');
    expect(data?.questions[0].accepted_answers).toContain('c');
    expect(data?.questions[1].prompt).toBe('Tu courras');
    expect(data?.questions[1].accepted_answers).toContain('e');
    expect(data?.questions[2].prompt).toBe('Il enseignera');
    expect(data?.questions[2].accepted_answers).toContain('a');
    expect(data?.questions[3].prompt).toBe('Elle mourra');
    expect(data?.questions[3].accepted_answers).toContain('b');
    expect(data?.questions[4].prompt).toBe('Il deviendra');
    expect(data?.questions[4].accepted_answers).toContain('d');
  });

  it('charge la série 9.6 avec 10 questions de futur antérieur (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Elle (apprendre) ___ le français au Laos.');
    expect(data?.questions[0].accepted_answers).toContain('aura appris');
    expect(data?.questions[6].prompt).toBe('Elle (se reposer) ___ des semaines au bord du lac.');
    expect(data?.questions[6].accepted_answers).toContain('se sera reposée');
    expect(data?.questions[8].prompt).toBe('Il (mourir) ___ depuis longtemps.');
    expect(data?.questions[8].accepted_answers).toContain('sera mort');
  });

  it('charge la série 9.7 avec 10 questions de traduction active (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex07'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('We’ll play tennis.');
    expect(data?.questions[0].accepted_answers).toContain('Nous jouerons au tennis.');
    expect(data?.questions[3].prompt).toBe('We’ll visit Venice when we are in Italy.');
    expect(data?.questions[3].accepted_answers).toContain('Nous visiterons Venise quand nous serons en Italie.');
    expect(data?.questions[9].prompt).toBe('He’ll become a doctor.');
    expect(data?.questions[9].accepted_answers).toContain('Il deviendra médecin.');
  });

  it('charge la série 9.8 avec 10 questions de conjonctions de l\'indicatif (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch09-ex08'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Puisqu’il a raté son examen, il (ne pas aller) ___ en vacances.');
    expect(data?.questions[0].accepted_answers).toContain("n'ira pas");
    expect(data?.questions[3].prompt).toBe('Il fera chaud chez elle alors que chez lui, on (geler) ___ .');
    expect(data?.questions[3].accepted_answers).toContain('gèlera');
    expect(data?.questions[4].prompt).toBe('Si nous avons le temps, nous (se promener) ___ au bord du lac.');
    expect(data?.questions[4].accepted_answers).toContain('nous promènerons');
    expect(data?.questions[5].prompt).toBe('Dès que j’aurai terminé l’enregistrement, je vous (envoyer) ___ un CD.');
    expect(data?.questions[5].accepted_answers).toContain('enverrai');
  });

  // ─── Tests Chapitre 10 (Le Plus-que-parfait) ───────────────────────────
  it('charge la série 10.1 avec 10 questions régulières de conjugaison (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Je (dîner) ___ place d’Italie.');
    expect(data?.questions[0].accepted_answers).toContain("J'avais dîné");
    expect(data?.questions[3].prompt).toBe('Elles (arriver) ___ à la réception en retard.');
    expect(data?.questions[3].accepted_answers).toContain('étaient arrivées');
    expect(data?.questions[8].prompt).toBe('Je (obtenir) ___ un nouveau poste.');
    expect(data?.questions[8].accepted_answers).toContain("J'avais obtenu");
    expect(data?.questions[9].prompt).toBe('Il (boire) ___ un très bon vin.');
    expect(data?.questions[9].accepted_answers).toContain('avait bu');
  });

  it('charge la série 10.2 avec 10 verbes pronominaux et accords (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex02'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[1].prompt).toBe('Nous (se réveiller) ___ à l’aube.');
    expect(data?.questions[1].accepted_answers).toContain('nous étions réveillés');
    expect(data?.questions[3].prompt).toBe('Elle (s’habiller) ___ pour la soirée.');
    expect(data?.questions[3].accepted_answers).toContain("s'était habillée");
    expect(data?.questions[5].prompt).toBe('Louise et Julie (se coucher) ___ tard.');
    expect(data?.questions[5].accepted_answers).toContain("s'étaient couchées");
    // Q10: s'écrire -> accord interdit (COI) !
    expect(data?.questions[9].prompt).toBe('Elles (s’écrire) ___ pendant des années.');
    expect(data?.questions[9].accepted_answers).toContain("s'étaient écrit");
  });

  it('charge la série 10.3 avec 10 phrases d\'antériorité contextuelle (fill_blank)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex03'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('Il était en retard car sa voiture (tomber) ___ en panne sur l’autoroute.');
    expect(data?.questions[0].accepted_answers).toContain('était tombée');
    expect(data?.questions[2].prompt).toBe('Elle a pensé que je (ne pas expliquer) ___ la situation.');
    expect(data?.questions[2].accepted_answers).toContain("n'avais pas expliqué");
    expect(data?.questions[3].prompt).toBe('Il a refusé de prendre le médicament que le médecin (prescrire) ___ .');
    expect(data?.questions[3].accepted_answers).toContain('avait prescrit');
    expect(data?.questions[5].prompt).toBe('Lorsque Lucie est arrivée, Paul (partir) ___ .');
    expect(data?.questions[5].accepted_answers).toContain('était parti');
  });

  it('charge la série 10.4 avec 5 associations logiques de correspondance (matching)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex04'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('matching');
    expect(data?.questions).toHaveLength(5);
    expect(data?.questions[0].prompt).toBe('Il avait commandé un sandwich');
    expect(data?.questions[0].accepted_answers).toContain('d');
    expect(data?.questions[1].prompt).toBe('Il était arrivé en retard');
    expect(data?.questions[1].accepted_answers).toContain('c');
    expect(data?.questions[2].prompt).toBe('Il avait perdu son carnet d’adresses');
    expect(data?.questions[2].accepted_answers).toContain('e');
    expect(data?.questions[3].prompt).toBe('Il avait échoué à son examen');
    expect(data?.questions[3].accepted_answers).toContain('b');
    expect(data?.questions[4].prompt).toBe('Il avait beaucoup souffert');
    expect(data?.questions[4].accepted_answers).toContain('a');
  });

  it('charge la série 10.5 avec 10 expressions de regret avec Si seulement (sentence_rewrite)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex05'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('(vous) (ne pas être) en retard');
    expect(data?.questions[0].accepted_answers).toContain("Si seulement vous n'aviez pas été en retard !");
    expect(data?.questions[1].prompt).toBe('(tu) (étudier) le français plus jeune');
    expect(data?.questions[1].accepted_answers).toContain("Si seulement tu avais étudié le français plus jeune !");
    expect(data?.questions[3].prompt).toBe('(elle) (rester) plus longtemps');
    expect(data?.questions[3].accepted_answers).toContain("Si seulement elle était restée plus longtemps !");
  });

  it('charge la série 10.6 avec 10 traductions actives (translation)', async () => {
    const { result } = renderHook(() => useExerciseSet('ch10-ex06'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

    const data = result.current.data;
    expect(data?.exerciseSet.interaction_type).toBe('translation');
    expect(data?.questions).toHaveLength(10);
    expect(data?.questions[0].prompt).toBe('He took the medicine the doctor had prescribed.');
    expect(data?.questions[0].accepted_answers).toContain('Il a pris le médicament que le médecin avait prescrit.');
    expect(data?.questions[1].prompt).toBe('She knew they had made a mistake.');
    expect(data?.questions[1].accepted_answers).toContain("Elle savait qu'ils avaient fait une erreur.");
    expect(data?.questions[5].prompt).toBe('If only he had not been late!');
    expect(data?.questions[5].accepted_answers).toContain("Si seulement il n'avait pas été en retard !");
  });

  describe('Séries et Moteurs de Jeu du Chapitre 11', () => {
    it('charge la série 11.1 (fill_blank) pour le conditionnel présent régulier et irrégulier', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('aller (nous)');
      expect(data?.questions[0].accepted_answers).toContain('irions');
      expect(data?.questions[3].prompt).toContain('avoir (je)');
      expect(data?.questions[3].accepted_answers).toContain("j'aurais");
    });

    it('charge la série 11.2 (fill_blank) pour le conditionnel et inversion de politesse', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('aller au théâtre');
      expect(data?.questions[0].accepted_answers).toContain('Iriez-vous');
      expect(data?.questions[1].prompt).toContain('passer chez vous');
      expect(data?.questions[1].accepted_answers).toContain('Pourrions-nous');
    });

    it('charge la série 11.3 (sentence_rewrite) pour Si + Imparfait', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('voyager');
      expect(data?.questions[0].accepted_answers).toContain("Si j'avais moins de travail, je voyagerais plus.");
    });

    it('charge la série 11.4 (sentence_rewrite) pour Conséquence et condition', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex04'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('Elle (être) contente');
      expect(data?.questions[0].accepted_answers).toContain('Elle serait contente si tu venais ce soir.');
    });

    it('charge la série 11.5 (translation) pour la traduction active du conditionnel', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex05'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('He would go to Paris if he had more time.');
      expect(data?.questions[0].accepted_answers).toContain("Il irait à Paris s'il avait plus de temps.");
    });

    it('charge la série 11.6 (matching) avec les 5 paires du Bestiaire (a à e)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex06'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('matching');
      expect(data?.questions).toHaveLength(5);
      expect(data?.questions[0].prompt).toBe('Le chat serait content');
      expect(data?.questions[0].accepted_answers).toContain('c');
      expect(data?.questions[0].options).toHaveLength(5);
    });

    it('charge la série 11.7 (sentence_rewrite) pour le passé du conditionnel puis plus-que-parfait', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex07'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('Nous (dîner) avec vous');
      expect(data?.questions[0].accepted_answers).toContain('Nous aurions dîné avec vous si nous avions pu.');
    });

    it('charge la série 11.8 (sentence_rewrite) pour les hypothèses irréelles du passé', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex08'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('S’il (finir) son projet');
      expect(data?.questions[0].accepted_answers).toContain("S'il avait fini son projet, il n'aurait pas dû travailler le week-end.");
    });

    it('charge la série 11.9 (translation) avec le conditionnel journalistique et de politesse', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex09'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('The prime minister reportedly went to China yesterday.');
      expect(data?.questions[0].accepted_answers).toContain('Le Premier ministre serait allé en Chine hier.');
    });

    it('charge la série 11.10 (matching) avec les 5 paires « Au cas où » (a à e)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch11-ex10'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('matching');
      expect(data?.questions).toHaveLength(5);
      expect(data?.questions[0].prompt).toBe('Au cas où il pleuvrait');
      expect(data?.questions[0].accepted_answers).toContain('c');
      expect(data?.questions[0].options).toHaveLength(5);
    });
  });

  describe('useExerciseSet Hook — Chapitre 12 (Could, should, would?)', () => {
    it('charge la série 12.1 (translation) pour les nuances de « Could » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Could you help clean the house after the party?');
      expect(data?.questions[0].accepted_answers).toContain('Pourriez-vous aider à nettoyer la maison après la soirée ?');
      expect(data?.questions[0].tokens).toBeDefined();
    });

    it('charge la série 12.2 (translation) pour le devoir et regret de « Should » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('You should learn to play the guitar.');
      expect(data?.questions[0].accepted_answers).toContain('Vous devriez apprendre à jouer de la guitare.');
      expect(data?.questions[1].prompt).toBe("They shouldn't have said that.");
      expect(data?.questions[1].accepted_answers).toContain("Ils n'auraient pas dû dire cela.");
    });

    it('charge la série 12.3 (translation) pour l’habitude passée et le refus avec « Would » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe("S'il était moins paresseux, il aurait de meilleures notes à l'école.");
      expect(data?.questions[0].accepted_answers).toContain('If he were less lazy, he would have better grades at school.');
    });

    it('charge la série 12.4 (translation) pour la révision mixte des modaux (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex04'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Could you read this document?');
      expect(data?.questions[0].accepted_answers).toContain('Pourrais-tu lire ce document ?');
    });

    it('charge la série 12.5 (translation) pour les instruments de musique et « jouer de » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex05'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Pourrais-tu ouvrir la porte ?');
      expect(data?.questions[0].accepted_answers).toContain('Could you open the door?');
    });

    it('charge la série 12.6 (matching) avec les 5 clauses logiques (a à e)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch12-ex06'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('matching');
      expect(data?.questions).toHaveLength(5);
      expect(data?.questions[0].prompt).toBe('Marie serait ravie');
      expect(data?.questions[0].accepted_answers).toContain('c');
      expect(data?.questions[0].options).toHaveLength(5);

      expect(data?.questions[4].prompt).toBe('Tu aurais dû');
      expect(data?.questions[4].accepted_answers).toContain('d');
    });
  });

  describe('useExerciseSet Hook — Chapitre 13 (The present and past subjunctive)', () => {
    it('charge la série 13.1 (fill_blank) pour le subjonctif présent régulier et verbes fréquents (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Elle préfère que tout le monde (être) __ là avant de commencer.');
      expect(data?.questions[0].accepted_answers).toContain('soit');
      expect(data?.questions[9].prompt).toBe("Le juge ne croit pas qu'il (dire) __ la vérité.");
      expect(data?.questions[9].accepted_answers).toContain('dise');
    });

    it('charge la série 13.2 (fill_blank) pour les verbes irréguliers du subjonctif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Il faut que vous (aller) __ voir ce film.');
      expect(data?.questions[0].accepted_answers).toContain('alliez');
      expect(data?.questions[9].prompt).toBe('Il est rare que nous (emporter) __ du travail à la maison.');
      expect(data?.questions[9].accepted_answers).toContain('emportions');
    });

    it('charge la série 13.3 (fill_blank) pour les conjonctions déclenchant le subjonctif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Il ne commencera pas son discours avant que vous (donner) __ le signal.');
      expect(data?.questions[0].accepted_answers).toContain('donniez');
      expect(data?.questions[9].prompt).toBe('Elle achètera un appareil numérique pour que sa fille (pouvoir) __ lui envoyer des photos au cours de son voyage.');
      expect(data?.questions[9].accepted_answers).toContain('puisse');
    });

    it('charge la série 13.4 (fill_blank) pour le contraste indicatif vs subjonctif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex04'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe("Il dit que leur page d'accueil (être) __ attrayante.");
      expect(data?.questions[0].accepted_answers).toContain('est');
      expect(data?.questions[1].prompt).toBe("Elle doute qu'il (faire) __ chaud demain.");
      expect(data?.questions[1].accepted_answers).toContain('fasse');
    });

    it('charge la série 13.5 (fill_blank) pour les nuances de certitude et d’opinion (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex05'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Il est rare que nous (voyager) __ dans cette région.');
      expect(data?.questions[0].accepted_answers).toContain('voyagions');
      expect(data?.questions[1].prompt).toBe('Il me semble que vous (se tromper) __ souvent.');
      expect(data?.questions[1].accepted_answers).toContain('vous trompez');
    });

    it('charge la série 13.6 (translation) avec « Pourvu que » et le subjonctif de souhait (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex06'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe("Let's hope he is right!");
      expect(data?.questions[0].accepted_answers).toContain("Pourvu qu'il ait raison !");
      expect(data?.questions[0].tokens).toBeDefined();
    });

    it('charge la série 13.7 (fill_blank) pour le subjonctif passé (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex07'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Je doute que tu (lire) __ tout le livre.');
      expect(data?.questions[0].accepted_answers).toContain('aies lu');
      expect(data?.questions[7].prompt).toBe("Il a envoyé le courriel avant que je (pouvoir) __ ajouter un mot.");
      expect(data?.questions[7].accepted_answers).toContain("aie pu");
    });

    it('charge la série 13.8 (sentence_rewrite) de conversion présent vers passé du subjonctif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex08'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Il est content que nous partions.');
      expect(data?.questions[0].accepted_answers).toContain('Il est content que nous soyons partis.');
      expect(data?.questions[0].tokens).toBeDefined();
    });

    it('charge la série 13.9 (matching) d’associations logiques subjonctif/indicatif (5 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch13-ex09'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('matching');
      expect(data?.questions).toHaveLength(5);
      expect(data?.questions[0].prompt).toBe('Je pense');
      expect(data?.questions[0].accepted_answers).toContain('d');
      expect(data?.questions[0].options).toHaveLength(5);
      expect(data?.questions[4].prompt).toBe('Ils sont ravis');
      expect(data?.questions[4].accepted_answers).toContain('b');
    });
  });

  describe('useExerciseSet Hook — Chapitre 14 (The infinitive mood)', () => {
    it('charge la série 14.1 (translation) avec infinitif sujet et négation en bloc (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Writing this book was a challenge.');
      expect(data?.questions[0].accepted_answers).toContain('Écrire ce livre était un défi.');
      expect(data?.questions[0].tokens).toBeDefined();
      expect(data?.questions[4].prompt).toBe('Walking along the Seine is pleasant.');
      expect(data?.questions[4].accepted_answers).toContain('Marcher le long de la Seine est agréable.');
      expect(data?.questions[9].prompt).toBe('Do not put in any garlic.');
      expect(data?.questions[9].accepted_answers).toContain("Ne pas mettre d'ail.");
    });

    it('charge la série 14.2 (sentence_rewrite) pour les verbes de posture et expressions avec « à » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Elle passe ses après-midi (cooking).');
      expect(data?.questions[0].accepted_answers).toContain('Elle passe ses après-midi à faire la cuisine.');
      expect(data?.questions[0].tokens).toBeDefined();
      expect(data?.questions[9].prompt).toBe('Ils passent leurs journées (shopping).');
      expect(data?.questions[9].accepted_answers).toContain('Ils passent leurs journées à faire les courses.');
    });

    it('charge la série 14.3 (fill_blank) pour la formation de l infinitif passé (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('dormir __');
      expect(data?.questions[0].accepted_answers).toContain('avoir dormi');
      expect(data?.questions[1].prompt).toBe('aller __');
      expect(data?.questions[1].accepted_answers).toContain('être allé');
      expect(data?.questions[9].prompt).toBe('allumer __');
      expect(data?.questions[9].accepted_answers).toContain('avoir allumé');
    });

    it('charge la série 14.4 (sentence_rewrite) de transformation « avant de » vers « après » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex04'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Elle prend des vacances avant de compléter son projet.');
      expect(data?.questions[0].accepted_answers).toContain('Elle prend des vacances après avoir complété son projet.');
      expect(data?.questions[0].tokens).toBeDefined();
      expect(data?.questions[2].prompt).toBe('Je prépare un thé avant de cueillir des fruits.');
      expect(data?.questions[2].accepted_answers).toContain('Je prépare un thé après avoir cueilli des fruits.');
      expect(data?.questions[5].prompt).toBe("Elle se maquille avant de s'habiller.");
      expect(data?.questions[5].accepted_answers).toContain("Elle se maquille après s'être habillée.");
    });

    it('charge la série 14.5 (fill_blank) pour les verbes directs avec infinitif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex05'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Il (détester) __ attendre.');
      expect(data?.questions[0].accepted_answers).toContain('déteste');
      expect(data?.questions[9].prompt).toBe('Vous (aller) __ passer une bonne soirée.');
      expect(data?.questions[9].accepted_answers).toContain('allez');
    });

    it('charge la série 14.6 (fill_blank) pour le choix des prépositions « à » ou « de » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex06'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe("J'ai appris __ faire une mousse au chocolat.");
      expect(data?.questions[0].accepted_answers).toContain('à');
      expect(data?.questions[1].prompt).toBe("Ils ont choisi __ s'installer dans une région gastronomique.");
      expect(data?.questions[1].accepted_answers).toContain('de');
    });

    it('charge la série 14.7 (translation) de thème grammatical global (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch14-ex07'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('They want to travel to France.');
      expect(data?.questions[0].accepted_answers).toContain('Ils veulent voyager en France.');
      expect(data?.questions[0].tokens).toBeDefined();
      expect(data?.questions[9].prompt).toBe('Try to understand the situation!');
      expect(data?.questions[9].accepted_answers).toContain('Essayez de comprendre la situation !');
    });
  });

  describe('useExerciseSet Hook — Chapitre 15 (The present participle and the gerundive)', () => {
    it('charge la série 15.1 (fill_blank) pour la morphologie du participe présent (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch15-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('finir __');
      expect(data?.questions[0].accepted_answers).toContain('finissant');
      expect(data?.questions[1].prompt).toBe('savoir __');
      expect(data?.questions[1].accepted_answers).toContain('sachant');
      expect(data?.questions[3].prompt).toBe('protéger __');
      expect(data?.questions[3].accepted_answers).toContain('protégeant');
      expect(data?.questions[6].prompt).toBe('avancer __');
      expect(data?.questions[6].accepted_answers).toContain('avançant');
      expect(data?.questions[7].prompt).toBe('être __');
      expect(data?.questions[7].accepted_answers).toContain('étant');
      expect(data?.questions[9].prompt).toBe('vendre __');
      expect(data?.questions[9].accepted_answers).toContain('vendant');
    });

    it('charge la série 15.2 (fill_blank) pour le gérondif en contexte (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch15-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('C’est en (faire) __ de l’exercice que vous serez en forme.');
      expect(data?.questions[0].accepted_answers).toContain('faisant');
      expect(data?.questions[1].prompt).toBe('Elle chante en (prendre) __ une douche.');
      expect(data?.questions[1].accepted_answers).toContain('prenant');
      expect(data?.questions[6].prompt).toBe('Tout en (se plaindre) __ , elle avait l’air satisfaite.');
      expect(data?.questions[6].accepted_answers).toContain('se plaignant');
      expect(data?.questions[9].prompt).toBe('Il a tout perdu en (parier) __ tous les jours au casino.');
      expect(data?.questions[9].accepted_answers).toContain('pariant');
    });

    it('charge la série 15.3 (translation) de thème intégratif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch15-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('He lost his keys while walking in the park.');
      expect(data?.questions[0].accepted_answers).toContain('Il a perdu ses clés en marchant dans le parc.');
      expect(data?.questions[0].tokens).toBeDefined();
      expect(data?.questions[5].prompt).toBe('It was a fascinating game.');
      expect(data?.questions[5].accepted_answers).toContain('C’était un match fascinant.');
      expect(data?.questions[9].prompt).toBe('He fell while jumping over the wall.');
      expect(data?.questions[9].accepted_answers).toContain('Il est tombé en sautant par-dessus le mur.');
    });
  });

  describe('useExerciseSet Hook — Chapitre 16 (The passé simple)', () => {
    it('charge la série 16.1 (fill_blank) pour la reconnaissance morphologique des infinitifs (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch16-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('Ils furent de grands collectionneurs');
      expect(data?.questions[0].accepted_answers).toContain('être');
      expect(data?.questions[1].prompt).toContain('J’eus un profond respect');
      expect(data?.questions[1].accepted_answers).toContain('avoir');
      expect(data?.questions[2].prompt).toContain('Elles peignirent des natures mortes');
      expect(data?.questions[2].accepted_answers).toContain('peindre');
      expect(data?.questions[3].prompt).toContain('Nous fîmes un tour de son atelier');
      expect(data?.questions[3].accepted_answers).toContain('faire');
      expect(data?.questions[4].prompt).toContain('Il vint nous rejoindre au vernissage');
      expect(data?.questions[4].accepted_answers).toContain('venir');
      expect(data?.questions[7].prompt).toContain('Elle sut tout de suite que c’était un chef-d’œuvre');
      expect(data?.questions[7].accepted_answers).toContain('savoir');
      expect(data?.questions[8].prompt).toContain('Il plut à tout le monde');
      expect(data?.questions[8].accepted_answers).toContain('plaire');
      expect(data?.questions[9].prompt).toContain('J’éteignis la lumière');
      expect(data?.questions[9].accepted_answers).toContain('éteindre');
    });

    it('charge la série 16.2 (fill_blank) pour la conjugaison historique au passé simple (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch16-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('fill_blank');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toContain('Le Rouge et le noir (être)');
      expect(data?.questions[0].accepted_answers).toContain('fut');
      expect(data?.questions[1].prompt).toContain('En France, les femmes (obtenir)');
      expect(data?.questions[1].accepted_answers).toContain('obtinrent');
      expect(data?.questions[2].prompt).toContain('Jacques Cartier (explorer)');
      expect(data?.questions[2].accepted_answers).toContain('explora');
      expect(data?.questions[3].prompt).toContain('Charles de Gaulle (mourir)');
      expect(data?.questions[3].accepted_answers).toContain('mourut');
      expect(data?.questions[4].prompt).toContain('Édouard Manet (peindre)');
      expect(data?.questions[4].accepted_answers).toContain('peignit');
      expect(data?.questions[5].prompt).toContain('La terre (trembler)');
      expect(data?.questions[5].accepted_answers).toContain('trembla');
      expect(data?.questions[6].prompt).toContain('Catherine de Médicis (introduire)');
      expect(data?.questions[6].accepted_answers).toContain('introduisit');
      expect(data?.questions[7].prompt).toContain('Le voyage inaugural du TGV (avoir lieu)');
      expect(data?.questions[7].accepted_answers).toContain('eut lieu');
      expect(data?.questions[8].prompt).toContain('Johnny Hallyday (faire)');
      expect(data?.questions[8].accepted_answers).toContain('fit');
      expect(data?.questions[9].prompt).toContain('La Côte d’Ivoire (devenir)');
      expect(data?.questions[9].accepted_answers).toContain('devint');
    });

    it('charge la série 16.3 (translation) pour la traduction littéraire vers le passé simple (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch16-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('He lived in Amsterdam for ten years.');
      expect(data?.questions[0].accepted_answers).toContain('Il vécut dix ans à Amsterdam.');
      expect(data?.questions[1].prompt).toBe('She introduced this new method.');
      expect(data?.questions[1].accepted_answers).toContain('Elle introduisit cette nouvelle méthode.');
      expect(data?.questions[2].prompt).toBe('They read all his books.');
      expect(data?.questions[2].accepted_answers).toContain('Ils lurent tous ses livres.');
      expect(data?.questions[2].accepted_answers).toContain('Elles lurent tous ses livres.');
      expect(data?.questions[3].prompt).toBe('He died in Italy.');
      expect(data?.questions[3].accepted_answers).toContain('Il mourut en Italie.');
      expect(data?.questions[4].prompt).toBe('He was surprised.');
      expect(data?.questions[4].accepted_answers).toContain('Il fut surpris.');
      expect(data?.questions[5].prompt).toBe('I wanted to thank him.');
      expect(data?.questions[5].accepted_answers).toContain('Je voulus le remercier.');
      expect(data?.questions[6].prompt).toBe('She was born in Rouen.');
      expect(data?.questions[6].accepted_answers).toContain('Elle naquit à Rouen.');
      expect(data?.questions[7].prompt).toBe('They bought a new easel.');
      expect(data?.questions[7].accepted_answers).toContain('Ils achetèrent un nouveau chevalet.');
      expect(data?.questions[8].prompt).toBe('She became a portrait painter.');
      expect(data?.questions[8].accepted_answers).toContain('Elle devint portraitiste.');
      expect(data?.questions[9].prompt).toBe('He smiled and left.');
      expect(data?.questions[9].accepted_answers).toContain('Il sourit et partit.');
    });
  });

  describe('useExerciseSet Hook — Chapitre 17 (The passive voice)', () => {
    it('charge la série 17.1 (sentence_rewrite) pour la transformation active vers passive (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch17-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Le policier a attrapé le voleur.');
      expect(data?.questions[0].accepted_answers).toContain('Le voleur a été attrapé par le policier.');
      expect(data?.questions[0].tokens).toBeDefined();

      expect(data?.questions[2].prompt).toBe('Le médecin prescrit un nouveau traitement.');
      expect(data?.questions[2].accepted_answers).toContain('Un nouveau traitement est prescrit par le médecin.');

      expect(data?.questions[7].prompt).toBe("Le marchand d'art vendra un célèbre tableau.");
      expect(data?.questions[7].accepted_answers).toContain("Un célèbre tableau sera vendu par le marchand d'art.");

      expect(data?.questions[8].prompt).toBe('Les envahisseurs prennent la forteresse.');
      expect(data?.questions[8].accepted_answers).toContain('La forteresse est prise par les envahisseurs.');

      expect(data?.questions[9].prompt).toBe('Le professeur félicite les étudiants.');
      expect(data?.questions[9].accepted_answers).toContain('Les étudiants sont félicités par le professeur.');
    });

    it('charge la série 17.2 (sentence_rewrite) pour le rétablissement de la voix active (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch17-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Le gâteau a été fait par le chef.');
      expect(data?.questions[0].accepted_answers).toContain('Le chef a fait le gâteau.');
      expect(data?.questions[0].tokens).toBeDefined();

      expect(data?.questions[3].prompt).toBe("Le document sera signé par l'ambassadeur.");
      expect(data?.questions[3].accepted_answers).toContain("L'ambassadeur signera le document.");

      expect(data?.questions[5].prompt).toBe('Le fauteuil est griffé par le chat.');
      expect(data?.questions[5].accepted_answers).toContain('Le chat griffe le fauteuil.');

      expect(data?.questions[6].prompt).toBe("L'amende a été payée par le malfaiteur.");
      expect(data?.questions[6].accepted_answers).toContain("Le malfaiteur a payé l'amende.");

      expect(data?.questions[9].prompt).toBe('Les élèves sont punis par le professeur.');
      expect(data?.questions[9].accepted_answers).toContain('Le professeur punit les élèves.');
    });

    it('charge la série 17.3 (translation) pour la traduction vers la voix passive avec choix par/de (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch17-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('The castle is being built by the queen.');
      expect(data?.questions[0].accepted_answers).toContain('Le château est construit par la reine.');

      expect(data?.questions[1].prompt).toBe('The painting was stolen by an art dealer.');
      expect(data?.questions[1].accepted_answers).toContain("Le tableau a été volé par un marchand d'art.");

      expect(data?.questions[3].prompt).toBe('This verb is followed by the indicative (mood).');
      expect(data?.questions[3].accepted_answers).toContain("Ce verbe est suivi de l'indicatif.");

      expect(data?.questions[4].prompt).toBe('The house is surrounded by the police.');
      expect(data?.questions[4].accepted_answers).toContain('La maison est entourée par la police.');

      expect(data?.questions[7].prompt).toBe('The decision was made on Monday.');
      expect(data?.questions[7].accepted_answers).toContain('La décision a été prise lundi.');

      expect(data?.questions[9].prompt).toBe('The house is surrounded by trees.');
      expect(data?.questions[9].accepted_answers).toContain("La maison est entourée d'arbres.");
    });
  });

  describe('Chapitre 18: Indirect speech (Le discours indirect)', () => {
    it('charge la série 18.1 (sentence_rewrite) pour les questions indirectes commençant par « Il veut savoir si » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch18-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Le programme du parti est bien défini.');
      expect(data?.questions[0].accepted_answers).toContain('Il veut savoir si le programme du parti est bien défini.');
      expect(data?.questions[0].tokens).toBeDefined();

      expect(data?.questions[1].prompt).toBe('Nous allons boycotter les prochaines élections.');
      expect(data?.questions[1].accepted_answers).toContain('Il veut savoir si nous allons boycotter les prochaines élections.');

      expect(data?.questions[4].prompt).toBe('Elle acceptera notre proposition.');
      expect(data?.questions[4].accepted_answers).toContain('Il veut savoir si elle acceptera notre proposition.');

      expect(data?.questions[9].prompt).toBe('La parité sera jamais réalisée.');
      expect(data?.questions[9].accepted_answers).toContain('Il veut savoir si la parité sera jamais réalisée.');
    });

    it('charge la série 18.2 (sentence_rewrite) pour relier les propositions avec « Que » et connecteurs (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch18-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);
      expect(data?.questions[0].prompt).toBe('Elle sera absente mardi. (Elle annonce que)');
      expect(data?.questions[0].accepted_answers).toContain('Elle annonce qu’elle sera absente mardi.');
      expect(data?.questions[0].accepted_answers).toContain("Elle annonce qu'elle sera absente mardi.");

      expect(data?.questions[1].prompt).toBe('Paul s’est trompé. (Ils avouent que)');
      expect(data?.questions[1].accepted_answers).toContain('Ils avouent que Paul s’est trompé.');

      expect(data?.questions[2].prompt).toBe('Ses produits sont les meilleurs. (La marchande dit)');
      expect(data?.questions[2].accepted_answers).toContain('La marchande dit que ses produits sont les meilleurs.');

      expect(data?.questions[7].prompt).toBe('Il n’est jamais allé en France. (Elle nous apprend que)');
      expect(data?.questions[7].accepted_answers).toContain('Elle nous apprend qu’il n’est jamais allé en France.');

      expect(data?.questions[9].prompt).toBe('Où habite le peintre ? (Il ignore)');
      expect(data?.questions[9].accepted_answers).toContain('Il ignore où le peintre habite.');
    });

    it('charge la série 18.3 (sentence_rewrite) pour la concordance des temps au passé avec « J’ai entendu dire que » (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch18-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);

      // Passé composé -> Plus-que-parfait
      expect(data?.questions[0].prompt).toBe('Tu as accepté leur offre la semaine dernière.');
      expect(data?.questions[0].accepted_answers).toContain('J’ai entendu dire que tu avais accepté leur offre la semaine dernière.');

      // Passé composé -> Plus-que-parfait avec élision
      expect(data?.questions[1].prompt).toBe('Elle a vendu sa voiture hier.');
      expect(data?.questions[1].accepted_answers).toContain('J’ai entendu dire qu’elle avait vendu sa voiture hier.');

      // Futur simple -> Conditionnel présent
      expect(data?.questions[2].prompt).toBe('Tu travailleras à Chicago l’an prochain.');
      expect(data?.questions[2].accepted_answers).toContain('J’ai entendu dire que tu travaillerais à Chicago l’an prochain.');

      // Présent -> Imparfait
      expect(data?.questions[5].prompt).toBe('Il fait froid en Alaska aujourd’hui.');
      expect(data?.questions[5].accepted_answers).toContain('J’ai entendu dire qu’il faisait froid en Alaska aujourd’hui.');

      // Pronominal passé composé -> plus-que-parfait
      expect(data?.questions[4].prompt).toBe('Ils se sont mariés le mois dernier.');
      expect(data?.questions[4].accepted_answers).toContain('J’ai entendu dire qu’ils s’étaient mariés le mois dernier.');
    });

    it('charge la série 18.4 (translation) pour la traduction de phrases complexes avec concordance (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch18-ex04'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);

      expect(data?.questions[0].prompt).toBe('They know you are living in Paris.');
      expect(data?.questions[0].accepted_answers).toContain('Ils savent que vous habitez à Paris.');

      expect(data?.questions[1].prompt).toBe('I have heard you are living in Paris.');
      expect(data?.questions[1].accepted_answers).toContain('J’ai entendu dire que vous habitiez à Paris.');

      expect(data?.questions[2].prompt).toBe('I heard you lived in Paris in 2020.');
      expect(data?.questions[2].accepted_answers).toContain('J’ai entendu dire que vous aviez vécu à Paris en 2020.');

      expect(data?.questions[3].prompt).toBe('I heard you’ll go to Paris next year.');
      expect(data?.questions[3].accepted_answers).toContain('J’ai entendu dire que vous iriez à Paris l’année prochaine.');

      expect(data?.questions[8].prompt).toBe('I was told that you voted for me.');
      expect(data?.questions[8].accepted_answers).toContain('On m’a dit que vous aviez voté pour moi.');

      expect(data?.questions[9].prompt).toBe('We realize she has a chance of winning.');
      expect(data?.questions[9].accepted_answers).toContain('Nous nous rendons compte qu’elle a une chance de gagner.');
    });
  });

  describe('useExerciseSet Hook — Chapitre 19 (The imperative mood)', () => {
    it('charge la série 19.1 (sentence_rewrite) pour la formation de l\'impératif et chute du -s aux verbes en -er (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch19-ex01'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);

      // Verbe 3e groupe garde le -s
      expect(data?.questions[0].prompt).toBe('Prendre le train de neuf heures. (tu)');
      expect(data?.questions[0].accepted_answers).toContain('Prends le train de neuf heures !');

      // Verbe 1er groupe avec vous
      expect(data?.questions[1].prompt).toBe('Regarder le film à la télé ce soir. (vous)');
      expect(data?.questions[1].accepted_answers).toContain('Regardez le film à la télé ce soir !');

      // Verbe en -er perd le -s et prend l'accent grave
      expect(data?.questions[3].prompt).toBe('Acheter le journal. (tu)');
      expect(data?.questions[3].accepted_answers).toContain('Achète le journal !');

      // Verbe en -eler double la consonne et perd le -s
      expect(data?.questions[7].prompt).toBe('Épeler ton nom. (tu)');
      expect(data?.questions[7].accepted_answers).toContain('Épelle ton nom !');

      // Verbe en -er négatif avec élision
      expect(data?.questions[9].prompt).toBe('Ne pas inviter Denis. (tu)');
      expect(data?.questions[9].accepted_answers).toContain('N’invite pas Denis !');
      expect(data?.questions[9].accepted_answers).toContain('N\'invite pas Denis !');
    });

    it('charge la série 19.2 (sentence_rewrite) pour l\'impératif des verbes pronominaux affirmatifs et négatifs (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch19-ex02'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('sentence_rewrite');
      expect(data?.questions).toHaveLength(10);

      // Affirmatif : verbe + trait d'union + toi (chute du -s)
      expect(data?.questions[0].prompt).toBe('Se laver les mains. (tu)');
      expect(data?.questions[0].accepted_answers).toContain('Lave-toi les mains !');

      // Affirmatif vous
      expect(data?.questions[1].prompt).toBe('Se balader dans la forêt. (vous)');
      expect(data?.questions[1].accepted_answers).toContain('Baladez-vous dans la forêt.');

      // Négatif : ne + te + verbe + pas (le pronom redevient te)
      expect(data?.questions[3].prompt).toBe('Ne pas se coucher trop tard. (tu)');
      expect(data?.questions[3].accepted_answers).toContain('Ne te couche pas trop tard !');

      // Affirmatif se dépêcher
      expect(data?.questions[8].prompt).toBe('Se dépêcher. (tu)');
      expect(data?.questions[8].accepted_answers).toContain('Dépêche-toi !');
    });

    it('charge la série 19.3 (translation) pour la traduction thématique et l\'impératif actif (10 questions)', async () => {
      const { result } = renderHook(() => useExerciseSet('ch19-ex03'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 4000 });

      const data = result.current.data;
      expect(data?.exerciseSet.interaction_type).toBe('translation');
      expect(data?.questions).toHaveLength(10);

      // Don't forget your passport!
      expect(data?.questions[0].prompt).toBe('Don’t forget your passport! (tu)');
      expect(data?.questions[0].accepted_answers).toContain('N’oublie pas ton passeport !');
      expect(data?.questions[0].accepted_answers).toContain('N\'oublie pas ton passeport !');

      // Bring your identification card!
      expect(data?.questions[2].prompt).toBe('Bring your identification card! (vous)');
      expect(data?.questions[2].accepted_answers).toContain('Apportez votre carte d’identité !');

      // Don't be late! (irrégulier être)
      expect(data?.questions[5].prompt).toBe('Don’t be late! (vous)');
      expect(data?.questions[5].accepted_answers).toContain('Ne soyez pas en retard !');

      // Wait for me! (faux-ami attendre + moi)
      expect(data?.questions[8].prompt).toBe('Wait for me! (vous)');
      expect(data?.questions[8].accepted_answers).toContain('Attendez-moi !');
    });
  });
});
