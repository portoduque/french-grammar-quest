import React, { useRef, useEffect } from 'react';
import { AccentToolbar } from '../AccentToolbar';

export interface FillBlankInteractionProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const FillBlankInteraction: React.FC<FillBlankInteractionProps> = ({
  prompt,
  value,
  onChange,
  onSubmit,
  disabled = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Foco automático no campo de preenchimento
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [prompt, disabled]);

  // Divide o prompt na lacuna: procura por sequências de underline '____+'
  const parts = prompt.split(/_{3,}/);
  const beforeBlank = parts[0] || '';
  const afterBlank = parts.length > 1 ? parts.slice(1).join('___') : '';

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

    // Reposiciona o cursor após o caractere inserido
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  return (
    <div className="interaction-container fill-blank-interaction" role="group" aria-label="Compléter la phrase">
      <div className="prompt-sentence-card card card-default" lang="fr">
        <span className="prompt-before">{beforeBlank}</span>

        <span className="blank-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="blank-inline-input input-field"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="..."
            aria-label="Mot à compléter"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
          />
        </span>

        {afterBlank && <span className="prompt-after">{afterBlank}</span>}
      </div>

      {/* Barra de acentos franceses logo abaixo da frase */}
      <div className="interaction-toolbar-wrapper">
        <AccentToolbar onInsert={handleAccentInsert} disabled={disabled} />
      </div>
    </div>
  );
};
