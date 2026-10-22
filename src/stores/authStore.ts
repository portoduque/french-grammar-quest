import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, sendMagicLink, signOutUser } from '@/lib/supabase';
import type { Profile } from '@/types/database';
import { validateStudentMockCredentials, markStudentFirstLoginHandled, saveUserPassword, DEFAULT_ADMIN_EMAIL } from '@/services/studentService';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;
  authError: string | null;
  isMockMode: boolean;
  isTemporaryPassword: boolean;
  firstLoginPromptDismissed: boolean;
}

export interface AuthActions {
  initialize: () => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; message: string; isTemporaryPassword?: boolean }>;
  loginWithMagicLink: (email: string) => Promise<{ success: boolean; message: string }>;
  dismissFirstLoginNotice: () => void;
  logout: () => Promise<void>;
  setMockUser: (email?: string, role?: 'student' | 'teacher' | 'admin') => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  decrementHearts: () => Promise<number>;
  refillHearts: () => Promise<void>;
  incrementStreak: () => Promise<void>;
  updateEmail: (newEmail: string) => Promise<{ success: boolean; message: string; requiresConfirmation?: boolean }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

const MOCK_STORAGE_KEY = 'fgq_mock_profile';
const MOCK_ACTIVE_KEY = 'fgq_mock_active';

const DEFAULT_MOCK_PROFILE: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  email: DEFAULT_ADMIN_EMAIL,
  display_name: 'Porto Duque',
  avatar_url: null,
  role: 'admin',
  timezone: 'America/Sao_Paulo',
  preferences: { theme: 'dark', sound: true, daily_goal_xp: 50 },
  hearts: 5,
  max_hearts: 5,
  xp: 150,
  level: 2,
  streak_days: 3,
  streak_frozen: false,
  last_active_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function getStoredMockProfile(): Profile {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback if localStorage restricted
  }
  return DEFAULT_MOCK_PROFILE;
}

