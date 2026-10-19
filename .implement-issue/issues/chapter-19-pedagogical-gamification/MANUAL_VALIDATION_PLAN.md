# Manual Validation Plan: Chapter 19 Pedagogical Roadmap & Gamification

**Issue Key**: `chapter-19-pedagogical-gamification`
**Status**: Ready for Human Review (`In Review`)
**Target Route**: `/chapters/ch19`
**Exercise Routes**:
- `/exercises/ch19-ex01` (Exercice 19.1 — Formation de l'impératif)
- `/exercises/ch19-ex02` (Exercice 19.2 — Verbes pronominaux à l'impératif)
- `/exercises/ch19-ex03` (Exercice 19.3 — Traduction thématique et impératif)

---

## 1. Objective

Validate that Chapter 19 strictly adheres to the pedagogical roadmap and source book content (`temp/capitulo 19/19.1.png`, `19.2.png`, `19.3.png`, `19.4.png`, and `gabarito.png`):
1. **Theory-First Pedagogy**: The learner reads and assimilates rich, didactic, error-free FLE theory before attempting exercises.
2. **Pedagogical Rigor (FLE + Lusophone Educator)**:
   - Derivation of the imperative: derived from the present indicative for `tu`, `nous`, and `vous`.
   - The Golden Rule of `-er` verbs: drop the `-s` of the `tu` form (*Parle !*, *Achète !*, *Ouvre !*, *Va !*), contrasted with the preservation of `-s` in `-ir` and `-re` verbs (*Choisis !*, *Prends !*, *Bois !*).
   - Vowel alternation and mute endings: *Acheter* -> *Achète !* (accent grave è), *Épeler* -> *Épelle !* (consonne doublée ll).
   - The 4 irregular imperatives from the subjunctive: *être* (`sois, soyons, soyez`), *avoir* (`aie, ayons, ayez`), *savoir* (`sache, sachons, sachez`) and *vouloir* (`veuillez`).
   - Pronominal verbs dance:
     - Affirmative: verb + hyphen + tonic pronoun (`moi`, `toi`), e.g., *Lave-toi les mains !*, *Dépêche-toi !*.
     - Negative: `ne` + weak pronoun + verb + `pas`, e.g., *Ne te couche pas trop tard !*, *Ne vous trompez pas !*.
   - Euphonic `-s`: return of `-s` before `y` and `en` (*Vas-y !*, *Manges-en !*).
   - Official administrative and civil status vocabulary: *l'état civil, un nom, un prénom, un surnom, carte d'identité, passeport, permis de conduire, extrait de naissance, signer, cocher*.
3. **Gamification Engine Calibration**:
   - `ch19-ex01`: Sentence transformation (`sentence_rewrite`) with prompt isolating subject `(tu)`, `(vous)`, `(nous)` and AccentToolbar.
   - `ch19-ex02`: Pronominal imperative transformation (`sentence_rewrite`) testing affirmative hyphen and negative pronoun fronting.
   - `ch19-ex03`: Thematic translation (`translation`) with support for typographical/ASCII apostrophes and punctuation variations.
4. **Mobile Responsiveness**: Complete touch-friendly experience on 320px–430px viewports with zero horizontal clipping, zero element overlap with the fixed bottom action drawer, and clean table scrolling.

---

## 2. Prerequisites & Setup

1. Start local dev server:
   ```bash
   npm run dev
   ```
2. Open Chrome/Firefox/Safari DevTools.
3. Toggle Device Toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`) and test:
   - **iPhone 12/14/15 (390 x 844)**
   - **Samsung Galaxy S20 / Pixel 7 (412 x 915)**
   - **Small mobile (360 x 640)**
4. Navigate to `http://localhost:5173/chapters/ch19`.

---

## 3. Test Scenarios

### Scenario A: Theory Reading First (`/chapters/ch19`)
1. Open `http://localhost:5173/chapters/ch19`.
2. Confirm the overview card:
   - Badge: **Chapitre 19**
   - Title: **The imperative mood**
   - Meta badges: 📚 3 sujets · 🎯 3 séries · ⚡ 30 questions · 📄 Pages 219–225.
3. Confirm the "Théorie" tab is active by default:
   - Check Section 1 (Formation Régulière de l'Impératif, Chute du -s pour verbes en -er, Maintien du -s pour -ir/-re).
   - Check Section 2 (La Forme Négative de l'Impératif et place des pronoms).
   - Check Section 3 (Les Impératifs Irréguliers : Être, Avoir, Savoir, Vouloir).
   - Check Section 4 (L'Impératif des Verbes Pronominaux : La Valse des Pronomes, tableau récapitulatif).
   - Check Section 5 (L'Astuce Phonétique du « -s » Eufonique devant Y et EN : *Vas-y !*, *Manges-en !*).
   - Check Section 6 (Vocabulaire Cívico & Administrativo : L'État Civil et les Documents).
   - Check Section 7 (Les 6 Commandements FLE pour Lusophones).
4. Scroll to bottom:
   - Click **"Passer aux Exercices 🚀"**.
   - Verify it switches to the "Exercices" tab and smoothly scrolls to top.
5. Click **"👨‍🏫 Astuces FLE"** tab:
   - Verify all 6 dedicated tips for Chapter 19 are rendered:
     1. 🛑 A Queda Obrigatória do « -s » no Tu dos Verbos em -ER
     2. 🔀 Verbos Pronnominais : A Dança da Posição dos Pronomes
     3. ⚡ A Mudança de « Te » para « Toi » e « Me » para « Moi »
     4. 🎭 Os 4 Comandantes Irregulares do Subjuntivo
     5. 🎵 O « -s » Eufônico Diante de Y e EN
     6. 📋 Vocabulário Cívico & Administrativo Francês

---

### Scenario B: Gamification Engines (`/exercises/ch19-ex01` to `ch19-ex03`)

#### 1. Exercice 19.1 — Formation de l'impératif (`/exercises/ch19-ex01`)
- Question 1: `Prendre le train de neuf heures. (tu)`
  - Type: `Prends le train de neuf heures !` (or without `!`)
  - Verify feedback highlights that *prendre* keeps its `-s` because it is a 3rd group verb.
- Question 2: `Regarder le film à la télé ce soir. (vous)`
  - Type: `Regardez le film à la télé ce soir !`
- Question 3: `Dîner sur la terrasse. (nous)`
  - Type: `Dînons sur la terrasse !`
- Question 4: `Acheter le journal. (tu)`
  - Type: `Achète le journal !`
  - Verify feedback explains the accent grave `è` and the mandatory loss of `-s`.
- Question 5: `Boire à sa santé. (nous)`
  - Type: `Buvons à sa santé !`
- Question 6: `Expliquer les conditions. (vous)`
  - Type: `Expliquez les conditions !`
- Question 7: `Ne pas courir si vite. (tu)`
  - Type: `Ne cours pas si vite !`
- Question 8: `Épeler ton nom. (tu)`
  - Type: `Épelle ton nom !`
  - Verify explanation mentions the doubled consonant `ll` and drop of `-s`.
- Question 9: `Prêter votre dictionnaire à Marie. (vous)`
  - Type: `Prêtez votre dictionnaire à Marie !`
- Question 10: `Ne pas inviter Denis. (tu)`
  - Type: `N'invite pas Denis !` (or `N’invite pas Denis !`)
  - Verify feedback highlights both elision (`n'`) and loss of `-s`.

#### 2. Exercice 19.2 — Verbes pronominaux à l'impératif (`/exercises/ch19-ex02`)
- Question 1: `Se laver les mains. (tu)`
  - Type: `Lave-toi les mains !`
  - Verify explanation teaches that in the affirmative, `te` becomes `toi` and follows the verb with a hyphen.
- Question 2: `Se balader dans la forêt. (vous)`
  - Type: `Baladez-vous dans la forêt.` (or `Baladez-vous dans la forêt !`)
- Question 3: `S’écrire plus souvent. (nous)`
  - Type: `Écrivons-nous plus souvent !`
- Question 4: `Ne pas se coucher trop tard. (tu)`
  - Type: `Ne te couche pas trop tard !`
  - Verify explanation highlights that in the negative, `toi` reverts to `te` and precedes the verb.
- Question 5: `Se réveiller à cinq heures. (vous)`
  - Type: `Réveillez-vous à cinq heures !`
- Question 6: `S’habiller vite. (tu)`
  - Type: `Habille-toi vite !`
- Question 7: `Ne pas se tromper de route. (vous)`
  - Type: `Ne vous trompez pas de route !`
- Question 8: `Se retrouver devant la Brasserie Lipp. (nous)`
  - Type: `Retrouvons-nous devant la Brasserie Lipp !`
- Question 9: `Se dépêcher. (tu)`
  - Type: `Dépêche-toi !`
- Question 10: `Se rencontrer un jour à Paris. (nous)`
  - Type: `Rencontrons-nous un jour à Paris !`

#### 3. Exercice 19.3 — Traduction thématique et impératif (`/exercises/ch19-ex03`)
- Question 1: `Don’t forget your passport! (tu)`
  - Type: `N'oublie pas ton passeport !` (or `N’oublie pas ton passeport !`)
- Question 2: `Let’s rest on the bench! (nous)`
  - Type: `Reposons-nous sur le banc !`
- Question 3: `Bring your identification card! (vous)`
  - Type: `Apportez votre carte d'identité !` (or `carte d’identité`)
- Question 4: `Tell us his first name! (tu)`
  - Type: `Dis-nous son prénom !`
- Question 5: `Take this medicine! (tu)`
  - Type: `Prends ce médicament !`
- Question 6: `Don’t be late! (vous)`
  - Type: `Ne soyez pas en retard !`
  - Verify explanation teaches the irregular imperative of *être* (*soyez*).
- Question 7: `Let’s go to Italy! (nous)`
  - Type: `Allons en Italie !`
- Question 8: `Close the door! (tu)`
  - Type: `Ferme la porte !`
- Question 9: `Wait for me! (vous)`
  - Type: `Attendez-moi !`
  - Verify explanation warns about the faux-ami *attendre* (= esperar) and post-verbal *moi*.
- Question 10: `Write your address on the envelope! (vous)`
  - Type: `Écrivez votre adresse sur l'enveloppe !`

---

## 4. Mobile Responsiveness Checks (360px - 412px viewports)

1. **Card layout**:
   - Verify Chapter overview card padding and typography fit comfortably on 360px width without horizontal scrolling.
2. **Tab buttons**:
   - Verify that tabs (Théorie, Exercices, Astuces FLE) remain easily tappable (min 44px height) and adapt their labels dynamically.
3. **Accent Toolbar**:
   - Ensure the `AccentToolbar` buttons (`é`, `è`, `ê`, `à`, `ç`, `î`, `ô`, `ù`, `û`, `ë`, `ï`, `œ`, `«`, `»`) wrap properly or scroll smoothly without pushing action buttons off-screen.
4. **Bottom action bar**:
   - Verify the "Vérifier" / "Continuer" button has full width, clear padding with safe area insets (`env(safe-area-inset-bottom)`), and does not cover exercise inputs.
5. **Vocabulary tables**:
   - Verify the vocabulary table inside the theory reader can be scrolled horizontally on mobile devices via `.theory-table-wrapper` with smooth touch response.

---

## 5. Result Reporting

- [ ] Theory reading validated with rich pedagogy and zero errors.
- [ ] Exercice 19.1 validated (all 10 questions and edge cases).
- [ ] Exercice 19.2 validated (all 10 questions and pronominal variations).
- [ ] Exercice 19.3 validated (all 10 translations and vocabulary).
- [ ] Mobile experience validated with no overlapping or clipped UI elements.
