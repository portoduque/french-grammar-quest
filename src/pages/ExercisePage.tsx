import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExerciseSet } from '@/hooks/useExerciseSet';
import { useStudySession } from '@/hooks/useStudySession';
import { ExerciseSession } from '@/components/exercises/ExerciseSession';
import { Button } from '@/components/ui/Button';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';

export const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useExerciseSet(exerciseId);
  const { session, initSession, saveAttempt, finishSession } = useStudySession(exerciseId);

  const handleClose = () => {
    // Retorna para o capítulo correspondente ou para a lista de capítulos
    if (data?.exerciseSet?.chapter_id) {
      navigate(`/chapters/${data.exerciseSet.chapter_id}`);
    } else {
      navigate('/chapters');
    }
  };

  const handleNextExercise = () => {
    if (exerciseId && exerciseId.includes('-ex')) {
      const parts = exerciseId.split('-ex');
      const prefix = parts[0];
      const num = parseInt(parts[1], 10);
      const chapterId = data?.exerciseSet?.chapter_id || prefix;
      const chapterSummary = CHAPTERS_SUMMARY.find(c => c.id === chapterId);
      const totalSets = chapterSummary?.exerciseGroups ?? 10;

      // Se for a última série do capítulo, retorna ao capítulo
      if (num >= totalSets) {
        handleClose();
        return;
      }

      const nextNum = String(num + 1).padStart(2, '0');
      const nextId = `${prefix}-ex${nextNum}`;
      navigate(`/exercise/${nextId}`);
    } else {
      handleClose();
    }
  };

  if (isLoading) {
    return (
      <div className="exercise-page-loading" role="status" aria-label="Chargement de l'exercice">
        <div className="loader-spinner" />
        <p className="loader-text">Préparation de votre mission grammaire...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="exercise-page-error card card-default text-center p-8 max-w-lg mx-auto mt-12">
        <span className="text-4xl mb-4 block">⚠️</span>
        <h2 className="text-xl font-bold mb-2">Impossible de charger l'exercice</h2>
        <p className="text-muted mb-6">
          {error?.message || "Une erreur est survenue lors de la récupération des questions."}
        </p>
        <Button variant="primary" onClick={handleClose}>
          Retour au chapitre
        </Button>
      </div>
    );
  }

  const handleRetrySession = () => {
    if (exerciseId) {
      initSession(exerciseId);
    }
  };

  return (
    <main className="exercise-page-container">
      <ExerciseSession
        exerciseSet={data.exerciseSet}
        questions={data.questions}
        initialIndex={session.currentQuestionIndex}
        initialCorrectCount={session.correctCount}
        initialReviewedCount={session.reviewedCount}
        initialEarnedXp={session.earnedXp}
        onSaveAttempt={saveAttempt}
        onFinishSession={finishSession}
        onRetrySession={handleRetrySession}
        onClose={handleClose}
        onNextExercise={handleNextExercise}
      />
    </main>
  );
};

export default ExercisePage;
