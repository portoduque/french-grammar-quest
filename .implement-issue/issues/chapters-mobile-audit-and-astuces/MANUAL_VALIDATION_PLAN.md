# Plano de Validação Manual: Responsividade Mobile (316x568) e Pedagogia FLE das Astuces

## 1. Identificação da Issue
- **Chave da Issue**: `chapters-mobile-audit-and-astuces`
- **Ambiente de Teste**: Navegador Chrome/Edge Mobile DevTools em modo responsivo com dimensões exatas **316 x 568** (ou iPhone SE ultra-compacto).
- **Estado Semântico**: `In Review`

---

## 2. Pré-requisitos
1. Servidor local ativo (`npm run dev` ou `npm run preview` em `http://localhost:5173` ou `http://localhost:4173`), ou ambiente de produção Vercel após deploy.
2. Abrir o DevTools (F12) ➔ Ativar emulação de dispositivo ➔ Definir resolução: **316 x 568**.
3. Fazer login como Estudante Démo (`Entrer comme Étudiant (Démo)` na tela de login).

---

## 3. Roteiro de Testes Passo a Passo

### Cenário 1: Trilha de Aprendizado (`/chapters`) em 316x568
1. Acesse `/chapters`.
2. **Verificações Visuais e de Layout**:
   - [ ] Barra Superior (`.top-status-bar`): As vidas (❤️ 5), ofensiva (🔥 3), XP (⭐ 150) e o botão de tema (☀️/🌙) devem caber perfeitamente sem ultrapassar a margem direita nem gerar barra de rolagem horizontal.
   - [ ] Alternador de Visão (`.view-toggle`): Os botões "🗺️ Trilha Sinuosa" e "📋 Lista por Mundos" devem dividir a largura harmonicamente (50%/50%) sem truncar nem quebrar feio.
   - [ ] Trilha Sinuosa (`.learning-path-snake`): O nó ativo com badge flutuante "Commencer" deve ficar centralizado perfeitamente sobre a bolinha do nó.
   - [ ] Barra Inferior (`.mobile-nav`): Os 4 ícones (Home, Learn, Review, Profile) devem ter altura de toque confortável (>= 48px) e alinhamento equidistante.
   - [ ] **Teste de Scroll Horizontal**: Tente arrastar a página lateralmente. A tela deve permanecer travada horizontalmente (zero scroll lateral).

### Cenário 2: Lista por Mundos (`/chapters`) em 316x568
1. Na tela `/chapters`, clique em **"📋 Lista por Mundos"**.
2. **Verificações**:
   - [ ] Campo de busca "Buscar capítulos ou mundos..." deve preencher 100% da largura com margens adequadas.
   - [ ] Banners dos Mundos 1 a 5 devem exibir título, descrição e badge sem sobreposição.
   - [ ] Cards de capítulos devem empilhar de forma fluida, exibindo título, número de séries e páginas legíveis.

### Cenário 3: Navegação de Capítulos e Rigor Didático FLE nas Astuces
1. Acesse o **Chapitre 01** (`/chapters/ch01`).
2. **Aba "Théorie"**:
   - [ ] Título hero ("The present tense of regular -er verbs") quebra linha suavemente sem estourar a tela.
   - [ ] As 4 tags/badges de metadados envolvem naturalmente sem overflow.
   - [ ] Os 3 botões de abas possuem altura de toque de 44px e padding balanceado.
   - [ ] A tabela de conjugação possui scroll horizontal suave interno (`.theory-table-wrapper`) sem afetar o corpo da página.
3. **Aba "Astuces"**:
   - [ ] Clique na aba **"👨‍🏫 Astuces"**.
   - [ ] Verifique os 6 cards de dicas pedagógicas:
     - **Card 1 (Les Terminaisons Muettes)**: O parágrafo explicativo está em **português claro e didático**, explicando que as desinências *-e, -es, -ent* são estritamente mudas e que *ils parlent* soa como *il parle*.
     - **Card 2 (L'Élision Obligatoire)**: Explicação em português sobre o hiato e a elisão de *je* para *j'*.
     - **Card 3 (La Liaison Euphonique)**: Explicação em português do som [z] contínuo.
     - **Card 4 (Le Pronom « On »)**: Explicação em português comparando com o nosso 'a gente'.
     - **Card 5 (Ajustements Euphoniques)**: Explicação em português sobre o uso de cedilha em *-cer* e *e* mudo em *-ger*.
     - **Card 6 (L'Action Continue avec « Depuis »)**: Explicação em português contrastando com 'moro há 3 anos' e o uso mandatório do presente do indicativo no francês.
   - [ ] Os cards não ultrapassam a tela de 316px e não causam scroll horizontal.

4. **Verificação de Amostragem em Outros Capítulos**:
   - [ ] Acesse o **Chapitre 02** (`/chapters/ch02`) ➔ Aba Astuces: explicações dos verbos em *-ir*, inversão com *-t-* e regra do *ni... ni...* em português.
   - [ ] Acesse o **Chapitre 20** (`/chapters/ch20`) ➔ Aba Astuces: explicações do artigo partitivo obrigatório (*du, de la, des*) e regra do *de* na negação em português.
   - [ ] Acesse o **Chapitre 24** (`/chapters/ch24`) ➔ Aba Astuces: explicações da fronteira *Qui* (sujeito) vs *Que* (objeto) em português.
   - [ ] Acesse o **Chapitre 27** (`/chapters/ch27`) ➔ Aba Astuces: explicação da inversão do verbo *Manquer* em português.
   - [ ] Acesse o **Chapitre 28** (`/chapters/ch28`) ➔ Aba Astuces: fórmula matemática da ordem dos pronomes em português.

---

## 4. Evidências Automatizadas Coletadas
- **Playwright Crawler 316x568 Inicial (Vercel Live)**: 86 overflows horizontais mapeados e 15 capítulos com explicações em francês documentados em `.implement-issue/issues/chapters-mobile-audit-and-astuces/LIVE_AUDIT_REPORT.json`.
- **Playwright Crawler 316x568 Pós-Ajustes (Local Preview)**: Documentado em `.implement-issue/issues/chapters-mobile-audit-and-astuces/POST_FIX_AUDIT_REPORT.json`.
  - `docScrollWidth: 316` e `bodyScrollWidth: 316` em 100% das páginas auditadas (zero overflow no documento).
  - 100% dos 28 capítulos validados com dicas FLE em português didático.
- **Screenshots Mobile 316x568 Capturados**:
  - `screenshot_fixed_snake_316px.png` (Trilha Sinuosa)
  - `screenshot_fixed_grid_316px.png` (Lista por Mundos)
  - `screenshot_ch01_astuces_fixed_316px.png` (Capítulo 1 e Aba Astuces)
- **Suite de Testes Unitários**: 24 arquivos de teste / 419 testes aprovados (Vitest).
- **Verificação Rápida do Projeto (`verify_fast.py`)**: 7 verificações rápidas passaram com sucesso.
