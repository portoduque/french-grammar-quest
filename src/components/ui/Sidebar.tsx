import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeProvider';

import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/chapters', label: 'Learning Path', icon: '📚' },
  { path: '/review', label: 'Review', icon: '🔄' },
  { path: '/references', label: 'Références FLE', icon: '📖' },
  { path: '/profile', label: 'Profile', icon: '👤' },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const allItems = isAdmin
    ? [...NAV_ITEMS, { path: '/admin', label: 'Admin', icon: '🛠️' }]
    : NAV_ITEMS;

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}
      aria-label="Main navigation"
    >
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="sidebar-brand" aria-label="French Grammar Quest — Dashboard">
          <span className="sidebar-brand-icon" aria-hidden="true">⚜️</span>
          {!collapsed && <span className="sidebar-brand-text">French Grammar Quest</span>}
        </NavLink>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list" role="list">
          {allItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? 'sidebar-nav-active' : ''}`
                }
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="sidebar-nav-icon" aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          type="button"
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </aside>
  );
};
