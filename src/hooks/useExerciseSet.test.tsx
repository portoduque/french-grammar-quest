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
});
