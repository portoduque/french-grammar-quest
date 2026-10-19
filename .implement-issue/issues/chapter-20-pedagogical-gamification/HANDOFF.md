# Handoff: Chapter 20 Pedagogical Roadmap & Gamification

- **Issue Key**: `chapter-20-pedagogical-gamification`
- **Semantic State**: `In Review`
- **Current Workspace**: `french-grammar-quest`
- **Validated Completed Work**:
  1. **Análise Rigorosa do Material Base das Imagens em `temp/capitulo 20/`**:
     - Analisou `20.1.png` a `20.11.png` e `gabarito.png`.
     - Validou as regras dos artigos partitivos (`du`, `de la`, `de l'`, `des`) e o contraste fundamental com o português (onde usamos zero artigo para indemonstráveis).
     - Validou a regra da negação direta (`de` / `d'`) e a exceção clássica do verbo *être* (*Ce n'est pas du vin*).
     - Validou os sufixos de gênero (masculinos como *-age*, *-ment*, *-eau*, *-isme*; femininos como *-tion*, *-sion*, *-té*, *-ence*) e suas exceções gramaticais.
     - Validou os homônimos de gênero (*le livre* vs *la livre*, *le tour* vs *la tour*, *le mémoire* vs *la mémoire*, *le poêle* vs *la poêle*, *le voile* vs *la voile*).
     - Validou as preposições geográficas com países e cidades: destino (*en*, *au*, *aux*, *à*) e procedência (*de*, *d'*, *du*, *des*).
  2. **Criação de `src/data/chapter20Data.ts`**:
     - Teoria didática e comparativa completa sob a ótica de um Professor FLE, com tabelas comparativas e os 7 Mandamentos FLE para Lusófonos.
     - 6 tópicos estruturados de acordo com o currículo de referência.
     - 9 séries completas (`ch20-ex01` a `ch20-ex09`) com 90 questões calibradas e explicações formativas.
  3. **Integração no Hook `useTheory.ts`**:
     - Registrou fallback e tópicos para o Capítulo 20.
  4. **Integração no Hook `useExerciseSet.ts`**:
     - Registrou todas as 9 séries com seus tipos de interação (`fill_blank`, `sentence_rewrite`, `ordering`, `translation`).
  5. **Melhorias de Mobile e Touch-First**:
     - Implementação de quick choice chips em `FillBlankInteraction.tsx` e estilos responsivos em `src/index.css` (área de toque >= 44px, wrap fluido, sem transbordamento).
  6. **Aba Astuces FLE no `src/pages/ChapterPage.tsx`**:
     - 6 cartas ilustradas com as principais armadilhas e regras de ouro do capítulo.
  7. **Testes Automatizados & CI**:
     - Testes unitários dedicados em `useTheory.test.tsx`, `useExerciseSet.test.tsx` e `ChapterPage.test.tsx`.
     - `python scripts/verify_fast.py` e `python scripts/verify_ci.py` 100% aprovados (318 testes unitários passando, 0 erros).
- **Manual Validation Plan**:
  - Salvo em [MANUAL_VALIDATION_PLAN.md](file:///c:/Users/15372896752/Documents/french-grammar-quest/.implement-issue/issues/chapter-20-pedagogical-gamification/MANUAL_VALIDATION_PLAN.md)
- **Next Concrete Action**:
  - Validação interativa pelo usuário das rotas `/chapters/ch20` e dos 9 exercícios `/exercises/ch20-ex01` a `ch20-ex09`.
