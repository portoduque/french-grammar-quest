import React, { useEffect, useRef } from 'react';
import { EvaluationResult } from '@/utils/answerEvaluator';
import { Button } from '@/components/ui/Button';

export interface FeedbackBannerProps {
  result: EvaluationResult;
  onContinue: () => void;
  onSelfReview?: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  result,
  onContinue,
  onSelfReview
}) => {
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Foco automático no botão de continuar para navegação ágil pelo teclado
    continueButtonRef.current?.focus();
  }, [result]);

  const isCorrect = result.status === 'correct' || result.status === 'self_reviewed';
  const isNeedsReview = result.status === 'needs_review';
  const isIncorrect = result.status === 'incorrect';

  let bannerClass = 'feedback-banner-correct';
  if (isIncorrect) bannerClass = 'feedback-banner-incorrect';
  if (isNeedsReview) bannerClass = 'feedback-banner-review';

  return (
    <div
      className={`feedback-banner-drawer ${bannerClass}`}
      role="alert"
      aria-live="polite"
    >
      <div className="feedback-banner-content">
        <div className="feedback-banner-header">
          <span className="feedback-icon" aria-hidden="true">
            {isCorrect && '🎉'}
            {isIncorrect && '❌'}
            {isNeedsReview && '🧐'}
          </span>
          <div className="feedback-text-group">
            <h3 className="feedback-title">{result.feedback.title}</h3>
            <p className="feedback-message">{result.feedback.message}</p>
          </div>
        </div>

        {/* Dica pedagógica FLE do Professor de Francês */}
        {result.feedback.pedagogicalTip && (
          <div className="feedback-pedagogical-tip" lang="fr">
            {result.feedback.pedagogicalTip}
          </div>
        )}

        {/* Resposta de referência quando incorreto ou para revisão */}
        {(isIncorrect || isNeedsReview) && (
          <div className="feedback-canonical-box" lang="fr">
            <span className="feedback-canonical-label">Réponse modèle :</span>
            <strong className="feedback-canonical-text">{result.canonicalAnswer}</strong>
          </div>
        )}

        {/* Ações do rodapé do banner */}
        <div className="feedback-actions">
          {isNeedsReview && onSelfReview && (
            <Button
              variant="secondary"
              size="md"
              onClick={onSelfReview}
              className="feedback-self-review-btn"
            >
              Ma réponse a le même sens 👍
            </Button>
          )}

          <Button
            ref={continueButtonRef}
            variant={isIncorrect ? 'danger' : 'primary'}
            size="lg"
            onClick={onContinue}
            className="feedback-continue-btn"
          >
            Continuer ➔
          </Button>
        </div>
      </div>
    </div>
  );
};
