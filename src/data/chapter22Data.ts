import { Topic, ExerciseSet, Question } from '@/types/database';

export const CHAPTER_22_THEORY_MARKDOWN = `# Chapitre 22 — Les adjectifs et les comparaisons (Adjectives and comparisons)

Les **adjectifs qualificatifs** donnent de la couleur, du relief et de la précision au discours. Ils permettent de décrire les personnes, les objets et les situations, mais aussi d'établir des comparaisons nuancées.

Pour un apprenant **lusophone**, le système des adjectifs français comporte plusieurs points de convergence (les deux langues ont un genre grammatical masculin/féminin et un nombre singulier/pluriel), mais réserve quatre pièges majeurs :
1. **L'impact phonétique de la marque du féminin (-e)** : En portugais, le féminin change généralement la voyelle (*alto* ➔ *alta*). En français, l'ajout du **-e** muet a pour fonction essentielle de **faire prononcer la consonne finale** qui était muette au masculin (*grand* [ɡʁɑ̃] ➔ *grande* [ɡʁɑ̃d] ; *français* [fʁɑ̃sɛ] ➔ *française* [fʁɑ̃sɛz]).
2. **La place de l'adjectif (Avant ou Après le nom ?)** : Alors qu'en portugais la majorité des adjectifs suit le nom, en français un groupe restreint mais omniprésent d'adjectifs courts (mnémonique **BANGS**) se place **avant** le nom (*un beau jardin*, *une vieille maison*, *un jeune homme*).
3. **Le changement radical de sens selon la position** : *un grand homme* (un homme célèbre/illustre) n'est pas du tout *un homme grand* (un homme de grande taille) ! De même, *un ancien directeur* (un ex-directeur) diffère d'une *statue ancienne* (antique), et *mon pauvre chien* (digne de pitié) diffère des *pays pauvres* (sans argent).
4. **L'invariabilité absolue des adjectifs de couleur composés et dérivés de noms** : *Des chaussures marron* (jamais \*marrons !), *des yeux bleu marine* (jamais \*bleus marines !).
5. **La distinction cruciale AUSSI vs AUTANT dans la comparaison** : On dit **aussi** + adjectif (*aussi grand que*), mais **autant de** + nom (*autant d'argent que*, jamais \*aussi d'argent !).

---

## 1. L'Accord en Genre des Adjectifs (Agreement of adjectives)

En règle générale, on forme le féminin en ajoutant un **-e** muet à la forme masculine :

| Masculin | Féminin | Prononciation / Remarque FLE |
|---|---|---|
| **allemand** [al.mɑ̃] | **allemande** [al.mɑ̃d] | Le **d** final devient sonore au féminin. |
| **grand** [ɡʁɑ̃] | **grande** [ɡʁɑ̃d] | Le **d** final devient sonore au féminin. |
| **français** [fʁɑ̃.sɛ] | **française** [fʁɑ̃.sɛz] | Le **s** final muet devient le son [z] au féminin. |
| **charmant** [ʃaʁ.mɑ̃] | **charmante** [ʃaʁ.mɑ̃t] | Le **t** final devient sonore au féminin. |
| **vert** [vɛʁ] | **verte** [vɛʁt] | Le **t** final devient sonore au féminin. |
| **blond** [blɔ̃] | **blonde** [blɔ̃d] | Le **d** final devient sonore au féminin. |
| **doué** [dwe] | **douée** [dwe] | Même son voyelle, mais le **-e** s'écrit obligatoirement. |

### Adjectifs se terminant déjà par -e au masculin (Invariables en genre)
Si l'adjectif se termine déjà par un **-e** non accentué au masculin, il ne change pas au féminin :
- *Cet homme est **coupable**.* ➔ *Cette femme est **coupable**.*
- *Cet éléphant est **énorme**.* ➔ *Cette baleine est **énorme**.*
- Autres adjectifs identiques aux deux genres : *propre, sale, drôle, optimiste, efficace, tragique, facile, difficile, jeune, triste, calme, rapide*.

---

## 2. Les Féminins Irréguliers Systématiques

Plusieurs terminaisons masculines suivent des transformations régulières au féminin :

| Terminaison Masculine | Terminaison Féminine | Exemple Masculin | Exemple Féminin | Traduction Portugaise |
|---|---|---|---|---|
| **-en** | **-enne** (doublement) | *italien*, *vietnamien* | **italienne**, **vietnamienne** | italiano(a), vietnamita |
| **-on** | **-onne** (doublement) | *bon*, *mignon* | **bonne**, **mignonne** | bom / boa, fofo(a) |
| **-eux** | **-euse** | *généreux*, *amoureux*, *ambitieux* | **généreuse**, **amoureuse**, **ambitieuse** | generoso(a), apaixonado(a) |
| **-if** | **-ive** | *actif*, *passif*, *agressif*, *interactif* | **active**, **passive**, **agressive**, **interactive** | ativo(a), passivo(a) |
| **-el / -eil** | **-elle / -eille** | *cruel*, *pareil* | **cruelle**, **pareille** | cruel, semelhante / igual |
| **-et** | **-ette** | *coquet*, *violet* | **coquette**, **violette** | vaidoso(a), violeta |
| **-er** | **-ère** (accent grave) | *cher*, *premier*, *dernier* | **chère**, **première**, **dernière** | caro / querido, primeiro |

### Cas particuliers très fréquents :
- **blanc** ➔ **blanche** (adjonction de -he)
- **roux** ➔ **rousse** (double s)
- **faux** ➔ **fausse** (double s)
- **doux** ➔ **douce**
- **frais** ➔ **fraîche**
- **public** ➔ **publique**
- **long** ➔ **longue** (adjonction de u)
- **sec** ➔ **sèche**

---

## 3. Les Cinq Adjectifs Spéciaux Devant Voyelle ou H Muet

Cinq adjectifs très fréquents possèdent une **forme masculine alternative** lorsqu'ils précèdent directement un nom masculin commençant par une **voyelle** ou un **h muet**. Le but est d'éviter le hiatus (choc de deux voyelles) :

| Masculin Standard (Devant consonne) | Masculin Alternatif (Devant voyelle ou h muet) | Féminin | Exemples en Contexte |
|---|---|---|---|
| **beau** | **bel** | **belle** | *Un **beau** village* vs *Un **bel** homme*, *Une **belle** histoire* |
| **nouveau** | **nouvel** | **nouvelle** | *Un **nouveau** patron* vs *Un **nouvel** emploi*, *Une **nouvelle** adresse* |
| **vieux** | **vieil** | **vieille** | *Un **vieux** canapé* vs *Un **vieil** édifice*, *Une **vieille** maison* |
| **fou** | **fol** | **folle** | *Un jeu **fou*** vs *Un **fol** amour*, *Une idée **folle*** |
| **mou** | **mol** | **molle** | *Un coussin **mou*** vs *Un **mol** oreiller*, *Une matière **molle*** |

> [!CAUTION]
> **Attention piège d'examen :**
> - On dit *un **nouvel** an*, *un **bel** appartement*, *un **vieil** ami*.
> - Mais si l'adjectif est placé **après** le nom ou le verbe être, on emploie la forme standard : *Cet ami est **vieux***, *Cet emploi est **nouveau***.

---

## 4. La Place de l'Adjectif : Avant ou Après le Nom ?

### A. Règle Générale : Après le Nom
La grande majorité des adjectifs français se placent **après** le nom. C'est le cas systématique pour :
1. **Les adjectifs de nationalité ou d'origine** : *la cuisine chinoise*, *les plats italiens*, *des chansons françaises*.
2. **Les couleurs simples** : *des chaussures noires*, *une chemise blanche*, *cette veste jaune*.
3. **La forme, la matière ou la religion** : *une table ronde*, *une église gothique*, *un temple bouddhiste*.
4. **Les adjectifs longs ou relationnels** : *un remède efficace*, *une situation tragique*, *un problème économique*.
5. **Les participes passés employés comme adjectifs** : *une porte fermée*, *un travail soigné*, *une femme bronzée*.

### B. Adjectifs Plaisants et Courts Avant le Nom (Mnémonique BANGS)
Un groupe restreint d'adjectifs courts et très fréquents se place presque toujours **avant** le nom :
- **B**eauty (Beauté) : *beau / bel / belle*, *joli(e)*.
- **A**ge (Âge) : *jeune*, *vieux / vieil / vieille*, *nouveau / nouvel / nouvelle*.
- **N**umber (Nombre / Ordre) : *premier*, *dernier*, *deuxième*.
- **G**oodness (Qualité morale) : *bon / bonne*, *mauvais(e)*, *gentil(le)*.
- **S**ize (Taille) : *grand(e)*, *petit(e)*, *gros(se)*, *long / longue*, *court(e)*.

*Exemples :*
- *C'est une **bonne idée**.* (et non \*une idée bonne).
- *Ils ont acheté une **vieille maison**.*
- *Ce **jeune homme** est ambitieux.*
- *C'est un **long voyage**.*

---

## 5. Le Sens qui Change Selon la Position (Avant vs Après)

Certains adjectifs changent complètement de sens selon qu'ils sont placés avant (sens figuré, affectif ou abstrait) ou après le nom (sens propre, physique ou objectif) :

| Adjectif | Avant le Nom (Sens subjectif / figuré) | Après le Nom (Sens objectif / littéral) |
|---|---|---|
| **ancien** | *mon **ancien** mari* (ex-mari, passé) | *une statue **ancienne*** (antique, d'époque) |
| **grand** | *un **grand** homme* (homme illustre, historique) | *un homme **grand*** (de haute taille, 1m90) |
| **pauvre** | *notre **pauvre** chien !* (digne de pitié, à plaindre) | *des pays **pauvres*** (sans ressources financières) |
| **cher** | *ma **chère** Carole* (chère à mon cœur, affectueuse) | *un cadeau **cher*** (coûteux, prix élevé) |
| **propre** | *sa **propre** idée* (à lui personnellement) | *une nappe **propre*** (lavée, non souillée) |
| **sale** | *une **sale** affaire* (mauvaise, scandaleuse, méprisable) | *une fenêtre **sale*** (qui a besoin d'être nettoyée) |
| **dernier** | *le **dernier** train* (le train final de la journée) | *l'an **dernier*** (l'année précédente) |

---

## 6. Les Adjectifs de Couleur et Leurs Règles d'Invariabilité

### A. Couleurs Simples : Accord Normal
Les adjectifs de couleur simples s'accordent normalement en genre et en nombre avec le nom :
- *des chemises **blanches*** (f. pl.)
- *les fleurs **rouges*** (f. pl.)
- *ses chats **noirs*** (m. pl.)
- *des vestes **jaunes*** (f. pl.)

### B. Couleurs Issues de Substantifs (Fruits, Minéraux, Objets) : Invariables !
Quand un nom est utilisé comme adjectif de couleur (fruits, fleurs, épices, pierres précieuses), il reste **rigoureusement invariable** :
- *Ces chaussures **orange** sont modernes.* (orange = fruit ➔ pas de -s !).
- *Mon frère a les yeux **marron**.* (marron = châtaigne ➔ jamais de -s !).
- *Ces échantillons **safran** sont parfaits.* (safran = épice).
- *Des robes **bordeaux**, des pulls **ocre**, des coussins **noisette**.*

*(Exceptions historiques francophones qui s'accordent malgré leur origine : rose, fauve, mauve, pourpre, écarlate : des chemises roses).*

### C. Adjectifs de Couleur Composés : Totalement Invariables !
Quand une couleur est précisée par un second terme (nuance ou métaphore), **l'ensemble est 100 % invariable** :
- *Il porte des chaussures **bleu marine**.* (non \*bleues marines).
- *Cette peinture **vert clair** me plaît.* (non \*verte claire).
- *Sa veste **gris foncé** lui va très bien.*
- *Ces robes **rose bonbon** sont trop voyantes.*
- *Des coussins **bleu azur**.*
- *Elle a les cheveux **châtain clair**.*

---

## 7. Les Comparatifs (Comparatives)

Pour comparer deux êtres, deux objets ou deux quantités, on utilise trois degrés de comparaison :

### A. Comparaison d'Adjectifs et d'Adverbes

> **Règle de construction :**
> - **Supériorité** : PLUS + Adjectif / Adverbe + QUE (QU')
> - **Égalité** : AUSSI + Adjectif / Adverbe + QUE (QU')
> - **Infériorité** : MOINS + Adjectif / Adverbe + QUE (QU')


- *New York est **plus grand que** San Francisco.* (Nova York é maior que São Francisco.)
- *Luc est **aussi célèbre que** Bertrand.* (Luc é tão famoso quanto Bertrand.)
- *Marc est **moins riche que** Paul.* (Marc é menos rico que Paul.)
- *Sa sœur est **aussi intelligente qu'elle**.* (élision devant *elle* !).

### B. Comparaison de Substantifs (Quantités)

> [!IMPORTANT]
> **Règle Capitale : DE obligatoire et AUSSI devient AUTANT !**
> On ne dit jamais \*aussi de argent ! Avec les noms, *aussi* est remplacé par **autant** :

> **Règle de construction :**
> - **Supériorité** : PLUS DE (D') + Nom + QUE (QU')
> - **Égalité** : AUTANT DE (D') + Nom + QUE (QU')
> - **Infériorité** : MOINS DE (D') + Nom + QUE (QU')


- *Elle a **plus de temps que** Valérie.* (Ela tem mais tempo que a Valérie.)
- *Arnaud a **autant d'argent que** vous ?* (O Arnaud tem tanto dinheiro quanto vocês?)
- *Marie a **moins de paires de chaussures que** toi.* (A Marie tem menos pares de sapatos que você.)

---

## 8. Les Comparatifs et Superlatifs Irréguliers

En français, comme en portugais, certains adjectifs et adverbes ont des formes comparatives synthétiques :

| Forme Positive | Comparatif Irrégulier | Superlatif Relatif | Traduction Portugaise |
|---|---|---|---|
| **bon** (adjectif masc.) | **meilleur** (*plus bon* n'existe pas !) | **le meilleur** | bom ➔ melhor ➔ o melhor |
| **bonne** (adjectif fém.) | **meilleure** | **la meilleure** | boa ➔ melhor ➔ a melhor |
| **bons / bonnes** (pluriel) | **meilleurs / meilleures** | **les meilleurs / les meilleures** | bons/boas ➔ melhores ➔ os/as melhores |
| **bien** (adverbe) | **mieux** (*plus bien* n'existe pas !) | **le mieux** | bem ➔ melhor ➔ o melhor |
| **mauvais** (adjectif) | **pire** (ou *plus mauvais*) | **le pire** (ou *le plus mauvais*) | mau ➔ pior ➔ o pior |
| **petit** (abstrait) | **moindre** | **le moindre** | pequeno ➔ menor / o menor |

### Exemples d'application :
- *Ce vin-ci est **meilleur que** ce vin-là.*
- *Ses idées sont **meilleures que** les nôtres.*
- *Il se porte **mieux** qu'avant.*
- *La situation économique est **pire** qu'avant.*
- *Cela n'a pas **le moindre** intérêt.* (Não tem o menor interesse.)

---

## 9. Les Superlatifs (Superlatives)

Le superlatif relatif exprime le degré le plus élevé ou le plus bas par rapport à un ensemble :

> **Formule du superlatif :**
> **Le / La / Les** + [plus / moins / meilleur / pire] + Adjectif + **DE (DU / DE LA / DES)**


- *C'est **le plus grand spectacle du monde**.* (É o maior espetáculo do mundo.)
- *C'est **la plus belle histoire** que j'aie jamais lue.*
- *C'est l'endroit **le moins ennuyeux de toute la ville**.*
- *Cet appartement est **le plus beau de l'immeuble**.*
- *Ce prix est **le meilleur** !*
- *C'est son **pire cauchemar**.*
`;

