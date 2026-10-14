import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { LearningPathSnake, ChapterProgress } from '@/components/gamification/LearningPathSnake';

const LearningPathPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'snake' | 'grid'>('snake');

  const chaptersProgress: ChapterProgress[] = CHAPTERS_SUMMARY.map((ch, idx) => ({
    number: ch.number,
    id: ch.id,
    title: ch.title,
    // Chapter 1 is active by default; others locked until unlocked
    status: idx === 0 ? 'active' : 'locked',
    stars: idx === 0 ? 0 : 0,
  }));

  const filteredChapters = CHAPTERS_SUMMARY.filter((ch) =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `chapter ${ch.number}`.includes(searchTerm.toLowerCase()) ||
    ch.id.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page page-learning-path">
      <div className="page-header">
        <div>
          <h1 className="page-title">Trilha de Aprendizado</h1>
          <p className="page-subtitle">
            28 capítulos organizados em 5 Mundos para dominar a gramática francesa
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
              📋 Lista / Grade
            </button>
          </div>

          {viewMode === 'grid' && (
            <Input
              placeholder="Buscar capítulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
              aria-label="Buscar capítulos"
            />
          )}
        </div>
      </div>

      {viewMode === 'snake' ? (
        <LearningPathSnake
          chapters={chaptersProgress}
          onSelectChapter={(id) => navigate(`/chapters/${id}`)}
        />
      ) : (
        <>
          <div className="learning-path-grid">
            {filteredChapters.map((ch) => (
              <Card key={ch.id} variant="interactive" className="chapter-card">
                <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
                  <div className="chapter-card-header">
                    <Badge variant="cyan">
                      {String(ch.number).padStart(2, '0')}
                    </Badge>
                    <Badge variant="default">
                      {ch.exerciseGroups} exercícios
                    </Badge>
                  </div>
                  <h3 className="chapter-title">{ch.title}</h3>
                  <div className="chapter-card-footer">
                    <span className="chapter-topics">{ch.topicsCount} tópicos</span>
                    <span className="chapter-pages">pp. {ch.pageRange}</span>
                  </div>
                  <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar-fill" style={{ width: '0%' }} />
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {filteredChapters.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon" aria-hidden="true">🔍</span>
              <h3 className="empty-state-title">Nenhum capítulo encontrado</h3>
              <p className="empty-state-desc">Tente outro termo de busca</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LearningPathPage;
