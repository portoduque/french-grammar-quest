import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const authError = useAuthStore((state) => state.authError);
  const isMockMode = useAuthStore((state) => state.isMockMode);

  const loginWithMagicLink = useAuthStore((state) => state.loginWithMagicLink);
  const logout = useAuthStore((state) => state.logout);
  const setMockUser = useAuthStore((state) => state.setMockUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const addXp = useAuthStore((state) => state.addXp);
  const decrementHearts = useAuthStore((state) => state.decrementHearts);
  const refillHearts = useAuthStore((state) => state.refillHearts);
  const incrementStreak = useAuthStore((state) => state.incrementStreak);
  const updateEmail = useAuthStore((state) => state.updateEmail);
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const clearError = useAuthStore((state) => state.clearError);

  const isAuthenticated = Boolean(user);
  const isAdmin = profile?.role === 'admin';
  const isTeacher = profile?.role === 'teacher';
  const isStudent = profile?.role === 'student' || (!isAdmin && !isTeacher);

  return {
    user,
    session,
    profile,
    isLoading,
    isInitialized,
    authError,
    isMockMode,
    isAuthenticated,
    isAdmin,
    isTeacher,
    isStudent,
    loginWithMagicLink,
    logout,
    setMockUser,
    updateProfile,
    addXp,
    decrementHearts,
    refillHearts,
    incrementStreak,
    updateEmail,
    updatePassword,
    clearError,
  };
}
