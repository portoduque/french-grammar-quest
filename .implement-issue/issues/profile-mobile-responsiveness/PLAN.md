# Implementation Plan: Profile Mobile Responsiveness, Bugfixes & User Customization

## 1. Problem Statement & Scope
- **Route**: `https://french-grammar-quest.vercel.app/profile` (/profile).
- **Target Dimensions**: Narrow viewport `316 x 568` (and small mobile phones 320px–375px).
- **Observed Issues**:
  1. Top Status Bar overflowed on 316px (`scrollWidth: 317px > 316px`) causing horizontal scroll; elements wrapped or stretched vertically.
  2. User card email broke awkwardly across lines (`etudiant@frenchgramm` / `arquest.app`).
  3. Statistics cards collapsed into 5 tall stacked cards taking over 1000px of vertical scrolling space.
  4. Achievements query threw 401 permission denied warnings when in demo/local mode and failed to award badges locally.
  5. Profile lacked user customization (no display name editing, no avatar upload or French cultural badges, no daily goal adjustment).
  6. Insufficient clearance above fixed bottom navigation bar; interactive elements had touch targets < 44px (WCAG 2.5.5).

## 2. Architecture & Components
1. **User Customization (`src/components/profile/ProfileEditModal.tsx`)**:
   - `ProfileEditModal`: Responsive modal with:
     - Display name editing (validated, trimmed, max 35 chars).
     - Curated French FLE cultural badges (⚜️ Chevalier, 🎓 Académicien, 🧑‍🎨 Artiste, 🥐 Gourmet, 🗼 Parisien, 👑 Monarque, etc.).
     - Personal photo upload with client-side canvas downsampling (200x200 JPEG data URL, ~20 KB) for instant preview and zero storage overhead.
     - Daily XP goal selector (20 XP Découverte, 50 XP Régulier, 100 XP Intensif).
2. **Page & Design System (`src/pages/ProfilePage.tsx`, `src/index.css`)**:
   - Centered column card layout on mobile (`@media (max-width: 480px)`): avatar at top with edit badge, centered name with edit button, seamless email on a single line, centered badges.
   - 2-column balanced statistics grid on mobile (`profile-stats-grid`), reducing vertical height by 500px.
   - Generous bottom clearance `calc(var(--mobile-nav-height) + env(safe-area-inset-bottom) + var(--space-8))`.
   - Top status bar optimized for <= 360px: compact padding, 0 overflow, 44x44px touch target on theme toggle.
3. **Resilient Data Layer (`src/hooks/useAchievements.ts`)**:
   - Graceful fallback in mock/unauthenticated mode: evaluates achievements against user profile/stats (`first_mission`, `three_day_streak`, `centurion_xp`, `perfect_stars`).
   - Prevents 401 RPC exceptions when refreshing badges.
4. **Testing Suite (`src/pages/ProfilePage.test.tsx`)**:
   - 5 comprehensive tests covering rendering, modal interactions, display name and avatar updates, badges refresh, and theme toggle.

## 3. Execution & Verification Steps
1. Playwright mobile audit at 316x568 on deployed site to diagnose layout bugs and errors.
2. Implement `ProfileEditModal.tsx` with French avatar presets, photo upload, and daily goal adjustment.
3. Update `ProfilePage.tsx` and `src/index.css` for responsive mobile layout and touch targets.
4. Update `useAchievements.ts` with local fallback for demo/unauthenticated mode.
5. Create unit tests in `src/pages/ProfilePage.test.tsx`.
6. Run local Playwright verification at 316x568 capturing screenshots and verifying 0 overflows and 153px clearance.
7. Verify all CI checks with `python scripts/verify_fast.py` and `python scripts/verify_ci.py`.
