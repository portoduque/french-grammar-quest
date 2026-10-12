# Content workflow for Antigravity / Codex (private repo)

## Source of truth
- `manifest.json`: mapped book chapter titles, topic identities and PDF page references.
- `chapters/01/theory.md`: first-chapter theory extracted with PDF markers.
- `chapters/01/exercises.json`: first-chapter structured exercise groups and publisher key answers.
- `chapters/01/metadata.json`, `lesson-sequence.json` and `source-pages/`: provenance and completeness audit.
- `schemas/*.schema.json`: normalized content contracts.

## Required workflow
1. Confirm the GitHub repository remains **private** before committing any source-derived text.
2. Never fill missing PDF sections by inference. Mark corrupt or clipped source explicitly.
3. Preserve original chapter order, printed exercise numbers, references to PDF pages, source keys, and stable IDs.
4. For every chapter record: theory headings, explanations, exceptions, examples and tables; group instructions, individual questions, source-page references, publisher answer keys and review flags.
5. Distinguish a *source answer* from a comprehensive list of valid alternate responses.
6. Keep question text and gameplay type independent so React game mechanics can be changed without altering the source corpus.
7. After each chapter, run validation and publish coverage metrics with exceptions listed; no unverified claim of 100% visual fidelity.
8. Do not publish the copyrighted materials through Vercel public assets or unauthenticated Supabase endpoints.

## Phase A validation

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py
python scripts/validate_content.py --private .
```

## Known chapter 1 edge cases
PDF page 28 contains visibly truncated English translation examples in the original file. Exercise 1·6 question 6 requires `Je` → `J’` elision rather than a simple blank fill. Both are tracked without silently changing publisher content.

Phase B is future work; no React or game platform implementation is included.
