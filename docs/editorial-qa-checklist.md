# Revisão editorial manual — procedimentos e registro

## Objetivo

Validar **fidelidade visual, completude pedagógica e correspondência dos gabaritos**, separadamente da mera integridade de arquivos. A revisão precisa ser feita com o **PDF original e os arquivos Markdown/JSON lado a lado**.

Para cada capítulo:

1. Conferir cada página do PDF dentro da faixa indicada no `metadata.json` e cada tópico/subtópico visível.
2. Comparar explicações, exceções, tabelas conjugativas, vocabulários, notas, símbolos tipográficos, negritos pedagógicos, aspas e acentos franceses.
3. Confirmar a sequência original de cada conjunto de exercícios, número de questões, linhas de resposta e alternativas; verificar se nenhum trecho teórico entrou no enunciado.
4. Verificar as respostas diretamente com o gabarito publicado, item por item. Identificar casos com múltiplas respostas, concordância, elisão, `tu`/`vous` e frases abertas.
5. Reformatar **somente** tabelas cujas linhas e colunas possam ser conferidas no PDF. Preservar `theory-source.md` como referência; não inventar conteúdo ilegível.
6. Registrar anomalias, página, trecho, severidade, evidência e resolução (ou motivo de pendência).
7. Após correção, executar `validate_content.py`, `validate_phase_b.py` e `audit_phase_c.py --check-report`.

## Registro por capítulo

| Campo | Valor requerido |
|---|---|
| Capítulo | 01–28 |
| Páginas verificadas visualmente | N/N, com intervalo |
| Teoria e tabelas | reviewed / blocked |
| Exercícios e questões | reviewed / blocked |
| Gabarito e alternativas | reviewed / blocked |
| Problemas resolvidos | Links para commits/PR |
| Problemas em aberto | Explicação + páginas |
| Gate editorial | **PASS** somente com 100% conferido |

**Nenhum capítulo de 02–28 recebeu aqui uma certificação de revisão visual integral.** Os dados existentes constituem um rascunho de extração rastreável, e devem permanecer assim classificados.

## Materiais complementares

Os 113 páginas de tabelas e glossários também exigem revisão de cada coluna e pareamento bilíngue. As 29 páginas do gabarito exigem revisão de correspondência item a item. Não converter blocos compactados em tabela sem inspeção visual.

## Fim da fase

A base estará editorialmente pronta somente quando os 28 capítulos e todas as referências tiverem registro de verificação completo, sem pendências bloqueantes. Teste automatizado **não** equivale a aprovação editorial.
