# Plano de Validação Manual — Capítulo 21: Todos os Pronomes (All the pronouns)

Este plano permite verificar visualmente e pedagogicamente todo o conteúdo do Capítulo 21 na aplicação, cobrindo desktop e mobile.

---

## 1. Pré-requisitos
- Executar o servidor de desenvolvimento:
  ```bash
  npm run dev
  ```
- Abrir no navegador (em modo Desktop ou em emulação Mobile via F12 DevTools — iPhone 14 / Pixel 7).

---

## 2. Rota do Capítulo (`/chapters/ch21`)
1. **Cabeçalho & Visão Geral**:
   - Verificar se o título exibe « All the pronouns » e badge « Chapitre 21 ».
   - Verificar as badges de métricas: 📚 5 sujets, 🎯 12 séries, ⚡ 110 questions, 📄 Pages 247–270.
2. **Aba « 📖 Théorie & Règles »**:
   - Rolar pela teoria e checar a clareza e organização dos tópicos:
     - Pronomes sujeitos e tabela comparativa com o português.
     - As 5 facetas do pronome « ON » (indefinido, verdades gerais, nós informal, tu afetivo, passiva).
     - Vocabulário de profissões em tabela estruturada com masculino e feminino.
     - Pronomes COD e a regra de ouro do acordo do particípio passado (*Le journaliste les a prises*).
     - Pronomes COI (*lui* / *leur* unisexe e sem acordo de particípio).
     - Pronomes *y* e *en*.
     - Ordem dos duplos pronomes (diagramas antes do verbo e no imperativo afirmativo).
     - Pronomes tônicos/disjuntos (*C'est... qui* com concordância verbal correta).
     - Tabela do grande dilema FLE: Pessoa vs Coisa com preposições *à* e *de*.
3. **Aba « 👨‍🏫 Astuces FLE »**:
   - Clicar na aba « Astuces FLE » e verificar os 6 cards destacados:
     - Card 1: 🎯 L'Accord du Participe Passé avec le COD Antécédent
     - Card 2: 🎭 Le Duo « Lui » et « Leur » : Unisexe et Invariable
     - Card 3: 👤 Choses vs Personnes : Le Grand Piège de « Y » et « EN »
     - Card 4: 🚦 L'Ordre des Doubles Pronoms : Le Schéma Infaillible
     - Card 5: 👥 Les 5 Visages du Pronom « On »
     - Card 6: ⚡ Mise en Relief : C'est... qui et l'Accord Verbal
4. **Aba « 🎯 Exercices (12) »**:
   - Verificar a listagem completa dos 12 cards de exercícios de `ch21-ex01` a `ch21-ex12`.

---

## 3. Sessões Interativas dos Exercícios (`/exercises/ch21-exXX`)
Testar pelo menos uma questão de cada tipo de interação:

1. **`ch21-ex01` (sentence_rewrite — COD)**:
   - Questão 1: `Elle achète les fleurs bleues.`
   - Digitar `Elle les achète.` e validar.
   - Observar o feedback explicativo e a barra de progresso.
2. **`ch21-ex02` (translation — COD com vous e inversão)**:
   - Questão 1: `He thanks me.`
   - Digitar `Il me remercie.` usando a AccentToolbar se necessário.
3. **`ch21-ex03` (sentence_rewrite — COI lui / leur)**:
   - Questão 1: `La grand-mère a raconté une histoire aux petits-enfants.`
   - Digitar `La grand-mère leur a raconté une histoire.`
4. **`ch21-ex05` (sentence_rewrite — Pronom Y)**:
   - Questão 1: `Elle s'habitue à tout.`
   - Digitar `Elle s'y habitue.`
5. **`ch21-ex06` (sentence_rewrite — Pronom EN)**:
   - Questão 1: `J'ai parlé de tous nos problèmes.`
   - Digitar `J'en ai parlé.`
6. **`ch21-ex07` (matching — Verbes prépositionnels)**:
   - Clicar nas opções A, B, C, D, E para associar `Il a peur` ➔ `des insectes` (e).
   - Verificar que a seleção é tátil, com borda violeta clara e feedback imediato.
7. **`ch21-ex08` (sentence_rewrite — Doubles pronoms)**:
   - Questão 1: `Ne parlez pas de ce détail à Zoé !`
   - Digitar `Ne lui en parlez pas !`
8. **`ch21-ex10` (sentence_rewrite — C'est... qui)**:
   - Questão 1: `Il a gagné le prix.`
   - Digitar `C'est lui qui a gagné le prix.`
   - Questão 2: `Je prendrai la décision.`
   - Digitar `C'est moi qui prendrai la décision.` (verbo na 1ª pessoa).
9. **`ch21-ex11` (translation — Tônicos e pessoas)**:
   - Questão 8: `I am thinking about her.`
   - Digitar `Je pense à elle.`
10. **`ch21-ex12` (fill_blank com Choice Chips — Aussi vs Non plus)**:
    - Questão 1: `Il n'aime pas le froid. Je n'aime pas le froid. ➔ __`
    - Tocar diretamente no chip `Moi non plus.`
    - Verificar que a resposta é preenchida e aceita de forma instantânea e fluida no mobile.

---

## 4. Teste de Responsividade Mobile
- Ativar emulação de tela pequena (360px a 412px de largura).
- Verificar que:
  - Não há rolagem horizontal acidental.
  - O texto não sobrepõe botões nem se corta nas margens.
  - Os botões (chips) têm área de toque confortável (mínimo de 44px de altura).
  - A barra `AccentToolbar` encaixa perfeitamente abaixo dos campos de digitação.
