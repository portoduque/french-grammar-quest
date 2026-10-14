import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ghaatpulnzbyxxgdqzfp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your_supabase_anon_key_here'
);

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Send magic link email to user.
 * Redirects back to origin /dashboard after verification.
 */
export async function sendMagicLink(email: string, redirectTo?: string) {
  if (!supabase) {
    throw new Error('Supabase client não está configurado. Configure as variáveis de ambiente.');
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo || `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    throw error;
  }

  return { success: true };
}

/**
 * Sign out current user.
 */
export async function signOutUser() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
