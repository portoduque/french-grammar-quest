# Phase A validation evidence and residual risks

## Verified

1. Book manifest: 28 chapters, contiguous PDF chapter ranges 14–385, 233 exercise markers, and chapter-26 duplicate marker recorded.
2. Chapter 1: **17 original pages** (PDF 14–30); source text divided into theory/exercise spans with 100% character coverage against extracted page text.
3. Exactly 10 exercise groups and **100 numbered questions** extracted; all have stable IDs, text, source PDF pages and a publisher-key answer.
4. Answer key 1-1 through 1-10 is drawn from PDF pages 499–500; ten source answers associated to every group.
5. Original English as explanation language and French target language maintained; no translation into Portuguese.
6. Fenced verb and vocabulary columns in `theory.md` preserve the original extracted layout pending future semantic-table markup.
7. The independent validator runs in both public-manifest and private-pilot modes; private mode also checks draft-2020-12 JSON Schemas when `jsonschema` is installed.
8. Public PR content excludes copyrighted source PDF, source page text, complete chapter theory, questions and answer keys.

## Important exceptions

- **PDF page 28 source defect:** English glosses visibly extend beyond the right edge and are clipped in the original PDF rendering. The unavailable parts are not inferred or silently repaired.
- **Exercise 1·6 item 6:** the publisher key lists `J’habite`, but the item displays `Je` followed by a single blank. Machine-readable accepted slot form is `habite`, with the publisher text and exception preserved.
- **Translation flexibility:** publisher keys are reference responses, not exhaustive sets of valid grammatical alternatives. Some alternatives explicitly printed for gender are represented, but others need editorial review.
- **Visual proofing:** all machine-readable text is accounted for, but no full word-by-word human comparison of all 17 rendered pages is certified.
- **Chapter 26:** duplicate `26·1` marker needs verification before Phase B.

## Scope distinction

The Phase A acceptance gate applies to **metadata for all 28 chapters** and a **fully numbered private pilot for chapter 01**. It does **not** mean chapters 02–28 are individually converted or validated. No frontend, backend, game engine, database or hosting was implemented.
