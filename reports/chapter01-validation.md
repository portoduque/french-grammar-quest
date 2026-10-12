# Chapter 01 — post-screenshot audit and semantic normalization

## Automated coverage

| Check | Result |
|---|---|
| Chapter pages indexed | 17/17, PDF pages 14–30 |
| Original digital text assigned to theory/exercises | 24,378 / 24,378 characters |
| Exercise groups | 10 / 10 |
| Individual source questions | 100 / 100 |
| Publisher answer key associations | 100 / 100 |
| Source prompt/key lock | SHA-256 checked for all 100 question/key pairs |
| Topic taxonomy | 3 macro topics; **13 fine-grained subtopics** |
| Lesson source fragments | **31 unique IDs**, page spans checked for gaps and overlaps |
| Conjugations/vocabulary | Rendered in Markdown tables; original extracted text preserved |
| JSON Schema validation | Both chapter and exercise data checked by GitHub CI |

## Corrections implemented

- Created `theory-source.md` retaining the unchanged Phase A theory extraction; `theory.md` now has paragraphs and semantic tables instead of opaque code blocks.
- Fixed wrapped French/English example pairs on pages 26–27; manually structured visible original text for page 28 and flagged clipped glosses without fabricating missing words.
- Added specific subtopic IDs, ordered page ranges and bidirectional exercise links.
- Replaced ambiguous lesson-fragment IDs with stable unique IDs and explicit page character offsets.
- Added source-aware grading for free translation and explicit presentation for elision (`ch01-ex06-q06`) and informal pronoun override (`ch01-ex10-q06`).
- Strengthened automated checks to catch missing subtopics, altered source question/key text, duplicate fragments or invalid offsets.

## Remaining editorial uncertainty

Automated checks and screenshot comparison **do not certify every word and visual styling** of all 17 source pages. Especially check accents, typographic emphasis and two-column text where reflow occurred. Page 28 includes pre-existing right-column clipping. The source keys are publisher examples, not an exhaustive set of acceptable answers. None of these concerns is silently treated as resolved.

## Scope of completion

The chapter 01 **structured content model and its automated gate** are implemented. Chapter 02–28 have *not* been transcribed; their inventory only is available in `manifest.json`. This phase adds no application.
