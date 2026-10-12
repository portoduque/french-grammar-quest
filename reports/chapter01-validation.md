# Phase A — Chapter 01 validation evidence

## Automated audit results

| Check | Result |
|---|---|
| Source pages indexed and stored | **17/17**, PDF pages 14–30 |
| Source selectable-text characters assigned theory/exercises | **24,378/24,378** (100% exact partition) |
| Exercise groups | **10/10** |
| Numbered questions | **100/100**, 10 per group |
| Answer key entries associated | **100/100**, from PDF pages 499–500 |
| Stable unique question IDs | **100/100** |
| Complete theory source fragments preserved | **Yes** |
| Page-level provenance on questions and theory | **Yes** |
| Original book text accidentally released publicly | **No, private package only** |

## Known limitations — must remain explicit

1. **PDF source defect:** the English comparison column on PDF page 28 is visibly truncated at the original page edge. This is not a parser defect. The same partial wording is retained in the private source-derived Markdown; no missing words were fabricated.
2. **Visual fidelity:** page 28 was manually inspected in a rendered image. The structural checks compare digital text, not every graphic or font/formatting detail on all 17 pages. A full human visual proof of all chapter pages is **not certified**.
3. **Source answer ≠ all possible correct answers:** the source key supplies a standard answer, not a complete list of paraphrases. Alternatives beyond explicitly printed 'Ils (Elles)' options require editorial review before strict automatic grading.
4. **Tables:** verb conjugation lists are preserved in source-aligned text/code blocks rather than manually retabulated to avoid transcription errors. App-ready semantic table markup is future editorial work.
5. **Exercise 1·6 question 6:** publisher answer key prints `J’habite` while the blank follows `Je`. The source answer is preserved, and a correct full answer requires elision of `Je` to `J’`; preserve `J’habite` and flag this item for special gameplay rendering.
6. **Topic associations** are based on exercise position in the chapter, and complex cross-topic tags can be added with pedagogical review.

## Gate decision

**Phase A machine-verified content deliverables complete:** first-chapter full text partition, exercises/questions and publisher answer keys are all accounted for. **Pedagogical/visual sign-off is conditional** on a full page-by-page human review and alternate edition for the clipped page 28 translation examples. No missing material is silently treated as verified.
