import React from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS_SUMMARY } from '@/data/chaptersSummary';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const DashboardPage: React.FC = () => {
  const totalExercises = CHAPTERS_SUMMARY.reduce((sum, ch) => sum + ch.exerciseGroups, 0);

  return (
    <div className="page page-dashboard">
      {/* Welcome Section */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-hero-tag">Welcome Back</span>
          <h1 className="dashboard-hero-title">
            Your French <span className="text-gradient">Grammar Journey</span>
          </h1>
          <p className="dashboard-hero-subtitle">
            Master French grammar through 28 structured chapters with interactive exercises
            and instant feedback.
          </p>
          <Link to="/chapters" className="btn btn-primary btn-lg">
            <span className="btn-label">Continue Learning</span>
          </Link>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="dashboard-stats" aria-label="Learning statistics">
        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">📚</div>
          <div className="stat-value">28</div>
          <div className="stat-label">Chapters</div>
        </Card>
        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">✍️</div>
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Exercise Sets</div>
        </Card>
        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">⭐</div>
          <div className="stat-value">2,227</div>
          <div className="stat-label">Questions</div>
        </Card>
        <Card variant="elevated" className="stat-card">
          <div className="stat-icon" aria-hidden="true">🎯</div>
          <div className="stat-value">0%</div>
          <div className="stat-label">Completed</div>
        </Card>
      </section>

      {/* Recent Chapters */}
      <section className="dashboard-chapters">
        <div className="section-header">
          <h2 className="section-title">Start Learning</h2>
          <Link to="/chapters" className="section-link">
            View all chapters →
          </Link>
        </div>
        <div className="chapters-preview-grid">
          {CHAPTERS_SUMMARY.slice(0, 6).map((ch) => (
            <Card key={ch.id} variant="interactive" className="chapter-card">
              <Link to={`/chapters/${ch.id}`} className="chapter-card-link">
                <Badge variant="cyan" className="chapter-num-badge">
                  Chapter {String(ch.number).padStart(2, '0')}
                </Badge>
                <h3 className="chapter-title">{ch.title}</h3>
                <div className="chapter-meta">
                  <span>{ch.exerciseGroups} exercises</span>
                  <span>{ch.topicsCount} topics</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
