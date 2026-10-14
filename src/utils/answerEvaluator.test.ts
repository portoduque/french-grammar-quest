import { describe, it, expect } from 'vitest';
import {
  evaluateAnswer,
  normalizeFrenchText,
  stripTrailingPunctuation
} from './answerEvaluator';

describe('answerEvaluator (Moteur d\'évaluation FLE)', () => {
  describe('normalizeFrenchText', () => {
    it('normaliza apóstrofos tipográficos para apóstrofo ASCII simples', () => {
      expect(normalizeFrenchText('J’aime')).toBe("J'aime");
      expect(normalizeFrenchText('l‘homme')).toBe("l'homme");
      expect(normalizeFrenchText('c`est')).toBe("c'est");
    });

    it('aplica normalização Unicode NFC e limpa espaços múltiplos', () => {
      // 'e' + combining acute accent -> NFC 'é'
      const decomposed = 'e\u0301tudiant';
      const nfc = normalizeFrenchText(decomposed);
      expect(nfc).toBe('étudiant');
      expect(nfc.length).toBe(8);

      expect(normalizeFrenchText('  nous   parlons   ')).toBe('nous parlons');
    });
  });

  describe('stripTrailingPunctuation', () => {
    it('remove pontos e exclamações do final da frase', () => {
      expect(stripTrailingPunctuation('Il habite à Paris.')).toBe('Il habite à Paris');
      expect(stripTrailingPunctuation('Quelle surprise !')).toBe('Quelle surprise');
      expect(stripTrailingPunctuation('Bonjour')).toBe('Bonjour');
    });
  });

  describe('Critérios de Validação da Etapa 4', () => {
    // 1. AC-06, T-003: "Je" + lacuna + habiter -> aceita "J'habite" e elisões
    it('AC-06 / T-003: aceita J\'habite quando o aluno digita a elisão completa', () => {
      const result = evaluateAnswer(
        "J'habite",
        ["habite"],
        {
          interactionType: 'fill_blank',
          prompt: "Je _________________ (habiter) à Paris."
        }
      );
      expect(result.status).toBe('correct');
      expect(result.score).toBe(1.0);
    });

    it('AC-06 / T-003: aceita apenas "habite" na lacuna', () => {
      const result = evaluateAnswer(
        "habite",
        ["habite"],
        {
          interactionType: 'fill_blank',
          prompt: "Je _________________ (habiter) à Paris."
        }
      );
      expect(result.status).toBe('correct');
      expect(result.score).toBe(1.0);
    });

    it('AC-06: aceita com apóstrofo tipográfico curvo ’', () => {
      const result = evaluateAnswer(
        "J’habite",
        ["habite"],
        {
          interactionType: 'fill_blank',
          prompt: "Je _________________ (habiter) à Paris."
        }
      );
      expect(result.status).toBe('correct');
    });

    // 2. AC-05: Rigor de Acentuação Francesa
    it('AC-05: rejeita falta de acento em preposição (a ≠ à)', () => {
      const result = evaluateAnswer(
        "a",
        ["à"],
        {
          interactionType: 'fill_blank',
          prompt: "Il va _____ Paris."
        }
      );
      expect(result.status).toBe('incorrect');
      expect(result.score).toBe(0);
      expect(result.feedback.pedagogicalTip).toContain('Attention aux accents');
    });

    it('AC-05: rejeita falta de acento grave/agudo em verbos (prefere ≠ préfère)', () => {
      const result = evaluateAnswer(
        "prefere",
        ["préfère"],
        {
          interactionType: 'fill_blank',
          prompt: "Je _________________ (préférer) le thé."
        }
      );
      expect(result.status).toBe('incorrect');
      expect(result.feedback.pedagogicalTip).toContain('Attention aux accents');
    });

    it('AC-05: aceita quando os acentos franceses estão corretos (préfère)', () => {
      const result = evaluateAnswer(
        "préfère",
        ["préfère"],
        {
          interactionType: 'fill_blank',
          prompt: "Je _________________ (préférer) le thé."
        }
      );
      expect(result.status).toBe('correct');
    });

    // 3. AC-08, T-005: Tradução livre -> needs_review em vez de incorreto automático
    it('AC-08 / T-005: tradução com fraseamento diferente retorna needs_review (nunca incorrect automático)', () => {
      const result = evaluateAnswer(
        "Nous déclinons l'invitation.",
        ["Nous refusons l'invitation."],
        {
          interactionType: 'translation',
          prompt: "We refuse the invitation."
        }
      );
      expect(result.status).toBe('needs_review');
      expect(result.score).toBe(0.5);
      expect(result.feedback.title).toBe('À vérifier 🧐');
    });

    it('AC-08: tradução que coincide com a chave retorna correct', () => {
      const result = evaluateAnswer(
        "Nous refusons l'invitation",
        ["Nous refusons l'invitation."],
        {
          interactionType: 'translation',
          prompt: "We refuse the invitation."
        }
      );
      expect(result.status).toBe('correct');
      expect(result.score).toBe(1.0);
    });

    // 4. Matching: pares de correspondência
    it('matching: valida correspondência de letra correta', () => {
      const result = evaluateAnswer(
        "i",
        ["i"],
        {
          interactionType: 'matching',
          prompt: "Il épelle"
        }
      );
      expect(result.status).toBe('correct');
      expect(result.score).toBe(1.0);
    });

    it('matching: rejeita letra incorreta', () => {
      const result = evaluateAnswer(
        "b",
        ["i"],
        {
          interactionType: 'matching',
          prompt: "Il épelle"
        }
      );
      expect(result.status).toBe('incorrect');
      expect(result.score).toBe(0);
    });

    // 5. Multiple Choice
    it('multiple_choice: aceita opção correta', () => {
      const result = evaluateAnswer(
        "parle",
        ["parle"],
        {
          interactionType: 'multiple_choice',
          prompt: "Elle ________ français."
        }
      );
      expect(result.status).toBe('correct');
    });

    // 6. Ordering (reordenação de tokens)
    it('ordering: aceita frase ordenada com precisão', () => {
      const result = evaluateAnswer(
        "Je suis en train de parler",
        ["Je suis en train de parler."],
        {
          interactionType: 'ordering',
          prompt: "Reconstituez la phrase."
        }
      );
      expect(result.status).toBe('correct');
    });

    // 7. Resposta vazia
    it('retorna feedback apropriado para resposta vazia', () => {
      const result = evaluateAnswer(
        "   ",
        ["travaille"],
        {
          interactionType: 'fill_blank',
          prompt: "Lucie _________________ (travailler) à Lyon."
        }
      );
      expect(result.status).toBe('incorrect');
      expect(result.feedback.title).toBe('Réponse vide');
    });

    // 8. Dicas pedagógicas FLE (Regra 11)
    it('inclui dica pedagógica de terminação muette para verbos em -ent', () => {
      const result = evaluateAnswer(
        "cherchent",
        ["cherchent"],
        {
          interactionType: 'fill_blank',
          prompt: "M. et Mme Benoît _________________ (chercher) un appartement."
        }
      );
      expect(result.status).toBe('correct');
      expect(result.feedback.pedagogicalTip).toContain('muette');
    });

    it('inclui dica pedagógica de terminação -ons para verbos com nous', () => {
      const result = evaluateAnswer(
        "acceptons",
        ["acceptons"],
        {
          interactionType: 'fill_blank',
          prompt: "Mon frère et moi, nous _________________ (accepter) votre invitation."
        }
      );
      expect(result.status).toBe('correct');
      expect(result.feedback.pedagogicalTip).toContain('-ons');
    });

    it('alerta se o aluno usar terminação errada de pessoa', () => {
      const result = evaluateAnswer(
        "cherchez",
        ["cherchent"],
        {
          interactionType: 'fill_blank',
          prompt: "Ils _________________ (chercher) la clé."
        }
      );
      expect(result.status).toBe('incorrect');
      expect(result.feedback.pedagogicalTip).toContain('Attention à la personne');
    });

    it('case-insensitivity com acentos respeitados (PARLONS = parlons)', () => {
      const result = evaluateAnswer(
        "PARLONS",
        ["parlons"],
        {
          interactionType: 'fill_blank',
          prompt: "Nous _________________ (parler)."
        }
      );
      expect(result.status).toBe('correct');
    });

    it('diferencia ce de se no preenchimento', () => {
      const result = evaluateAnswer(
        "ce",
        ["se"],
        {
          interactionType: 'fill_blank',
          prompt: "Il _____ lave les mains."
        }
      );
      expect(result.status).toBe('incorrect');
    });
  });
});
