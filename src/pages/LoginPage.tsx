import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="page page-login">
      <div className="login-container">
        <div className="login-brand">
          <span className="login-brand-icon" aria-hidden="true">⚜️</span>
          <h1 className="login-brand-title">French Grammar Quest</h1>
          <p className="login-brand-subtitle">
            Master French grammar through interactive practice
          </p>
        </div>

        <div className="login-card">
          <h2 className="login-title">Sign In</h2>
          <p className="login-description">
            Access is by invitation only. Authentication will be configured with Supabase Auth in Etapa 2.
          </p>
          <div className="login-placeholder">
            <span className="text-muted">🔒 Magic link authentication coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
