# Content workflow for Antigravity and Codex

## Authoritative chapter-01 artifacts

| File | Role |
|---|---|
| `theory.md` | Study-facing semantic Markdown with page comments, subtopic anchors and tables |
| `theory-source.md` | Immutable original Phase A theory extraction; audit only |
| `metadata.json` | Hierarchy of topics and 13 subtopics; exercise ↔ subtopic links |
| `exercises.json` | Publisher questions, answer keys, choices and gameplay/grading hints |
| `lesson-sequence.json` | 31 distinct source fragments; page offset references into `source-pages/` |
| `source-pages/` | Immutable digital-text snapshot of original chapter pages |
| `answer-key-source.txt` | Publisher keys, not exhaustive grammar validation |
| `schemas/` | Draft-2020-12 contracts |
| `reports/chapter01-validation.md` | Automated evidence and limitations |

## Rules for future chapters

1. Keep the source page text and printed publisher answers unchanged; link every question to source page(s).
2. Use **unique fragment IDs** and [start, end) character ranges that reconstruct each page without overlap or gaps.
3. Map each exercise to fine-grained grammar topics; build bidirectional links and verify no orphan IDs.
4. Turn paradigms and vocabulary columns into **real Markdown tables**; never split bilingual sentences at a PDF line break. Compare difficult table rows to page images.
5. Preserve all meaningful theory, example sentences, vocabulary and usage notes. Keep raw extraction for forensic comparison.
6. Never invent clipped or unreadable text. Store `[source clipped]` and source page with review status.
7. Do not use a publisher's single suggested translation as the exhaustive set of accepted answers. Use `grading_policy` and `presentation` for edge cases.
8. For each phase run JSON Schema validation, coverage checks and source fingerprints, document all editorial exceptions, then review the PR/CI before merge.
9. Keep third-party source material private and separate from the original code license. Private GitHub is not permission to redistribute the book.

## Chapter 01 examples

- `ch01-ex06-q06`: source sentence contains `Je` followed by blank, key `J’habite`. Render it as a **whole-clause rewrite** (`J’habite au dixième étage.`), not simple text inserted after `Je`.
- `ch01-ex10-q06`: source prompt explicitly says **(informal)**; answer starts with `Tu` despite exercise-level `vous` instruction.
- `ch01-ex07`: source matching options a–j stored independently of question ordering, with source mapping unchanged.
- Open translation/rewriting tasks: `semantic_review_required` rather than brittle exact-match grading.
- Source page 28: the English right column is clipped; use only complete examples for validated feedback.

## Local validation

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py --private .
```

**Status:** chapter 01 has completed structural/semantic mapping and automated checks; full glyph-by-glyph visual sign-off remains pending. No game/application implementation is part of this delivery.
