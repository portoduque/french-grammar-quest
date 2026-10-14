import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { AccessGrant, AuditLog, ContentRelease, EditorialIssue, Chapter } from '@/types/database';

export interface CreateInviteInput {
  email: string;
  role?: 'student' | 'teacher' | 'admin';
  expiresDays?: number;
}

export const MOCK_ADMIN_DATA = {
  grants: [
    {
      id: 'grant-mock-1',
      email: 'etudiant.demo@example.com',
      role: 'student',
      status: 'pending',
      invited_by: null,
      expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'grant-mock-2',
      email: 'professeur.fle@example.com',
      role: 'teacher',
      status: 'active',
      invited_by: null,
      expires_at: null,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString()
    }
  ] as AccessGrant[],
  releases: [
    {
      id: '00000000-0000-0000-0000-000000000001',
      version: 'v1.0.0-audited',
      status: 'published',
      rights_cleared: true,
      editorial_approved: true,
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString()
    }
  ] as ContentRelease[],
  issues: [
    {
      id: 'issue-mock-1',
      chapter_id: 'ch01',
      question_id: null,
      page_number: 28,
      severity: 'low',
      issue_type: 'formatting',
      description: 'Source page 28 is visually clipped in original scan; verified covered in digital exercises.',
      status: 'resolved',
      reported_by: null,
      created_at: new Date().toISOString(),
      resolved_at: new Date().toISOString()
    }
  ] as EditorialIssue[],
  auditLogs: [
    {
      id: 'log-mock-1',
      actor_id: null,
      event: 'content_published',
      target_type: 'content_releases',
      target_id: '00000000-0000-0000-0000-000000000001',
      metadata: { version: 'v1.0.0-audited' },
      created_at: new Date().toISOString()
    }
  ] as AuditLog[]
};

