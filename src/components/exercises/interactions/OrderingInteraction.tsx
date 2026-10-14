import React, { useState, useEffect } from 'react';

export interface OrderingInteractionProps {
  prompt: string;
  tokens?: string[] | null;
  canonicalAnswer?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface TokenItem {
  id: string;
  text: string;
}

export const OrderingInteraction: React.FC<OrderingInteractionProps> = ({
  prompt,
  tokens,
  canonicalAnswer,
  value: _value,
  onChange,
  disabled = false
}) => {
  const [availableTokens, setAvailableTokens] = useState<TokenItem[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<TokenItem[]>([]);

  // Inicializa o banco de tokens
  useEffect(() => {
    let rawTokens: string[] = [];

    if (tokens && tokens.length > 0) {
      rawTokens = [...tokens];
    } else if (canonicalAnswer) {
      // Divide a resposta canônica em palavras limpando pontuação
      rawTokens = canonicalAnswer
        .replace(/[.!?]+$/, '')
        .split(/\s+/)
        .filter(Boolean);
    } else {
      rawTokens = prompt.split(/\s+/).filter(Boolean);
    }

    // Embaralha para apresentar o desafio de ordenação
    const shuffled = rawTokens
      .map((t, idx) => ({ id: `token-${idx}-${t}`, text: t }))
      .sort(() => Math.random() - 0.5);

    setAvailableTokens(shuffled);
    setSelectedTokens([]);
    onChange('');
  }, [prompt, tokens, canonicalAnswer]);

  const handleSelectToken = (token: TokenItem) => {
    if (disabled) return;
    const newAvailable = availableTokens.filter(t => t.id !== token.id);
    const newSelected = [...selectedTokens, token];

    setAvailableTokens(newAvailable);
    setSelectedTokens(newSelected);
    onChange(newSelected.map(t => t.text).join(' '));
  };

  const handleDeselectToken = (token: TokenItem) => {
    if (disabled) return;
    const newSelected = selectedTokens.filter(t => t.id !== token.id);
    const newAvailable = [...availableTokens, token];

    setSelectedTokens(newSelected);
    setAvailableTokens(newAvailable);
    onChange(newSelected.map(t => t.text).join(' '));
  };

  const handleReset = () => {
    if (disabled) return;
    setAvailableTokens([...availableTokens, ...selectedTokens]);
    setSelectedTokens([]);
    onChange('');
  };

  return (
    <div className="interaction-container ordering-interaction" role="group" aria-label="Remettre les mots dans l'ordre">
      <div className="ordering-prompt card card-default" lang="fr">
        <span className="ordering-prompt-instruction">Consigne :</span>
        <p className="ordering-prompt-text">{prompt}</p>
      </div>

      {/* Área da frase montada pelo usuário */}
      <div
        className="ordering-sentence-slot card"
        role="region"
        aria-label="Phrase en cours de construction"
        lang="fr"
      >
        {selectedTokens.length === 0 ? (
          <span className="ordering-slot-placeholder">
            Touchez les mots ci-dessous pour composer la phrase...
          </span>
        ) : (
          <div className="ordering-tokens-row">
            {selectedTokens.map((token) => (
              <button
                key={token.id}
                type="button"
                className="word-token token-selected"
                onClick={() => handleDeselectToken(token)}
                disabled={disabled}
                aria-label={`Retirer le mot ${token.text}`}
              >
                {token.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Banco de palavras disponíveis */}
      <div className="word-bank-container" role="group" aria-label="Mots disponibles">
        <div className="word-bank-tokens">
          {availableTokens.map((token) => (
            <button
              key={token.id}
              type="button"
              className="word-token token-available"
              onClick={() => handleSelectToken(token)}
              disabled={disabled}
              aria-label={`Ajouter le mot ${token.text}`}
              lang="fr"
            >
              {token.text}
            </button>
          ))}
        </div>

        {selectedTokens.length > 0 && !disabled && (
          <button
            type="button"
            className="ordering-reset-btn"
            onClick={handleReset}
            title="Réinitialiser tous les mots"
          >
            🔄 Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
};
