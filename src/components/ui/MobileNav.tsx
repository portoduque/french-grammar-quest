import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MOBILE_NAV_ITEMS = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/chapters', label: 'Learn', icon: '📚' },
  { path: '/review', label: 'Review', icon: '🔄' },
  { path: '/profile', label: 'Profile', icon: '👤' },
] as const;

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {MOBILE_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'mobile-nav-active' : ''}`
          }
          aria-current={location.pathname === item.path ? 'page' : undefined}
        >
          <span className="mobile-nav-icon" aria-hidden="true">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