export function useAdmin() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const queryClient = useQueryClient();
  const isAdmin = profile?.role === 'admin';

  // 1. Consulta de Convites (Access Grants)
  const grantsQuery = useQuery<AccessGrant[]>({
    queryKey: ['admin-grants', user?.id],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      if (!supabase) return MOCK_ADMIN_DATA.grants;

      const { data, error } = await supabase
        .from('access_grants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[useAdmin] Erro ao buscar convites:', error.message);
        return MOCK_ADMIN_DATA.grants;
      }

      return (data as AccessGrant[]) || [];
    }
  });

  // 2. Consulta de Releases de Conteúdo
  const releasesQuery = useQuery<ContentRelease[]>({
    queryKey: ['admin-releases', user?.id],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      if (!supabase) return MOCK_ADMIN_DATA.releases;

      const { data, error } = await supabase
        .from('content_releases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[useAdmin] Erro ao buscar releases:', error.message);
        return MOCK_ADMIN_DATA.releases;
      }

      return (data as ContentRelease[]) || [];
    }
  });

  // 3. Consulta de Pendências Editoriais
  const issuesQuery = useQuery<EditorialIssue[]>({
    queryKey: ['admin-issues', user?.id],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      if (!supabase) return MOCK_ADMIN_DATA.issues;

      const { data, error } = await supabase
        .from('editorial_issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[useAdmin] Erro ao buscar pendências editoriais:', error.message);
        return MOCK_ADMIN_DATA.issues;
      }

      return (data as EditorialIssue[]) || [];
    }
  });

  // 4. Consulta de Audit Log
  const auditQuery = useQuery<AuditLog[]>({
    queryKey: ['admin-audit-log', user?.id],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      if (!supabase) return MOCK_ADMIN_DATA.auditLogs;

      const { data, error } = await supabase
        .from('audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.warn('[useAdmin] Erro ao buscar audit log:', error.message);
        return MOCK_ADMIN_DATA.auditLogs;
      }

      return (data as AuditLog[]) || [];
    }
  });

  // 5. Consulta de Capítulos e Status Editorial
  const chaptersQuery = useQuery<Chapter[]>({
    queryKey: ['admin-chapters', user?.id],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .order('number', { ascending: true });

      if (error) {
        console.warn('[useAdmin] Erro ao buscar capítulos para admin:', error.message);
        return [];
      }

      return (data as Chapter[]) || [];
    }
  });

  // Mutação: Criar Convite
  const createInviteMutation = useMutation({
    mutationFn: async ({ email, role = 'student', expiresDays = 7 }: CreateInviteInput) => {
      if (!supabase) {
        const newGrant: AccessGrant = {
          id: `grant-mock-${Date.now()}`,
          email,
          role,
          status: 'pending',
          invited_by: user?.id ?? null,
          expires_at: new Date(Date.now() + expiresDays * 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return { success: true, grant: newGrant };
      }

      const { data, error } = await supabase.rpc('admin_create_access_grant', {
        p_email: email,
        p_role: role,
        p_expires_days: expiresDays
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-grants'] });
      queryClient.invalidateQueries({ queryKey: ['admin-audit-log'] });
    }
  });

  // Mutação: Revogar Convite
  const revokeInviteMutation = useMutation({
    mutationFn: async (grantId: string) => {
      if (!supabase) return { success: true };

      const { data, error } = await supabase.rpc('admin_revoke_access_grant', {
        p_grant_id: grantId
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-grants'] });
      queryClient.invalidateQueries({ queryKey: ['admin-audit-log'] });
    }
  });

  // Mutação: Publicar Release
  const publishReleaseMutation = useMutation({
    mutationFn: async (releaseId: string) => {
      if (!supabase) return { success: true };

      const { data, error } = await supabase.rpc('admin_publish_release', {
        p_release_id: releaseId
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-releases'] });
      queryClient.invalidateQueries({ queryKey: ['admin-chapters'] });
      queryClient.invalidateQueries({ queryKey: ['admin-audit-log'] });
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
    }
  });

  // Mutação: Alterar Status Editorial de Capítulo (Soft-hide / Publish / Block)
  const setChapterStatusMutation = useMutation({
    mutationFn: async ({ chapterId, status }: { chapterId: string; status: string }) => {
      if (!supabase) return { success: true };

      const { data, error } = await supabase.rpc('admin_set_chapter_status', {
        p_chapter_id: chapterId,
        p_status: status
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chapters'] });
      queryClient.invalidateQueries({ queryKey: ['admin-audit-log'] });
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
    }
  });

  // Mutação: Resolver Pendência Editorial
  const resolveIssueMutation = useMutation({
    mutationFn: async ({ issueId, resolutionStatus = 'resolved' }: { issueId: string; resolutionStatus?: string }) => {
      if (!supabase) return { success: true };

      const { data, error } = await supabase.rpc('admin_resolve_editorial_issue', {
        p_issue_id: issueId,
        p_resolution_status: resolutionStatus
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-issues'] });
      queryClient.invalidateQueries({ queryKey: ['admin-audit-log'] });
    }
  });

  return {
    isAdmin,
    grants: grantsQuery.data || [],
    releases: releasesQuery.data || [],
    issues: issuesQuery.data || [],
    auditLogs: auditQuery.data || [],
    chapters: chaptersQuery.data || [],
    isLoading:
      grantsQuery.isLoading ||
      releasesQuery.isLoading ||
      issuesQuery.isLoading ||
      auditQuery.isLoading,
    createInvite: createInviteMutation.mutateAsync,
    isCreatingInvite: createInviteMutation.isPending,
    revokeInvite: revokeInviteMutation.mutateAsync,
    isRevokingInvite: revokeInviteMutation.isPending,
    publishRelease: publishReleaseMutation.mutateAsync,
    isPublishingRelease: publishReleaseMutation.isPending,
    setChapterStatus: setChapterStatusMutation.mutateAsync,
    isSettingChapterStatus: setChapterStatusMutation.isPending,
    resolveIssue: resolveIssueMutation.mutateAsync,
    isResolvingIssue: resolveIssueMutation.isPending
  };
}
