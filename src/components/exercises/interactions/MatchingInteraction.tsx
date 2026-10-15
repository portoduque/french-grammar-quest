import React from 'react';

export interface MatchingOption {
  [key: string]: string;
  label: string;
  text: string;
}

export interface MatchingInteractionProps {
  prompt: string;
  options: MatchingOption[] | null;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const MatchingInteraction: React.FC<MatchingInteractionProps> = ({
  prompt,
  options,
  value,
  onChange,
  disabled = false
}) => {
  // Lista fallback caso options venha nulo (ex: a-j)
  const defaultOptions: MatchingOption[] = options && options.length > 0 ? options : [
    { label: 'a', text: 'Option A' },
    { label: 'b', text: 'Option B' },
    { label: 'c', text: 'Option C' },
    { label: 'd', text: 'Option D' }
  ];

  return (
    <div className="interaction-container matching-interaction" role="group" aria-label="Associer les éléments">
      <div className="matching-prompt-box card card-default" lang="fr">
        <span className="matching-prompt-tag">Expression de départ :</span>
        <h3 className="matching-prompt-text">{prompt}</h3>
      </div>

      <p className="matching-instruction-hint">
        👉 Touchez la proposition qui complète ou correspond le mieux :
      </p>

      <div className="matching-options-grid" role="radiogroup" aria-label="Propositions de correspondance">
        {defaultOptions.map((opt) => {
          const isSelected = value.toLowerCase() === opt.label.toLowerCase();

          return (
            <button
              key={opt.label}
              type="button"
              className={`card matching-option-card ${isSelected ? 'selected active-3d' : ''}`}
              onClick={() => !disabled && onChange(opt.label)}
              disabled={disabled}
              role="radio"
              aria-checked={isSelected}
              lang="fr"
            >
              <span className="matching-option-label">{opt.label.toUpperCase()}</span>
              <span className="matching-option-text">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
