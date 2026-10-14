import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';

export interface StudySessionState {
  sessionId: string | null;
  exerciseSetId: string | null;
  chapterId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  correctCount: number;
  reviewedCount: number;
  earnedXp: number;
  stars: number;
  isCompleted: boolean;
}

export function useStudySession(exerciseSetId: string | undefined) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const [session, setSession] = useState<StudySessionState>({
    sessionId: null,
    exerciseSetId: exerciseSetId || null,
    chapterId: null,
    currentQuestionIndex: 0,
    totalQuestions: 0,
    correctCount: 0,
    reviewedCount: 0,
    earnedXp: 0,
    stars: 0,
    isCompleted: false
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  // Iniciar ou retomar sessão no Supabase (AC-03, T-018)
  const initSession = useCallback(async (setId: string) => {
    if (!setId) return null;

    if (!supabase || !user) {
      // Modo offline / convidado
      const localState: StudySessionState = {
        sessionId: `local-session-${Date.now()}`,
        exerciseSetId: setId,
        chapterId: null,
        currentQuestionIndex: 0,
        totalQuestions: 0,
        correctCount: 0,
        reviewedCount: 0,
        earnedXp: 0,
        stars: 0,
        isCompleted: false
      };
      setSession(localState);
      return localState;
    }

    try {
      setIsSyncing(true);
      const res = await supabase.rpc('start_or_resume_session', {
        p_exercise_set_id: setId
      });
      const data = res?.data;
      const error = res?.error;

      if (error) {
        console.warn('[useStudySession] Erro ao iniciar/retomar sessão no Supabase:', error.message);
        return null;
      }

      if (data && typeof data === 'object') {
        const payload = data as Record<string, any>;
        const loaded: StudySessionState = {
          sessionId: payload.session_id,
          exerciseSetId: payload.exercise_set_id,
          chapterId: payload.chapter_id,
          currentQuestionIndex: payload.current_question_index || 0,
          totalQuestions: payload.total_questions || 0,
          correctCount: payload.correct_count || 0,
          reviewedCount: payload.reviewed_count || 0,
          earnedXp: payload.earned_xp || 0,
          stars: 0,
          isCompleted: payload.status === 'completed'
        };
        setSession(loaded);
        return loaded;
      }
      return null;
    } catch (err) {
      console.warn('[useStudySession] Falha de rede ao conectar sessão:', err);
      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [user]);

  // Auto-inicializar quando exerciseSetId for fornecido
  useEffect(() => {
    if (exerciseSetId) {
      initSession(exerciseSetId);
    }
  }, [exerciseSetId, initSession]);

  // Gravar tentativa de resposta de forma idempotente (AC-04, T-006, T-010)
  const saveAttempt = useCallback(async (
    questionId: string,
    userAnswer: string,
    evaluationStatus: string,
    score: number = 0
  ) => {
    const currentSessionId = sessionRef.current.sessionId;
    if (!currentSessionId) return;

    if (!supabase || !user) {
      // Atualização em memória
      setSession(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        correctCount: evaluationStatus === 'correct' ? prev.correctCount + 1 : prev.correctCount,
        reviewedCount: evaluationStatus === 'self_reviewed' ? prev.reviewedCount + 1 : prev.reviewedCount,
        earnedXp: prev.earnedXp + (evaluationStatus === 'correct' ? 10 : evaluationStatus === 'self_reviewed' ? 2 : 0)
      }));
      return;
    }

    try {
      setIsSyncing(true);
      const res = await supabase.rpc('record_question_attempt', {
        p_session_id: currentSessionId,
        p_question_id: questionId,
        p_user_answer: userAnswer,
        p_evaluation_status: evaluationStatus,
        p_score: score
      });
      const data = res?.data;
      const error = res?.error;

      if (error) {
        console.warn('[useStudySession] Erro ao registrar tentativa no banco:', error.message);
        return;
      }

      const payload = data as Record<string, any> | null;
      const xpGranted = payload?.xp_granted || 0;

      // Se concedeu XP no banco, atualiza o profile local no Zustand
      if (xpGranted > 0) {
        const curProfile = useAuthStore.getState().profile;
        if (curProfile) {
          useAuthStore.setState({
            profile: {
              ...curProfile,
              xp: curProfile.xp + xpGranted
            }
          });
        }
      }

      setSession(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        correctCount: evaluationStatus === 'correct' ? prev.correctCount + 1 : prev.correctCount,
        reviewedCount: evaluationStatus === 'self_reviewed' ? prev.reviewedCount + 1 : prev.reviewedCount,
        earnedXp: prev.earnedXp + xpGranted
      }));
    } catch (err) {
      console.warn('[useStudySession] Exceção ao gravar tentativa:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [user]);

  // Concluir sessão com cálculo de estrelas e XP bônus (RF-048, T-028)
  const finishSession = useCallback(async () => {
    const currentSessionId = sessionRef.current.sessionId;
    if (!currentSessionId) return null;

    if (!supabase || !user) {
      setSession(prev => ({ ...prev, isCompleted: true }));
      return { stars: 3, earnedXp: sessionRef.current.earnedXp + 5 };
    }

    try {
      setIsSyncing(true);
      const res = await supabase.rpc('complete_study_session', {
        p_session_id: currentSessionId
      });
      const data = res?.data;
      const error = res?.error;

      if (error) {
        console.warn('[useStudySession] Erro ao concluir sessão no Supabase:', error.message);
        return null;
      }

      const payload = data as Record<string, any>;
      const completionXp = payload?.completion_xp || 0;
      const finalStars = payload?.stars || 1;

      if (completionXp > 0) {
        const curProfile = useAuthStore.getState().profile;
        if (curProfile) {
          useAuthStore.setState({
            profile: {
              ...curProfile,
              xp: curProfile.xp + completionXp
            }
          });
        }
      }

      setSession(prev => ({
        ...prev,
        stars: finalStars,
        earnedXp: prev.earnedXp + completionXp,
        isCompleted: true
      }));

      // Invalida cache de progresso do usuário no TanStack Query
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recent-session'] });

      return {
        stars: finalStars,
        earnedXp: sessionRef.current.earnedXp + completionXp
      };
    } catch (err) {
      console.warn('[useStudySession] Falha ao finalizar sessão:', err);
      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [user, queryClient]);

  return {
    session,
    isSyncing,
    initSession,
    saveAttempt,
    finishSession
  };
}
