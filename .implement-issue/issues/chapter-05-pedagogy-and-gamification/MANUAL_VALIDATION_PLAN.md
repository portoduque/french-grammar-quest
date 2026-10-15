# Plano de Validação Manual — Capítulo 5: Devoir et ses Multiples Facettes

## 1. Contexto e Objetivos

O **Capítulo 5** aborda o verbo irregular **devoir** (com seus 4 usos semânticos: dívida, obrigação, probabilidade e conselho atenuado), as expressões impessoais **il y a** e **il s'agit de**, e a família de verbos em **-eindre** e **-aindre** (*peindre*, *craindre*, *plaindre*, *feindre*).

Este plano detalha o roteiro de testes para validação pedagógica FLE e calibração de gamificação do fluxo do aluno (teoria ➔ exercícios), com ênfase na responsividade móvel.

---

## 2. Matriz Pedagógica FLE e Motores de Jogo

| Série | Foco Gramatical | Qtd | Motor | Critério de Aceite Pedagógico FLE |
| :--- | :--- | :---: | :---: | :--- |
| **5.1** | Conjugação de *Devoir* ao Presente | 10 | `fill_blank` | Fixação dos radicais *dois*, *doit*, *devons*, *devez*, *doivent* e negação encadeada *ne doivent pas*. |
| **5.2** | Tradução Ativa de *Devoir* | 10 | `translation` | Produção de frases com *vous* e *est-ce que*, pontuação e flexibilidade de apóstrofos (`d'`/`d’`). |
| **5.3** | Nuances de *Devoir* (Dívida / Obrigação / Suposição) | 5 | `matching` | Correspondência semântica entre premissas contextuais e deduções com *devoir*. |
| **5.4** | Verbos em *-eindre* e *-aindre* ao Presente | 10 | `fill_blank` | Treino da terminação *-s, -s, -t* no singulier e do grupo nasal palatal *-gn-* no plural (*craignons*, *feignez*, *se plaint*). |
| **5.5** | Thème : *Il y a*, *Il s'agit de* e verbos em *-ndre* | 10 | `translation` | Estrutura impessoal invariável (*Il y a*), sujeito neutro estrito (*Dans ce livre, il s'agit de*) e formas interrogativas com *tu*. |

---

## 3. Roteiro de Testes Passo a Passo (Desktop e Mobile)

### Pré-requisito
Execute a aplicação localmente:
```bash
npm run dev
```
Acesse: `http://localhost:5173/chapters/ch05`

### Teste 1: Roteiro Teórico Didático (Aba "Théorie")
1. [ ] Verificar se o título e o cabeçalho exibem: *Devoir and its many facets* (Páginas 73–80, 4 tópicos, 5 séries de exercícios, 45 questões).
2. [ ] Ler a teoria estruturada e verificar a presença de:
   - Tabela de conjugação fonética com a distinção do som /dwa/ (singulier) e /dwav/ (*doivent*).
   - As 4 facetas semânticas de *devoir* (Dívida, Obrigação, Probabilidade, Conselho ao condicional).
   - O aviso didático sobre o falso amigo *ne pas devoir* (interdição estrita e não "não precisar").
   - A invariabilidade absoluta de *il y a*.
   - A regra de ouro de *il s'agit de* (sujeito neutro obrigatório).
   - A alternância morfológica dos verbos em *-eindre/-aindre* com aparição de *-gn-*.
3. [ ] Conferir os 6 cards interativos de **Astuces FLE** na aba de dicas:
   - *Les 4 Facettes de « Devoir »*
   - *Faux-Ami : « Ne pas devoir » = Interdiction !*
   - *« Il y a » : Invariable en Toutes Circonstances !*
   - *« Il s'agit de » : Le Sujet Impersonnel Fixe*
   - *Verbes en -eindre et -aindre : L'Insolite Son « GN »*
   - *Le Conseil Poli : « Vous devriez »*

### Teste 2: Série 5.1 — Conjugação de Devoir (`fill_blank`)
1. [ ] Clicar no botão da série 5.1 ou na aba de exercícios.
2. [ ] Digitar `doit` na Q1 (*Elle doit prévenir sa mère.*) e submeter ➔ Feedback positivo e explicação FLE.
3. [ ] Digitar `ne doivent pas` na Q5 (*Ils ne doivent pas arriver avant dimanche.*) ➔ Verificar se a frase inteira aceita a locução negativa.

### Teste 3: Série 5.2 — Tradução Ativa (`translation`)
1. [ ] Acessar `/exercises/ch05-ex02`.
2. [ ] Na Q1 (*You must cook tonight.*), digitar: `Vous devez faire la cuisine ce soir.` ➔ Validar acerto.
3. [ ] Na Q2 (*She must not work today.*), testar tanto com apóstrofo reto (`aujourd'hui`) quanto tipográfico (`aujourd’hui`).
4. [ ] Na Q9 (*You should call Vincent.*), testar o condicional cortês: `Vous devriez appeler Vincent.`

### Teste 4: Série 5.3 — Correspondência Semântica (`matching`)
1. [ ] Acessar `/exercises/ch05-ex03`.
2. [ ] Conectar os pares arrastando ou clicando nas alternativas:
   - *Elle a des dettes.* ➔ *Elle doit de l'argent.* (e)
   - *Elle n'est pas morte.* ➔ *Elle doit la vie à son médecin.* (a)
   - *Elle va peut-être voyager.* ➔ *Elle doit partir en vacances.* (d)
   - *Elle a des invités.* ➔ *Elle doit faire la cuisine.* (c)
   - *Elle hésite encore.* ➔ *Elle doit être prudente.* (b)
3. [ ] Concluir o exercício e conferir pontuação de gamificação (XP, moedas e streaks).

### Teste 5: Série 5.4 — Verbos em -eindre e -aindre (`fill_blank`)
1. [ ] Acessar `/exercises/ch05-ex04`.
2. [ ] Testar a forma singular: *Elle (craindre)* ➔ digitar `craint`.
3. [ ] Testar a forma plural com -gn-: *Ils (plaindre)* ➔ digitar `plaignent`.
4. [ ] Testar a forma pronominal: *Elle (se plaindre)* ➔ digitar `se plaint`.

### Teste 6: Série 5.5 — Thème / Tradução Global (`translation`)
1. [ ] Acessar `/exercises/ch05-ex05`.
2. [ ] Na Q2 (*There is a dog in the car.*), digitar: `Il y a un chien dans la voiture.`.
3. [ ] Na Q4 (*This book is about the French president.*), digitar: `Dans ce livre, il s'agit du président français.`.
4. [ ] Na Q10 (*It's a matter of passion.*), digitar: `Il s'agit de passion.`.

### Teste 7: Experiência Mobile Touch (Viewport 375px–414px)
1. [ ] Ativar a emulação móvel no DevTools (ex.: iPhone SE ou Galaxy S20).
2. [ ] Testar os botões da barra de acentos (`AccentToolbar`): verificar se todos os caracteres (`é, è, ê, à, ç, œ`) têm área de toque confortável (mínimo 44px).
3. [ ] Verificar se nenhum texto ou campo de entrada transborda lateralmente (zero scroll horizontal).
