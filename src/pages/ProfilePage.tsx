import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';

const ProfilePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page page-profile">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your learning progress and settings</p>
      </div>

      <div className="profile-grid">
        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Preferences</h2>
          <div className="profile-setting">
            <span>Theme</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? '☀️' : '🌙'}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </Card>

        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Statistics</h2>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value">0</span>
              <span className="profile-stat-label">XP Total</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">0</span>
              <span className="profile-stat-label">Exercises Done</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">0</span>
              <span className="profile-stat-label">Streak Days</span>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="profile-card">
          <h2 className="section-title">Account</h2>
          <p className="text-muted">
            Authentication will be configured in Etapa 2 with Supabase Auth.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
