import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminStudentsPage } from './AdminStudentsPage';
import * as studentService from '@/services/studentService';
import { RegisteredStudent } from '@/types/student';

vi.mock('@/services/studentService');

const mockStudents: RegisteredStudent[] = [
  {
    id: 's1',
    email: 'claire.dubois@exemple.fr',
    full_name: 'Claire Dubois',
    role: 'student',
    status: 'active',
    initial_level: 'A2',
    is_temporary_password: true,
    first_login_completed: false,
    created_at: '2026-10-21T10:00:00Z',
    last_login_at: null,
  },
  {
    id: 's2',
    email: 'lucas.martin@exemple.fr',
    full_name: 'Lucas Martin',
    role: 'student',
    status: 'suspended',
    initial_level: 'B1',
    is_temporary_password: false,
    first_login_completed: true,
    created_at: '2026-10-21T11:00:00Z',
    last_login_at: '2026-10-21T11:30:00Z',
  },
];

describe('AdminStudentsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(window, 'prompt').mockReturnValue('');
    (studentService.getRegisteredStudents as any).mockResolvedValue([...mockStudents]);
    (studentService.generateSecureDefaultPassword as any).mockReturnValue('Aventure2026!Xy');
    (studentService.buildWelcomeEmailTemplate as any).mockImplementation(
      (s: RegisteredStudent, p: string) => `Bonjour ${s.full_name}, mot de passe: ${p}`
    );
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AdminStudentsPage />
      </MemoryRouter>
    );

  it('renders page header and metric cards', async () => {
    renderComponent();

    expect(screen.getByText(/Inscription & Gestion des Élèves/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscrire un Nouvel Élève/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Total Inscrits')).toBeInTheDocument();
      expect(screen.getByText('Élèves Actifs')).toBeInTheDocument();
      expect(screen.getByText('1er Accès En Attente')).toBeInTheDocument();
    });
  });

  it('loads and lists existing students in both table and mobile views', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
      expect(screen.getAllByText('lucas.martin@exemple.fr').length).toBeGreaterThan(0);
    });
  });

  it('registers a new student and displays credentials card', async () => {
    const newStudent: RegisteredStudent = {
      id: 's3',
      email: 'nouveau@exemple.fr',
      full_name: 'Jean Valjean',
      role: 'student',
      status: 'active',
      initial_level: 'B2',
      is_temporary_password: true,
      first_login_completed: false,
      created_at: new Date().toISOString(),
      last_login_at: null,
    };

    (studentService.registerNewStudent as any).mockResolvedValueOnce({
      student: newStudent,
      password: 'GeneratedPassword2026!',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
    });

    const nameInput = screen.getByLabelText(/Nom complet/i);
    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const submitBtn = screen.getByRole('button', { name: /Inscrire l'Élève 🎓/i });

    fireEvent.change(nameInput, { target: { value: 'Jean Valjean' } });
    fireEvent.change(emailInput, { target: { value: 'nouveau@exemple.fr' } });

    // Mock subsequent fetch returning the new list
    (studentService.getRegisteredStudents as any).mockResolvedValueOnce([...mockStudents, newStudent]);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(studentService.registerNewStudent).toHaveBeenCalledWith(
        expect.objectContaining({
          full_name: 'Jean Valjean',
          email: 'nouveau@exemple.fr',
          initial_level: 'A1',
        })
      );
      expect(screen.getByText(/Identifiants Prêts à Transmettre/i)).toBeInTheDocument();
      expect(screen.getByText('GeneratedPassword2026!')).toBeInTheDocument();
    });
  });

  it('filters students by search input', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Lucas Martin').length).toBeGreaterThan(0);
    });

    const searchInput = screen.getByLabelText(/Rechercher un élève/i);
    fireEvent.change(searchInput, { target: { value: 'claire' } });

    expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
    expect(screen.queryByText('Lucas Martin')).not.toBeInTheDocument();
  });

  it('filters students by status tab', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Lucas Martin').length).toBeGreaterThan(0);
    });

    // Click "Suspendus" tab
    const suspendedTab = screen.getByRole('button', { name: /Suspendus/i });
    fireEvent.click(suspendedTab);

    // Lucas is suspended, Claire is active
    expect(screen.getAllByText('Lucas Martin').length).toBeGreaterThan(0);
    expect(screen.queryByText('Claire Dubois')).not.toBeInTheDocument();
  });

  it('toggles student status', async () => {
    (studentService.updateStudentStatus as any).mockResolvedValueOnce({
      ...mockStudents[0],
      status: 'suspended',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
    });

    // Find suspend button for Claire
    const suspendButtons = screen.getAllByRole('button', { name: /Suspendre/i });
    expect(suspendButtons.length).toBeGreaterThan(0);

    fireEvent.click(suspendButtons[0]);

    await waitFor(() => {
      expect(studentService.updateStudentStatus).toHaveBeenCalledWith('s1', 'suspended');
    });
  });

  it('resets a student password and shows the new temporary password', async () => {
    (studentService.resetStudentPassword as any).mockResolvedValueOnce({
      student: mockStudents[0],
      newPassword: 'ResetPassword123!',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Claire Dubois').length).toBeGreaterThan(0);
    });

    const resetButtons = screen.getAllByRole('button', { name: /Réinit\. pass/i });
    fireEvent.click(resetButtons[0]);

    await waitFor(() => {
      expect(studentService.resetStudentPassword).toHaveBeenCalledWith('s1', undefined);
      expect(screen.getByText(/Mot de passe réinitialisé pour Claire Dubois : ResetPassword123!/i)).toBeInTheDocument();
    });
  });

  it('generates a new password when clicking the generate password button', async () => {
    renderComponent();

    (studentService.generateSecureDefaultPassword as any).mockReturnValueOnce('NewGeneratedPass123!');

    const generateBtn = screen.getByRole('button', { name: /Générer un mot de passe sécurisé/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      const passwordInput = screen.getByLabelText(/Mot de passe temporaire initial/i) as HTMLInputElement;
      expect(passwordInput.value).toBe('NewGeneratedPass123!');
    });
  });
});
