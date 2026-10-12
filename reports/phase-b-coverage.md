# Phase B — Machine coverage audit

This report is based on selectable-text extraction and answer-key parsing from the PDF. It is **not a signed editorial review of every line or glyph**.

| Chapter | PDF pages | Exercises | Questions | Publisher keys | Theory segments | Gate |
|---|---:|---:|---:|---:|---:|---|
| 02 | 15 | 11 | 110 | 110 | 6 | Machine pass; visual pending |
| 03 | 14 | 11 | 110 | 110 | 5 | Machine pass; visual pending |
| 04 | 13 | 9 | 85 | 85 | 4 | Machine pass; visual pending |
| 05 | 8 | 5 | 45 | 45 | 2 | Machine pass; visual pending |
| 06 | 8 | 6 | 55 | 55 | 4 | Machine pass; visual pending |
| 07 | 14 | 10 | 90 | 90 | 3 | Machine pass; visual pending |
| 08 | 10 | 7 | 70 | 70 | 3 | Machine pass; visual pending |
| 09 | 13 | 8 | 75 | 75 | 3 | Machine pass; visual pending |
| 10 | 8 | 6 | 55 | 55 | 4 | Machine pass; visual pending |
| 11 | 14 | 10 | 90 | 90 | 3 | Machine pass; visual pending |
| 12 | 10 | 6 | 55 | 55 | 2 | Machine pass; visual pending |
| 13 | 15 | 9 | 85 | 85 | 3 | Machine pass; visual pending |
| 14 | 15 | 7 | 70 | 70 | 4 | Machine pass; visual pending |
| 15 | 7 | 3 | 30 | 30 | 2 | Machine pass; visual pending |
| 16 | 8 | 3 | 30 | 30 | 1 | Machine pass; visual pending |
| 17 | 7 | 3 | 30 | 30 | 2 | Machine pass; visual pending |
| 18 | 9 | 4 | 40 | 40 | 2 | Machine pass; visual pending |
| 19 | 7 | 3 | 30 | 30 | 2 | Machine pass; visual pending |
| 20 | 21 | 9 | 90 | 90 | 5 | Machine pass; visual pending |
| 21 | 24 | 12 | 110 | 110 | 6 | Machine pass; visual pending |
| 22 | 12 | 7 | 55 | 55 | 2 | Machine pass; visual pending |
| 23 | 15 | 9 | 82 | 82 | 3 | Machine pass; visual pending |
| 24 | 15 | 9 | 85 | 85 | 4 | Machine pass; visual pending |
| 25 | 13 | 8 | 80 | 80 | 4 | Machine pass; visual pending |
| 26 | 13 | 8 | 80 | 80 | 5 | Machine pass; visual pending |
| 27 | 14 | 5 | 45 | 45 | 5 | Machine pass; visual pending |
| 28 | 33 | 35 | 345 | 345 | 1 | Machine pass; visual pending |

**Totals:** 27 chapters, 355 source pages, 223 exercises, **2,127 questions**, 2,127 publisher-key entries. Including Chapter 1: **28 chapters, 233 exercises, 2,227 questions/keys**.

## Validation gates

- PDF SHA-256 checked against the Phase A source file.
- Every extracted chapter source page retained; original source-text character streams reconstruct exactly from ordered fragment offsets.
- 100% detected numbered questions have corresponding publisher key strings.
- Group and item IDs are unique, and question counts match chapter metadata.
- 7 ambiguous numbering boundaries corrected with explicit author/editor logs.
- Editorial review **remains pending**, especially all semantic tables and lines clipped in the PDF source.
- Source-extracted Markdown is a working draft. Some table columns remain code-formatted pending glyph-by-glyph comparisons.

## Known source anomalies

- Chapter 26 contains two printed EXERCICE 26·1 group labels; the third group is indexed internally as `ch26-ex03` using the publisher answer key 26-3.
- Exercise 28-15 repeats printed question number 4 instead of 5; internally the fifth question is indexed `q05` and the key is `28-15` item 5.
- Exercise 2-5 printed question 10 without punctuation in the text extraction.
- PDF page 28 (Chapter 1) has visually clipped English glosses; other later pages can also contain clipped text.

**Go/no-go:** Structural machine gate PASSED; final editorial fidelity gate PENDING. The package can be used for further validation, but do not claim the human-proven source is perfect.
