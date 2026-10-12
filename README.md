# French Grammar Quest — Content Foundation (private repository)

This repository is **private** and contains the Phase A textbook-based content conversion. No React application, Supabase integration, Vercel deployment, or game engine has been implemented.

## Current content

- `manifest.json`: 527-page source inventory, 28 chapters, 233 detected exercise-group markers (a duplicate in chapter 26 is flagged).
- `chapters/01/theory.md`: English-language source theory, extracted and ordered with page references.
- `chapters/01/exercises.json`: 10 groups containing 100 individually identified French-language questions and 100 publisher-key associations.
- `chapters/01/metadata.json`: topics, source-page and exercise relationships.
- `chapters/01/lesson-sequence.json`: ordered theory/exercise source-text partition for audit.
- `chapters/01/source-pages/`: the 17 raw selectable-text source snapshots, PDF pages 14–30.
- `chapters/01/answer-key-source.txt`: source excerpt of chapter-one answer keys.
- `reports/`: inventory, coverage, chapter-one conversion evidence, caveats and remaining editorial checks.
- `content/archives/phase-a-content.tar.xz`: compact backup of the exact original Phase A private package.
- `schemas/`, `scripts/`: JSON contracts and validators.

## Run validation

With Python 3.12:

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py
python scripts/validate_content.py --private .
```

The GitHub Actions job runs both checks for every pull request. The second validates the checked-in chapter 1 corpus. Some checks rely on exact source text and are not proof of human word-by-word proofreading.

## Important exceptions

- The original PDF visually clips some English examples on PDF page 28. Missing wording is not fabricated.
- Exercise 1·6 question 6 needs `Je` → `J’` elision to match the printed `J’habite` answer.
- Alternative grammatically valid free-form answers beyond the publisher keys are not exhaustively enumerated.
- Chapter 26 has a duplicate/misnumbered exercise marker.
- Source-selectable text partition checks do not prove perfect visual fidelity of every PDF graphic or glyph.

## Copyright

The source book is copyrighted. Keep this repository private. **Do not expose source text through a publicly accessible API, Vercel build, public archive, or public Supabase table.** Private repository access is not a substitute for permission to redistribute the book to friends or other users.

## Next development step

Use the existing content contracts to map chapters 02–28 one chapter at a time. First compare the Chapter 01 structured corpus and its documented exceptions against the PDF visually. See `docs/content-workflow.md` for AI coding instructions.
