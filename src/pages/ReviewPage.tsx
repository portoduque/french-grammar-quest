import React, { useState, useMemo } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useNavigate } from 'react-router-dom';
import { useMistakes } from '@/hooks/useMistakes';
import { MistakeCard } from '@/components/review/MistakeCard';
import { ReviewSessionModal } from '@/components/review/ReviewSessionModal';
import { UserMistakeDetail } from '@/types/database';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [singlePracticeMistake, setSinglePracticeMistake] = useState<UserMistakeDetail | null>(null);

  const {
    mistakes,
    pendingCount,
    resolvedCount,
    isLoading,
    completeReview
  } = useMistakes({
    chapterId: selectedChapter === 'all' ? null : selectedChapter,
    status: activeTab
  });

  // Lista agregada de capítulos disponíveis para filtro
  const availableChapters = useMemo(() => {
    const chs = new Set<string>();
    for (const m of mistakes) {
      if (m.chapter_id) chs.add(m.chapter_id);
    }
    return Array.from(chs).sort();
  }, [mistakes]);

  const handleStartReview = () => {
    setSinglePracticeMistake(null);
    setIsSessionOpen(true);
  };

  const handlePracticeSingle = (mistake: UserMistakeDetail) => {
    setSinglePracticeMistake(mistake);
    setIsSessionOpen(true);
  };

  const handleResolveDirectly = async (mistake: UserMistakeDetail) => {
    try {
      await completeReview([mistake.question_id]);
    } catch (err) {
      console.warn('[ReviewPage] Erro ao resolver erro diretamente:', err);
    }
  };

  const handleSessionComplete = async (resolvedQuestionIds: string[]) => {
    if (resolvedQuestionIds.length > 0) {
      await completeReview(resolvedQuestionIds);
    }
  };

  return (
    <div className="page page-review">
      <div className="review-header">
        <div className="review-header-content">
          <div className="review-title-group">
            <h1 className="page-title review-title">
              🎯 Mon Coffre d'Erreurs
            </h1>
            <p className="page-subtitle review-subtitle">
              Chaque erreur est une opportunité d’apprentissage. Révisez et maîtrisez vos points faibles.
            </p>
          </div>

          {activeTab === 'pending' && mistakes.length > 0 && (
            <div className="review-launch-wrapper">
              <Button
                variant="primary"
                size="lg"
                className="review-launch-btn"
                onClick={handleStartReview}
                icon="🚀"
              >
                Lancer la Révision ({mistakes.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="review-tabs-container" role="tablist" aria-label="Catégories d'erreurs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pending'}
          onClick={() => setActiveTab('pending')}
          className={`review-tab-btn ${activeTab === 'pending' ? 'review-tab-active' : ''}`}
        >
          <span className="review-tab-label">À retravailler</span>
          <Badge variant={pendingCount > 0 ? 'rose' : 'default'} className="review-tab-badge">
            {pendingCount}
          </Badge>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'resolved'}
          onClick={() => setActiveTab('resolved')}
          className={`review-tab-btn ${activeTab === 'resolved' ? 'review-tab-active' : ''}`}
        >
          <span className="review-tab-label">Erreurs maîtrisées</span>
          <Badge variant="emerald" className="review-tab-badge">
            {resolvedCount}
          </Badge>
        </button>
      </div>

      {/* Filters */}
      {availableChapters.length > 1 && (
        <div className="review-filter-bar">
          <label htmlFor="chapter-filter" className="review-filter-label">
            Filtrer par chapitre :
          </label>
          <select
            id="chapter-filter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="review-filter-select"
          >
            <option value="all">Tous les chapitres</option>
            {availableChapters.map((ch) => (
              <option key={ch} value={ch}>
                Chapitre {ch.replace(/^ch0?/, '')}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Content list */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton height="140px" />
          <Skeleton height="140px" />
          <Skeleton height="140px" />
        </div>
      ) : mistakes.length === 0 ? (
        <div className="review-empty-state-wrapper">
          <EmptyState
            icon={activeTab === 'pending' ? '🌟' : '📚'}
            title={
              activeTab === 'pending'
                ? 'Félicitations ! Aucune erreur en attente'
                : 'Aucune erreur maîtrisée pour le moment'
            }
            description={
              activeTab === 'pending'
                ? "Votre carnet d'études est impeccable. Continuez votre progression sur le parcours d'apprentissage pour découvrir de nouvelles leçons !"
                : "Complétez des sessions de révision pour transformer vos erreurs en notions parfaitement maîtrisées."
            }
            actionLabel="Continuer l'Aventure"
            onAction={() => navigate('/chapters')}
          />
        </div>
      ) : (
        <div className="mistakes-list">
          {mistakes.map((mistake) => (
            <MistakeCard
              key={mistake.mistake_id}
              mistake={mistake}
              onPractice={handlePracticeSingle}
              onResolve={handleResolveDirectly}
            />
          ))}
        </div>
      )}

      {/* Interactive review modal */}
      <ReviewSessionModal
        open={isSessionOpen}
        onClose={() => {
          setIsSessionOpen(false);
          setSinglePracticeMistake(null);
        }}
        mistakes={singlePracticeMistake ? [singlePracticeMistake] : mistakes}
        onComplete={handleSessionComplete}
      />
    </div>
  );
};

export default ReviewPage;
