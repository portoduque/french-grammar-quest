import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAdmin } from '@/hooks/useAdmin';
import { AccessGrant } from '@/types/database';

export const AdminPage: React.FC = () => {
  const {
    grants,
    releases,
    issues,
    auditLogs,
    chapters,
    isLoading,
    createInvite,
    isCreatingInvite,
    revokeInvite,
    isRevokingInvite,
    publishRelease,
    isPublishingRelease,
    setChapterStatus,
    isSettingChapterStatus,
    resolveIssue,
    isResolvingIssue
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'invites' | 'releases' | 'content' | 'audit'>('invites');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [inviteDays, setInviteDays] = useState(7);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    try {
      await createInvite({ email: inviteEmail.trim(), role: inviteRole, expiresDays: inviteDays });
      setStatusMessage(`✅ Invitation créée avec succès pour ${inviteEmail} (${inviteRole}).`);
      setInviteEmail('');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`❌ Erreur : ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleCopyInviteLink = async (email: string) => {
    const inviteUrl = `${window.location.origin}/login?email=${encodeURIComponent(email)}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = inviteUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setStatusMessage(`📋 Lien d'invitation copié pour ${email} !`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage(`ℹ️ Lien d'invitation : ${inviteUrl}`);
      setTimeout(() => setStatusMessage(null), 8000);
    }
  };

  const handleRevoke = async (grantId: string, email: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir révoquer l'accès pour ${email} ?`)) return;
    try {
      await revokeInvite(grantId);
      setStatusMessage(`✅ Accès révoqué pour ${email}.`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`❌ Erreur : ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handlePublishRelease = async (releaseId: string, version: string) => {
    try {
      await publishRelease(releaseId);
      setStatusMessage(`✅ Release ${version} publiée avec succès en production.`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`❌ Impossible de publier : ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleToggleChapter = async (chapterId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'blocked' : 'published';
    try {
      await setChapterStatus({ chapterId, status: nextStatus });
      const label = nextStatus === 'blocked' ? 'suspendu (soft-hide)' : 'publié';
      setStatusMessage(`✅ Statut du chapitre mis à jour : ${label}.`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`❌ Erreur : ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleResolveIssue = async (issueId: string) => {
    try {
      await resolveIssue({ issueId, resolutionStatus: 'resolved' });
      setStatusMessage('✅ Signalement éditorial marqué comme résolu.');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage(`❌ Erreur : ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const isExpired = (grant: AccessGrant) => {
    if (!grant.expires_at) return false;
    return new Date(grant.expires_at).getTime() < Date.now();
  };

  return (
    <div className="page page-admin">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              🛠️ Centre d'Administration & Publication
            </h1>
            <p className="page-subtitle" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              Gestion sécurisée des accès, conformité éditoriale, gouvernance de contenu et audit
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Badge variant="rose">Mode Administrateur</Badge>
            <Badge variant="cyan">RLS Actif</Badge>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: statusMessage.startsWith('✅') ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            color: statusMessage.startsWith('✅') ? '#10B981' : '#EF4444',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Tabs */}
      <div
        className="admin-tabs"
        style={{
          display: 'flex',
          gap: '0.75rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('invites')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'invites' ? 700 : 500,
            color: activeTab === 'invites' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.85rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'invites' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <span>✉️ Invitations & Accès</span>
          <Badge variant="default">{grants.length}</Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('releases')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'releases' ? 700 : 500,
            color: activeTab === 'releases' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.85rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'releases' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <span>📦 Releases & Workflow</span>
          <Badge variant="amber">{releases.length}</Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'content' ? 700 : 500,
            color: activeTab === 'content' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.85rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'content' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <span>📚 Chapitres & Pilote</span>
          <Badge variant="cyan">{chapters.length}</Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'audit' ? 700 : 500,
            color: activeTab === 'audit' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.85rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'audit' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <span>📜 Audit Log & Issues</span>
          <Badge variant="rose">{issues.filter((i) => i.status === 'open').length}</Badge>
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton height="120px" />
          <Skeleton height="120px" />
          <Skeleton height="120px" />
        </div>
      ) : (
        <>
          {/* TAB 1: Invitations */}
          {activeTab === 'invites' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Card variant="elevated" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                  Inviter un Nouvel Utilisateur (Allowlist)
                </h2>
                <form onSubmit={handleCreateInvite} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <Input
                      label="Adresse E-mail :"
                      type="email"
                      placeholder="exemple@domaine.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />

                    <div>
                      <label htmlFor="invite-role" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Rôle / Privilèges :
                      </label>
                      <select
                        id="invite-role"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text)'
                        }}
                      >
                        <option value="student">Étudiant (Student)</option>
                        <option value="teacher">Professeur (Teacher)</option>
                        <option value="admin">Administrateur (Admin)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="invite-days" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Validité de l'invitation :
                      </label>
                      <select
                        id="invite-days"
                        value={inviteDays}
                        onChange={(e) => setInviteDays(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.8rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text)'
                        }}
                      >
                        <option value={1}>24 heures</option>
                        <option value={7}>7 jours (Recommandé)</option>
                        <option value={30}>30 jours</option>
                        <option value={365}>1 an</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Button variant="primary" size="md" disabled={isCreatingInvite || !inviteEmail.trim()}>
                      {isCreatingInvite ? 'Envoi...' : 'Générer & Envoyer l’Invitation 🚀'}
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Grants Table */}
              <Card variant="elevated" style={{ padding: '1.5rem', overflowX: 'auto' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                  Invitations & Accès Enregistrés ({grants.length})
                </h2>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '0.75rem 0.5rem' }}>E-mail</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Rôle</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Statut</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Expiration</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grants.map((grant) => {
                      const expired = isExpired(grant);
                      return (
                        <tr key={grant.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{grant.email}</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <Badge variant={grant.role === 'admin' ? 'rose' : grant.role === 'teacher' ? 'violet' : 'default'}>
                              {grant.role}
                            </Badge>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            {grant.status === 'revoked' ? (
                              <Badge variant="rose">Révoqué</Badge>
                            ) : expired ? (
                              <Badge variant="amber">Expiré</Badge>
                            ) : grant.status === 'active' ? (
                              <Badge variant="emerald">Actif</Badge>
                            ) : (
                              <Badge variant="cyan">En attente</Badge>
                            )}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-text-muted)' }}>
                            {grant.expires_at ? new Date(grant.expires_at).toLocaleDateString('fr-FR') : 'Permanente'}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              {grant.status !== 'revoked' && (
                                <>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleCopyInviteLink(grant.email)}
                                  >
                                    Copier 📋
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={isRevokingInvite}
                                    onClick={() => handleRevoke(grant.id, grant.email)}
                                  >
                                    Révoquer ✕
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* TAB 2: Releases */}
          {activeTab === 'releases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Card variant="elevated" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                  Workflow de Publication Editorial (PRD §22)
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Pour être publiée, une version doit impérativement disposer d'une approbation éditoriale certifiée et de la libération des droits.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {releases.map((rel) => {
                    const isPublished = rel.status === 'published';
                    const canPublish = rel.editorial_approved && rel.rights_cleared && !isPublished;

                    return (
                      <div
                        key={rel.id}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '12px',
                          border: isPublished ? '2px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.02))'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{rel.version}</span>
                            <Badge variant={isPublished ? 'emerald' : 'amber'}>
                              {isPublished ? 'Publiée en Production' : 'Brouillon / Validation'}
                            </Badge>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            Créée le {new Date(rel.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.875rem' }}>
                          <div>
                            <span style={{ color: 'var(--color-text-muted)' }}>Approbation éditoriale : </span>
                            <strong>{rel.editorial_approved ? '✅ Certifiée' : '❌ Non approuvée'}</strong>
                          </div>
                          <div>
                            <span style={{ color: 'var(--color-text-muted)' }}>Libération des droits : </span>
                            <strong>{rel.rights_cleared ? '✅ Validée' : '❌ En attente'}</strong>
                          </div>
                          {rel.published_at && (
                            <div>
                              <span style={{ color: 'var(--color-text-muted)' }}>Publiée le : </span>
                              <strong>{new Date(rel.published_at).toLocaleDateString('fr-FR')}</strong>
                            </div>
                          )}
                        </div>

                        {!isPublished && (
                          <div>
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={!canPublish || isPublishingRelease}
                              onClick={() => handlePublishRelease(rel.id, rel.version)}
                            >
                              {isPublishingRelease ? 'Publication...' : 'Publier cette Release 🚀'}
                            </Button>
                            {!canPublish && (
                              <span style={{ marginLeft: '0.75rem', fontSize: '0.8rem', color: '#EF4444' }}>
                                Requiert l'approbation éditoriale et la libération des droits.
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: Chapters & Pilot */}
          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Card variant="elevated" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
                      Gouvernance de Contenu & Chapitre Pilote (Ch01)
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                      Retirez temporairement un chapitre (soft-hide) sans corrompre le progrès historique des étudiants.
                    </p>
                  </div>
                  <Badge variant="emerald">Ch01 Pilote : 100 questions vérifiées</Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {chapters.map((ch) => {
                    const isChPublished = ch.editorial_status === 'published';
                    const isBlocked = ch.editorial_status === 'blocked';

                    return (
                      <div
                        key={ch.id}
                        style={{
                          padding: '1rem',
                          borderRadius: '10px',
                          border: isBlocked ? '2px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--color-border)',
                          backgroundColor: isBlocked ? 'rgba(239, 68, 68, 0.04)' : 'var(--color-bg-secondary, rgba(0,0,0,0.02))'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                              Chapitre {ch.number} · {ch.world_name}
                            </span>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>
                              {ch.title}
                            </h3>
                          </div>
                          <Badge variant={isBlocked ? 'rose' : isChPublished ? 'emerald' : 'amber'}>
                            {ch.editorial_status}
                          </Badge>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                          {ch.total_questions} questions · {ch.exercise_groups_count} séries
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={isSettingChapterStatus}
                          onClick={() => handleToggleChapter(ch.id, ch.editorial_status)}
                        >
                          {isBlocked ? 'Débloquer le chapitre ✓' : 'Suspendre / Bloquer 🚫'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* TAB 4: Audit & Issues */}
          {activeTab === 'audit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Editorial Issues */}
              <Card variant="elevated" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                  Signalements & Suivi Éditorial (RF-068)
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Suivi des anomalies de texte, mise en forme et points d'attention didactiques.
                </p>

                {issues.length === 0 ? (
                  <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    Aucun signalement éditorial en attente.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {issues.map((iss) => (
                      <div
                        key={iss.id}
                        style={{
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <Badge variant={iss.severity === 'high' || iss.severity === 'blocker' ? 'rose' : 'amber'}>
                              {iss.severity}
                            </Badge>
                            <Badge variant="default">{iss.issue_type}</Badge>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                              {iss.chapter_id ? `Chapitre ${iss.chapter_id}` : ''} {iss.page_number ? `· p. ${iss.page_number}` : ''}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.9rem' }}>{iss.description}</p>
                        </div>

                        <div>
                          {iss.status === 'open' ? (
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={isResolvingIssue}
                              onClick={() => handleResolveIssue(iss.id)}
                            >
                              Marquer Résolu ✓
                            </Button>
                          ) : (
                            <Badge variant="emerald">Résolu</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Audit Log */}
              <Card variant="elevated" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                  Journal d'Audit Immuable (Audit Log — RF-067)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.02))',
                        borderLeft: '3px solid var(--color-primary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div>
                        <strong>{log.event}</strong> · <span style={{ color: 'var(--color-text-muted)' }}>{log.target_type} ({log.target_id})</span>
                        {log.metadata && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                            {JSON.stringify(log.metadata)}
                          </div>
                        )}
                      </div>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {new Date(log.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;
