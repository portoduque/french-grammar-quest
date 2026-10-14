/**
 * French Grammar Quest - Motor de Avaliação Pedagógica de Respostas (FLE)
 *
 * Regras implementadas (PRD §11.1, AC-05, AC-06, AC-07, AC-08, T-003, T-004, T-005):
 * - Normalização Unicode NFC estrita
 * - Equivalência de apóstrofos tipográficos (‘, ’, ´, `) com o apóstrofo padrão ASCII (')
 * - Rigor fonético e ortográfico francês (preservação estrita de acentos: a ≠ à, ou ≠ où, e ≠ é/è/ê)
 * - Elisão inteligente em verbos e pronomes (ex: "Je" + "habiter" aceita tanto "J'habite" quanto "habite" / "j'habite")
 * - Classificação precisa de status: 'correct' | 'incorrect' | 'needs_review' | 'self_reviewed'
 * - Feedback pedagógico de Francês Língua Estrangeira (FLE) para lusófonos
 */

export type EvaluationStatus =
  | 'correct'
  | 'incorrect'
  | 'needs_review'
  | 'self_reviewed'
  | 'blocked'
  | 'ungradable';

export interface EvaluationResult {
  status: EvaluationStatus;
  score: number; // 1.0 para acerto, 0.0 para erro, 0.5 para revisão/parcial
  userAnswerCleaned: string;
  canonicalAnswer: string;
  allAcceptedAnswers: string[];
  feedback: {
    title: string;
    message: string;
    pedagogicalTip?: string;
  };
}

export interface EvaluationOptions {
  interactionType: 'fill_blank' | 'matching' | 'translation' | 'sentence_rewrite' | 'ordering' | 'multiple_choice' | string;
  prompt?: string;
  instruction?: string;
  presentation?: {
    source_subject?: string;
    required_subject?: string;
    overrides_instruction_default?: string;
  };
}

/**
 * Normaliza uma string para avaliação:
 * - Normalização Unicode NFC
 * - Normalização de apóstrofos (’, ‘, ´, ` -> ')
 * - Remoção de espaços duplos e trim
 * - Unificação de pontuação opcional no final
 */
export function normalizeFrenchText(text: string): string {
  if (!text) return '';

  return text
    .normalize('NFC')
    // Substituir variações de apóstrofo por apóstrofo ASCII simples
    .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
    // Substituir espaços não separáveis ou múltiplos espaços por espaço simples
    .replace(/[\u00A0\s]+/g, ' ')
    .trim();
}

/**
 * Remove pontuação final comum (. ! ?) para comparação flexível de final de frase
 */
export function stripTrailingPunctuation(text: string): string {
  return text.replace(/[.!?]+$/, '').trim();
}

/**
 * Verifica se a resposta do usuário é compatível com uma resposta aceita,
 * considerando elisões e variações de maiúsculas/minúsculas.
 */
