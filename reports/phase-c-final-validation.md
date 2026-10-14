# Fase C — Auditoria geral e consolidação (28 capítulos)

## Critérios e evidências

| Critério | Resultado | Tipo de verificação |
|---|---:|---|
| Capítulos catalogados | **28/28** | Máquina: manifesto × arquivos × títulos |
| Páginas dos capítulos | **372/372** | Máquina: snapshots por página e rastreamento de offsets |
| Conjuntos de exercícios | **233/233** | Máquina: exercícios × manifesto |
| Questões e respostas da editora | **2.227/2.227** | Máquina: IDs, campos e referências; **não** conferência de correção gramatical |
| Tabelas verbais e glossários | **113/113 páginas** | Máquina: marcadores e trechos extraídos; leiaute não revisado |
| Páginas do gabarito no PDF | **499–527** | Identificadas; associação automática, revisão humana pendente |
| Metadados e títulos dos capítulos | **28/28 corrigidos** | Comparação com manifesto e cabeçalhos |
| Integridade dos contratos JSON | **Verificação em CI** | JSON Schema Draft 2020-12 |
| Comparação com PDF original | **Opcional, com `--pdf`** | SHA-256 + extração por página, não leitura de imagens |
| Revisão editorial visual palavra por palavra | **Não realizada integralmente** | Gate pendente |
| Transformação de todas as tabelas em Markdown semântico | **Pendente** | Leiaute multicoluna de alta ambiguidade |

A execução de `python scripts/audit_phase_c.py --check-report` falha se houver alteração nos totais, IDs, títulos, offsets, esquemas, chaves ou cobertura das páginas. A auditoria **não marca a fase editorial como concluída** enquanto existirem revisões visuais e pedagógicas pendentes.

## Estrutura do livro

- Páginas **1–13**: material introdutório (não convertido em lições).
- Páginas **14–385**: 28 capítulos, incluindo a revisão cumulativa.
- Páginas **386–391**: tabelas de verbos.
- Páginas **392–444**: glossário francês–inglês.
- Páginas **445–498**: glossário inglês–francês.
- Páginas **499–527**: gabarito.

## Anomalias e decisões

1. No capítulo 26, a obra repete um identificador `26·1`. Mantemos a grafia do original e IDs internos distintos.
2. No capítulo 28, o exercício 28·15 apresenta uma numeração repetida. Mantemos número publicado e identificador estável do item.
3. Página 28: parte da coluna de traduções do original aparece cortada; não completar por inferência.
4. Respostas livres e traduções: a resposta do gabarito é **uma resposta de referência**, não a lista exaustiva de soluções corretas.
5. Não converter automaticamente tabelas ambíguas em pares de colunas; preservar os blocos extraídos e revisá-los visualmente.

## Reprodutibilidade

```bash
python -m pip install 'jsonschema>=4.23,<5'
python scripts/validate_content.py --private .
python scripts/validate_phase_b.py
python scripts/audit_phase_c.py --check-report
# Auditar o texto fonte contra o mesmo PDF original, mantido fora do Git:
python -m pip install pymupdf
python scripts/audit_phase_c.py --pdf /caminho/para/livro.pdf --check-report
```

**Gate de máquina:** passível de aprovação pelo CI.
**Gate editorial:** **PENDENTE**. O projeto ainda não deve declarar fidelidade de 100% ao PDF nem estar pronto para correção automática indiscriminada. Ver `docs/editorial-qa-checklist.md`.

## Correção descoberta pela auditoria profunda: 29 enunciados contaminados

A verificação encontrou **29 enunciados** que tinham trechos de explicação teórica anexados, em 15 capítulos (03, 04, 07, 08, 09, 11, 12, 13, 14, 18, 21, 23, 24, 25 e 26). Foram corrigidos para que `question.prompt` contenha somente a pergunta. Cada `source_raw_prompt` foi preservado, e o texto teórico foi recuperado em seções adicionais de `theory.md`, com referência ao exercício.

Os trechos recuperados estão **pendentes de posicionamento editorial na ordem didática do livro e de revisão de tabelas multicolunas**. O esquema registra `editorial_recovery`; os testes verificam a existência das 29 ocorrências e rejeitam novas questões excessivamente longas.

Na auditoria local do PDF, os **2.127 trechos `source_raw_prompt` dos capítulos 02–28** foram encontrados literalmente no texto extraído das páginas. Isso confirma a procedência do texto bruto, não a qualidade do enunciado editado nem a resposta.