export const CHAPTER_22_TOPICS: Topic[] = [
  {
    id: 'ch22-t01',
    chapter_id: 'ch22',
    order_index: 1,
    title: 'Accord en genre des adjectifs et féminins irréguliers',
    rule_summary: 'Former le féminin avec -e et comprendre son rôle phonétique (réveiller la consonne finale muette), mémoriser les régularités en -enne, -euse, -ive, -ète, et les cas spéciaux (blanche, rousse, fausse).',
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-t02',
    chapter_id: 'ch22',
    order_index: 2,
    title: 'Adjectifs spéciaux devant voyelle (bel, nouvel, vieil, fol, mol)',
    rule_summary: 'Utiliser les formes masculines euphoniques bel, nouvel, vieil, fol, mol devant un nom masculin singulier commençant par voyelle ou h muet (un bel homme, un vieil édifice).',
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-t03',
    chapter_id: 'ch22',
    order_index: 3,
    title: 'Place de l\'adjectif (BANGS) et changements de sens selon la position',
    rule_summary: 'Placer les adjectifs après le nom en général, mais avant pour BANGS (beauté, âge, nombre, bonté, taille), et distinguer le sens propre et figuré (ancien, pauvre, grand, cher, propre, sale).',
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-t04',
    chapter_id: 'ch22',
    order_index: 4,
    title: 'Adjectifs de couleur simples, dérivés de noms et composés',
    rule_summary: 'Accorder les couleurs simples (blanches, noirs), garder invariables les couleurs issues de substantifs (marron, orange, bordeaux) et les composés (bleu marine, vert clair, rose bonbon).',
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-t05',
    chapter_id: 'ch22',
    order_index: 5,
    title: 'Comparatifs, superlatifs, aussi vs autant et formes irrégulières',
    rule_summary: 'Employer plus/moins/aussi... que avec les adjectifs, plus de/moins de/autant de... que avec les noms, et maîtriser meilleur(e), mieux, pire, le moindre et le superlatif.',
    created_at: '2026-04-01T10:00:00.000Z'
  }
];