function isAnswerMatch(
  userText: string,
  targetAnswer: string,
  _interactionType: string,
  prompt?: string
): boolean {
  const normUser = normalizeFrenchText(userText);
  const normTarget = normalizeFrenchText(targetAnswer);

  if (!normUser || !normTarget) return false;

  // Comparação exata (case-sensitive)
  if (normUser === normTarget) return true;

  // Comparação case-insensitive preservando acentos
  if (normUser.toLowerCase() === normTarget.toLowerCase()) return true;

  // Comparação sem pontuação terminal (ex: "Il parle français" vs "Il parle français.")
  if (stripTrailingPunctuation(normUser).toLowerCase() === stripTrailingPunctuation(normTarget).toLowerCase()) {
    return true;
  }

  // Tratamento de elisão (AC-06 / T-003):
  // Caso 1: Aluno digitou "J'habite" e a chave é "habite", ou vice-versa, com prompt contendo "Je"
  const userNoSubject = normUser.replace(/^(j'|je\s+|tu\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\s+|elles\s+)/i, '');
  const targetNoSubject = normTarget.replace(/^(j'|je\s+|tu\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\s+|elles\s+)/i, '');

  if (userNoSubject && targetNoSubject) {
    if (userNoSubject.toLowerCase() === targetNoSubject.toLowerCase()) {
      return true;
    }
  }

  // Caso 2: Prompt tem "Je" seguido de lacuna e verbo que começa com vogal/h mudo (ex: aimer, habiter)
  // Se o aluno digitou "J'habite" ou "j'aime" ou simplesmente "habite" ou "aime"
  if (prompt && /je\s*[_.]+/i.test(prompt)) {
    if (normUser.toLowerCase() === `j'${normTarget.toLowerCase()}`) {
      return true;
    }
    if (normTarget.toLowerCase() === `j'${normUser.toLowerCase()}`) {
      return true;
    }
  }

  return false;
}

/**
 * Remove acentos/diacríticos de uma string para comparação de base ortográfica
 */
export function stripAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Avalia a resposta de uma questão contra a lista de respostas aceitas e o tipo de interação
 */
export function evaluateAnswer(
  userAnswer: string,
  acceptedAnswers: string[],
  options: EvaluationOptions
): EvaluationResult {
  const cleanedUserAnswer = normalizeFrenchText(userAnswer);
  const canonical = acceptedAnswers[0] || '';
  const allAccepted = acceptedAnswers.map(normalizeFrenchText);

  // Se o usuário não inseriu nada
  if (!cleanedUserAnswer) {
    return {
      status: 'incorrect',
      score: 0,
      userAnswerCleaned: '',
      canonicalAnswer: canonical,
      allAcceptedAnswers: allAccepted,
      feedback: {
        title: 'Réponse vide',
        message: 'Veuillez saisir votre réponse pour continuer.',
        pedagogicalTip: 'Prenez votre temps pour réfléchir à la règle de grammaire.'
      }
    };
  }

  // 1. Verificar correspondência com qualquer resposta aceita
  const isCorrect = allAccepted.some(acc =>
    isAnswerMatch(cleanedUserAnswer, acc, options.interactionType, options.prompt)
  );

  if (isCorrect) {
    let tip: string | undefined;

    // Dica de reforço fonético e pedagógico para certos padrões comuns
    if (options.interactionType === 'fill_blank') {
      if (/ons$/i.test(cleanedUserAnswer)) {
        tip = '💡 Astuce FLE : Avec « nous », la terminaison est presque toujours -ons, sauf pour « être » (nous sommes).';
      } else if (/ent$/i.test(cleanedUserAnswer)) {
        tip = '💡 Astuce FLE : Attention à l\'oral ! La terminaison -ent des verbes au présent est muette (silencieuse).';
      } else if (cleanedUserAnswer.startsWith("j'") || cleanedUserAnswer.startsWith("J'")) {
        tip = '💡 Astuce FLE : Excellente élision ! Devant une voyelle ou un h muet, « je » devient « j\' ».';
      }
    }

    return {
      status: 'correct',
      score: 1.0,
      userAnswerCleaned: cleanedUserAnswer,
      canonicalAnswer: canonical,
      allAcceptedAnswers: allAccepted,
      feedback: {
        title: 'C’est exact ! 🎉',
        message: 'Excellente réponse ! Continuez ainsi.',
        pedagogicalTip: tip
      }
    };
  }

  // 2. Se for exercício de tradução livre (translation / free_response)
  // Regra AC-08 / T-005: respostas de tradução aberta não devem ser reprovadas automaticamente
  // pois há muitas variações sinônimas. Entra em status 'needs_review'.
  if (options.interactionType === 'translation' || options.interactionType === 'free_response') {
    return {
      status: 'needs_review',
      score: 0.5,
      userAnswerCleaned: cleanedUserAnswer,
      canonicalAnswer: canonical,
      allAcceptedAnswers: allAccepted,
      feedback: {
        title: 'À vérifier 🧐',
        message: 'Votre traduction diffère de la réponse modèle du manuel. Comparez votre réponse avec la référence.',
        pedagogicalTip: '💡 Le français permet parfois plusieurs tournures. Vérifiez le temps, les accords et les pronoms.'
      }
    };
  }

  // 3. Resposta Incorreta em exercícios objetivos (fill_blank, matching, ordering, multiple_choice)
  let pedagogicalExplanation = 'Revoyez la règle de conjugaison ou d\'accord associée.';

  // Análise de erros específicos de lusófonos (Regra 11 - Professor FLE)
  if (options.interactionType === 'fill_blank') {
    // Esqueceu acento grave ou agudo (ex: a vs à, prefere vs préfère)
    const userStripped = stripAccents(cleanedUserAnswer);
    const canonicalStripped = stripAccents(canonical);
    if (userStripped === canonicalStripped && cleanedUserAnswer.toLowerCase() !== canonical.toLowerCase()) {
      pedagogicalExplanation = '⚠️ Attention aux accents ! En français, les accents (é, è, à, ç) changent la prononciation ou le sens des mots.';
    } else if (canonical.startsWith("j'") && cleanedUserAnswer.toLowerCase().startsWith('je')) {
      pedagogicalExplanation = '⚠️ N\'oubliez pas l\'élision obligatoire : « je » devient « j\' » devant une voyelle ou un h muet.';
    } else if (/e[zs]$/i.test(cleanedUserAnswer) && /ent$/i.test(canonical)) {
      pedagogicalExplanation = '⚠️ Attention à la personne : avec « ils / elles », la terminaison du 1er groupe est -ent (muette).';
    }
  } else if (options.interactionType === 'matching') {
    pedagogicalExplanation = 'Vérifiez la concordance entre le sujet et le verbe ou le complément correspondant.';
  }

  return {
    status: 'incorrect',
    score: 0,
    userAnswerCleaned: cleanedUserAnswer,
    canonicalAnswer: canonical,
    allAcceptedAnswers: allAccepted,
    feedback: {
      title: 'Pas tout à fait... ❌',
      message: `La réponse attendue était : « ${canonical} ».`,
      pedagogicalTip: pedagogicalExplanation
    }
  };
}
