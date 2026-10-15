# Manual Validation Plan: Chapter 02 Pedagogical Roadmap & Gamification

**Issue Key**: `chapter-02-pedagogical-gamification`
**Status**: Ready for Human Review (`In Review`)
**Target URL**: `http://localhost:5173`
**Applicable Routes**:
- `/chapters/ch02` (Chapter 2 Theory, Exercises List, Astuces FLE)
- `/exercises/ch02/1` to `/exercises/ch02/11` (All 11 Gamified Exercise Series)
- `/chapters/ch01` (Regression check)
- `/chapters/ch03`, `/chapters/ch04`, `/chapters/ch28` (Preservation checks)

---

## 1. Objective

Validate that Chapter 2 strictly adheres to the pedagogical roadmap and source book content (`temp/capitulo 2/2.1.png` through `2.8.png` and `gabarito.png`):
1. **Theory-First Pedagogy**: Student must read and assimilate rich, formatted, error-free FLE theory before exercises.
2. **Gamification Engine Calibration**: All 11 exercise series use their optimal game interaction (`fill_blank`, `matching`, `sentence_rewrite`, `translation`) with clean, distinct options and instant formative feedback.
3. **FLE Professor Polish**: Accurate grammar, phonetic liaison/elision, euphonic `-t-`, and Portuguese-specific contrastive tips (e.g. *ni... ni...* article retention/omission).
4. **Mobile Responsiveness**: Complete touch-friendly experience on 320px–430px viewports with zero text truncation, zero element overlap with the fixed bottom action drawer, and clean table scrolling.

---

## 2. Prerequisites & Setup

1. Start local dev server:
   ```bash
   npm run dev
   ```
2. Open Chrome/Firefox/Safari DevTools.
3. Toggle Device Toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`) and select **iPhone 12/14/15 (390x844)** or **Pixel 7 (412x915)**.
4. Navigate to `http://localhost:5173/chapters/ch02`.

---

## 3. Happy-Path Scenarios

### Scenario A: Theory Reading First (`/chapters/ch02`)
1. Open `/chapters/ch02`.
2. Verify the chapter title displays: **"The present tense of -ir and -re verbs"** with subtitle and meta badges (*4 Tópicos*, *11 Séries*, *110 Questões*).
3. Observe the "Théorie" tab (active by default):
   - **Tópico 1**: Regular -IR (*Finir* model with *-iss-* interfix), Irregular -IR (*Sortir*, *Partir*, *Dormir* without *-iss-*), and "Faux -IR" conjugated like -ER (*Ouvrir*, *Offrir*, *Cueillir*, *Couvrir*, *Souffrir*).
   - **Tópico 2**: 15 world languages vocabulary with correct articles (*le français*, *l'anglais*, *l'espagnol*, *le russe*, etc.).
   - **Tópico 3**: Regular -RE (*Vendre*, *Attendre*, *Répondre* with bare silent 'd' in 3rd person) and Irregular -RE (*Prendre*, *Apprendre*, *Comprendre* with stem shifts).
   - **Tópico 4**: 3 Interrogative forms (Intonation, *Est-ce que/qu'*, Inversion with euphonic `-t-`), Negation (*ne... pas*, *n'*, *jamais*, *rien*, *personne*), and the Golden Rule of *ni... ni...* (retain definite articles *le/la/les*; omit partitives/indefinites *du/de la/des*).
4. Scroll to the bottom of the Theory tab:
   - Click the prominent CTA button **"Passer aux Exercices 🚀"**.
   - Verify it smoothly scrolls to top and switches to the "Exercices" tab.

### Scenario B: Gamification Engines across all 11 Series (`/exercises/ch02/:setNum`)
1. **Series 1 (`ch02-ex01` - Fill Blank)**:
   - Navigate to `/exercises/ch02/1`.
   - Test question 1: `Je (finir) mes devoirs.` -> Type `finis` -> Verify instant green badge with FLE explanation.
   - Test question 4: `Nous (choisir) une table.` -> Type `choisissons` -> Verify `-iss-` is recognized.
2. **Series 2 (`ch02-ex02` - Matching Interaction)**:
   - Navigate to `/exercises/ch02/2`.
   - Verify prompt: `Il agrandit` is clearly separated from the 10 answer options (a through j).
   - Select option `h` (`sa maison.`) -> Verify success and explanation.
3. **Series 3 (`ch02-ex03` - Translation Engine)**:
   - Navigate to `/exercises/ch02/3`.
   - Test question 1: `Ela parte às 8 horas.` -> Type `Elle part à huit heures.` (or `Elle part à 8 heures.`) -> Verify acceptance.
4. **Series 5 (`ch02-ex05` - Matching Interaction)**:
   - Navigate to `/exercises/ch02/5`.
   - Verify prompt: `Vous entendez` with 10 options -> Select `f` (`la radio ?`) -> Verify acceptance.
