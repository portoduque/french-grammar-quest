import React from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page page-review">
      <div className="page-header">
        <h1 className="page-title">Review</h1>
        <p className="page-subtitle">Practice your mistakes and strengthen weak areas</p>
      </div>

      <EmptyState
        icon="🎯"
        title="No mistakes to review yet"
        description="Complete some exercises first, then your mistakes will appear here for targeted review."
        actionLabel="Start Learning"
        onAction={() => navigate('/chapters')}
      />
    </div>
  );
};

export default ReviewPage;
