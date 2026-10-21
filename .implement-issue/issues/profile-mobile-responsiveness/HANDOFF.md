# Handoff: Profile Mobile Responsiveness, Bugfixes & User Customization

## Summary of Changes
1. **Playwright Mobile Audit on 316x568**:
   - Crawled deployed `/profile` page at `316x568` using Playwright with Edge/Chromium.
   - Diagnosed Top Status Bar overflow (`scrollWidth: 317px > 316px`), email awkward mid-word break (`etudiant@frenchgramm` / `arquest.app`), 1000px-tall 1-column stats stack, 401 unauthenticated errors on achievements RPC in demo mode, and lack of profile editing capabilities.
2. **Profile Customization Feature**:
   - Created `src/components/profile/ProfileEditModal.tsx`:
     - 14 French cultural FLE avatar presets (⚜️ Chevalier, 🎓 Académicien, 🧑‍🎨 Artiste, 🥐 Gourmet, 🗼 Parisien, etc.).
     - Personal photo upload with client-side canvas downsampling (200x200 JPEG data URL, ~20KB) for instant preview with zero cloud storage/billing costs.
     - Display name editing (validated, trimmed, max 35 chars).
     - Daily XP goal selector (20 XP Découverte, 50 XP Régulier, 100 XP Intensif).
     - Persists to Zustand `useAuthStore` (both Supabase profiles and local storage mock profile).
3. **Responsive Mobile Design & WCAG Accessibility**:
   - Fixed the navbar (`TopStatusBar`) and page header (`.page-header` / `.page-title`):
     - Removed hardcoded inline styles (`style={{ fontSize: '1.75rem' }}`) that broke mobile layouts and inflated headers to 141px.
     - Added responsive fluid font scaling: titles scale to `1.15rem` on <= 360px with compact margins.
     - Enforced rock-solid height for `TopStatusBar` (46px on <= 360px) and eliminated horizontal overflow (`scrollWidth === clientWidth === 316`).
     - Wrapped brand icon (⚜️) in clickable Link to `/dashboard`.
     - Hid `.xp-level-pill` on <= 360px to prevent multi-line vertical wrapping inside the XP pill.
   - Centered column mobile layout for the user card on viewports <= 480px: avatar with edit pencil badge, centered name with edit button, seamless email without splitting.
   - 2-column balanced grid for statistics on mobile (`profile-stats-grid`), reducing vertical height by ~500px.
   - Extended touch targets for `.theme-mini-toggle`, `.profile-avatar-badge`, and all action buttons to >= 44x44px.
   - Maintained 153px clearance above fixed bottom navigation bar.
4. **Resilient Data Layer**:
   - Updated `useAchievements.ts` with local evaluation fallback when unauthenticated / in mock mode, unlocking qualifying badges (`first_mission`, `three_day_streak`, `centurion_xp`, `perfect_stars`) without 401 exceptions.
5. **Quality Verification**:
   - Created `src/pages/ProfilePage.test.tsx` (5 unit tests passed).
   - Updated `src/components/ui/UIComponents.test.tsx` (MemoryRouter for Link).
   - Executed local Playwright audit at 316x568: verified 0 overflowing elements, 153px clearance, full edit flow.
   - Executed `python scripts/verify_fast.py` (7 checks passed, 415 tests green).
   - Executed `python scripts/verify_ci.py` (9 checks passed, production build succeeded).