5. **Series 8 (`ch02-ex08` - Sentence Rewrite with Inversion)**:
   - Navigate to `/exercises/ch02/8`.
   - Question 5: `Elle parle russe ?` -> Type `Parle-t-elle russe ?` -> Verify euphonic `-t-` is validated.
6. **Series 9 (`ch02-ex09` - Sentence Rewrite with Est-ce que)**:
   - Navigate to `/exercises/ch02/9`.
   - Question 3: `Il habite à Paris ?` -> Type `Est-ce qu'il habite à Paris ?` -> Verify elision `qu'` is validated.
7. **Series 10 (`ch02-ex10` - Sentence Rewrite with Negation)**:
   - Navigate to `/exercises/ch02/10`.
   - Question 8: `Elle mange de la viande et du fromage.` -> Type `Elle ne mange ni viande ni fromage.` -> Verify correct article omission.
8. **Series 11 (`ch02-ex11` - Grand Défi Translation)**:
   - Navigate to `/exercises/ch02/11`.
   - Verify series 11 is accessible (not capped at 10) and contains all 10 grand synthesis questions.

### Scenario C: Pedagogical Astuces FLE Tab (`/chapters/ch02`)
1. Click on the **"Astuces FLE"** tab in Chapter 2.
2. Verify all 6 specific golden rules are rendered:
   - ⚡ *Les Deux Types de Verbes en -IR*
   - 🎭 *Les « Faux -IR » Conjugués comme des -ER*
   - 🛑 *Verbes en -RE : Le 'D' à la 3e Personne*
   - 🖐️ *La Famille « Prendre » et ses Pièges*
   - 🔀 *L'Inversion et le « -t- » Euphonique*
   - ⚖️ *La Règle d'Or de « Ni ... Ni ... » (Cruciale !)*

---

## 4. Mobile Responsiveness & Touch Checks (320px – 430px)

1. Set viewport width to **360px** (e.g., Galaxy S8) or **375px** (iPhone SE).
2. Open `/exercises/ch02/1`:
   - Scroll down: Verify input fields and prompt text never overlap with the fixed bottom action drawer.
   - Verify bottom clearance (`padding-bottom: 120px` in `.exercise-page-container` and `.exercise-session-wrapper`).
3. Open `/exercises/ch02/2` (Matching):
   - Verify 10 option cards are touch-friendly, cards do not overflow screen horizontally, and letters a–j are clearly distinguishable.
4. Open `/chapters/ch02` (Theory):
   - Inspect verb conjugation tables: Verify they scroll smoothly horizontally if needed without breaking page layout.

---

## 5. Regression & Preservation Checks

1. Open `/chapters/ch01`:
   - Verify Chapter 1 theory renders completely.
   - Verify Astuces FLE displays Chapter 1's 6 specific rules (*Les Terminaisons Muettes*, *L'Élision Obligatoire*, *La Liaison Euphonique*, etc.).
2. Open `/chapters/ch03`:
   - Verify warning banner: *"Chapitre temporairement suspendu pour révision éditoriale"*.
   - Verify exercises button is disabled (*Suspendu 🚫*).
3. Open `/chapters/ch04`:
   - Verify pending editorial card displays: *"Théorie en cours de révision éditoriale"*.
4. Open `/chapters/ch28`:
   - Verify Final Boss banner displays with *35 séries · 345 questions* and *7 Checkpoints*.

---

## 6. Pass / Fail Checklist

| Check | Expected Result | Pass / Fail | Notes |
|---|---|---|---|
| Chapter 2 Theory Content | 4 topics with tables, phonetics, rules, FLE contrast | [ ] | |
| Theory to Exercise CTA | Button "Passer aux Exercices 🚀" works smoothly | [ ] | |
| Exercise 2.1 Engine | Fill blank with irregular -IR forms | [ ] | |
| Exercise 2.2 Matching Engine | 10 decoupled options, valid selection | [ ] | |
| Exercise 2.5 Matching Engine | -RE matching options cleanly aligned | [ ] | |
| Exercise 2.8 Inversion Engine | Euphonic `-t-` evaluated correctly | [ ] | |
| Exercise 2.9 Est-ce que Engine | Elision `qu'` evaluated correctly | [ ] | |
| Exercise 2.10 Negation Engine | *ni... ni...* article rules evaluated | [ ] | |
| Exercise 2.11 Synthesis | 11th series unlocks and runs smoothly | [ ] | |
| Mobile Bottom Action Clear | No overlap with fixed drawer at 375px | [ ] | |
| FLE Tips Chapter 2 | 6 specific rules for Portuguese speakers | [ ] | |
| Preservation Other Chapters | ch01, ch03, ch04, ch28 intact | [ ] | |
