# Handoff: Chapter 19 Pedagogical Roadmap & Gamification

- **Issue Key**: `chapter-19-pedagogical-gamification`
- **Semantic State**: `In Review`
- **Current Workspace**: `french-grammar-quest`
- **Validated Completed Work**:
  1. **Análise Rigorosa do Material Base das Imagens em `temp/capitulo 19/`**:
     - Analisou `19.1.png`, `19.2.png`, `19.3.png`, `19.4.png` e `gabarito.png`.
     - Validou as regras essenciais do modo imperativo: derivação do presente do indicativo para as 3 pessoas (`tu`, `nous`, `vous`), queda obrigatória do `-s` no `tu` para verbos do 1º grupo em `-er` (*parler*, *regarder*, *acheter*, *inviter*), manutenção do `-s` para verbos em `-ir` e `-re`, e a regra eufônica de retorno do `-s` diante dos pronomes adverbiais *y* e *en* (*Vas-y !*, *Manges-en !*).
     - Validou os 4 verbos irregulares fundamentais derivados do subjonctif: *être* (`sois, soyons, soyez`), *avoir* (`aie, ayons, ayez`), *savoir* (`sache, sachons, sachez`) e *vouloir* (`veuillez`).
     - Validou o comportamento dos verbos pronominais: no afirmativo, verbo + hífen + pronome tônico (`moi`/`toi`), enquanto no negativo o pronome volta para antes do verbo (`ne te ... pas`) sem hífen.
     - Validou o léxico administrativo oficial de estado civil e documentos (*nom, prénom, surnom, carte d'identité, passeport, permis de conduire, extrait de naissance, signer, cocher*).
  2. **Criação de `src/data/chapter19Data.ts`**:
     - Elaborou teoria didática completa sob a ótica de um Professor de Francês (FLE) experiente e educador para lusófonos (tabelas comparativas com português e inglês, contrastes gramaticais, dicas fonéticas, callouts de alerta pedagógico e os 6 Commandements FLE pour Lusophones).
     - Implementou as 3 séries completas (`ch19-ex01`, `ch19-ex02`, `ch19-ex03`) totalizando 30 questões com gabarito alinhado 100% às imagens e `gabarito.png`, incluindo suporte a variações tipográficas de apóstrofo (`'`, `’`), pontuação flexível, maiúsculas/minúsculas e tokens interativos para mobile.
     - Redigiu explicações pedagógicas formativas individuais para cada uma das 30 questões.
  3. **Integração no Hook `useTheory.ts`**:
     - Importou e configurou `CH19_FALLBACK_THEORY` com 3 tópicos curriculares, 3 séries de exercícios e markdown completo.
  4. **Integração no Hook `useExerciseSet.ts`**:
     - Conectou as 3 séries (`ch19-ex01`, `ch19-ex02`, `ch19-ex03`) aos motores de gamificação adequados (`sentence_rewrite` para transformação direta e pronominais; `translation` para tradução temática ativa).
  5. **Atualização do Sumário de Capítulos em `src/data/chaptersSummary.ts`**:
     - Atualizou `topicsCount: 3` no resumo do Capítulo 19.
  6. **Astuces FLE Exclusivas no `src/pages/ChapterPage.tsx`**:
     - Adicionou deck dedicado de 6 cartas de dicas pedagógicas com emojis e exemplos visuais na aba "Astuces FLE" do Capítulo 19.
  7. **Testes Automatizados de Regressão e Validação**:
     - Adicionou suites de testes dedicadas ao Capítulo 19 em `src/hooks/useTheory.test.tsx`, `src/hooks/useExerciseSet.test.tsx` e `src/pages/ChapterPage.test.tsx`.
     - Executou `python scripts/verify_fast.py`: **7 verificações passaram com 305 testes unitários verdes**.
     - Executou `python scripts/verify_ci.py`: **9 verificações passaram com build de produção Vite gerado com sucesso**.
- **Manual Validation Plan**:
  - Salvo em [MANUAL_VALIDATION_PLAN.md](file:///c:/Users/15372896752/Documents/french-grammar-quest/.implement-issue/issues/chapter-19-pedagogical-gamification/MANUAL_VALIDATION_PLAN.md)
- **Next Concrete Action**:
  - Validação manual pelo usuário das rotas `/chapters/ch19` e exercícios `/exercises/ch19-ex01` a `ch19-ex03` em ambiente desktop e mobile.
