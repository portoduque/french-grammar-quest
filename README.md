# French Grammar Quest — Content Foundation

**Phase A: chapter 01 conversion and structural validation implemented.** This is a content-first project, **not** a React application yet.

## Public repository

- `manifest.json`: chapter-level inventory of 28 chapters and source PDF page locations.
- `schemas/chapter.schema.json`: chapter metadata and topic/exercise relationships.
- `schemas/exercise.schema.json`: instructions, individual questions, publisher answers, source locations and future interaction types.
- `scripts/validate_content.py`: inventory validation and optional private chapter-01 validation.
- `reports/coverage.md`, `reports/validation.md`: evidence and limitations.
- `.github/workflows/content-validation.yml`: structural checks on pushes and pull requests.

## Phase A verified outputs

- 527-page PDF inventoried: 28 chapters; 233 detected exercise **markers** (one known duplicated/misnumbered marker in chapter 26). These are not individual questions.
- Chapter 1 private package: 17/17 chapter pages, three primary theory topics, ten groups, **100 individual questions**, 100 publisher answer-key entries, and source page references.
- Source text is partitioned into theory/exercise fragments without losing extracted characters. Chapter 1 Markdown retains text-aligned tables and chapter headings.
- Source-specific exceptions are documented; visual fidelity and alternative acceptable translations are **not** claimed as completely human-certified.

## Validate

Public-only (requires Python 3.10+):

```bash
python scripts/validate_content.py
```

With a **separately downloaded, unzipped private source-content package**:

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py --private /path/to/french-grammar-content-private-phase-a-final
```

The optional `jsonschema` package enables full schema checking. The private package is **not** and must never be published to this repository.

## Phase A scope and known exceptions

- Original PDF page 28 contains clipped right-side English translation examples; missing text has **not** been invented.
- Chapter 1 exercise 1·6 question 6 prints `Je` before a blank, while the source key is `J’habite`. Correct gameplay must handle the `Je` → `J’` elision. The original key is preserved and the item is flagged.
- Publisher answers may not exhaust valid paraphrases; avoid using strict single-string grading for free responses without an editorial review.
- Chapter 26 contains a duplicated/misnumbered exercise marker requiring later visual confirmation.
- This is a machine-audited extraction, not a full manual proofreading certificate for every glyph.

## Copyright and access

This **public repo must contain only tools, documentation, schemas, source references and original example fixtures**. Do not commit original book chapters, images, full exercises, answer keys, or derived private exports. `.gitignore` excludes their expected paths. The private study package is distributed separately for the user's authorized personal use; redistributing substantial book content to other users may require permission.

## Next phase

Do not build React, Supabase or Vercel in Phase A. Phase B may extend the validated chapter 01 pattern to chapters 02–28, with chapter-by-chapter extraction, source review, and reporting. See `docs/content-workflow.md`.
