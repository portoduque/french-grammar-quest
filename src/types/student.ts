export type StudentLevel = 'A1' | 'A2' | 'B1' | 'B2';
export type StudentStatus = 'active' | 'suspended';

export interface RegisteredStudent {
  id: string;
  email: string;
  full_name: string;
  role: 'student';
  status: StudentStatus;
  initial_level: StudentLevel;
  is_temporary_password: boolean;
  first_login_completed: boolean;
  notes?: string;
  created_at: string;
  last_login_at: string | null;
}

export interface StudentCreateInput {
  email: string;
  full_name: string;
  password?: string;
  initial_level?: StudentLevel;
  notes?: string;
}

export interface StudentUpdateInput {
  full_name?: string;
  status?: StudentStatus;
  initial_level?: StudentLevel;
  notes?: string;
  new_password?: string;
}
