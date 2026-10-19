# Implementation Plan: Chapter 24 Pedagogical & Gamification Overhaul

## 1. Problem Statement & Scope
- **Chapter**: Chapter 24 (*Relative pronouns* / *Les pronoms relatifs*).
- **Goal**: Full implementation of Chapter 24 according to the source curriculum images in `temp/capitulo 24/`:
  - Complete, didactic FLE theory with contrastive explanations for Lusophone students (pronoun functions, elisions, participle agreements, verb conjugations after *c'est moi qui...*, *dont* syntax, prepositions + *lequel*, and *ce qui / ce que / ce dont / ce à quoi*).
  - 6 structured topics for clear navigation.
  - 9 gamified exercise sets covering all 85 exercise questions from the textbook.
  - Integration with `useTheory`, `useExerciseSet`, `ChapterPage` (Astuces FLE cards), and corresponding test suites.
  - Strict compliance with pre-commit quality gates (`verify_fast.py`, `verify_ci.py`), zero leaks, mobile responsive layout.

## 2. Architecture & Components
1. **Data Model** (`src/data/chapter24Data.ts`):
   - `CHAPTER_24_THEORY_MARKDOWN`: Comprehensive bilingual (FR/PT) pedagogical guide.
   - `CHAPTER_24_TOPICS`: 6 topics aligning with curriculum breakdown.
   - `CHAPTER_24_EXERCISE_SETS`: 9 exercise groups with interaction types (`fill_blank`, `matching`, `translation`).
   - `CHAPTER_24_QUESTIONS_MAP`: 85 robust questions with accepted answers, options, tokens, hints, and explanations.
2. **Hook Integration**:
   - `src/hooks/useTheory.ts`: Fallback entry `CH24_FALLBACK_THEORY`, resolver in `getFallbackTheory`, and switch for `finalTheoryMarkdown`.
   - `src/hooks/useExerciseSet.ts`: Fallback set resolving Chapter 24 sets, and mapping questions in `fallbackList`.
3. **UI & Mobile Experience**:
   - `src/pages/ChapterPage.tsx`: Dedicated deck of 6 *Astuces FLE* cards for Chapter 24 highlighting the key traps.
4. **Automated Testing & Regressions**:
   - `src/hooks/useTheory.test.tsx`: Tests verifying Chapter 24 theory, topics, and exercise sets.
   - `src/hooks/useExerciseSet.test.tsx`: Tests for all 9 Chapter 24 exercise sets.
   - `src/pages/ChapterPage.test.tsx`: Component tests verifying Chapter 24 render, topics, and tips.

## 3. Execution Steps
1. Create `src/data/chapter24Data.ts` with all 85 questions, theory, topics, and sets.
2. Update `src/hooks/useTheory.ts` to integrate Chapter 24.
3. Update `src/hooks/useExerciseSet.ts` to integrate Chapter 24.
4. Update `src/pages/ChapterPage.tsx` with Chapter 24 tips cards.
5. Update unit tests in `src/hooks/useTheory.test.tsx`, `src/hooks/useExerciseSet.test.tsx`, and `src/pages/ChapterPage.test.tsx`.
6. Run `npm run typecheck`, `python scripts/verify_fast.py`, and `python scripts/verify_ci.py`.
7. Document manual validation in `MANUAL_VALIDATION_PLAN.md` and complete handoff.
