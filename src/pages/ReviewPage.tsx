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
    <div className="page page-review" style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              🎯 Mon Coffre d'Erreurs
            </h1>
            <p className="page-subtitle" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              Chaque erreur est une opportunité d’apprentissage. Révisez et maîtrisez vos points faibles.
            </p>
          </div>

          {activeTab === 'pending' && mistakes.length > 0 && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartReview}
              icon="🚀"
            >
              Lancer la Révision ({mistakes.length})
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            fontWeight: activeTab === 'pending' ? 700 : 500,
            color: activeTab === 'pending' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'pending' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>À retravailler</span>
          {activeTab === 'pending' && (
            <Badge variant="rose">{mistakes.length}</Badge>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('resolved')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            fontWeight: activeTab === 'resolved' ? 700 : 500,
            color: activeTab === 'resolved' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            backgroundColor: activeTab === 'resolved' ? 'rgba(37,99,235,0.08)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Erreurs maîtrisées</span>
          {activeTab === 'resolved' && (
            <Badge variant="emerald">{mistakes.length}</Badge>
          )}
        </button>
      </div>

      {/* Filters */}
      {availableChapters.length > 1 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label htmlFor="chapter-filter" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Filtrer par chapitre :
          </label>
          <select
            id="chapter-filter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)'
            }}
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
        <EmptyState
          icon={activeTab === 'pending' ? '🌟' : '📚'}
          title={
            activeTab === 'pending'
              ? 'Félicitations ! Aucune erreur en attente'
              : 'Aucune erreur maîtrisée pour le moment'
          }
          description={
            activeTab === 'pending'
              ? "Votre carnet d'études est impeccable. Continuez votre progression sur la Trilha pour découvrir de nouvelles leçons !"
              : "Complétez des sessions de révision pour transformer vos erreurs en notions parfaitement maîtrisées."
          }
          actionLabel="Continuer l'Aventure"
          onAction={() => navigate('/chapters')}
        />
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
        isOpen={isSessionOpen}
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
