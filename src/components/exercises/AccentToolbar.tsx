import React, { useState } from 'react';

export interface AccentToolbarProps {
  onInsert: (char: string) => void;
  className?: string;
  disabled?: boolean;
}

const LOWERCASE_ACCENTS = [
  'é', 'è', 'ê', 'ë',
  'à', 'â',
  'î', 'ï',
  'ô',
  'ù', 'û',
  'ç',
  'œ', 'æ',
  "'"
];

const UPPERCASE_ACCENTS = [
  'É', 'È', 'Ê', 'Ë',
  'À', 'Â',
  'Î', 'Ï',
  'Ô',
  'Ù', 'Û',
  'Ç',
  'Œ', 'Æ',
  "'"
];

export const AccentToolbar: React.FC<AccentToolbarProps> = ({
  onInsert,
  className = '',
  disabled = false
}) => {
  const [isShift, setIsShift] = useState(false);

  const currentAccents = isShift ? UPPERCASE_ACCENTS : LOWERCASE_ACCENTS;

  const handleCharClick = (char: string, e: React.MouseEvent) => {
    e.preventDefault(); // Evita que o input perca o foco no desktop e mobile
    if (disabled) return;
    onInsert(char);
  };

  const toggleShift = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsShift(!isShift);
  };

  return (
    <div
      className={`accent-toolbar ${className}`}
      role="toolbar"
      aria-label="Clavier des accents français"
    >
      <div className="accent-toolbar-scroll">
        <button
          type="button"
          className={`accent-key accent-key-shift ${isShift ? 'active' : ''}`}
          onClick={toggleShift}
          disabled={disabled}
          title={isShift ? 'Passer en minuscules' : 'Passer en majuscules'}
          aria-label={isShift ? 'Majuscules activées' : 'Activer majuscules'}
        >
          ⇧
        </button>

        {currentAccents.map((char) => (
          <button
            key={char}
            type="button"
            className="accent-key"
            onClick={(e) => handleCharClick(char, e)}
            disabled={disabled}
            aria-label={`Insérer la lettre ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
