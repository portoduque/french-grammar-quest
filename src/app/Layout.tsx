import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/ui/Sidebar';
import { MobileNav } from '@/components/ui/MobileNav';
import { TopStatusBar } from '@/components/ui/TopStatusBar';
import { isSupabaseConfigured } from '@/lib/supabase';

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
        {!isSupabaseConfigured && (
          <div
            className="demo-mode-banner"
            role="status"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F59E0B',
              padding: '0.45rem 1rem',
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textAlign: 'center'
            }}
          >
            <span>⚠️</span>
            <span>
              <strong>Mode Démo Hors Ligne</strong> : Variables Supabase non configurées. Ajoutez <code>VITE_SUPABASE_ANON_KEY</code> sur Vercel pour la persistance complète en ligne.
            </span>
          </div>
        )}
        <main className="main-content" id="main-content" role="main">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};
