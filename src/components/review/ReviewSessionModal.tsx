import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { UserMistakeDetail } from '@/types/database';

export interface ReviewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: UserMistakeDetail[];
  onComplete: (resolvedQuestionIds: string[]) => Promise<void>;
}

export const ReviewSessionModal: React.FC<ReviewSessionModalProps> = ({
  isOpen,
  onClose,
  mistakes,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resolvedQuestionIds, setResolvedQuestionIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!mistakes || mistakes.length === 0) {
    return null;
  }

  const currentMistake = mistakes[currentIndex];

  const normalize = (text: string) => {
    return text
      .trim()
      .normalize('NFC')
      .toLowerCase()
      .replace(/\s+/g, ' ');
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;

    const normalizedUser = normalize(userAnswer);
    const matches = currentMistake.accepted_answers.some(
      (ans) => normalize(ans) === normalizedUser
    );

    setIsCorrect(matches);
    setHasEvaluated(true);

    if (matches && !resolvedQuestionIds.includes(currentMistake.question_id)) {
      setResolvedQuestionIds((prev) => [...prev, currentMistake.question_id]);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < mistakes.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setHasEvaluated(false);
      setIsCorrect(false);
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
    setResolvedQuestionIds([]);
    setIsFinished(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={isFinished ? '🎉 Session de Révision Terminée !' : `🎯 Révision Active (${currentIndex + 1}/${mistakes.length})`}
      size="md"
    >
      {isFinished ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }} aria-hidden="true">
            🌟
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Félicitations pour vos efforts !
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Vous avez assimilé et surmonté <strong>{resolvedQuestionIds.length}</strong> erreur{resolvedQuestionIds.length > 1 ? 's' : ''} sur {mistakes.length} révisée{mistakes.length > 1 ? 's' : ''}.
          </p>

          <div
            style={{
              display: 'inline-flex',
              gap: '0.75rem',
              alignItems: 'center',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}
          >
            <span style={{ fontSize: '1.25rem' }} aria-hidden="true">✨</span>
            <span style={{ fontWeight: 600, color: '#10B981' }}>+5 XP de Révision attribués !</span>
          </div>

          <div>
            <Button variant="primary" size="lg" onClick={handleClose} style={{ width: '100%' }}>
              Retourner au carnet d'erreurs
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'var(--color-border)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}
          >
            <div
              style={{
                width: `${((currentIndex + 1) / mistakes.length) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--color-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Badge variant="cyan">Chapitre {currentMistake.chapter_id.replace(/^ch0?/, '')}</Badge>
            {currentMistake.instruction && (
              <p
                style={{
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.5rem'
                }}
              >
                {currentMistake.instruction}
              </p>
            )}
          </div>

          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.03))',
              borderRadius: '12px',
              marginBottom: '1.25rem'
            }}
          >
            <p style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
              {currentMistake.prompt}
            </p>
          </div>

          {!hasEvaluated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Votre réponse en français :"
                placeholder="Tapez ici..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheck();
                }}
                autoFocus
              />

              <Button
                variant="primary"
                size="lg"
                onClick={handleCheck}
                disabled={!userAnswer.trim()}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Vérifier 🔍
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{isCorrect ? '✅' : '❌'}</span>
                  <span style={{ fontWeight: 700, color: isCorrect ? '#10B981' : '#EF4444' }}>
                    {isCorrect ? 'Bravo ! Réponse correcte !' : 'Pas tout à fait...'}
                  </span>
                </div>

                <p style={{ margin: '0.25rem 0', fontSize: '0.95rem' }}>
                  <strong>Réponse attendue :</strong> {currentMistake.accepted_answers.join(' ou ')}
                </p>

                {currentMistake.explanation && (
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    💡 {currentMistake.explanation}
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={isSubmitting}
                style={{ width: '100%' }}
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
