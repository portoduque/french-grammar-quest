import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExerciseSet } from '@/hooks/useExerciseSet';
import { useStudySession } from '@/hooks/useStudySession';
import { ExerciseSession } from '@/components/exercises/ExerciseSession';
import { Button } from '@/components/ui/Button';

export const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useExerciseSet(exerciseId);
  const { session, saveAttempt, finishSession } = useStudySession(exerciseId);

  const handleClose = () => {
    // Retorna para o capítulo correspondente ou para a lista de capítulos
    if (data?.exerciseSet?.chapter_id) {
      navigate(`/chapters/${data.exerciseSet.chapter_id}`);
    } else {
      navigate('/chapters');
    }
  };

  const handleNextExercise = () => {
    // Se for ch01-ex01, o próximo é ch01-ex02, até a última série do capítulo
    if (exerciseId && exerciseId.includes('-ex')) {
      const parts = exerciseId.split('-ex');
      const prefix = parts[0];
      const num = parseInt(parts[1], 10);

      // Se for a última série (ex: 10 em capítulos de 10 séries), retorna ao capítulo
      if (num >= 10) {
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

  return (
    <main className="exercise-page-container">
      <ExerciseSession
        exerciseSet={data.exerciseSet}
        questions={data.questions}
        initialIndex={session.currentQuestionIndex}
        onSaveAttempt={saveAttempt}
        onFinishSession={finishSession}
        onClose={handleClose}
        onNextExercise={handleNextExercise}
      />
    </main>
  );
};

export default ExercisePage;
