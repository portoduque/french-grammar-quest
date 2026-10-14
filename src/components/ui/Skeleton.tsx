import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  className = '',
}) => {
  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
