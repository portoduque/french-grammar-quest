import { RegisteredStudent, StudentCreateInput, StudentStatus } from '@/types/student';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const MOCK_STUDENTS_KEY = 'fgq_mock_students';
const MOCK_PASSWORDS_KEY = 'fgq_mock_passwords';

export const DEFAULT_ADMIN_EMAIL = 'portoduque@outlook.com';
export const DEFAULT_ADMIN_PASSWORD = 'Admin123!';

export const DEFAULT_MOCK_STUDENTS: RegisteredStudent[] = [];

export const DEFAULT_MOCK_PASSWORDS: Record<string, string> = {
  [DEFAULT_ADMIN_EMAIL]: DEFAULT_ADMIN_PASSWORD,
};

function getStoredStudents(): RegisteredStudent[] {
  try {
    const raw = localStorage.getItem(MOCK_STUDENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback if localStorage restricted
  }
  return JSON.parse(JSON.stringify(DEFAULT_MOCK_STUDENTS));
}

function saveStoredStudents(students: RegisteredStudent[]): void {
  try {
    localStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(students));
  } catch {
    // fallback if localStorage restricted
  }
}

function getStoredPasswords(): Record<string, string> {
  try {
    const raw = localStorage.getItem(MOCK_PASSWORDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return { ...DEFAULT_MOCK_PASSWORDS };
}

function saveStoredPasswords(passwords: Record<string, string>): void {
  try {
    localStorage.setItem(MOCK_PASSWORDS_KEY, JSON.stringify(passwords));
  } catch {
    // fallback
  }
}

export function generateSecureDefaultPassword(): string {
  const prefixes = ['Quest', 'Etoile', 'Grammaire', 'FleFr', 'Voyage'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const year = new Date().getFullYear();
  const specials = ['!', '@', '#', '$'];
  const special = specials[Math.floor(Math.random() * specials.length)];
  return `${prefix}${year}${special}`;
}

export function buildWelcomeEmailTemplate(
  student: { full_name: string; email: string },
  initialPassword: string,
  originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://frenchgrammarquest.app'
): string {
  return [
    `Bonjour ${student.full_name},`,
    '',
    `Bienvenue sur French Grammar Quest, votre plateforme interactive d'apprentissage de la grammaire française !`,
    '',
    `Votre professeur a créé votre compte élève. Voici vos identifiants de connexion sécurisés :`,
    `🔗 Lien de connexion : ${originUrl}/login`,
    `📧 Adresse e-mail : ${student.email}`,
    `🔑 Mot de passe initial : ${initialPassword}`,
    '',
    `Lors de votre première connexion, vous aurez la possibilité de modifier ce mot de passe si vous le souhaitez.`,
    '',
    `Bonne découverte et bon apprentissage !`,
    `L'équipe pédagogique FLE`
  ].join('\n');
}

export async function getRegisteredStudents(): Promise<RegisteredStudent[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('access_grants')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((grant) => ({
          id: grant.id,
          email: grant.email,
          full_name: grant.email.split('@')[0],
          role: 'student' as const,
          status: grant.status === 'revoked' ? 'suspended' : 'active',
          initial_level: 'A1',
          is_temporary_password: false,
          first_login_completed: grant.status === 'active',
          created_at: grant.created_at,
          last_login_at: null,
        }));
      }
    } catch {
      // fallback to mock store
    }
  }

  return getStoredStudents();
}

export async function registerNewStudent(input: StudentCreateInput): Promise<{
  success: boolean;
  student: RegisteredStudent;
  password: string;
  message: string;
}> {
  const cleanEmail = input.email.trim().toLowerCase();
  const cleanName = input.full_name.trim();

  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    throw new Error('Veuillez saisir une adresse e-mail valide au format nom@exemple.com.');
  }

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Veuillez saisir le nom complet de l’élève.');
  }

  const initialPassword = input.password && input.password.trim().length >= 6
    ? input.password.trim()
    : generateSecureDefaultPassword();

  const students = getStoredStudents();
  const existing = students.find((s) => s.email.toLowerCase() === cleanEmail);

  if (existing) {
    throw new Error(`Un élève avec l’adresse e-mail ${cleanEmail} est déjà inscrit.`);
  }

  const newStudent: RegisteredStudent = {
    id: `student-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: cleanEmail,
    full_name: cleanName,
    role: 'student',
    status: 'active',
    initial_level: input.initial_level || 'A1',
    is_temporary_password: true,
    first_login_completed: false,
    notes: input.notes?.trim() || undefined,
    created_at: new Date().toISOString(),
    last_login_at: null,
  };

  const updatedStudents = [newStudent, ...students];
  saveStoredStudents(updatedStudents);

  const passwords = getStoredPasswords();
  passwords[cleanEmail] = initialPassword;
  saveStoredPasswords(passwords);

  // If Supabase is connected, sync with database via admin_register_student_account
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('admin_register_student_account', {
        p_email: cleanEmail,
        p_password: initialPassword,
        p_full_name: cleanName,
        p_initial_level: input.initial_level || 'A1',
        p_notes: input.notes?.trim() || null,
      });

      if (error) {
        console.warn('Sync student account warning:', error.message);
      } else {
        const studentData = (data as any)?.student;
        if (studentData?.id) {
          newStudent.id = studentData.id;
          saveStoredStudents([newStudent, ...students]);
        }
      }
    } catch (err) {
      console.warn('Sync student account warning:', err);
    }
  }

  return {
    success: true,
    student: newStudent,
    password: initialPassword,
    message: `L'élève ${cleanName} a été inscrit avec succès.`,
  };
}

