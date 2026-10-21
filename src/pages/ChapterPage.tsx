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
          className="chapter-blocked-alert"
        >
          <span className="chapter-blocked-icon" aria-hidden="true">⚠️</span>
          <div>
            <strong className="chapter-blocked-title">
              Chapitre temporairement suspendu pour révision éditoriale
            </strong>
            <p className="chapter-blocked-desc">
              Les exercices de ce chapitre sont temporairement inaccessibles pendant l'audit. Votre progression historique et vos points acquis restent intégralement préservés.
            </p>
          </div>
        </div>
      )}

      {chapterNum === 28 && (
        <div
          role="region"
          aria-label="Épreuve Finale"
          className="final-boss-banner"
        >
          <span className="final-boss-icon" aria-hidden="true">👑</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="final-boss-badges">
              <Badge variant="amber">Épreuve Finale</Badge>
              <Badge variant="cyan">35 séries · 345 questions</Badge>
              <Badge variant="emerald">7 Checkpoints</Badge>
            </div>
            <strong style={{ fontSize: '1.1rem', display: 'block', color: 'var(--text-primary)' }}>
              Le Grand Boss : Pot-pourri des 28 Chapitres
            </strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
                    No 2º grupo (regular), o plural ganha o clássico interfixo fonético <strong>-iss-</strong> (*nous finissons*). Já no 3º grupo (irregular), não há esse interfixo e o radical do singular frequentemente perde sua consoante final!
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
                    Estes 4 verbos terminam em <em>-ir</em>, mas vestem com orgulho as terminações idênticas aos verbos regulares em <em>-er</em> no presente do indicativo:
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
                    Com os pronomes <em>il / elle / on</em>, não acrescente terminação nenhuma! O <strong>d</strong> do radical permanece nu e completamente silencioso na pronúncia:
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
                    Atenção às mudanças de radical expressivas de <em>prendre</em>, <em>apprendre</em> e <em>comprendre</em>: o <strong>d</strong> some em *nous/vous* e a consoante <strong>n</strong> dobra no plural de *ils/elles*!
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
                    Na interrogação por inversão formal, quando o verbo termina por vogal na 3ª pessoa do singular, insere-se obrigatoriamente um <strong>-t-</strong> entre hifens para evitar o choque sonoro de duas vogais:
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
                    Uma das armadilhas mais frequentes para lusófonos: com artigos definidos (*le, la, l', les*), mantenha os artigos! Mas com artigos partitivos (*du, de la, des*) ou indefinidos, os artigos <strong>desaparecem por completo</strong>:
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
                    Para expressar sensações físicas corporais, necessidades vitais e idade, o francês utiliza <strong>sempre o verbo AVOIR</strong> (ter) e nunca *être* (ser/estar):
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
                    A diferença vital entre <em>Avoir</em> e <em>Être</em> na 3ª pessoa do plural depende exclusivamente da vibração das cordas vocais: [z] sonoro para ter e [s] surdo para ser/estar!
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
                    A distinção entre saber e conhecer é puramente sintática e não deixa dúvidas: <strong>savoir</strong> conecta-se a verbos no infinitivo ou orações com *que*, enquanto <strong>connaître</strong> acompanha diretamente pessoas ou lugares (substantivos):
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
                    Em estilo formal ou pedidos de cortesia por inversão, o francês rejeita a forma *Peux-je* e emprega sempre a elegante forma irregular <strong>Puis-je</strong>:
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
                    Estes dois verbos impessoais não possuem sujeito humano. Conjugam-se única e exclusivamente na 3ª pessoa do singular com o pronome neutro <strong>il</strong>:
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
                    Diante de um substantivo masculino singular iniciado por vogal ou <em>h</em> mudo, estes três adjetivos ganham uma forma especial em <strong>-l</strong> para garantir a harmonia e fluidez sonora:
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
                    Para indicar destino ou deslocamento com o verbo <em>aller</em>, use a preposição <strong>à</strong>, que se contrai obrigatoriamente com os artigos masculinos e plurais (nunca use *en* para cidades ou substantivos masculinos comuns!):
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
                    É a estrutura temporal mais espontânea e comum do francês falado para expressar intenções ou ações imediatas certas. A negação <strong>ne... pas</strong> abraça UNICAMENTE o verbo auxiliar <em>aller</em>:
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
                    Construído com <strong>venir no presente + de + infinitivo</strong>, traduz perfeitamente o nosso 'acabar de...'. Atenção à elisão obrigatória de <em>de</em> para <strong>d'</strong> diante de vogal ou <em>h</em> mudo:
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
                    Conjugado exatamente igual ao verbo <em>venir</em>, o verbo <em>tenir</em> é um verdadeiro camaleão idiomático em expressões consagradas:
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
                    Duas irregularidades morfológicas decisivas e uma peculiaridade fonética histórica para gravar para sempre no verbo <em>faire</em>:
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
                    Para expressar a ideia de 'mandar fazer', 'fazer com que outro faça' ou contratar um serviço profissional, use <strong>faire + infinitivo</strong>:
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
                    O verbo <em>devoir</em> é um verdadeiro camaleão dependendo do contexto sintático: expressa obrigação moral estrita, probabilidade/suposição lógica, dívida financeira ou destino programado:
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
                    Em francês a distinção é simples e elegante: use <strong>pourquoi</strong> para fazer a pergunta ('por que...?') e <strong>parce que</strong> (com elisão <em>parce qu'</em> diante de vogal) para introduzir a resposta de causa:
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
                    O pronome neutro <strong>en</strong> é indispensável para substituir qualquer complemento introduzido pela preposição <em>de</em>, artigos partitivos ou quando há numerais e quantificadores que se repetem ao final da frase:
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
                    Na locução <em>avoir l'air</em> (parecer / ter ar de), com pessoas o adjetivo concorda preferencialmente com o sujeito humano. Com objetos inanimados, concorda estritamente com o sujeito da oração:
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
                    <em>Vouloir</em> expressa uma vontade direta, forte e decidida. Para soar polido e educado em pedidos no cotidiano francês, prefira sempre o condicional de cortesia <strong>Je voudrais</strong> ou o verbo <em>souhaiter</em>:
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
                    Diferente do inglês ('I need it'), a locução francesa exige sempre a preposição <strong>de</strong>. Ao substituir por um pronome, use obrigatoriamente <strong>en</strong> (e nunca *le* ou *la*)!
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
                    Em francês, quando o verbo pronominal já esclarece que a ação recai sobre o próprio corpo do sujeito, é proibido usar adjetivo possessivo! Emprega-se sempre o <strong>artigo definido simples</strong>:
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
                    Os pronomes reflexivos acompanham o sujeito em todas as pessoas gramaticais. Diante de vogal ou <em>h</em> mudo, <em>me, te, se</em> sofrem elisão obrigatória para <strong>m', t', s'</strong>:
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
                    Distingua os verbos essencialmente pronominais (que só existem com pronome reflexivo, como <em>se souvenir</em>) dos verbos acidentais (que mudam de sentido na voz pronominal, como <em>passer</em> vs <em>se passer</em>):
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
                    Nos verbos reflexivos com o auxiliar <em>être</em>, a concordância do particípio passado faz-se com o pronome reflexivo SE este for Objeto Direto (COD). Se for Objeto Indireto (COI) ou se houver outro COD posterior, o particípio fica invariável!
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
                    No imperativo afirmativo, o pronome vai para DEPOIS do verbo com hífen e transforma-se em pronome tônico (*-toi*). Na negação, volta para ANTES do verbo na forma átona (*ne te... pas*):
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
                    Duas joias idiomáticas pronominais imprescindíveis para soar natural e autêntico no francês da vida real:
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
                    Os célebres 14 verbos intransitivos de movimento e transformação de vida/estado conjugam-se com <strong>ÊTRE</strong> no passado. O particípio passado concorda <strong>obrigatoriamente em gênero e número com o sujeito</strong>!
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
                    Estes 6 verbos clássicos usam <strong>ÊTRE</strong> quando não têm objeto direto (sentido intransitivo), mas mudam para o auxiliar <strong>AVOIR</strong> quando acompanhados de um complemento de objeto direto (COD) posterior!
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
                    Muitos verbos do 3º grupo formam particípios passados com padrões fonéticos regulares que facilitam a memorização. Agrupe-os por famílias sonoras:
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
                    No <em>passé composé</em>, os termos de negação (<strong>ne... pas</strong>, <em>ne... jamais</em>, <em>ne... rien</em>) abraçam <strong>UNICAMENTE o verbo auxiliar</strong> (<em>être</em> ou <em>avoir</em>), e o particípio passado fica solto ao final:
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
                    Com o auxiliar <em>avoir</em>, a regra universal é: o particípio passado NUNCA concorda com o sujeito. Porém, se um pronome de objeto direto (COD) estiver posicionado <strong>ANTES</strong> do verbo, a concordância de gênero e número é obrigatória!
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
                    No francês moderno falado e escrito informal, o <em>passé composé</em> substituiu integralmente o passado simples histórico (*passé simple*). Serve tanto para ações pontuais concluídas quanto para fatos recentes.
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
                    Para formar o <em>imparfait</em> de praticamente qualquer verbo regular ou irregular da língua francesa, pegue a forma conjugada com <strong>NOUS no presente</strong>, corte a desinência <em>-ons</em> e adicione as terminações universais do imperfeito:
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
                    Em toda a língua francesa, existe apenas UM único verbo cujo radical do imperfeito não se origina da forma *nous* do presente: é o verbo <strong>être</strong>, cujo radical universal é <strong>ét-</strong>!
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
                    O grande divisor de águas da narrativa francesa: use o <strong>imparfait</strong> para cenários contínuos, descrições e estados prolongados de fundo, e o <strong>passé composé</strong> para ações pontuais, concluídas e marcadas no tempo:
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
                    Sempre que você estiver pintando o quadro de fundo de uma história (o clima, a idade das pessoas, sensações físicas ou costumes habituais repetidos no passado), escolha sem hesitar o <strong>imparfait</strong>:
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
                    Não estranhe a grafia com duplo <strong>i</strong> em verbos terminados em <em>-ier</em> ou com <strong>yi</strong> em verbos em <em>-yer</em> com *nous* e *vous* no imperfeito: a primeira letra pertence ao radical e a segunda é a terminação gramatical!
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
                    A estrutura com <strong>Si + Imparfait</strong> possui duas funções capitais: criar hipóteses no presente com consequência no condicional, ou formular convites e sugestões de forma extremamente cordial e convidativa:
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
                    O erro nº 1 dos estudantes lusófonos! Em português dizemos naturalmente 'Bebo café' ou 'Quero pão'. Em francês, um substantivo comum <strong>NUNCA</strong> pode ficar nu sem determinante: para quantidades incontáveis ou porções indefinidas, o artigo partitivo (<strong>du, de la, de l', des</strong>) é estritamente obrigatório!
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
                    Regra de ouro categórica: numa frase negativa absoluta com <em>ne... pas</em>, todos os artigos partitivos (*du, de la, des*) e indefinidos (*un, une, des*) transformam-se obrigatoriamente em <strong>de</strong> (ou <strong>d'</strong> diante de vogal ou h mudo)!
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
                    Cuidado com os verbos de apreço e gosto pessoal (<em>aimer, adorer, détester, préférer</em>): com eles você expressa a ideia da categoria em sua totalidade, por isso usamos <strong>SEMPRE os artigos definidos (le, la, l', les)</strong>, mesmo na forma negativa!
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
                    Dica mnemônica infalível do professor FLE para saber o gênero geográfico: se o nome do país termina com a letra <strong>-e</strong>, ele é <strong>feminino</strong> e usa a preposição <strong>en</strong>! Se terminar com qualquer outra letra, é <strong>masculino</strong> e usa <strong>au</strong> (ou <strong>aux</strong> no plural).
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
                    A maioria dos substantivos em <em>-al</em> forma o plural irregular com a terminação <strong>-aux</strong>. Grave os casos clássicos do vocabulário culto e do cotidiano:
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
                    Alguns substantivos em francês mudam totalmente de significado dependendo se são acompanhados por um artigo masculino ou feminino. Fique muito atento aos falsos cognatos de gênero:
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
                    A regra de ouro mais cobrada em exames e na vida real: no <em>passé composé</em> com o auxiliar <em>avoir</em>, o particípio NUNCA concorda com o sujeito. Porém, se o pronome de Objeto Direto (COD) estiver posicionado <strong>ANTES</strong> do verbo, a concordância de gênero e número torna-se obrigatória!
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
                    Não procure forma feminina para os pronomes de Objeto Indireto (COI) de 3ª pessoa: <strong>lui</strong> serve tanto para 'a ele' quanto para 'a ela' no singular, e <strong>leur</strong> serve tanto para 'a eles' quanto para 'a elas' no plural!
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
                    Os pronomes neutros <strong>y</strong> e <strong>en</strong> substituem prioritariamente coisas, lugares ou ideias. Para seres humanos, prefira manter a preposição acompanhada do pronome tônico correspondente (*penser à lui*, *parler d'elle*):
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
                    Quando dois pronomes se aglomeram diante do verbo conjugado, sua ordem posicional é rigorosamente fixa: 1º pronomes de pessoa (*me, te, se, nous, vous*) ➔ 2º objeto direto (*le, la, les*) ➔ 3º objeto indireto (*lui, leur*) ➔ 4º *y* ➔ 5º *en*!
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
                    Muito além do clássico 'a gente', o pronome neutro <strong>on</strong> desempenha cinco funções estruturais valiosas no francês moderno: voz passiva impessoal, regras universais, humanidade em geral e coletividade:
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
                    Na estrutura de realce e ênfase <em>C'est... qui</em>, o verbo da oração seguinte deve concordar obrigatoriamente com a pessoa do pronome que foi enfatizado, e não com a forma impessoal *c'est*!
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
                    Em francês, o acréscimo da desinência <strong>-e</strong> no feminino não é meramente estético: sua função fonética primordial é <strong>despertar a consoante final muda</strong> do masculino, fazendo-a soar com nitidez!
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
                    Cinco adjetivos essenciais adotam uma forma masculina especial quando posicionados imediatamente antes de um substantivo masculino singular iniciado por vogal ou <em>h</em> mudo, preservando a harmonia sonora:
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
                    A esmagadora maioria dos adjetivos franceses situa-se DEPOIS do substantivo (cores, nacionalidades, formas). Apenas os curtos adjetivos da regra mnemônica <strong>BANGS</strong> (Beauty, Age, Number, Goodness, Size) vêm ANTES do substantivo:
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
                    Certos adjetivos alteram drasticamente de sentido conforme são colocados antes do substantivo (sentido afetivo ou figurado) ou depois dele (sentido literal, físico e factual):
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
                    Atenção à famosa regra de ortografia francesa sobre cores: adjetivos de cor derivados de frutas, flores, pedras preciosas ou compostos por duas palavras são <strong>estritamente invariáveis</strong> (não recebem -s nem -e)!
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
                    Não confunda a comparação de qualidade com a de quantidade: use <strong>aussi + adjetivo/advérbio + que</strong> para qualidades, e <strong>autant de + substantivo + que</strong> (ou verbo + autant) para quantidades!
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
                    Diante de um substantivo masculino singular iniciado por vogal ou <em>h</em> mudo, o demonstrativo <em>ce</em> transforma-se obrigatoriamente na forma eufônica <strong>cet</strong> para evitar o choque incômodo de duas vogais consecutivas:
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
                    Em francês, o adjetivo possessivo concorda SEMPRE com o gênero e número do <strong>objeto possuído</strong>, e nunca com o gênero do possuidor humano (ao contrário do inglês *his/her*)!
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
                    Para eliminar o hiato fonético, substituímos <em>ma, ta, sa</em> por <strong>mon, ton, son</strong> diante de substantivos femininos iniciados por vogal ou <em>h</em> mudo:
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
                    Distingua claramente o adjetivo possessivo (sem acento: *notre*, *votre*) do pronome possessivo equivalente (com acento circunflexo sobre a vogal o: <strong>le nôtre</strong>, <strong>le vôtre</strong>) e precedido de artigo definido:
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
                    Os pronomes demonstrativos simples (*celui, celle, ceux, celles*) NUNCA podem ser usados sozinhos na frase: exigem uma oração relativa com <em>qui/que</em> ou um complemento com <em>de</em>. Para uso isolado, empregue as formas compostas com <strong>-ci</strong> ou <strong>-là</strong>:
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
                    Após a expressão apresentadora neutra <strong>c'est</strong>, o adjetivo qualificativo que expressa um comentário geral fica sempre no <strong>masculino singular</strong>, qualquer que seja o substantivo citado anteriormente!
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
                    Diferente do português que usa 'que' para quase todas as situações, o francês separa estritamente o pronome sujeito do pronome objeto: use <strong>QUI</strong> quando o pronome for o sujeito da oração seguinte (seguido diretamente de verbo), e <strong>QUE</strong> quando for o objeto direto (seguido de novo sujeito + verbo)!
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
                    Uma das falhas mais frequentes em provas: o pronome <strong>qui</strong> NUNCA sofre elisão fonética (o som [i] é sagrado e não cai!), enquanto o pronome <strong>que</strong> sofre elisão obrigatória tornando-se <strong>qu'</strong> diante de vogal!
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
                    Nas estruturas enfáticas com pronome tônico (*C'est moi qui...*, *C'est toi qui...*), o verbo da oração seguinte deve concordar estritamente com a pessoa do pronome tônico antecedente, e não na 3ª pessoa!
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
                    Quando o pronome relativo <em>que</em> (ou <em>qu'</em>) atua como Objeto Direto antecedente ao verbo auxiliar <em>avoir</em>, o particípio passado concorda obrigatoriamente em gênero e número com o antecedente!
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
                    O pronome relativo <strong>dont</strong> substitui qualquer termo oracional introduzido pela preposição <em>de</em> (*parler de*, *avoir besoin de*, *être fier de*) ou indica relação de posse (equivalente ao nosso 'cujo/cuja'):
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
                    Em francês, pontos e referências temporais utilizam o pronome <strong>où</strong> (e não *que* como dizemos em português). Quando o antecedente for uma ideia neutra abstrata, utilize <strong>ce qui</strong> (sujeito) ou <strong>ce que</strong> (objeto):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Temps :</strong> <em>l'année <strong>où</strong> il a ouvert sa boutique</em>, <em>le jour <strong>où</strong> il a été élu</em>.<br />
                    • <strong>Neutres &amp; Emphase :</strong> <em>Ce qui</em> (sujet), <em>Ce que</em> (COD), <em>Ce dont</em> (avec <em>de</em>), <em>Ce à quoi</em> (avec <em>à</em>).<br />
                    • <em><strong>Ce dont</strong> j'ai besoin, c'est <strong>de</strong> votre aide.</em> (Répétition de <em>de</em> après <em>c'est</em> !).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 25 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>« Depuis » + Présent : Le Piège n°1 des Lusophones !</h3>
                  <p>
                    Em português dizemos 'moro aqui há dez anos' ou 'faz dez anos que moro aqui'. Em francês, como a ação começou no passado e ainda continua ativa no presente, a gramática exige o <strong>PRESENTE DO INDICATIVO + DEPUIS</strong> (nunca use passado nem a preposição *pour*)!
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*J'ai habité à Paris depuis 3 ans</em> (Faux ! C'est du passé)<br />
                    • ✅ <strong>J'habite à Paris depuis trois ans</strong> (Action toujours active aujourd'hui !)<br />
                    • ✅ <strong>Il y a trois ans que j'habite à Paris</strong> / <strong>Cela fait trois ans que...</strong>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎯</div>
                <div className="tip-card-body">
                  <h3>« Depuis quand » (Point de départ) vs « Depuis combien de temps » (Durée)</h3>
                  <p>
                    Para formular perguntas sobre tempo decorrido, distingua com precisão a data de início da quantidade de tempo acumulado: use <strong>Depuis quand</strong> para uma data/marco pontual, e <strong>Depuis combien de temps</strong> para a duração total de dias, meses ou anos:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Depuis quand ?</strong> (Since when? / Desde quando?) → attend une <strong>date ou un repère fixe</strong> : <em>depuis 1998</em>, <em>depuis jeudi</em>, <em>depuis notre enfance</em>.<br />
                    • <strong>Depuis combien de temps ?</strong> (How long? / Há quanto tempo?) → attend une <strong>durée mesurée</strong> : <em>depuis cinq ans</em>, <em>depuis trois mois</em>, <em>depuis 45 minutes</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚡</div>
                <div className="tip-card-body">
                  <h3>La Place des Adverbes Courts au Passé Composé</h3>
                  <p>
                    No <em>passé composé</em>, os advérbios curtos de quantidade (*beaucoup, trop, assez, peu*), de qualidade (*bien, mal*) e de tempo/frequência (*toujours, souvent, déjà, jamais*) posicionam-se <strong>ENTRE o verbo auxiliar e o particípio passado</strong>:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Elle a <strong>beaucoup</strong> dépensé.</em> (❌ pas *dépensé beaucoup)<br />
                    • <em>On a <strong>bien</strong> mangé chez eux.</em><br />
                    • <em>Ils ont <strong>souvent</strong> voyagé en Asie.</em><br />
                    • <em>Nous n'avons pas <strong>assez</strong> travaillé.</em> (placé après le <em>pas</em> !)<br />
                    • <em>Il s'est <strong>toujours très mal</strong> exprimé.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>Durée Passée Achevée : « Pendant » OUI, « Pour » JAMAIS !</h3>
                  <p>
                    Para expressar uma duração temporal que começou e terminou completamente no passado, o francês emprega <strong>pendant</strong> (ou simplesmente o valor de tempo direto). A preposição *pour* NUNCA pode ser usada para durações passadas concluídas!
                  </p>
                  <div className="tip-example" lang="fr">
                    • ✅ <em>Il a habité <strong>pendant cinq ans</strong> à Londres.</em> (ou <em>Il a habité cinq ans à Londres.</em>)<br />
                    • ❌ <em>Jamais *pour cinq ans au passé !</em><br />
                    • <strong>Rappel :</strong> <em>Pour</em> n'exprime une durée que pour un projet futur (<em>Je pars pour deux semaines</em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📍</div>
                <div className="tip-card-body">
                  <h3>« Dessus / Dessous » (Adverbes) vs « Sur / Sous » (Prépositions)</h3>
                  <p>
                    Não confunda as preposições que exigem um substantivo complementar logo a seguir (*sur la table*, *sous le lit*) com os advérbios autônomos que finalizam a frase ou oração sem complemento direto (<strong>dessus</strong>, <strong>dessous</strong>):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Sur / Sous</strong> (prépositions avec nom) : <em>Mets le sac <strong>sur la table</strong></em> / <em><strong>sous la table</strong></em>.<br />
                    • <strong>Dessus / Dessous</strong> (adverbes sans nom) : <em>Mets ton sac <strong>dessous</strong></em> / <em>C'est écrit <strong>dessus</strong></em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">📚</div>
                <div className="tip-card-body">
                  <h3>Vocabulaire des Boutiques et le Faux Ami « Librairie »</h3>
                  <p>
                    Atenção ao clássico falso amigo (*faux ami*): em francês, <strong>une librairie</strong> é uma loja onde se compram livros (livraria!). O local público onde se pegam livros emprestados gratuitamente chama-se <strong>une bibliothèque</strong>!
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Une librairie :</strong> une boutique où l'on <strong>achète</strong> des livres (livraria / bookstore).<br />
                    • <strong>Une bibliothèque :</strong> l'établissement où l'on <strong>emprunte</strong> des livres (biblioteca / library).<br />
                    • <strong>Chez vs À :</strong> <em>Je vais <strong>chez le boulanger</strong></em> (personne) mais <em><strong>à la boulangerie</strong></em> (lieu).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 26 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔢</div>
                <div className="tip-card-body">
                  <h3>Le Système Vigésimal : 70, 80 et 90 sans Panique !</h3>
                  <p>
                    Diferente do português que conta de forma estritamente decimal (setenta, oitenta, noventa), o francês da França herdou dos povos celtas a contagem vigesimal (em base 20)! Não se desespere: entenda a lógica mental de adição (60+10, 4x20, 4x20+10) como uma fórmula simples:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>70 = soixante-dix</strong> (60 + 10) & <strong>71 = soixante et onze</strong> (60 + 11 avec « et » !)<br />
                    • <strong>80 = quatre-vingts</strong> (4 × 20) & <strong>81 = quatre-vingt-un</strong> (sans « et » !)<br />
                    • <strong>90 = quatre-vingt-dix</strong> (4 × 20 + 10) & <strong>91 = quatre-vingt-onze</strong> (sans « et » !)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">✍️</div>
                <div className="tip-card-body">
                  <h3>L'Accord de « Vingt » et « Cent » : Le Secret du Pluriel</h3>
                  <p>
                    Os numerais <em>vingt</em> (20) e <em>cent</em> (100) só recebem a marca de plural (<strong>-s</strong>) se atenderem a duas condições simultâneas: forem multiplicados E não forem seguidos por nenhum outro número logo depois:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>quatre-vingt<strong>s</strong></em> (80) mais <em>quatre-vingt-trois</em> (83)<br />
                    • <em>deux cent<strong>s</strong></em> (200), <em>huit cent<strong>s</strong></em> (800) mais <em>deux cent cinq</em> (205)<br />
                    • <em>deux cent quatre-vingt<strong>s</strong></em> (280 - s sur vingt, pas sur cent)
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🛑</div>
                <div className="tip-card-body">
                  <h3>L'Invariable « Mille » vs les Noms « Million » et « Milliard »</h3>
                  <p>
                    Uma regra de ouro absoluta da gramática francesa para gravar para sempre: a palavra <strong>mille</strong> (mil) é <strong>estritamente invariável</strong> e NUNCA recebe 's'! Por outro lado, <em>million</em> e <em>milliard</em> são substantivos plenos e recebem plural normal e exigem a preposição *de*:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Mille</strong> est un adjectif numéral strictement <strong>INVARIABLE</strong> : <em>trois mille</em>, <em>dix mille</em> (❌ jamais *milles !)<br />
                    • <strong>Million</strong> et <strong>Milliard</strong> sont des noms communs : ils prennent un <strong>-s</strong> au pluriel et exigent <strong>de / d'</strong> devant un nom : <em>deux millions d'euros</em>, <em>huit milliards d'étoiles</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🥇</div>
                <div className="tip-card-body">
                  <h3>Les Ordinaux : « Premier », « Second » et « Deuxième »</h3>
                  <p>
                    Para classificar e indicar ordem: empregue <strong>second</strong> preferencialmente quando a série possui apenas dois elementos no total (como Segunda Guerra Mundial), e <strong>deuxième</strong> quando a enumeração continua (terceiro, quarto...):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>premier / première</strong> (1er / 1re) et <strong>dernier / dernière</strong> sont irréguliers.<br />
                    • <strong>second / seconde</strong> (/sə.ɡɔ̃/) s'emploie lorsqu'il n'y a que 2 éléments dans la série (<em>la Seconde Guerre mondiale</em>).<br />
                    • <strong>deuxième</strong> s'emploie quand la suite comporte plus de deux éléments (<em>le deuxième chapitre</em>).<br />
                    • <strong>Neuvième :</strong> le <em>f</em> se change en <em>v</em> (<em>la neuvième symphonie</em>).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🏢</div>
                <div className="tip-card-body">
                  <h3>Les Étages en France : Le Rez-de-chaussée (RDC)</h3>
                  <p>
                    Atenção ao detalhe cultural da numeração predial francesa: o nível térreo ao nível da rua é chamado de <strong>rez-de-chaussée (RDC)</strong>. O 'primeiro andar' francês (*1er étage*) equivale ao segundo pavimento no Brasil!
                  </p>
                  <div className="tip-example" lang="fr">
                    • Le niveau de la rue est <strong>le rez-de-chaussée (RDC)</strong> (térreo).<br />
                    • Le niveau supérieur est <strong>le premier étage</strong> (1º andar / american 2nd floor).<br />
                    • <em>J'habite au deuxième étage</em> = 2 étages au-dessus du sol !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🗣️</div>
                <div className="tip-card-body">
                  <h3>Prononciation Fine des Consonnes : 5, 6, 8, 10</h3>
                  <p>
                    A pronúncia da consoante final dos números <em>cinq, six, huit, dix</em> varia conforme o contexto fonético seguinte: soa forte no fim de frase, vira som de ligação [z] diante de vogal e fica muda diante de palavra iniciada por consoante:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Seul ou en fin de phrase :</strong> consonne prononcée : <em>j'en ai six</em> (/sis/), <em>huit</em> (/ɥit/).<br />
                    • <strong>Devant consonne :</strong> consonne muette : <em>six livres</em> (/si livʁ/), <em>dix tables</em> (/di tabl/).<br />
                    • <strong>Devant voyelle :</strong> liaison sonore en /z/ : <em>six amis</em> (/siz‿ami/), <em>dix heures</em> (/diz‿œʁ/).<br />
                    • <strong>Sept (/sɛt/) :</strong> le <em>p</em> est TOUJOURS muet (jamais *sɛpt !).
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 27 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">🔄</div>
                <div className="tip-card-body">
                  <h3>Le Verbe « MANQUER » : L'Inversion Totale Lusophone !</h3>
                  <p>
                    Este é um dos choques estruturais mais célebres para estudantes lusófonos! Em português dizemos 'Eu sinto a sua falta' (o sujeito é quem sente). Em francês, a estrutura inverte-se por completo: <strong>é aquilo ou quem faz falta que atua como sujeito da frase</strong>!
                  </p>
                  <div className="tip-example" lang="fr">
                    • ❌ <em>*Je te manque</em> = "Você está com saudades de mim" (sens inverse !)<br />
                    • ✅ <strong>Tu me manques !</strong> = Tu fais défaut à moi / Je ressens ton absence (Sinto sua falta).<br />
                    • ✅ <strong>Mes enfants me manquent.</strong> = Meus filhos me fazem falta (Sinto falta dos meus filhos).<br />
                    • <strong>Les 4 nuances de Manquer :</strong><br />
                    &nbsp;&nbsp;1. <em>Manquer le train</em> (direct = rater / perder).<br />
                    &nbsp;&nbsp;2. <em>Manquer de temps</em> (de = carecer / faltar).<br />
                    &nbsp;&nbsp;3. <em>Manquer à sa parole</em> (à = romper promessa / faltar com).<br />
                    &nbsp;&nbsp;4. <em>Tu me manques</em> (à quelqu'un = sentiment d'absence).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎸</div>
                <div className="tip-card-body">
                  <h3>Verbes à Préposition : « Jouer À » vs « Jouer De »</h3>
                  <p>
                    O verbo <em>jouer</em> muda de preposição conforme a atividade: use a preposição <strong>À</strong> para esportes, jogos e brincadeiras coletivas (*au football*, *aux cartes*), e use a preposição <strong>DE</strong> para instrumentos musicais (*du piano*, *de la guitare*):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Jouer À + jeu / sport :</strong> <em>jouer au football</em> (à + le), <em>jouer aux cartes</em> (à + les), <em>jouer aux échecs</em>.<br />
                    • <strong>Jouer DE + instrument :</strong> <em>jouer du piano</em> (de + le), <em>jouer de la guitare</em>, <em>jouer de la clarinette</em>, <em>jouer des castagnettes</em>.<br />
                    • <strong>Astuce :</strong> <em>À</em> pour l'Activité ludique, <em>De</em> pour le son Délicat de l'instrument !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🕊️</div>
                <div className="tip-card-body">
                  <h3>« Croire » : Direct vs « À » vs « En »</h3>
                  <p>
                    Distingua com rigor os três níveis de crença do verbo <em>croire</em>: direto para acreditar na veracidade de algo/alguém (*je te crois*), com <strong>à</strong> para conceitos míticos ou ideias abstratas (*croire au destin*), e com <strong>en</strong> para fé religiosa, em Deus ou confiança íntima profunda (*croire en soi*):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Croire quelqu'un / quelque chose (direct) :</strong> juger véridique ce qui est dit : <em>Je te crois</em> (acredito em você / no que diz).<br />
                    • <strong>Croire À + concept / légende :</strong> croire en l'existence : <em>croire au Père Noël</em>, <em>croire aux fantômes</em>, <em>croire au destin</em>.<br />
                    • <strong>Croire EN + divinité / personne :</strong> foi intime et confiance totale : <em>croire en Dieu</em>, <em>croire en soi</em>, <em>croire en l'avenir</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⚖️</div>
                <div className="tip-card-body">
                  <h3>« Quoi que » vs « Quoique » vs « Quel que » (+ Subjonctif)</h3>
                  <p>
                    Estas três construções de concessão e indefinição exigem SEMPRE o modo subjuntivo, mas possuem sentidos e grafias distintas: <em>quoi que</em> em duas palavras significa 'o que quer que', enquanto <em>quoique</em> em uma só palavra traduz 'embora/ainda que':
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Quoi que (2 mots) :</strong> n'importe quoi que (<em>o que quer que</em>) : <em><strong>Quoi que</strong> tu fasses, préviens-moi.</em><br />
                    • <strong>Quoique (1 mot) :</strong> bien que / encore que (<em>embora</em>) : <em><strong>Quoiqu'</strong>il soit tard, nous sortons.</em><br />
                    • <strong>Quel que soit / Quelle que soit (s'accorde avec le nom !) :</strong> <em><strong>Quelle que soit</strong> votre décision</em>, <em><strong>Quels que soient</strong> vos motifs</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">💎</div>
                <div className="tip-card-body">
                  <h3>Pépites Idiomatiques : « Avoir beau » &amp; « Quitte à »</h3>
                  <p>
                    Duas locuções sofisticadas muito utilizadas por falantes nativos: <strong>avoir beau + infinitivo</strong> expressa esforço em vão ('por mais que eu tente/faça'), e <strong>quitte à + infinitivo</strong> traduz 'mesmo que tenha que / ainda que custe':
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Avoir beau + infinitif :</strong> correspond à <em>por mais que... / em vão</em> : <em>J'<strong>ai beau chercher</strong>, je ne trouve pas mes lunettes.</em> (Por mais que eu procure, não acho).<br />
                    • <strong>Quitte à + infinitif :</strong> correspond à <em>mesmo que para isso tenha que... / com o risco de...</em> : <em>Je prendrai un taxi, <strong>quitte à arriver</strong> avec dix minutes de retard.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🍳</div>
                <div className="tip-card-body">
                  <h3>Cuisine et Table : Faux Amis et Accents Essentiels</h3>
                  <p>
                    Atenção aos detalhes gastronômicos e falsos cognatos da culinária francesa: o verbo <em>goûter</em> exige acento circunflexo (significa degustar/provar), e a refeição leve da tarde é chamada com carinho de <em>le goûter</em>!
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Une poêle (fém. avec accent circonflexe) :</strong> frigideira ! (<em>Un poêle</em> au masculin désigne un appareil de chauffage / aquecedor).<br />
                    • <strong>Une serviette :</strong> guardanapo (<em>serviette de table</em>) ou toalha de banho (<em>serviette de bain</em>). La toalha de mesa se dit <strong>la nappe</strong> !<br />
                    • <strong>Une cuisinière :</strong> désigne à la fois le meuble électroménager (fogão) et la personne qui cuisine !
                  </div>
                </div>
              </div>
            </div>
          ) : chapterNum === 28 ? (
            <div className="tips-deck">
              <div className="tip-card card card-default">
                <div className="tip-card-icon">👑</div>
                <div className="tip-card-body">
                  <h3>L'Ordre d'Or des Pronoms Compléments (La Formule Magique)</h3>
                  <p>
                    Diante do verbo conjugado, o alinhamento de múltiplos pronomes complementos obedece a uma ordem matemática rigorosa. Memorize esta fórmula de ouro: <strong>1º me/te/se/nous/vous ➔ 2º le/la/les ➔ 3º lui/leur ➔ 4º y ➔ 5º en</strong>!
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Ordre :</strong> [me/te/se/nous/vous] → [le/la/les] → [lui/leur] → [y] → [en]<br />
                    • <em>L'architecte la leur a présentée.</em> (la = COD féminin antéposé → <strong>accordée</strong> !)<br />
                    • <em>Charlie s'est résigné à les lui donner.</em> (placés devant l'infinitif régissant).<br />
                    • <em>Les lui as-tu donnés ?</em> (les = colliers masc. pluriel → <strong>donnés</strong> !).
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎭</div>
                <div className="tip-card-body">
                  <h3>Le Pronom « Ça » et la Voix Pronominale Passive</h3>
                  <p>
                    No francês natural e dinâmico, prefere-se frequentemente a estrutura pronominal com o pronome neutro <strong>ça</strong> em vez de uma voz passiva pesada com o verbo *être*:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Ça se voit :</strong> <em>Tu as une tache sur ta robe, mais ça ne se voit pas.</em> (não se nota).<br />
                    • <strong>Ça ne se fait pas :</strong> <em>Ne mets pas les coudes sur la table, ça ne se fait pas !</em> (não se faz / falta de educação).<br />
                    • <strong>Ça se mange :</strong> <em>Pas besoin de couverts, ça se mange avec les doigts.</em><br />
                    • <strong>Ça se lit :</strong> <em>Le début est difficile, mais ça se lit bien finalement.</em><br />
                    • <strong>Ça se vend :</strong> <em>Il faut recommander du champagne, car ça se vend très bien.</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🧭</div>
                <div className="tip-card-body">
                  <h3>Le Chassé-Croisé des Pronoms Relatifs (Simples &amp; Complexes)</h3>
                  <p>
                    Para conectar orações sem repetições deselegantes, identifique a função sintática do termo substituído: <strong>qui</strong> para sujeito, <strong>que</strong> para objeto direto, <strong>dont</strong> para complementos com *de*, e <strong>où</strong> para tempo ou lugar:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>QUI :</strong> Sujet (personne ou objet) → <em>L'iPad <strong>qui</strong> se trouve dans la cuisine.</em><br />
                    • <strong>QUE :</strong> Complément d'Objet Direct → <em>Le polar <strong>que</strong> je viens de lire.</em><br />
                    • <strong>DONT :</strong> Complément de <em>de</em> → <em>Le garçon <strong>dont</strong> tu as oublié le nom.</em><br />
                    • <strong>OÙ :</strong> Lieu ou moment → <em>La maison <strong>où</strong> il habite ; L'année <strong>où</strong> ils sont partis.</em><br />
                    • <strong>Avec préposition :</strong> <em>La table sur <strong>laquelle</strong> nous mangeons</em> ; <em>Les jouets <strong>auxquels</strong> elle pense</em>.
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">🎲</div>
                <div className="tip-card-body">
                  <h3>Le Système Hypothétique avec « SI » (Les 3 Paliers)</h3>
                  <p>
                    A concordância verbal após a conjunção condicional <em>si</em> obedece a três patamares fixos: <strong>1. Si + Présent ➔ Futur simple</strong>; <strong>2. Si + Imparfait ➔ Conditionnel présent</strong>; <strong>3. Si + Plus-que-parfait ➔ Conditionnel passé</strong>. Lembre-se: 'Les SI n'aiment pas les -RAIS !'
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>1. Réel :</strong> Si + Présent → <strong>Futur simple</strong> (<em>Si tu étudies, tu réussiras.</em>)<br />
                    • <strong>2. Potentiel / Irréel du Présent :</strong> Si + Imparfait → <strong>Conditionnel Présent</strong><br />
                    &nbsp;&nbsp;→ <em>Si tu <strong>voyais</strong> cette maison, tu <strong>voudrais</strong> l'acheter.</em><br />
                    • <strong>3. Irréel du Passé :</strong> Si + Plus-que-parfait → <strong>Conditionnel Passé</strong><br />
                    &nbsp;&nbsp;→ <em>Si tu me l'<strong>avais dit</strong>, nous <strong>aurions pris</strong> une autre route.</em><br />
                    ⚠️ <strong>Règle d'or :</strong> Jamais de conditionnel directement dans la subordonnée avec <em>si</em> !
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">💡</div>
                <div className="tip-card-body">
                  <h3>« Avoir beau + Infinitif » : La Concession Élégante</h3>
                  <p>
                    Uma alternativa de alta elegância estilística às conjunções *bien que* e *quoique*, com a enorme vantagem de <strong>não necessitar do modo subjuntivo</strong>! Conjuga-se o verbo <em>avoir</em> no tempo desejado seguido do verbo principal no infinitivo:
                  </p>
                  <div className="tip-example" lang="fr">
                    • <em>Quoiqu'ils aient de l'argent...</em> → <strong>Ils ont beau avoir assez d'argent</strong>, ils préfèrent louer.<br />
                    • <em>Bien qu'il soit innocent...</em> → <strong>Il a beau être innocent</strong>, il a été incarcéré.<br />
                    • <em>Quoique la mer soit très agitée...</em> → <strong>La mer a beau être très agitée</strong>, ils surfent.<br />
                    • Équivalent portugais : <em>Por mais que tenham dinheiro... / Por mais inocente que seja...</em>
                  </div>
                </div>
              </div>

              <div className="tip-card card card-default">
                <div className="tip-card-icon">⏳</div>
                <div className="tip-card-body">
                  <h3>L'Expression du Temps avec « DEPUIS »</h3>
                  <p>
                    Diferença crucial com o português: para uma ação que teve início no passado mas que <strong>continua plenamente ativa no momento presente</strong>, o francês exige categoricamente o <strong>PRESENTE DO INDICATIVO + DEPUIS</strong> (e nunca tempos pretéritos ou *pour*):
                  </p>
                  <div className="tip-example" lang="fr">
                    • <strong>Depuis quand ?</strong> (date / point de départ précis) :<br />
                    &nbsp;&nbsp;→ <strong>J'apprends le japonais depuis janvier.</strong> (Estudo japonês desde janeiro).<br />
                    &nbsp;&nbsp;→ <strong>Je suis citoyen français depuis juin 2010.</strong><br />
                    • <strong>Depuis combien de temps ?</strong> (durée écoulée) :<br />
                    &nbsp;&nbsp;→ <strong>Je suis avocate depuis trois ans.</strong> (Sou advogada há três anos).<br />
                    &nbsp;&nbsp;→ <strong>Je travaille dans cet atelier depuis six mois.</strong>
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
                    Em francês, as desinências do presente dos verbos do 1º grupo (<strong>-e, -es, -ent</strong>) são <strong>estritamente mudas</strong>! Nunca pronuncie o 'ent' final como som nasal ou ditongo: <em>ils parlent</em> soa exatamente como <em>il parle</em>.
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
                    Diante de qualquer palavra iniciada por vogal ou <em>h</em> mudo, o pronome <strong>je</strong> sofre elisão fonética obrigatória tornando-se <strong>j'</strong> para evitar o choque desagradável entre duas vogais (hiato).
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
                    O <strong>-s</strong> final dos pronomes <em>nous, vous, ils, elles</em> ganha vida quando o verbo começa por vogal ou <em>h</em> mudo, unindo as palavras com um som contínuo e vibrante de <strong>[z]</strong> (como o zumbido de uma abelha).
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
                    No francês cotidiano e falado, <strong>on</strong> é o equivalente exato do nosso 'a gente': substitui <em>nous</em> quase sempre com sentido de nós, mas conjuga-se estritamente na <strong>3ª pessoa do singular</strong> (como <em>il/elle</em>).
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
                    Para manter a pronúncia original do radical diante da terminação <em>-ons</em> de <strong>nous</strong>, usamos a cedilha (<strong>ç</strong>) nos verbos em <em>-cer</em> e intercalamos um <strong>e</strong> mudo nos verbos em <em>-ger</em>.
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
                    Atenção lusófonos! Em português dizemos 'moro aqui há três anos', mas em francês uma ação iniciada no passado que <strong>continua ativa no presente</strong> exige obrigatoriamente o <strong>PRESENTE DO INDICATIVO + DEPUIS</strong> (nunca o passado!).
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
