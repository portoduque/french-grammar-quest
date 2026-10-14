export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18';
  };
  public: {
    Tables: {
      access_grants: {
        Row: {
          created_at: string;
          email: string;
          expires_at: string | null;
          id: string;
          invited_by: string | null;
          role: 'student' | 'teacher' | 'admin';
          status: 'pending' | 'active' | 'revoked';
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          expires_at?: string | null;
          id?: string;
          invited_by?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          status?: 'pending' | 'active' | 'revoked';
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          expires_at?: string | null;
          id?: string;
          invited_by?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          status?: 'pending' | 'active' | 'revoked';
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          actor_id: string | null;
          created_at: string;
          event: string;
          id: string;
          metadata: Json | null;
          target_id: string | null;
          target_type: string;
        };
        Insert: {
          actor_id?: string | null;
          created_at?: string;
          event: string;
          id?: string;
          metadata?: Json | null;
          target_id?: string | null;
          target_type: string;
        };
        Update: {
          actor_id?: string | null;
          created_at?: string;
          event?: string;
          id?: string;
          metadata?: Json | null;
          target_id?: string | null;
          target_type?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          email: string;
          hearts: number;
          id: string;
          last_active_date: string | null;
          level: number;
          max_hearts: number;
          preferences: Json | null;
          role: 'student' | 'teacher' | 'admin';
          streak_days: number;
          streak_frozen: boolean;
          timezone: string | null;
          updated_at: string;
          xp: number;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          email: string;
          hearts?: number;
          id: string;
          last_active_date?: string | null;
          level?: number;
          max_hearts?: number;
          preferences?: Json | null;
          role?: 'student' | 'teacher' | 'admin';
          streak_days?: number;
          streak_frozen?: boolean;
          timezone?: string | null;
          updated_at?: string;
          xp?: number;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string;
          hearts?: number;
          id?: string;
          last_active_date?: string | null;
          level?: number;
          max_hearts?: number;
          preferences?: Json | null;
          role?: 'student' | 'teacher' | 'admin';
          streak_days?: number;
          streak_frozen?: boolean;
          timezone?: string | null;
          updated_at?: string;
          xp?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type AccessGrant = Database['public']['Tables']['access_grants']['Row'];
export type AuditLogEntry = Database['public']['Tables']['audit_log']['Row'];
