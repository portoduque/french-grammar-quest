import React, { useState } from 'react';
import { CHAPTERS_SUMMARY, type ChapterSummary } from './data/chaptersSummary';
import { isSupabaseConfigured } from './lib/supabase';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<ChapterSummary | null>(null);

  const filteredChapters = CHAPTERS_SUMMARY.filter((ch) =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `chapitre ${ch.number}`.includes(searchTerm.toLowerCase()) ||
    `chapter ${ch.number}`.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-icon">⚜️</span>
          <span className="brand-title">French Grammar Quest</span>
        </a>
        <div className="nav-badges">
          <span className="badge badge-emerald">
            <span className="pulse-dot"></span>
            A1 – C2 Adaptive Engine
          </span>
          <span className="badge badge-violet">
            {isSupabaseConfigured ? '🟢 Supabase Cloud Connected' : '⚡ Local Offline Ready'}
          </span>
          <span className="badge badge-cyan">
            28 Chapitres
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-tag">Plateforme Pédagogique Gamifiée</div>
        <h1 className="hero-title">
          Maîtrisez la Grammaire Française <br />
          <span className="hero-title-highlight">Par la Pratique Répétée</span>
        </h1>
        <p className="hero-subtitle">
          Un curriculum complet de 28 chapitres et 2 227 exercices progressifs basés sur la méthode
          <i> Practice Makes Perfect</i>, avec répétition espacée (SRS) et rétroaction immédiate.
        </p>
      </section>

      {/* Metrics Grid */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">28</div>
          <div className="stat-label">Chapitres Structurés</div>
          <div className="stat-desc">Du présent de l'indicatif au subjonctif avancé</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✍️</div>
          <div className="stat-value">2 227</div>
          <div className="stat-label">Exercices & Questions</div>
          <div className="stat-desc">Corpus vérifié avec gabarits officiels</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧠</div>
          <div className="stat-value">SRS</div>
          <div className="stat-label">Répétition Espacée</div>
          <div className="stat-desc">Algorithme adaptatif optimisé pour la rétention</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔒</div>
          <div className="stat-value">100%</div>
          <div className="stat-label">Offline-First & Sécurisé</div>
          <div className="stat-desc">Fonctionne sans réseau avec sync Supabase</div>
        </div>
      </section>

      {/* Chapters Exploration */}
      <section className="chapters-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curriculum des 28 Chapitres</h2>
            <p className="section-subtitle">Sélectionnez un chapitre pour explorer sa structure et ses exercices</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Rechercher un chapitre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: '9999px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                minWidth: '240px'
              }}
            />
          </div>
        </div>

        <div className="chapters-grid">
          {filteredChapters.map((ch) => (
            <div
              key={ch.id}
              className="chapter-card"
              onClick={() => setSelectedChapter(ch)}
            >
              <div>
                <div className="chapter-num">Chapitre {String(ch.number).padStart(2, '0')}</div>
                <h3 className="chapter-title">{ch.title}</h3>
              </div>
              <div className="chapter-meta">
                <span>{ch.exerciseGroups} séries d'exercices</span>
                <span className="chapter-badge">Pages {ch.pageRange}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Chapter Modal / Detail */}
      {selectedChapter && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setSelectedChapter(null)}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-highlight)',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: 'var(--shadow-glow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 800, fontSize: '0.875rem', marginBottom: '8px' }}>
              CHAPITRE {String(selectedChapter.number).padStart(2, '0')}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {selectedChapter.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Ce chapitre couvre <strong>{selectedChapter.topicsCount} sous-thèmes fondamentaux</strong> et comprend{' '}
              <strong>{selectedChapter.exerciseGroups} groupes d'exercices pratiques</strong> calibrés pour la progression autonome.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedChapter(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'var(--accent-violet)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Status Footer */}
      <footer className="system-status-bar">
        <div className="status-group">
          <span className="status-label">Infraestrutura:</span>
          <span className="status-val">Supabase (São Paulo, sa-east-1) & Vercel Edge</span>
        </div>
        <div className="status-group">
          <span className="status-label">Segurança:</span>
          <span className="status-val">RLS Ativo • SonarQube Nota A • Semgrep CE</span>
        </div>
        <div className="status-group">
          <span className="status-label">Modo:</span>
          <span className="status-val">Offline-First LocalStorage</span>
        </div>
      </footer>
    </div>
  );
};
