import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

const ChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter = CHAPTERS_SUMMARY.find((ch) => ch.id === chapterId);

  if (!chapter) {
    return (
      <div className="page page-chapter">
        <EmptyState
          icon="❌"
          title="Chapter not found"
          description={`No chapter with ID "${chapterId}" exists.`}
          actionLabel="Back to Learning Path"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="page page-chapter">
      <div className="page-breadcrumb">
        <Link to="/chapters">Learning Path</Link>
        <span aria-hidden="true"> / </span>
        <span>Chapter {String(chapter.number).padStart(2, '0')}</span>
      </div>

      <div className="chapter-overview">
        <div className="chapter-overview-header">
          <Badge variant="cyan" className="chapter-num-badge">
            Chapter {String(chapter.number).padStart(2, '0')}
          </Badge>
          <h1 className="page-title">{chapter.title}</h1>
          <div className="chapter-overview-meta">
            <Badge variant="default">{chapter.topicsCount} topics</Badge>
            <Badge variant="default">{chapter.exerciseGroups} exercise sets</Badge>
            <Badge variant="violet">Pages {chapter.pageRange}</Badge>
          </div>
        </div>

        {/* Theory section placeholder */}
        <section className="chapter-section" aria-label="Theory">
          <h2 className="section-title">Theory</h2>
          <div className="card card-elevated chapter-theory-placeholder">
            <p className="text-muted">
              Theory content will be available after editorial review and authorization.
            </p>
          </div>
        </section>

        {/* Exercises section placeholder */}
        <section className="chapter-section" aria-label="Exercises">
          <h2 className="section-title">Exercises</h2>
          <div className="exercises-list">
            {Array.from({ length: chapter.exerciseGroups }, (_, i) => (
              <div key={i} className="card card-default exercise-item">
                <div className="exercise-item-header">
                  <Badge variant="amber">
                    Exercise {chapter.number}·{i + 1}
                  </Badge>
                  <Badge variant="default">Not started</Badge>
                </div>
                <p className="text-muted">
                  Exercise content will be loaded from the authorized content API.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChapterPage;
