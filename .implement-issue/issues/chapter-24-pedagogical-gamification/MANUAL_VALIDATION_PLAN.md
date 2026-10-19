# Manual Validation Plan: Chapter 24 (Relative Pronouns)

## 1. Objectives
- Validate that the Chapter 24 theory markdown is rendered properly with pedagogical formatting, vocabulary tables, and phonetic rules.
- Validate that all 9 exercise groups load their respective questions without layout breakage on desktop and mobile viewports (e.g., 375px width).
- Ensure that the 6 Astuces FLE cards render with appropriate contrast and responsive wrapping on mobile.

## 2. Test Matrix

| Exercise Set | Interaction Type | Verification Items | Expected Behavior |
|--------------|------------------|---------------------|-------------------|
| `ch24-ex01`  | `fill_blank` | Agreement of verb with antecedent after *c'est moi/toi/nous qui...* | Only valid conjugated present tense forms accepted; feedback explains person agreement |
| `ch24-ex02`  | `fill_blank` | Contrast *qui* vs *que* vs *qu'* | Verifies subject vs direct object distinction; elision before vowel sounds |
| `ch24-ex03`  | `matching` | Past participle agreement with *que* | Matches antecedent nouns with correct past participle endings (*lavées, consultés, lu, racontée, prises*) |
| `ch24-ex04`  | `fill_blank` | Preposition + relative pronoun (*pour qui, avec lequel, auquel...*) | Checks gender/number agreement of *lequel* and contraction *à + lequel = auquel* |
| `ch24-ex05`  | `fill_blank` | Contrast *qui*, *que*, *dont* | Verifies verbs taking *de* (*parler de, se servir de, se souvenir de, être content de*) take *dont* |
| `ch24-ex06`  | `translation` | Complex relative pronoun translations with *vous/tu*, *dont*, *où* | Tokens and text inputs accept valid French phrasing; responsive wrapping on small screens |
| `ch24-ex07`  | `fill_blank` | Neutral pronouns *ce qui, ce que, ce qu', ce dont, ce à quoi* | Correctly parses clause roles and preposition repetitions in emphatic sentences |
| `ch24-ex08`  | `translation` | Sentence builders starting with *ce qui/ce que/ce dont/ce à quoi* | Validates emphatic *mise en relief* constructions and tokens |
| `ch24-ex09`  | `fill_blank` | Comprehensive review test of Chapter 24 | Integrates all relative pronoun rules |

## 3. Mobile Viewport Check
- Test under 375px × 667px (iPhone SE) and 390px × 844px (iPhone 12/13/14).
- Ensure Astuces FLE cards stack vertically without horizontal overflow.
- Ensure translation tokens wrap smoothly and buttons have at least 44px tap targets.
