# Plano de Validação Manual — Capítulo 6: Les Verbes Pronominaux

## 1. Contexto e Objetivos

O **Capítulo 6** estrutura o aprendizado dos **verbos pronominais** da língua francesa, cobrindo:
1. Verbos reflexivos (*se lever, se laver, se couper les cheveux*).
2. Verbos recíprocos (*s'aimer, s'écrire, se parler*).
3. Verbos pronominais de sentido passivo (*ça ne se dit pas, comment ça se traduit*).
4. Verbos essencialmente pronominais e idiomáticos (*s'en aller, se souvenir, se rendre compte, s'apercevoir*).
5. O imperativo afirmativo (*Lève-toi !*) e negativo (*Ne te couche pas !*).
6. A regra de ouro da concordância reflexiva do infinitivo (*J'aime me promener*).

---

## 2. Matriz Pedagógica FLE e Motores de Jogo

| Série | Foco Gramatical | Qtd | Motor | Critério de Aceite Pedagógico FLE |
| :--- | :--- | :---: | :---: | :--- |
| **6.1** | Verbes Réfléchis au Présent | 10 | `fill_blank` | Fixação dos pronomes *me, te, se, nous, vous, se* e elisão *m', t', s'* diante de vogal ou *h* mudo. |
| **6.2** | Verbes Réciproques au Présent | 10 | `fill_blank` | Treino da ação mútua em sujeitos estritamente no plural (*nous, vous, ils/elles*). |
| **6.3** | Verbes Subjectifs / Idiomatiques | 10 | `fill_blank` | Uso correto de verbos essencialmente pronominais (*s'aperçoit, t'attends, me rends compte, se trompes*). |
| **6.4** | Accord Réfléchi à l'Infinitif | 10 | `fill_blank` | Aplicação da regra de ouro: o pronome concorda com o sujeito mesmo quando o verbo está no infinitivo. |
| **6.5** | Correspondance Sémantique | 5 | `matching` | Desafio de correspondência conectando premissas de contexto aos equivalentes pronominais. |
| **6.6** | Thème / Traduction Active | 10 | `translation` | Produção ativa cobrindo imperativo (*Lève-toi !*), recíprocos, reflexivos e passado recente. |

---

## 3. Roteiro de Testes Passo a Passo (Desktop e Mobile)

### Pré-requisito
Inicie a aplicação localmente:
```bash
npm run dev
```
Acesse: `http://localhost:5173/chapters/ch06`

### Teste 1: Roteiro Teórico Didático (Aba "Théorie")
1. [ ] Conferir o cabeçalho: *Pronominal verbs* (Páginas 81–88, 5 tópicos, 6 séries de exercícios, 55 questões).
2. [ ] Ler a teoria e confirmar:
   - Tabela de conjugação completa de *se lever* no presente.
   - A regra de desaquisição do possessivo redundante para partes do corpo (*se laver les mains*).
   - As 4 categorias bem explicadas (reflexivos, recíprocos, passivos e subjetivos).
   - A conjugação do imperativo afirmativo com hífen e *toi* vs imperativo negativo com *te*.
   - A regra de ouro da concordância reflexiva quando o verbo está no infinitivo.
   - Vocabulário do corpo humano.
3. [ ] Conferir os 6 cards interativos de **Astuces FLE** na aba de dicas:
   - *Corps Humain : Pas de Possessif Redondant !*
   - *Verbes Réciproques : Uniquement au Pluriel*
   - *Pronominaux Passifs : Les Incontournables*
   - *Verbes Essentiellement Pronominaux*
   - *L'Impératif : « Lève-toi ! » vs « Ne te couche pas ! »*
   - *La Règle d'Or à l'Infinitif : L'Accord Réfléchi*

### Teste 2: Série 6.1 — Verbos Reflexivos (`fill_blank`)
1. [ ] Acessar `/exercises/ch06-ex01`.
2. [ ] Na Q1 (*Je (s'habiller)...*), digitar `m'habille` ➔ Feedback positivo e explicação FLE.
3. [ ] Na Q2 (*Nous (se lever)...*), digitar `nous levons`.

### Teste 3: Série 6.2 — Verbos Recíprocos (`fill_blank`)
1. [ ] Acessar `/exercises/ch06-ex02`.
2. [ ] Na Q1 (*Ils (se marier)...*), digitar `se marient`.
3. [ ] Na Q3 (*Nous (s'écrire)...*), digitar `nous écrivons`.

### Teste 4: Série 6.3 — Verbos Subjetivos (`fill_blank`)
1. [ ] Acessar `/exercises/ch06-ex03`.
2. [ ] Na Q1 (*Elle (s'apercevoir)...*), digitar `s'aperçoit` (usar a tecla `ç` da `AccentToolbar`).
3. [ ] Na Q6 (*Je (se rendre compte)...*), digitar `me rends compte`.

### Teste 5: Série 6.4 — Infinitivo com Pronome Acordado (`fill_blank`)
1. [ ] Acessar `/exercises/ch06-ex04`.
2. [ ] Na Q1 (*J'aime (se promener)...*), digitar `me promener`.
3. [ ] Na Q2 (*À quelle heure est-ce que tu vas (se lever)...*), digitar `te lever`.
4. [ ] Na Q3 (*Nous venons de (se rendre compte)...*), digitar `nous rendre compte`.

### Teste 6: Série 6.5 — Correspondência Semântica (`matching`)
1. [ ] Acessar `/exercises/ch06-ex05`.
2. [ ] Associar os pares:
   - *Ils sont toujours ensemble.* ➔ *e. Ils s'aiment.*
   - *Ils communiquent sans cesse.* ➔ *a. Ils s'écrivent.*
   - *Ils s'attendent au pire.* ➔ *d. Ils sont pessimistes.*
   - *Ils se promènent.* ➔ *c. Ils aiment marcher.*
   - *Ils ne se parlent jamais.* ➔ *b. Ils se détestent.*

### Teste 7: Série 6.6 — Thème / Tradução Ativa (`translation`)
1. [ ] Acessar `/exercises/ch06-ex06`.
2. [ ] Na Q1 (*Get up!*), digitar: `Lève-toi !`.
3. [ ] Na Q3 (*She cuts her hair.*), digitar: `Elle se coupe les cheveux.`.
4. [ ] Na Q7 (*They just got married.*), digitar: `Ils viennent de se marier.`.

### Teste 8: Usabilidade Mobile Touch
1. [ ] No DevTools em modo móvel (375px a 430px), verificar que nenhum elemento tem scroll horizontal.
2. [ ] Testar botões da barra de acentos com toque confortável (mínimo 44px).
