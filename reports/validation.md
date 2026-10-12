# Validation record — Phase A

## Verified automatically

- 28 uniquely numbered chapter records, contiguous chapter page ranges from PDF page 14 through 385.
- 233 chapter exercise-group markers, including known chapter 26 duplicate marker.
- Source PDF SHA-256 recorded in manifest for reproducibility.
- All 10 chapter 1 exercise groups detected; full text of 17 source pages retained in separate **private** package.
- Contract JSON syntactically valid and manifest can be checked by `scripts/validate_content.py`.

## Not yet verified / blockers

1. Complete page-by-page visual comparison of chapter 1 extraction, especially layout and accents.
2. Detailed segmentation of chapter 1 theory/examples versus exercise statements.
3. Question-level JSON and per-question source page references.
4. Alignment of each answer to exact answer-key entry, including acceptable alternatives.
5. Full 28-chapter subtopic/exercise cross-links and audit of glossaries/tables.
6. The numbering anomaly in chapter 26 requires original-page confirmation.

**Approval recommendation:** do not mark Phase A complete until these gates are met; the public scaffolding can be merged without representing it as a completed conversion.
