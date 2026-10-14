import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('AuthStore (Zustand & Gamification State)', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      isInitialized: false,
      authError: null,
      isMockMode: true,
    });
    localStorage.clear();
  });

  it('initializes with default mock student profile in mock/offline mode', async () => {
    await useAuthStore.getState().initialize();

    const state = useAuthStore.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).not.toBeNull();
    expect(state.profile?.role).toBe('student');
    expect(state.profile?.hearts).toBe(5);
  });

  it('updates XP and correctly recalculates level progression', async () => {
    useAuthStore.getState().setMockUser('apprenant@french.app', 'student');

    expect(useAuthStore.getState().profile?.xp).toBe(150);
    expect(useAuthStore.getState().profile?.level).toBe(2);

    await useAuthStore.getState().addXp(100);

    const updated = useAuthStore.getState().profile;
    expect(updated?.xp).toBe(250);
    expect(updated?.level).toBe(3); // 250 / 100 + 1 = 3
  });

  it('decrements hearts with lower-bound clamp at zero', async () => {
    useAuthStore.getState().setMockUser('apprenant@french.app', 'student');

    const hearts1 = await useAuthStore.getState().decrementHearts();
    expect(hearts1).toBe(4);

    await useAuthStore.getState().updateProfile({ hearts: 1 });
    const hearts0 = await useAuthStore.getState().decrementHearts();
    expect(hearts0).toBe(0);

    // Decrementing at 0 should stay at 0, never negative
    const heartsNegative = await useAuthStore.getState().decrementHearts();
    expect(heartsNegative).toBe(0);
  });

  it('refills hearts back to max_hearts (5)', async () => {
    useAuthStore.getState().setMockUser('apprenant@french.app', 'student');
    await useAuthStore.getState().updateProfile({ hearts: 1 });

    await useAuthStore.getState().refillHearts();
    expect(useAuthStore.getState().profile?.hearts).toBe(5);
  });

  it('allows switching between student and admin roles', () => {
    useAuthStore.getState().setMockUser('admin@french.app', 'admin');
    expect(useAuthStore.getState().profile?.role).toBe('admin');

    useAuthStore.getState().setMockUser('student@french.app', 'student');
    expect(useAuthStore.getState().profile?.role).toBe('student');
  });

  it('clears session and profile on logout', async () => {
    useAuthStore.getState().setMockUser('user@french.app', 'student');
    expect(useAuthStore.getState().user).not.toBeNull();

    await useAuthStore.getState().logout();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().profile).toBeNull();
  });
});
