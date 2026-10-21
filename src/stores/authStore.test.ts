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

  describe('Edge Cases & Gamification Invariants', () => {
    it('safely handles NaN and negative amounts in addXp without corrupting state', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');
      const initialXp = useAuthStore.getState().profile?.xp ?? 0;

      await useAuthStore.getState().addXp(NaN);
      expect(useAuthStore.getState().profile?.xp).toBe(initialXp);

      await useAuthStore.getState().addXp(-100);
      expect(useAuthStore.getState().profile?.xp).toBe(initialXp);
    });

    it('clamps hearts between 0 and 5 when updated directly', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      await useAuthStore.getState().updateProfile({ hearts: 10 });
      expect(useAuthStore.getState().profile?.hearts).toBe(5);

      await useAuthStore.getState().updateProfile({ hearts: -3 });
      expect(useAuthStore.getState().profile?.hearts).toBe(0);
    });

    it('increments streak on consecutive day activity', async () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      useAuthStore.getState().setMockUser('user@french.app', 'student');
      await useAuthStore.getState().updateProfile({
        streak_days: 5,
        last_active_date: yesterday,
      });

      await useAuthStore.getState().incrementStreak();
      expect(useAuthStore.getState().profile?.streak_days).toBe(6);
    });

    it('protects streak using streak_frozen when 1 day was missed', async () => {
      const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];
      useAuthStore.getState().setMockUser('user@french.app', 'student');
      await useAuthStore.getState().updateProfile({
        streak_days: 10,
        streak_frozen: true,
        last_active_date: twoDaysAgo,
      });

      await useAuthStore.getState().incrementStreak();

      expect(useAuthStore.getState().profile?.streak_days).toBe(11);
      expect(useAuthStore.getState().profile?.streak_frozen).toBe(false); // Shield consumed
    });

    it('resets streak to 1 when days missed exceeds 1 without freeze', async () => {
      const threeDaysAgo = new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0];
      useAuthStore.getState().setMockUser('user@french.app', 'student');
      await useAuthStore.getState().updateProfile({
        streak_days: 10,
        streak_frozen: false,
        last_active_date: threeDaysAgo,
      });

      await useAuthStore.getState().incrementStreak();
      expect(useAuthStore.getState().profile?.streak_days).toBe(1);
    });
  });

  describe('Security & Credential Updates (Email and Password)', () => {
    it('successfully updates email in mock mode and persists to state', async () => {
      useAuthStore.getState().setMockUser('original@french.app', 'student');
      expect(useAuthStore.getState().profile?.email).toBe('original@french.app');

      const result = await useAuthStore.getState().updateEmail('nouveau.etudiant@french.app');
      expect(result.success).toBe(true);
      expect(result.message).toContain('succès');
      expect(useAuthStore.getState().profile?.email).toBe('nouveau.etudiant@french.app');
      expect(useAuthStore.getState().user?.email).toBe('nouveau.etudiant@french.app');
    });

    it('rejects invalid email formats', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      const res1 = await useAuthStore.getState().updateEmail('invalide');
      expect(res1.success).toBe(false);
      expect(res1.message).toContain('valide');

      const res2 = await useAuthStore.getState().updateEmail('invalide@');
      expect(res2.success).toBe(false);

      const res3 = await useAuthStore.getState().updateEmail('   ');
      expect(res3.success).toBe(false);
    });

    it('rejects email identical to the current one', async () => {
      useAuthStore.getState().setMockUser('identique@french.app', 'student');

      const res = await useAuthStore.getState().updateEmail('identique@french.app');
      expect(res.success).toBe(false);
      expect(res.message).toContain('différente');
    });

    it('successfully validates and updates strong password meeting all 5 security criteria', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      const res = await useAuthStore.getState().updatePassword('MonMotDePasse!2026');
      expect(res.success).toBe(true);
      expect(res.message).toContain('succès');
    });

    it('enforces all 5 password complexity rules individually', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      // Less than 8 chars
      const short = await useAuthStore.getState().updatePassword('P@ss1');
      expect(short.success).toBe(false);
      expect(short.message).toContain('8 caractères');

      // Missing uppercase
      const noUpper = await useAuthStore.getState().updatePassword('password!123');
      expect(noUpper.success).toBe(false);
      expect(noUpper.message).toContain('majuscule');

      // Missing lowercase
      const noLower = await useAuthStore.getState().updatePassword('PASSWORD!123');
      expect(noLower.success).toBe(false);
      expect(noLower.message).toContain('minuscule');

      // Missing number
      const noNumber = await useAuthStore.getState().updatePassword('Password!Special');
      expect(noNumber.success).toBe(false);
      expect(noNumber.message).toContain('chiffre');

      // Missing special character
      const noSpecial = await useAuthStore.getState().updatePassword('Password123456');
      expect(noSpecial.success).toBe(false);
      expect(noSpecial.message).toContain('caractère spécial');
    });
  });
});
