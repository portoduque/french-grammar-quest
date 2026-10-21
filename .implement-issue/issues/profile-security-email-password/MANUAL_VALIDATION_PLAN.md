# Manual Validation Plan: Profile Security (Email & Password Updates) & Review Mobile Responsiveness

## 1. Test Environment
- **Device Viewports**:
  - `316 x 568` (Narrowest target mobile viewport)
  - `360 x 740` (Standard Android device)
  - `375 x 667` (iPhone SE)
  - `390 x 844` (iPhone 12/13/14)
  - `1024 x 768` (Tablet / Desktop)
- **Routes Tested**:
  - `/profile`
  - `/review`

---

## 2. Validation Scenarios

### Scenario A: Review Route (`/review`) on 316x568
1. Set responsive viewport to `316 x 568`.
2. Navigate to `/review`.
3. Verify:
   - Header title "Mon Coffre d'Erreurs" wraps elegantly without overlapping or exceeding horizontal boundaries.
   - Tabs "À retravailler" and "Erreurs maîtrisées" display with clear badges.
   - Mistake cards display tags ("Chapitre X", exercise type, and date) cleanly without word break distortion.
   - Touch targets for "S'entraîner" and "Marquer comme maîtrisé" are >= 44x44px.
   - Launching a review session opens the modal within `94vh` bounds, keeps the header and action buttons visible, and provides the French `AccentToolbar` in a smooth horizontal-scrolling row.

### Scenario B: Profile Security — Email Update (`/profile`)
1. Navigate to `/profile`.
2. In the "Compte & Sécurité" section, click "Modifier l'adresse e-mail".
3. Verify:
   - `ChangeEmailModal` opens with backdrop blur and accessible focus trap.
   - Inputting an invalid email displays clear pedagogical French validation error.
   - Inputting identical email warns the learner.
   - Inputting a valid new email triggers the update:
     - In mock/demo mode: updates local profile and notifies "Un e-mail de confirmation a été envoyé à...".
     - In Supabase Auth: calls `supabase.auth.updateUser({ email })`.

### Scenario C: Profile Security — Password Update (`/profile`)
1. Click "Changer le mot de passe".
2. Verify:
   - `ChangePasswordModal` opens with visual security criteria checklist:
     - Au moins 8 caractères
     - Une majuscule (A-Z)
     - Une minuscule (a-z)
     - Un chiffre (0-9)
     - Un caractère spécial (!@#$%^&*...)
   - Criteria checklist dynamically highlights in green with checkmarks `✓` as requirements are met.
   - Toggle eye button displays / hides passwords cleanly with >= 44px touch target.
   - Confirmation password mismatch triggers real-time warning.
   - Valid submission updates password and provides positive confirmation toast.

### Scenario D: Mobile Zero-Overflow & Touch Target Compliance
1. Scroll down the full length of `/profile` and `/review` on `316 x 568`.
2. Verify:
   - `document.documentElement.scrollWidth === 316` (no horizontal scrollbar).
   - Bottom navigation bar does not cover or block any interactive buttons.
   - All buttons, inputs, and toggles meet or exceed `44 x 44px` minimum touch target size.
