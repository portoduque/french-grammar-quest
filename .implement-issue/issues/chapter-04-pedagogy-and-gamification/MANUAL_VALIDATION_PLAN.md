# Manual Validation Plan — Chapitre 04 : Pédagogie FLE & Gamification

**Issue :** Validation didactique et pédagogique FLE du Chapitre 4 (Aller, Venir, Faire et Périphrases Temporelles), calibrage des moteurs de jeu gamifiés, mise en conformité visuelle et textuelle avec les planches sources (\`temp/capitulo 4/\`), et vérification responsive mobile sans chevauchement.

**Date :** 2026-10-15
**Auditeur :** Antigravity (FLE Specialist & Frontend Architect)
**Status :** In Review

---

## 1. Prérequis et Démarrage Local

1. Démarrer le serveur de développement :
   \`\`\`bash
   npm run dev
   \`\`\`
2. Accéder à l'application dans votre navigateur : \`http://localhost:5173\` (ou URL affichée par Vite).
3. Ouvrir les DevTools (F12) et basculer en mode émulation mobile (iPhone 14 / Pixel 7 / Galaxy S20, largeur 360px - 412px).

---

## 2. Matrice de Validation Didactique & Pédagogique FLE

### Étape 2.1 — Consultation de la Théorie du Chapitre 4 (\`/chapter/ch04\`)
- [ ] **Accès direct** : Naviguer vers \`/chapter/ch04\` (ou via la Trilha en cliquant sur le Chapitre 04).
- [ ] **Onglet 1 : « 📖 Théorie & Règles »** :
  - Vérifier la présence du bloc « 👨‍🏫 Dica do Professor de Francês (FLE) : Regras de Ouro do Capítulo 4 ».
  - Vérifier les 8 sections didactiques détaillées :
    1. Verbe *Aller* au présent et contractions obligatoires de la préposition *à* (*à + le = au*, *à + les = aux*). Alerte lusophone : interdiction de *"en cinéma"*.
    2. Vocabulaire des jours (miniscules en français, habitude avec *le lundi*), mois (préposition *en*) et saisons (*au printemps*, mais *en été, en automne, en hiver*).
    3. Futur Proche (*aller + infinitif*), position de la négation (*ne... pas* entourant *aller*), équivalences orales.
    4. Verbe *Venir* et dérivés (*devenir, prévenir, revenir, survenir*), phonétique [vjɛ̃] vs [vjɛn].
    5. Passé Récent (*venir de/d' + infinitif*), élision obligatoire devant voyelle (*d'annuler, d'avoir, d'achever, d'appeler*).
    6. Verbe *Tenir* et ses 8 nuances sémantiques (*tenir ses promesses*, *tenir compte de*, *tenir un restaurant*, *tenir dans la valise*, *tenir à* vs *tenir de*).
    7. Verbe *Faire* : alerte *vous faites* (et non *faisez*), *ils font*, prononciation [fəzɔ̃], tâches quotidiennes et expressions météo (*il fait beau*, *il pleut*).
    8. Forme Causative (*faire causatif* : *faire + infinitif*) : contraste action directe vs action déléguée.
  - Vérifier le bouton en bas de théorie : **« Passer aux Exercices 🚀 »** qui bascule fluidement sur l'onglet des exercices.
- [ ] **Onglet 3 : « 👨‍🏫 Astuces FLE »** :
  - Vérifier l'affichage des 6 cartes mémo interactives calibrées pour le Chapitre 4 :
    * 🚇 Aller & les Contractions de Lieu : « Au / Aux »
    * ⏩ Le Futur Proche : Aller + Infinitif
    * ⏪ Le Passé Récent & l'Élision Obligatoire « D' »
    * 🤲 Les Multiples Visages de « Tenir »
    * 🍳 Le Verbe Faire : « Vous faites » et [fəzɔ̃]
    * 🏭 La Forme Causative : Faire + Infinitif

---

## 3. Matrice de Calibrage des Moteurs de Jeu (Gamification)

Naviguer sur l'onglet **« 🎯 Exercices (9) »** et tester chaque série :

| Série | Source Planche | Moteur de Jeu Calibré | Intention Pédagogique | Test de Validation |
| :--- | :--- | :--- | :--- | :--- |
| **4.1** | \`4.1.png\` / \`4.2.png\` | \`fill_blank\` (10 Q) | Morphologie verbale d'*aller* au présent + expressions | Compléter *allons, vont, vais, va, allez*. Vérifier le feedback positif. |
| **4.2** | \`4.2.png\` | \`sentence_rewrite\` (10 Q) | Transformation au Futur Proche (*aller + inf.*) | Saisir *Nous allons acheter une nouvelle machine à laver.* Valider avec/sans point final. |
| **4.3** | \`4.3.png\` | \`fill_blank\` (10 Q) | Morphologie de *venir* et ses dérivés (*revenir, prévenir, devenir*) | Compléter *vient, viennent, viens, revenez, prévient, venons, devient*. |
| **4.4** | \`4.3.png\` | \`sentence_rewrite\` (10 Q) | Transformation au Passé Récent avec élisions (*d'*) | Saisir *Il vient d'annuler son vol.* et *Tu viens d'avoir trente ans.* Vérifier que l'apostrophe droite et courbe sont acceptées. |
| **4.5** | \`4.4.png\` | \`translation\` (10 Q) | Traduction EN ➔ FR avec tutoiement et inversion | Saisir *Vas-tu au cinéma dimanche ?* et *Ce chapeau te va bien.* |
| **4.6** | \`4.4.png\` / \`4.5.png\` | \`matching\` (5 Q) | Nuances idiomatiques et équivalences de *tenir* | Associer chaque phrase à sa définition (ex: *Il tient à sa voiture* ➔ *c. Il est attaché à cette chose*). |
| **4.7** | \`4.5.png\` | \`fill_blank\` (10 Q) | Morphologie de *faire*, météo et activités | Compléter *fait, font, fais, faisons, faites*. Alerte sur *vous faites* et *ils font*. |
| **4.8** | \`4.6.png\` | \`sentence_rewrite\` (10 Q) | Transformation à la Forme Causative (*faire + inf.*) | Saisir *Je fais lire le dossier.* et *Vous faites laver la voiture.* |
| **4.9** | \`4.6.png\` / \`4.7.png\` | \`translation\` (10 Q) | Synthèse intégrative avec vouvoiement et *est-ce que* | Saisir *Ils font envoyer la lettre à Paris.* (ou *Elles...*), *Je fais la queue depuis dix minutes.*, *Il pleut.*, *Il fait froid.* |

---

## 4. Matrice d'Ergonomie et UX Mobile (Touch & Responsiveness)

Tester spécifiquement sur écran mobile étroit (360px - 390px) :
- [ ] **Tableaux de conjugaison et vocabulaires** :
  - Le conteneur \`.theory-table-wrapper\` permet un défilement horizontal fluide sans casser la largeur de page.
  - Aucun débordement (*horizontal overflow*) de la vue principale.
- [ ] **Barre d'accentuation (\`AccentToolbar\`)** :
  - Les touches d'accents (*é, è, ê, à, ç, '*) s'enroulent sur 2 rangées propres sans chevauchement.
  - La cible tactile respecte au minimum 34px-38px pour une frappe confortable au doigt.
  - L'insertion d'accent conserve le focus et ne provoque pas de saut d'écran (*scroll jump*).
- [ ] **Cartes d'association (\`MatchingInteraction\`)** :
  - Sur mobile, les cartes de propositions s'affichent en 1 seule colonne pleine largeur (\`grid-template-columns: 1fr\`).
  - L'étiquette de lettre (A, B, C...) et le texte explicatif restent lisibles sans troncature.
- [ ] **Bannières de feedback et boutons d'action** :
  - Sur mobile (\`max-width: 480px\`), les boutons « Continuer » et « Auto-évaluation » s'empilent verticalement avec une hauteur minimale de 48px, garantissant l'accessibilité tactile (WCAG AAA).

---

## 5. Critères d'Acceptation et Décision Finale

- **Automated Validation** :
  - \`python scripts/verify_fast.py\` : ✅ 100% PASS (24 fichiers, 169 tests unitaires, linters, schemas)
  - \`python scripts/verify_ci.py\` : ✅ 100% PASS (build Vite + tests intégration)
- **Human Gate** : L'utilisateur valide visuellement et didactiquement la session d'étude et confirme le passage à l'état \`Done\`.