function saveStoredMockProfile(profile: Profile) {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // fallback if localStorage restricted
  }
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set, get) => ({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    isInitialized: false,
    authError: null,
    isMockMode: !isSupabaseConfigured,
    isTemporaryPassword: false,
    firstLoginPromptDismissed: false,

    initialize: async () => {
      const isMockActive = typeof window !== 'undefined' && localStorage.getItem(MOCK_ACTIVE_KEY) === 'true';

      // If Supabase is not configured or store is explicitly in mock mode
      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
        if (isMockActive) {
          const mockProf = getStoredMockProfile();
          set({
            user: {
              id: mockProf.id,
              email: mockProf.email,
              app_metadata: {},
              user_metadata: { full_name: mockProf.display_name },
              aud: 'authenticated',
              created_at: mockProf.created_at,
            } as User,
            profile: mockProf,
            isLoading: false,
            isInitialized: true,
            isMockMode: true,
          });
        } else {
          set({
            user: null,
            session: null,
            profile: null,
            isLoading: false,
            isInitialized: true,
            isMockMode: true,
          });
        }
        return;
      }

      try {
        const client = supabase;
        if (!client) return;

        set({ isLoading: true, authError: null });

        const { data: { session }, error: sessionError } = await client.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          // Fetch user profile from public.profiles
          const { data: profileData, error: profileError } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.warn('Erro ao carregar perfil do Supabase:', profileError);
          }

          set({
            session,
            user: session.user,
            profile: profileData || null,
            isLoading: false,
            isInitialized: true,
            isMockMode: false,
          });
        } else {
          set({
            session: null,
            user: null,
            profile: null,
            isLoading: false,
            isInitialized: true,
            isMockMode: false,
          });
        }

        // Setup real-time auth state listener
        client.auth.onAuthStateChange(async (event, newSession) => {
          if (newSession?.user) {
            const { data: prof } = await client
              .from('profiles')
              .select('*')
              .eq('id', newSession.user.id)
              .single();

            set({
              session: newSession,
              user: newSession.user,
              profile: prof || null,
              isLoading: false,
              isMockMode: false,
            });
          } else if (event === 'SIGNED_OUT') {
            set({
              session: null,
              user: null,
              profile: null,
              isLoading: false,
              isMockMode: false,
            });
          }
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Falha na autenticação';
        set({
          authError: message,
          isLoading: false,
          isInitialized: true,
        });
      }
    },

    loginWithPassword: async (email: string, password: string) => {
      set({ isLoading: true, authError: null });
      const cleanEmail = email.trim().toLowerCase();

      try {
        if (get().isMockMode || !isSupabaseConfigured || !supabase) {
          const val = validateStudentMockCredentials(cleanEmail, password);
          if (!val.valid) {
            const errorMsg = val.errorMessage || 'Identifiants incorrects.';
            set({ authError: errorMsg, isLoading: false });
            return { success: false, message: errorMsg };
          }

          const student = val.student;
          const isAdmin = cleanEmail === DEFAULT_ADMIN_EMAIL || cleanEmail.includes('admin') || cleanEmail.includes('professeur');
          const role = isAdmin ? 'admin' : 'student';
          const mockProfile: Profile = {
            ...DEFAULT_MOCK_PROFILE,
            id: isAdmin ? DEFAULT_MOCK_PROFILE.id : (student?.id || crypto.randomUUID()),
            email: cleanEmail,
            display_name: isAdmin ? (cleanEmail === DEFAULT_ADMIN_EMAIL ? 'Porto Duque' : cleanEmail.split('@')[0]) : (student?.full_name || cleanEmail.split('@')[0]),
            role,
          };

          saveStoredMockProfile(mockProfile);
          try {
            localStorage.setItem(MOCK_ACTIVE_KEY, 'true');
          } catch {
            // ignore
          }

          set({
            user: { id: mockProfile.id, email: cleanEmail } as User,
            profile: mockProfile,
            isLoading: false,
            isMockMode: true,
            isTemporaryPassword: Boolean(val.isTemporaryPassword),
            firstLoginPromptDismissed: false,
          });

          return {
            success: true,
            message: 'Connexion réussie !',
            isTemporaryPassword: Boolean(val.isTemporaryPassword),
          };
        }

        // Live Supabase Mode
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          let friendly = error.message;
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            friendly = 'Adresse e-mail ou mot de passe incorrect. Vérifiez vos identifiants ou contactez votre professeur.';
          }
          set({ authError: friendly, isLoading: false });
          return { success: false, message: friendly };
        }

        // Check if user is in access_grants allowlist and active
        const { data: grant } = await supabase
          .from('access_grants')
          .select('status')
          .eq('email', cleanEmail)
          .single();

        if (grant && grant.status === 'revoked') {
          await supabase.auth.signOut();
          const msg = "Votre compte a été suspendu par l'administration. Veuillez contacter votre professeur.";
          set({ authError: msg, isLoading: false, user: null, session: null, profile: null });
          return { success: false, message: msg };
        }

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const isTemp = Boolean((profileData as any)?.is_temporary_password);

        set({
          user: data.user,
          session: data.session,
          profile: profileData || null,
          isLoading: false,
          isMockMode: false,
          isTemporaryPassword: isTemp,
          firstLoginPromptDismissed: false,
        });

        return {
          success: true,
          message: 'Connexion réussie !',
          isTemporaryPassword: isTemp,
        };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Erreur lors de la connexion.';
        set({ authError: msg, isLoading: false });
        return { success: false, message: msg };
      }
    },

    dismissFirstLoginNotice: () => {
      set({ firstLoginPromptDismissed: true });
    },

    loginWithMagicLink: async (email: string) => {
      set({ isLoading: true, authError: null });
      try {
        if (get().isMockMode || !isSupabaseConfigured || !supabase) {
          // Mock login
          const mock = { ...DEFAULT_MOCK_PROFILE, email };
          saveStoredMockProfile(mock);
          set({
            user: { id: mock.id, email } as User,
            profile: mock,
            isLoading: false,
            isMockMode: true,
          });
          return {
            success: true,
            message: 'Mode démonstration activé! Vous êtes connecté(e).',
          };
        }

        await sendMagicLink(email);
        set({ isLoading: false });
        return {
          success: true,
          message: 'Consultez votre boîte mail! Un lien magique sécurisé vient de vous être envoyé.',
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Impossible d’envoyer le lien de connexion.';
        set({ authError: message, isLoading: false });
        return { success: false, message };
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        try {
          localStorage.removeItem(MOCK_ACTIVE_KEY);
          localStorage.removeItem(MOCK_STORAGE_KEY);
        } catch {
          // ignore
        }
        if (isSupabaseConfigured && supabase) {
          await signOutUser();
        }
        set({
          user: null,
          session: null,
          profile: null,
          isLoading: false,
          authError: null,
          isMockMode: get().isMockMode,
          isTemporaryPassword: false,
          firstLoginPromptDismissed: false,
        });
      } catch (err: unknown) {
        console.error('Logout error:', err);
        set({ isLoading: false });
      }
    },

    setMockUser: (email = DEFAULT_ADMIN_EMAIL, role = 'admin') => {
      const mock: Profile = {
        ...DEFAULT_MOCK_PROFILE,
        email,
        role,
        display_name: email === DEFAULT_ADMIN_EMAIL ? 'Porto Duque' : email.split('@')[0],
      };
      saveStoredMockProfile(mock);
      try {
        localStorage.setItem(MOCK_ACTIVE_KEY, 'true');
      } catch {
        // ignore
      }
      set({
        user: { id: mock.id, email } as User,
        profile: mock,
        isLoading: false,
        isInitialized: true,
        isMockMode: true,
      });
    },

    updateProfile: async (updates: Partial<Profile>) => {
      const current = get().profile;
      if (!current) return;

      const sanitizedUpdates: Partial<Profile> = { ...updates };
      if (sanitizedUpdates.hearts !== undefined) {
        sanitizedUpdates.hearts = Math.max(0, Math.min(5, Math.floor(Number.isFinite(sanitizedUpdates.hearts) ? sanitizedUpdates.hearts : 0)));
      }
      if (sanitizedUpdates.xp !== undefined) {
        sanitizedUpdates.xp = Math.max(0, Math.floor(Number.isFinite(sanitizedUpdates.xp) ? sanitizedUpdates.xp : 0));
      }

      const updatedProfile = { ...current, ...sanitizedUpdates, updated_at: new Date().toISOString() };

      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
        saveStoredMockProfile(updatedProfile);
        set({ profile: updatedProfile });
        return;
      }

      try {
        const { error } = await supabase
          .from('profiles')
          .update(sanitizedUpdates)
          .eq('id', current.id);

        if (error) throw error;
        set({ profile: updatedProfile });
      } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
      }
    },

    addXp: async (amount: number) => {
      const current = get().profile;
      if (!current) return;
      const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
      const newXp = Math.max(0, current.xp + safeAmount);
      const newLevel = Math.max(1, Math.floor(newXp / 100) + 1);
      await get().updateProfile({ xp: newXp, level: newLevel });
    },

    decrementHearts: async () => {
      const current = get().profile;
      if (!current) return 0;
      const newHearts = Math.max(0, current.hearts - 1);
      await get().updateProfile({ hearts: newHearts });
      return newHearts;
    },

    refillHearts: async () => {
      const current = get().profile;
      if (!current) return;
      const targetHearts = Math.max(1, current.max_hearts || 5);
      await get().updateProfile({ hearts: targetHearts });
    },

    incrementStreak: async () => {
      const current = get().profile;
      if (!current) return;

      const today = new Date().toISOString().split('T')[0];
      if (current.last_active_date === today) {
        // Already logged activity today
        return;
      }

      let newStreak = current.streak_days;
      let newFrozen = current.streak_frozen;

      if (!current.last_active_date) {
        newStreak = 1;
      } else {
        const lastDate = new Date(current.last_active_date);
        const currDate = new Date(today);
        const diffTime = currDate.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays === 2 && current.streak_frozen) {
          // Streak Freeze protected the missed day
          newFrozen = false;
          newStreak += 1;
        } else {
          // More than 1 day missed without freeze
          newStreak = 1;
        }
      }

      await get().updateProfile({
        streak_days: newStreak,
        streak_frozen: newFrozen,
        last_active_date: today,
      });
    },

    updateEmail: async (newEmail: string) => {
      const cleanEmail = newEmail.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        return {
          success: false,
          message: 'Veuillez saisir une adresse e-mail valide au format nom@exemple.com.',
        };
      }

      const currentEmail = (get().profile?.email || get().user?.email || '').toLowerCase();
      if (currentEmail && cleanEmail === currentEmail) {
        return {
          success: false,
          message: 'La nouvelle adresse e-mail doit être différente de l’adresse actuelle.',
        };
      }

      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
        const currentProfile = get().profile;
        if (currentProfile) {
          const updatedProfile = {
            ...currentProfile,
            email: cleanEmail,
            updated_at: new Date().toISOString(),
          };
          saveStoredMockProfile(updatedProfile);
          set({
            profile: updatedProfile,
            user: get().user ? { ...get().user!, email: cleanEmail } : null,
          });
        }
        return {
          success: true,
          message: '✨ Votre adresse e-mail a été mise à jour avec succès.',
          requiresConfirmation: false,
        };
      }

      try {
        const { data, error } = await supabase.auth.updateUser({ email: cleanEmail });
        if (error) throw error;

        // If email was updated immediately
        if (data?.user?.email === cleanEmail) {
          const currentProfile = get().profile;
          if (currentProfile) {
            await supabase.from('profiles').update({ email: cleanEmail }).eq('id', currentProfile.id);
            set({
              profile: { ...currentProfile, email: cleanEmail, updated_at: new Date().toISOString() },
              user: data.user,
            });
          }
          return {
            success: true,
            message: '✨ Votre adresse e-mail a été mise à jour avec succès.',
            requiresConfirmation: false,
          };
        } else {
          return {
            success: true,
            message: '📨 Un e-mail de confirmation a été envoyé à votre nouvelle adresse. Veuillez cliquer sur le lien pour valider le changement.',
            requiresConfirmation: true,
          };
        }
      } catch (err: unknown) {
        const raw = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l’adresse e-mail';
        let friendly = raw;
        if (raw.toLowerCase().includes('already registered')) {
          friendly = 'Cette adresse e-mail est déjà associée à un compte existant.';
        } else if (raw.toLowerCase().includes('rate limit')) {
          friendly = 'Trop de requêtes récentes. Veuillez patienter quelques instants avant de réessayer.';
        } else if (raw.toLowerCase().includes('should be different')) {
          friendly = 'La nouvelle adresse doit être différente de l’adresse actuelle.';
        }
        return { success: false, message: friendly };
      }
    },

    updatePassword: async (newPassword: string) => {
      if (newPassword.length < 8) {
        return {
          success: false,
          message: 'Le mot de passe doit comporter au moins 8 caractères.',
        };
      }
      if (!/[A-Z]/.test(newPassword)) {
        return {
          success: false,
          message: 'Le mot de passe doit contenir au moins une lettre majuscule (A-Z).',
        };
      }
      if (!/[a-z]/.test(newPassword)) {
        return {
          success: false,
          message: 'Le mot de passe doit contenir au moins une lettre minuscule (a-z).',
        };
      }
      if (!/[0-9]/.test(newPassword)) {
        return {
          success: false,
          message: 'Le mot de passe doit contenir au moins un chiffre (0-9).',
        };
      }
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)) {
        return {
          success: false,
          message: 'Le mot de passe doit contenir au moins un caractère spécial (ex: ! @ # $ %).',
        };
      }

      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
        const email = (get().user?.email || get().profile?.email || '').trim().toLowerCase();
        markStudentFirstLoginHandled(email, true);
        saveUserPassword(email, newPassword);
        set({ isTemporaryPassword: false });
        return {
          success: true,
          message: '🔒 Votre mot de passe a été mis à jour avec succès.',
        };
      }

      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        const currentProfile = get().profile;
        if (currentProfile) {
          await (supabase.from('profiles') as any).update({ is_temporary_password: false }).eq('id', currentProfile.id);
        }
        set({ isTemporaryPassword: false });
        return {
          success: true,
          message: '🔒 Votre mot de passe a été mis à jour avec succès.',
        };
      } catch (err: unknown) {
        const raw = err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe';
        let friendly = raw;
        if (raw.toLowerCase().includes('rate limit')) {
          friendly = 'Trop de tentatives récentes. Veuillez patienter avant de réessayer.';
        } else if (raw.toLowerCase().includes('should be different')) {
          friendly = 'Le nouveau mot de passe doit être différent de l’ancien.';
        }
        return { success: false, message: friendly };
      }
    },

    clearError: () => set({ authError: null }),
  }))
);
