import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RegisteredStudent, StudentLevel, StudentStatus } from '@/types/student';
import {
  getRegisteredStudents,
  registerNewStudent,
  updateStudentStatus,
  resetStudentPassword,
  deleteStudent,
  generateSecureDefaultPassword,
  buildWelcomeEmailTemplate,
} from '@/services/studentService';

export const AdminStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'temporary'>('all');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [initialLevel, setInitialLevel] = useState<StudentLevel>('A1');
  const [password, setPassword] = useState(generateSecureDefaultPassword());
  const [showPassword, setShowPassword] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success / notification states
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [lastRegistered, setLastRegistered] = useState<{ student: RegisteredStudent; password: string } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getRegisteredStudents();
      setStudents(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors du chargement des élèves';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleGeneratePassword = () => {
    const newPass = generateSecureDefaultPassword();
    setPassword(newPass);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await registerNewStudent({
        email: email.trim(),
        full_name: fullName.trim(),
        password: password.trim(),
        initial_level: initialLevel,
        notes: notes.trim() || undefined,
      });

      setLastRegistered({ student: res.student, password: res.password });
      setStatusMessage({
        type: 'success',
        text: `✅ L'élève ${res.student.full_name} a été inscrit(e) avec succès !`,
      });

      // Reset form
      setFullName('');
      setEmail('');
      setNotes('');
      setPassword(generateSecureDefaultPassword());
      await fetchStudents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      setStatusMessage({ type: 'error', text: `❌ ${msg}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyWelcomeMessage = async (student: RegisteredStudent, pass: string) => {
    const message = buildWelcomeEmailTemplate(student, pass);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Impossible de copier automatiquement dans le presse-papier.',
      });
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: StudentStatus, studentName: string) => {
    const nextStatus: StudentStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const actionLabel = nextStatus === 'active' ? 'réactiver' : 'suspendre';

    if (!window.confirm(`Voulez-vous vraiment ${actionLabel} le compte de ${studentName} ?`)) {
      return;
    }

    try {
      await updateStudentStatus(id, nextStatus);
      setStatusMessage({
        type: 'success',
        text: `✅ Statut mis à jour pour ${studentName} (${nextStatus === 'active' ? 'Actif' : 'Suspendu'}).`,
      });
      await fetchStudents();
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du statut';
      setStatusMessage({ type: 'error', text: `❌ ${msg}` });
    }
  };

  const handleResetPassword = async (id: string, studentName: string) => {
    const newPass = prompt(`Saisissez un nouveau mot de passe pour ${studentName} (ou laissez vide pour générer automatiquement) :`);
    if (newPass === null) return; // user cancelled

    try {
      const res = await resetStudentPassword(id, newPass.trim() || undefined);
      setStatusMessage({
        type: 'success',
        text: `🔑 Mot de passe réinitialisé pour ${studentName} : ${res.newPassword}`,
      });
      await fetchStudents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la réinitialisation';
      setStatusMessage({ type: 'error', text: `❌ ${msg}` });
    }
  };

  const handleDelete = async (id: string, studentName: string) => {
    if (!window.confirm(`Êtes-vous certain(e) de vouloir supprimer définitivement ${studentName} de la liste ?`)) {
      return;
    }

    try {
      await deleteStudent(id);
      setStatusMessage({
        type: 'success',
        text: `🗑️ L'élève ${studentName} a été supprimé(e).`,
      });
      await fetchStudents();
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      setStatusMessage({ type: 'error', text: `❌ ${msg}` });
    }
  };

  // Filtered list
  const filteredStudents = students.filter((s) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      s.full_name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      (s.notes && s.notes.toLowerCase().includes(query));

    if (!matchesQuery) return false;

    if (statusFilter === 'active') return s.status === 'active';
    if (statusFilter === 'suspended') return s.status === 'suspended';
    if (statusFilter === 'temporary') return s.is_temporary_password;
    return true;
  });

  // Metrics
  const totalCount = students.length;
  const activeCount = students.filter((s) => s.status === 'active').length;
  const suspendedCount = students.filter((s) => s.status === 'suspended').length;
  const tempCount = students.filter((s) => s.is_temporary_password).length;

  return (
    <div
      className="page page-admin-students"
      style={{
        padding: '0.75rem',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        width: '100%',
        paddingBottom: 'calc(var(--mobile-nav-height, 60px) + env(safe-area-inset-bottom, 0px) + 2rem)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Link
            to="/admin"
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
          >
            ← Centre d'Admin
          </Link>
          <Badge variant="rose">Mode Administrateur</Badge>
          <Badge variant="cyan">Accès Privé</Badge>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: 800,
            margin: '0 0 0.25rem 0',
            lineHeight: 1.2,
            wordBreak: 'break-word',
          }}
        >
          🎓 Inscription & Gestion des Élèves
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
          Créez des accès nominatifs avec mot de passe initial pour sécuriser la plateforme.
        </p>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          role="status"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            backgroundColor: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            color: statusMessage.type === 'success' ? '#10B981' : '#EF4444',
            border: `1px solid ${statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            fontWeight: 600,
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
            wordBreak: 'break-word',
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Metrics Cards: 2x2 grid on mobile <= 360px */}
      <div
        className="admin-metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Card variant="elevated" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Total Inscrits</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{totalCount}</div>
        </Card>

        <Card variant="elevated" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Élèves Actifs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981' }}>{activeCount}</div>
        </Card>

        <Card variant="elevated" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>1er Accès En Attente</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B' }}>{tempCount}</div>
        </Card>

        <Card variant="elevated" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Protection RLS</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#06B6D4', marginTop: '4px' }}>🔒 Active</div>
        </Card>
      </div>

      {/* Card Post-Registration with Copy Credentials Button */}
      {lastRegistered && (
        <Card
          variant="elevated"
          style={{
            marginBottom: '1.5rem',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🎉</span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
              Identifiants Prêts à Transmettre
            </h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 0.75rem 0' }}>
            Transmettez ces identifiants à l'élève pour sa première connexion.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg-subtle, rgba(0,0,0,0.2))',
              padding: '0.75rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              marginBottom: '0.75rem',
              wordBreak: 'break-all',
            }}
          >
            <div><strong>Élève :</strong> {lastRegistered.student.full_name}</div>
            <div><strong>E-mail :</strong> {lastRegistered.student.email}</div>
            <div><strong>Mot de passe initial :</strong> {lastRegistered.password}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleCopyWelcomeMessage(lastRegistered.student, lastRegistered.password)}
              style={{ minHeight: '44px', width: '100%' }}
            >
              {copyFeedback ? 'Message copié ! ✅' : "Copier le message d'accueil pour l'élève 📋"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLastRegistered(null)}
              style={{ minHeight: '44px', width: '100%' }}
            >
              Masquer ce panneau
            </Button>
          </div>
        </Card>
      )}

      {/* Registration Form Card */}
      <Card variant="elevated" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
          ✍️ Inscrire un Nouvel Élève
        </h2>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
            <Input
              type="text"
              label="Nom complet de l'élève"
              placeholder="ex : Sophie Martin"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              aria-label="Nom complet de l'élève"
            />

            <Input
              type="email"
              label="Adresse e-mail institutionnelle ou personnelle"
              placeholder="ex : sophie.martin@ecole.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Adresse e-mail de l'élève"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
            {/* Level selection */}
            <div>
              <label
                htmlFor="student-level-select"
                style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}
              >
                Niveau FLE Initial (CECR)
              </label>
              <select
                id="student-level-select"
                value={initialLevel}
                onChange={(e) => setInitialLevel(e.target.value as StudentLevel)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '0.9rem',
                }}
              >
                <option value="A1">A1 Débutant (Chapitres 01 à 07)</option>
                <option value="A2">A2 Élémentaire (Chapitres 08 à 14)</option>
                <option value="B1">B1 Intermédiaire (Chapitres 15 à 23)</option>
                <option value="B2">B2 Avancé (Chapitres 24 à 28)</option>
              </select>
            </div>

            {/* Password input with generator button */}
            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Mot de passe temporaire initial"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Mot de passe temporaire initial"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    title={showPassword ? 'Masquer' : 'Afficher'}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      minWidth: '44px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                }
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 0',
                  marginTop: '2px',
                  textAlign: 'left',
                }}
              >
                🎲 Générer un mot de passe sécurisé
              </button>
            </div>
          </div>

          <Input
            type="text"
            label="Notes administratives ou pédagogiques (optionnel)"
            placeholder="ex : Groupe A - Session printemps 2026"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            aria-label="Notes pédagogiques"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={!fullName.trim() || !email.trim() || !password.trim() || isSubmitting}
            style={{ minHeight: '48px', width: '100%', marginTop: '0.25rem' }}
          >
            Inscrire l'Élève 🎓
          </Button>
        </form>
      </Card>

      {/* Students List Header & Search/Filter Controls */}
      <Card variant="elevated" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              📋 Liste des Élèves Inscrits ({filteredStudents.length})
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.825rem', margin: '2px 0 0 0' }}>
              Seuls ces comptes peuvent s'authentifier dans le système.
            </p>
          </div>

          {/* Status filters */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              style={{
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: statusFilter === 'all' ? 700 : 500,
                backgroundColor: statusFilter === 'all' ? 'var(--color-primary)' : 'var(--color-bg-subtle, rgba(255,255,255,0.06))',
                color: statusFilter === 'all' ? '#fff' : 'inherit',
                minHeight: '36px',
              }}
            >
              Tous ({students.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              style={{
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: statusFilter === 'active' ? 700 : 500,
                backgroundColor: statusFilter === 'active' ? '#10B981' : 'var(--color-bg-subtle, rgba(255,255,255,0.06))',
                color: statusFilter === 'active' ? '#fff' : 'inherit',
                minHeight: '36px',
              }}
            >
              Actifs ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('suspended')}
              style={{
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: statusFilter === 'suspended' ? 700 : 500,
                backgroundColor: statusFilter === 'suspended' ? '#EF4444' : 'var(--color-bg-subtle, rgba(255,255,255,0.06))',
                color: statusFilter === 'suspended' ? '#fff' : 'inherit',
                minHeight: '36px',
              }}
            >
              Suspendus ({suspendedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('temporary')}
              style={{
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: statusFilter === 'temporary' ? 700 : 500,
                backgroundColor: statusFilter === 'temporary' ? '#F59E0B' : 'var(--color-bg-subtle, rgba(255,255,255,0.06))',
                color: statusFilter === 'temporary' ? '#fff' : 'inherit',
                minHeight: '36px',
              }}
            >
              1er Accès ({tempCount})
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: '1rem' }}>
          <Input
            type="search"
            placeholder="🔍 Rechercher par nom, e-mail ou note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher un élève"
          />
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
            Chargement de la liste des élèves...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
            Aucun élève trouvé correspondant à votre critère.
          </div>
        ) : (
          <div>
            {/* Mobile View: Responsive Cards (width < 640px and 316px) */}
            <div className="student-cards-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredStudents.map((st) => (
                <div
                  key={st.id}
                  style={{
                    backgroundColor: 'var(--color-bg-subtle, rgba(255,255,255,0.03))',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    boxSizing: 'border-box',
                    width: '100%',
                  }}
                >
                  {/* Top row: Avatar + Name + Level Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(37,99,235,0.15)',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                        }}
                      >
                        {st.full_name.charAt(0).toUpperCase()}
                      </span>
                      <strong style={{ fontSize: '0.95rem', wordBreak: 'break-word' }}>{st.full_name}</strong>
                    </div>
                    <Badge variant="cyan">{st.initial_level}</Badge>
                  </div>

                  {/* Middle row: Email + Status Badge */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div
                      style={{
                        fontSize: '0.825rem',
                        color: 'var(--color-text-muted)',
                        wordBreak: 'break-all',
                        marginBottom: '4px',
                      }}
                    >
                      {st.email}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Badge variant={st.status === 'active' ? 'emerald' : 'rose'}>
                        {st.status === 'active' ? '● Actif' : '● Suspendu'}
                      </Badge>
                      {st.is_temporary_password && (
                        <Badge variant="amber">Mot de passe par défaut</Badge>
                      )}
                    </div>
                    {st.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                        Note : {st.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions row: Buttons stacked or wrapped with min-height: 44px */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '6px',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleResetPassword(st.id, st.full_name)}
                      style={{ minHeight: '44px', fontSize: '0.75rem' }}
                      title="Réinitialiser le mot de passe"
                    >
                      🔑 Réinit. pass
                    </Button>

                    <Button
                      variant={st.status === 'active' ? 'ghost' : 'secondary'}
                      size="sm"
                      onClick={() => handleToggleStatus(st.id, st.status, st.full_name)}
                      style={{ minHeight: '44px', fontSize: '0.75rem' }}
                    >
                      {st.status === 'active' ? '⏸️ Suspendre' : '▶️ Réactiver'}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(st.id, st.full_name)}
                      style={{ minHeight: '44px', fontSize: '0.75rem', color: '#EF4444' }}
                    >
                      🗑️ Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminStudentsPage;