export async function updateStudentStatus(
  id: string,
  newStatus: StudentStatus
): Promise<RegisteredStudent> {
  const students = getStoredStudents();
  const idx = students.findIndex((s) => s.id === id);

  if (idx === -1) {
    throw new Error('Élève introuvable.');
  }

  const updated: RegisteredStudent = {
    ...students[idx],
    status: newStatus,
  };

  students[idx] = updated;
  saveStoredStudents(students);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('access_grants')
        .update({ status: newStatus === 'active' ? 'active' : 'revoked' })
        .eq('email', updated.email);
    } catch {
      // ignore
    }
  }

  return updated;
}

export async function resetStudentPassword(
  id: string,
  customPassword?: string
): Promise<{ student: RegisteredStudent; newPassword: string }> {
  const students = getStoredStudents();
  const idx = students.findIndex((s) => s.id === id);

  if (idx === -1) {
    throw new Error('Élève introuvable.');
  }

  const newPassword = customPassword && customPassword.trim().length >= 6
    ? customPassword.trim()
    : generateSecureDefaultPassword();

  const updated: RegisteredStudent = {
    ...students[idx],
    is_temporary_password: true,
  };

  students[idx] = updated;
  saveStoredStudents(students);

  const passwords = getStoredPasswords();
  passwords[updated.email.toLowerCase()] = newPassword;
  saveStoredPasswords(passwords);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.rpc('admin_register_student_account', {
        p_email: updated.email.toLowerCase(),
        p_password: newPassword,
        p_full_name: updated.full_name,
        p_initial_level: updated.initial_level || 'A1',
        p_notes: updated.notes || null,
      });
    } catch (err) {
      console.warn('Sync reset student password warning:', err);
    }
  }

  return { student: updated, newPassword };
}

export async function deleteStudent(id: string): Promise<void> {
  const students = getStoredStudents();
  const target = students.find((s) => s.id === id);
  if (!target) return;

  const filtered = students.filter((s) => s.id !== id);
  saveStoredStudents(filtered);

  const passwords = getStoredPasswords();
  delete passwords[target.email.toLowerCase()];
  saveStoredPasswords(passwords);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('access_grants').delete().eq('email', target.email);
    } catch {
      // ignore
    }
  }
}

export function saveUserPassword(email: string, newPassword: string): void {
  const cleanEmail = email.trim().toLowerCase();
  const passwords = getStoredPasswords();
  passwords[cleanEmail] = newPassword;
  saveStoredPasswords(passwords);
}

export function validateStudentMockCredentials(
  email: string,
  passwordAttempt: string
): {
  valid: boolean;
  student?: RegisteredStudent;
  isTemporaryPassword?: boolean;
  errorCode?: 'NOT_REGISTERED' | 'ACCOUNT_SUSPENDED' | 'INVALID_PASSWORD';
  errorMessage?: string;
} {
  const cleanEmail = email.trim().toLowerCase();
  const students = getStoredStudents();
  const passwords = getStoredPasswords();

  // Allow administrator login (portoduque@outlook.com)
  if (cleanEmail === DEFAULT_ADMIN_EMAIL) {
    const expectedAdminPassword = passwords[cleanEmail] || DEFAULT_ADMIN_PASSWORD;
    if (passwordAttempt === expectedAdminPassword) {
      return {
        valid: true,
        isTemporaryPassword: false,
      };
    }
    return {
      valid: false,
      errorCode: 'INVALID_PASSWORD',
      errorMessage: 'Mot de passe administrateur incorrect.',
    };
  }

  const student = students.find((s) => s.email.toLowerCase() === cleanEmail);

  if (!student) {
    return {
      valid: false,
      errorCode: 'NOT_REGISTERED',
      errorMessage: "Ce compte n'est pas encore inscrit. L'accès est strictement réservé aux élèves enregistrés par l'administration. Veuillez contacter votre professeur.",
    };
  }

  if (student.status === 'suspended') {
    return {
      valid: false,
      errorCode: 'ACCOUNT_SUSPENDED',
      errorMessage: "Votre compte élève a été suspendu par l'administration. Veuillez vous rapprocher de votre professeur.",
    };
  }

  const expectedPassword = passwords[cleanEmail] || 'Quest2026!';
  if (passwordAttempt !== expectedPassword) {
    return {
      valid: false,
      errorCode: 'INVALID_PASSWORD',
      errorMessage: "Adresse e-mail ou mot de passe incorrect. Vérifiez vos identifiants ou contactez votre professeur.",
    };
  }

  return {
    valid: true,
    student,
    isTemporaryPassword: student.is_temporary_password,
  };
}

export function markStudentFirstLoginHandled(email: string, passwordWasChanged = false): void {
  const cleanEmail = email.trim().toLowerCase();
  const students = getStoredStudents();
  const idx = students.findIndex((s) => s.email.toLowerCase() === cleanEmail);

  if (idx !== -1) {
    students[idx] = {
      ...students[idx],
      first_login_completed: true,
      is_temporary_password: passwordWasChanged ? false : students[idx].is_temporary_password,
      last_login_at: new Date().toISOString(),
    };
    saveStoredStudents(students);
  }
}
