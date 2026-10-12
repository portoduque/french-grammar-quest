# French Grammar Quest — Content Foundation (private repository)

A private, content-first base for a French grammar learning game. **No React frontend, Supabase backend, Vercel deployment or game engine has been implemented.**

## Product planning — complete PRD

- **[PRD completo — especificação do French Grammar Quest](docs/PRD.md)**: visão, personas, 73 requisitos, 28 mundos, UX, motor de jogos, pedagogia, auth, banco, segurança, XP e critérios de aceite.
- **[Plano de implementação e testes](docs/PRD-IMPLEMENTATION-PLAN.md)**: roadmap, dependências, histórias, 30 cenários de teste e instruções para Antigravity/Codex.
- **[Mapa de conteúdo e jogos por capítulo](docs/PRD-CONTENT-MAP.md)**: títulos, 233 conjuntos de exercícios, 2.227 questões, referências e pendências.

**Importante:** esses documentos são planejamento, não implementação. A revisão editorial integral e a autorização de compartilhamento do livro permanecem pendentes.

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


## Phase B — Chapters 02–28 (machine-mapped, editorial review pending)

Phase B adds `chapters/02/` through `chapters/28/` and `references/`:
- 27 additional chapters, 355 PDF chapter pages.
- 223 additional exercise groups; **2,127 questions and 2,127 publisher key entries**, for an overall total of **2,227 questions in 233 groups** including chapter 01.
- All source-page text snapshots, ordering and per-page offset metadata retained for lossless digital-text reconstruction.
- Source-based draft Markdown theory, JSON exercises and metadata, publisher-key excerpts, verb tables, and both dictionaries/glossaries.
- `scripts/validate_phase_b.py` and `reports/phase-b-coverage.md` hold automated evidence and known exceptions.

**Critical quality note:** The source material has been accounted for by machine extraction, but **theory formatting and word-by-word visual editorial review are not complete**. Parts of the theory remain in literal text blocks instead of fully structured Markdown tables; unusual source line wraps and clipped text require manual inspection before use as app-ready lessons or strict answer grading. Consult the source page snapshots and the report. Do not mislabel this corpus as editorially certified.

```bash
python scripts/validate_phase_b.py
```

The Phase B corpus is in this **private** Git repository; keep book material and answers out of public deployments. The historical Phase A archive is not the current source of truth.

## Phase C — Cross-chapter quality gate (implemented)

Phase C adds title corrections for chapters 02–28; an independent whole-book auditor, `scripts/audit_phase_c.py`; deterministic evidence in `reports/phase-c-machine-audit.json`; and the final review and AI handoff guides.

```bash
python scripts/audit_phase_c.py --check-report
# Optional: check against the *exact original PDF*, never commit it:
python -m pip install pymupdf
python scripts/audit_phase_c.py --pdf /private/path/original.pdf --check-report
```

The CI runs this alongside the Phase A and Phase B validators. It verifies 28 chapter titles, 372 chapter pages, 233 exercise sets, 2,227 individually identified prompts and publisher-key entries, and 113 reference pages. **It does not certify word-by-word visual fidelity, the semantic correctness of every extracted question/answer, or complete Markdown table conversion.** See `reports/phase-c-final-validation.md` and `docs/editorial-qa-checklist.md`.

For future Antigravity/Codex work use `docs/ai-integration-guide.md`. The **editorial gate is still pending**, and no game system was implemented in Phase C.

### Fase C — Reparos de fronteira entre teoria e exercícios

A auditoria encontrou e corrigiu **29 prompts de questões** que incluíam explicações teóricas após o fim da pergunta. Seus enunciados foram limpos e os textos recuperados aparecem nos respectivos `theory.md`, com sinalização para revisão editorial. `source_raw_prompt` e `answer.source_key` foram preservados. Os testes impedem regressões detectáveis desse tipo.

A realocação fina na sequência pedagógica e a reconstrução de tabelas continuam pendentes de revisão visual; o gate editorial **não** foi aprovado.
