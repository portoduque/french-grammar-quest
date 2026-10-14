export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          event: string
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
      question_attempts: {
        Row: {
          created_at: string
          evaluation_status: string
          id: string
          question_id: string
          score: number
          session_id: string
          user_answer: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evaluation_status: string
          id?: string
          question_id: string
          score?: number
          session_id: string
          user_answer: string
          user_id: string
        }
        Update: {
          created_at?: string
          evaluation_status?: string
          id?: string
          question_id?: string
          score?: number
          session_id?: string
          user_answer?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      study_sessions: {
        Row: {
          chapter_id: string
          completed_at: string | null
          content_version: string
          correct_count: number
          created_at: string
          current_question_index: number
          earned_xp: number
          exercise_set_id: string
          id: string
          reviewed_count: number
          stars: number
          status: string
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          completed_at?: string | null
          content_version?: string
          correct_count?: number
          created_at?: string
          current_question_index?: number
          earned_xp?: number
          exercise_set_id: string
          id?: string
          reviewed_count?: number
          stars?: number
          status?: string
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          completed_at?: string | null
          content_version?: string
          correct_count?: number
          created_at?: string
          current_question_index?: number
          earned_xp?: number
          exercise_set_id?: string
          id?: string
          reviewed_count?: number
          stars?: number
          status?: string
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_exercise_set_id_fkey"
            columns: ["exercise_set_id"]
            isOneToOne: false
            referencedRelation: "exercise_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      user_progress: {
        Row: {
          accuracy_percent: number
          attempts_count: number
          best_stars: number
          chapter_id: string
          exercise_set_id: string
          id: string
          last_attempted_at: string
          status: string
          user_id: string
        }
        Insert: {
          accuracy_percent?: number
          attempts_count?: number
          best_stars?: number
          chapter_id: string
          exercise_set_id: string
          id?: string
          last_attempted_at?: string
          status?: string
          user_id: string
        }
        Update: {
          accuracy_percent?: number
          attempts_count?: number
          best_stars?: number
          chapter_id?: string
          exercise_set_id?: string
          id?: string
          last_attempted_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_exercise_set_id_fkey"
            columns: ["exercise_set_id"]
            isOneToOne: false
            referencedRelation: "exercise_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_ledger: {
        Row: {
          amount: number
          content_version: string
          created_at: string
          exercise_set_id: string | null
          id: string
          question_id: string | null
          reward_type: string
          user_id: string
        }
        Insert: {
          amount: number
          content_version?: string
          created_at?: string
          exercise_set_id?: string | null
          id?: string
          question_id?: string | null
          reward_type: string
          user_id: string
        }
        Update: {
          amount?: number
          content_version?: string
          created_at?: string
          exercise_set_id?: string | null
          id?: string
          question_id?: string | null
          reward_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "xp_ledger_exercise_set_id_fkey"
            columns: ["exercise_set_id"]
            isOneToOne: false
            referencedRelation: "exercise_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_ledger_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_study_session: { Args: { p_session_id: string }; Returns: Json }
      is_admin: { Args: never; Returns: boolean }
      record_question_attempt: {
        Args: {
          p_evaluation_status: string
          p_question_id: string
          p_score?: number
          p_session_id: string
          p_user_answer: string
        }
        Returns: Json
      }
      start_or_resume_session: {
        Args: { p_exercise_set_id: string }
        Returns: Json
      }
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type AccessGrant = Database['public']['Tables']['access_grants']['Row'];
export type AuditLog = Database['public']['Tables']['audit_log']['Row'];

export type Chapter = Database['public']['Tables']['chapters']['Row'];
export type ChapterInsert = Database['public']['Tables']['chapters']['Insert'];
export type ChapterUpdate = Database['public']['Tables']['chapters']['Update'];

export type ContentRelease = Database['public']['Tables']['content_releases']['Row'];
export type Topic = Database['public']['Tables']['topics']['Row'];
export type ExerciseSet = Database['public']['Tables']['exercise_sets']['Row'];
export type Question = Database['public']['Tables']['questions']['Row'];

export type StudySession = Database['public']['Tables']['study_sessions']['Row'];
export type QuestionAttempt = Database['public']['Tables']['question_attempts']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type XpLedger = Database['public']['Tables']['xp_ledger']['Row'];
