import React, { useRef, useEffect } from 'react';
import { AccentToolbar } from '../AccentToolbar';

export interface SentenceRewriteInteractionProps {
  prompt: string;
  instruction?: string | null;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const SentenceRewriteInteraction: React.FC<SentenceRewriteInteractionProps> = ({
  prompt,
  instruction,
  value,
  onChange,
  onSubmit,
  disabled = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [prompt, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleAccentInsert = (char: string) => {
    if (disabled || !inputRef.current) return;
    const input = inputRef.current;
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const newValue = value.substring(0, start) + char + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  return (
    <div className="interaction-container sentence-rewrite-interaction" role="group" aria-label="Réécriture de phrase">
      <div className="rewrite-source-card card card-default" lang="fr">
        {instruction && (
          <div className="rewrite-instruction-badge">
            🎯 {instruction}
          </div>
        )}
        <span className="rewrite-source-label">Phrase d'origine :</span>
        <h3 className="rewrite-source-text">{prompt}</h3>
      </div>

      <div className="rewrite-input-group">
        <label htmlFor="rewrite-input" className="rewrite-input-label">
          Votre phrase transformée :
        </label>
        <input
          id="rewrite-input"
          ref={inputRef}
          type="text"
          className="rewrite-input-field input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Écrivez la nouvelle phrase ici..."
          autoComplete="off"
          autoCapitalize="sentences"
          spellCheck="false"
          lang="fr"
        />
      </div>

      <div className="interaction-toolbar-wrapper">
        <AccentToolbar onInsert={handleAccentInsert} disabled={disabled} />
      </div>
    </div>
  );
};
