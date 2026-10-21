# Manual Validation Plan: Removal of /references Route and Navigation Optimization

## 1. Test Environment
- **Device Viewports**:
  - `316 x 568` (Narrowest target mobile viewport)
  - `375 x 667` (iPhone SE)
  - `390 x 844` (iPhone 12/13/14)
  - `1024 x 768` (Desktop Sidebar)
- **Routes Tested**:
  - `/references` (Direct URL check — should hit 404 / NotFoundPage)
  - `/dashboard`
  - `/chapters`
  - `/review`
  - `/profile`

---

## 2. Validation Scenarios

### Scenario A: Desktop Navigation (Sidebar)
1. Open application in a desktop viewport (`>= 1024px`).
2. Observe the Sidebar menu items.
3. **Verify**:
   - The navigation items are now: **Dashboard** (`/dashboard`), **Learning Path** (`/chapters`), **Review** (`/review`), and **Profile** (`/profile`) (plus **Admin** if user is administrator).
   - "Références FLE" (`/references`) is no longer present.
   - Spacing between navigation items is balanced and visually coherent.

### Scenario B: Mobile Navigation (MobileNav)
1. Open application in a mobile viewport (`375 x 667` or `390 x 844`).
2. Observe the bottom navigation bar (`.mobile-nav`).
3. **Verify**:
   - The 4 core items are present and evenly distributed: **Home**, **Learn**, **Review**, **Profile**.
   - "Réf." (`/references`) is absent, eliminating crowding and maximizing touch targets (>= 44x44px per item).
   - Tap on each tab and verify active states work smoothly without glitches.

### Scenario C: Direct Access to `/references` (404 Fallback)
1. Manually type `https://french-grammar-quest.vercel.app/references` (or `http://localhost:5173/references`) in browser address bar.
2. **Verify**:
   - The app gracefully renders the `NotFoundPage` (404).
   - There are no uncaught runtime exceptions or broken layouts.
   - The "Retour à l'accueil" (or Dashboard) button navigates back cleanly.

### Scenario D: Automated Test Integrity
1. Run `python scripts/verify_fast.py`.
2. **Verify**:
   - All 24 test suites and 419 unit/integration/E2E tests pass.
   - No dead imports or broken routes remain in the bundle.
