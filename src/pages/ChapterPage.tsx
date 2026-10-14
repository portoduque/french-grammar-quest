import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { useTheory } from '@/hooks/useTheory';
import { TheoryReader } from '@/components/theory/TheoryReader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

export const ChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'tips'>('theory');

  // Static summary metadata
  const summaryChapter = CHAPTERS_SUMMARY.find((ch) => ch.id === chapterId);

  // Dynamic content query from Supabase
  const { data, isLoading } = useTheory(chapterId);

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
          <Badge variant="cyan" className="chapter-num-badge">
            Chapitre {String(chapterNum).padStart(2, '0')}
          </Badge>
          <span className="chapter-status-pill">
            {editorialStatus === 'published' ? '✅ Publié' : '⏳ En révision'}
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
            aria-selected={activeTab === 'theory'}
            className={`chapter-tab-btn ${activeTab === 'theory' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            📖 Théorie & Règles
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'exercises'}
            className={`chapter-tab-btn ${activeTab === 'exercises' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('exercises')}
          >
            🎯 Exercices ({exerciseCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'tips'}
            className={`chapter-tab-btn ${activeTab === 'tips' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            👨‍🏫 Astuces FLE
          </button>
        </div>
      </div>

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
                chapterNumber={chapterNum}
                chapterTitle={chapterTitle}
              />
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
              {exerciseSets.map((ex) => (
                <div key={ex.id} className="card card-default exercise-card">
                  <div className="exercise-card-header">
                    <div className="exercise-title-group">
                      <span className="exercise-order-badge">#{ex.order_index}</span>
                      <h3 className="exercise-title">{ex.title}</h3>
                    </div>
                    <Badge variant={ex.interaction_type === 'fill_blank' ? 'cyan' : 'amber'}>
                      {ex.interaction_type}
                    </Badge>
                  </div>

                  <p className="exercise-instruction" lang="fr">
                    {ex.instruction}
                  </p>

                  <div className="exercise-card-footer">
                    <span className="exercise-q-count">
                      📝 {ex.questions_count} questions
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => alert(`Démarrage de l'exercice ${ex.title} (Moteur d'exercices - Etapa 4)`)}
                    >
                      Commencer 🚀
                    </Button>
                  </div>
                </div>
              ))}
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
                    <Button variant="secondary" size="sm" disabled>
                      Bientôt disponible
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
          </div>
        </section>
      )}
    </div>
  );
};

export default ChapterPage;
