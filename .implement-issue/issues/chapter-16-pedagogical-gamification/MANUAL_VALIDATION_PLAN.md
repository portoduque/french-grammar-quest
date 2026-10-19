# Manual Validation Plan: Chapter 16 Pedagogical Roadmap & Gamification

**Issue Key**: `chapter-16-pedagogical-gamification`
**Status**: Ready for Human Review (`In Review`)
**Target Route**: `/chapter/ch16`
**Exercise Routes**:
- `/exercise/ch16-ex01` (Exercice 16.1 — Reconnaissance des infinitifs)
- `/exercise/ch16-ex02` (Exercice 16.2 — Conjugaison historique au passé simple)
- `/exercise/ch16-ex03` (Exercice 16.3 — Traduction vers le passé simple littéraire)

---

## 1. Objective

Validate that Chapter 16 strictly adheres to the pedagogical roadmap and source book content (`temp/capitulo 16/16.1.png`, `16.2.png`, `16.3.png`, `16.4.png`, and `gabarito.png`):
1. **Theory-First Pedagogy**: The learner reads and assimilates rich, didactic, error-free FLE theory before attempting exercises.
2. **Pedagogical Rigor (FLE + Lusophone Educator)**:
   - Sociolinguistic register: *Passé simple* is literary/formal/written, contrasted with spoken *passé composé*.
   - Contrast with Portuguese: *Pretérito perfeito simples* equivalence in meaning, but distinction in register.
   - Morphological paradigms: -ER (-a-), -IR/-RE (-i-), irregular families in -u-, -i-, -in-.
   - Diacritics: Circumflex accents only on *nous* and *vous* (-âmes, -âtes, -îmes, -îtes, -ûmes, -ûtes).
   - Euphony: Cedilla (*ç*) in -cer verbs and silent *e* in -ger verbs.
   - Auxiliaries: *avoir* (*j'eus*, pronounced [y]) and *être* (*je fus, il fut, ils furent*, identical root to Portuguese *fui/foi/foram*).
   - Thematic vocabulary: 34 fine arts & museum terms (*peindre, toile, vernissage, chef-d'œuvre, chevalet*).
3. **Gamification Engine Calibration**:
   - `ch16-ex01`: Morphological recognition (`fill_blank`) with prompt isolating the verb in context and AccentToolbar.
   - `ch16-ex02`: Historical contextual conjugation (`fill_blank`) with slot filling in famous cultural/historical sentences.
   - `ch16-ex03`: Literary translation (`translation`) with support for gender variations (*ils/elles*), optional adverbs, and formative feedback.
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
4. Navigate to `http://localhost:5173/chapter/ch16`.

---

## 3. Test Scenarios

### Scenario A: Theory Reading First (`/chapter/ch16`)
1. Open `http://localhost:5173/chapter/ch16`.
2. Confirm the overview card:
   - Badge: **Chapitre 16**
   - Title: **The passé simple**
   - Meta badges: 📚 2 sujets · 🎯 3 séries · ⚡ 30 questions · 📄 Pages 195–202.
3. Confirm the "Théorie" tab is active by default:
   - Check Section 1 (Verbes en -er : répéter, prononcer, déménager, cédille ç et -e- muet).
   - Check Section 2 (Verbes en -ir et -re : partir, répondre).
   - Check Section 3 (Auxiliaires Avoir et Être, prononciation phonétique [y] d'avoir, racines romanes de fus/fut).
   - Check Section 4 (Vocabulaire complet des Beaux-Arts, 34 termes traduits en portugais et anglais).
   - Check Section 5 (34 Verbes Irréguliers, famille en -u-, -i-, -in-, Aliénor d'Aquitaine).
   - Check Section 6 (Synthèse pour Lusophones : les 5 Réflexes d'Or du Professeur FLE).
4. Scroll to bottom:
   - Click **"Passer aux Exercices 🚀"**.
   - Verify it switches to the "Exercices" tab and smoothly scrolls to top.
5. Click **"👨‍🏫 Astuces FLE"** tab:
   - Verify all 7 dedicated tips for Chapter 16 are rendered (Sociolinguistique, Formule des radicais, Acentos circunflexos mágicos, Gêmeo português de Être, Pronúncia de Avoir, Il plut vs Il plut, Cédilha e E).

### Scenario B: Gamification Engines (`/exercise/ch16-ex01` to `ch16-ex03`)

#### 1. Exercice 16.1 — Reconnaissance des infinitifs (`/exercise/ch16-ex01`)
- Question 1: `Ils furent de grands collectionneurs. (Infinitif du verbe : __)`
  - Type: `être`
  - Verify instant green feedback explaining: *« furent » est la 3e personne du pluriel du verbe ÊTRE au passé simple.*
- Question 2: `J’eus un profond respect pour cet artiste.` -> Type: `avoir`
- Question 3: `Elles peignirent des natures mortes.` -> Type: `peindre`
- Question 8: `Elle sut tout de suite que c’était un chef-d’œuvre.` -> Type: `savoir`
- Question 9: `Il plut à tout le monde.` -> Type: `plaire` (verify explanation warns against confusing with *pleuvoir*).
- Question 10: `J’éteignis la lumière.` -> Type: `éteindre`.

#### 2. Exercice 16.2 — Conjugaison historique au passé simple (`/exercise/ch16-ex02`)
- Question 1: `Le Rouge et le noir (être) __ publié en 1830.` -> Type: `fut`
- Question 2: `En France, les femmes (obtenir) __ le droit de vote en 1944.` -> Type: `obtinrent`
- Question 3: `Jacques Cartier (explorer) __ la région de Montréal en 1535.` -> Type: `explora`
- Question 4: `Charles de Gaulle (mourir) __ en 1970.` -> Type: `mourut`
- Question 5: `Édouard Manet (peindre) __ Le déjeuner sur l’herbe en 1863.` -> Type: `peignit`
- Question 7: `Catherine de Médicis (introduire) __ l’usage de la fourchette en France.` -> Type: `introduisit`
- Question 8: `Le voyage inaugural du TGV (avoir lieu) __ en 1981.` -> Type: `eut lieu`
- Question 10: `La Côte d’Ivoire (devenir) __ indépendante en 1960.` -> Type: `devint`.

#### 3. Exercice 16.3 — Traduction vers le passé simple littéraire (`/exercise/ch16-ex03`)
- Question 1: `He lived in Amsterdam for ten years.` -> Type: `Il vécut dix ans à Amsterdam.` (or `Il vécut pendant dix ans à Amsterdam.`).
- Question 2: `She introduced this new method.` -> Type: `Elle introduisit cette nouvelle méthode.`
- Question 3: `They read all his books.` -> Test both `Ils lurent tous ses livres.` and `Elles lurent tous ses livres.`.
- Question 8: `They bought a new easel.` -> Type: `Ils achetèrent un nouveau chevalet.`
- Question 9: `She became a portrait painter.` -> Type: `Elle devint portraitiste.` (or `Elle devint une portraitiste.`).
- Question 10: `He smiled and left.` -> Type: `Il sourit et partit.`

---

## 4. Mobile Responsiveness & Touch Verification

1. On a 360px viewport:
   - Check that `TheoryReader` tables have smooth horizontal scrolling (`-webkit-overflow-scrolling: touch`) and do not expand viewport width.
   - Verify `chapter-tabs` horizontal scroll without clipping.
   - Verify `AccentToolbar` keys are comfortably tappable (minimum 34px-38px touch targets) and properly insert diacritics into the input.
   - Verify the bottom action bar / `FeedbackBanner` does not cover the input or question prompt.
2. Complete session:
   - Verify `SessionCompletedView` displays XP earned, streak, stars, and buttons to retry or return to the chapter.