export const CHAPTER_22_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch22-ex01',
    chapter_id: 'ch22',
    order_index: 1,
    title: 'Exercice 22.1 — Traduction et accord des adjectifs',
    instruction: 'Traduire les adjectifs entre parenthèses en accordant correctement selon le genre et le nombre.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex02',
    chapter_id: 'ch22',
    order_index: 2,
    title: 'Exercice 22.2 — Choisir l\'adjectif logique',
    instruction: 'Choisir l\'adjectif qui s\'accorde logiquement et grammaticalement avec le nom.',
    interaction_type: 'fill_blank',
    questions_count: 5,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex03',
    chapter_id: 'ch22',
    order_index: 3,
    title: 'Exercice 22.3 — Transformation au féminin régulier et irrégulier',
    instruction: 'Mettre les adjectifs au féminin en remplaçant Patrick par Sonia.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex04',
    chapter_id: 'ch22',
    order_index: 4,
    title: 'Exercice 22.4 — Comparatifs et superlatifs en contexte',
    instruction: 'Traduire les éléments comparatifs et superlatifs entre parenthèses.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex05',
    chapter_id: 'ch22',
    order_index: 5,
    title: 'Exercice 22.5 — Formulation de phrases comparatives (+, -, =)',
    instruction: 'Formuler une phrase comparative complète avec les éléments fournis.',
    interaction_type: 'sentence_rewrite',
    questions_count: 5,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex06',
    chapter_id: 'ch22',
    order_index: 6,
    title: 'Exercice 22.6 — Traduction de synthèse (Adjectifs, place et nuances)',
    instruction: 'Traduire les phrases suivantes en français en soignant l\'accord et la place des adjectifs.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'ch22-ex07',
    chapter_id: 'ch22',
    order_index: 7,
    title: 'Exercice 22.7 — Sens de l\'adjectif selon sa place (Avant vs Après)',
    instruction: 'Faire correspondre les phrases des deux colonnes pour illustrer les nuances de sens.',
    interaction_type: 'matching',
    questions_count: 5,
    created_at: '2026-04-01T10:00:00.000Z'
  }
];

