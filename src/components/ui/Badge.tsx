import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose';
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  pulse = false,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {pulse && <span className="pulse-dot" aria-hidden="true" />}
      {children}
    </span>
  );
};
