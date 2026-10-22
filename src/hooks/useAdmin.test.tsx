import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdmin } from './useAdmin';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: vi.fn(),
    rpc: vi.fn()
  }
}));

import { supabase } from '@/lib/supabase';

describe('useAdmin hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    useAuthStore.setState({
      user: { id: 'admin-001', email: 'admin@fqg.com' } as any,
      profile: {
        id: 'admin-001',
        email: 'admin@fqg.com',
        role: 'admin',
        display_name: 'Super Admin'
      } as any,
      isInitialized: true,
      authError: null
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('carrega dados administrativos completos (convites, releases, issues, audit logs)', async () => {
    const mockGrants = [
      { id: 'g-1', email: 'etudiant@fqg.com', role: 'student', status: 'pending', expires_at: null, created_at: '2026-10-14T00:00:00Z', updated_at: '2026-10-14T00:00:00Z', invited_by: null }
    ];
    const mockReleases = [
      { id: 'rel-1', version: 'v1.0.0', status: 'published', editorial_approved: true, rights_cleared: true, created_at: '2026-10-14T00:00:00Z', published_at: '2026-10-14T00:00:00Z' }
    ];
    const mockIssues = [
      { id: 'iss-1', chapter_id: 'ch01', question_id: null, page_number: 28, severity: 'low', issue_type: 'formatting', description: 'Clipped scan', status: 'resolved', reported_by: null, created_at: '2026-10-14T00:00:00Z', resolved_at: '2026-10-14T00:00:00Z' }
    ];
    const mockLogs = [
      { id: 'log-1', actor_id: 'admin-001', event: 'content_published', target_type: 'content_releases', target_id: 'rel-1', metadata: {}, created_at: '2026-10-14T00:00:00Z' }
    ];
    const mockChapters = [
      { id: 'ch01', number: 1, title: 'Present tense', world_name: 'Fondations', world_number: 1, editorial_status: 'published', total_questions: 100, exercise_groups_count: 10, topics_count: 3, page_range: '23-39', slug: 'present-er-verbs', theory_markdown: null, release_id: 'rel-1', created_at: '2026-10-14T00:00:00Z', updated_at: '2026-10-14T00:00:00Z' }
    ];

    (supabase!.from as any).mockImplementation((table: string) => {
      switch (table) {
        case 'access_grants':
          return { select: vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: mockGrants, error: null }) }) };
        case 'content_releases':
          return { select: vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: mockReleases, error: null }) }) };
        case 'editorial_issues':
          return { select: vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: mockIssues, error: null }) }) };
        case 'audit_log':
          return { select: vi.fn().mockReturnValue({ order: vi.fn().mockReturnValue({ limit: vi.fn().mockResolvedValue({ data: mockLogs, error: null }) }) }) };
        case 'chapters':
          return { select: vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: mockChapters, error: null }) }) };
        default:
          return { select: vi.fn() };
      }
    });

    const { result } = renderHook(() => useAdmin(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAdmin).toBe(true);
    expect(result.current.grants).toHaveLength(1);
    expect(result.current.releases).toHaveLength(1);
    expect(result.current.issues).toHaveLength(1);
    expect(result.current.auditLogs).toHaveLength(1);
    expect(result.current.chapters).toHaveLength(1);
  });

  it('permite criar convite com chamada a RPC admin_create_access_grant', async () => {
    (supabase!.from as any).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [], error: null }),
          then: vi.fn()
        }),
        limit: vi.fn().mockResolvedValue({ data: [], error: null })
      })
    }));

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true, grant: { email: 'nouveau@fqg.com', role: 'student' } },
      error: null
    });

    const { result } = renderHook(() => useAdmin(), { wrapper });

    const res = await result.current.createInvite({
      email: 'nouveau@fqg.com',
      role: 'student',
      expiresDays: 7
    });

    expect(supabase!.rpc).toHaveBeenCalledWith('admin_create_access_grant', {
      p_email: 'nouveau@fqg.com',
      p_role: 'student',
      p_expires_days: 7
    });
    expect(res).toEqual({ success: true, grant: { email: 'nouveau@fqg.com', role: 'student' } });
  });

  it('permite revogar convite via RPC admin_revoke_access_grant', async () => {
    (supabase!.from as any).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    }));

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    const { result } = renderHook(() => useAdmin(), { wrapper });

    const res = await result.current.revokeInvite('grant-123');

    expect(supabase!.rpc).toHaveBeenCalledWith('admin_revoke_access_grant', {
      p_grant_id: 'grant-123'
    });
    expect(res).toEqual({ success: true });
  });

  it('permite revogar convite mock sem chamar RPC', async () => {
    const { result } = renderHook(() => useAdmin(), { wrapper });

    const res = await result.current.revokeInvite('grant-mock-123');

    expect(supabase!.rpc).not.toHaveBeenCalled();
    expect(res).toEqual({ success: true });
  });

  it('permite publicar release via RPC admin_publish_release', async () => {
    (supabase!.from as any).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    }));

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    const { result } = renderHook(() => useAdmin(), { wrapper });

    const res = await result.current.publishRelease('rel-123');

    expect(supabase!.rpc).toHaveBeenCalledWith('admin_publish_release', {
      p_release_id: 'rel-123'
    });
    expect(res).toEqual({ success: true });
  });

  it('permite alternar status editorial de capítulo via RPC admin_set_chapter_status', async () => {
    (supabase!.from as any).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    }));

    (supabase!.rpc as any).mockResolvedValueOnce({
      data: { success: true },
      error: null
    });

    const { result } = renderHook(() => useAdmin(), { wrapper });

    const res = await result.current.setChapterStatus({ chapterId: 'ch01', status: 'blocked' });

    expect(supabase!.rpc).toHaveBeenCalledWith('admin_set_chapter_status', {
      p_chapter_id: 'ch01',
      p_status: 'blocked'
    });
    expect(res).toEqual({ success: true });
  });
});
