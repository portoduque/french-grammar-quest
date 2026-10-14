import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '@/hooks/useCatalog';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { LearningPathSnake, ChapterProgress } from '@/components/gamification/LearningPathSnake';
import { NodeStatus } from '@/components/gamification/PathNode';
import { useUserProgress } from '@/hooks/useUserProgress';

export const LearningPathPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'snake' | 'grid'>('snake');

  const { chapters, chaptersByWorld, isLoading } = useCatalog();
  const { data: progressData } = useUserProgress();

  const chaptersProgress: ChapterProgress[] = chapters.map((ch, idx) => {
    const chProgress = progressData?.progressByChapter[ch.id];
    const completedSets = chProgress?.completed ?? 0;
    const stars = chProgress?.stars ?? 0;
    const totalSets = ch.exerciseGroupsCount || 10;

    let status: NodeStatus = 'locked';
    if (ch.number === 28) {
      status = completedSets >= totalSets ? 'completed' : 'boss';
    } else if (completedSets >= totalSets && totalSets > 0) {
      status = 'completed';
    } else if (idx === 0) {
      status = 'active';
    } else {
      const prevChId = chapters[idx - 1]?.id;
      const prevProgress = prevChId ? progressData?.progressByChapter[prevChId] : null;
      if (completedSets > 0 || (chProgress && chProgress.inProgress > 0) || (prevProgress && prevProgress.completed > 0)) {
        status = 'active';
      }
    }

    return {
      number: ch.number,
      id: ch.id,
      title: ch.title,
      status,
      stars: Math.min(3, Math.round(stars / Math.max(1, totalSets))),
    };
  });

  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `chapter ${ch.number}`.includes(searchTerm.toLowerCase()) ||
    ch.id.includes(searchTerm.toLowerCase()) ||
    ch.worldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page page-learning-path">
      <div className="page-header">
        <div>
          <h1 className="page-title">Trilha de Aprendizado</h1>
          <p className="page-subtitle">
            28 capítulos organizados em 5 Mundos para dominar a gramática francesa com rigor pedagógico FLE
          </p>
        </div>

        <div className="path-controls">
          <div className="view-toggle" role="group" aria-label="Modo de visualização">
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'snake' ? 'toggle-active' : ''}`}
              onClick={() => setViewMode('snake')}
              aria-pressed={viewMode === 'snake'}
            >
              🗺️ Trilha Sinuosa
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'grid' ? 'toggle-active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              📋 Lista por Mundos
            </button>
          </div>

          {viewMode === 'grid' && (
            <Input
              placeholder="Buscar capítulos ou mundos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
              aria-label="Buscar capítulos"
            />
          )}
        </div>
      </div>

      {isLoading && (
        <div className="catalog-loading" role="status" aria-label="Carregando catálogo">
          <span className="loader-text">Chargement du catalogue des chapitres...</span>
        </div>
      )}

      {viewMode === 'snake' ? (
        <LearningPathSnake
          chapters={chaptersProgress}
          onSelectChapter={(id) => navigate(`/chapters/${id}`)}
        />
      ) : (
        <div className="worlds-catalog-container">
          {searchTerm ? (
            <div className="learning-path-grid">
              {filteredChapters.map((ch) => (
                <Card key={ch.id} variant="interactive" className="chapter-card">
                  <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
                    <div className="chapter-card-header">
                      <Badge variant="cyan">
                        Chapitre {String(ch.number).padStart(2, '0')}
                      </Badge>
                      <Badge variant="default">
                        {ch.exerciseGroupsCount} séries
                      </Badge>
                    </div>
                    <h3 className="chapter-title">{ch.title}</h3>
                    <div className="chapter-card-footer">
                      <span className="chapter-topics">{ch.topicsCount} sujets</span>
                      <span className="chapter-pages">pp. {ch.pageRange}</span>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            chaptersByWorld.map((world) => (
              <section key={world.worldNumber} className="world-section" aria-labelledby={`world-title-${world.worldNumber}`}>
                <div className="world-banner card card-elevated">
                  <div className="world-banner-badge" aria-hidden="true">{world.badge}</div>
                  <div className="world-banner-info">
                    <h2 id={`world-title-${world.worldNumber}`} className="world-title">{world.worldName}</h2>
                    <p className="world-desc">{world.description}</p>
                    <span className="world-range-badge">
                      Chapitres {world.chaptersRange[0]} à {world.chaptersRange[1]} ({world.chapters.length} chapitres)
                    </span>
                  </div>
                </div>

                <div className="learning-path-grid">
                  {world.chapters.map((ch) => {
                    const isBlocked = ch.editorialStatus === 'blocked';
                    return (
                      <Card
                        key={ch.id}
                        variant="interactive"
                        className="chapter-card"
                        style={isBlocked ? { opacity: 0.8, border: '1px dashed var(--color-danger, #EF4444)' } : undefined}
                      >
                        <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
                          <div className="chapter-card-header">
                            <Badge variant={isBlocked ? 'rose' : 'cyan'}>
                              Chapitre {String(ch.number).padStart(2, '0')}
                            </Badge>
                            {isBlocked ? (
                              <Badge variant="rose">⛔ Suspendu</Badge>
                            ) : (
                              <Badge variant="default">
                                {ch.exerciseGroupsCount} séries
                              </Badge>
                            )}
                          </div>
                          <h3 className="chapter-title">{ch.title}</h3>
                          <div className="chapter-card-footer">
                            <span className="chapter-topics">{ch.topicsCount} sujets</span>
                            <span className="chapter-pages">pp. {ch.pageRange}</span>
                          </div>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))
          )}

          {filteredChapters.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon" aria-hidden="true">🔍</span>
              <h3 className="empty-state-title">Nenhum capítulo encontrado</h3>
              <p className="empty-state-desc">Tente outro termo de busca</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