export const CHAPTER_22_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch22-ex01': [
    {
      id: 'ch22-ex01-q01',
      exercise_set_id: 'ch22-ex01',
      order_index: 1,
      prompt: 'Ta grand-mère est (French)? —Non, elle est (Italian).',
      instruction: 'Traduire les adjectifs entre parenthèses en accordant au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ta grand-mère est française? —Non, elle est italienne.',
        'Ta grand-mère est française ? — Non, elle est italienne.',
        'Ta grand-mère est française? — Non, elle est italienne.',
        'Ta grand-mère est française ? —Non, elle est italienne.',
        'française, italienne',
        'française / italienne',
        'française italienne'
      ],
      explanation: '« Grand-mère » et « elle » sont féminins singuliers : « français » ➔ « française » et « italien » ➔ « italienne » (doublement de la consonne n).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q02',
      exercise_set_id: 'ch22-ex01',
      order_index: 2,
      prompt: 'Ces fenêtres sont (clean)? —Non, ces fenêtres sont (dirty).',
      instruction: 'Traduire les adjectifs entre parenthèses au féminin pluriel.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ces fenêtres sont propres? —Non, ces fenêtres sont sales.',
        'Ces fenêtres sont propres ? — Non, ces fenêtres sont sales.',
        'Ces fenêtres sont propres? — Non, ces fenêtres sont sales.',
        'Ces fenêtres sont propres ? —Non, ces fenêtres sont sales.',
        'propres, sales',
        'propres / sales',
        'propres sales'
      ],
      explanation: '« Fenêtres » est féminin pluriel. « Propre » et « sale » se terminent par un -e au singulier, ils prennent simplement un -s au pluriel : « propres », « sales ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q03',
      exercise_set_id: 'ch22-ex01',
      order_index: 3,
      prompt: 'Sa femme est (blond)? —Non, elle est (redhead).',
      instruction: 'Traduire les adjectifs entre parenthèses au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Sa femme est blonde? —Non, elle est rousse.',
        'Sa femme est blonde ? — Non, elle est rousse.',
        'Sa femme est blonde? — Non, elle est rousse.',
        'Sa femme est blonde ? —Non, elle est rousse.',
        'blonde, rousse',
        'blonde / rousse',
        'blonde rousse'
      ],
      explanation: 'Féminin de « blond » ➔ « blonde ». Féminin irrégulier de « roux » ➔ « rousse » (doublement en -sse).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q04',
      exercise_set_id: 'ch22-ex01',
      order_index: 4,
      prompt: 'Il porte ses chaussures (black)? —Non, il porte des chaussures (navy blue).',
      instruction: 'Traduire les couleurs entre parenthèses en respectant les règles d\'accord.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il porte ses chaussures noires? —Non, il porte des chaussures bleu marine.',
        'Il porte ses chaussures noires ? — Non, il porte des chaussures bleu marine.',
        'Il porte ses chaussures noires? — Non, il porte des chaussures bleu marine.',
        'Il porte ses chaussures noires ? —Non, il porte des chaussures bleu marine.',
        'noires, bleu marine',
        'noires / bleu marine',
        'noires bleu marine'
      ],
      explanation: '« Noir » est une couleur simple qui s\'accorde avec « chaussures » (f.pl.) ➔ « noires ». Mais « bleu marine » est un adjectif de couleur composé : il reste strictement invariable !',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q05',
      exercise_set_id: 'ch22-ex01',
      order_index: 5,
      prompt: 'C’est une situation (serious)? —Oui, c’est une situation très (serious).',
      instruction: 'Traduire l\'adjectif entre parenthèses au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'C’est une situation sérieuse? —Oui, c’est une situation très sérieuse.',
        'C’est une situation sérieuse ? — Oui, c’est une situation très sérieuse.',
        'C\'est une situation sérieuse? —Oui, c\'est une situation très sérieuse.',
        'C\'est une situation sérieuse ? — Oui, c\'est une situation très sérieuse.',
        'sérieuse, sérieuse',
        'sérieuse',
        'sérieuse / sérieuse'
      ],
      explanation: 'L\'adjectif en -eux fait son féminin régulier en -euse : « sérieux » ➔ « sérieuse » (situation est féminin).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q06',
      exercise_set_id: 'ch22-ex01',
      order_index: 6,
      prompt: 'C’est une histoire (tragic)? —Non, c’est une histoire (funny).',
      instruction: 'Traduire les adjectifs entre parenthèses au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'C’est une histoire tragique? —Non, c’est une histoire amusante.',
        'C’est une histoire tragique ? — Non, c’est une histoire amusante.',
        'C\'est une histoire tragique? —Non, c\'est une histoire amusante.',
        'C\'est une histoire tragique ? — Non, c\'est une histoire amusante.',
        'tragique, amusante',
        'tragique / amusante',
        'tragique, drôle',
        'tragique / drôle'
      ],
      explanation: '« Tragique » se termine déjà par un -e au masculin et ne change pas. « Amusant » prend un -e au féminin : « amusante » (le t devient sonore).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q07',
      exercise_set_id: 'ch22-ex01',
      order_index: 7,
      prompt: 'C’est un (long) voyage? —Non, c’est assez (short).',
      instruction: 'Traduire les adjectifs entre parenthèses au masculin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'C’est un long voyage? —Non, c’est assez court.',
        'C’est un long voyage ? — Non, c’est assez court.',
        'C\'est un long voyage? —Non, c\'est assez court.',
        'C\'est un long voyage ? — Non, c\'est assez court.',
        'long, court',
        'long / court',
        'long court'
      ],
      explanation: '« Voyage » est masculin singulier : « long » (placé avant le nom selon BANGS) et « court » (t final muet).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q08',
      exercise_set_id: 'ch22-ex01',
      order_index: 8,
      prompt: 'Votre projet est (ambitious). —Non, c’est la directrice qui est (ambitious).',
      instruction: 'Traduire l\'adjectif au masculin puis au féminin.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Votre projet est ambitieux. —Non, c’est la directrice qui est ambitieuse.',
        'Votre projet est ambitieux. — Non, c’est la directrice qui est ambitieuse.',
        'Votre projet est ambitieux. —Non, c\'est la directrice qui est ambitieuse.',
        'Votre projet est ambitieux. — Non, c\'est la directrice qui est ambitieuse.',
        'ambitieux, ambitieuse',
        'ambitieux / ambitieuse',
        'ambitieux ambitieuse'
      ],
      explanation: '« Projet » est masculin ➔ « ambitieux ». « Directrice » est féminin ➔ « ambitieuse » (transformation de -eux en -euse).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q09',
      exercise_set_id: 'ch22-ex01',
      order_index: 9,
      prompt: 'Ses idées sont (good)? —Oui, ses idées sont (better) que les nôtres.',
      instruction: 'Traduire l\'adjectif et son comparatif irrégulier au féminin pluriel.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ses idées sont bonnes? —Oui, ses idées sont meilleures que les nôtres.',
        'Ses idées sont bonnes ? — Oui, ses idées sont meilleures que les nôtres.',
        'bonnes, meilleures',
        'bonnes / meilleures',
        'bonnes meilleures'
      ],
      explanation: '« Idées » est féminin pluriel : « bon » ➔ « bonnes » (double n), et le comparatif irrégulier est « meilleures » (jamais \*plus bonnes !).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex01-q10',
      exercise_set_id: 'ch22-ex01',
      order_index: 10,
      prompt: 'Ton travail est (boring)? —Non, mon travail est très (interesting).',
      instruction: 'Traduire les adjectifs entre parenthèses au masculin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ton travail est ennuyeux? —Non, mon travail est très intéressant.',
        'Ton travail est ennuyeux ? — Non, mon travail est très intéressant.',
        'ennuyeux, intéressant',
        'ennuyeux / intéressant',
        'ennuyeux intéressant'
      ],
      explanation: '« Travail » est masculin singulier : « ennuyeux » (en -eux) et « intéressant » (t final muet au masculin).',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex02': [
    {
      id: 'ch22-ex02-q01',
      exercise_set_id: 'ch22-ex02',
      order_index: 1,
      prompt: 'Les antiquités sont _________.',
      instruction: 'Choisir l\'adjectif logique et correctement accordé.',
      tokens: null,
      options: [
        { id: '1', text: 'méchantes' },
        { id: '2', text: 'vieilles' },
        { id: '3', text: 'courtes' }
      ],
      accepted_answers: ['vieilles', 'vieilles.'],
      explanation: 'Des antiquités sont des objets anciens : « vieilles » (féminin pluriel accordé avec « antiquités »).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex02-q02',
      exercise_set_id: 'ch22-ex02',
      order_index: 2,
      prompt: 'Mon chat est _________.',
      instruction: 'Choisir l\'adjectif logique et correctement accordé.',
      tokens: null,
      options: [
        { id: '1', text: 'adorable' },
        { id: '2', text: 'bavard' },
        { id: '3', text: 'immense' }
      ],
      accepted_answers: ['adorable', 'adorable.'],
      explanation: 'Un chat domestique peut être « adorable ». Les chats ne sont pas « bavards » (qui parlent beaucoup) ni « immenses ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex02-q03',
      exercise_set_id: 'ch22-ex02',
      order_index: 3,
      prompt: 'Le musée du Louvre est _________.',
      instruction: 'Choisir l\'adjectif logique et correctement accordé.',
      tokens: null,
      options: [
        { id: '1', text: 'brave' },
        { id: '2', text: 'dernier' },
        { id: '3', text: 'fascinant' }
      ],
      accepted_answers: ['fascinant', 'fascinant.'],
      explanation: 'Un grand musée d\'art est « fascinant » (adjectif masculin singulier qualifiant le musée).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex02-q04',
      exercise_set_id: 'ch22-ex02',
      order_index: 4,
      prompt: 'Le professeur d’italien est _________.',
      instruction: 'Choisir l\'adjectif logique et correctement accordé.',
      tokens: null,
      options: [
        { id: '1', text: 'silencieux' },
        { id: '2', text: 'intéressant' },
        { id: '3', text: 'final' }
      ],
      accepted_answers: ['intéressant', 'intéressant.'],
      explanation: 'Un enseignant qui donne un bon cours est « intéressant ». Un enseignant ne peut pas être « final » ni normalement « silencieux » en classe.',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex02-q05',
      exercise_set_id: 'ch22-ex02',
      order_index: 5,
      prompt: 'Sa nouvelle histoire est _________.',
      instruction: 'Choisir l\'adjectif logique et correctement accordé.',
      tokens: null,
      options: [
        { id: '1', text: 'première' },
        { id: '2', text: 'folle' },
        { id: '3', text: 'violette' }
      ],
      accepted_answers: ['folle', 'folle.'],
      explanation: 'Une histoire peut être extraordinaire ou extravagante : « folle » (féminin de « fou »). Une histoire ne peut pas être « violette ».',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex03': [
    {
      id: 'ch22-ex03-q01',
      exercise_set_id: 'ch22-ex03',
      order_index: 1,
      prompt: 'Patrick est français. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'française',
        'française.',
        'Sonia est française.',
        'Sonia est française'
      ],
      explanation: 'Ajout du -e au féminin : « français » [fʁɑ̃sɛ] ➔ « française » [fʁɑ̃sɛz] (le s final devient sonore en [z]).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q02',
      exercise_set_id: 'ch22-ex03',
      order_index: 2,
      prompt: 'Patrick est charmant. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'charmante',
        'charmante.',
        'Sonia est charmante.',
        'Sonia est charmante'
      ],
      explanation: 'Ajout du -e au féminin : « charmant » [ʃaʁmɑ̃] ➔ « charmante » [ʃaʁmɑ̃t] (le t final muet devient sonore).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q03',
      exercise_set_id: 'ch22-ex03',
      order_index: 3,
      prompt: 'Patrick est amoureux. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'amoureuse',
        'amoureuse.',
        'Sonia est amoureuse.',
        'Sonia est amoureuse'
      ],
      explanation: 'Les adjectifs en -eux font leur féminin régulier en -euse : « amoureux » ➔ « amoureuse ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q04',
      exercise_set_id: 'ch22-ex03',
      order_index: 4,
      prompt: 'Patrick est beau. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'belle',
        'belle.',
        'Sonia est belle.',
        'Sonia est belle'
      ],
      explanation: 'Féminin irrégulier : « beau » (ou « bel » devant voyelle) ➔ « belle ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q05',
      exercise_set_id: 'ch22-ex03',
      order_index: 5,
      prompt: 'Patrick est agressif. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'agressive',
        'agressive.',
        'Sonia est agressive.',
        'Sonia est agressive'
      ],
      explanation: 'Les adjectifs en -if changent en -ive au féminin : « agressif » ➔ « agressive ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q06',
      exercise_set_id: 'ch22-ex03',
      order_index: 6,
      prompt: 'Patrick est actif. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'active',
        'active.',
        'Sonia est active.',
        'Sonia est active'
      ],
      explanation: 'Les adjectifs en -if changent en -ive au féminin : « actif » ➔ « active ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q07',
      exercise_set_id: 'ch22-ex03',
      order_index: 7,
      prompt: 'Patrick est fou. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'folle',
        'folle.',
        'Sonia est folle.',
        'Sonia est folle'
      ],
      explanation: 'Féminin irrégulier : « fou » (ou « fol » devant voyelle) ➔ « folle ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q08',
      exercise_set_id: 'ch22-ex03',
      order_index: 8,
      prompt: 'Patrick est généreux. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'généreuse',
        'généreuse.',
        'Sonia est généreuse.',
        'Sonia est généreuse'
      ],
      explanation: 'Les adjectifs en -eux font leur féminin en -euse : « généreux » ➔ « généreuse ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q09',
      exercise_set_id: 'ch22-ex03',
      order_index: 9,
      prompt: 'Patrick est roux. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'rousse',
        'rousse.',
        'Sonia est rousse.',
        'Sonia est rousse'
      ],
      explanation: 'Cas particulier : « roux » fait son féminin avec un doublement en -sse ➔ « rousse ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex03-q10',
      exercise_set_id: 'ch22-ex03',
      order_index: 10,
      prompt: 'Patrick est doué. Sonia est _________.',
      instruction: 'Mettre l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'douée',
        'douée.',
        'Sonia est douée.',
        'Sonia est douée'
      ],
      explanation: 'Pour les adjectifs en -é, l\'ajout du -e muet est obligatoire à l\'écrit : « doué » ➔ « douée ».',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex04': [
    {
      id: 'ch22-ex04-q01',
      exercise_set_id: 'ch22-ex04',
      order_index: 1,
      prompt: 'Je suis (more optimistic) que lui.',
      instruction: 'Traduire le comparatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je suis plus optimiste que lui.',
        'Je suis plus optimiste que lui',
        'plus optimiste'
      ],
      explanation: 'Comparatif de supériorité avec un adjectif : « plus + adjectif + que » ➔ « plus optimiste ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q02',
      exercise_set_id: 'ch22-ex04',
      order_index: 2,
      prompt: 'Cécile est (as efficient) que Carole.',
      instruction: 'Traduire le comparatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Cécile est aussi efficace que Carole.',
        'Cécile est aussi efficace que Carole',
        'aussi efficace'
      ],
      explanation: 'Comparatif d\'égalité avec un adjectif : « aussi + adjectif + que » ➔ « aussi efficace ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q03',
      exercise_set_id: 'ch22-ex04',
      order_index: 3,
      prompt: 'Ce vin-ci est (better) que ce vin-là.',
      instruction: 'Traduire le comparatif irrégulier entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ce vin-ci est meilleur que ce vin-là.',
        'Ce vin-ci est meilleur que ce vin-là',
        'meilleur'
      ],
      explanation: 'Comparatif irrégulier de l\'adjectif « bon » : « meilleur » (jamais \*plus bon !).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q04',
      exercise_set_id: 'ch22-ex04',
      order_index: 4,
      prompt: 'Sa sœur est (as intelligent) qu’elle.',
      instruction: 'Traduire le comparatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Sa sœur est aussi intelligente qu’elle.',
        'Sa sœur est aussi intelligente qu\'elle.',
        'Sa sœur est aussi intelligente qu’elle',
        'Sa sœur est aussi intelligente qu\'elle',
        'aussi intelligente'
      ],
      explanation: 'Comparatif d\'égalité : « aussi + adjectif + que ». « Sœur » est féminin ➔ « intelligente ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q05',
      exercise_set_id: 'ch22-ex04',
      order_index: 5,
      prompt: 'Votre chambre est (less expensive) que la mienne.',
      instruction: 'Traduire le comparatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Votre chambre est moins chère que la mienne.',
        'Votre chambre est moins chère que la mienne',
        'moins chère'
      ],
      explanation: 'Comparatif d\'infériorité : « moins + adjectif + que ». « Chambre » est féminin ➔ « chère ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q06',
      exercise_set_id: 'ch22-ex04',
      order_index: 6,
      prompt: 'Arnaud a (as much) argent que vous?',
      instruction: 'Traduire la comparaison de quantité entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Arnaud a autant d’argent que vous?',
        'Arnaud a autant d\'argent que vous?',
        'Arnaud a autant d’argent que vous ?',
        'Arnaud a autant d\'argent que vous ?',
        'autant d’argent',
        'autant d\'argent',
        'autant d’',
        'autant d\''
      ],
      explanation: 'Règle capitale FLE : pour comparer des noms (quantités), on emploie « autant de (d\') » et JAMAIS \*aussi de ! Devant voyelle ➔ « autant d\'argent ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q07',
      exercise_set_id: 'ch22-ex04',
      order_index: 7,
      prompt: 'Ce prix est (the best)!',
      instruction: 'Traduire le superlatif irrégulier entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ce prix est le meilleur!',
        'Ce prix est le meilleur !',
        'Ce prix est le meilleur',
        'le meilleur!',
        'le meilleur'
      ],
      explanation: 'Superlatif de « bon » au masculin singulier (qualifiant « prix ») : « le meilleur ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q08',
      exercise_set_id: 'ch22-ex04',
      order_index: 8,
      prompt: 'Marie a (fewer) paires de chaussures que toi.',
      instruction: 'Traduire la comparaison de quantité entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Marie a moins de paires de chaussures que toi.',
        'Marie a moins de paires de chaussures que toi',
        'moins de'
      ],
      explanation: 'Comparatif d\'infériorité sur une quantité nominale : « moins de + nom + que » ➔ « moins de paires ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q09',
      exercise_set_id: 'ch22-ex04',
      order_index: 9,
      prompt: 'Elle est (more organized) que lui.',
      instruction: 'Traduire le comparatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle est plus organisée que lui.',
        'Elle est plus organisée que lui',
        'plus organisée'
      ],
      explanation: 'Comparatif de supériorité : « plus + organisée + que » (accord au féminin singulier avec « elle »).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex04-q10',
      exercise_set_id: 'ch22-ex04',
      order_index: 10,
      prompt: 'Cet appartement est (the most beautiful) de l’immeuble.',
      instruction: 'Traduire le superlatif entre parenthèses.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Cet appartement est le plus beau de l’immeuble.',
        'Cet appartement est le plus beau de l\'immeuble.',
        'Cet appartement est le plus beau de l’immeuble',
        'Cet appartement est le plus beau de l\'immeuble',
        'le plus beau'
      ],
      explanation: 'Superlatif de supériorité : « le plus beau » (l\'adjectif beau reste sous sa forme standard car il n\'est pas directement devant un nom commençant par voyelle).',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex05': [
    {
      id: 'ch22-ex05-q01',
      exercise_set_id: 'ch22-ex05',
      order_index: 1,
      prompt: 'Charlotte/Lucie/grande/+',
      instruction: 'Formuler une phrase comparative complète de supériorité (+).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Charlotte est plus grande que Lucie.',
        'Charlotte est plus grande que Lucie'
      ],
      explanation: 'Indicateur (+) = supériorité : « Charlotte est plus grande que Lucie. »',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex05-q02',
      exercise_set_id: 'ch22-ex05',
      order_index: 2,
      prompt: 'Charles/Xavier/drôle/=',
      instruction: 'Formuler une phrase comparative complète d\'égalité (=).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Charles est aussi drôle que Xavier.',
        'Charles est aussi drôle que Xavier'
      ],
      explanation: 'Indicateur (=) = égalité : « Charles est aussi drôle que Xavier. » (aussi + adjectif + que).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex05-q03',
      exercise_set_id: 'ch22-ex05',
      order_index: 3,
      prompt: 'Véronique/Sébastien/optimiste/–',
      instruction: 'Formuler une phrase comparative complète d\'infériorité (-).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Véronique est moins optimiste que Sébastien.',
        'Véronique est moins optimiste que Sébastien'
      ],
      explanation: 'Indicateur (-) = infériorité : « Véronique est moins optimiste que Sébastien. »',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex05-q04',
      exercise_set_id: 'ch22-ex05',
      order_index: 4,
      prompt: 'Lucien/sa sœur/intelligent/+',
      instruction: 'Formuler une phrase comparative complète de supériorité (+).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Lucien est plus intelligent que sa sœur.',
        'Lucien est plus intelligent que sa sœur'
      ],
      explanation: 'Indicateur (+) = supériorité : « Lucien est plus intelligent que sa sœur. » (adjectif accordé avec le sujet masculin Lucien).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex05-q05',
      exercise_set_id: 'ch22-ex05',
      order_index: 5,
      prompt: 'Élodie/Thérèse/bronzée/=',
      instruction: 'Formuler une phrase comparative complète d\'égalité (=).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Élodie est aussi bronzée que Thérèse.',
        'Élodie est aussi bronzée que Thérèse'
      ],
      explanation: 'Indicateur (=) = égalité : « Élodie est aussi bronzée que Thérèse. »',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex06': [
    {
      id: 'ch22-ex06-q01',
      exercise_set_id: 'ch22-ex06',
      order_index: 1,
      prompt: 'It’s a good idea.',
      instruction: 'Traduire la phrase en français en plaçant l\'adjectif avant le nom (BANGS).',
      tokens: null,
      options: null,
      accepted_answers: [
        'C’est une bonne idée.',
        'C\'est une bonne idée.',
        'C’est une bonne idée',
        'C\'est une bonne idée'
      ],
      explanation: '« Bon » est un adjectif de bonté qui se place AVANT le nom et s\'accorde au féminin : « une bonne idée ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q02',
      exercise_set_id: 'ch22-ex06',
      order_index: 2,
      prompt: 'They bought an old house in Normandy.',
      instruction: 'Traduire la phrase en français.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont acheté une vieille maison en Normandie.',
        'Elles ont acheté une vieille maison en Normandie.',
        'Ils ont acheté une vieille maison en Normandie',
        'Elles ont acheté une vieille maison en Normandie'
      ],
      explanation: '« Vieux » au féminin singulier est « vieille » et se place avant le nom : « une vieille maison ». La région Normandie prend la préposition « en ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q03',
      exercise_set_id: 'ch22-ex06',
      order_index: 3,
      prompt: 'This young man is ambitious.',
      instruction: 'Traduire la phrase en français.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ce jeune homme est ambitieux.',
        'Ce jeune homme est ambitieux'
      ],
      explanation: '« Jeune » se place avant le nom (« ce jeune homme »). « Ambitieux » est placé après le verbe être.',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q04',
      exercise_set_id: 'ch22-ex06',
      order_index: 4,
      prompt: 'This white shirt is mine.',
      instruction: 'Traduire la phrase en français en plaçant la couleur après le nom.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Cette chemise blanche est à moi.',
        'Cette chemise blanche est à moi',
        'Cette chemise blanche est la mienne.',
        'Cette chemise blanche est la mienne'
      ],
      explanation: '« Chemise » est féminin ➔ « cette chemise blanche ». L\'expression de la possession peut être « est à moi » ou « est la mienne ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q05',
      exercise_set_id: 'ch22-ex06',
      order_index: 5,
      prompt: 'Her aunt loves old French songs.',
      instruction: 'Traduire la phrase en observant la place des adjectifs (âge avant, nationalité après).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Sa tante aime les vieilles chansons françaises.',
        'Sa tante aime les vieilles chansons françaises',
        'Sa tante adore les vieilles chansons françaises.',
        'Sa tante adore les vieilles chansons françaises'
      ],
      explanation: 'Double adjectif : « vieilles » (âge ➔ avant le nom) et « françaises » (nationalité ➔ après le nom) : « les vieilles chansons françaises ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q06',
      exercise_set_id: 'ch22-ex06',
      order_index: 6,
      prompt: 'I do not have your new address.',
      instruction: 'Traduire la phrase négative en français.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je n’ai pas votre nouvelle adresse.',
        'Je n\'ai pas votre nouvelle adresse.',
        'Je n’ai pas votre nouvelle adresse',
        'Je n\'ai pas votre nouvelle adresse',
        'Je n’ai pas ta nouvelle adresse.',
        'Je n\'ai pas ta nouvelle adresse.',
        'Je n’ai pas ta nouvelle adresse',
        'Je n\'ai pas ta nouvelle adresse'
      ],
      explanation: '« Nouveau » au féminin singulier devant « adresse » est « nouvelle » (placé avant le nom) : « votre nouvelle adresse ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q07',
      exercise_set_id: 'ch22-ex06',
      order_index: 7,
      prompt: 'Norway is smaller than France.',
      instruction: 'Traduire la comparaison géographique.',
      tokens: null,
      options: null,
      accepted_answers: [
        'La Norvège est plus petite que la France.',
        'La Norvège est plus petite que la France'
      ],
      explanation: 'Les noms de pays féminins prennent l\'article défini : « La Norvège est plus petite que la France. » (accord féminin de petite).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q08',
      exercise_set_id: 'ch22-ex06',
      order_index: 8,
      prompt: 'She does not like this yellow jacket.',
      instruction: 'Traduire la phrase en français.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle n’aime pas cette veste jaune.',
        'Elle n\'aime pas cette veste jaune.',
        'Elle n’aime pas cette veste jaune',
        'Elle n\'aime pas cette veste jaune',
        'Elle n’aime pas ce blouson jaune.',
        'Elle n\'aime pas ce blouson jaune.'
      ],
      explanation: 'La couleur se place après le nom : « cette veste jaune ». « Jaune » se termine déjà par -e et ne change pas au féminin.',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q09',
      exercise_set_id: 'ch22-ex06',
      order_index: 9,
      prompt: 'She is as ambitious as he is.',
      instruction: 'Traduire le comparatif d\'égalité.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle est aussi ambitieuse que lui.',
        'Elle est aussi ambitieuse que lui'
      ],
      explanation: 'Comparatif d\'égalité : « aussi + adjectif (ambitieuse) + que + pronom disjoint (lui) ».',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex06-q10',
      exercise_set_id: 'ch22-ex06',
      order_index: 10,
      prompt: 'This story is boring.',
      instruction: 'Traduire la phrase en accordant l\'adjectif au féminin singulier.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Cette histoire est ennuyeuse.',
        'Cette histoire est ennuyeuse'
      ],
      explanation: '« Histoire » est féminin : « ennuyeux » ➔ « ennuyeuse » (en -euse).',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ],

  'ch22-ex07': [
    {
      id: 'ch22-ex07-q01',
      exercise_set_id: 'ch22-ex07',
      order_index: 1,
      prompt: 'Il travaillait ici dans le passé. ➔ __',
      instruction: 'Associer à la phrase logique illustrant la nuance de l\'adjectif.',
      tokens: null,
      options: [
        { id: 'a', text: 'Elles sont toutes sales.' },
        { id: 'b', text: 'Elle mesure 1,80 m.' },
        { id: 'c', text: 'Son pauvre genou !' },
        { id: 'd', text: 'Ils sont pauvres.' },
        { id: 'e', text: 'C’est l’ancien directeur.' }
      ],
      accepted_answers: ['e', 'e.', 'C’est l’ancien directeur.', 'C\'est l\'ancien directeur.'],
      explanation: '« Ancien » placé AVANT le nom signifie « précédent, qui n\'exerce plus sa fonction » (ancien directeur = ex-directeur).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex07-q02',
      exercise_set_id: 'ch22-ex07',
      order_index: 2,
      prompt: 'Ils n’ont pas d’argent. ➔ __',
      instruction: 'Associer à la phrase logique illustrant la nuance de l\'adjectif.',
      tokens: null,
      options: [
        { id: 'a', text: 'Elles sont toutes sales.' },
        { id: 'b', text: 'Elle mesure 1,80 m.' },
        { id: 'c', text: 'Son pauvre genou !' },
        { id: 'd', text: 'Ils sont pauvres.' },
        { id: 'e', text: 'C’est l’ancien directeur.' }
      ],
      accepted_answers: ['d', 'd.', 'Ils sont pauvres.', 'Ils sont pauvres'],
      explanation: '« Pauvre » placé APRÈS le nom ou le verbe être signifie « sans ressources financières » (le contraire de riche).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex07-q03',
      exercise_set_id: 'ch22-ex07',
      order_index: 3,
      prompt: 'Il n’a pas de chemise à porter. ➔ __',
      instruction: 'Associer à la phrase logique illustrant la nuance de l\'adjectif.',
      tokens: null,
      options: [
        { id: 'a', text: 'Elles sont toutes sales.' },
        { id: 'b', text: 'Elle mesure 1,80 m.' },
        { id: 'c', text: 'Son pauvre genou !' },
        { id: 'd', text: 'Ils sont pauvres.' },
        { id: 'e', text: 'C’est l’ancien directeur.' }
      ],
      accepted_answers: ['a', 'a.', 'Elles sont toutes sales.', 'Elles sont toutes sales'],
      explanation: '« Sale » placé APRÈS le nom signifie « malpropre, qui nécessite d\'être lavé » (sens physique propre).',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex07-q04',
      exercise_set_id: 'ch22-ex07',
      order_index: 4,
      prompt: 'C’est une femme grande. ➔ __',
      instruction: 'Associer à la phrase logique illustrant la nuance de l\'adjectif.',
      tokens: null,
      options: [
        { id: 'a', text: 'Elles sont toutes sales.' },
        { id: 'b', text: 'Elle mesure 1,80 m.' },
        { id: 'c', text: 'Son pauvre genou !' },
        { id: 'd', text: 'Ils sont pauvres.' },
        { id: 'e', text: 'C’est l’ancien directeur.' }
      ],
      accepted_answers: ['b', 'b.', 'Elle mesure 1,80 m.', 'Elle mesure 1,80 m'],
      explanation: '« Grande » placé APRÈS le nom désigne la taille physique (« Elle mesure 1,80 m »), alors qu\'un « grand homme » désigne un personnage remarquable/historique.',
      created_at: '2026-04-01T10:00:00.000Z'
    },
    {
      id: 'ch22-ex07-q05',
      exercise_set_id: 'ch22-ex07',
      order_index: 5,
      prompt: 'Elle est tombée. ➔ __',
      instruction: 'Associer à la phrase logique illustrant la nuance de l\'adjectif.',
      tokens: null,
      options: [
        { id: 'a', text: 'Elles sont toutes sales.' },
        { id: 'b', text: 'Elle mesure 1,80 m.' },
        { id: 'c', text: 'Son pauvre genou !' },
        { id: 'd', text: 'Ils sont pauvres.' },
        { id: 'e', text: 'C’est l’ancien directeur.' }
      ],
      accepted_answers: ['c', 'c.', 'Son pauvre genou !', 'Son pauvre genou !'],
      explanation: '« Pauvre » placé AVANT le nom exprime la compassion et la pitié (« Son pauvre genou ! » = le genou blessé digne de pitié).',
      created_at: '2026-04-01T10:00:00.000Z'
    }
  ]
};
