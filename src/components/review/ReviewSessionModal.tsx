import React, { useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { AccentToolbar } from '@/components/gamification/AccentToolbar';
import { evaluateAnswer } from '@/utils/answerEvaluator';
import { UserMistakeDetail } from '@/types/database';

export interface ReviewSessionModalProps {
  open?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  mistakes: UserMistakeDetail[];
  onComplete: (resolvedQuestionIds: string[]) => Promise<void>;
}

export const ReviewSessionModal: React.FC<ReviewSessionModalProps> = ({
  open,
  isOpen,
  onClose,
  mistakes,
  onComplete
}) => {
  const isModalOpen = Boolean(open ?? isOpen);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<{
    title: string;
    message: string;
    pedagogicalTip?: string;
  } | null>(null);
  const [resolvedQuestionIds, setResolvedQuestionIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!mistakes || mistakes.length === 0) {
    return null;
  }

  const currentMistake = mistakes[currentIndex];

  const handleInsertAccent = (char: string) => {
    setUserAnswer((prev) => prev + char);
    inputRef.current?.focus();
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;

    const result = evaluateAnswer(
      userAnswer,
      currentMistake.accepted_answers,
      {
        interactionType: currentMistake.interaction_type,
        prompt: currentMistake.prompt,
        instruction: currentMistake.instruction ?? undefined
      }
    );

    const correct = result.status === 'correct';
    setIsCorrect(correct);
    setEvaluationFeedback(result.feedback);
    setHasEvaluated(true);

    if (correct && !resolvedQuestionIds.includes(currentMistake.question_id)) {
      setResolvedQuestionIds((prev) => [...prev, currentMistake.question_id]);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < mistakes.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setHasEvaluated(false);
      setIsCorrect(false);
      setEvaluationFeedback(null);
    } else {
      setIsSubmitting(true);
      try {
        await onComplete(resolvedQuestionIds);
        setIsFinished(true);
      } catch (err) {
        console.warn('[ReviewSessionModal] Erro ao concluir sessão de revisão:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setHasEvaluated(false);
    setIsCorrect(false);
    setEvaluationFeedback(null);
    setResolvedQuestionIds([]);
    setIsFinished(false);
    onClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      title={isFinished ? '🎉 Session de Révision Terminée !' : `🎯 Révision Active (${currentIndex + 1}/${mistakes.length})`}
      size="md"
      className="modal-review-session"
    >
      {isFinished ? (
        <div className="review-finished-container">
          <div className="review-finished-icon" aria-hidden="true">
            🌟
          </div>
          <h2 className="review-finished-title">
            Félicitations pour vos efforts !
          </h2>
          <p className="review-finished-desc">
            Vous avez assimilé et surmonté <strong>{resolvedQuestionIds.length}</strong> erreur{resolvedQuestionIds.length > 1 ? 's' : ''} sur {mistakes.length} révisée{mistakes.length > 1 ? 's' : ''}.
          </p>

          <div className="review-finished-xp-pill">
            <span style={{ fontSize: '1.25rem' }} aria-hidden="true">✨</span>
            <span style={{ fontWeight: 600, color: '#10B981' }}>+5 XP de Révision attribués !</span>
          </div>

          <div className="review-finished-actions">
            <Button variant="primary" size="lg" onClick={handleClose} style={{ width: '100%', minHeight: '44px' }}>
              Retourner au carnet d'erreurs
            </Button>
          </div>
        </div>
      ) : (
        <div className="review-session-body">
          {/* Progress bar */}
          <div className="review-progress-track">
            <div
              className="review-progress-fill"
              style={{
                width: `${((currentIndex + 1) / mistakes.length) * 100}%`
              }}
            />
          </div>

          <div className="review-question-meta">
            <Badge variant="cyan">Chapitre {currentMistake.chapter_id.replace(/^ch0?/, '')}</Badge>
            {!hasEvaluated && currentMistake.instruction && (
              <p className="review-question-instruction">
                {currentMistake.instruction}
              </p>
            )}
          </div>

          <div className="review-question-prompt-box">
            <p className="review-question-prompt">
              {currentMistake.prompt}
            </p>
          </div>

          {!hasEvaluated ? (
            <div className="review-input-section">
              <Input
                ref={inputRef}
                label="Votre réponse en français :"
                placeholder="Tapez ici..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheck();
                }}
                autoFocus
              />

              <AccentToolbar
                className="review-accent-toolbar"
                onInsert={handleInsertAccent}
              />

              <Button
                variant="primary"
                size="lg"
                onClick={handleCheck}
                disabled={!userAnswer.trim()}
                style={{ width: '100%', minHeight: '44px', marginTop: '0.5rem' }}
              >
                Vérifier 🔍
              </Button>
            </div>
          ) : (
            <div className="review-feedback-section">
              <div
                className="review-feedback-box"
                style={{
                  backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{isCorrect ? '✅' : '❌'}</span>
                  <span style={{ fontWeight: 700, color: isCorrect ? '#10B981' : '#EF4444' }}>
                    {evaluationFeedback?.title || (isCorrect ? 'Bravo ! Réponse correcte !' : 'Pas tout à fait...')}
                  </span>
                </div>

                <p style={{ margin: '0.25rem 0', fontSize: '0.95rem' }}>
                  <strong>Réponse attendue :</strong> {currentMistake.accepted_answers.join(' ou ')}
                </p>

                {evaluationFeedback?.message && (
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-text)' }}>
                    {evaluationFeedback.message}
                  </p>
                )}

                {(evaluationFeedback?.pedagogicalTip || currentMistake.explanation) && (
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    💡 {evaluationFeedback?.pedagogicalTip || currentMistake.explanation}
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={isSubmitting}
                style={{ width: '100%', minHeight: '44px' }}
              >
                {isSubmitting ? 'Enregistrement...' : currentIndex + 1 < mistakes.length ? 'Question suivante ➔' : 'Terminer la session 🎉'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
