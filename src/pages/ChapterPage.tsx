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
