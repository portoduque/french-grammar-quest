# Handoff: Chapter 21 Pedagogical Roadmap & Gamification

- **Issue Key**: `chapter-21-pedagogical-gamification`
- **Semantic State**: `In Review`
- **Current Workspace**: `french-grammar-quest`
- **Validated Completed Work**:
  1. **Análise Rigorosa do Material Base das Imagens em `temp/capitulo 21/`**:
     - Analisou todas as 12 imagens (`21.1.png` a `21.12.png`) e o gabarito oficial (`gabarito.png`).
     - Validou as regras dos pronomes sujeitos e o papel facetado de *« on »* (indefinido, generalização cultural, nós coloquial, tu afetivo, voz passiva).
     - Validou a lista completa de vocabulário de profissões e seus respectivos gêneros.
     - Validou os pronomes de objeto direto (COD: *me, te, le, la, nous, vous, les*) e a **regra de ouro da concordância do particípio passado** no *passé composé* com o COD anteposto (*Le journaliste les a prises*, *Elle les a appelés*).
     - Validou os pronomes de objeto indireto (COI: *me, te, lui, nous, vous, leur*), sua neutralidade de gênero (*lui* para ele e para ela), invariabilidade (*leur* sem -s) e a **ausência de concordância do particípio passado**.
     - Validou os pronomes adverbiais *« y »* (inanimados em *à* e lugares) e *« en »* (inanimados em *de* e quantidades).
     - Validou a regra máxima de distinção **PESSOA vs COISA com *à* e *de***:
       - *Penser à un livre* ➔ *J'y pense* (coisa) vs *Penser à une amie* ➔ *Je pense à elle* (pessoa, jamais *\*j'y pense* nem *\*je lui pense*).
       - *Parler d'un film* ➔ *J'en parle* (coisa) vs *Parler d'un professeur* ➔ *Je parle de lui* (pessoa, jamais *\*j'en parle*).
     - Validou a ordem dos pronomes duplos antes do verbo conjugado (`me/te/se/nous/vous` ➔ `le/la/les` ➔ `lui/leur` ➔ `y` ➔ `en`) e no imperativo afirmativo (*Verbe - COD - COI - y - en*).
     - Validou os pronomes tônicos/disjuntos (*moi, toi, lui, elle, soi, nous, vous, eux, elles*), a concordância na clivagem *« C'est... qui »* (*C'est moi qui ai...*, *C'est toi qui as...*), e as respostas curtas com *aussi* e *non plus*.
  2. **Criação de `src/data/chapter21Data.ts`**:
     - Teoria didática completa e contrastiva escrita sob a ótica de um Professor FLE experiente para lusófonos, com tabelas mnemônicas e avisos pedagógicos.
     - 5 tópicos estruturados de acordo com o currículo e manifest.json.
     - 12 séries de exercícios (`ch21-ex01` a `ch21-ex12`) com todas as 110 questões calibradas, variações de digitação (aspas curvas e retas, pontuação, maiúsculas) e explicações pedagógicas ricas.
     - Mapeamento ideal de motores de gamificação:
       - Ex 21.1: `sentence_rewrite` (COD)
       - Ex 21.2: `translation` (Tradução com inversão)
       - Ex 21.3: `sentence_rewrite` (COI lui/leur)
       - Ex 21.4: `translation` (COI tu e imperativo)
       - Ex 21.5: `sentence_rewrite` (Pronom Y)
       - Ex 21.6: `sentence_rewrite` (Pronom EN)
       - Ex 21.7: `matching` (Correspondência interativa de colunas com opções A-E)
       - Ex 21.8: `sentence_rewrite` (Ordem dos duplos pronomes e acordos)
       - Ex 21.9: `translation` (Tradução de duplos pronomes, Y e EN)
       - Ex 21.10: `sentence_rewrite` (C'est... qui com tônicos)
       - Ex 21.11: `translation` (Tônicos e distinção pessoa vs coisa)
       - Ex 21.12: `fill_blank` (Réponses courtes com botões táteis de escolha rápida / chips)
  3. **Integração no Hook `useTheory.ts`**:
     - Registrou fallback e markdown completo para `ch21`.
  4. **Integração no Hook `useExerciseSet.ts`**:
     - Registrou todas as 12 séries e o fallback map com `CHAPTER_21_QUESTIONS_MAP`.
  5. **Aba Astuces FLE no `src/pages/ChapterPage.tsx`**:
     - 6 cartas ilustradas exclusivas com as regras de ouro do capítulo para lusófonos.
  6. **Design Mobile-First e Touch-Friendly**:
     - Suporte a botões de toque rápido (chips em fill_blank, cards em matching), touch targets >= 44px, AccentToolbar acessível em dispositivos móveis sem sobreposição de conteúdo.
  7. **Testes Automatizados & CI**:
     - Testes unitários dedicados em `useTheory.test.tsx`, `useExerciseSet.test.tsx` e `ChapterPage.test.tsx`.
- **Manual Validation Plan**:
  - Salvo em [MANUAL_VALIDATION_PLAN.md](file:///c:/Users/15372896752/Documents/french-grammar-quest/.implement-issue/issues/chapter-21-pedagogical-gamification/MANUAL_VALIDATION_PLAN.md)
- **Next Concrete Action**:
  - Validação manual pelo usuário das rotas `/chapters/ch21` e dos exercícios `/exercises/ch21-ex01` a `ch21-ex12`.
