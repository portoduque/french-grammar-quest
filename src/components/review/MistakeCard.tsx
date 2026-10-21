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
        marginBottom: '1rem'
      }}
    >
      <div className="mistake-card-header">
        <div className="mistake-card-tags">
          <Badge variant={isPending ? 'rose' : 'emerald'}>
            {isPending ? 'À retravailler' : 'Maîtrisé'}
          </Badge>
          <span className="mistake-card-chapter">
            Chapitre {mistake.chapter_id.replace(/^ch0?/, '')}
          </span>
          {mistake.wrong_count > 1 && (
            <Badge variant="amber">{mistake.wrong_count}x erreurs</Badge>
          )}
        </div>

        <span className="mistake-card-date">
          {new Date(mistake.last_attempted_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
          })}
        </span>
      </div>

      {mistake.instruction && (
        <p className="mistake-card-instruction">
          {mistake.instruction}
        </p>
      )}

      <h3 className="mistake-card-prompt">
        {mistake.prompt}
      </h3>

      <div className="mistake-card-answers-box">
        <div className="mistake-answer-row">
          <span className="mistake-answer-label mistake-label-wrong">
            Votre réponse :
          </span>
          <span
            className="mistake-answer-value"
            style={{ textDecoration: isPending ? 'line-through' : 'none' }}
          >
            {mistake.last_wrong_answer}
          </span>
        </div>

        <div className="mistake-answer-row">
          <span className="mistake-answer-label mistake-label-expected">
            Forme attendue :
          </span>
          <span className="mistake-answer-value mistake-expected-text">
            {acceptedText}
          </span>
        </div>

        {mistake.explanation && (
          <div className="mistake-explanation-box">
            <span className="mistake-explanation-title">
              💡 Conseil didactique du professeur :
            </span>
            <p className="mistake-explanation-text">
              {mistake.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="mistake-card-actions">
        {isPending && onPractice && (
          <Button
            variant="primary"
            size="sm"
            className="mistake-btn-practice"
            onClick={() => onPractice(mistake)}
          >
            S'entraîner 🎯
          </Button>
        )}
        {isPending && onResolve && (
          <Button
            variant="secondary"
            size="sm"
            className="mistake-btn-resolve"
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
