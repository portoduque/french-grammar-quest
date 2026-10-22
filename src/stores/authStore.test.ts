import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';
import { registerNewStudent, updateStudentStatus, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/services/studentService';

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
      isTemporaryPassword: false,
      firstLoginPromptDismissed: false,
    });
    localStorage.clear();
  });

  it('initializes with unauthenticated session by default until explicit login', async () => {
    await useAuthStore.getState().initialize();

    const state = useAuthStore.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.profile).toBeNull();
  });

  it('restores previous active session on initialize when MOCK_ACTIVE_KEY is set', async () => {
    localStorage.setItem('fgq_mock_active', 'true');
    await useAuthStore.getState().initialize();

    const state = useAuthStore.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.email).toBe(DEFAULT_ADMIN_EMAIL);
    expect(state.profile?.role).toBe('admin');
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

      await useAuthStore.getState().updateProfile({ hearts: -5 });
      expect(useAuthStore.getState().profile?.hearts).toBe(0);
    });

    it('increments streak count safely', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');
      const initialStreak = useAuthStore.getState().profile?.streak_days ?? 0;

      await useAuthStore.getState().incrementStreak();
      expect(useAuthStore.getState().profile?.streak_days).toBe(initialStreak + 1);
    });

    it('rejects invalid email formats gracefully in updateEmail', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      const res = await useAuthStore.getState().updateEmail('invalid-email-string');
      expect(res.success).toBe(false);
      expect(res.message).toMatch(/format/i);
    });

    it('validates password requirements in updatePassword', async () => {
      useAuthStore.getState().setMockUser('user@french.app', 'student');

      // Short password
      const tooShort = await useAuthStore.getState().updatePassword('Short1!');
      expect(tooShort.success).toBe(false);
      expect(tooShort.message).toContain('8 caractères');

      // No uppercase
      const noUpper = await useAuthStore.getState().updatePassword('password123!');
      expect(noUpper.success).toBe(false);
      expect(noUpper.message).toContain('majuscule');

      // No lowercase
      const noLower = await useAuthStore.getState().updatePassword('PASSWORD123!');
      expect(noLower.success).toBe(false);
      expect(noLower.message).toContain('minuscule');

      // No number
      const noNumber = await useAuthStore.getState().updatePassword('PasswordSpecial!');
      expect(noNumber.success).toBe(false);
      expect(noNumber.message).toContain('chiffre');

      // No special character
      const noSpecial = await useAuthStore.getState().updatePassword('Password12345');
      expect(noSpecial.success).toBe(false);
      expect(noSpecial.message).toContain('caractère spécial');
    });

    describe('loginWithPassword (Restricted Student & Sole Admin Authentication)', () => {
      it('successfully logs in as sole administrator (portoduque@outlook.com)', async () => {
        const res = await useAuthStore.getState().loginWithPassword(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
        expect(res.success).toBe(true);
        expect(res.isTemporaryPassword).toBe(false);

        const state = useAuthStore.getState();
        expect(state.user?.email).toBe(DEFAULT_ADMIN_EMAIL);
        expect(state.profile?.role).toBe('admin');
        expect(state.profile?.display_name).toBe('Porto Duque');
      });

      it('successfully logs in with registered student credentials and detects temporary password', async () => {
        await registerNewStudent({
          email: 'eleve.classe@ecole.fr',
          full_name: 'Élève Classe',
          password: 'PassTemporaire123!',
        });

        const res = await useAuthStore.getState().loginWithPassword('eleve.classe@ecole.fr', 'PassTemporaire123!');
        expect(res.success).toBe(true);
        expect(res.isTemporaryPassword).toBe(true);

        const state = useAuthStore.getState();
        expect(state.user?.email).toBe('eleve.classe@ecole.fr');
        expect(state.profile?.role).toBe('student');
        expect(state.isTemporaryPassword).toBe(true);
        expect(state.firstLoginPromptDismissed).toBe(false);
      });

      it('rejects unregistered email with formative error message', async () => {
        const res = await useAuthStore.getState().loginWithPassword('inconnu@inconnu.fr', 'NimporteQuelPass123!');
        expect(res.success).toBe(false);
        expect(res.message).toContain("Ce compte n'est pas encore inscrit");
        expect(useAuthStore.getState().user).toBeNull();
      });

      it('rejects suspended student accounts', async () => {
        const reg = await registerNewStudent({
          email: 'eleve.suspendu@ecole.fr',
          full_name: 'Élève Bloqué',
          password: 'PassSuspendu123!',
        });
        await updateStudentStatus(reg.student.id, 'suspended');

        const res = await useAuthStore.getState().loginWithPassword('eleve.suspendu@ecole.fr', 'PassSuspendu123!');
        expect(res.success).toBe(false);
        expect(res.message).toContain('suspendu');
        expect(useAuthStore.getState().user).toBeNull();
      });

      it('allows student to dismiss the first login notice without changing password', async () => {
        await registerNewStudent({
          email: 'eleve.notice@ecole.fr',
          full_name: 'Élève Notice',
          password: 'PassNotice123!',
        });

        await useAuthStore.getState().loginWithPassword('eleve.notice@ecole.fr', 'PassNotice123!');
        expect(useAuthStore.getState().firstLoginPromptDismissed).toBe(false);

        useAuthStore.getState().dismissFirstLoginNotice();
        expect(useAuthStore.getState().firstLoginPromptDismissed).toBe(true);
      });

      it('clears temporary password flag upon successful password change and persists new password', async () => {
        await registerNewStudent({
          email: 'eleve.changement@ecole.fr',
          full_name: 'Élève Changement',
          password: 'PassChange123!',
        });

        await useAuthStore.getState().loginWithPassword('eleve.changement@ecole.fr', 'PassChange123!');
        expect(useAuthStore.getState().isTemporaryPassword).toBe(true);

        const res = await useAuthStore.getState().updatePassword('NouveauPassSecurise!2026');
        expect(res.success).toBe(true);
        expect(useAuthStore.getState().isTemporaryPassword).toBe(false);

        // Verify logout and re-login with the newly saved password
        await useAuthStore.getState().logout();
        const loginRes = await useAuthStore.getState().loginWithPassword('eleve.changement@ecole.fr', 'NouveauPassSecurise!2026');
        expect(loginRes.success).toBe(true);
      });
    });
  });
});
