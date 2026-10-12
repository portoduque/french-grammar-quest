# French Grammar Quest — Content Foundation (Phase A)

This public repository contains **metadata and tools**, not the copyrighted book text. Future app: React/Vite + Supabase + Vercel (not implemented in Phase A).

## Phase A status

- PDF indexed: 527 pages, 28 chapters, 233 exercise-group markers (one duplicate exercise number in chapter 26).
- Chapters and top-level topics inventoried with PDF page ranges.
- Chapter 1 private extraction pilot prepared separately; it has **not** passed full question-by-question or visual validation.
- Schemas and coverage checks in this repository define expected structures for future clean content.
- No game, UI, database or authentication has been implemented.

## Structure

- `manifest.json` — public index of chapter titles, topic headings, page ranges, and exercise group counts.
- `schemas/` — contract for chapter and exercise data.
- `reports/` — audit results and remaining verification tasks.
- `scripts/validate_content.py` — pure-stdlib structural and manifest checks.
- `.gitignore` — excludes private extracted text and source PDFs.

Run: `python scripts/validate_content.py`.

## Copyright and access

The source textbook is copyrighted. **Do not upload the source PDF, full theory, book examples, answers, raw page dumps, or reproduced question sets to this public repository.** Keep those in private local storage (or a separate private repository) and obtain appropriate permission before sharing reproductions with others. This public inventory contains only brief headings and references for traceability.

## Next gate

Phase A is a **partial implementation awaiting editorial approval**: the chapter 1 pilot must still separate theory from exercise text, parse individual questions, link answer keys, and receive page-by-page visual proofreading. Report status must remain explicit until these pass.
