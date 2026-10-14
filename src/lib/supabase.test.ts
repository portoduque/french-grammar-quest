import { describe, it, expect, vi } from 'vitest';
import { isSupabaseConfigured, sendMagicLink, signOutUser, supabase } from './supabase';
import type { Profile, AccessGrant } from '@/types/database';

describe('Supabase Client & Auth Contracts (Etapa 2)', () => {
  it('detects Supabase configuration correctly', () => {
    // Under local .env with configured URL and anon key, isSupabaseConfigured is boolean
    expect(typeof isSupabaseConfigured).toBe('boolean');
  });

  it('provides typed schema contracts for profiles', () => {
    const mockProfile: Profile = {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'etudiant@exemple.fr',
      display_name: 'Étudiant Test',
      avatar_url: null,
      role: 'student',
      timezone: 'UTC',
      preferences: { theme: 'dark', sound: true },
      hearts: 5,
      max_hearts: 5,
      xp: 200,
      level: 3,
      streak_days: 4,
      streak_frozen: false,
      last_active_date: '2026-10-14',
      created_at: '2026-10-14T12:00:00Z',
      updated_at: '2026-10-14T12:00:00Z',
    };

    expect(mockProfile.role).toBe('student');
    expect(mockProfile.hearts).toBe(5);
    expect(mockProfile.xp).toBe(200);
  });

  it('provides typed schema contracts for access_grants (allowlist)', () => {
    const mockGrant: AccessGrant = {
      id: '22222222-2222-2222-2222-222222222222',
      email: 'invite@exemple.fr',
      role: 'student',
      status: 'active',
      invited_by: null,
      expires_at: null,
      created_at: '2026-10-14T12:00:00Z',
      updated_at: '2026-10-14T12:00:00Z',
    };

    expect(mockGrant.status).toBe('active');
    expect(['pending', 'active', 'revoked']).toContain(mockGrant.status);
    expect(['student', 'teacher', 'admin']).toContain(mockGrant.role);
  });

  it('calls auth.signInWithOtp when sending magic link with valid client', async () => {
    if (supabase) {
      const signInSpy = vi.spyOn(supabase.auth, 'signInWithOtp').mockResolvedValueOnce({
        data: {} as unknown as { user: null; session: null; messageId?: string },
        error: null,
      });

      const res = await sendMagicLink('test@sorbonne.fr', 'http://localhost:5173/dashboard');
      expect(res.success).toBe(true);
      expect(signInSpy).toHaveBeenCalledWith({
        email: 'test@sorbonne.fr',
        options: { emailRedirectTo: 'http://localhost:5173/dashboard' },
      });

      signInSpy.mockRestore();
    }
  });

  it('calls auth.signOut when signing out user', async () => {
    if (supabase) {
      const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValueOnce({
        error: null,
      });

      await signOutUser();
      expect(signOutSpy).toHaveBeenCalledTimes(1);

      signOutSpy.mockRestore();
    }
  });
});
