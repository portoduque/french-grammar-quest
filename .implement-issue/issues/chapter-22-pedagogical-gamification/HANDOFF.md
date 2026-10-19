# Handoff: Chapter 22 Pedagogical Roadmap & Gamification

- **Issue Key**: `chapter-22-pedagogical-gamification`
- **Semantic State**: `In Review`
- **Current Workspace**: `french-grammar-quest`
- **Validated Completed Work**:
  1. **Análise Rigorosa do Material Base das Imagens em `temp/capitulo 22/`**:
     - Analisadas todas as 6 imagens de conteúdo e o gabarito oficial (`22.1.png` a `22.6.png` e `gabarito.png`).
     - Validação fonética da marca do feminino (-e): o -e final tem como efeito primordial fazer soar a consoante final que era muda no masculino (*grand* [ɡʁɑ̃] ➔ *grande* [ɡʁɑ̃d] ; *français* [fʁɑ̃sɛ] ➔ *française* [fʁɑ̃sɛz]).
     - Validação dos 5 adjetivos com forma alternativa euphonique diante de vogal ou h mudo: *beau/bel/belle*, *nouveau/nouvel/nouvelle*, *vieux/vieil/vieille*, *fou/fol/folle*, *mou/mol/molle*.
     - Validação da regra BANGS (Beauty, Age, Number, Goodness, Size) para os raros adjetivos curtos que precedem o substantivo.
     - Validação dos adjetivos com mudança radical de sentido antes vs depois do nome (*un grand homme* vs *un homme grand* ; *mon ancien directeur* vs *une statue ancienne* ; *notre pauvre chien* vs *des pays pauvres* ; *une sale affaire* vs *une chemise sale*).
     - Validação das regras de cores: simples concordam (*noires, blanches*), derivadas de substantivos são invariáveis (*marron, orange, bordeaux*) e compostas são 100% invariáveis (*bleu marine, vert clair, rose bonbon*).
     - Validação dos comparativos: adjetivos (*plus/moins/aussi... que*) e substantivos (*plus de/moins de/autant de... que* — proibido \*aussi de !).
     - Validação das formas irregulares: *bon ➔ meilleur / le meilleur* (nunca \*plus bon) ; *bien ➔ mieux / le mieux* ; *mauvais ➔ pire*.
  2. **Criação de `src/data/chapter22Data.ts`**:
     - Teoria didática completa e contrastiva escrita sob a ótica de um Professor FLE experiente para lusófonos.
     - 5 tópicos estruturados de acordo com o currículo e manifest.json.
     - 7 séries de exercícios (`ch22-ex01` a `ch22-ex07`) totalizando 55 questões calibradas, com múltiplas alternativas aceitas e explicações didáticas ricas.
     - Mapeamento ideal de motores de gamificação:
       - Ex 22.1: `translation` (Tradução e accord d'adjectifs)
       - Ex 22.2: `fill_blank` (Adjectif logique avec choix par chips)
       - Ex 22.3: `fill_blank` (Transformation au féminin Patrick ➔ Sonia)
       - Ex 22.4: `translation` (Comparatifs et superlatifs en contexte)
       - Ex 22.5: `sentence_rewrite` (Formulation de phrases comparatives +, -, =)
       - Ex 22.6: `translation` (Traduction de synthèse)
       - Ex 22.7: `matching` (Nuances de sens selon la position de l'adjectif)
  3. **Integração no Hook `useTheory.ts`**:
     - Registrado `CH22_FALLBACK_THEORY`, mapeamento de tópicos e séries de exercícios.
  4. **Integração no Hook `useExerciseSet.ts`**:
     - Registradas todas as 7 séries de exercícios e o mapa de 55 questões enriquecidas.
  5. **Aba Astuces FLE no `src/pages/ChapterPage.tsx`**:
     - 6 cartas ilustradas exclusivas com as regras de ouro do capítulo para lusófonos.
  6. **Design Mobile-First e Touch-Friendly**:
     - Chips interativos em `fill_blank` para seleção rápida sem teclado, botões de toque com touch target >= 44px, barra de acentos `AccentToolbar` adaptada sem corte de tela.
  7. **Testes Automatizados & CI**:
     - Testes unitários dedicados em `useTheory.test.tsx`, `useExerciseSet.test.tsx` e `ChapterPage.test.tsx`.
- **Manual Validation Plan**:
  - Salvo em [MANUAL_VALIDATION_PLAN.md](file:///c:/Users/15372896752/Documents/french-grammar-quest/.implement-issue/issues/chapter-22-pedagogical-gamification/MANUAL_VALIDATION_PLAN.md)
- **Next Concrete Action**:
  - Execução das checagens `verify_fast.py` e `verify_ci.py`.
