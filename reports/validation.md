# Phase A validation and known limitations

## Completed machine-verifiable checks

- 28 distinct ordered chapters with source PDF page ranges 14–385.
- 233 detected exercise-group markers (not 233 individual questions).
- Chapter 01: 17 original pages, 3 primary theory topics, 10 group IDs, 100 numbered question IDs and 100 publisher answer-key associations.
- Source selectable-text length partitioned into theory/exercise spans with no lost characters.
- Source PDF SHA-256 is pinned in metadata for traceability.
- Chapter 1 structured files are now versioned in the private GitHub repository.
- GitHub Actions validates the manifest, chapter corpus and JSON Schemas.

## Explicit limitations

1. PDF page 28's English translation examples are clipped at the original page border; no reconstruction was invented.
2. Exercise 1·6 item 6 requires elision from `Je` to `J’`, matching the publisher key `J’habite`.
3. Publisher answers do not enumerate all acceptable open-response paraphrases.
4. Complete word-by-word human visual comparison of all 17 source pages is **not certified**.
5. Verb-table formatting is source-aligned text pending editorial semantic markup.
6. The duplicated chapter 26 exercise marker requires source-page verification in the next phase.

## Scope

**Phase A:** book-level inventory and fully numbered Chapter 01 private structural pilot. Chapters 02–28 are not converted. No application infrastructure has been created. Private GitHub visibility should be checked before each source content import.
