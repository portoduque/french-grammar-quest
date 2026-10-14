import React, { useEffect, useRef } from 'react';

export interface TipsBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  summary: string;
  conjugations?: Array<{ pronoun: string; verb: string; english: string }>;
  teacherTip?: string;
}

export const TipsBottomSheet: React.FC<TipsBottomSheetProps> = ({
  open,
  onClose,
  title,
  summary,
  conjugations,
  teacherTip,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="tips-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tips-sheet-title"
    >
      <div
        ref={sheetRef}
        className="tips-bottom-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tips-handle-bar" aria-hidden="true" onClick={onClose} />

        <header className="tips-header">
          <div className="tips-badge">
            <span aria-hidden="true">💡</span>
            <span>Dicas Gramaticais (FLE)</span>
          </div>
          <button
            type="button"
            className="tips-close-btn"
            onClick={onClose}
            aria-label="Fechar dicas"
          >
            ✕
          </button>
        </header>

        <h3 id="tips-sheet-title" className="tips-title">
          {title}
        </h3>

        <div className="tips-body">
          <p className="tips-summary">{summary}</p>

          {teacherTip && (
            <div className="tips-teacher-box" role="note">
              <span className="teacher-icon" aria-hidden="true">👨‍🏫</span>
              <div className="teacher-text">
                <strong>Astuce du Prof:</strong> {teacherTip}
              </div>
            </div>
          )}

          {conjugations && conjugations.length > 0 && (
            <div className="tips-conjugation-section">
              <h4 className="tips-section-subtitle">Tabela de Conjugação</h4>
              <div className="tips-conjugation-grid">
                {conjugations.map((item, idx) => (
                  <div key={idx} className="conjugation-row">
                    <span className="conj-pronoun">{item.pronoun}</span>
                    <strong className="conj-verb" lang="fr">{item.verb}</strong>
                    <span className="conj-english">{item.english}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="tips-footer">
          <button
            type="button"
            className="btn btn-primary btn-md tips-done-btn"
            onClick={onClose}
          >
            Compreendi, voltar ao exercício!
          </button>
        </footer>
      </div>
    </div>
  );
};
