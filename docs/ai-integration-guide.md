# Guia de integração para Antigravity e Codex

Este repositório é uma **base de conteúdo**, não um aplicativo. Não adicionar React, Supabase ou Vercel durante as Fases A–C sem solicitação explícita.

## Arquivos autoritativos

- `manifest.json`: títulos oficiais e faixas de páginas dos 28 capítulos.
- `chapters/NN/metadata.json`: título, tópicos, subtópicos e relações com exercícios.
- `chapters/NN/theory.md`: teoria formatada; **capítulos 02–27 ainda contêm blocos textuais que requerem revisão**.
- `chapters/NN/theory-source.md`: extração imutável para conferir divergências.
- `chapters/NN/exercises.json`: instruções, enunciados, gabaritos publicados, tipos e regras de avaliação.
- `chapters/NN/lesson-sequence.json` + `source-pages/`: offsets e texto-fonte para auditoria.
- `references/`: tabelas e glossários; **não presumir colunas semanticamente corretas**.
- `reports/phase-c-machine-audit.json`: relatório gerado por validações; `reports/phase-c-final-validation.md`: interpretação e pendências.

## Regras de desenvolvimento

1. Use **inglês como língua de instrução e francês como objetivo**, conforme a fonte; não traduzir automaticamente para português.
2. Não separe a questão de sua referência `id`, `pdf_pages`, `source_raw_prompt`, `answer.source_key`.
3. Para jogos, preservar a habilidade realmente cobrada: conjugação, tradução, reescrita, associação e resposta aberta.
4. Não confiar em comparação de strings para respostas livres; antes de avaliar, consultar `grading_policy` e casos especiais.
5. Revisar visualmente tabelas e exemplos do PDF antes de usá-los como material publicado no jogo.
6. Manter dados de livro fora de bundles públicos, páginas estáticas abertas e APIs sem autenticação. Repositório privado não substitui autorização para redistribuição.
7. Executar e aprovar o CI; alterações ao conteúdo exigem documentação das diferenças em `reports/`.
8. Não marcar `visual_gate` como PASS apenas porque `machine_gate` passou.

## Testes

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py --private .
python scripts/validate_phase_b.py
python scripts/audit_phase_c.py --check-report
```

Para certificar integridade contra o **arquivo exato** usado na conversão:

```bash
python -m pip install pymupdf
python scripts/audit_phase_c.py --pdf /path/to/original.pdf --check-report
```

O comando com `--pdf` verifica SHA e texto extraível; não substitui análise humana da imagem, formatação ou correção gramatical.

## Recuperação de teoria após questões (Fase C)

**29 questões tiveram parágrafos teóricos incorporados indevidamente ao `prompt` pelo parser inicial.** O `prompt` foi reparado para uso em jogos; o texto teórico removido foi preservado em uma seção `Source theory recovered from exercise-boundary parsing` do `theory.md` correspondente. O campo `editorial_recovery` na questão registra a intervenção, sem modificar `source_raw_prompt` ou `answer.source_key`.

**Antes de exibir a teoria a estudantes**, as seções recuperadas devem ser inseridas no ponto pedagógico adequado e confrontadas com a imagem de origem. Não as considerar revisadas apenas porque passaram no CI.
