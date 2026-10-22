import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRegisteredStudents,
  registerNewStudent,
  updateStudentStatus,
  resetStudentPassword,
  deleteStudent,
  validateStudentMockCredentials,
  markStudentFirstLoginHandled,
  saveUserPassword,
  generateSecureDefaultPassword,
  buildWelcomeEmailTemplate,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
} from './studentService';

describe('studentService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty student list when storage is initially empty (clean state)', async () => {
    const students = await getRegisteredStudents();
    expect(students).toEqual([]);
  });

  it('registers a new student with auto-generated password and temporary flag', async () => {
    const res = await registerNewStudent({
      email: 'nouveau.eleve@ecole.fr',
      full_name: 'Nouveau Élève',
      initial_level: 'A2',
      notes: 'Inscription cours du soir',
    });

    expect(res.success).toBe(true);
    expect(res.student.email).toBe('nouveau.eleve@ecole.fr');
    expect(res.student.full_name).toBe('Nouveau Élève');
    expect(res.student.is_temporary_password).toBe(true);
    expect(res.password.length).toBeGreaterThanOrEqual(8);

    const students = await getRegisteredStudents();
    expect(students.some((s) => s.email === 'nouveau.eleve@ecole.fr')).toBe(true);
  });

  it('rejects registration with invalid email format', async () => {
    await expect(
      registerNewStudent({
        email: 'invalid-email',
        full_name: 'Test Invalide',
      })
    ).rejects.toThrow(/adresse e-mail valide/i);
  });

  it('rejects registration of already registered email', async () => {
    await registerNewStudent({
      email: 'unique.eleve@ecole.fr',
      full_name: 'Premier Élève',
    });

    await expect(
      registerNewStudent({
        email: 'unique.eleve@ecole.fr',
        full_name: 'Doublon',
      })
    ).rejects.toThrow(/déjà inscrit/i);
  });

  it('updates student status between active and suspended', async () => {
    const res = await registerNewStudent({
      email: 'statut.eleve@ecole.fr',
      full_name: 'Élève Statut',
    });

    const updated = await updateStudentStatus(res.student.id, 'suspended');
    expect(updated.status).toBe('suspended');

    const refreshed = await getRegisteredStudents();
    expect(refreshed.find((s) => s.id === res.student.id)?.status).toBe('suspended');
  });

  it('resets student password and sets temporary password flag', async () => {
    const res = await registerNewStudent({
      email: 'reset.eleve@ecole.fr',
      full_name: 'Élève Reset',
    });

    const resetRes = await resetStudentPassword(res.student.id, 'NouveauPass2026!');
    expect(resetRes.newPassword).toBe('NouveauPass2026!');
    expect(resetRes.student.is_temporary_password).toBe(true);

    const val = validateStudentMockCredentials('reset.eleve@ecole.fr', 'NouveauPass2026!');
    expect(val.valid).toBe(true);
  });

  it('deletes student from registry', async () => {
    const res = await registerNewStudent({
      email: 'temporaire@ecole.fr',
      full_name: 'Élève Temporaire',
    });

    await deleteStudent(res.student.id);
    const students = await getRegisteredStudents();
    expect(students.some((s) => s.id === res.student.id)).toBe(false);
  });

  describe('validateStudentMockCredentials', () => {
    it('validates correct student credentials and detects temporary password', async () => {
      const res = await registerNewStudent({
        email: 'eleve.valide@ecole.fr',
        full_name: 'Élève Valide',
        password: 'PassValide123!',
      });

      const val = validateStudentMockCredentials(res.student.email, 'PassValide123!');
      expect(val.valid).toBe(true);
      expect(val.isTemporaryPassword).toBe(true);
    });

    it('rejects unknown accounts with NOT_REGISTERED error message', () => {
      const val = validateStudentMockCredentials('inconnu@inconnu.com', 'Pass123!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('NOT_REGISTERED');
      expect(val.errorMessage).toContain("Ce compte n'est pas encore inscrit");
    });

    it('rejects suspended accounts with ACCOUNT_SUSPENDED error message', async () => {
      const res = await registerNewStudent({
        email: 'eleve.suspendu@ecole.fr',
        full_name: 'Élève Suspendu',
        password: 'PassValide123!',
      });

      await updateStudentStatus(res.student.id, 'suspended');

      const val = validateStudentMockCredentials('eleve.suspendu@ecole.fr', 'PassValide123!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('ACCOUNT_SUSPENDED');
      expect(val.errorMessage).toContain('suspendu');
    });

    it('rejects wrong password with INVALID_PASSWORD error message', async () => {
      await registerNewStudent({
        email: 'eleve.wrongpass@ecole.fr',
        full_name: 'Élève Pass',
        password: 'PassCorrect123!',
      });

      const val = validateStudentMockCredentials('eleve.wrongpass@ecole.fr', 'MauvaisPass123!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('INVALID_PASSWORD');
    });

    it('allows admin login for portoduque@outlook.com with default password', () => {
      const val = validateStudentMockCredentials(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
      expect(val.valid).toBe(true);
      expect(val.isTemporaryPassword).toBe(false);
    });

    it('rejects admin login when password is wrong', () => {
      const val = validateStudentMockCredentials(DEFAULT_ADMIN_EMAIL, 'MauvaisAdminPass!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('INVALID_PASSWORD');
      expect(val.errorMessage).toContain('Mot de passe administrateur incorrect');
    });

    it('allows admin to change password and login with updated password', () => {
      saveUserPassword(DEFAULT_ADMIN_EMAIL, 'NouvelleClef2026!');
      const val = validateStudentMockCredentials(DEFAULT_ADMIN_EMAIL, 'NouvelleClef2026!');
      expect(val.valid).toBe(true);

      const oldVal = validateStudentMockCredentials(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
      expect(oldVal.valid).toBe(false);
    });
  });

  it('marks first login handled and clears temporary password when changed', async () => {
    await registerNewStudent({
      email: 'eleve.firstlogin@ecole.fr',
      full_name: 'Élève First Login',
      password: 'PassInitial123!',
    });

    markStudentFirstLoginHandled('eleve.firstlogin@ecole.fr', true);
    const val = validateStudentMockCredentials('eleve.firstlogin@ecole.fr', 'PassInitial123!');
    expect(val.student?.first_login_completed).toBe(true);
    expect(val.student?.is_temporary_password).toBe(false);
  });

  it('generates secure passwords with letters, numbers, and special characters', () => {
    const pass = generateSecureDefaultPassword();
    expect(pass.length).toBeGreaterThanOrEqual(8);
    expect(/[A-Z]/.test(pass)).toBe(true);
    expect(/[0-9]/.test(pass)).toBe(true);
    expect(/[!@#$]/.test(pass)).toBe(true);
  });

  it('builds clear pedagogical French welcome email for students', () => {
    const student = {
      id: 's-1',
      email: 'apprenant@ecole.fr',
      full_name: 'Jean Dubois',
      role: 'student' as const,
      status: 'active' as const,
      initial_level: 'A1' as const,
      is_temporary_password: true,
      first_login_completed: false,
      created_at: new Date().toISOString(),
      last_login_at: null,
    };

    const template = buildWelcomeEmailTemplate(
      student,
      'Secr3t!2026',
      'https://frenchgrammarquest.app'
    );

    expect(template).toContain('Bonjour Jean Dubois');
    expect(template).toContain('Secr3t!2026');
    expect(template).toContain('apprenant@ecole.fr');
    expect(template).toContain('https://frenchgrammarquest.app/login');
  });
});
