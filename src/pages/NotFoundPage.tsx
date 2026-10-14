import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="page page-not-found">
      <div className="not-found-content">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          <span className="btn-label">Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
