# Handoff: Chapter 24 Pedagogical & Gamification Overhaul

## 1. Summary of Changes
- **Chapter Data** (`src/data/chapter24Data.ts`):
  - In-depth, contrastive pedagogical FLE theory for French relative pronouns:
    - Subject pronoun *qui* with phonological rules (never elides before vowels) and antecedent agreement in emphatic *c'est moi qui...* constructions.
    - Direct object pronoun *que / qu'* with mandatory vowel elision and past participle agreement in compound tenses.
    - Relative pronouns following prepositions (*pour qui*, *par laquelle*, *avec lequel*, *dans lequel*, *auquel*, *à quoi*, *sans qui / sans laquelle*).
    - Temporal and locational *où* replacing *dans lequel* and representing time points (*l'année où*, *le jour où*).
    - Relative pronoun *dont* replacing *de* and expressing possession (*dont le père*, strictly following subject-verb-object order).
    - Neutral relative pronouns *ce qui, ce que, ce qu', ce dont, ce à quoi* and fronted emphatic constructions (*c'est de... / c'est à...*).
    - Subjunctive mood usage after superlatives and hypothetical relative clauses.
  - Complete vocabulary table covering furniture, flea markets, auctions, and restoration arts.
  - 6 Topics (`ch24-t01` to `ch24-t06`).
  - 9 Exercise Groups (`ch24-ex01` to `ch24-ex09`) containing all 85 questions from the curriculum.
  - All questions equipped with options, tokenized word banks for sentence builders, accepted answers with common French variations, and bilingual Portuguese/French explanations.
- **Hook Integration**:
  - `src/hooks/useTheory.ts`: Added fallback theory `CH24_FALLBACK_THEORY`, resolver, and dynamic theory markdown selector.
  - `src/hooks/useExerciseSet.ts`: Added fallback set configuration for `ch24-ex01` to `ch24-ex09` and question enrichment.
- **UI & Mobile Experience**:
  - `src/pages/ChapterPage.tsx`: Added 6 dedicated *Astuces FLE* cards with mobile-first card deck styling:
    1. *Qui vs Que : La Frontière Sujet vs Complément d'Objet*
    2. *L'Élision Phonétique : « Qui » JAMAIS, « Que » TOUJOURS !*
    3. *« C'est moi qui... » : Accord Obligatoire du Verbe*
    4. *Temps Composés avec « Que » : L'Accord du Participe Passé*
    5. *Le Pronom « Dont » : Verbes en « De » et Possession*
    6. *Repère Temporel « Où » et Neutres « Ce qui / Ce que »*
- **Regression Testing**:
  - `src/hooks/useTheory.test.tsx`: Tests verifying theory, 6 topics, and 9 exercise sets.
  - `src/hooks/useExerciseSet.test.tsx`: Unit tests for all 9 Chapter 24 exercise sets.
  - `src/pages/ChapterPage.test.tsx`: Component tests verifying Chapter 24 render, topics, and tips cards.

## 2. Verification Results
- `npm run typecheck`: Passed with 0 errors.
- `python scripts/verify_fast.py`: Passed (all 7 fast checks, 369 unit tests passed).
- `python scripts/verify_ci.py`: Passed (all 9 CI checks passed, Vite production build succeeded).
