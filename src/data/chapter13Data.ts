import { Topic, ExerciseSet, Question } from '@/types/database';

export const CHAPTER_13_THEORY_MARKDOWN = `# Chapter 13 — The present subjunctive and the past subjunctive

> ### 💡 Dica do Professor de Francês (FLE) : O Segredo do Subjuntivo em Francês
> 1. **O que é verdadeiramente o Subjuntivo ?** :
>    - O subjuntivo não é um simples tempo verbal, mas sim um **MODO** (le mode du doute, du sentiment, de la volonté et de la subjectivité).
>    - Enquanto o **Indicatif** expressa a realidade, a certeza e os fatos objetivos (*Je sais qu'il vient*), o **Subjonctif** expressa o olhar subjetivo do locutor sobre a ação: desejo, necessidade, receio, dúvida ou julgamento moral (*Il faut qu'il vienne*, *J'ai peur qu'il ne vienne pas*).
>    - Em português também temos o subjuntivo (*que eu fale, que tu comas*), mas o francês possui regras muito mais estritas e sistemáticas quanto às conjunções e locuções que o regem.
> 2. **A Regra de Ouro dos Radicais no Presente do Subjuntivo** :
>    - **Para je, tu, il/elle/on, ils/elles** ➔ Pega-se o radical da **3ª pessoa do plural do presente do indicativo** (*ils/elles*) e retira-se a terminação **-ent**.
>      - *Ils pens-ent* ➔ que je **pense**, que tu **penses**, qu'il **pense**, qu'ils **pensent**.
>      - *Ils finiss-ent* ➔ que je **finisse**, que tu **finisses**, qu'il **finisse**, qu'ils **finissent**.
>      - *Ils mett-ent* ➔ que je **mette**, que tu **mettes**, qu'il **mette**, qu'ils **mettent**.
>    - **Para nous e vous** ➔ Pega-se o radical da **1ª pessoa do plural do presente do indicativo** (*nous*) sem **-ons** (ou seja, é idêntico ao **imparfait**!).
>      - *Nous pens-ons* ➔ que nous **pensions**, que vous **pensiez**.
>      - *Nous finiss-ons* ➔ que nous **finissions**, que vous **finissiez**.
>    - **Terminações Universais do Subjuntivo** : sempre **-e, -es, -e, -ions, -iez, -ent** (para qualquer grupo de verbos!).
> 3. **Verbos com Duplo Radical (Atenção às Pessoas Nous e Vous !)** :
>    - *Aller* : que j'**aille**, que tu **ailles**, qu'il **aille**, qu'ils **aillent** MAIS que nous **allions**, que vous **alliez**.
>    - *Vouloir* : que je **veuille**, que tu **veuilles**, qu'il **veuille**, qu'ils **veuillent** MAIS que nous **voulions**, que vous **vouliez**.
>    - *Prendre* : que je **prenne**, que tu **prennes**, qu'il **prenne**, qu'ils **prennent** MAIS que nous **prenions**, que vous **preniez**.
>    - *Boire* : que je **boive** MAIS que nous **buvions**, que vous **buviez**.
> 4. **Os 5 Grandes Irregulares Indispensáveis** :
>    - **Être** : que je *sois*, tu *sois*, il *soit*, nous *soyons*, vous *soyez*, ils *soient*.
>    - **Avoir** : que j'*aie*, tu *aies*, il *ait*, nous *ayons*, vous *ayez*, ils *aient*.
>    - **Faire** : que je *fasse*, tu *fasses*, il *fasse*, nous *fassions*, vous *fassiez*, ils *fassent*.
>    - **Pouvoir** : que je *puisse*, tu *puisses*, il *puisse*, nous *puissions*, vous *puissiez*, ils *puissent*.
>    - **Savoir** : que je *sache*, tu *saches*, il *sache*, nous *sachions*, vous *sachiez*, ils *sachent*.
> 5. **O Duel Didático : Indicativo vs Subjuntivo** :
>    - Verbos de pensamento (*penser*, *croire*) na forma afirmativa levam **INDICATIVO**: *Je pense qu'elle **a** raison.*
>    - Na forma negativa ou interrogativa com dúvida, exigem **SUBJUNTIVO**: *Je ne pense pas qu'elle **ait** raison.*
>    - Expressões de certeza (*il est certain, il est évident, il est sûr, il est vrai*) ➔ **INDICATIVO**.
>    - Expressões de necessidade, possibilidade ou sentimento (*il faut que, il est possible que, il est dommage que, il vaut mieux que*) ➔ **SUBJUNTIVO**.
>    - A locução *Il me semble que* toma **INDICATIVO** (*Il me semble que vous vous trompez*), enquanto *Il semble que* toma **SUBJUNTIVO**!
> 6. **O Subjonctif Passé : Anterioridade Temporal** :
>    - Formação : *Avoir* ou *Être* no subjuntivo presente + Particípio Passado.
>    - *Je suis ravi que tu **aies pu** venir avec nous.* (Estou radiante por você ter conseguido vir conosco).
>    - *Il est content que nous **soyons partis**.* (Ele está contente que tenhamos partido).

---

## 1. Formation du Présent du Subjonctif

Pour la grande majorité des verbes, le présent du subjonctif se forme à partir de **deux bases** tirées du présent de l'indicatif :

| Personne | Base du Radical | Terminaison | Exemple : Penser | Exemple : Finir | Exemple : Mettre |
|---|---|---|---|---|---|
| **Je** | Radical de *ils/elles* | **-e** | que je pens**e** | que je finiss**e** | que je mett**e** |
| **Tu** | Radical de *ils/elles* | **-es** | que tu pens**es** | que tu finiss**es** | que tu mett**es** |
| **Il / Elle / On** | Radical de *ils/elles* | **-e** | qu'il pens**e** | qu'elle finiss**e** | qu'on mett**e** |
| **Nous** | Radical de *nous* (imparfait) | **-ions** | que nous pens**ions** | que nous finiss**ions** | que nous mett**ions** |
| **Vous** | Radical de *nous* (imparfait) | **-iez** | que vous pens**iez** | que vous finiss**iez** | que vous mett**iez** |
| **Ils / Elles** | Radical de *ils/elles* | **-ent** | qu'ils pens**ent** | qu'elles finiss**ent** | qu'ils mett**ent** |

> **Remarque phonétique essentielle** :
> Les formes de *je, tu, il/elle/on, ils/elles* se prononcent toutes **de la même manière** !
> Seules les formes *nous* (-ions) et *vous* (-iez) se distinguent à l'oreille.

---

## 2. Les Verbes Totalement Irréguliers

Cinq verbes majeurs ont des radicaux spéciaux qu'il convient de mémoriser rigoureusement :

### Être & Avoir
| Personne | Être | Avoir |
|---|---|---|
| **Je** | que je **sois** | que j'**aie** |
| **Tu** | que tu **sois** | que tu **aies** |
| **Il / Elle / On** | qu'il **soit** | qu'elle **ait** |
| **Nous** | que nous **soyons** | que nous **ayons** |
| **Vous** | que vous **soyez** | que vous **ayez** |
| **Ils / Elles** | qu'ils **soient** | qu'elles **aient** |

### Pouvoir, Savoir & Faire
| Personne | Pouvoir (*puiss-*) | Savoir (*sach-*) | Faire (*fass-*) |
|---|---|---|---|
| **Je** | que je **puisse** | que je **sache** | que je **fasse** |
| **Tu** | que tu **puisses** | que tu **saches** | que tu **fasses** |
| **Il / Elle / On** | qu'il **puisse** | qu'elle **sache** | qu'on **fasse** |
| **Nous** | que nous **puissions** | que nous **sachions** | que nous **fassions** |
| **Vous** | que vous **puissiez** | que vous **sachiez** | que vous **fassiez** |
| **Ils / Elles** | qu'ils **puissent** | qu'elles **sachent** | qu'ils **fassent** |

### Verbes à deux radicaux (Aller & Vouloir)
- **Aller** : que j'**aille**, tu **ailles**, il **aille**, ils **aillent** / que nous **allions**, vous **alliez**.
- **Vouloir** : que je **veuille**, tu **veuilles**, il **veuille**, ils **veuillent** / que nous **voulions**, vous **vouliez**.

---

## 3. Les Emplois Majeurs du Subjonctif

Le subjonctif s'emploie principalement dans les propositions subordonnées introduites par **que** lorsque le sujet de la proposition principale est différent de celui de la subordonnée :

### A. La Volonté, le Désir, l'Ordre et la Préférence
- *Je veux acheter cet ordinateur.* (Même sujet ➔ infinitif).
- *Je veux **que tu achètes** cet ordinateur.* (Sujets différents ➔ subjonctif).
- *Elle préfère **que tout le monde soit** là avant de commencer.*
- *J'exige **que vous arriviez** à l'heure.*
- *Sa mère aimerait mieux **qu'elle ne sorte pas** ce soir.*

### B. Le Sentiment, l'Émotion et le Regret
- *Je suis content **que tu viennes** dimanche.*
- *Elle est heureuse **qu'il puisse** étudier le français.*
- *Nous sommes ravis **que vous acceptiez** notre offre.*
- *Il est dommage **que vous vendiez** votre maison.*
- *J'ai peur **que ces logiciels ne soient pas** compatibles.*

### C. Le Doute, l'Incertitude et la Négation
- *Je doute **qu'il comprenne** vos questions.*
- *Le juge ne croit pas **qu'il dise** la vérité.*
- *Elle ne pense pas **qu'il sache** ce qu'il fait.*

---

## 4. Expressions Impersonnelles : Indicatif vs Subjonctif

Certaines expressions impersonnelles énoncent une certitude (indicatif), tandis que d'autres énoncent une appréciation, une possibilité ou une nécessité (subjonctif) :

| Expressions suivies de l'INDICATIF (Certitude) | Expressions suivies du SUBJONCTIF (Doute / Nécessité / Sentiment) |
|---|---|
| **Il est certain que** (é certo que) | **Il faut que** (é preciso que / é necessário que) |
| **Il est sûr que** (é seguro que) | **Il est possible que** (é possível que) |
| **Il est évident que** (é evidente que) | **Il est essentiel que** (é essencial que) |
| **Il est vrai que** (é verdade que) | **Il est indispensable que** (é indispensável que) |
| **Il est probable que** (é provável que) | **Il vaut mieux que** (é melhor que) |
| **Il me semble que** (parece-me que) | **Il est étrange / bizarre que** (é estranho que) |
| **Il est clair que** (está claro que) | **Il est regrettable / dommage que** (é lamentável que) |

---

## 5. Les Conjonctions Exigeant le Subjonctif

Certaines conjonctions de subordination introduisent obligatoirement le subjonctif :

- **But / Finalité** : *afin que*, *pour que* (*Elle a un blog pour que ses lecteurs donnent leurs avis*).
- **Temps (Antériorité)** : *avant que*, *en attendant que*, *jusqu'à ce que* (*Appelez-nous avant que nous allions en France !*).
- **Condition / Hypothèse** : *à condition que*, *pourvu que*, *à moins que* (*Je t'aiderai à condition que tu me fasses une faveur*).
- **Concession / Opposition** : *bien que*, *quoique* (*Bien qu'il soit fatigué, il lit le journal*).
- **Crainte** : *de peur que*, *de crainte que* (*Elle reste chez elle de peur qu'il y ait une tempête*).
- **Négation / Absence** : *sans que* (*Il est parti sans que nous le sachions*).

---

## 6. L'Expression « Pourvu que » et les Superlatifs

### A. « Pourvu que »
1. En proposition subordonnée : signifie *provided that* / contanto que (*Il viendra pourvu qu'il ait son après-midi*).
2. En proposition isolée : exprime un souhait fervent, l'équivalent de *« Tomara que... ! »* ou *« Queira Deus que... ! »* :
   - *Pourvu qu'il ait raison !* (Tomara que ele tenha razão !).
   - *Pourvu qu'il puisse venir !* (Tomara que ele possa vir !).

### B. Après un Superlatif ou Adjectif d'Unicité
Le subjonctif s'emploie après *le plus, le moins, le meilleur, le pire, le seul, l'unique, le premier, le dernier* pour exprimer une appréciation subjective :
- *C'est la plus belle ville que je **connaisse**.*
- *C'est le seul logiciel qui **puisse** vous aider.*

---

## 7. Le Passé du Subjonctif (Le Subjonctif Passé)

Le subjonctif passé s'emploie pour marquer l'**antériorité** par rapport au verbe principal :

$$\textbf{Auxiliaire AVOIR ou ÊTRE au présent du subjonctif} + \textbf{Participe Passé}$$

- Avec **Avoir** : *que j'aie lu*, *que tu aies compris*, *qu'il ait fini*, *que nous ayons dit*, *que vous ayez pu*, *qu'ils aient vu*.
- Avec **Être** (verbes de mouvement et pronominaux) : *que je sois venu(e)*, *que nous soyons parti(e)s*, *que Laurent se soit marié*.

### Exemples Didactiques
- *Je suis content que tu **aies réussi** ton examen.* (L'examen a déjà été réussi dans le passé).
- *Il est douteux qu'ils **soient allés** en Patagonie.*
- *Il est incroyable que vous **n'ayez pas su** la réponse.*

---

## 8. Vocabulaire Thématique : L'Informatique et le Monde Numérique

Le chapitre 13 intègre le lexique informatique indispensable pour comprendre et réussir les exercices :

| Terme Français | Genre | Traduction Portugais | Équivalent Anglais |
|---|---|---|---|
| **un ordinateur** | nom masculin | um computador | a computer |
| **une tablette** | nom féminin | um tablet | a tablet |
| **une souris** | nom féminin | um mouse | a mouse |
| **un clavier** | nom masculin | um teclado | a keyboard |
| **une touche** | nom féminin | uma tecla | a key (on keyboard) |
| **un écran** | nom masculin | uma tela / monitor | a screen |
| **un fichier** | nom masculin | um arquivo / ficheiro | a file |
| **un logiciel** | nom masculin | um software / programa | a software program |
| **un mot de passe** | nom masculin | uma senha | a password |
| **une page d'accueil** | nom féminin | uma página inicial / home page | a home page |
| **un site Web** | nom masculin | um site / sítio Web | a website |
| **la Toile** | nom féminin | a Web / a rede | the Web |
| **une base de données** | nom féminin | um banco de dados | a database |
| **une banque de données** | nom féminin | um banco de dados | a data bank |
| **un disque dur** | nom masculin | um disco rígido / HD | a hard drive |
| **une imprimante** | nom féminin | uma impressora | a printer |
| **un(e) internaute** | nom masculin/féminin | um(a) internauta | an Internet surfer |
| **l'informatique** | nom féminin | a informática | computer science |
| **numérique** | adjectif | digital / numérico | digital |
| **cliquer** | verbe | clicar | to click |
| **numériser** | verbe | digitalizar | to digitize |
| **sauvegarder** | verbe | salvar / fazer backup | to save |
| **télécharger** | verbe | baixar / fazer download | to download |
| **imprimer** | verbe | imprimir | to print |
| **appuyer** | verbe | pressionar / apertar | to press |
| **effacer** | verbe | apagar / deletar | to erase |
| **se connecter** | verbe | conectar-se / fazer login | to log on |
| **copier et coller** | expression | copiar e colar | to cut and paste |
| **surfer sur Internet** | expression | navegar na Internet | to surf the Net |
| **IA** | nom féminin | IA (Inteligência Artificial) | AI (Artificial Intelligence) |
`;

