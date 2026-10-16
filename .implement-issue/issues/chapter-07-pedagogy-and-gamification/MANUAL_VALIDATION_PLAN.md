# Plano de Validação Manual — Capítulo 7 : Le Passé Composé

> **Objetivo:** Garantir fidelidade editorial, rigor gramatical FLE para lusófonos, calibração ótima dos motores de jogos e usabilidade mobile perfeita para o Capítulo 7.

---

## 1. Verificação da Teoria Pedagógica e Dicas FLE

1. Navegar até `/chapters/ch07`.
2. Verificar que o título do capítulo exibe:
   * **Título:** *The passé composé*
   * **Mundo:** *Mundo 1: Les Fondations*
   * **Total de Exercícios:** *10 séries (90 questões)*
   * **Tópicos:** *6 tópicos estruturados*
3. Clicar na aba **Théorie** e verificar a presença das seções essenciais:
   - [ ] *Dica do Professor de Francês (FLE) : Regras de Ouro do Passé Composé*
   - [ ] *La Formation Régulière du Participe Passé (-er ➔ -é, -ir ➔ -i, -re ➔ -u)*
   - [ ] *La Négation et l'Interrogation au Passé Composé*
   - [ ] *Le Participe Passé avec AVOIR et l'Accord du C.O.D. Antéposé*
   - [ ] *Les Participes Passés Irréguliers par Familles (-u, -is, -it, -ert, -eint, cas historiques)*
   - [ ] *Le Passé Composé avec ÊTRE (La Maison d'Être)*
   - [ ] *Les Verbes à Double Auxiliaire (Avoir vs Être)*
   - [ ] *Les Verbes Pronominaux au Passé Composé & Accord Réfléchi*
4. Clicar na aba **Astuces FLE** e verificar os 6 cartões interativos:
   - [ ] *La Maison d'Être : Accord avec le Sujet*
   - [ ] *Les 6 Verbes Caméléons : Avoir ou Être ?*
   - [ ] *L'Accord avec AVOIR : La Règle du C.O.D. Antéposé*
   - [ ] *Verbes Pronominaux & Parties du Corps*
   - [ ] *Verbes Réciproques Indirects : JAMAIS d'Accord !*
   - [ ] *Passé Composé vs Portugais : Faux Ami Temporel*

---

## 2. Verificação das 10 Séries de Exercícios

| Série | Nome / Foco | Motor | Itens | Critério de Aceite |
|---|---|---|:---:|---|
| **7.1** | *Verbes réguliers en -er avec avoir* | `fill_blank` | 10 | Aceita elisão *J'ai voyagé* / *J’ai voyagé*, terminações regulares *-é*. |
| **7.2** | *Verbes réguliers en -ir et -re avec avoir* | `fill_blank` | 10 | Particípios em *-i* (*fini, investi*) e *-u* (*attendu, vendu*). |
| **7.3** | *Traduction active vers le français (avoir)* | `translation` | 10 | Aceita *Ils* e *Elles*, pontuação tolerante e apóstrofes retas/curvas. |
| **7.4** | *Participes passés irréguliers fréquents* | `fill_blank` | 10 | Verifica *pris, n'avons pas pu, peint, plu, reçu, fait, mis, ouvert*. |
| **7.5** | *Association logique verbe et complément* | `matching` | 5 | Conexão sem sobreposição (ex: *Elle a conduit ➔ à toute vitesse*). |
| **7.6** | *Passé composé avec être et accords* | `fill_blank` | 10 | Testa inversões (*est-il monté ?*, *est-il parti ?*) e acordos com sujeito (*est tombée, sont descendus*). |
| **7.7** | *Traduction active : avoir ou être* | `translation` | 10 | Testa frases completas como *Nous sommes allés à Paris.* e *Zola est mort en 1902.* |
| **7.8** | *Verbes pronominaux au passé composé* | `fill_blank` | 10 | Testa a ausência de acordo em *se sont écrit* (COI) e *t'es coupé le doigt* (COD posterior). |
| **7.9** | *Verbes à double auxiliaire (avoir vs être)* | `matching` | 5 | 5 pares distinguindo ações com COD (*Elle a sorti les chaises*) vs intransitivas (*Elle est rentrée très tard*). |
| **7.10** | *Traduction de synthèse (pronominaux & double auxiliaire)* | `translation` | 10 | Tradução precisa de *They spent a month in China*, *She took the suitcases down*, *He brushed his teeth*. |

---

## 3. Verificação Mobile-First

1. Abrir ferramentas de desenvolvedor (F12) no Chrome/Safari em emulação de tela mobile (375px e 320px).
2. Navegar por todas as 10 séries.
3. Verificar:
   - [ ] Ausência de barra de rolagem horizontal indesejada (`overflow-x: hidden`).
   - [ ] As cartas de correspondência (`matching`) cabem na largura de 360px sem truncar texto.
   - [ ] Barra de caracteres acentuados flutua sem cobrir botões de ação ou inputs.
   - [ ] Altura mínima de botões e áreas clicáveis >= 44px.
