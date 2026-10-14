import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, sendMagicLink, signOutUser } from '@/lib/supabase';
import type { Profile } from '@/types/database';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;
  authError: string | null;
  isMockMode: boolean;
}

export interface AuthActions {
  initialize: () => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  setMockUser: (email?: string, role?: 'student' | 'teacher' | 'admin') => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  decrementHearts: () => Promise<number>;
  refillHearts: () => Promise<void>;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

const MOCK_STORAGE_KEY = 'fgq_mock_profile';

const DEFAULT_MOCK_PROFILE: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'etudiant@frenchgrammarquest.app',
  display_name: 'Étudiant Démo',
  avatar_url: null,
  role: 'student',
  timezone: 'America/Sao_Paulo',
  preferences: { theme: 'dark', sound: true, daily_goal_xp: 50 },
  hearts: 5,
  max_hearts: 5,
  xp: 150,
  level: 2,
  streak_days: 3,
  streak_frozen: false,
  last_active_date: new Date().toISOString().split('T')[0],
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

    initialize: async () => {
      // If store is in mock mode or Supabase is not configured, fall back to mock profile
      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
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
        if (isSupabaseConfigured && supabase) {
          await signOutUser();
        }
        set({
          user: null,
          session: null,
          profile: null,
          isLoading: false,
          authError: null,
        });
      } catch (err: unknown) {
        console.error('Logout error:', err);
        set({ isLoading: false });
      }
    },

    setMockUser: (email = 'etudiant@frenchgrammarquest.app', role = 'student') => {
      const mock: Profile = {
        ...DEFAULT_MOCK_PROFILE,
        email,
        role,
        display_name: email.split('@')[0],
      };
      saveStoredMockProfile(mock);
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

      const updatedProfile = { ...current, ...updates, updated_at: new Date().toISOString() };

      if (get().isMockMode || !isSupabaseConfigured || !supabase) {
        saveStoredMockProfile(updatedProfile);
        set({ profile: updatedProfile });
        return;
      }

      try {
        const { error } = await supabase
          .from('profiles')
          .update(updates)
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
      const newXp = Math.max(0, current.xp + amount);
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
      await get().updateProfile({ hearts: current.max_hearts });
    },

    clearError: () => set({ authError: null }),
  }))
);
