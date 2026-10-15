import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { useTheory } from '@/hooks/useTheory';
import { TheoryReader } from '@/components/theory/TheoryReader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useUserProgress } from '@/hooks/useUserProgress';

export const ChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'tips'>('theory');

  // Static summary metadata
  const summaryChapter = CHAPTERS_SUMMARY.find((ch) => ch.id === chapterId);

  // Dynamic content query from Supabase
  const { data, isLoading } = useTheory(chapterId);
  const { data: progressData } = useUserProgress();

  if (!summaryChapter && !data?.chapter) {
    return (
      <div className="page page-chapter">
        <EmptyState
          icon="❌"
          title="Chapitre introuvable"
          description={`Aucun chapitre avec l'identifiant "${chapterId}" n'a été trouvé.`}
          actionLabel="Retour à la Trilha"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const chapterNum = data?.chapter?.number ?? summaryChapter?.number ?? 1;
  const chapterTitle = data?.chapter?.title ?? summaryChapter?.title ?? 'Chapitre';
  const pageRange = data?.chapter?.page_range ?? summaryChapter?.pageRange ?? '';
  const topicsCount = data?.topics?.length ?? summaryChapter?.topicsCount ?? 0;
  const exerciseSets = data?.exerciseSets ?? [];
  const exerciseCount = exerciseSets.length > 0 ? exerciseSets.length : summaryChapter?.exerciseGroups ?? 0;
  const totalQuestions =
    data?.chapter?.total_questions ??
    (summaryChapter ? summaryChapter.exerciseGroups * 10 : 0);
  const theoryMarkdown = data?.chapter?.theory_markdown;
  const editorialStatus = data?.chapter?.editorial_status ?? 'published';

  return (
    <div className="page page-chapter">
      <nav className="page-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/chapters" className="breadcrumb-link">
          🗺️ Trilha
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Chapitre {String(chapterNum).padStart(2, '0')}</span>
      </nav>

      <div className="chapter-overview-card card card-elevated">
        <div className="chapter-header-top">
          <Badge variant={editorialStatus === 'blocked' ? 'rose' : 'cyan'} className="chapter-num-badge">
            Chapitre {String(chapterNum).padStart(2, '0')}
          </Badge>
          <span className="chapter-status-pill">
            {editorialStatus === 'published' ? '✅ Publié' : editorialStatus === 'blocked' ? '⛔ Suspendu' : '⏳ En révision'}
          </span>
        </div>

        <h1 className="chapter-hero-title">{chapterTitle}</h1>

        <div className="chapter-overview-meta">
          <Badge variant="default">📚 {topicsCount} sujets</Badge>
          <Badge variant="default">🎯 {exerciseCount} séries</Badge>
          <Badge variant="emerald">⚡ {totalQuestions} questions</Badge>
          {pageRange && <Badge variant="violet">📄 Pages {pageRange}</Badge>}
        </div>

        {/* Tab Controls */}
        <div className="chapter-tabs" role="tablist" aria-label="Sections du chapitre">
          <button
            type="button"
            role="tab"
            aria-label="📖 Théorie & Règles"
            aria-selected={activeTab === 'theory'}
            className={`chapter-tab-btn ${activeTab === 'theory' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            <span>📖 Théorie<span className="tab-desktop-text"> & Règles</span></span>
          </button>
          <button
            type="button"
            role="tab"
            aria-label={`🎯 Exercices (${exerciseCount})`}
            aria-selected={activeTab === 'exercises'}
            className={`chapter-tab-btn ${activeTab === 'exercises' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('exercises')}
          >
            <span>🎯 Exercices ({exerciseCount})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-label="👨‍🏫 Astuces FLE"
            aria-selected={activeTab === 'tips'}
            className={`chapter-tab-btn ${activeTab === 'tips' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <span>👨‍🏫 Astuces<span className="tab-desktop-text"> FLE</span></span>
          </button>
        </div>
      </div>

      {editorialStatus === 'blocked' && (
        <div
          role="alert"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>⚠️</span>
          <div>
            <strong style={{ color: '#EF4444', fontSize: '1rem', display: 'block', marginBottom: '0.2rem' }}>
              Chapitre temporairement suspendu pour révision éditoriale
            </strong>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Les exercices de ce chapitre sont temporairement inaccessibles pendant l'audit. Votre progression historique et vos points acquis restent intégralement préservés.
            </p>
          </div>
        </div>
      )}

      {chapterNum === 28 && (
        <div
          role="region"
          aria-label="Épreuve Finale"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(59, 130, 246, 0.08))',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>👑</span>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
              <Badge variant="amber">Épreuve Finale</Badge>
              <Badge variant="cyan">35 séries · 345 questions</Badge>
              <Badge variant="emerald">7 Checkpoints</Badge>
            </div>
            <strong style={{ fontSize: '1.1rem', display: 'block', color: 'var(--color-text)' }}>
              Le Grand Boss : Pot-pourri des 28 Chapitres
            </strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Relevez l'ultime défi de grammaire française ! Votre avancée est sauvegardée automatiquement toutes les 5 séries.
            </p>
          </div>
        </div>
      )}

      {/* Tab 1: Theory Reader */}
      {activeTab === 'theory' && (
        <section className="chapter-tab-panel" role="tabpanel" aria-label="Théorie">
          {isLoading ? (
            <div className="card card-default theory-loading-skeleton" aria-busy="true">
              <Skeleton width="40%" height="28px" className="mb-4" />
              <Skeleton width="100%" height="16px" className="mb-2" />
              <Skeleton width="90%" height="16px" className="mb-2" />
              <Skeleton width="75%" height="16px" className="mb-6" />
              <Skeleton width="100%" height="120px" className="mb-4" />
            </div>
          ) : theoryMarkdown ? (
            <div className="card card-default theory-container">
              <TheoryReader
                content={theoryMarkdown}
              />

              <div className="theory-next-action-card card card-elevated">
                <div className="theory-next-action-header">
                  <span className="theory-next-action-icon" aria-hidden="true">🎯</span>
                  <div className="theory-next-action-body">
                    <h3 className="theory-next-action-title">Théorie assimilée ? Place à la pratique !</h3>
                    <p className="theory-next-action-desc">
                      Vous avez compris les règles, les pronoms et les ajustements phonétiques. Testez vos réflexes dès maintenant sur les <strong>{exerciseCount} séries d'exercices gamifiés</strong> !
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="theory-start-exercises-btn"
                  onClick={() => {
                    setActiveTab('exercises');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Passer aux Exercices 🚀
                </Button>
              </div>
            </div>
          ) : (
            <div className="card card-default theory-pending-card">
              <div className="pending-icon" aria-hidden="true">
                ⏳
              </div>
              <h3>Théorie en cours de révision éditoriale</h3>
              <p className="text-muted">
                La théorie complète et les règles de ce chapitre sont en cours de validation pédagogique par notre équipe FLE.
              </p>
              <div className="mt-4">
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('exercises')}
                >
                  Passer aux Exercices
                </Button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Exercises List */}
      {activeTab === 'exercises' && (
        <section className="chapter-tab-panel" role="tabpanel" aria-label="Exercices">
          {exerciseSets.length > 0 ? (
            <div className="exercises-grid">
              {exerciseSets.map((ex) => {
                const setProgress = progressData?.progressBySet[ex.id];
                const isCompleted = setProgress?.status === 'completed';
                const isInProgress = setProgress?.status === 'in_progress';
                const bestStars = setProgress?.best_stars ?? 0;

                return (
                  <div key={ex.id} className="card card-default exercise-card">
                    <div className="exercise-card-header">
                      <div className="exercise-title-group">
                        <span className="exercise-order-badge">#{ex.order_index}</span>
                        <h3 className="exercise-title">{ex.title}</h3>
                      </div>
                      <div className="exercise-badges-row">
                        {isCompleted && (
                          <Badge variant="emerald">
                            Complété {bestStars > 0 ? `${'★'.repeat(bestStars)}` : '✓'}
                          </Badge>
                        )}
                        {isInProgress && (
                          <Badge variant="amber">En cours ▶️</Badge>
                        )}
                        <Badge variant={ex.interaction_type === 'fill_blank' ? 'cyan' : 'amber'}>
                          {ex.interaction_type}
                        </Badge>
                      </div>
                    </div>

                    <p className="exercise-instruction" lang="fr">
                      {ex.instruction}
                    </p>

                    <div className="exercise-card-footer">
                      <span className="exercise-q-count">
                        📝 {ex.questions_count} questions
                      </span>
                      <Button
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        disabled={editorialStatus === 'blocked'}
                        onClick={() => navigate(`/exercise/${ex.id}`)}
                      >
                        {editorialStatus === 'blocked'
                          ? 'Suspendu 🚫'
                          : isCompleted
                          ? 'Refaire 🔄'
                          : isInProgress
                          ? 'Reprendre ▶️'
                          : 'Commencer 🚀'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="exercises-grid">
              {Array.from({ length: summaryChapter?.exerciseGroups ?? 10 }, (_, i) => (
                <div key={i} className="card card-default exercise-card">
                  <div className="exercise-card-header">
                    <div className="exercise-title-group">
                      <span className="exercise-order-badge">#{i + 1}</span>
                      <h3 className="exercise-title">
                        Exercice {chapterNum}.{i + 1}
                      </h3>
                    </div>
                    <Badge variant="cyan">fill_blank</Badge>
                  </div>
                  <p className="exercise-instruction" lang="fr">
                    Exercices pratiques de grammaire française
                  </p>
                  <div className="exercise-card-footer">
                    <span className="exercise-q-count">📝 10 questions</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/exercise/${chapterId || 'ch01'}-ex${String(i + 1).padStart(2, '0')}`)}
                    >
                      Commencer 🚀
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Professor Tips (FLE Pedagogy) */}
      {activeTab === 'tips' && (
        <section className="chapter-tab-panel" role="tabpanel" aria-label="Astuces FLE">
          <div className="tips-deck">
            <div className="tip-card card card-default">
              <div className="tip-card-icon">🔇</div>
              <div className="tip-card-body">
                <h3>Les Terminaisons Muettes</h3>
                <p>
                  En français, les terminaisons du présent en <strong>-e, -es, -ent</strong> ne se prononcent JAMAIS.
                </p>
                <div className="tip-example" lang="fr">
                  <em>Je parle</em>, <em>tu parles</em>, <em>il parle</em>, <em>ils parlent</em> se prononcent tous <strong>/paʁl/</strong>.
                </div>
              </div>
            </div>

            <div className="tip-card card card-default">
              <div className="tip-card-icon">✂️</div>
              <div className="tip-card-body">
                <h3>L'Élision Obligatoire avec « Je »</h3>
                <p>
                  Devant une voyelle ou un <em>h</em> muet, le pronom <strong>je</strong> s'élide obligatoirement en <strong>j'</strong>.
                </p>
                <div className="tip-example" lang="fr">
                  ❌ <em>*Je aime</em> → ✅ <strong>J'aime</strong><br />
                  ❌ <em>*Je habite</em> → ✅ <strong>J'habite</strong>
                </div>
              </div>
            </div>

            <div className="tip-card card card-default">
              <div className="tip-card-icon">🎵</div>
              <div className="tip-card-body">
                <h3>La Liaison Euphonique</h3>
                <p>
                  Le <em>-s</em> final de <strong>nous, vous, ils, elles</strong> se lie au verbe débutant par une voyelle avec un son <strong>[z]</strong>.
                </p>
                <div className="tip-example" lang="fr">
                  <em>Ils aiment</em> se prononce <strong>[il-z-ɛm]</strong>.
                </div>
              </div>
            </div>

            <div className="tip-card card card-default">
              <div className="tip-card-icon">👥</div>
              <div className="tip-card-body">
                <h3>Le Pronom « On » (Le "A Gente" Français)</h3>
                <p>
                  Dans la langue quotidienne, <strong>on</strong> remplace <em>nous</em> 9 fois sur 10, mais se conjugue toujours au <strong>singulier</strong> comme <em>il/elle</em>.
                </p>
                <div className="tip-example" lang="fr">
                  <em>On va au cinéma ce soir ?</em> (On + 3e personne du singulier).
                </div>
              </div>
            </div>

            <div className="tip-card card card-default">
              <div className="tip-card-icon">🔤</div>
              <div className="tip-card-body">
                <h3>Ajustements Euphoniques (-cer & -ger)</h3>
                <p>
                  Pour préserver la prononciation du radical devant la voyelle <em>o</em> de <strong>nous</strong> :
                </p>
                <div className="tip-example" lang="fr">
                  • <em>Commencer</em> → <strong>Nous commençons</strong> (cédille ç = son [s])<br />
                  • <em>Manger</em> → <strong>Nous mangeons</strong> (e intercalé = son [ʒ])
                </div>
              </div>
            </div>

            <div className="tip-card card card-default">
              <div className="tip-card-icon">⏳</div>
              <div className="tip-card-body">
                <h3>L'Action Continue avec « Depuis »</h3>
                <p>
                  Attention lusophones ! Une action débutée dans le passé qui continue aujourd'hui se dit toujours au <strong>PRÉSENT</strong> en français :
                </p>
                <div className="tip-example" lang="fr">
                  ❌ <em>*J'ai habité à Nice pendant 3 ans</em> (passé)<br />
                  ✅ <strong>J'habite à Nice depuis trois ans</strong> (présent toujours actif)
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ChapterPage;
