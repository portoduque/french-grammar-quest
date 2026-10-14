import React, { useState } from 'react';
import { ExerciseSet, Question } from '@/types/database';
import { evaluateAnswer, EvaluationResult } from '@/utils/answerEvaluator';
import { ExerciseProgressBar } from './ExerciseProgressBar';
import { FeedbackBanner } from './FeedbackBanner';
import { SessionCompletedView } from './SessionCompletedView';
import { Button } from '@/components/ui/Button';
import {
  FillBlankInteraction,
  MatchingInteraction,
  OrderingInteraction,
  MultipleChoiceInteraction,
  SentenceRewriteInteraction,
  TranslationInteraction,
  MatchingOption
} from './interactions';

export interface ExerciseSessionProps {
  exerciseSet: ExerciseSet;
  questions: Question[];
  onClose: () => void;
  onNextExercise?: () => void;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  exerciseSet,
  questions,
  onClose,
  onNextExercise
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Gamificação em tempo de sessão
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleVerify = () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const result = evaluateAnswer(
      userAnswer,
      currentQuestion.accepted_answers,
      {
        interactionType: exerciseSet.interaction_type,
        prompt: currentQuestion.prompt,
        instruction: currentQuestion.instruction || exerciseSet.instruction
      }
    );

    setEvaluation(result);

    if (result.status === 'correct') {
      setCorrectCount(prev => prev + 1);
      setComboCount(prev => prev + 1);
      setEarnedXp(prev => prev + 10);
    } else if (result.status === 'incorrect') {
      setComboCount(0); // Quebra o combo
    }
  };

  const handleSelfReview = () => {
    if (!evaluation) return;

    // Converte status de needs_review para self_reviewed e premia XP de autoavaliação (+2 XP)
    const updated: EvaluationResult = {
      ...evaluation,
      status: 'self_reviewed',
      score: 1.0,
      feedback: {
        title: 'Auto-évaluation validée ! 👍',
        message: 'Votre réponse alternative a été comptabilisée.',
        pedagogicalTip: 'Bravo pour votre esprit critique et votre rigueur linguistique.'
      }
    };

    setEvaluation(updated);
    setReviewedCount(prev => prev + 1);
    setEarnedXp(prev => prev + 2);
  };

  const handleContinue = () => {
    setEvaluation(null);
    setUserAnswer('');

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Concluiu a série: soma bônus de conclusão (+5 XP)
      setEarnedXp(prev => prev + 5);
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setEvaluation(null);
    setCorrectCount(0);
    setReviewedCount(0);
    setComboCount(0);
    setEarnedXp(0);
    setIsCompleted(false);
  };

  // Se a série foi finalizada
  if (isCompleted) {
    return (
      <div className="exercise-session-wrapper">
        <SessionCompletedView
          exerciseTitle={exerciseSet.title}
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          reviewedCount={reviewedCount}
          earnedXp={earnedXp}
          onRetry={handleRetry}
          onBackToChapter={onClose}
          onNextExercise={onNextExercise}
        />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="card card-default text-center p-8">
        <p>Aucune question trouvée dans cet exercice.</p>
        <Button variant="secondary" onClick={onClose} className="mt-4">
          Retour au chapitre
        </Button>
      </div>
    );
  }

  // Renderizador específico por interaction_type
  const renderInteraction = () => {
    const isLocked = Boolean(evaluation);

    switch (exerciseSet.interaction_type) {
      case 'fill_blank':
        return (
          <FillBlankInteraction
            prompt={currentQuestion.prompt}
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleVerify}
            disabled={isLocked}
          />
        );

      case 'matching':
        return (
          <MatchingInteraction
            prompt={currentQuestion.prompt}
            options={currentQuestion.options as MatchingOption[] | null}
            value={userAnswer}
            onChange={setUserAnswer}
            disabled={isLocked}
          />
        );

      case 'ordering':
        return (
          <OrderingInteraction
            prompt={currentQuestion.prompt}
            tokens={currentQuestion.tokens as string[] | null}
            canonicalAnswer={currentQuestion.accepted_answers[0]}
            value={userAnswer}
            onChange={setUserAnswer}
            disabled={isLocked}
          />
        );

      case 'multiple_choice':
        return (
          <MultipleChoiceInteraction
            prompt={currentQuestion.prompt}
            options={currentQuestion.options as any}
            value={userAnswer}
            onChange={setUserAnswer}
            disabled={isLocked}
          />
        );

      case 'sentence_rewrite':
        return (
          <SentenceRewriteInteraction
            prompt={currentQuestion.prompt}
            instruction={currentQuestion.instruction || exerciseSet.instruction}
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleVerify}
            disabled={isLocked}
          />
        );

      case 'translation':
      case 'free_response':
      default:
        return (
          <TranslationInteraction
            prompt={currentQuestion.prompt}
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleVerify}
            disabled={isLocked}
          />
        );
    }
  };

  return (
    <div className="exercise-session-wrapper">
      {/* Barra de progresso e topo */}
      <ExerciseProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        comboCount={comboCount}
        onClose={onClose}
      />

      {/* Instrução geral da série */}
      <div className="exercise-instruction-header">
        <div className="exercise-title-meta">
          <span className="exercise-title-badge">{exerciseSet.title}</span>
          <span className="exercise-type-tag">
            {exerciseSet.interaction_type.replace('_', ' ')}
          </span>
        </div>
        <h2 className="exercise-instruction-text" lang="fr">
          {exerciseSet.instruction}
        </h2>
      </div>

      {/* Área da interação dinâmica */}
      <div className="exercise-stage-area">
        {renderInteraction()}
      </div>

      {/* Rodapé: Botão de verificação ou Banner de feedback */}
      {!evaluation ? (
        <div className="exercise-bottom-actions">
          <Button
            variant="primary"
            size="lg"
            onClick={handleVerify}
            disabled={!userAnswer.trim()}
            className="verify-action-btn"
          >
            Vérifier 🎯
          </Button>
        </div>
      ) : (
        <FeedbackBanner
          result={evaluation}
          onContinue={handleContinue}
          onSelfReview={evaluation.status === 'needs_review' ? handleSelfReview : undefined}
        />
      )}
    </div>
  );
};
