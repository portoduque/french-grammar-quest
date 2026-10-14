import React from 'react';

export interface AccentToolbarProps {
  onInsert: (char: string) => void;
  className?: string;
  accents?: string[];
}

const DEFAULT_ACCENTS = [
  'é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ù', 'ë', 'ï', 'œ', "j'", "d'", "l'", "qu'"
];

export const AccentToolbar: React.FC<AccentToolbarProps> = ({
  onInsert,
  className = '',
  accents = DEFAULT_ACCENTS,
}) => {
  return (
    <div
      className={`accent-toolbar ${className}`}
      role="toolbar"
      aria-label="Caracteres acentuados franceses"
    >
      <div className="accent-toolbar-scroll">
        {accents.map((char) => (
          <button
            key={char}
            type="button"
            className="accent-pill"
            onClick={(e) => {
              e.preventDefault();
              onInsert(char);
            }}
            aria-label={`Inserir ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
