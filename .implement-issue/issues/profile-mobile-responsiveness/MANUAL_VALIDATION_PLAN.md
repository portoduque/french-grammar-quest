# Manual Validation Plan: Profile Mobile Responsiveness & Customization

## 1. Test Environment
- **Device Viewports**:
  - `316 x 568` (Narrowest target viewport from screenshot)
  - `360 x 640` (Standard Android small)
  - `375 x 667` (iPhone SE)
  - `390 x 844` (iPhone 12/13/14)
  - `1024 x 768` (Desktop / Tablet)
- **Routes**: `/profile`, `/login`, `/dashboard`

## 2. Step-by-Step Validation Scenarios

### Scenario A: Top Status Bar & Layout Integrity on 316x568
1. Open the browser dev tools in responsive mode set to `316 x 568`.
2. Navigate to `/profile`.
3. Verify:
   - No horizontal scrollbar appears anywhere on the page (`document.documentElement.scrollWidth === 316`).
   - The Top Status Bar shows Fleur ⚜️, Hearts ❤️, Streak 🔥, XP ⭐, and Theme Moon 🌙 on a single row without breaking or overlapping.
   - Tap the theme toggle 🌙: theme smoothly transitions between dark and light modes.

### Scenario B: Profile User Card & Customization (Avatar & Name)
1. In the User Card, verify the avatar renders the chosen French badge / photo with the pencil badge `✏️`.
2. Verify the email `etudiant@frenchgrammarquest.app` is displayed neatly on one line without mid-word breaks.
3. Click "Modifier" (or click the avatar):
   - The modal "Modifier mon Profil" opens with focus management and backdrop blur.
   - In "Insignes FLE", select a French preset (e.g. 🥐 Gourmet, 🎓 Académicien, 🗼 Parisien).
   - In "Photo Personnelle", pick a photo from device to verify canvas resize and instant circular preview.
   - Change the display name (e.g. "Alexandre Dumas").
   - Change the daily XP goal (e.g. 100 XP Intensif).
   - Click "Enregistrer les modifications".
4. Verify:
   - Modal closes cleanly.
   - Green feedback toast appears: "✨ Profil et préférences mis à jour avec succès !".
   - The User Card immediately updates with the new avatar, name, and preferences.

### Scenario C: Statistics & Gamification Showcase
1. Inspect the Statistics section on mobile:
   - 2-column balanced grid displays XP Total, Streak, Completed Sets, and Star Mastery.
   - Précision Moyenne spans across the bottom row.
2. In "Vitrine des Conquêtes & Badges":
   - Badges corresponding to XP >= 100, streak >= 3, and first mission are marked as ✨ Débloquée.
   - Click "Actualiser mes Badges": button indicates evaluation and displays feedback toast without 401 exceptions.

### Scenario D: Bottom Navigation Clearance & Accessibility
1. Scroll down to the bottom of the page.
2. Verify:
   - "Se déconnecter" button is entirely above the mobile navigation bar with at least 80px clearance.
   - All clickable buttons and toggles have at least 44x44px touch targets.
