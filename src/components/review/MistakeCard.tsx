import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UserMistakeDetail } from '@/types/database';

export interface MistakeCardProps {
  mistake: UserMistakeDetail;
  onPractice?: (mistake: UserMistakeDetail) => void;
  onResolve?: (mistake: UserMistakeDetail) => void;
  isResolving?: boolean;
}

export const MistakeCard: React.FC<MistakeCardProps> = ({
  mistake,
  onPractice,
  onResolve,
  isResolving = false
}) => {
  const isPending = mistake.status === 'pending';
  const acceptedText = mistake.accepted_answers.join(' ou ');

  return (
    <Card
      variant="elevated"
      className={`mistake-card ${!isPending ? 'mistake-card-resolved' : ''}`}
      style={{
        borderLeft: isPending ? '4px solid #EF4444' : '4px solid #10B981',
        marginBottom: '1rem',
        padding: '1.25rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Badge variant={isPending ? 'rose' : 'emerald'}>
            {isPending ? 'À retravailler' : 'Maîtrisé'}
          </Badge>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Chapitre {mistake.chapter_id.replace(/^ch0?/, '')}
          </span>
          {mistake.wrong_count > 1 && (
            <Badge variant="amber">{mistake.wrong_count}x erreurs</Badge>
          )}
        </div>

        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          {new Date(mistake.last_attempted_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
          })}
        </span>
      </div>

      {mistake.instruction && (
        <p
          style={{
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: 'var(--color-text-muted)',
            marginBottom: '0.5rem'
          }}
        >
          {mistake.instruction}
        </p>
      )}

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-text)'
        }}
      >
        {mistake.prompt}
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary, rgba(0, 0, 0, 0.03))',
          padding: '0.875rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#EF4444' }}>
            Votre réponse :
          </span>
          <span
            style={{
              fontSize: '0.95rem',
              textDecoration: isPending ? 'line-through' : 'none',
              color: 'var(--color-text)'
            }}
          >
            {mistake.last_wrong_answer}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10B981' }}>
            Forme attendue :
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#10B981' }}>
            {acceptedText}
          </span>
        </div>

        {mistake.explanation && (
          <div
            style={{
              marginTop: '0.25rem',
              paddingTop: '0.5rem',
              borderTop: '1px dashed var(--color-border)'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                display: 'block',
                marginBottom: '0.25rem'
              }}
            >
              💡 Conseil didactique du professeur :
            </span>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text)',
                margin: 0,
                lineHeight: 1.4
              }}
            >
              {mistake.explanation}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          alignItems: 'center'
        }}
      >
        {isPending && onPractice && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onPractice(mistake)}
          >
            S'entraîner 🎯
          </Button>
        )}
        {isPending && onResolve && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onResolve(mistake)}
            disabled={isResolving}
          >
            Marquer comme assimilé ✓
          </Button>
        )}
      </div>
    </Card>
  );
};
