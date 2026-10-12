# Content workflow for Antigravity / Codex

## Source of truth

Use the original copyrighted PDF only in the user's authorized private local workspace. The public `manifest.json` maps chapter and topic identities; `schemas/*.schema.json` define the normalized data model. The separately delivered private chapter 01 package is the **pilot corpus**; no app code is part of this phase.

## How to inspect chapter 01

Unzip the private package **outside this public repo**. Review `chapters/01/metadata.json`, `theory.md`, `exercises.json`, `lesson-sequence.json`, raw `source-pages/`, and `reports/chapter01-validation.md`.

If the private directory is unzipped at `/secure/french-grammar-content-private-phase-a-final`, run:

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py --private /secure/french-grammar-content-private-phase-a-final
```

## Editorial rules for future chapters

- Preserve chapter order, source exercise labels and page numbers; never silently renumber a duplicated label.
- Give each *question* (not only its containing exercise group) a stable unique ID.
- Keep theory segments, paragraphs, verb tables, example pairs and vocabulary separate from interactive questions.
- Keep each publisher answer in `answer.source_key`; only add `answer.accepted` values when justified. Record unresolved ambiguity in `review_status`.
- For matching activities, capture every option and its source letter exactly.
- Keep page-level snapshots and a lossless partition trace so every selectable-text character is accounted for. This proves extraction coverage, **not** visual equivalence.
- Flag clipped PDF source text, broken accents, interrupted columns, typographic defects and ambiguous keys explicitly.
- Re-run the validator after every conversion; do not declare missing human proofing to be complete.
- Never publish full theory, actual questions, source answer keys or the original PDF to this public repo.

## Future application separation

Later, React reads structured content delivered through an authenticated/private content store. Game components should depend on `interaction_type` and schema fields, not PDF parsing at runtime. User progress/XP is separate from the book corpus.
