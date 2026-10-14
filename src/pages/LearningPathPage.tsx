import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const LearningPathPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = CHAPTERS_SUMMARY.filter((ch) =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `chapter ${ch.number}`.includes(searchTerm.toLowerCase()) ||
    ch.id.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page page-learning-path">
      <div className="page-header">
        <div>
          <h1 className="page-title">Learning Path</h1>
          <p className="page-subtitle">
            28 chapters covering French grammar from basics to advanced topics
          </p>
        </div>
        <Input
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon="🔍"
          aria-label="Search chapters"
        />
      </div>

      <div className="learning-path-grid">
        {filteredChapters.map((ch) => (
          <Card key={ch.id} variant="interactive" className="chapter-card">
            <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
              <div className="chapter-card-header">
                <Badge variant="cyan">
                  {String(ch.number).padStart(2, '0')}
                </Badge>
                <Badge variant="default">
                  {ch.exerciseGroups} exercises
                </Badge>
              </div>
              <h3 className="chapter-title">{ch.title}</h3>
              <div className="chapter-card-footer">
                <span className="chapter-topics">{ch.topicsCount} topics</span>
                <span className="chapter-pages">pp. {ch.pageRange}</span>
              </div>
              {/* Progress bar placeholder */}
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
          <h3 className="empty-state-title">No chapters found</h3>
          <p className="empty-state-desc">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