export const CHAPTER_13_TOPICS: Topic[] = [
  {
    "id": "ch13-t01",
    "chapter_id": "ch13",
    "order_index": 1,
    "title": "Formation du présent du subjonctif : réguliers et irréguliers",
    "rule_summary": "Radical de ils/elles au présent pour je, tu, il, ils; radical de nous (imparfait) pour nous et vous. Terminaisons : -e, -es, -e, -ions, -iez, -ent.",
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-t02",
    "chapter_id": "ch13",
    "order_index": 2,
    "title": "Emplois du subjonctif : volonté, émotion, doute et expressions impersonnelles",
    "rule_summary": "Employer le subjonctif après la volonté (vouloir que), le sentiment (être content que), le doute (douter que) et les tournures impersonnelles de nécessité ou possibilité (il faut que, il est possible que).",
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-t03",
    "chapter_id": "ch13",
    "order_index": 3,
    "title": "Conjonctions, Pourvu que et superlatifs relatifs",
    "rule_summary": "Subjonctif après afin que, avant que, bien que, à condition que, de peur que, ainsi qu'après pourvu que et les superlatifs (le seul qui, la plus belle que).",
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-t04",
    "chapter_id": "ch13",
    "order_index": 4,
    "title": "Le passé du subjonctif : formation, antériorité et concordances",
    "rule_summary": "Subjonctif présent de avoir ou être + participe passé pour exprimer une action antérieure dans la proposition subordonnée.",
    "created_at": "2026-03-30T10:00:00.000Z"
  }
];

