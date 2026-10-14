import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { AuthGuard, AdminGuard } from '@/components/auth/AuthGuard';

/* Lazy-loaded pages for code splitting */
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const LearningPathPage = lazy(() => import('@/pages/LearningPathPage'));
const ChapterPage = lazy(() => import('@/pages/ChapterPage'));
const ReviewPage = lazy(() => import('@/pages/ReviewPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ExercisePage = lazy(() => import('@/pages/ExercisePage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const ReferencesPage = lazy(() => import('@/pages/ReferencesPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PageLoader: React.FC = () => (
  <div className="page-loader" role="status" aria-label="Loading page">
    <div className="loader-spinner" />
    <span className="loader-text">Loading...</span>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Sessão de Exercício Imersiva em Tela Cheia (protegida por AuthGuard) */}
          <Route
            path="/exercise/:exerciseId"
            element={
              <AuthGuard>
                <ExercisePage />
              </AuthGuard>
            }
          />

          <Route
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chapters" element={<LearningPathPage />} />
            <Route path="/chapters/:chapterId" element={<ChapterPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminPage />
                </AdminGuard>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
