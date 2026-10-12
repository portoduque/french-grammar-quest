# French Grammar Quest — Content Foundation (private repository)

A private, content-first base for a French grammar learning game. **No React frontend, Supabase backend, Vercel deployment or game engine has been implemented.**

## Repository content

- `manifest.json`: 527-page source index, 28 chapters and 233 detected exercise-group markers (chapter 26 includes a duplicate marker).
- `chapters/01/theory.md`: **readable, semantic Markdown**, with French/English conjugation and vocabulary tables, section anchors and PDF page markers.
- `chapters/01/theory-source.md`: **unchanged original Phase A theory text extraction**; treat this as an audit snapshot, not as game UI content.
- `chapters/01/metadata.json`: 3 macro topics + **13 specific subtopics** with IDs and links to relevant exercises.
- `chapters/01/exercises.json`: 10 exercises, **100 source questions and 100 original key entries**, with per-question page references, safe grading policies and individual edge-case notes.
- `chapters/01/lesson-sequence.json`: **31 unique fragments** with page-relative text spans; reconstruct the exact original page text from `source-pages/`.
- `chapters/01/source-pages/`: 17 raw source pages (PDF 14–30); `answer-key-source.txt`: publisher key excerpt.
- `schemas/`, `scripts/`: schemas and invariants, including source/key fingerprints.
- `reports/`: coverage metrics, visual-source limitations and chapter audit.
- `content/archives/phase-a-content.tar.xz`: **historical** baseline ZIP-equivalent from before these fixes; do not treat as the current content source.

## Validate

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py
python scripts/validate_content.py --private .
```

GitHub Actions runs both checks on pull requests. They verify stable IDs, schemas, **exact 100 source questions/keys**, 31 source text spans, 13 subtopics, cross-links, semantic table presence, and special grading exceptions.

## Known editorial limitations

The original PDF page 28 visibly clips some English glosses. Incomplete wording is flagged and never silently completed. The readable theory text was reformatted from raw extraction; **a human word-by-word visual certification is still pending**, so the audit snapshots remain the final reference when something is unclear. Some translations have valid alternatives beyond the publisher's single example.

Exercises requiring special gameplay treatment: 1·6 item 6 (`Je` → `J’`, full answer `J’habite`) and 1·10 item 6 (informal `tu`, overriding the exercise-level `vous` instruction). Free translations use a semantic/manual review policy rather than strict string equality.

## Privacy, copyright and licensing

This repo is **private**. The source textbook and source-derived extracts are copyrighted third-party material. Do **not** make its contents available through public CDN assets, Vercel builds, public Supabase tables or unauthenticated APIs. The repository's open-source license covers only original code and tooling, **not** publisher text; see `NOTICE.md`. Making the repo private does not itself authorize distribution of the textbook to friends.

## Next phase

Use `docs/content-workflow.md` to guide Antigravity/Codex. The next phase is to process chapters 02–28 using this same audited approach, without assuming the remaining chapters are already converted.
