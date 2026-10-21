# Plan d'Implémentation: Sécurité du Compte (Modification d'E-mail et Mot de Passe) & Responsivité 316x568

## 1. Contexte & Objectif
Donner la possibilité à l'utilisateur de modifier son adresse e-mail et son mot de passe directement depuis la page `/profile`, en respectant :
- Les plus hauts standards de sécurité (politique de mots de passe stricts, validation par e-mail, protection anti-rejeu, isolation des sessions, compatibilité Supabase Auth & mode démo/mock).
- L'intégrité de l'expérience sur très petits écrans mobiles (viewport exact `316x568` sans débordement horizontal, touch targets >= 44px, modals scrollables et aérées).
- La rigueur pédagogique et éditoriale FLE (messages formatifs, bienveillants et clairs en français).

## 2. Découpage des Modifications
1. **Couche Données & Authentification (`src/stores/authStore.ts` & `src/hooks/useAuth.ts`)**:
   - Ajouter `updateEmail(newEmail: string)`:
     - Validation Zod / regex d'e-mail.
     - Vérification de dissemblance avec l'adresse courante.
     - En production Supabase: appel `supabase.auth.updateUser({ email })` avec gestion de confirmation.
     - En mode démo/mock: mise à jour locale immédiate du profil et du mock user dans localStorage.
   - Ajouter `updatePassword(newPassword: string)`:
     - Règle de complexité stricte (min 8 car., 1 majuscule, 1 minuscule, 1 chiffre, 1 car. spécial).
     - En production Supabase: appel `supabase.auth.updateUser({ password })`.
     - En mode démo/mock: simulation sécurisée avec feedback immédiat.
   - Mettre à jour le hook `useAuth()`.

2. **Composants d'Interface UI (`src/components/profile/`)**:
   - `src/components/profile/ChangeEmailModal.tsx`:
     - Modal dédiée, champ nouvel email et confirmation d'email.
     - Explication claire de la validation par lien e-mail.
     - Gestion des erreurs et états de chargement.
   - `src/components/profile/ChangePasswordModal.tsx`:
     - Modal dédiée, nouveau mot de passe et confirmation.
     - Checklist visuelle interactive des 5 critères de sécurité.
     - Boutons bascule œil (afficher/masquer mot de passe) pour faciliter la saisie sur 316px.
   - Amélioration de `src/components/ui/Input.tsx`:
     - Support d'un élément d'extrémité (`rightElement` ou `endAdornment`) pour le bouton œil.

3. **Intégration dans la Page Profil (`src/pages/ProfilePage.tsx`)**:
   - Section "Compte & Sécurité" enrichie :
     - Affichage de l'e-mail actif avec badge de sécurité.
     - Boutons d'action distincts : "Modifier l'adresse e-mail ✉️", "Changer le mot de passe 🔑", "Se déconnecter 🚪".
     - Feedback visuel de succès / information sécurisée.

4. **Styles CSS & Responsivité 316x568 (`src/index.css`)**:
   - Media queries ciblées pour dialog.modal et .modal-content sur mobile <= 480px et <= 360px.
   - Style de la liste des critères de mot de passe (`.password-criteria-list`, `.criterion-item`).
   - Disposition en colonne empilée des actions de sécurité sur petit écran.
   - Touch targets >= 44x44px.

5. **Tests & Validation**:
   - Tests unitaires dans `authStore.test.ts`.
   - Tests de composants dans `ProfilePage.test.tsx`.
   - Audit visuel et DOM automatisé Playwright sur `316x568` avec capture d'écran.
   - Exécution de `python scripts/verify_fast.py` et `python scripts/verify_ci.py`.
