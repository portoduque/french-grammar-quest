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
          full_name?: string | null
          initial_level?: string | null
          notes?: string | null
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
          full_name?: string | null
          initial_level?: string | null
          notes?: string | null
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
          full_name?: string | null
          initial_level?: string | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          requirement_type: string
          requirement_value: number
          title: string
          xp_reward: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon: string
          id: string
          requirement_type: string
          requirement_value?: number
          title: string
          xp_reward?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          requirement_type?: string
          requirement_value?: number
          title?: string
          xp_reward?: number
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
      editorial_issues: {
        Row: {
          chapter_id: string | null
          created_at: string
          description: string
          id: string
          issue_type: string
          page_number: number | null
          question_id: string | null
          reported_by: string | null
          resolved_at: string | null
          severity: string
          status: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          description: string
          id?: string
          issue_type: string
          page_number?: number | null
          question_id?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          description?: string
          id?: string
          issue_type?: string
          page_number?: number | null
          question_id?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "editorial_issues_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editorial_issues_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editorial_issues_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mistakes: {
        Row: {
          chapter_id: string
          exercise_set_id: string
          id: string
          last_attempted_at: string
          last_wrong_answer: string
          question_id: string
          resolved_at: string | null
          status: string
          user_id: string
          wrong_count: number
        }
        Insert: {
          chapter_id: string
          exercise_set_id: string
          id?: string
          last_attempted_at?: string
          last_wrong_answer: string
          question_id: string
          resolved_at?: string | null
          status?: string
          user_id: string
          wrong_count?: number
        }
        Update: {
          chapter_id?: string
          exercise_set_id?: string
          id?: string
          last_attempted_at?: string
          last_wrong_answer?: string
          question_id?: string
          resolved_at?: string | null
          status?: string
          user_id?: string
          wrong_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_mistakes_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mistakes_exercise_set_id_fkey"
            columns: ["exercise_set_id"]
            isOneToOne: false
            referencedRelation: "exercise_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mistakes_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mistakes_user_id_fkey"
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
      admin_create_access_grant: {
        Args: { p_email: string; p_expires_days?: number; p_role?: string }
        Returns: Json
      }
      admin_register_student_account: {
        Args: {
          p_email: string
          p_password: string
          p_full_name: string
          p_initial_level?: string
          p_notes?: string | null
        }
        Returns: {
          success: boolean
          user_id?: string
          email?: string
          student?: AccessGrant
        }
      }
      admin_publish_release: {
        Args: { p_release_id: string }
        Returns: Json
      }
      admin_resolve_editorial_issue: {
        Args: { p_issue_id: string; p_resolution_status?: string }
        Returns: Json
      }
      admin_revoke_access_grant: {
        Args: { p_grant_id: string }
        Returns: Json
      }
      admin_set_chapter_status: {
        Args: { p_chapter_id: string; p_status: string }
        Returns: Json
      }
      check_and_award_achievements: {
        Args: Record<string, never>
        Returns: Json
      }
      complete_review_session: {
        Args: { p_resolved_question_ids: string[] }
        Returns: Json
      }
      complete_study_session: { Args: { p_session_id: string }; Returns: Json }
      get_user_mistakes: {
        Args: { p_chapter_id?: string | null; p_status?: string | null }
        Returns: {
          accepted_answers: string[]
          chapter_id: string
          exercise_set_id: string
          explanation: string | null
          instruction: string | null
          interaction_type: string
          last_attempted_at: string
          last_wrong_answer: string
          mistake_id: string
          prompt: string
          question_id: string
          status: string
          wrong_count: number
        }[]
      }
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

export type Achievement = Database['public']['Tables']['achievements']['Row'];
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];
export type UserMistake = Database['public']['Tables']['user_mistakes']['Row'];
export type EditorialIssue = Database['public']['Tables']['editorial_issues']['Row'];

export interface UserMistakeDetail {
  mistake_id: string;
  question_id: string;
  exercise_set_id: string;
  chapter_id: string;
  last_wrong_answer: string;
  wrong_count: number;
  status: 'pending' | 'resolved' | 'dismissed';
  last_attempted_at: string;
  prompt: string;
  instruction: string | null;
  interaction_type: string;
  accepted_answers: string[];
  explanation: string | null;
}
