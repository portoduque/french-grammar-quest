import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPage } from './AdminPage';
import { AdminGuard } from '@/components/auth/AuthGuard';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: vi.fn(),
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('AdminPage & AdminGuard (Etapa 7)', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'admin-adm-1', email: 'admin@fqg.com' } as any,
      profile: {
        id: 'admin-adm-1',
        email: 'admin@fqg.com',
        role: 'admin',
        display_name: 'Admin Principal'
      } as any,
      isLoading: false,
      isInitialized: true,
      authError: null
    });

    (supabase!.from as any).mockImplementation((table: string) => {
      switch (table) {
        case 'access_grants':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [
                  {
                    id: 'g-test-1',
                    email: 'invite.test@fqg.com',
                    role: 'student',
                    status: 'pending',
                    expires_at: '2026-10-21T00:00:00Z',
                    created_at: '2026-10-14T00:00:00Z',
                    updated_at: '2026-10-14T00:00:00Z',
                    invited_by: null
                  }
                ],
                error: null
              })
            })
          };
        case 'content_releases':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [
                  {
                    id: 'rel-test-1',
                    version: 'v1.0.0-audited',
                    status: 'published',
                    editorial_approved: true,
                    rights_cleared: true,
                    created_at: '2026-10-14T00:00:00Z',
                    published_at: '2026-10-14T00:00:00Z'
                  }
                ],
                error: null
              })
            })
          };
        case 'editorial_issues':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [
                  {
                    id: 'iss-test-1',
                    chapter_id: 'ch01',
                    question_id: null,
                    page_number: 28,
                    severity: 'low',
                    issue_type: 'formatting',
                    description: 'Page 28 scan check',
                    status: 'resolved',
                    reported_by: null,
                    created_at: '2026-10-14T00:00:00Z',
                    resolved_at: '2026-10-14T00:00:00Z'
                  }
                ],
                error: null
              })
            })
          };
        case 'audit_log':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockReturnValue({
                limit: vi.fn().mockResolvedValue({
                  data: [
                    {
                      id: 'log-test-1',
                      actor_id: 'admin-adm-1',
                      event: 'content_published',
                      target_type: 'content_releases',
                      target_id: 'rel-test-1',
                      metadata: { version: 'v1.0.0-audited' },
                      created_at: '2026-10-14T00:00:00Z'
                    }
                  ],
                  error: null
                })
              })
            })
          };
        case 'chapters':
          return {
            select: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: [
                  {
                    id: 'ch01',
                    number: 1,
                    title: 'The present tense of regular -er verbs',
                    world_name: 'Les Fondations',
                    world_number: 1,
                    editorial_status: 'published',
                    total_questions: 100,
                    exercise_groups_count: 10,
                    topics_count: 3,
                    page_range: '23-39',
                    slug: 'present-er-verbs',
                    theory_markdown: null,
                    release_id: 'rel-test-1',
                    created_at: '2026-10-14T00:00:00Z',
                    updated_at: '2026-10-14T00:00:00Z'
                  }
                ],
                error: null
              })
            })
          };
        default:
          return { select: vi.fn() };
      }
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/dashboard" element={<div>Redirecionado para Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it('renderiza painel de administração completo para usuário admin', async () => {
    renderComponent();

    expect(screen.getByText(/Centre d'Administration & Publication/i)).toBeInTheDocument();
    expect(screen.getByText(/Mode Administrateur/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('invite.test@fqg.com')).toBeInTheDocument();
    });
  });

  it('permite alternar abas para visualizar releases, capítulos e audit log', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('invite.test@fqg.com')).toBeInTheDocument();
    });

    // Alternar para aba Releases
    const releasesTab = screen.getByText(/Releases & Workflow/i);
    fireEvent.click(releasesTab);
    expect(screen.getByText('v1.0.0-audited')).toBeInTheDocument();

    // Alternar para aba Chapitres & Pilote
    const contentTab = screen.getByText(/Chapitres & Pilote/i);
    fireEvent.click(contentTab);
    expect(screen.getByText('The present tense of regular -er verbs')).toBeInTheDocument();
    expect(screen.getByText(/Ch01 Pilote : 100 questions vérifiées/i)).toBeInTheDocument();

    // Alternar para aba Audit Log & Issues
    const auditTab = screen.getByText(/Audit Log & Issues/i);
    fireEvent.click(auditTab);
    expect(screen.getByText(/Page 28 scan check/i)).toBeInTheDocument();
  });

  it('permite preencher e enviar novo convite via formulário', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('invite.test@fqg.com')).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText(/Adresse E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'nouveau.prof@fqg.com' } });

    const submitBtn = screen.getByRole('button', { name: /Générer & Envoyer l’Invitation/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(supabase!.rpc).toHaveBeenCalledWith('admin_create_access_grant', expect.objectContaining({
        p_email: 'nouveau.prof@fqg.com',
        p_role: 'student'
      }));
      expect(screen.getByText(/Invitation créée avec succès/i)).toBeInTheDocument();
    });
  });

  it('permite copiar link de convite e exibe feedback de sucesso', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock }
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('invite.test@fqg.com')).toBeInTheDocument();
    });

    const copyBtn = screen.getByRole('button', { name: /Copier 📋/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(expect.stringContaining('/login?email=invite.test%40fqg.com'));
      expect(screen.getByText(/Lien d'invitation copié/i)).toBeInTheDocument();
    });
  });

  it('permite suspender e reativar capítulo via ação administrativa', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    renderComponent();

    // Navega para aba de capítulos
    const contentTab = screen.getByText(/Chapitres & Pilote/i);
    fireEvent.click(contentTab);

    await waitFor(() => {
      expect(screen.getByText('The present tense of regular -er verbs')).toBeInTheDocument();
    });

    const toggleBtn = screen.getByRole('button', { name: /Suspendre \/ Bloquer/i });
    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(supabase!.rpc).toHaveBeenCalledWith('admin_set_chapter_status', {
        p_chapter_id: 'ch01',
        p_status: 'blocked'
      });
      expect(screen.getByText(/Statut du chapitre mis à jour : suspendu/i)).toBeInTheDocument();
    });
  });

  it('permite marcar signalement éditorial como resolvido', async () => {
    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    renderComponent();

    // Navega para aba de audit e issues
    const auditTab = screen.getByText(/Audit Log & Issues/i);
    fireEvent.click(auditTab);

    await waitFor(() => {
      expect(screen.getByText(/Signalements & Suivi Éditorial/i)).toBeInTheDocument();
    });
  });

  it('bloqueia e redireciona estudante comum que tentar acessar rota protegida por AdminGuard', async () => {
    useAuthStore.setState({
      user: { id: 'student-999', email: 'etudiant.normal@fqg.com' } as any,
      profile: {
        id: 'student-999',
        email: 'etudiant.normal@fqg.com',
        role: 'student',
        display_name: 'Étudiant'
      } as any,
      isLoading: false,
      isInitialized: true,
      authError: null
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminPage />
                </AdminGuard>
              }
            />
            <Route path="/dashboard" element={<div>Redirecionado para Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Redirecionado para Dashboard')).toBeInTheDocument();
      expect(screen.queryByText(/Centre d'Administration/i)).not.toBeInTheDocument();
    });
  });
});
