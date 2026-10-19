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
          {chapterNum === 2 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>Les Deux Types de Verbes en -IR</h3>
                  <p>
                    Au 2e groupe (régulier), le pluriel s'enrichit de l'interfixe <strong>-iss-</strong>. Au 3e groupe (irrégulier), pas d'interfixe et le radical du singulier perd souvent sa consonne finale !
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Finir</em> (type 1) → <strong>Nous finissons</strong>, <strong>ils finissent</strong><br />
                    • <em>Sortir</em> (type 2) → <strong>Je sors</strong>, <strong>nous sortons</strong> (sans -iss-)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Les « Faux -IR » Conjugués comme des -ER</h3>
                  <p>
                    Ces 4 verbes terminent en <em>-ir</em>, mais s'habillent avec les terminaisons des verbes en <em>-er</em> au présent :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Ouvrir</em> → <strong>J'ouvre</strong>, <strong>tu ouvres</strong>, <strong>il ouvre</strong><br />
                    • <em>Offrir</em> → <strong>J'offre</strong>, <strong>ils offrent</strong><br />
                    • <em>Cueillir</em> → <strong>Je cueille</strong>, <strong>nous cueillons</strong><br />
                    • <em>Couvrir</em> / <em>Souffrir</em> → <strong>Je couvre</strong>, <strong>je souffre</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>Verbes en -RE : Le 'D' à la 3e Personne</h3>
                  <p>
                    Avec <em>il / elle / on</em>, ne rajoutez rien ! Le <strong>d</strong> du radical reste nu et silencieux :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Vendre</em> → <strong>Il vend</strong> (se prononce [vɑ̃])<br />
                    • <em>Attendre</em> → <strong>Elle attend</strong> (se prononce [atɑ̃])<br />
                    • <em>Répondre</em> → <strong>On répond</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🖐️</div>
                <div className="tip-card-body">
                  <h3>La Famille « Prendre » et ses Pièges</h3>
                  <p>
                    Attention aux changements de radical spectaculaires de <em>prendre</em>, <em>apprendre</em>, <em>comprendre</em> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • Avec <em>nous / vous</em> : le <strong>d</strong> disparaît ! → <strong>Nous prenons</strong>, <strong>vous comprenez</strong><br />
                    • Avec <em>ils / elles</em> : le <strong>n</strong> double ! → <strong>Ils prennent</strong>, <strong>elles apprennent</strong> [pʁɛn]
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔀</div>
                <div className="tip-card-body">
                  <h3>L'Inversion et le « -t- » Euphonique</h3>
                  <p>
                    Quand le verbe se termine par une voyelle à la 3e personne du singulier, insérez obligatoirement un <strong>-t-</strong> entre traits d'union :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Parle-elle russe ?</em> → ✅ <strong>Parle-t-elle russe ?</strong><br />
                    ❌ <em>*Préfère-elle voyager ?</em> → ✅ <strong>Préfère-t-elle voyager ?</strong><br />
                    <em>Attention :</em> si le verbe finit déjà par d ou t, pas de t ajouté : <strong>Réfléchit-il ?</strong>, <strong>Agrandit-elle ?</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚖️</div>
                <div className="tip-card-body">
                  <h3>La Règle d'Or de « Ni ... Ni ... » (Cruciale !)</h3>
                  <p>
                    C'est l'un des pièges les plus fréquents pour les lusophones :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Articles définis (le, la, l', les)</strong> : ON LES GARDE !<br />
                    → <em>Il n'aime <strong>ni le</strong> café <strong>ni le</strong> chocolat.</em><br />
                    • <strong>Articles partitifs (du, de la, des) ou indéfinis</strong> : ILS DISPARAISSENT !<br />
                    → <em>Elle ne mange <strong>ni</strong> viande <strong>ni</strong> fromage.</em> (Pas de "de la" ni "du" !)
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 3 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔥</div>
                <div className="tip-card-body">
                  <h3>Être vs Avoir dans les États Physiques et l'Âge</h3>
                  <p>
                    Pour exprimer les sensations corporelles, les besoins vitaux et l'âge, le français utilise <strong>toujours AVOIR</strong> (et jamais *être*) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>J'ai faim</strong>, <strong>j'ai soif</strong>, <strong>j'ai froid</strong>, <strong>j'ai chaud</strong><br />
                    • <strong>J'ai sommeil</strong>, <strong>j'ai peur</strong>, <strong>j'ai honte</strong><br />
                    • <strong>J'ai 25 ans</strong> (e jamais <em>*Je suis 25 ans</em> comme en anglais !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🐝</div>
                <div className="tip-card-body">
                  <h3>Le Piège Phonétique : « Ils ont » [il-z-ɔ̃] vs « Ils sont » [il-s-ɔ̃]</h3>
                  <p>
                    La différence entre <em>Avoir</em> et <em>Être</em> à la 3e personne du pluriel repose sur la vibration des cordes vocales :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Ils ont</em> → Liaison sonore <strong>[z]</strong> (comme le bourdonnement d'une abeille) ➔ <em>Ils ont une maison</em><br />
                    • <em>Ils sont</em> → Consonne sourde <strong>[s]</strong> (comme le sifflement du serpent) ➔ <em>Ils sont contents</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>Savoir vs Connaître : La Règle Infaillible</h3>
                  <p>
                    La distinction est purement syntaxique et ne laisse aucune place au doute :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Savoir + Verbe à l'infinitif</strong> : <em>Elle sait nager</em>, <em>il sait jouer du piano</em><br />
                    • <strong>Savoir + Proposition subordonnée</strong> : <em>Je sais qu'il vient</em>, <em>je sais où il est</em><br />
                    • <strong>Connaître + Nom direct</strong> : <em>Je connais Paris</em>, <em>nous connaissons Julien</em> (jamais de verbe ni de "que" après !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎩</div>
                <div className="tip-card-body">
                  <h3>L'Inversion Formelle de Pouvoir : « Puis-je »</h3>
                  <p>
                    En style soutenu ou lors d'une demande polie avec inversion, le français refuse la forme <em>*Peux-je</em> et emploie toujours <strong>Puis-je</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Puis-je vous aider ?</strong> (Puis-je vous être utile ?)<br />
                    • <strong>Puis-je vous donner un conseil ?</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🌧️</div>
                <div className="tip-card-body">
                  <h3>Verbes Défectifs Impersonnels : « Il faut » et « Il pleut »</h3>
                  <p>
                    Ces deux verbes n'ont pas de sujet humain. Ils se conjuguent uniquement à la 3e personne du singulier avec le pronom neutre <strong>il</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Falloir</em> → <strong>Il faut</strong> apprendre les conjugaisons.<br />
                    • <em>Pleuvoir</em> → <strong>Il pleut</strong> toujours dans cette région.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">✨</div>
                <div className="tip-card-body">
                  <h3>Le Trio Euphonique : Beau, Nouveau, Vieux</h3>
                  <p>
                    Devant un nom masculin commençant par une voyelle ou un <em>h</em> muet, ces trois adjectifs prennent une forme en <strong>-l</strong> pour préserver l'harmonie sonore :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Un beau garçon</em> ➔ mais <strong>Un bel appartement</strong><br />
                    • <em>Un nouveau livre</em> ➔ mais <strong>Un nouvel hôtel</strong><br />
                    • <em>Un vieux château</em> ➔ mais <strong>Un vieil ami</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 4 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🚇</div>
                <div className="tip-card-body">
                  <h3>Aller & les Contractions de Lieu : « Au / Aux »</h3>
                  <p>
                    Pour indiquer une destination avec le verbe <em>aller</em>, utilisez la préposition <strong>à</strong> qui se contracte obligatoirement avec les articles masculins et pluriels (ne dites jamais <em>*en cinéma</em> !) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>au</strong> (+ masc. sing.) : <em>Je vais <strong>au</strong> cinéma, <strong>au</strong> théâtre</em><br />
                    • <strong>à la</strong> (+ fém. sing.) : <em>Elle va <strong>à la</strong> bibliothèque, <strong>à la</strong> plage</em><br />
                    • <strong>à l'</strong> (+ voyelle/h) : <em>Il va <strong>à l'</strong>opéra, <strong>à l'</strong>école</em><br />
                    • <strong>aux</strong> (+ pluriel) : <em>Ils vont <strong>aux</strong> États-Unis, <strong>aux</strong> Maldives</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏩</div>
                <div className="tip-card-body">
                  <h3>Le Futur Proche : Aller + Infinitif</h3>
                  <p>
                    C'est la périphrase temporelle la plus vivante du français oral pour exprimer un projet immédiat ou certain. La négation <strong>ne... pas</strong> entoure UNIQUEMENT l'auxiliaire <em>aller</em> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Affirmation :</em> <strong>Je vais acheter</strong> une voiture en mai.<br />
                    • <em>Négation :</em> Elle <strong>ne va pas</strong> déménager.<br />
                    • <em>Adverbe :</em> Ils vont <strong>bientôt</strong> emménager.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏪</div>
                <div className="tip-card-body">
                  <h3>Le Passé Récent & l'Élision Obligatoire « D' »</h3>
                  <p>
                    Construit avec <strong>venir au présent + de + infinitif</strong>, il traduit « acabou de... ». Attention à l'apostrophe obligatoire devant une voyelle ou un <em>h</em> muet :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*Il vient de annuler</em> ➔ ✅ <strong>Il vient d'annuler</strong> son vol.<br />
                    • ❌ <em>*Tu viens de avoir</em> ➔ ✅ <strong>Tu viens d'avoir</strong> trente ans.<br />
                    • ❌ <em>*Elle vient de appeler</em> ➔ ✅ <strong>Elle vient d'appeler</strong> François.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🤲</div>
                <div className="tip-card-body">
                  <h3>Les Multiples Visages de « Tenir »</h3>
                  <p>
                    Conjugué exactement comme <em>venir</em>, <em>tenir</em> est un caméléon idiomatique :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Tenir ses promesses :</strong> respecter ses engagements.<br />
                    • <strong>Tenir compte de :</strong> prendre en considération (ne pas ignorer).<br />
                    • <strong>Tenir à quelqu'un / qqch :</strong> être très attaché.<br />
                    • <strong>Tenir à + infinitif :</strong> vouloir absolument.<br />
                    • <strong>Tenir de quelqu'un :</strong> ressembler à un parent (puxar a).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🍳</div>
                <div className="tip-card-body">
                  <h3>Le Verbe Faire : « Vous faites » et [fəzɔ̃]</h3>
                  <p>
                    Deux pièges morphologiques et une particularité phonétique à retenir absolument :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*Vous faisez</em> ➔ ✅ <strong>Vous faites</strong><br />
                    • ❌ <em>*Ils faisent</em> ➔ ✅ <strong>Ils font</strong><br />
                    • <em>Phonétique :</em> <strong>Nous faisons</strong> s'écrit avec <em>ai</em> mais se prononce <strong>[nu fəzɔ̃]</strong> (avec un e moyen !).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏭</div>
                <div className="tip-card-body">
                  <h3>La Forme Causative : Faire + Infinitif</h3>
                  <p>
                    Pour exprimer l'idée de « faire faire par autrui » ou « faire en sorte que quelque chose se produise » :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Elle écrit la lettre</em> (elle-même) ➔ <strong>Elle fait écrire la lettre</strong> (par sa secrétaire).<br />
                    • <em>Vous lavez la voiture</em> ➔ <strong>Vous faites laver la voiture</strong> (au lave-auto).<br />
                    • <em>Elle fait la robe</em> (couturière) ➔ <strong>Elle fait faire la robe</strong> (cliente chez le couturier).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 5 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🧭</div>
                <div className="tip-card-body">
                  <h3>Les 4 Facettes de « Devoir »</h3>
                  <p>
                    Le verbe <strong>devoir</strong> est un véritable caméléon selon son contexte syntaxique :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Dette :</strong> <em>Elle me <strong>doit</strong> 1000 euros / Il <strong>doit</strong> une excuse</em><br />
                    • <strong>Obligation :</strong> <em>Vous <strong>devez</strong> partir immédiatement</em><br />
                    • <strong>Probabilité / Horaire :</strong> <em>L'avion <strong>doit</strong> atterrir à 10h</em><br />
                    • <strong>Conseil (conditionnel) :</strong> <em>Vous <strong>devriez</strong> appeler Vincent</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>Faux-Ami : « Ne pas devoir » = Interdiction !</h3>
                  <p>
                    Attention au piège pour les lusophones ! En français, la forme négative de <em>devoir</em> n'exprime pas l'absence d'obligation (« não precisa »), mais une <strong>interdiction formelle</strong> (« não pode / proibido ») :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>Vous ne devez pas payer</em> ≠ Você não precisa pagar.<br />
                    • ✅ <strong>Vous ne devez pas fumer ici</strong> = É proibido fumar aqui !<br />
                    • <em>Pour « não precisa » :</em> Utilisez <strong>« Ce n'est pas nécessaire de... »</strong> ou <strong>« Vous n'avez pas besoin de... »</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📦</div>
                <div className="tip-card-body">
                  <h3>« Il y a » : Invariable en Toutes Circonstances !</h3>
                  <p>
                    Tout comme « há » en portugais soigné, <strong>il y a</strong> ne se met JAMAIS au pluriel :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ Ne dites jamais : <em>*Ils y ont des livres</em><br />
                    • ✅ <strong>Il y a</strong> un chien dans la voiture.<br />
                    • ✅ <strong>Il y a</strong> des livres sur la table.<br />
                    • <em>Question :</em> <strong>Est-ce qu'il y a</strong> un ordinateur ?
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📖</div>
                <div className="tip-card-body">
                  <h3>« Il s'agit de » : Le Sujet Impersonnel Fixe</h3>
                  <p>
                    Pour présenter le sujet d'un livre ou d'un film, la langue française exige le pronom neutre <strong>il</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*Ce livre s'agit du président</em> (erreur calquée du portugais !)<br />
                    • ✅ <strong>Dans ce livre, il s'agit du</strong> président français.<br />
                    • ✅ <strong>De quoi est-ce qu'il s'agit ?</strong> (De que se trata?)<br />
                    • ✅ <strong>Il s'agit de</strong> passion / d'amour.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎨</div>
                <div className="tip-card-body">
                  <h3>Verbes en -eindre et -aindre : L'Insolite Son « GN »</h3>
                  <p>
                    Les verbes comme <em>peindre</em>, <em>craindre</em>, <em>plaindre</em> changent de morphologie :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Singulier (en -s, -s, -t) :</strong> <em>Je peins, tu crains, il craint / peint</em> (avec un t final et non un d !)<br />
                    • <strong>Pluriel (en -GN-) :</strong> <em>Nous pei<strong>gnons</strong>, vous crai<strong>gnez</strong>, ils plai<strong>gnent</strong></em> (son /ɲ/ comme le « nh » portugais).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🤝</div>
                <div className="tip-card-body">
                  <h3>Le Conseil Poli : « Vous devriez »</h3>
                  <p>
                    Pour donner un conseil bienveillant et amical sans sonner autoritaire, privilégiez le conditionnel présent :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Autoritaire :</em> <strong>Vous devez</strong> teindre le mur.<br />
                    • <em>Diplomate & Poli :</em> <strong>Vous devriez</strong> appeler Vincent.<br />
                    • <em>Forme négative :</em> <strong>Vous ne devriez pas</strong> inviter Pierre.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 6 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🧼</div>
                <div className="tip-card-body">
                  <h3>Corps Humain : Pas de Possessif Redondant !</h3>
                  <p>
                    En français, quand le verbe réfléchi indique déjà que l'action s'applique au sujet, on emploie l'article défini (<strong>le, la, les</strong>) et JAMAIS un adjectif possessif :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ Ne dites pas : <em>*Je me lave mes mains</em><br />
                    • ✅ <strong>Je me lave les mains</strong>.<br />
                    • ✅ <strong>Elle se coupe les cheveux</strong>.<br />
                    • ✅ <strong>Il se brosse les dents</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👥</div>
                <div className="tip-card-body">
                  <h3>Verbes Réciproques : Uniquement au Pluriel</h3>
                  <p>
                    Les verbes réciproques expriment une action mutuelle exercée entre deux ou plusieurs personnes (« uns aos outros »). Ils n'existent donc qu'avec <strong>nous</strong>, <strong>vous</strong> ou <strong>ils/elles</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Ils s'aiment</strong> beaucoup (un à l'autre).<br />
                    • <strong>Nous nous téléphonons</strong> chaque jour.<br />
                    • <strong>Elles s'écrivent</strong> régulièrement.<br />
                    • <strong>Ils se marient</strong> la semaine prochaine.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏷️</div>
                <div className="tip-card-body">
                  <h3>Pronominaux Passifs : Les Incontournables</h3>
                  <p>
                    Pour exprimer une vérité générale ou une habitude sans mentionner qui agit, le français utilise la tournure pronominale passive à la 3ᵉ personne du singulier :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Ça ne se dit pas !</strong> (Isso não se diz / é deselegante).<br />
                    • <strong>Ça ne se fait pas !</strong> (Isso não se faz).<br />
                    • <strong>Comment ça se traduit ?</strong> (Como se traduz isso?).<br />
                    • <strong>Ça se voit !</strong> (Está na cara / Dá para ver).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Verbes Essentiellement Pronominaux</h3>
                  <p>
                    Certains verbes n'ont aucun sens réfléchi direct : le pronom fait partie intégrante de leur identité lexicale :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>S'en aller :</strong> partir (<em>Je m'en vais !</em>).<br />
                    • <strong>Se souvenir de :</strong> se rappeler (<em>Je me souviens</em>).<br />
                    • <strong>Se rendre compte de :</strong> conscientiser (<em>Je me rends compte</em>).<br />
                    • <strong>Se dépêcher :</strong> faire vite (<em>Dépêche-toi !</em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📢</div>
                <div className="tip-card-body">
                  <h3>L'Impératif : « Lève-toi ! » vs « Ne te couche pas ! »</h3>
                  <p>
                    À l'impératif affirmatif, le pronom passe APRÈS le verbe avec un trait d'union et devient <strong>toi</strong>. À la négation, il reprend sa place normale AVANT le verbe avec <strong>te</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Affirmatif :</em> <strong>Lève-toi !</strong> / <strong>Habillez-vous !</strong><br />
                    • <em>Négatif :</em> <strong>Ne te couche pas</strong> si tard !<br />
                    • <em>Pluriel négatif :</em> <strong>Ne vous inquiétez pas !</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>La Règle d'Or à l'Infinitif : L'Accord Réfléchi</h3>
                  <p>
                    Quand un verbe pronominal dépend d'un verbe semi-auxiliaire (<em>aimer</em>, <em>aller</em>, <em>pouvoir</em>, <em>devoir</em>), le pronom réfléchi s'accorde TOUJOURS avec le sujet de la phrase :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*J'aime se promener</em> ➔ ✅ J'aime <strong>me</strong> promener.<br />
                    • ❌ <em>*Tu vas se lever</em> ➔ ✅ Tu vas <strong>te</strong> lever.<br />
                    • ❌ <em>*Nous voulons s'écrire</em> ➔ ✅ Nous voulons <strong>nous</strong> écrire.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 7 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏠</div>
                <div className="tip-card-body">
                  <h3>La Maison d'Être : Accord avec le Sujet</h3>
                  <p>
                    Les 14 verbes intransitifs de mouvement et de transformation (<em>aller, venir, naître, mourir, monter, descendre, partir, arriver, etc.</em>) se conjuguent avec <strong>ÊTRE</strong>. Le participe s'accorde toujours avec le sujet :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Il est parti</strong> / <strong>Elle est partie</strong> (+e).<br />
                    • <strong>Ils sont arrivés</strong> / <strong>Elles sont arrivées</strong> (+es).<br />
                    • <strong>Zola est mort</strong> en 1902.<br />
                    • <strong>La voiture est tombée</strong> en panne.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🦎</div>
                <div className="tip-card-body">
                  <h3>Les 6 Verbes Caméléons : Avoir ou Être ?</h3>
                  <p>
                    Six verbes (<em>monter, descendre, sortir, rentrer, passer, retourner</em>) changent d'auxiliaire ! S'ils sont suivis d'un <strong>C.O.D. direct</strong>, ils prennent <strong>AVOIR</strong> et ne s'accordent pas :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Être (intransitif) :</em> Elle <strong>est sortie</strong> avec des amis.<br />
                    • <em>Avoir (+ C.O.D.) :</em> Elle <strong>a sorti la voiture</strong> du garage.<br />
                    • <em>Avoir (+ C.O.D.) :</em> Elle <strong>a descendu les valises</strong>.<br />
                    • <em>Avoir (+ C.O.D.) :</em> Il <strong>a retourné l'omelette</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📜</div>
                <div className="tip-card-body">
                  <h3>L'Accord avec AVOIR : La Règle du C.O.D. Antéposé</h3>
                  <p>
                    Avec <strong>avoir</strong>, le participe ne s'accorde JAMAIS avec le sujet. Il s'accorde uniquement en genre et nombre avec le <strong>C.O.D. placé AVANT le verbe</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • C.O.D. après (pas d'accord) : <em>Il a pris <strong>la décision</strong></em>.<br />
                    • C.O.D. avant (accord) : <em>La décision qu'il a <strong>prise</strong></em> (+e).<br />
                    • Pronom avant (accord) : <em>Il <strong>l'</strong>a <strong>prise</strong></em>.<br />
                    • Pronom pluriel avant : <em>Elle <strong>les</strong> a <strong>comprises</strong></em> (+es).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🦷</div>
                <div className="tip-card-body">
                  <h3>Verbes Pronominaux & Parties du Corps</h3>
                  <p>
                    Les pronominaux prennent <strong>être</strong>, mais le participe reste INVARIABLE si le C.O.D. est placé après le verbe (comme les parties du corps avec l'article défini) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Elle s'est lavée</strong> (accord car <em>se</em> est C.O.D.).<br />
                    • <strong>Elle s'est lavé les mains</strong> (invariable : C.O.D. <em>les mains</em> après).<br />
                    • <strong>Il s'est brossé les dents</strong> (invariable : C.O.D. <em>les dents</em> après).<br />
                    • <strong>Tu t'es coupé le doigt</strong> (invariable : C.O.D. <em>le doigt</em> après).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">💌</div>
                <div className="tip-card-body">
                  <h3>Verbes Réciproques Indirects : JAMAIS d'Accord !</h3>
                  <p>
                    Quand un verbe se construit avec la préposition <em>à</em> (<em>parler à, téléphoner à, écrire à, plaire à</em>), le pronom réfléchi est un <strong>C.O.I.</strong> : aucun accord n'est possible :
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*Ils se sont écrits</em> ➔ ✅ <strong>Ils se sont écrit</strong> (sans -s !).<br />
                    • ❌ <em>*Elles se sont téléphonées</em> ➔ ✅ <strong>Elles se sont téléphoné</strong>.<br />
                    • ✅ <strong>Ils se sont parlé</strong> pendant deux heures.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🇧🇷</div>
                <div className="tip-card-body">
                  <h3>Passé Composé vs Portugais : Faux Ami Temporel</h3>
                  <p>
                    En portugais, « tenho falado » exprime une action continue dans le présent. En français, <strong>j'ai parlé</strong> exprime une <strong>action ponctuelle achevée</strong> (« falei ») :
                  </p>
                  <div className="tip-example" lang="fr">
                    • « J'ai habité en Italie » = Morei / vivi na Itália (terminé).<br />
                    • « J'ai attendu dix minutes » = Esperei dez minutos.<br />
                    • Pour une action qui continue : <em>J'habite ici depuis 2 ans</em> (au présent !).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 8 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🪄</div>
                <div className="tip-card-body">
                  <h3>La Formule Magique du Radical de NOUS</h3>
                  <p>
                    Pour former l'imparfait de n'importe quel verbe régulier ou irrégulier : prenez <strong>nous au présent</strong>, retirez <strong>-ons</strong> et ajoutez : <strong>-ais, -ais, -ait, -ions, -iez, -aient</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Nous parlons</em> ➔ <strong>je parlais</strong><br />
                    • <em>Nous finissons</em> ➔ <strong>nous finissions</strong><br />
                    • <em>Nous buvons</em> ➔ <strong>ils buvaient</strong><br />
                    • <em>Nous prenons</em> ➔ <strong>il prenait</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👑</div>
                <div className="tip-card-body">
                  <h3>ÊTRE : L'Unique Radical Irrégulier (ét-)</h3>
                  <p>
                    Le verbe <strong>être</strong> est le SEUL verbe de toute la langue française avec un radical irrégulier à l'imparfait : <strong>ét-</strong>. Même <em>avoir</em> est régulier (*nous avons ➔ j'avais*) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>J'étais</strong> champion de tennis.<br />
                    • <strong>Nous étions</strong> réalistes.<br />
                    • <strong>L'exposition était</strong> fascinante.<br />
                    • <strong>Ils étaient</strong> à la montagne.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👂</div>
                <div className="tip-card-body">
                  <h3>Phonétique : 4 Terminaisons pour un Seul Son /ɛ/</h3>
                  <p>
                    Les terminaisons <strong>-ais, -ais, -ait, -aient</strong> se prononcent toutes de manière identique : <strong>/ɛ/</strong> (comme dans <em>fête</em> ou <em>café</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Je parlais, tu parlais, il parlait, ils parlaient</em> ➔ tous prononcés <strong>/paʁlɛ/</strong> !<br />
                    • Seuls <strong>nous</strong> (-ions /jɔ̃/) et <strong>vous</strong> (-iez /je/) se distinguent à l'oreille.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">✍️</div>
                <div className="tip-card-body">
                  <h3>Pièges Orthographiques : -GER et -CER</h3>
                  <p>
                    Attention au maintien du son [ʒ] et [s] devant la voyelle *a* :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>-GER :</em> On garde le <strong>e</strong> devant <em>a</em> (<strong>je voyageais</strong>, <strong>il encourageait</strong>), mais on le retire devant <em>i</em> (<strong>nous voyagions</strong>).<br />
                    • <em>-CER :</em> On met la cédille <strong>ç</strong> devant <em>a</em> (<strong>j'avançais</strong>, <strong>il commençait</strong>), mais pas devant <em>i</em> (<strong>nous avancions</strong>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎬</div>
                <div className="tip-card-body">
                  <h3>Imparfait vs Passé Composé : Décor vs Événement</h3>
                  <p>
                    L'imparfait campe le décor et l'action continue en cours. Le passé composé apporte l'événement soudain qui interrompt l'histoire :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Je dormais</strong> (imparfait, décor continu)...<br />
                    • ... quand le chat <strong>a sauté</strong> sur mon lit (passé composé, événement soudain) !<br />
                    • <strong>Nous bavardions</strong> depuis une heure quand il <strong>est arrivé</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">☕</div>
                <div className="tip-card-body">
                  <h3>La Suggestion Quotidienne : « Si on + Imparfait »</h3>
                  <p>
                    En français familier et courant, pour proposer une activité ou inviter quelqu'un (« Que tal se... », « E se a gente... »), on utilise <strong>Si on + imparfait</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Si on prenait un café ?</strong> (Que tal tomarmos um café?)<br />
                    • <strong>Si on déjeunait ensemble ?</strong> (E se almoçássemos juntos?)<br />
                    • <strong>Si on allait au cinéma ?</strong> (Que tal se fôssemos ao cinema?)<br />
                    • <em>Règle d'or :</em> avec <strong>on</strong>, la terminaison est toujours <strong>-ait</strong> !
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 9 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔮</div>
                <div className="tip-card-body">
                  <h3>A Origem das Terminações : O Presente de AVOIR</h3>
                  <p>
                    Para nunca mais esquecer as terminações do <em>futur simple</em>, lembre-se do presente do verbo <strong>avoir</strong> ! Elas são idênticas para todos os verbos :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>-ai</strong> (j'ai) : <em>je déciderai, j'irai, je serai</em><br />
                    • <strong>-as</strong> (tu as) : <em>tu parleras, tu finiras</em><br />
                    • <strong>-a</strong> (il a) : <em>elle saura, on répondra</em><br />
                    • <strong>-ons</strong> (nous avons) : <em>nous partirons, nous aurons</em><br />
                    • <strong>-ez</strong> (vous avez) : <em>vous ferez, vous viendrez</em><br />
                    • <strong>-ont</strong> (ils ont) : <em>ils verront</em> [vɛʁɔ̃] (cuidado : som nasal [ɔ̃], nunca mudo !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🚨</div>
                <div className="tip-card-body">
                  <h3>A Grande Armadilha : « Quand » et « Dès que »</h3>
                  <p>
                    Em português, usamos o <em>Futuro do Subjuntivo</em> (« quando eu chegar », « assim que tiver »). Em francês, <strong>É OBRIGATÓRIO O FUTUR SIMPLE</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Quand j'arrive à Paris...</em><br />
                    ✅ <strong>Quand j'arriverai à Paris, je t'appellerai.</strong><br />
                    ❌ <em>*Dès qu'elle a le temps...</em><br />
                    ✅ <strong>Dès qu'elle aura le temps, elle viendra.</strong><br />
                    • <em>Tant qu'il y aura du soleil, nous resterons dehors.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏎️</div>
                <div className="tip-card-body">
                  <h3>O Clube do Duplo « R » nos Radicais</h3>
                  <p>
                    Cinco dos verbos mais frequentes dobram a letra <strong>r</strong> no futuro simples. Guarde esse quinteto :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Pouvoir</strong> ➔ <em>Je pourrai</em> (não confunda com o condicional <em>pourrais</em> !)<br />
                    • <strong>Voir</strong> ➔ <em>Je verrai</em> / <em>Nous verrons</em><br />
                    • <strong>Envoyer</strong> ➔ <em>J'enverrai</em> / <em>Ils enverront</em><br />
                    • <strong>Courir</strong> ➔ <em>Je courrai</em> (dobra o r !)<br />
                    • <strong>Mourir</strong> ➔ <em>Je mourrai</em> (dobra o r !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>Futur Antérieur : Ação Concluída no Futuro</h3>
                  <p>
                    O <em>futur antérieur</em> indica que uma ação já estará 100% finalizada antes que outra ocorra no futuro (formado por <strong>avoir/être no futuro + particípio</strong>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Dès qu'elle aura fini son roman</strong>, elle vous téléphonera.<br />
                    • <strong>Quand nous serons arrivés</strong>, nous pourrons dîner.<br />
                    • <em>Probabilité passée :</em> <strong>Elle aura encore oublié ses clés !</strong> (Ela deve ter esquecido as chaves de novo !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>A Regra de Ouro do « Si » Condicional : JAMAIS de Futuro !</h3>
                  <p>
                    Em orações condicionais com <strong>SI</strong>, nunca use futuro simples nem futur antérieur em francês. Use o presente :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*S'il aura le temps, il passera vous voir.</em><br />
                    ✅ <strong>S'il a le temps, il passera vous voir.</strong><br />
                    <em>Exception (interrogation indirecte « se porventura ») :</em><br />
                    • <strong>Je me demande s'ils auront signé le contrat.</strong> (Aqui pode !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎓</div>
                <div className="tip-card-body">
                  <h3>Vocabulário Acadêmico & Falso Amigo Crucial</h3>
                  <p>
                    Atenção redobrada para os termos universitários deste capítulo :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Passer un examen</strong> = Fazer / prestar a prova (NÃO significa ser aprovado !)<br />
                    • <strong>Réussir un examen</strong> = Ser aprovado / passar na prova<br />
                    • <strong>Échouer / Rater un examen</strong> = Reprovar na prova<br />
                    • <strong>Faire l'école buissonnière</strong> = Cabular / matar aula
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 10 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>Antériorité : O Passado do Passado</h3>
                  <p>
                    O <em>plus-que-parfait</em> expressa uma ação concluída no passado antes de outro fato passado. Equivale ao pretérito mais-que-perfeito composto do português (<em>tinha feito / havia chegado</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Lorsque Lucie est arrivée (passé composé)...</em><br />
                    • <em>... Paul <strong>était déjà parti</strong> (plus-que-parfait, ação anterior) !</em><br />
                    • <em>Il était malade car il <strong>avait trop mangé</strong>.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏰</div>
                <div className="tip-card-body">
                  <h3>Auxiliares no Imparfait : AVOIR vs ÊTRE</h3>
                  <p>
                    A regra de ouro de formação : <strong>Auxiliar no IMPARFAIT + Particípio Passado</strong>. A maioria dos verbos usa <em>avoir</em> (<em>j'avais, tu avais...</em>). Usa-se <em>être</em> (<em>j'étais, tu étais...</em>) para :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Verbos da Maison d'Être</strong> (movimento/estado) : <em>aller, venir, arriver, partir, tomber, rester, etc.</em><br />
                    • <strong>TODOS os verbos pronominais</strong> : <em>se réveiller, s'habiller, se reposer, se demander...</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🤝</div>
                <div className="tip-card-body">
                  <h3>A Pegadinha de Ouro dos Pronominais : « S'écrire »</h3>
                  <p>
                    Com verbos pronominais, o particípio <strong>NÃO CONCORDA</strong> quando o pronome reflexivo for objeto indireto (COI) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Elle s'était <strong>habillée</strong></em> ➔ habiller qqn (COD) ➔ accord féminin (-ée).<br />
                    • <em>Elles s'étaient <strong>écrit</strong></em> ➔ écrire <strong>À</strong> qqn (COI) ➔ <strong>INVARIABLE</strong> (sans -e ni -s) !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🩺</div>
                <div className="tip-card-body">
                  <h3>Vocabulaire Médical & Expressions avec Avoir</h3>
                  <p>
                    Para dores e sensações de saúde, o francês usa <strong>AVOIR MAL À</strong> (com contrações <em>au / à la / aux</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Avoir mal à la tête</strong> (dor de cabeça), <strong>au dos</strong> (dor nas costas), <strong>au ventre</strong> (dor de barriga)<br />
                    • <strong>Avoir un rhume</strong> (resfriado), <strong>avoir la grippe</strong> (gripe)<br />
                    • <strong>Prendre un cachet d'aspirine</strong> / <strong>une gélule</strong> / <strong>un sirop</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">💔</div>
                <div className="tip-card-body">
                  <h3>Exprimer le Regret : « Si seulement » + Plus-que-parfait</h3>
                  <p>
                    Para exprimir arrependimento ou lamento retrospectivo no passado (« Se ao menos... », « Quem dera... ») :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Si seulement vous n'aviez pas été en retard !</strong><br />
                    • <strong>Si seulement il était allé chez le médecin plus tôt !</strong><br />
                    • <em>Règle d'élision :</em> devant <em>il/ils</em> le « si » s'élide (<em>s'il</em>), mais <strong>JAMAIS</strong> devant <em>tu</em> ou <em>elle</em> (<em>Si seulement tu avais...</em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>Anterioridade Obrigatória (A Armadilha de Tradução)</h3>
                  <p>
                    Em português e inglês dizemos : <em>« Ele tomou o remédio que o médico receitou »</em>. Em francês, o segundo passado anterior é <strong>OBRIGATÓRIO no plus-que-parfait</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Il a pris le médicament que le médecin a prescrit.</em><br />
                    ✅ <strong>Il a pris le médicament que le médecin avait prescrit.</strong><br />
                    • <em>Elle a pensé que je <strong>n'avais pas expliqué</strong> la situation.</em>
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 11 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>« Les SI n'aiment pas les -RAIS ! »</h3>
                  <p>
                    A regra de ouro mais célebre do FLE: <strong>NUNCA use o condicional logo após a conjunção « si »</strong> em orações condicionais de hipótese!
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Si j'aurais de l'argent, j'achèterais...</em><br />
                    ✅ <strong>Si j'avais de l'argent, j'achèterais un cheval.</strong> (Si + Imparfait → Conditionnel présent)<br />
                    ✅ <strong>Si vous étiez venu, nous aurions fêté ensemble.</strong> (Si + Plus-que-parfait → Conditionnel passé)<br />
                    • <em>Mnemônico:</em> O « si » já introduz a condição; a terminação <strong>-rais</strong> fica na oração principal!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>Futur Simple vs Conditionnel Présent : Je ferai vs Je ferais</h3>
                  <p>
                    Atenção à ortografia e à fonética da 1ª pessoa do singular (<em>Je</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Futur Simple (sans « s ») :</strong> <em>Je ferai</em>, <em>je mangerai</em> [fe.ʁe] — Som fechado [e], certeza no futuro.<br />
                    • <strong>Conditionnel (avec « s ») :</strong> <em>Je ferais</em>, <em>je mangerais</em> [fe.ʁɛ] — Som aberto [ɛ], hipótese ou desejo.<br />
                    • <em>Dica:</em> Teste trocar mentalmente por <em>Il</em> : se virar <em>Il fera</em> é futuro; se virar <em>Il ferait</em> é condicional!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎩</div>
                <div className="tip-card-body">
                  <h3>Politesse Absolue & Inversion : Pourriez-vous... ?</h3>
                  <p>
                    O condicional atenua ordens e transforma pedidos em atos de máxima elegância e cortesia diplomática francesa:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Pourriez-vous</strong> m'indiquer le chemin, s'il vous plaît ?<br />
                    • <strong>Voudriez-vous</strong> répéter plus lentement ?<br />
                    • <strong>Auriez-vous</strong> l'obligeance d'ouvrir la porte ?<br />
                    • <em>Au restaurant :</em> « <strong>Je voudrais</strong> un café » ou « <strong>J'aimerais</strong> commander ».
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📰</div>
                <div className="tip-card-body">
                  <h3>Le Conditionnel Journalistique (Information Non Confirmée)</h3>
                  <p>
                    Na imprensa francesa (<em>Le Figaro, Le Monde, AFP</em>), o condicional é obrigatório para fatos não homologados oficialmente (« segundo consta », « teria ocorrido »):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Le président se rendrait à Bruxelles demain.</strong> (Consta que o presidente irá amanhã).<br />
                    • <strong>L'accident aurait fait cinq blessés.</strong> (O acidente teria deixado cinco feridos).<br />
                    • Transmite neutralidade e prudência antes da confirmação factual dos fatos.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛡️</div>
                <div className="tip-card-body">
                  <h3>Atenção : « Au cas où » Exige o Condicional !</h3>
                  <p>
                    Enquanto « si » proíbe o condicional, a locução conjuntiva <strong>au cas où</strong> (caso, para o caso de) <strong>EXIGE SEMPRE o condicional</strong> (nunca subjuntivo nem indicativo):
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Au cas où il pleuve / pleuvra...</em><br />
                    ✅ <strong>Prends un imperméable au cas où il pleuvrait.</strong><br />
                    ✅ <strong>Au cas où vous auriez des doutes, relisez la fiche de grammaire.</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🐾</div>
                <div className="tip-card-body">
                  <h3>Bestiaire & Fables : Gêneros e Vocabulário do Capítulo</h3>
                  <p>
                    O Capítulo 11 homenageia as fábulas de Jean de La Fontaine (<em>La grenouille qui se veut faire aussi grosse que le bœuf</em>). Memorize o gênero dos animais:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Masculins :</strong> un bœuf, un écureuil, un dauphin, un perroquet, un taureau, un rhinocéros, un singe.<br />
                    • <strong>Féminins :</strong> une grenouille, une baleine, une chauve-souris, une abeille, une autruche, une tortue.<br />
                    • <em>Fable morale :</em> « Si la grenouille ne s'était pas enflée, elle n'aurait point éclaté ! »
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 12 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>« Could » no Passado : J'ai pu vs Je pouvais vs Je pourrais</h3>
                  <p>
                    O inglês <em>could</em> é uma armadilha clássica para lusófonos porque traduz três tempos verbais franceses diferentes:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Passé Composé (Ação pontual concretizada/falha) :</strong> <em>Hier, j'ai pu réparer la voiture</em> (consegui consertar). <em>Elle n'a pas pu venir à la fête.</em><br />
                    • <strong>Imparfait (Capacidade geral duradoura no passado) :</strong> <em>Quand il était jeune, il pouvait nager des heures.</em><br />
                    • <strong>Conditionnel Présent (Hipótese ou polidez atual) :</strong> <em>Pourriez-vous m'indiquer le chemin ?</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>« Should » : Conselho com Devoir (Présent vs Passé com « DÛ »)</h3>
                  <p>
                    Recomendações e remorsos expressam-se pelo verbo <strong>devoir</strong> no condicional:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Conselho no Presente (Conditionnel Présent) :</strong> <em>Tu devrais dormir plus</em> (Você deveria dormir mais).<br />
                    • <strong>Arrependimento / Cobrança no Passado (Conditionnel Passé) :</strong> <em>Tu aurais dû me prévenir !</em> (Você deveria ter me avisado).<br />
                    • <strong>Atenção Ortográfica :</strong> O particípio masculino <strong>dû</strong> leva acento circunflexo obrigatório para não se confundir com o artigo <em>du</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>A Grande Armadilha de « Would » : Hábito Passado é IMPARFAIT !</h3>
                  <p>
                    Em inglês, <em>would</em> indica tanto hipótese futura (<em>I would travel</em>) quanto hábito repetido no passado (<em>Every summer we would visit him</em>).
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Chaque soir, il jouerait du violon...</em> (ERRO GRAVE!)<br />
                    ✅ <strong>Chaque soir, il jouait du violon.</strong> (Imparfait obrigatório para repetição passada!)<br />
                    • Guarde bem: se <em>would</em> equivale a <em>used to</em> no passado, o tempo em francês é sempre o <strong>Imparfait</strong>!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>A Recusa Obstinada : « Would not » = N'a pas voulu</h3>
                  <p>
                    Quando <em>would not</em> expressa uma recusa deliberada e teimosa no passado, o francês emprega o <strong>Passé Composé de vouloir</strong> na negativa:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>He would not answer my letters</em> ➔ <strong>Il n'a pas voulu répondre à mes lettres.</strong><br />
                    • <em>The witness would not speak</em> ➔ <strong>Le témoin n'a pas voulu parler.</strong><br />
                    • Diferente de <em>ne voulait pas</em> (vontade difusa), <em>n'a pas voulu</em> marca o ato firme da recusa.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎻</div>
                <div className="tip-card-body">
                  <h3>Música e Gramática : Jouer DE vs Jouer À</h3>
                  <p>
                    O vocabulário do Capítulo 12 apresenta 27 instrumentos musicais. A regência do verbo <strong>jouer</strong> é uma regra de ouro:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Instrumentos Musicais ➔ JOUER DE :</strong> <em>jouer du piano</em> (m.), <em>jouer de la trompette</em> (f.), <em>jouer de l'accordéon</em> (vogal), <em>jouer des castagnettes</em> (pl.).<br />
                    • <strong>Esportes e Jogos ➔ JOUER À :</strong> <em>jouer au tennis</em>, <em>jouer aux échecs</em>, <em>jouer à la belote</em>.<br />
                    • <em>Mnemônico:</em> De l'instrument (sons vêm DE dentro dele) / Au sport (vai AO jogo).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎩</div>
                <div className="tip-card-body">
                  <h3>Polidez e Inversão : Pourriez-vous / Voudriez-vous</h3>
                  <p>
                    Para pedidos corteses em registro formal ou profissional, use a inversão sujeito-verbo com o condicional:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Pourriez-vous m'accorder un instant ?</strong> (Poderia me conceder um instante?)<br />
                    • <strong>Voudriez-vous vous asseoir ?</strong> (Gostaria de se sentar?)<br />
                    • Lembre-se: hífen obrigatório na inversão e entonação suave ao final da pergunta.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 13 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>A Regra de Ouro dos Radicais (O Segredo Fonético)</h3>
                  <p>
                    O presente do subjuntivo é construído a partir de <strong>duas bases</strong> muito lógicas do indicativo:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Je, Tu, Il, Ils :</strong> Radical de <em>ils/elles</em> no presente sem <em>-ent</em> (ex.: <em>ils finiss-ent</em> ➔ <em>que je finisse, tu finisses, il finisse, ils finissent</em>). Todas têm exatamente a mesma pronúncia!<br />
                    • <strong>Nous, Vous :</strong> Radical de <em>nous</em> sem <em>-ons</em>, exatamente idêntico ao <strong>imparfait</strong> (<em>nous pensions, vous pensiez</em>).<br />
                    • Terminações universais : <strong>-e, -es, -e, -ions, -iez, -ent</strong> para todos os verbos regulares!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>O Duelo Didático : Indicatif vs Subjonctif</h3>
                  <p>
                    A fronteira entre o real/objetivo (indicativo) e o subjetivo/incerto (subjuntivo):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Afirmativa de opinião ➔ INDICATIF :</strong> <em>Je pense qu'il <strong>a</strong> raison.</em> / <em>Vous savez qu'ils <strong>sont</strong> là.</em><br />
                    • <strong>Negação ou dúvida ➔ SUBJONCTIF :</strong> <em>Je ne pense pas qu'il <strong>ait</strong> raison.</em> / <em>Elle doute qu'il <strong>fasse</strong> beau.</em><br />
                    • <strong>Certeza ➔ INDICATIF :</strong> <em>Il est certain / évident / sûr qu'il <strong>viendra</strong>.</em><br />
                    • <strong>Possibilidade / Necessidade ➔ SUBJONCTIF :</strong> <em>Il est possible / essentiel qu'il <strong>vienne</strong>.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>A Armadilha de « Il me semble que » vs « Il semble que »</h3>
                  <p>
                    Uma das sutilezas mais sofisticadas e cobradas do FLE:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Il me semble que + INDICATIF :</strong> Com o pronome pessoal <em>me</em>, expressa uma percepção forte equivalente a uma certeza pessoal :<br />
                    ✅ <em>Il me semble que vous vous <strong>trompez</strong>.</em><br />
                    • <strong>Il semble que + SUBJONCTIF :</strong> Sem o pronome, expressa uma mera aparência vaga e incerta :<br />
                    ✅ <em>Il semble qu'il <strong>soit</strong> malade.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🌟</div>
                <div className="tip-card-body">
                  <h3>O Poder de « Pourvu que » : O "Tomara que..." Francês</h3>
                  <p>
                    A locução conjuntiva <strong>pourvu que</strong> possui dois papéis cruciais:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Subordinada (Contanto que / Desde que) :</strong> <em>Je viendrai pourvu qu'il fasse beau.</em><br />
                    • <strong>Oração Isolada Exclamativa (Tomara que... ! / Queira Deus que... !) :</strong><br />
                    • <strong>Pourvu qu'il ait raison !</strong> (Tomara que ele tenha razão!)<br />
                    • <strong>Pourvu qu'il puisse venir !</strong> (Tomara que ele possa vir!)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>Subjonctif Passé : A Marca da Anterioridade</h3>
                  <p>
                    Quando o fato da oração subordinada ocorreu <strong>antes</strong> do verbo principal, use o subjonctif passé:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Fórmula :</strong> Auxiliar <em>avoir</em> ou <em>être</em> no subjonctif présent + Particípio Passado.<br />
                    • <em>Nous sommes ravis que tu <strong>aies pu</strong> venir avec nous.</em><br />
                    • <strong>Concordância obrigatória com être :</strong> <em>Il est content que nous <strong>soyons partis</strong>.</em> / <em>Laurent <strong>se soit marié</strong>.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">💻</div>
                <div className="tip-card-body">
                  <h3>Vocabulário do Capítulo : Informática e Mundo Digital</h3>
                  <p>
                    O Capítulo 13 é ambientado no universo tecnológico. Guarde os gêneros e expressões:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Masculins :</strong> un ordinateur, un logiciel (software), un mot de passe, un fichier, un clavier, un écran, un disque dur.<br />
                    • <strong>Féminins :</strong> la Toile (a Web), une souris (mouse), une touche, une imprimante, une base de données.<br />
                    • <strong>Verbes utiles :</strong> sauvegarder (salvar), télécharger (baixar), cliquer, numériser, effacer (apagar).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 14 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>A Negação em Bloco : « Ne pas » Colado no Infinitivo</h3>
                  <p>
                    Quando o verbo está no infinitivo, a negação <strong>não abraça</strong> o verbo como nos tempos conjugados. Ela fica <strong>100% agrupada na frente</strong>:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Tempo conjugado :</strong> <em>Je <strong>ne</strong> mets <strong>pas</strong> d'ail.</em><br />
                    • <strong>Infinitivo :</strong> <em>Elle m'a dit de <strong>ne pas mettre</strong> d'huile.</em> / <em><strong>Ne pas marcher</strong> sur la pelouse.</em><br />
                    • Vale também para outras negações : <em>de <strong>ne rien</strong> dire</em>, <em>de <strong>ne jamais</strong> abandonner</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏱️</div>
                <div className="tip-card-body">
                  <h3>A Dupla Temporal : « Avant de » (Présent) vs « Après » (Passé)</h3>
                  <p>
                    Uma das distinções estruturais mais avaliadas no Francês:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Avant de + Infinitif Présent :</strong> Ação posterior (ainda não ocorrida) :<br />
                    ✅ <em>Je fais la cuisine <strong>avant d'aller</strong> au cinéma.</em><br />
                    • <strong>Après + Infinitif Passé :</strong> Ação anterior já concluída :<br />
                    ✅ <em>Je fais la cuisine <strong>après être allé</strong> au cinéma.</em><br />
                    ✅ <em>Elle lit le journal <strong>après s'être levée</strong>.</em> (Atenção ao acordo com <em>être</em>!).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚖️</div>
                <div className="tip-card-body">
                  <h3>O Trio das Preposições : Construção Direta, À ou DE</h3>
                  <p>
                    A ponte entre dois verbos depende rigorosamente da regência do primeiro:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Construção Direta (sem preposição) :</strong> <em>aimer, vouloir, pouvoir, devoir, falloir, savoir, préférer</em> ➔ <em>Je veux <strong>partir</strong>.</em><br />
                    • <strong>Com « À » (ideia de esforço, tendência, aprendizagem) :</strong> <em>apprendre à, commencer à, réussir à, hésiter à</em> ➔ <em>Elle apprend <strong>à cuisiner</strong>.</em><br />
                    • <strong>Com « DE » (sentimento, ordem, conselho, desistência) :</strong> <em>refuser de, oublier de, avoir peur de, cesser de</em> ➔ <em>N'oubliez pas <strong>d'ajouter</strong> du sel.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👁️</div>
                <div className="tip-card-body">
                  <h3>Verbos de Percepção & Postura Corporal</h3>
                  <p>
                    Onde o português ou inglês usam gerúndio (-ando / -ing), o francês emprega o infinitivo:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Percepção sensorial (voir, entendre) :</strong> <em>J'ai vu les moutons <strong>traverser</strong> la route.</em> / <em>Elle a entendu le coq <strong>chanter</strong>.</em><br />
                    • <strong>Postura corporal (debout, assis, allongé) + À :</strong> <em>Il est debout <strong>à éplucher</strong> des carottes.</em> / <em>Elle est assise <strong>à écosser</strong> des petits pois.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🍳</div>
                <div className="tip-card-body">
                  <h3>Vocabulário Gourmet : O Léxico Gastronômico do Capítulo</h3>
                  <p>
                    O francês possui verbos com precisão cirúrgica para cada preparo na cozinha:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>éplucher :</strong> descascar legumes e frutas (batatas, cenouras).<br />
                    • <strong>écosser :</strong> debulhar grãos e vagens (ervilhas).<br />
                    • <strong>décortiquer :</strong> descascar frutos do mar (camarões) e sementes.<br />
                    • <strong>écailler :</strong> retirar as escamas do peixe.<br />
                    • <strong>braiser / mijoter :</strong> cozinhar em fogo baixo e lentamente.<br />
                    • <strong>pétrir :</strong> sovar massa de pão ou confeitaria.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>Mesmo Sujeito vs Sujeitos Diferentes : Infinitivo ou Subjuntivo ?</h3>
                  <p>
                    Em francês, é obrigatório simplificar para o infinitivo quando os sujeitos são iguais:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Mesmo sujeito ➔ INFINITIF :</strong> <em>J'espère <strong>obtenir</strong> ce poste.</em> / <em>Tu veux <strong>apprendre</strong> ce métier.</em> (Nunca diga <em>« J'espère que j'obtienne »</em>!).<br />
                    • <strong>Sujeitos diferentes ➔ Proposition avec « QUE » :</strong> <em>J'espère <strong>qu'elle obtiendra</strong> ce poste.</em> / <em>Tu veux <strong>qu'il apprenne</strong> ce métier.</em>
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 15 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>A Fórmula do Participe Présent : Radical de « Nous » + -ANT</h3>
                  <p>
                    A regra de ouro é quase 100% matemática : pegue a forma de <strong>nous</strong> no presente do indicativo, remova o <em>-ons</em> e acrescente <strong>-ant</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>nous chantons</em> ➔ <strong>chantant</strong> (cantando)<br />
                    • <em>nous choisissons</em> ➔ <strong>choisissant</strong> (escolhendo)<br />
                    • <em>nous buvons</em> ➔ <strong>buvant</strong> (bebendo)<br />
                    • <em>nous répondons</em> ➔ <strong>répondant</strong> (respondendo)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚠️</div>
                <div className="tip-card-body">
                  <h3>Atenção à Grafia : Cédilha em -CER e « E » em -GER</h3>
                  <p>
                    Para manter a fonética correta diante do <em>a</em> de <em>-ant</em> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Verbos em -cer (som [s]) :</strong> ganham cédilha ➔ <em>avancer</em> ➔ <strong>avançant</strong>, <em>commencer</em> ➔ <strong>commençant</strong>, <em>prononcer</em> ➔ <strong>prononçant</strong>.<br />
                    • <strong>Verbos em -ger (som [ʒ]) :</strong> mantêm o <em>e</em> mudo ➔ <em>manger</em> ➔ <strong>mangeant</strong>, <em>protéger</em> ➔ <strong>protégeant</strong>, <em>nager</em> ➔ <strong>nageant</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👑</div>
                <div className="tip-card-body">
                  <h3>O Trio Real das Únicas Exceções : Étant, Ayant, Sachant</h3>
                  <p>
                    Apenas 3 verbos em todo o francês possuem particípio presente irregular (guarde-os de memória) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>être</strong> ➔ <strong>étant</strong> (sendo, estando)<br />
                    • <strong>avoir</strong> ➔ <strong>ayant</strong> (tendo)<br />
                    • <strong>savoir</strong> ➔ <strong>sachant</strong> (sabendo)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚖️</div>
                <div className="tip-card-body">
                  <h3>Particípio Verbal (Invariável) vs Adjetivo Verbal (Concorda)</h3>
                  <p>
                    Uma distinção clássica dos exames DELF e concursos :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Como verbo (indica ação) ➔ INVARIÁVEL :</strong> <em>La police l'a aperçu <strong>entrant</strong> dans le labo.</em> / <em><strong>Sachant</strong> la vérité, elle s'est tue.</em><br />
                    • <strong>Como adjetivo (qualifica o nome) ➔ CONCORDA :</strong> <em>Des matchs <strong>épuisants</strong></em> (masc. pl.), <em>Une histoire <strong>fascinante</strong></em> (fém. sing.).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>O Gérondif (« En + Participe ») & o Sujeito Idêntico</h3>
                  <p>
                    O gerúndio francês é formado por <strong>en + participe présent</strong>. Exprime simultaneidade (<em>while</em>) ou meio/modo (<em>by</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Simultaneidade :</strong> <em>Elle écoute de la musique <strong>en conduisant</strong>.</em><br />
                    • <strong>Meio/Modo :</strong> <em>Il a gagné de l'argent <strong>en vendant</strong> des tableaux.</em><br />
                    • <strong>Regra de ouro :</strong> O gérondif refere-se OBRIGATORIAMENTE ao mesmo sujeito da oração principal!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>A Força de « Tout en » : Oposição e Concessão Elegante</h3>
                  <p>
                    Adicionar <strong>tout</strong> antes do gérondif expressa contraste ou concessão (<em>mesmo enquanto</em>, <em>apesar de</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em><strong>Tout en étant</strong> un bon joueur, il ne marquait jamais.</em> (Mesmo sendo um bom jogador...)<br />
                    • <em><strong>Tout en pleurant</strong>, il riait.</em> (Ao mesmo tempo em que chorava, ria.)<br />
                    • <em><strong>Tout en se plaignant</strong>, elle avait l'air satisfaite.</em> (Mesmo reclamando, parecia satisfeita.)
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 16 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">📖</div>
                <div className="tip-card-body">
                  <h3>O Segredo Sociolinguístico : Passé Simple (Escrito) vs Passé Composé (Oral)</h3>
                  <p>
                    Em português usamos o pretérito perfeito (*eu comi, ele foi*) em qualquer situação. Em francês moderno, o <strong>passé simple é estritamente literário e formal</strong> (romances, história, artigos de imprensa). No dia a dia falado, usa-se 100% o <strong>passé composé</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Na conversa cotidiana :</strong> <em>Hier, j'ai vu une exposition au Louvre.</em> (Passé composé)<br />
                    • <strong>No romance / história :</strong> <em>Le peintre prit son pinceau et commença son chef-d'œuvre.</em> (Passé simple)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>A Fórmula dos Radicais : Família em -A- vs Família em -I-</h3>
                  <p>
                    A identificação do passado simples é facilitada pelas vogais características das terminações :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Verbos em -ER (1º grupo) :</strong> vogal <strong>-a-</strong> (*-ai, -as, -a, -âmes, -âtes, -èrent*) ➔ <em>je répétai</em>, <em>il répéta</em>, <em>ils répétèrent</em>.<br />
                    • <strong>Verbos em -IR e -RE :</strong> vogal <strong>-i-</strong> (*-is, -is, -it, -îmes, -îtes, -irent*) ➔ <em>je partis</em>, <em>il répondit</em>, <em>ils répondirent</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👑</div>
                <div className="tip-card-body">
                  <h3>Os Dois Acentos Circunflexos Mágicos : Somente em « Nous » e « Vous »</h3>
                  <p>
                    Uma regra de ouro absoluta para nunca errar a acentuação gráfica :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Nous & Vous :</strong> SEMPRE levam acento circunflexo ➔ <em>nous répétâmes</em>, <em>vous répétâtes</em>, <em>nous partîmes</em>, <em>vous eûtes</em>, <em>nous fûmes</em>.<br />
                    • <strong>Il / Elle :</strong> NUNCA leva acento circunflexo no passé simple ➔ <em>il répéta</em>, <em>il partit</em>, <em>il fut</em>, <em>il eut</em> (o acento em <em>qu'il fît</em> só existe no subjuntivo imperfeito!).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🤝</div>
                <div className="tip-card-body">
                  <h3>O Gêmeo Português de ÊTRE : « Je fus, il fut, ils furent »</h3>
                  <p>
                    A raiz latina em <strong>f-</strong> do verbo <em>être</em> é a irmã quase idêntica do pretérito perfeito português :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>je fus</em> = eu fui / estive<br />
                    • <em>il fut</em> = ele foi / esteve (ex: <em>Aliénor d'Aquitaine fut une reine remarquable</em>)<br />
                    • <em>nous fûmes</em> = nós fomos / estivemos<br />
                    • <em>ils furent</em> = eles foram / estiveram (ex: <em>Ils furent de grands collectionneurs</em>)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔊</div>
                <div className="tip-card-body">
                  <h3>A Pronúncia Secreta de AVOIR : « J'eus, il eut » [y] (Som de U Francês)</h3>
                  <p>
                    Atenção phonétique redobrada para falantes de português :
                  </p>
                  <div className="tip-example" lang="fr">
                    O dígrafo <strong>« eu »</strong> nas formas do verbo <em>avoir</em> (<em>j'eus, tu eus, il eut, nous eûmes, ils eurent</em>) e no particípio (<em>eu</em>) se pronuncia <strong>[y]</strong> (o som do 'u' francês com os lábios arredondados em biquinho), e <strong>NUNCA</strong> [ø] ou 'êu'!
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>O Enigma de « Il plut » : Plaire (Agradar) vs Pleuvoir (Chover)</h3>
                  <p>
                    Ambos os verbos geram a forma idêntica <em>il plut</em>. O segredo da diferenciação está na estrutura da frase :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Plaire (Agradar a alguém) :</strong> vem acompanhado de complemento indireto ➔ <em>Ce tableau <strong>plut</strong> à tout le monde.</em> (O quadro agradou a todos).<br />
                    • <strong>Pleuvoir (Chover) :</strong> verbo impessoal sem objeto de agrado ➔ <em><strong>Il plut</strong> sur la Normandie pendant trois jours.</em> (Choveu na Normandia...).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎨</div>
                <div className="tip-card-body">
                  <h3>Cédilha em -CER e « E » em -GER : Preservando a Fonética</h3>
                  <p>
                    Diante da vogal <em>a</em> das terminações do passé simple :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Verbos em -cer :</strong> ganham cédilha para preservar o som [s] ➔ <em>Elle <strong>prononça</strong> un discours</em> / <em>Je <strong>remplaçai</strong> le comédien</em>.<br />
                    • <strong>Verbos em -ger :</strong> mantêm o <em>e</em> mudo para preservar o som [ʒ] ➔ <em>Il <strong>partagea</strong> sa fortune</em> / <em>Nous <strong>déménageâmes</strong></em>.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 17 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>Concordância Absoluta do Particípio Passado (Auxiliar Être)</h3>
                  <p>
                    Como a voz passiva é formada exclusivamente com o auxiliar <strong>être</strong>, o particípio passado <strong>concorda obrigatoriamente em gênero e número com o novo sujeito</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Le voleur a été <strong>attrapé</strong></em> (masculin singulier)<br />
                    • <em>La forteresse est <strong>prise</strong></em> (féminin singulier : atenção ao particípio irregular de <em>prendre</em> !)<br />
                    • <em>Les étudiants sont <strong>félicités</strong></em> (masculin pluriel : +s)<br />
                    • <em>Les maisons sont <strong>entourées</strong></em> (féminin pluriel : +es)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚔️</div>
                <div className="tip-card-body">
                  <h3>O Duelo Crucial : « PAR » vs « DE » para o Agente da Passiva</h3>
                  <p>
                    É o maior divisor de águas entre o francês formal e a fala comum :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>PAR (Ação Dinâmica & Física) :</strong> <em>Le voleur a été attrapé <strong>par</strong> la police</em> / <em>Le château est entouré <strong>par</strong> les envahisseurs</em> (cerco militar ativo).<br />
                    • <strong>DE / d' (Sentimentos & Estados Descritivos) :</strong> <em>Ce professeur est apprécié <strong>de</strong> ses étudiants</em> / <em>La maison est entourée <strong>d'arbres</strong></em> (as árvores são estáticas, não realizam ação !) / <em>Ce verbe est suivi <strong>de</strong> l'indicatif</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛡️</div>
                <div className="tip-card-body">
                  <h3>A Invariabilidade Mágica de « Été »</h3>
                  <p>
                    Atenção lusophones : a palavra <strong>été</strong> (particípio do auxiliar être) é estritamente <strong>INVARIÁVEL</strong> !
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*La maison a étée vendue</em><br />
                    ✅ <strong>La maison a été vendue</strong> (apenas <em>vendue</em> concorda com a casa).<br />
                    ✅ <strong>Les lettres ont été lues</strong> (été permanece intacto, <em>lues</em> vai para o feminino plural).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🗣️</div>
                <div className="tip-card-body">
                  <h3>Fugir da Passiva com « ON » : O Toque Francês Autêntico</h3>
                  <p>
                    Em francês do dia a dia, a voz passiva é evitada sempre que possível. Em vez de estruturas passivas pesadas, os nativos usam o pronome <strong>on</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • Em vez de : <em>L'anglais est parlé ici</em> ➔ ✅ <strong>Ici, on parle anglais.</strong><br />
                    • Em vez de : <em>Vous êtes demandé au téléphone</em> ➔ ✅ <strong>On vous demande au téléphone.</strong><br />
                    • Em vez de : <em>Le voleur a été arrêté</em> ➔ ✅ <strong>On a arrêté le voleur.</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>O Passivo Pronominal : Irmão Gêmeo da Partícula « -SE »</h3>
                  <p>
                    Expressões de senso comum, regras gerais e consumo usam a voz pronominal passiva, idêntica ao português :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Ça ne se dit pas.</strong> (Não se diz isso / Isso não se fala).<br />
                    • <strong>Comment ça se traduit ?</strong> (Como se traduz isso ?).<br />
                    • <strong>Ça se voit.</strong> (Dá para ver / É evidente).<br />
                    • <strong>Le vin blanc se boit frais.</strong> (Vinho branco bebe-se gelado).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📅</div>
                <div className="tip-card-body">
                  <h3>Dias da Semana em Francês : Nada de Preposições !</h3>
                  <p>
                    Ao traduzir <em>« The decision was made on Monday »</em> :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*La décision a été prise sur lundi / en lundi</em><br />
                    ✅ <strong>La décision a été prise lundi.</strong> (Os dias da semana em francês para uma data pontual não levam preposição nem artigo !).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 18 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>A Regra de Ouro do « QUE » Obrigatório</h3>
                  <p>
                    Em inglês, a conjunção <em>that</em> é costumeiramente omitida (<em>"He says he is tired"</em>) e, na fala coloquial em português, às vezes cortamos o "que". <strong>Em francês, « QUE » (ou « QU' ») é 100% OBRIGATÓRIO</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Il dit il est fatigué</em><br />
                    ✅ <strong>Il dit qu'il est fatigué.</strong><br />
                    ✅ <strong>La marchande dit que ses produits sont les meilleurs.</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>A Cilada da Elisão do « SI » : Apenas « Il » e « Ils » !</h3>
                  <p>
                    Uma das pegadinhas mais comuns em provas e na conversação : a conjunção interrogativa <strong>si</strong> só elide com a 3ª pessoa masculina :
                  </p>
                  <div className="tip-example" lang="fr">
                    • Com <em>il / ils</em> ➔ <strong>Il veut savoir s'il vient</strong> / <strong>s'ils votent</strong>.<br />
                    • Com <em>elle / elles</em> ➔ ❌ <em>*s'elle</em> ➔ ✅ <strong>Il veut savoir si elle acceptera notre proposition</strong>.<br />
                    • Com <em>on</em> ➔ ❌ <em>*s'on</em> ➔ ✅ <strong>Il veut savoir si on va voter</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>A Matriz Mágica da « Concordance des Temps »</h3>
                  <p>
                    Quando o verbo que relata a fala está no <strong>passado</strong> (<em>J'ai entendu dire...</em>, <em>On m'a dit...</em>), os tempos mudam em cascata :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Présent ➔ Imparfait :</strong> <em>Elle est en Inde</em> ➔ J'ai entendu dire qu'elle <strong>était</strong> en Inde.<br />
                    • <strong>Passé composé ➔ Plus-que-parfait :</strong> <em>Elle a vendu sa voiture</em> ➔ J'ai entendu dire qu'elle <strong>avait vendu</strong> sa voiture.<br />
                    • <strong>Futur simple ➔ Conditionnel présent :</strong> <em>Tu iras en France</em> ➔ J'ai entendu dire que tu <strong>irais</strong> en France.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>Fim da Inversão no Discurso Indireto</h3>
                  <p>
                    Na pergunta direta, o sujeito e o verbo podem se inverter (<em>« Où habite le peintre ? »</em>). No discurso indireto, a ordem volta a ser estritamente <strong>Sujeto + Verbo</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Il ignore où habite le peintre</em><br />
                    ✅ <strong>Il ignore où le peintre habite.</strong><br />
                    ✅ <strong>Quentin demande où vous allez.</strong> (e não *où allez-vous).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🗳️</div>
                <div className="tip-card-body">
                  <h3>Falsos Amigos Políticos & Cívicos Franceses</h3>
                  <p>
                    Fique atento ao vocabulário oficial francês de política e eleições :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>La voix :</strong> Além de voz humana, significa « o voto » (<em>obtenir 52 % des voix</em>).<br />
                    • <strong>Le scrutin :</strong> Não é só a apuração, é toda a votação em si (<em>scrutin uninominal</em>).<br />
                    • <strong>Le bulletin de vote :</strong> A cédula impressa usada na cabine (<em>l'isoloir</em>).<br />
                    • <strong>La parité :</strong> Princípio constitucional de igualdade numérica entre homens e mulheres nas listas eleitorais.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 19 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>A Queda Obrigatória do « -s » no Tu dos Verbos em -ER</h3>
                  <p>
                    O erro número 1 de lusófonos e anglófonos ! Nos verbos terminados em <strong>-er</strong> (e verbos com conjugação análoga como <em>ouvrir</em>, <em>offrir</em>, <em>aller</em>), a forma do <strong>tu</strong> perde obrigatoriamente o <strong>-s</strong> final :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Parles plus fort !</em> ➔ ✅ <strong>Parle plus fort !</strong><br />
                    ❌ <em>*Regardes ce film !</em> ➔ ✅ <strong>Regarde ce film !</strong><br />
                    ❌ <em>*Vas à la gare !</em> ➔ ✅ <strong>Va à la gare !</strong><br />
                    • <em>Atenção :</em> Os verbos em <em>-ir</em> e <em>-re</em> do 2º e 3º grupos mantêm o -s : <strong>Choisis !</strong>, <strong>Prends !</strong>, <strong>Bois !</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔀</div>
                <div className="tip-card-body">
                  <h3>Verbos Pronnominais : A Dança da Posição dos Pronomes</h3>
                  <p>
                    A posição do pronome reflexivo muda 180 graus entre a ordem afirmativa e a proibição negativa :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Afirmativo (Verbo + Hífen + Pronome Tônico) :</strong> O pronome vai para DEPOIS do verbo com hífen obrigatório ➔ <strong>Lave-toi les mains !</strong>, <strong>Reposez-vous !</strong><br />
                    • <strong>Negativo (Ne + Pronome Átono + Verbo + Pas) :</strong> O pronome volta para ANTES do verbo e sem hífen ➔ <strong>Ne te couche pas trop tard !</strong>, <strong>Ne vous trompez pas !</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>A Mudança de « Te » para « Toi » e « Me » para « Moi »</h3>
                  <p>
                    No imperativo afirmativo, os pronomes átonos <em>me</em> e <em>te</em> ganham força tônica e viram <strong>moi</strong> e <strong>toi</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Se dépêcher</em> ➔ ❌ <em>*Dépêche-te !</em> ➔ ✅ <strong>Dépêche-toi !</strong><br />
                    • <em>Attendre</em> ➔ ❌ <em>*Attendez-me !</em> ➔ ✅ <strong>Attendez-moi !</strong><br />
                    • Mas no negativo, retornam : <strong>Ne te dépêche pas !</strong>, <strong>Ne m'attendez pas !</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Os 4 Comandantes Irregulares do Subjuntivo</h3>
                  <p>
                    Quatro verbos indispensáveis não derivam do presente do indicativo, mas sim do radical do <strong>subjonctif</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Être :</strong> <em>Sois sage !</em> / <em>Soyons patients !</em> / <em>Ne soyez pas en retard !</em><br />
                    • <strong>Avoir :</strong> <em>Aie confiance !</em> / <em>Ayons du courage !</em> / <em>Ayez l'obligeance de...</em><br />
                    • <strong>Savoir :</strong> <em>Sache que je t'aime !</em> / <em>Sachez écouter.</em><br />
                    • <strong>Vouloir :</strong> Forma exclusiva de cortesia para vous ➔ <strong>Veuillez agréer...</strong>, <strong>Veuillez patienter</strong>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎵</div>
                <div className="tip-card-body">
                  <h3>O « -s » Eufônico Diante de Y e EN (Salvação Fonética)</h3>
                  <p>
                    Para evitar o choque feio de duas vogais (hiato fonético), o francês ressuscita o <strong>-s</strong> nos verbos em -er antes dos pronomes <em>y</em> e <em>en</em> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Va !</em> + <em>y</em> ➔ ❌ <em>*Va y !</em> ➔ ✅ <strong>Vas-y !</strong> (pronuncia-se [va.zi])<br />
                    • <em>Mange !</em> + <em>en</em> ➔ ❌ <em>*Mange en !</em> ➔ ✅ <strong>Manges-en !</strong> (pronuncia-se [mɑ̃.ʒzɑ̃])<br />
                    • <em>Pense à cela !</em> ➔ ✅ <strong>Penses-y !</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📋</div>
                <div className="tip-card-body">
                  <h3>Vocabulário Cívico & Administrativo Francês</h3>
                  <p>
                    Dicas práticas para formulários oficiais, vistos e registros civis na França :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Nom vs Prénom :</strong> <em>Nom</em> = Sobrenome de família (ex: Dupont) ; <em>Prénom</em> = Primeiro nome (ex: Jean).<br />
                    • <strong>Surnom :</strong> Apelido informal carinhoso.<br />
                    • <strong>Extrait de naissance :</strong> Certidão de nascimento oficial emitida pela mairie.<br />
                    • <strong>Permis de conduire :</strong> Carteira de habilitação (CNH francesa).<br />
                    • <strong>Cocher la case :</strong> Assinalar o quadradinho com um 'X' no formulário.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 20 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🥖</div>
                <div className="tip-card-body">
                  <h3>L'Article Partitif Obligatoire (Zéro Article en Portugais)</h3>
                  <p>
                    L'erreur n°1 des lusophones ! En portugais, on dit naturellement <em>« Bebo água »</em> ou <em>« Quero pão »</em> sans déterminant. En français, un nom indénombrable exige TOUJOURS un partitif :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*Je bois eau</em> ➔ ✅ <strong>Je bois de l'eau</strong><br />
                    ❌ <em>*Il mange pain</em> ➔ ✅ <strong>Il mange du pain</strong> (de + le)<br />
                    ❌ <em>*Elle achète viande</em> ➔ ✅ <strong>Elle achète de la viande</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>La Règle d'Or de la Négation (DE / D') et l'Exception du Verbe ÊTRE</h3>
                  <p>
                    À la forme négative, la quantité disparaît : <strong>du, de la, de l', des, un, une</strong> deviennent obligatoirement <strong>DE</strong> (ou <strong>D'</strong> devant voyelle), <strong>SAUF</strong> avec le verbe <strong>être</strong> où ils restent inchangés !
                  </p>
                  <div className="tip-example" lang="fr">
                    • Verbe ordinaire : <em>J'ai de la chance</em> ➔ <strong>Je n'ai pas de chance</strong><br />
                    • Verbe ordinaire : <em>Il a des amis</em> ➔ <strong>Il n'a pas d'amis</strong><br />
                    • ⚡ <strong>Exception ÊTRE :</strong> <em>C'est du fromage</em> ➔ <strong>Ce n'est pas du fromage</strong> (et non *pas de fromage) !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🌍</div>
                <div className="tip-card-body">
                  <h3>Genre des Pays : La Règle Magique du « -E » Final</h3>
                  <p>
                    Pour savoir quel article ou préposition utiliser avec un pays ou une région :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Terminé par un « -e » = FÉMININ ➔ préposition EN :</strong> <em>la France</em> (en France), <em>l'Italie</em> (en Italie), <em>l'Espagne</em> (en Espagne), <em>la Chine</em> (en Chine).<br />
                    • <strong>Terminé par une autre lettre = MASCULIN ➔ préposition AU :</strong> <em>le Brésil</em> (au Brésil), <em>le Canada</em> (au Canada), <em>le Japon</em> (au Japon), <em>le Maroc</em> (au Maroc).<br />
                    • 🚨 <strong>Les 4 exceptions masculines en -e :</strong> <strong>Le Mexique</strong> (au Mexique), <strong>le Cambodge</strong> (au Cambodge), <strong>le Mozambique</strong> (au Mozambique) et <strong>le Maine</strong> (au Maine).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Faux-Amis de Genre (Masculin vs Féminin)</h3>
                  <p>
                    Attention aux mots dont le genre est inversé entre le portugais et le français :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Féminins en français (masculins en pt) :</strong> <em>la planète</em> (o planeta), <em>la mer</em> (o mar), <em>la couleur</em> (a cor), <em>la fin</em> (o fim), <em>la dent</em> (o dente).<br />
                    • <strong>Masculins en français (féminins en pt) :</strong> <em>le voyage</em> (a viagem), <em>le courage</em> (a coragem), <em>le pont</em> (a ponte), <em>le message</em> (a mensagem), <em>le silence</em> (o silêncio), <em>le fromage</em> (o queijo).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📚</div>
                <div className="tip-card-body">
                  <h3>Homonymes de Genre : Deux Sens Totalement Différents !</h3>
                  <p>
                    Certains noms changent radicalement de signification selon qu'ils sont masculins ou féminins :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Le livre</strong> (o livro) vs <strong>La livre</strong> (a moeda libra / peso de 500g)<br />
                    • <strong>Le tour</strong> (a volta, o passeio, o turno) vs <strong>La tour</strong> (a torre)<br />
                    • <strong>Le poste</strong> (o cargo, o emprego, o receptor) vs <strong>La poste</strong> (a agência de correios)<br />
                    • <strong>Le moule</strong> (a forma de bolo/molde) vs <strong>La moule</strong> (o mexilhão - fruto do mar)<br />
                    • <strong>Le manche</strong> (o cabo de vassoura/ferramenta) vs <strong>La manche</strong> (a manga da camisa / Canal da Mancha)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">✈️</div>
                <div className="tip-card-body">
                  <h3>Exprimer la Provenance : De / D' vs Du vs Des</h3>
                  <p>
                    Pour dire d'où l'on vient (<em>from</em> en anglais, <em>de/do/da</em> en portugais) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>De / D'</strong> devant pays féminins, continents et villes : <em>Je viens de France</em>, <em>d'Italie</em>, <em>d'Asie</em>, <em>de Paris</em>.<br />
                    • <strong>Du</strong> devant pays masculins consonne : <em>Elle revient du Brésil</em>, <em>du Canada</em>, <em>du Maroc</em>, <em>du Mexique</em>.<br />
                    • <strong>Des</strong> devant pays pluriels : <em>Le vol arrive des États-Unis</em>.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 21 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>L'Accord du Participe Passé avec le COD Antécédent</h3>
                  <p>
                    C'est la règle d'or par excellence : au <em>passé composé</em> avec <strong>avoir</strong>, le participe passé s'accorde obligatoirement en genre et en nombre avec le pronom COD placé <strong>avant</strong> l'auxiliaire :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Le journaliste a pris les photos</em> ➔ <strong>Le journaliste les a prises</strong> [fém. pl.]<br />
                    • <em>Elle a appelé mes frères</em> ➔ <strong>Elle les a appelés</strong> [masc. pl.]<br />
                    • <em>J'ai acheté la maison</em> ➔ <strong>Je l'ai achetée</strong> [fém. sg.]<br />
                    <em>Attention :</em> si le complément est un COI (lui, leur), <strong>jamais d'accord</strong> (<em>Nous leur avons parlé</em>) !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Le Duo « Lui » et « Leur » : Unisexe et Invariable</h3>
                  <p>
                    Ne cherchez pas de forme féminine pour le complément d'objet indirect :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Lui</strong> s'utilise pour « a ele » ET pour « a ela » : <em>Tu parles à Paul ?</em> ➔ <strong>Tu lui parles</strong>. <em>Tu réponds à Sophie ?</em> ➔ <strong>Tu lui réponds</strong>.<br />
                    • <strong>Leur</strong> s'utilise pour les deux genres et ne prend <strong>JAMAIS de 's'</strong> comme pronom personnel : <em>Je leur envoie un message</em> (invariable !).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👤</div>
                <div className="tip-card-body">
                  <h3>Choses vs Personnes : Le Grand Piège de « Y » et « EN »</h3>
                  <p>
                    Les pronoms <em>y</em> et <em>en</em> ne remplacent en principe que des <strong>choses ou idées</strong>. Pour des êtres humains, conservez la préposition et ajoutez un pronom tonique :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Penser à ce livre</em> ➔ <strong>J'y pense</strong> (chose)<br />
                    • <em>Penser à cette amie</em> ➔ <strong>Je pense à elle</strong> (personne — ❌ <em>*J'y pense</em> est interdit !)<br />
                    • <em>Parler de ce film</em> ➔ <strong>J'en parle</strong> (chose)<br />
                    • <em>Parler de ce réalisateur</em> ➔ <strong>Je parle de lui</strong> (personne — ❌ <em>*J'en parle</em> est interdit !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🚦</div>
                <div className="tip-card-body">
                  <h3>L'Ordre des Doubles Pronoms : Le Schéma Infaillible</h3>
                  <p>
                    Quand deux pronoms se bousculent devant le verbe, leur ordre est strictement déterminé :
                  </p>
                  <div className="tip-example" lang="fr">
                    <strong>Sujet</strong> + [me/te/se/nous/vous] ➔ [le/la/l'/les] ➔ [lui/leur] ➔ [y] ➔ [en] + <strong>Verbe</strong><br />
                    • <em>Elle te donne le rôle</em> ➔ <em>Elle <strong>te le</strong> donne</em><br />
                    • <em>J'envoie la lettre au directeur</em> ➔ <em>Je <strong>la lui</strong> envoie</em> (COD avant COI pour la 3e personne !)<br />
                    • <em>Elle donne des fleurs à sa mère</em> ➔ <em>Elle <strong>lui en</strong> donne</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">👥</div>
                <div className="tip-card-body">
                  <h3>Les 5 Visages du Pronom « On »</h3>
                  <p>
                    Bien plus que le simple « a gente », <em>on</em> possède cinq fonctions essentielles :
                  </p>
                  <div className="tip-example" lang="fr">
                    1. <strong>Indéfini</strong> : <em>On a sonné à la porte</em> (quelqu'un)<br />
                    2. <strong>Coutume / Vérité générale</strong> : <em>En France, on mange du fromage</em><br />
                    3. <strong>Nous quotidien</strong> : <em>On part en vacances ?</em> (verbe au singulier !)<br />
                    4. <strong>Tu affectueux</strong> : <em>Alors, on fait la grasse matinée ?</em><br />
                    5. <strong>Voix passive</strong> : <em>Ici, on parle français</em> (Aqui se fala francês)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>Mise en Relief : C'est... qui et l'Accord Verbal</h3>
                  <p>
                    Dans la formule d'insistance <em>C'est... qui</em>, le verbe s'accorde obligatoirement avec la personne du pronom tonique :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>C'est <strong>moi qui ai</strong> gagné</em> (et NON <em>*qui a gagné</em> !)<br />
                    • <em>C'est <strong>toi qui as</strong> fait cette erreur</em> (avec un -s !)<br />
                    • <em>C'est <strong>nous qui préparons</strong> le dîner</em><br />
                    • <em>Ce sont <strong>eux qui sont</strong> responsables</em>
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 22 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔊</div>
                <div className="tip-card-body">
                  <h3>L'Effet Phonétique du « -e » Féminin</h3>
                  <p>
                    En français, l'ajout du <strong>-e</strong> au féminin a pour rôle fondamental de réveiller la consonne finale muette au masculin :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>grand</em> [ɡʁɑ̃] ➔ <strong>grande</strong> [ɡʁɑ̃d] (le <strong>d</strong> se fait entendre)<br />
                    • <em>français</em> [fʁɑ̃sɛ] ➔ <strong>française</strong> [fʁɑ̃sɛz] (le <strong>s</strong> devient sonore [z])<br />
                    • <em>charmant</em> [ʃaʁmɑ̃] ➔ <strong>charmante</strong> [ʃaʁmɑ̃t] (le <strong>t</strong> se prononce)<br />
                    <em>Rappel :</em> les adjectifs terminés par un <em>-e</em> muet au masculin sont identiques au féminin (<em>propre, sale, drôle, optimiste</em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Les 5 Formes Euphoniques Devant Voyelle</h3>
                  <p>
                    Cinq adjectifs indispensables adoptent une forme masculine spéciale devant un nom masculin singulier commençant par une voyelle ou un <em>h</em> muet :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>beau</strong> ➔ un <strong>bel</strong> homme / un <strong>bel</strong> appartement<br />
                    • <strong>nouveau</strong> ➔ un <strong>nouvel</strong> emploi / le <strong>nouvel</strong> an<br />
                    • <strong>vieux</strong> ➔ un <strong>vieil</strong> édifice / un <strong>vieil</strong> ami<br />
                    • <strong>fou</strong> ➔ un <strong>fol</strong> espoir / un <strong>fol</strong> amour<br />
                    • <strong>mou</strong> ➔ un <strong>mol</strong> oreiller
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🚦</div>
                <div className="tip-card-body">
                  <h3>La Règle BANGS : Les Rares Adjectifs Avant le Nom</h3>
                  <p>
                    La majorité des adjectifs français se place APRÈS le nom (couleurs, nationalités, formes). Seuls les adjectifs courts du groupe <strong>BANGS</strong> se placent AVANT :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>B</strong>eauty : un <em>beau</em> jardin, une <em>jolie</em> robe<br />
                    • <strong>A</strong>ge : un <em>jeune</em> homme, une <em>vieille</em> maison, un <em>nouveau</em> livre<br />
                    • <strong>N</strong>umber : la <em>première</em> fois, le <em>dernier</em> train<br />
                    • <strong>G</strong>oodness : une <em>bonne</em> idée, un <em>mauvais</em> signe<br />
                    • <strong>S</strong>ize : un <em>grand</em> voyage, une <em>petite</em> ville, un <em>long</em> trajet
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>Changement de Sens selon la Place</h3>
                  <p>
                    Certains adjectifs changent totalement de sens selon qu'ils sont placés avant (sens figuré/affectif) ou après le nom (sens propre/physique) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>un <strong>grand</strong> homme</em> (illustre, historique) vs <em>un homme <strong>grand</strong></em> (de haute taille)<br />
                    • <em>mon <strong>ancien</strong> directeur</em> (ex-directeur) vs <em>un meuble <strong>ancien</strong></em> (antique, d'époque)<br />
                    • <em>mon <strong>pauvre</strong> chien !</em> (à plaindre, blessé) vs <em>des pays <strong>pauvres</strong></em> (sans argent)<br />
                    • <em>une <strong>sale</strong> affaire</em> (scandaleuse) vs <em>une chemise <strong>sale</strong></em> (à laver)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎨</div>
                <div className="tip-card-body">
                  <h3>L'Invariabilité des Couleurs Composées et Fruits</h3>
                  <p>
                    Attention au piège d'orthographe le plus célèbre de la langue française :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Couleurs issues de noms (fruits/minéraux) : INVARIABLES !</strong><br />
                    <em>Des chaussures <strong>marron</strong></em> (jamais de -s !), <em>des pulls <strong>orange</strong></em>, <em>des robes <strong>bordeaux</strong></em>.<br />
                    • <strong>Couleurs composées : 100 % INVARIABLES !</strong><br />
                    <em>Des chaussures <strong>bleu marine</strong></em> (ni au féminin ni au pluriel !), <em>une veste <strong>gris foncé</strong></em>, <em>des yeux <strong>vert clair</strong></em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚖️</div>
                <div className="tip-card-body">
                  <h3>Comparatifs : AUSSI vs AUTANT (Le Piège Lusophone)</h3>
                  <p>
                    Ne confondez pas la comparaison de qualité et la comparaison de quantité :
                  </p>
                  <div className="tip-example" lang="fr">
                    • Avec un <strong>adjectif</strong> ➔ <strong>aussi ... que</strong> : <em>Elle est <strong>aussi ambitieuse que</strong> lui.</em><br />
                    • Avec un <strong>nom (quantité)</strong> ➔ <strong>autant de ... que</strong> : <em>Arnaud a <strong>autant d'argent que</strong> vous ?</em> (jamais <em>*aussi de</em> !)<br />
                    • Formes irrégulières : <em>bon ➔ <strong>meilleur</strong></em> (jamais <em>*plus bon</em>), <em>bien ➔ <strong>mieux</strong></em>, <em>mauvais ➔ <strong>pire</strong></em>.
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 23 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>L'Euphonie de « Cet » : Éviter le Choc de Deux Voyelles</h3>
                  <p>
                    Devant un nom masculin singulier commençant par une voyelle ou un <em>h</em> muet, l'adjectif démonstratif <strong>ce</strong> devient obligatoirement <strong>cet</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>ce livre</em>, <em>ce jeu</em> (consonne) vs <strong>cet</strong> <em>homme</em>, <strong>cet</strong> <em>auteur</em>, <strong>cet</strong> <em>appartement</em><br />
                    • <strong>Rappel phonétique :</strong> <em>cet</em> et <em>cette</em> se prononcent tous deux <strong>/sɛt/</strong> !<br />
                    • Au pluriel, la forme est universelle : <strong>ces</strong> (<em>ces arbres</em> [sez-aʁbʁ] avec liaison en [z]).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>Adjectifs Possessifs : L'Accord avec l'Objet Possédé !</h3>
                  <p>
                    En français, le possessif s'accorde <strong>toujours avec le nom possédé</strong>, jamais avec le genre du possesseur comme en portugais (<em>dele / dela</em>) ou anglais (<em>his / her</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Que penses-tu de <strong>son</strong> roman ?</em> (roman = masculin ➔ <em>son</em>, que l'auteur soit un homme ou une femme !)<br />
                    • <em>J'aime <strong>sa</strong> nouvelle pièce</em> (pièce = féminin ➔ <em>sa</em>).<br />
                    • Seul le contexte général indique à qui appartient l'objet.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎵</div>
                <div className="tip-card-body">
                  <h3>La Règle d'Or d'Euphonie : « Mon amie », « Son honnêteté »</h3>
                  <p>
                    Pour éliminer le hiatus (deux voyelles qui s'entrechoquent), on remplace <em>ma, ta, sa</em> par <strong>mon, ton, son</strong> devant un nom féminin singulier commençant par voyelle ou <em>h</em> muet :
                  </p>
                  <div className="tip-example" lang="fr">
                    ❌ <em>*ma amie</em> ➔ ✅ <strong>mon amie</strong> Suzanne<br />
                    ❌ <em>*ta amitié</em> ➔ ✅ <strong>ton amitié</strong> sincère<br />
                    ❌ <em>*sa honnêteté</em> ➔ ✅ <strong>son honnêteté</strong> indiscutable
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎩</div>
                <div className="tip-card-body">
                  <h3>Pronoms Possessifs : Circonflexe et Contractions</h3>
                  <p>
                    Distinguez bien l'adjectif (sans accent) du pronom possessif (avec accent circonflexe sur le <em>o</em>) :
                  </p>
                  <div className="tip-example" lang="fr">
                    • Adjectif : <em>notre ville</em>, <em>votre chien</em> (sans accent)<br />
                    • Pronom : <em>la <strong>nôtre</strong></em>, <em>le <strong>vôtre</strong></em>, <em>les <strong>nôtres</strong></em>, <em>les <strong>vôtres</strong></em> (avec accent circonflexe !)<br />
                    • <strong>Contractions avec à et de :</strong> <em>au mien</em> (à + le mien), <em>du sien</em> (de + le sien), <em>des leurs</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🧭</div>
                <div className="tip-card-body">
                  <h3>Pronoms Démonstratifs : Simples vs Composés (-ci / -là)</h3>
                  <p>
                    Les pronoms simples ne peuvent <strong>JAMAIS</strong> être employés seuls dans la phrase :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Simples (+ qui, que, de) :</strong> <em>celui qui</em> vient, <em>celle que</em> j'ai achetée, <em>celui de</em> Juliette.<br />
                    • <strong>Composés (autonomes, choix, opposition) :</strong> <strong>celui-ci</strong> (proximité) vs <strong>celui-là</strong> (éloignement).<br />
                    • <em>Cette robe est rose, cette robe est blanche ➔ <strong>Celle-ci</strong> est rose. <strong>Celle-là</strong> est blanche.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>Le Neutre « C'est » et les Expressions Idiomatiques</h3>
                  <p>
                    Après le présentateur <em>c'est</em>, l'adjectif qualificatif est <strong>toujours au masculin singulier</strong>, quelle que soit la réalité évoquée :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Les erreurs qu'elle a faites ! <strong>C'est idiot !</strong></em> (jamais *idiotes)<br />
                    • <em>Cette maison ! <strong>C'est si beau !</strong></em> (jamais *belle)<br />
                    • <strong>Expressions clés :</strong> <em>À la tienne !</em> (saúde !), <em>parmi les siens</em> (com a família), <em>faire des siennes</em> (aprontar), <em>y mettre du sien</em> (fazer a sua parte).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 24 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">👑</div>
                <div className="tip-card-body">
                  <h3>Qui vs Que : La Frontière Sujet vs Complément d'Objet</h3>
                  <p>
                    Contrairement au portugais qui emploie « que » partout, le français sépare strictement le sujet de l'objet direct :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>QUI = SUJET :</strong> suivi directement du verbe (<em>la personne <strong>qui parle</strong></em>, <em>le coffre <strong>qui est</strong> dans le salon</em>).<br />
                    • <strong>QUE = OBJET DIRECT :</strong> suivi d'un sujet + verbe (<em>le livre <strong>que je lis</strong></em>, <em>le lustre <strong>que Daniel a acheté</strong></em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🚫</div>
                <div className="tip-card-body">
                  <h3>L'Élision Phonétique : « Qui » JAMAIS, « Que » TOUJOURS !</h3>
                  <p>
                    L'une des fautes les plus pénalisantes chez les apprenants lusophones concerne la chute de voyelle :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>QUI ne s'élide JAMAIS :</strong> <em>l'artiste <strong>qui a pris</strong> cette photo</em> [ki.a] (❌ jamais *qu'a pris !).<br />
                    • <strong>QUE s'élide TOUJOURS devant voyelle / h muet :</strong> <em>l'article <strong>qu'elle</strong> écrit</em>, <em>les objets <strong>qu'il</strong> vend</em>, <em>le tableau <strong>qu'il</strong> peint</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>« C'est moi qui... » : Accord Obligatoire du Verbe</h3>
                  <p>
                    Dans les structures de mise en relief avec pronom tonique, le verbe s'accorde avec l'antécédent, et <strong>non</strong> à la 3e personne :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>C'est moi qui <strong>suis</strong> en charge</em> (❌ jamais *est)<br />
                    • <em>C'est toi qui <strong>es</strong> responsable</em> / <em>qui <strong>écris</strong> l'article</em><br />
                    • <em>C'est nous qui <strong>avons</strong> les documents</em><br />
                    • <em>C'est vous qui <strong>êtes</strong> le propriétaire</em> / <em>qui <strong>devez</strong> nous aider</em><br />
                    • <em>Ce sont eux qui <strong>peuvent</strong> décider</em> / <em>qui <strong>veulent</strong> acheter</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎨</div>
                <div className="tip-card-body">
                  <h3>Temps Composés avec « Que » : L'Accord du Participe Passé</h3>
                  <p>
                    Quand le pronom relatif <strong>que (qu')</strong> est COD placé avant l'auxiliaire <em>avoir</em>, le participe passé s'accorde en genre et nombre avec l'antécédent :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>La table [fém. sg.] que nous avons <strong>trouvée</strong></em><br />
                    • <em>La pièce [fém. sg.] qu'il a <strong>écrite</strong></em><br />
                    • <em>Les chaises [fém. pl.] qu'ils ont <strong>restaurées</strong></em><br />
                    • <em>Les photos [fém. pl.] que tu as <strong>prises</strong></em><br />
                    • <em>Les documents [masc. pl.] qu'il a <strong>consultés</strong></em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔗</div>
                <div className="tip-card-body">
                  <h3>Le Pronom « Dont » : Verbes en « De » et Possession</h3>
                  <p>
                    <strong>Dont</strong> remplace tout complément introduit par <em>de</em> (*parler de*, *avoir besoin de*, *se servir de*, *se souvenir de*). Pour la possession (<em>cujo</em>), l'ordre français est strict :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Régence avec de :</strong> <em>l'artisan <strong>dont</strong> tu parles</em>, <em>les pinceaux <strong>dont</strong> elle a besoin</em>.<br />
                    • <strong>Possession :</strong> <em>Un artisan <strong>dont j'ai rencontré le père</strong></em> (❌ jamais *dont le père j'ai rencontré !).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🧭</div>
                <div className="tip-card-body">
                  <h3>Repère Temporel « Où » et Neutres « Ce qui / Ce que »</h3>
                  <p>
                    En français, un repère de temps prend <strong>où</strong> (pas *que* comme en portugais). Pour une idée neutre, utilisez les formes avec <strong>ce</strong> :
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Temps :</strong> <em>l'année <strong>où</strong> il a ouvert sa boutique</em>, <em>le jour <strong>où</strong> il a été élu</em>.<br />
                    • <strong>Neutres &amp; Emphase :</strong> <em>Ce qui</em> (sujet), <em>Ce que</em> (COD), <em>Ce dont</em> (avec <em>de</em>), <em>Ce à quoi</em> (avec <em>à</em>).<br />
                    • <em><strong>Ce dont</strong> j'ai besoin, c'est <strong>de</strong> votre aide.</em> (Répétition de <em>de</em> après <em>c'est</em> !).
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </section>
      )}
    </div>
  );
};

export default ChapterPage;
