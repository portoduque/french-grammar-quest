export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      access_grants: {
        Row: {
          created_at: string
          email: string
          expires_at: string | null
          id: string
          invited_by: string | null
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          actor_id: string | null
          created_at: string
          event: string
          id: string
          metadata: Json | null
          target_id: string | null
          target_type: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      chapters: {
        Row: {
          created_at: string
          editorial_status: string
          exercise_groups_count: number
          id: string
          number: number
          page_range: string
          release_id: string | null
          slug: string
          theory_markdown: string | null
          title: string
          topics_count: number
          total_questions: number
          updated_at: string
          world_name: string
          world_number: number
        }
        Insert: {
          created_at?: string
          editorial_status?: string
          exercise_groups_count?: number
          id: string
          number: number
          page_range: string
          release_id?: string | null
          slug: string
          theory_markdown?: string | null
          title: string
          topics_count?: number
          total_questions?: number
          updated_at?: string
          world_name: string
          world_number: number
        }
        Update: {
          created_at?: string
          editorial_status?: string
          exercise_groups_count?: number
          id?: string
          number?: number
          page_range?: string
          release_id?: string | null
          slug?: string
          theory_markdown?: string | null
          title?: string
          topics_count?: number
          total_questions?: number
          updated_at?: string
          world_name?: string
          world_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapters_release_id_fkey"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "content_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      content_releases: {
        Row: {
          created_at: string
          editorial_approved: boolean
          id: string
          published_at: string | null
          rights_cleared: boolean
          status: string
          version: string
        }
        Insert: {
          created_at?: string
          editorial_approved?: boolean
          id?: string
          published_at?: string | null
          rights_cleared?: boolean
          status?: string
          version: string
        }
        Update: {
          created_at?: string
          editorial_approved?: boolean
          id?: string
          published_at?: string | null
          rights_cleared?: boolean
          status?: string
          version?: string
        }
        Relationships: []
      }
      exercise_sets: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          instruction: string
          interaction_type: string
          order_index: number
          questions_count: number
          title: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id: string
          instruction: string
          interaction_type: string
          order_index: number
          questions_count?: number
          title: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          instruction?: string
          interaction_type?: string
          order_index?: number
          questions_count?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          hearts: number
          id: string
          last_active_date: string | null
          level: number
          max_hearts: number
          preferences: Json | null
          role: string
          streak_days: number
          streak_frozen: boolean
          timezone: string | null
          updated_at: string
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          hearts?: number
          id: string
          last_active_date?: string | null
          level?: number
          max_hearts?: number
          preferences?: Json | null
          role?: string
          streak_days?: number
          streak_frozen?: boolean
          timezone?: string | null
          updated_at?: string
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          hearts?: number
          id?: string
          last_active_date?: string | null
          level?: number
          max_hearts?: number
          preferences?: Json | null
          role?: string
          streak_days?: number
          streak_frozen?: boolean
          timezone?: string | null
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          accepted_answers: string[]
          created_at: string
          exercise_set_id: string
          explanation: string | null
          id: string
          instruction: string | null
          options: Json | null
          order_index: number
          prompt: string
          tokens: Json | null
        }
        Insert: {
          accepted_answers: string[]
          created_at?: string
          exercise_set_id: string
          explanation?: string | null
          id: string
          instruction?: string | null
          options?: Json | null
          order_index: number
          prompt: string
          tokens?: Json | null
        }
        Update: {
          accepted_answers?: string[]
          created_at?: string
          exercise_set_id?: string
          explanation?: string | null
          id?: string
          instruction?: string | null
          options?: Json | null
          order_index?: number
          prompt?: string
          tokens?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_exercise_set_id_fkey"
            columns: ["exercise_set_id"]
            isOneToOne: false
            referencedRelation: "exercise_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          order_index: number
          rule_summary: string | null
          title: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id: string
          order_index: number
          rule_summary?: string | null
          title: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          order_index?: number
          rule_summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type AccessGrant = Database['public']['Tables']['access_grants']['Row'];
export type AccessGrantInsert = Database['public']['Tables']['access_grants']['Insert'];
export type AccessGrantUpdate = Database['public']['Tables']['access_grants']['Update'];

export type AuditLog = Database['public']['Tables']['audit_log']['Row'];

export type Chapter = Database['public']['Tables']['chapters']['Row'];
export type ChapterInsert = Database['public']['Tables']['chapters']['Insert'];
export type ChapterUpdate = Database['public']['Tables']['chapters']['Update'];

export type ContentRelease = Database['public']['Tables']['content_releases']['Row'];
export type Topic = Database['public']['Tables']['topics']['Row'];
export type ExerciseSet = Database['public']['Tables']['exercise_sets']['Row'];
export type Question = Database['public']['Tables']['questions']['Row'];