export const CHAPTER_13_EXERCISE_SETS: ExerciseSet[] = [
  {
    "id": "ch13-ex01",
    "chapter_id": "ch13",
    "order_index": 1,
    "title": "Exercice 13.1 — Verbes de volonté, émotion et doute",
    "instruction": "Mettre les verbes entre parenthèses au subjonctif présent.",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex02",
    "chapter_id": "ch13",
    "order_index": 2,
    "title": "Exercice 13.2 — Expressions impersonnelles et nécessité",
    "instruction": "Mettre les propositions subordonnées au subjonctif présent.",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex03",
    "chapter_id": "ch13",
    "order_index": 3,
    "title": "Exercice 13.3 — Conjonctions de subordination",
    "instruction": "Mettre les verbes entre parenthèses au subjonctif après les conjonctions.",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex04",
    "chapter_id": "ch13",
    "order_index": 4,
    "title": "Exercice 13.4 — Indicatif ou subjonctif ? (Le duel didactique)",
    "instruction": "Choisir le bon mode : indicatif (certitude/constatation) ou subjonctif (volonté/émotion/doute).",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex05",
    "chapter_id": "ch13",
    "order_index": 5,
    "title": "Exercice 13.5 — Subordonnées complexes et nuances",
    "instruction": "Mettre les propositions subordonnées au mode convenable (subjonctif ou indicatif).",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex06",
    "chapter_id": "ch13",
    "order_index": 6,
    "title": "Exercice 13.6 — Thème actif du subjonctif (vers le français)",
    "instruction": "Traduire les phrases en français en utilisant vous et les structures du subjonctif.",
    "interaction_type": "translation",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex07",
    "chapter_id": "ch13",
    "order_index": 7,
    "title": "Exercice 13.7 — Conjugaison au passé du subjonctif",
    "instruction": "Mettre les verbes entre parenthèses au passé du subjonctif (auxiliaire + participe passé).",
    "interaction_type": "fill_blank",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex08",
    "chapter_id": "ch13",
    "order_index": 8,
    "title": "Exercice 13.8 — Transformation du présent au passé du subjonctif",
    "instruction": "Transformer la proposition subordonnée du présent vers le passé du subjonctif.",
    "interaction_type": "sentence_rewrite",
    "questions_count": 10,
    "created_at": "2026-03-30T10:00:00.000Z"
  },
  {
    "id": "ch13-ex09",
    "chapter_id": "ch13",
    "order_index": 9,
    "title": "Exercice 13.9 — Correspondance des propositions logiques",
    "instruction": "Faire correspondre chaque amorce de proposition avec sa suite logique.",
    "interaction_type": "matching",
    "questions_count": 5,
    "created_at": "2026-03-30T10:00:00.000Z"
  }
];

