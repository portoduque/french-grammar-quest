import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className="input-wrapper">
          {icon && <span className="input-icon" aria-hidden="true">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`input-field ${icon ? 'input-with-icon' : ''} ${rightElement ? 'input-with-right' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightElement && (
            <div className="input-right-element">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <span id={`${inputId}-error`} className="input-error-text" role="alert">
            {error}
          </span>
        )}
        {!error && hint && (
          <span id={`${inputId}-hint`} className="input-hint">
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
