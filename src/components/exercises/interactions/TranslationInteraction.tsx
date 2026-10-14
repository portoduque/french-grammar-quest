import React, { useRef, useEffect } from 'react';
import { AccentToolbar } from '../AccentToolbar';

export interface TranslationInteractionProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const TranslationInteraction: React.FC<TranslationInteractionProps> = ({
  prompt,
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
    <div className="interaction-container translation-interaction" role="group" aria-label="Traduction en français">
      <div className="translation-source-card card card-default">
        <span className="translation-source-badge">Traduire en français :</span>
        <h3 className="translation-source-text">{prompt}</h3>
      </div>

      <div className="translation-input-group">
        <label htmlFor="translation-input" className="translation-input-label">
          Votre traduction :
        </label>
        <input
          id="translation-input"
          ref={inputRef}
          type="text"
          className="translation-input-field input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Écrivez en français..."
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
