import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRegisteredStudents,
  registerNewStudent,
  updateStudentStatus,
  resetStudentPassword,
  deleteStudent,
  validateStudentMockCredentials,
  markStudentFirstLoginHandled,
  generateSecureDefaultPassword,
  buildWelcomeEmailTemplate,
} from './studentService';

describe('studentService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default mock students when storage is empty', async () => {
    const students = await getRegisteredStudents();
    expect(students.length).toBeGreaterThanOrEqual(3);
    const demo = students.find((s) => s.email === 'etudiant@frenchgrammarquest.app');
    expect(demo).toBeDefined();
    expect(demo?.full_name).toBe('Étudiant Démo');
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
    await expect(
      registerNewStudent({
        email: 'etudiant@frenchgrammarquest.app',
        full_name: 'Doublon',
      })
    ).rejects.toThrow(/déjà inscrit/i);
  });

  it('updates student status between active and suspended', async () => {
    const students = await getRegisteredStudents();
    const student = students[0];

    const updated = await updateStudentStatus(student.id, 'suspended');
    expect(updated.status).toBe('suspended');

    const refreshed = await getRegisteredStudents();
    expect(refreshed.find((s) => s.id === student.id)?.status).toBe('suspended');
  });

  it('resets student password and sets temporary password flag', async () => {
    const students = await getRegisteredStudents();
    const camille = students.find((s) => s.email === 'camille.bernard@example.com')!;

    const res = await resetStudentPassword(camille.id, 'NouveauPass2026!');
    expect(res.newPassword).toBe('NouveauPass2026!');
    expect(res.student.is_temporary_password).toBe(true);

    const val = validateStudentMockCredentials('camille.bernard@example.com', 'NouveauPass2026!');
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
    it('validates correct student credentials and detects temporary password', () => {
      const val = validateStudentMockCredentials('etudiant@frenchgrammarquest.app', 'Quest2026!');
      expect(val.valid).toBe(true);
      expect(val.isTemporaryPassword).toBe(true);
    });

    it('rejects unknown accounts with NOT_REGISTERED error message', () => {
      const val = validateStudentMockCredentials('inconnu@inconnu.com', 'Pass123!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('NOT_REGISTERED');
      expect(val.errorMessage).toContain("Ce compte n'est pas encore inscrit");
    });

    it('rejects suspended accounts with ACCOUNT_SUSPENDED error message', () => {
      const val = validateStudentMockCredentials('lucas.moreau@example.com', 'Lucas#2026');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('ACCOUNT_SUSPENDED');
      expect(val.errorMessage).toContain('suspendu');
    });

    it('rejects wrong password with INVALID_PASSWORD error message', () => {
      const val = validateStudentMockCredentials('etudiant@frenchgrammarquest.app', 'MauvaisPass123!');
      expect(val.valid).toBe(false);
      expect(val.errorCode).toBe('INVALID_PASSWORD');
    });

    it('allows admin demo login credentials', () => {
      const val = validateStudentMockCredentials('professeur@frenchgrammarquest.app', 'Admin2026!');
      expect(val.valid).toBe(true);
    });
  });

  it('marks first login handled and clears temporary password when changed', () => {
    markStudentFirstLoginHandled('etudiant@frenchgrammarquest.app', true);
    const val = validateStudentMockCredentials('etudiant@frenchgrammarquest.app', 'Quest2026!');
    expect(val.student?.first_login_completed).toBe(true);
    expect(val.student?.is_temporary_password).toBe(false);
  });

  it('generates secure passwords with letters, numbers, and special characters', () => {
    const pass = generateSecureDefaultPassword();
    expect(pass.length).toBeGreaterThanOrEqual(8);
    expect(/[A-Z]/.test(pass)).toBe(true);
    expect(/[a-z]/.test(pass)).toBe(true);
    expect(/[0-9]/.test(pass)).toBe(true);
    expect(/[!@#$]/.test(pass)).toBe(true);
  });

  it('builds welcome email template in natural French with access credentials', () => {
    const template = buildWelcomeEmailTemplate(
      { full_name: 'Jean Dupont', email: 'jean.dupont@ecole.fr' },
      'Quest2026!',
      'https://frenchgrammarquest.app'
    );

    expect(template).toContain('Bonjour Jean Dupont');
    expect(template).toContain('https://frenchgrammarquest.app/login');
    expect(template).toContain('jean.dupont@ecole.fr');
    expect(template).toContain('Quest2026!');
    expect(template).toContain('équipe pédagogique FLE');
  });
});
