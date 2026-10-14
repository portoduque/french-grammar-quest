import React, { useEffect } from 'react';

export interface MultipleChoiceOption {
  id?: string;
  label?: string;
  text: string;
}

export interface MultipleChoiceInteractionProps {
  prompt: string;
  options: (string | MultipleChoiceOption)[] | null;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const MultipleChoiceInteraction: React.FC<MultipleChoiceInteractionProps> = ({
  prompt,
  options,
  value,
  onChange,
  disabled = false
}) => {
  // Normaliza lista de opções para formato consistente { id, label, text }
  const normalizedOptions: MultipleChoiceOption[] = (options || []).map((opt, index) => {
    if (typeof opt === 'string') {
      return {
        id: `opt-${index}`,
        label: String.fromCharCode(65 + index), // A, B, C, D
        text: opt
      };
    }
    return {
      id: opt.id || `opt-${index}`,
      label: opt.label || String.fromCharCode(65 + index),
      text: opt.text
    };
  });

  // Atalhos de teclado (1, 2, 3, 4 ou A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = e.key.toUpperCase();
      const num = parseInt(e.key, 10);

      if (num >= 1 && num <= normalizedOptions.length) {
        onChange(normalizedOptions[num - 1].text);
      } else {
        const found = normalizedOptions.find(o => o.label?.toUpperCase() === key);
        if (found) {
          onChange(found.text);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [normalizedOptions, disabled, onChange]);

  return (
    <div className="interaction-container multiple-choice-interaction" role="group" aria-label="Choix multiple">
      <div className="multiple-choice-prompt card card-default" lang="fr">
        <h3 className="multiple-choice-prompt-text">{prompt}</h3>
      </div>

      <div className="multiple-choice-options-list" role="radiogroup" aria-label="Options de réponse">
        {normalizedOptions.map((opt, index) => {
          const isSelected = value.trim().toLowerCase() === opt.text.trim().toLowerCase();

          return (
            <button
              key={opt.id || index}
              type="button"
              className={`card mc-option-card ${isSelected ? 'selected active-3d' : ''}`}
              onClick={() => !disabled && onChange(opt.text)}
              disabled={disabled}
              role="radio"
              aria-checked={isSelected}
              lang="fr"
            >
              <span className="mc-option-badge">{opt.label || index + 1}</span>
              <span className="mc-option-text">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
