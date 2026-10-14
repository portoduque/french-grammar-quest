import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/ui/Sidebar';
import { MobileNav } from '@/components/ui/MobileNav';
import { TopStatusBar } from '@/components/ui/TopStatusBar';

export const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div className="app-main-wrapper">
        <TopStatusBar />
        <main className="main-content" id="main-content" role="main">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};