export const CHAPTER_13_QUESTIONS_MAP: Record<string, Question[]> = {
  "ch13-ex01": [
    {
      "id": "ch13-ex01-q01",
      "exercise_set_id": "ch13-ex01",
      "order_index": 1,
      "prompt": "Elle préfère que tout le monde (être) __ là avant de commencer.",
      "instruction": "Mettre le verbe être au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "soit"
      ],
      "explanation": "Après un verbe de préférence (préférer que), le subjonctif est obligatoire : le verbe être à la 3e personne du singulier fait « soit ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q02",
      "exercise_set_id": "ch13-ex01",
      "order_index": 2,
      "prompt": "Je doute que vous (comprendre) __ l'importance de cet événement.",
      "instruction": "Mettre le verbe comprendre au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "compreniez"
      ],
      "explanation": "Après douter que, subjonctif obligatoire. Pour vous, le radical de comprendre est compren- (comme à l'imparfait) : « vous compreniez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q03",
      "exercise_set_id": "ch13-ex01",
      "order_index": 3,
      "prompt": "Sa mère aimerait mieux qu'elle (ne pas sortir) __ ce soir.",
      "instruction": "Mettre le verbe sortir à la forme négative au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne sorte pas"
      ],
      "explanation": "Aimer mieux que exige le subjonctif. Radical de ils sort-ent ➔ « qu'elle ne sorte pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q04",
      "exercise_set_id": "ch13-ex01",
      "order_index": 4,
      "prompt": "A-t-il fini le projet? Non. Mais je tiens à ce qu'il le (finir) __ aujourd'hui.",
      "instruction": "Mettre le verbe finir au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "finisse"
      ],
      "explanation": "Tenir à ce que exprime une exigence/volonté ➔ subjonctif. Radical de ils finiss-ent ➔ « qu'il le finisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q05",
      "exercise_set_id": "ch13-ex01",
      "order_index": 5,
      "prompt": "Je doute qu'ils (gérer) __ cette affaire correctement.",
      "instruction": "Mettre le verbe gérer au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "gèrent",
        "gerent"
      ],
      "explanation": "Douter que exige le subjonctif. Verbe régulier en -er : « qu'ils gèrent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q06",
      "exercise_set_id": "ch13-ex01",
      "order_index": 6,
      "prompt": "J'ai peur que ces logiciels (ne pas être) __ compatibles.",
      "instruction": "Mettre le verbe être à la forme négative au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne soient pas"
      ],
      "explanation": "Avoir peur que exprime la crainte ➔ subjonctif. Être à la 3e personne du pluriel : « ne soient pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q07",
      "exercise_set_id": "ch13-ex01",
      "order_index": 7,
      "prompt": "Ils souhaitent que cette aventure (avoir) __ une fin heureuse.",
      "instruction": "Mettre le verbe avoir au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait"
      ],
      "explanation": "Souhaiter que exprime le souhait ➔ subjonctif. Avoir au subjonctif singulier : « cette aventure ait ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q08",
      "exercise_set_id": "ch13-ex01",
      "order_index": 8,
      "prompt": "Il craint que ce projet (être) __ un échec.",
      "instruction": "Mettre le verbe être au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "soit"
      ],
      "explanation": "Craindre que exprime l'appréhension ➔ subjonctif. Verbe être au subjonctif : « soit ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q09",
      "exercise_set_id": "ch13-ex01",
      "order_index": 9,
      "prompt": "Elle est contente qu'il (pouvoir) __ acheter la maison de ses rêves.",
      "instruction": "Mettre le verbe pouvoir au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "puisse"
      ],
      "explanation": "Être content que exprime le sentiment ➔ subjonctif. Radical irrégulier de pouvoir : puiss- ➔ « qu'il puisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex01-q10",
      "exercise_set_id": "ch13-ex01",
      "order_index": 10,
      "prompt": "Le juge ne croit pas qu'il (dire) __ la vérité.",
      "instruction": "Mettre le verbe dire au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "dise"
      ],
      "explanation": "Croire à la forme négative (ne pas croire que) exprime le doute ➔ subjonctif. Radical de ils dis-ent ➔ « qu'il dise ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex02": [
    {
      "id": "ch13-ex02-q01",
      "exercise_set_id": "ch13-ex02",
      "order_index": 1,
      "prompt": "Il faut que vous (aller) __ voir ce film.",
      "instruction": "Mettre le verbe aller au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "alliez"
      ],
      "explanation": "Il faut que exige le subjonctif. Pour vous, le radical de aller est all- (comme à l'imparfait) : « vous alliez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q02",
      "exercise_set_id": "ch13-ex02",
      "order_index": 2,
      "prompt": "Il est essentiel que vous (arriver) __ avant la fin de la semaine.",
      "instruction": "Mettre le verbe arriver au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "arriviez"
      ],
      "explanation": "Il est essentiel que exige le subjonctif. Forme avec vous : « vous arriviez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q03",
      "exercise_set_id": "ch13-ex02",
      "order_index": 3,
      "prompt": "Il est impensable que nous (accepter) __ ces conditions.",
      "instruction": "Mettre le verbe accepter au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "acceptions"
      ],
      "explanation": "Il est impensable que exprime un refus catégorique ➔ subjonctif. Forme avec nous : « nous acceptions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q04",
      "exercise_set_id": "ch13-ex02",
      "order_index": 4,
      "prompt": "Il est possible que nous (voyager) __ cet été.",
      "instruction": "Mettre le verbe voyager au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "voyagions"
      ],
      "explanation": "Il est possible que exprime la possibilité ➔ subjonctif. Avec nous : « nous voyagions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q05",
      "exercise_set_id": "ch13-ex02",
      "order_index": 5,
      "prompt": "Il est important qu'il (être) __ à l'heure.",
      "instruction": "Mettre le verbe être au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "soit"
      ],
      "explanation": "Il est important que exige le subjonctif : « qu'il soit à l'heure ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q06",
      "exercise_set_id": "ch13-ex02",
      "order_index": 6,
      "prompt": "Il vaut mieux que nous (ne rien dire) __.",
      "instruction": "Mettre dire avec la négation ne rien au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne disions rien"
      ],
      "explanation": "Il vaut mieux que exige le subjonctif. Forme avec nous : « nous ne disions rien ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q07",
      "exercise_set_id": "ch13-ex02",
      "order_index": 7,
      "prompt": "Il est regrettable que ses enfants (habiter) __ si loin.",
      "instruction": "Mettre le verbe habiter au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "habitent"
      ],
      "explanation": "Il est regrettable que exprime le regret ➔ subjonctif. Sujet pluriel ses enfants : « habitent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q08",
      "exercise_set_id": "ch13-ex02",
      "order_index": 8,
      "prompt": "Il est dommage que vous (vendre) __ votre maison de campagne.",
      "instruction": "Mettre le verbe vendre au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "vendiez"
      ],
      "explanation": "Il est dommage que exprime le sentiment ➔ subjonctif. Forme avec vous : « vous vendiez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q09",
      "exercise_set_id": "ch13-ex02",
      "order_index": 9,
      "prompt": "Il est indispensable qu'elle (suivre) __ un cours d'informatique.",
      "instruction": "Mettre le verbe suivre au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "suive"
      ],
      "explanation": "Il est indispensable que exige le subjonctif. Radical de ils suiv-ent ➔ « qu'elle suive ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex02-q10",
      "exercise_set_id": "ch13-ex02",
      "order_index": 10,
      "prompt": "Il est rare que nous (emporter) __ du travail à la maison.",
      "instruction": "Mettre le verbe emporter au subjonctif présent.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "emportions"
      ],
      "explanation": "Il est rare que exige le subjonctif. Forme avec nous : « nous emportions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex03": [
    {
      "id": "ch13-ex03-q01",
      "exercise_set_id": "ch13-ex03",
      "order_index": 1,
      "prompt": "Il ne commencera pas son discours avant que vous (donner) __ le signal.",
      "instruction": "Mettre le verbe donner au subjonctif après avant que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "donniez"
      ],
      "explanation": "Avant que exige toujours le subjonctif. Forme avec vous : « avant que vous donniez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q02",
      "exercise_set_id": "ch13-ex03",
      "order_index": 2,
      "prompt": "Elle est généreuse quoiqu'elle (ne pas être) __ riche.",
      "instruction": "Mettre être à la forme négative après quoiqu'elle.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne soit pas"
      ],
      "explanation": "Quoique (bien que) exige le subjonctif. Verbe être au singulier : « ne soit pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q03",
      "exercise_set_id": "ch13-ex03",
      "order_index": 3,
      "prompt": "Je t'aiderai à condition que tu me (faire) __ une faveur.",
      "instruction": "Mettre le verbe faire au subjonctif après à condition que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "fasses"
      ],
      "explanation": "À condition que exige le subjonctif. Radical fass- pour faire : « tu fasses ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q04",
      "exercise_set_id": "ch13-ex03",
      "order_index": 4,
      "prompt": "Nous les inviterons pour qu'ils (ne pas se sentir) __ délaissés.",
      "instruction": "Mettre se sentir à la forme négative au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne se sentent pas"
      ],
      "explanation": "Pour que exige le subjonctif. Pronominal se sentir au pluriel : « qu'ils ne se sentent pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q05",
      "exercise_set_id": "ch13-ex03",
      "order_index": 5,
      "prompt": "Elle déposera un brevet de peur qu'on lui (voler) __ son idée.",
      "instruction": "Mettre le verbe voler au subjonctif après de peur que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "vole"
      ],
      "explanation": "De peur que exprime la crainte ➔ subjonctif : « qu'on lui vole son idée ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q06",
      "exercise_set_id": "ch13-ex03",
      "order_index": 6,
      "prompt": "J'achèterai leur appartement pour qu'ils (pouvoir) __ s'installer à la campagne.",
      "instruction": "Mettre pouvoir au subjonctif après pour que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "puissent"
      ],
      "explanation": "Pour que exige le subjonctif. Radical puiss- au pluriel : « qu'ils puissent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q07",
      "exercise_set_id": "ch13-ex03",
      "order_index": 7,
      "prompt": "Il téléchargera le dossier bien qu'il (ne pas répondre) __ exactement à ses besoins.",
      "instruction": "Mettre répondre à la forme négative après bien que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne réponde pas",
        "ne reponde pas"
      ],
      "explanation": "Bien que exige le subjonctif. Verbe répondre en -re : « ne réponde pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q08",
      "exercise_set_id": "ch13-ex03",
      "order_index": 8,
      "prompt": "Elle a un blog pour que ses lecteurs (donner) __ leurs réactions.",
      "instruction": "Mettre donner au subjonctif après pour que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "donnent"
      ],
      "explanation": "Pour que exige le subjonctif. Sujet pluriel ses lecteurs : « donnent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q09",
      "exercise_set_id": "ch13-ex03",
      "order_index": 9,
      "prompt": "Nous donnerons nos opinions pourvu qu'elles (rester) __ anonymes.",
      "instruction": "Mettre rester au subjonctif après pourvu que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "restent"
      ],
      "explanation": "Pourvu que (contanto que) exige le subjonctif. Sujet pluriel elles : « restent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex03-q10",
      "exercise_set_id": "ch13-ex03",
      "order_index": 10,
      "prompt": "Elle achètera un appareil numérique pour que sa fille (pouvoir) __ lui envoyer des photos au cours de son voyage.",
      "instruction": "Mettre pouvoir au subjonctif après pour que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "puisse"
      ],
      "explanation": "Pour que exige le subjonctif. Radical puiss- au singulier : « sa fille puisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex04": [
    {
      "id": "ch13-ex04-q01",
      "exercise_set_id": "ch13-ex04",
      "order_index": 1,
      "prompt": "Il dit que leur page d'accueil (être) __ attrayante.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "est"
      ],
      "explanation": "Le verbe dire à la forme affirmative énonce un fait réel/constaté ➔ INDICATIF : « est ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q02",
      "exercise_set_id": "ch13-ex04",
      "order_index": 2,
      "prompt": "Elle doute qu'il (faire) __ chaud demain.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "fasse"
      ],
      "explanation": "Douter que exprime l'incertitude ➔ SUBJONCTIF obligatoire : « fasse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q03",
      "exercise_set_id": "ch13-ex04",
      "order_index": 3,
      "prompt": "Ils sont heureux que leurs enfants (pouvoir) __ aller en Europe cet été.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "puissent"
      ],
      "explanation": "Être heureux que exprime une émotion/sentiment ➔ SUBJONCTIF : « puissent ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q04",
      "exercise_set_id": "ch13-ex04",
      "order_index": 4,
      "prompt": "Je pense que Maud (avoir) __ raison.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "a"
      ],
      "explanation": "Penser à la forme affirmative énonce une opinion tenue pour vraie ➔ INDICATIF : « a ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q05",
      "exercise_set_id": "ch13-ex04",
      "order_index": 5,
      "prompt": "Je veux que tu (faire) __ la présentation jeudi.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "fasses"
      ],
      "explanation": "Vouloir que exprime la volonté ➔ SUBJONCTIF obligatoire : « fasses ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q06",
      "exercise_set_id": "ch13-ex04",
      "order_index": 6,
      "prompt": "Tu ne crois pas qu'ils (avoir) __ assez d'expérience.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "aient"
      ],
      "explanation": "Croire à la forme négative exprime le doute ➔ SUBJONCTIF obligatoire : « aient ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q07",
      "exercise_set_id": "ch13-ex04",
      "order_index": 7,
      "prompt": "Vous savez qu'ils (être) __ toujours en retard.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "sont"
      ],
      "explanation": "Savoir que énonce une certitude objective ➔ INDICATIF : « sont ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q08",
      "exercise_set_id": "ch13-ex04",
      "order_index": 8,
      "prompt": "Nous souhaitons que vous (obtenir) __ ce poste.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "obteniez"
      ],
      "explanation": "Souhaiter que exprime le souhait/désir ➔ SUBJONCTIF : « obteniez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q09",
      "exercise_set_id": "ch13-ex04",
      "order_index": 9,
      "prompt": "Ils exigent que vous (parler) __ une langue étrangère.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "parliez"
      ],
      "explanation": "Exiger que exprime l'obligation péremptoire ➔ SUBJONCTIF : « parliez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex04-q10",
      "exercise_set_id": "ch13-ex04",
      "order_index": 10,
      "prompt": "Vous savez que cet ordinateur (être) __ obsolète.",
      "instruction": "Indicatif ou subjonctif ? Choisir le mode convenable.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "est"
      ],
      "explanation": "Savoir que énonce une réalité vérifiable ➔ INDICATIF : « est ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex05": [
    {
      "id": "ch13-ex05-q01",
      "exercise_set_id": "ch13-ex05",
      "order_index": 1,
      "prompt": "Il est rare que nous (voyager) __ dans cette région.",
      "instruction": "Mettre voyager au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "voyagions"
      ],
      "explanation": "Il est rare que demande le subjonctif. Avec nous : « nous voyagions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q02",
      "exercise_set_id": "ch13-ex05",
      "order_index": 2,
      "prompt": "Il me semble que vous (se tromper) __ souvent.",
      "instruction": "Mettre se tromper au mode convenable (attention à il me semble que).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "vous trompez"
      ],
      "explanation": "Piège FLE majeur : « Il me semble que » exprime une quasi-certitude personnelle et régit l'INDICATIF (« vous vous trompez »), alors que « Il semble que » régit le subjonctif !",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q03",
      "exercise_set_id": "ch13-ex05",
      "order_index": 3,
      "prompt": "Il faut que nous (trouver) __ un bon restaurant.",
      "instruction": "Mettre trouver au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "trouvions"
      ],
      "explanation": "Il faut que régit le subjonctif : « nous trouvions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q04",
      "exercise_set_id": "ch13-ex05",
      "order_index": 4,
      "prompt": "Il est naturel que je (connaître) __ cette ville. C'est ma ville natale!",
      "instruction": "Mettre connaître au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "connaisse"
      ],
      "explanation": "Il est naturel que régit le subjonctif. Radical connaiss- : « je connaisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q05",
      "exercise_set_id": "ch13-ex05",
      "order_index": 5,
      "prompt": "Il est essentiel que nous (acheter) __ un nouvel ordinateur.",
      "instruction": "Mettre acheter au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "achetions"
      ],
      "explanation": "Il est essentiel que régit le subjonctif. Pour nous, pas d'accent grave : « nous achetions ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q06",
      "exercise_set_id": "ch13-ex05",
      "order_index": 6,
      "prompt": "Il est dommage que ce logiciel (ne pas être) __ plus performant.",
      "instruction": "Mettre être à la forme négative au subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ne soit pas"
      ],
      "explanation": "Il est dommage que régit le subjonctif : « ne soit pas ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q07",
      "exercise_set_id": "ch13-ex05",
      "order_index": 7,
      "prompt": "Elle reste chez elle de peur qu'il y (avoir) __ une tempête de neige.",
      "instruction": "Mettre y avoir au subjonctif après de peur que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait"
      ],
      "explanation": "De peur que régit le subjonctif : « qu'il y ait ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q08",
      "exercise_set_id": "ch13-ex05",
      "order_index": 8,
      "prompt": "Nous vous contacterons avant que vous (envoyer) __ la rédaction du contrat.",
      "instruction": "Mettre envoyer au subjonctif après avant que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "envoyiez"
      ],
      "explanation": "Avant que régit le subjonctif. Avec vous, présence du -y- et du -i- : « vous envoyiez ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q09",
      "exercise_set_id": "ch13-ex05",
      "order_index": 9,
      "prompt": "Vérifiez les chiffres afin qu'on (pouvoir) __ communiquer le rapport.",
      "instruction": "Mettre pouvoir au subjonctif après afin que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "puisse"
      ],
      "explanation": "Afin que régit le subjonctif. Sujet on : « afin qu'on puisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex05-q10",
      "exercise_set_id": "ch13-ex05",
      "order_index": 10,
      "prompt": "Bien que son livre (être) __ bien écrit, il ne trouvera guère de lecteurs.",
      "instruction": "Mettre être au subjonctif après bien que.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "soit"
      ],
      "explanation": "Bien que régit le subjonctif : « son livre soit ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex06": [
    {
      "id": "ch13-ex06-q01",
      "exercise_set_id": "ch13-ex06",
      "order_index": 1,
      "prompt": "Let's hope he is right!",
      "instruction": "Traduisez en français en utilisant l'expression Pourvu que.",
      "tokens": [
        "Pourvu",
        "qu'il",
        "ait",
        "raison",
        "!"
      ],
      "options": null,
      "accepted_answers": [
        "Pourvu qu'il ait raison !",
        "Pourvu qu'il ait raison!",
        "Pourvu qu'il ait raison",
        "Pourvu qu’il ait raison !"
      ],
      "explanation": "Pourvu que en proposition isolée traduit le souhait « Let's hope » et exige le subjonctif : « Pourvu qu'il ait raison ! ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q02",
      "exercise_set_id": "ch13-ex06",
      "order_index": 2,
      "prompt": "She is happy he can study French.",
      "instruction": "Traduisez en français.",
      "tokens": [
        "Elle est heureuse",
        "qu'il",
        "puisse",
        "étudier",
        "le français",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Elle est heureuse qu'il puisse étudier le français.",
        "Elle est heureuse qu'il puisse étudier le français",
        "Elle est contente qu'il puisse étudier le français.",
        "Elle est heureuse qu’il puisse étudier le français."
      ],
      "explanation": "Émotion (être heureuse que) ➔ subjonctif de pouvoir : « qu'il puisse étudier le français ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q03",
      "exercise_set_id": "ch13-ex06",
      "order_index": 3,
      "prompt": "It is possible you can buy this software here.",
      "instruction": "Traduisez en utilisant vous.",
      "tokens": [
        "Il est possible",
        "que vous puissiez",
        "acheter",
        "ce logiciel",
        "ici",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Il est possible que vous puissiez acheter ce logiciel ici.",
        "Il est possible que vous puissiez acheter ce logiciel ici"
      ],
      "explanation": "Possibilité (il est possible que) ➔ subjonctif : « que vous puissiez acheter ce logiciel ici ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q04",
      "exercise_set_id": "ch13-ex06",
      "order_index": 4,
      "prompt": "Call us before we go to France!",
      "instruction": "Traduisez en français avec l'impératif.",
      "tokens": [
        "Appelez-nous",
        "avant que",
        "nous allions",
        "en France",
        "!"
      ],
      "options": null,
      "accepted_answers": [
        "Appelez-nous avant que nous allions en France !",
        "Appelez-nous avant que nous allions en France!",
        "Appelez-nous avant que nous allions en France",
        "Appelez nous avant que nous allions en France !"
      ],
      "explanation": "Avant que exige le subjonctif : « avant que nous allions en France ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q05",
      "exercise_set_id": "ch13-ex06",
      "order_index": 5,
      "prompt": "It is strange he is late.",
      "instruction": "Traduisez en français.",
      "tokens": [
        "Il est étrange",
        "qu'il",
        "soit",
        "en retard",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Il est étrange qu'il soit en retard.",
        "Il est étrange qu'il soit en retard",
        "Il est bizarre qu'il soit en retard.",
        "Il est étrange qu’il soit en retard."
      ],
      "explanation": "Il est étrange que exige le subjonctif : « qu'il soit en retard ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q06",
      "exercise_set_id": "ch13-ex06",
      "order_index": 6,
      "prompt": "Let's hope he can come!",
      "instruction": "Traduisez en utilisant Pourvu que.",
      "tokens": [
        "Pourvu",
        "qu'il",
        "puisse",
        "venir",
        "!"
      ],
      "options": null,
      "accepted_answers": [
        "Pourvu qu'il puisse venir !",
        "Pourvu qu'il puisse venir!",
        "Pourvu qu'il puisse venir",
        "Pourvu qu’il puisse venir !"
      ],
      "explanation": "Pourvu qu'il puisse venir ! traduit le souhait fervent d'une venue.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q07",
      "exercise_set_id": "ch13-ex06",
      "order_index": 7,
      "prompt": "She wants you to buy this computer.",
      "instruction": "Traduisez en utilisant vous.",
      "tokens": [
        "Elle veut",
        "que vous achetiez",
        "cet ordinateur",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Elle veut que vous achetiez cet ordinateur.",
        "Elle veut que vous achetiez cet ordinateur"
      ],
      "explanation": "Vouloir que ➔ subjonctif : « Elle veut que vous achetiez cet ordinateur ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q08",
      "exercise_set_id": "ch13-ex06",
      "order_index": 8,
      "prompt": "Although he is tired, he reads the newspaper.",
      "instruction": "Traduisez en utilisant bien que.",
      "tokens": [
        "Bien qu'il",
        "soit",
        "fatigué",
        ",",
        "il lit",
        "le journal",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Bien qu'il soit fatigué, il lit le journal.",
        "Bien qu'il soit fatigué, il lit le journal",
        "Quoiqu'il soit fatigué, il lit le journal.",
        "Bien qu’il soit fatigué, il lit le journal."
      ],
      "explanation": "Bien que exige le subjonctif : « Bien qu'il soit fatigué ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q09",
      "exercise_set_id": "ch13-ex06",
      "order_index": 9,
      "prompt": "Although he makes a few mistakes, his French is very good.",
      "instruction": "Traduisez en français.",
      "tokens": [
        "Bien qu'il",
        "fasse",
        "quelques fautes",
        ",",
        "son français",
        "est très bon",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "Bien qu'il fasse quelques fautes, son français est très bon.",
        "Bien qu'il fasse quelques fautes, son français est très bon",
        "Quoiqu'il fasse quelques fautes, son français est très bon."
      ],
      "explanation": "Bien qu'il fasse quelques fautes (subjonctif de faire). Noter l'accord masculin : « son français est très bon ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex06-q10",
      "exercise_set_id": "ch13-ex06",
      "order_index": 10,
      "prompt": "It is the most beautiful city I know.",
      "instruction": "Traduisez en utilisant le subjonctif après le superlatif.",
      "tokens": [
        "C'est",
        "la plus belle ville",
        "que je connaisse",
        "."
      ],
      "options": null,
      "accepted_answers": [
        "C'est la plus belle ville que je connaisse.",
        "C'est la plus belle ville que je connaisse",
        "C’est la plus belle ville que je connaisse."
      ],
      "explanation": "Après un superlatif relatif (la plus belle ville que), l'appréciation subjective exige le subjonctif : « que je connaisse ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex07": [
    {
      "id": "ch13-ex07-q01",
      "exercise_set_id": "ch13-ex07",
      "order_index": 1,
      "prompt": "Je doute que tu (lire) __ tout le livre.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "aies lu"
      ],
      "explanation": "Subjonctif passé avec avoir : tu aies + participe passé lu ➔ « aies lu ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q02",
      "exercise_set_id": "ch13-ex07",
      "order_index": 2,
      "prompt": "Nous sommes ravis que vous (pouvoir) __ être parmi nous.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ayez pu"
      ],
      "explanation": "Subjonctif passé de pouvoir : vous ayez + pu ➔ « ayez pu ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q03",
      "exercise_set_id": "ch13-ex07",
      "order_index": 3,
      "prompt": "Il est possible que le logiciel (être) __ défectueux.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait été",
        "ait ete"
      ],
      "explanation": "Subjonctif passé de être : il ait + été ➔ « ait été ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q04",
      "exercise_set_id": "ch13-ex07",
      "order_index": 4,
      "prompt": "Je suis surpris que vous (ne pas voir) __ ce film.",
      "instruction": "Mettre au passé du subjonctif à la forme négative.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "n'ayez pas vu",
        "n’ayez pas vu"
      ],
      "explanation": "Négation encadrant l'auxiliaire avoir : « n'ayez pas vu ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q05",
      "exercise_set_id": "ch13-ex07",
      "order_index": 5,
      "prompt": "Il a peur que Charles (manquer) __ le train.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait manqué",
        "ait manque"
      ],
      "explanation": "Subjonctif passé de manquer : Charles ait + manqué ➔ « ait manqué ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q06",
      "exercise_set_id": "ch13-ex07",
      "order_index": 6,
      "prompt": "Il n'est pas certain qu'il (réussir) __ à son examen.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait réussi",
        "ait reussi"
      ],
      "explanation": "Subjonctif passé de réussir : qu'il ait + réussi ➔ « ait réussi ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q07",
      "exercise_set_id": "ch13-ex07",
      "order_index": 7,
      "prompt": "Je crains qu'il (plagier) __ mes idées.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ait plagié",
        "ait plagie"
      ],
      "explanation": "Subjonctif passé de plagier : qu'il ait + plagié ➔ « ait plagié ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q08",
      "exercise_set_id": "ch13-ex07",
      "order_index": 8,
      "prompt": "Il a envoyé le courriel avant que je (pouvoir) __ ajouter un mot.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "j'aie pu",
        "aie pu",
        "j’aie pu"
      ],
      "explanation": "Subjonctif passé de pouvoir : avant que j'aie pu ajouter un mot.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q09",
      "exercise_set_id": "ch13-ex07",
      "order_index": 9,
      "prompt": "Il est douteux qu'ils (lire) __ tous les dossiers.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "aient lu"
      ],
      "explanation": "Subjonctif passé au pluriel : qu'ils aient + lu ➔ « aient lu ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex07-q10",
      "exercise_set_id": "ch13-ex07",
      "order_index": 10,
      "prompt": "Je suis content que vous (dire) __ la vérité.",
      "instruction": "Mettre au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "ayez dit"
      ],
      "explanation": "Subjonctif passé de dire : que vous ayez + dit ➔ « ayez dit ».",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex08": [
    {
      "id": "ch13-ex08-q01",
      "exercise_set_id": "ch13-ex08",
      "order_index": 1,
      "prompt": "Il est content que nous partions.",
      "instruction": "Changer la subordonnée au passé du subjonctif (auxiliaire être avec accord).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Il est content que nous soyons partis.",
        "Il est content que nous soyons partis",
        "Il est content que nous soyons parti(e)s.",
        "Il est content que nous soyons parties."
      ],
      "explanation": "Partir se conjugue avec être : nous soyons partis (accord du participe passé avec nous).",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q02",
      "exercise_set_id": "ch13-ex08",
      "order_index": 2,
      "prompt": "Nous sommes ravis que tu puisses venir avec nous.",
      "instruction": "Changer la subordonnée au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Nous sommes ravis que tu aies pu venir avec nous.",
        "Nous sommes ravis que tu aies pu venir avec nous"
      ],
      "explanation": "Puisses venir ➔ tu aies pu venir avec nous.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q03",
      "exercise_set_id": "ch13-ex08",
      "order_index": 3,
      "prompt": "Je ne crois pas qu'il aille à l'exposition.",
      "instruction": "Changer la subordonnée au passé du subjonctif (auxiliaire être).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Je ne crois pas qu'il soit allé à l'exposition.",
        "Je ne crois pas qu'il soit allé à l'exposition",
        "Je ne crois pas qu’il soit allé à l’exposition."
      ],
      "explanation": "Aller se conjugue avec être : qu'il soit allé à l'exposition.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q04",
      "exercise_set_id": "ch13-ex08",
      "order_index": 4,
      "prompt": "Il doute qu'elle réussisse.",
      "instruction": "Changer la subordonnée au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Il doute qu'elle ait réussi.",
        "Il doute qu'elle ait réussi",
        "Il doute qu’elle ait réussi."
      ],
      "explanation": "Réussir avec avoir : qu'elle ait réussi.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q05",
      "exercise_set_id": "ch13-ex08",
      "order_index": 5,
      "prompt": "Elle a peur qu'il ait un accident de moto.",
      "instruction": "Changer la subordonnée au passé du subjonctif (participe passé de avoir).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Elle a peur qu'il ait eu un accident de moto.",
        "Elle a peur qu'il ait eu un accident de moto",
        "Elle a peur qu’il ait eu un accident de moto."
      ],
      "explanation": "Avoir au passé du subjonctif : qu'il ait eu un accident de moto.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q06",
      "exercise_set_id": "ch13-ex08",
      "order_index": 6,
      "prompt": "Ils sont contents que Laurent se marie.",
      "instruction": "Changer la subordonnée au passé du subjonctif (verbe pronominal avec être).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Ils sont contents que Laurent se soit marié.",
        "Ils sont contents que Laurent se soit marié",
        "Ils sont contents que Laurent se soit marie."
      ],
      "explanation": "Verbe pronominal avec être : Laurent se soit marié.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q07",
      "exercise_set_id": "ch13-ex08",
      "order_index": 7,
      "prompt": "Nous sommes désolés que votre sœur soit malade.",
      "instruction": "Changer la subordonnée au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Nous sommes désolés que votre sœur ait été malade.",
        "Nous sommes désolés que votre sœur ait été malade",
        "Nous sommes désolés que votre soeur ait été malade.",
        "Nous sommes desoles que votre soeur ait ete malade."
      ],
      "explanation": "Être au passé du subjonctif avec avoir : votre sœur ait été malade.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q08",
      "exercise_set_id": "ch13-ex08",
      "order_index": 8,
      "prompt": "Il est douteux qu'ils aillent en Patagonie.",
      "instruction": "Changer la subordonnée au passé du subjonctif (auxiliaire être avec accord pluriel).",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Il est douteux qu'ils soient allés en Patagonie.",
        "Il est douteux qu'ils soient allés en Patagonie",
        "Il est douteux qu’ils soient allés en Patagonie."
      ],
      "explanation": "Aller avec être au pluriel : qu'ils soient allés en Patagonie.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q09",
      "exercise_set_id": "ch13-ex08",
      "order_index": 9,
      "prompt": "Il est regrettable que leurs enfants soient si peu reconnaissants.",
      "instruction": "Changer la subordonnée au passé du subjonctif.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Il est regrettable que leurs enfants aient été si peu reconnaissants.",
        "Il est regrettable que leurs enfants aient été si peu reconnaissants"
      ],
      "explanation": "Être au passé du subjonctif : leurs enfants aient été si peu reconnaissants.",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex08-q10",
      "exercise_set_id": "ch13-ex08",
      "order_index": 10,
      "prompt": "Il est incroyable que vous ne sachiez pas la réponse.",
      "instruction": "Changer la subordonnée au passé du subjonctif à la forme négative.",
      "tokens": null,
      "options": null,
      "accepted_answers": [
        "Il est incroyable que vous n'ayez pas su la réponse.",
        "Il est incroyable que vous n'ayez pas su la réponse",
        "Il est incroyable que vous n’ayez pas su la réponse."
      ],
      "explanation": "Savoir au passé du subjonctif négatif : que vous n'ayez pas su la réponse.",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ],
  "ch13-ex09": [
    {
      "id": "ch13-ex09-q01",
      "exercise_set_id": "ch13-ex09",
      "order_index": 1,
      "prompt": "Je pense",
      "instruction": "Associer avec la proposition logique correspondante.",
      "tokens": null,
      "options": [
        {
          "label": "a",
          "text": "que nous ayons raté le dernier métro."
        },
        {
          "label": "b",
          "text": "que leur fille ait obtenu son diplôme."
        },
        {
          "label": "c",
          "text": "que Jean ait refusé une telle offre!"
        },
        {
          "label": "d",
          "text": "qu'il pleuvra demain."
        },
        {
          "label": "e",
          "text": "que vous assistiez à la conférence de presse."
        }
      ],
      "accepted_answers": [
        "d"
      ],
      "explanation": "« Je pense » à la forme affirmative exige l'indicatif : « qu'il pleuvra demain » (option d).",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex09-q02",
      "exercise_set_id": "ch13-ex09",
      "order_index": 2,
      "prompt": "Il est bizarre",
      "instruction": "Associer avec la proposition logique correspondante.",
      "tokens": null,
      "options": [
        {
          "label": "a",
          "text": "que nous ayons raté le dernier métro."
        },
        {
          "label": "b",
          "text": "que leur fille ait obtenu son diplôme."
        },
        {
          "label": "c",
          "text": "que Jean ait refusé une telle offre!"
        },
        {
          "label": "d",
          "text": "qu'il pleuvra demain."
        },
        {
          "label": "e",
          "text": "que vous assistiez à la conférence de presse."
        }
      ],
      "accepted_answers": [
        "c"
      ],
      "explanation": "« Il est bizarre » (étonnement/jugement) exige le subjonctif : « que Jean ait refusé une telle offre! » (option c).",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex09-q03",
      "exercise_set_id": "ch13-ex09",
      "order_index": 3,
      "prompt": "Marie! J'ai bien peur",
      "instruction": "Associer avec la proposition logique correspondante.",
      "tokens": null,
      "options": [
        {
          "label": "a",
          "text": "que nous ayons raté le dernier métro."
        },
        {
          "label": "b",
          "text": "que leur fille ait obtenu son diplôme."
        },
        {
          "label": "c",
          "text": "que Jean ait refusé une telle offre!"
        },
        {
          "label": "d",
          "text": "qu'il pleuvra demain."
        },
        {
          "label": "e",
          "text": "que vous assistiez à la conférence de presse."
        }
      ],
      "accepted_answers": [
        "a"
      ],
      "explanation": "« J'ai bien peur » (crainte/sentiment) exige le subjonctif : « que nous ayons raté le dernier métro » (option a).",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex09-q04",
      "exercise_set_id": "ch13-ex09",
      "order_index": 4,
      "prompt": "Il est essentiel pour l'entreprise",
      "instruction": "Associer avec la proposition logique correspondante.",
      "tokens": null,
      "options": [
        {
          "label": "a",
          "text": "que nous ayons raté le dernier métro."
        },
        {
          "label": "b",
          "text": "que leur fille ait obtenu son diplôme."
        },
        {
          "label": "c",
          "text": "que Jean ait refusé une telle offre!"
        },
        {
          "label": "d",
          "text": "qu'il pleuvra demain."
        },
        {
          "label": "e",
          "text": "que vous assistiez à la conférence de presse."
        }
      ],
      "accepted_answers": [
        "e"
      ],
      "explanation": "« Il est essentiel » (nécessité impérieuse) exige le subjonctif : « que vous assistiez à la conférence de presse » (option e).",
      "created_at": "2026-03-30T10:00:00.000Z"
    },
    {
      "id": "ch13-ex09-q05",
      "exercise_set_id": "ch13-ex09",
      "order_index": 5,
      "prompt": "Ils sont ravis",
      "instruction": "Associer avec la proposition logique correspondante.",
      "tokens": null,
      "options": [
        {
          "label": "a",
          "text": "que nous ayons raté le dernier métro."
        },
        {
          "label": "b",
          "text": "que leur fille ait obtenu son diplôme."
        },
        {
          "label": "c",
          "text": "que Jean ait refusé une telle offre!"
        },
        {
          "label": "d",
          "text": "qu'il pleuvra demain."
        },
        {
          "label": "e",
          "text": "que vous assistiez à la conférence de presse."
        }
      ],
      "accepted_answers": [
        "b"
      ],
      "explanation": "« Ils sont ravis » (sentiment de joie) exige le subjonctif : « que leur fille ait obtenu son diplôme » (option b).",
      "created_at": "2026-03-30T10:00:00.000Z"
    }
  ]
};
