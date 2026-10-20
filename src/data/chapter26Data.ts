import { Topic, ExerciseSet, Question } from '@/types/database';

export const CHAPTER_26_THEORY_MARKDOWN = `# Chapitre 26 — Les Nombres (Cardinaux, Ordinaux et Grands Nombres)

Le chapitre 26 est consacré à la maîtrise complète des **nombres cardinaux** (pour compter, quantifier, donner l'heure ou exprimer des prix) et des **nombres ordinaux** (pour classer, ordonner des événements ou désigner des étages).

Pour un apprenant **lusophone**, le système numérique français comporte plusieurs singularités majeures qui contrastent directement avec le portugais :
- **Le système vigésimal (base 20) :** Alors que le portugais utilise un système strictement décimal (*setenta, oitenta, noventa*), le français de France compte par paquets de vingt à partir de 60 : **70 = soixante-dix** (60 + 10), **80 = quatre-vingts** (4 × 20), et **90 = quatre-vingt-dix** (4 × 20 + 10) !
- **L'accord de « vingt » et de « cent » :** *Vingt* et *cent* prennent la marque du pluriel (**-s**) quand ils sont multipliés et qu'ils terminent le nombre (*quatre-vingts*, *deux cents*). Dès qu'un autre chiffre les suit, le **-s** disparaît (*quatre-vingt-trois*, *deux cent cinq*) !
- **L'invariabilité absolue de « mille » :** Contrairement à *cent*, **mille** ne prend **JAMAIS de -s** (*trois mille personnes*, *dix mille euros*).
- **« Million » et « milliard » sont des noms :** Ils prennent un **-s** au pluriel (*deux millions*, *trois milliards*) et exigent la préposition **de / d'** devant un nom (*huit milliards d'habitants*).
- **La conjonction « et un » :** On dit *vingt et un*, *trente et un*, *quarante et un*, *cinquante et un*, *soixante et un*, *soixante et onze*, mais **JAMAIS** avec 80 ni 90 (*quatre-vingt-un*, *quatre-vingt-onze* sans « et »).
- **Le piège architectural des étages :** En France, le niveau de la rue est le **rez-de-chaussée (RDC)**. L'étage au-dessus est le **premier étage** (en anglais américain, c'est le *second floor* ; en portugais brésilien, attention à ne pas confondre le rez-de-chaussée avec le premier étage).
- **La réforme orthographique de 1990 :** Traditionnellement, on mettait des traits d'union uniquement entre les dizaines et les unités inférieures à cent (*vingt-trois*, mais *cent vingt-trois*). Depuis les rectifications de 1990, **tous les éléments d'un nombre composé peuvent être reliés par des traits d'union** (*deux-mille-vingt-six*, *cent-soixante-dix*). Notre plateforme accepte avec bienveillance les deux graphies !

---

## 1. Les Nombres Cardinaux de 0 à 50 et leurs Règles Phonétiques

### A. Liste des nombres de 0 à 50

| Chiffre | Écriture en lettres | Prononciation API | Traduction Portugaise |
|---|---|---|---|
| **0** | zéro | /ze.ʁo/ | zero |
| **1** | un | /œ̃/ | um |
| **2** | deux | /dø/ | dois |
| **3** | trois | /tʁwa/ | três |
| **4** | quatre | /katʁ/ | quatro |
| **5** | cinq | /sɛ̃k/ | cinco |
| **6** | six | /sis/ | seis |
| **7** | sept | /sɛt/ | sete |
| **8** | huit | /ɥit/ | oito |
| **9** | neuf | /nœf/ | nove |
| **10** | dix | /dis/ | dez |
| **11** | onze | /ɔ̃z/ | onze |
| **12** | douze | /duz/ | doze |
| **13** | treize | /tʁɛz/ | treze |
| **14** | quatorze | /ka.tɔʁz/ | quatorze / catorze |
| **15** | quinze | /kɛ̃z/ | quinze |
| **16** | seize | /sɛz/ | dezesseis |
| **17** | dix-sept | /dis.sɛt/ | dezessete |
| **18** | dix-huit | /di.z‿ɥit/ | dezoito |
| **19** | dix-neuf | /diz.nœf/ | dezenove |
| **20** | vingt | /vɛ̃/ | vinte |
| **21** | vingt et un | /vɛ̃.t‿e.œ̃/ | vinte e um |
| **22** | vingt-deux | /vɛ̃t.dø/ | vinte e dois |
| **23** | vingt-trois | /vɛ̃t.tʁwa/ | vinte e três |
| **24** | vingt-quatre | /vɛ̃t.katʁ/ | vinte e quatro |
| **25** | vingt-cinq | /vɛ̃t.sɛ̃k/ | vinte e cinco |
| **26** | vingt-six | /vɛ̃t.sis/ | vinte e seis |
| **27** | vingt-sept | /vɛ̃t.sɛt/ | vinte e sete |
| **28** | vingt-huit | /vɛ̃.t‿ɥit/ | vinte e oito |
| **29** | vingt-neuf | /vɛ̃t.nœf/ | vinte e nove |
| **30** | trente | /tʁɑ̃t/ | trinta |
| **31** | trente et un | /tʁɑ̃.t‿e.œ̃/ | trinta e um |
| **32** | trente-deux | /tʁɑ̃t.dø/ | trinta e dois |
| **40** | quarante | /ka.ʁɑ̃t/ | quarenta |
| **41** | quarante et un | /ka.ʁɑ̃.t‿e.œ̃/ | quarenta e um |
| **42** | quarante-deux | /ka.ʁɑ̃t.dø/ | quarenta e dois |
| **50** | cinquante | /sɛ̃.kɑ̃t/ | cinquenta |

### B. Règles phonétiques capitales pour les lusophones

En français standard, les consonnes finales sont en général muettes. Mais pour certains chiffres de base, la prononciation varie selon le contexte syntaxique :

1. **Cinq (/sɛ̃k/), Six (/sis/), Huit (/ɥit/), Dix (/dis/) :**
   - **Isolés ou en fin de phrase :** la consonne finale se prononce : *J'en ai six* (/sis/), *Il est huit heures* (/ɥit/).
   - **Devant une consonne :** la consonne finale devient **muette** : *six livres* (/si livʁ/), *dix tables* (/di tabl/), *huit garçons* (/ɥi ɡaʁ.sɔ̃/), *cinq minutes* (/sɛ̃ mi.nyt/).
   - **Devant une voyelle ou un h muet :** liaison sonore :
     - *six* et *dix* se lient en **/z/** : *six amis* (/si-z-a.mi/), *dix euros* (/di-z-ø.ʁo/).
     - *huit* se lie en **/t/** : *huit enfants* (/ɥi-t-ɑ̃.fɑ̃/).
     - *neuf* se lie en **/v/** devant *ans* et *heures* : *neuf ans* (/nœ-v-ɑ̃/), *neuf heures* (/nœ-v-œʁ/).
2. **Sept (/sɛt/) :** Le **p** est TOUJOURS muet. Ne prononcez jamais \\*sɛpt ! Le **t** final se prononce toujours (/sɛt/).
3. **Vingt (/vɛ̃/) :**
   - Le mot *vingt* seul se prononce /vɛ̃/ (le *g* et le *t* sont muets).
   - De 21 à 29, le **t** est prononcé : *vingt-deux* (/vɛ̃t.dø/), *vingt-cinq* (/vɛ̃t.sɛ̃k/).
   - Dans *quatre-vingts* (80), le **t** redevient muet (/katʁə.vɛ̃/) !

---

## 2. Les Nombres Ordinaux, les Étages et le Vocabulaire Numérique / Internet

### A. Formation des nombres ordinaux

Les ordinaux indiquent le rang ou l'ordre d'un élément dans une suite. Ils se forment généralement en ajoutant le suffixe **-ième** au nombre cardinal :

| Cardinal | Ordinal | Abréviation | Traduction Portugaise | Remarques phonétiques et orthographiques |
|---|---|---|---|---|
| un / une | **premier / première** | 1ᵉʳ / 1ʳᵉ | primeiro / primeira | Exception irrégulière complète. Forme féminine en *-ière*. |
| deux | **deuxième** / *second(e)* | 2ᵉ / 2ᵈ(ᵉ) | segundo / segunda | *Second* se prononce avec un /ɡ/ (/sə.ɡɔ̃/). |
| trois | **troisième** | 3ᵉ | terceiro / terceira | Régulier. |
| quatre | **quatrième** | 4ᵉ | quarto / quarta | Le **e** final de *quatre* disparaît avant *-ième*. |
| cinq | **cinquième** | 5ᵉ | quinto / quinta | On ajoute un **u** après le *q* pour conserver le son /k/. |
| six | **sixième** | 6ᵉ | sexto / sexta | Le *x* se prononce comme un **/z/** (/si.zjɛm/). |
| sept | **septième** | 7ᵉ | sétimo / sétima | Le *p* reste muet (/sɛ.tjɛm/). |
| huit | **huitième** | 8ᵉ | oitavo / oitava | Pas d'élision ni de liaison : *le huitième* (h aspiré). |
| neuf | **neuvième** | 9ᵉ | nono / nona | Le **f** se transforme en **v** (/nœ.vjɛm/) ! |
| dix | **dixième** | 10ᵉ | décimo / décima | Le *x* se prononce comme un **/z/** (/di.zjɛm/). |
| vingt | **vingtième** | 20ᵉ | vigésimo | Régulier. |
| vingt et un | **vingt et unième** | 21ᵉ | vigésimo primeiro | Pas de \\*premier ici : on utilise *unième* ! |
| trente | **trentième** | 30ᵉ | trigésimo | Le *e* final disparaît. |
| quarante | **quarantième** | 40ᵉ | quadragésimo | Le *e* final disparaît. |
| cinquante | **cinquantième** | 50ᵉ | quinquagésimo | Le *e* final disparaît. |
| cent | **centième** | 100ᵉ | centésimo | Régulier. |
| mille | **millième** | 1 000ᵉ | milésimo | Régulier. |

> [!TIP]
> **Deuxième ou Second ?**
> - On emploie **second / seconde** lorsqu'il n'y a que deux éléments dans la série : *la Seconde Guerre mondiale* (il n'y en a pas eu de troisième), *une seconde chance*.
> - On emploie **deuxième** lorsque la suite comporte plus de deux éléments ou qu'elle est ouverte : *le deuxième chapitre* (d'un livre de 28 chapitres), *la deuxième voiture*.

### B. Les étages et la vie quotidienne : Le piège du rez-de-chaussée

Dans les pays francophones (France, Belgique, Suisse) :
- Le niveau de la rue est le **rez-de-chaussée** (abrégé **RDC**).
- Le premier niveau au-dessus du rez-de-chaussée est le **premier étage** (1ᵉʳ étage).
- Par conséquent, si un ami français vous dit qu'il habite au *deuxième étage*, cela correspond au 2ᵉ étage au-dessus du sol.

### C. Vocabulaire moderne de l'Internet et de l'informatique

Ce chapitre introduit le lexique officiel francophone du Web et de la technologie :

| Mot Français | Genre | Traduction Portugaise | Définition / Usage |
|---|---|---|---|
| **l'accès haut-débit** | m. | acesso banda larga | Connexion Internet rapide. |
| **un administrateur / une administratrice de site** | m. / f. | administrador(a) de site / webmaster | Personne responsable de la gestion d'un site. |
| **une adresse URL / une adresse IP** | f. | endereço URL / IP | Identifiant numérique ou textuel réseau. |
| **les autoroutes de l'information** | m.pl. | as rodovias da informação | Réseaux de communication mondiaux. |
| **une bibliothèque numérique** | f. | biblioteca digital | Recueil en ligne de livres et documents. Attention : *librairie* = livraria ! |
| **un blog** | m. | um blog | Journal web en ligne. |
| **un domaine** | m. | um domínio | Nom de domaine internet (.fr, .com). |
| **une fenêtre** | f. | uma janela | Zone graphique affichée à l'écran. |
| **une foire aux questions (FAQ)** | f. | perguntas frequentes | Liste des questions posées fréquemment. |
| **un fournisseur d'accès (FAI)** | m. | provedor de acesso à internet | Entreprise fournissant la connexion réseau. |
| **glisser-déposer** | loc. verb. | arrastar e soltar (drag and drop) | Déplacer un élément à la souris ou au doigt. |
| **un(e) internaute** | m. / f. | um(a) internauta | Utilisateur naviguant sur le réseau. |
| **un moteur de recherche** | m. | mecanismo de busca (ex: Google) | Outil de recherche d'informations sur la Toile. |
| **naviguer / surfer** | v. | navegar / surfar | Consulter des pages sur Internet. |
| **une page d'accueil** | f. | página inicial (home page) | Première page d'un site Web. |
| **une page web** | f. | página da web | Document numérique en ligne. |
| **un pirate** | m. | um hacker / cracker | Personne qui s'infiltre illégalement dans un système. |
| **rechercher** | v. | pesquisar / buscar | Trouver des données en ligne. |
| **un site Web** | m. | um site / página web | Ensemble de pages hébergées sous un même domaine. |
| **un serveur** | m. | um servidor | Machine hébergeant des données ou des sites. |
| **un signet** | m. | um favorito / marcador (bookmark) | Raccourci vers une page web favorite. |
| **la Toile** | f. | a Rede / Web (World Wide Web) | Métaphore pour désigner l'ensemble du réseau mondial. |
| **le Web 2.0** | m. | a Web 2.0 (/vɛb dø pwɛ̃ ze.ʁo/) | Le web participatif et interactif. |

---

## 3. Les Nombres de 50 à 99 et le Système Vigésimal

À partir de 60, le français de France quitte la logique décimale pour adopter des combinaisons héritées du compte celte par vingtaines :

### A. La tranche 60 à 79

- **60 à 69 :** logique décimale classique :
  - 60 = *soixante*
  - 61 = *soixante et un* (avec « et »)
  - 62 = *soixante-deux*, 63 = *soixante-trois*, ..., 69 = *soixante-neuf*
- **70 à 79 :** soixante + les nombres de 10 à 19 :
  - 70 = **soixante-dix** (60 + 10)
  - 71 = **soixante et onze** (60 + 11 — notez la présence de « et » !)
  - 72 = **soixante-douze** (60 + 12)
  - 73 = **soixante-treize** (60 + 13)
  - 74 = **soixante-quatorze** (60 + 14)
  - 75 = **soixante-quinze** (60 + 15)
  - 76 = **soixante-seize** (60 + 16)
  - 77 = **soixante-dix-sept** (60 + 17)
  - 78 = **soixante-dix-huit** (60 + 18)
  - 79 = **soixante-dix-neuf** (60 + 19)

### B. La tranche 80 à 99 : Quatre-vingts et Quatre-vingt-dix

- **80 = quatre-vingts (4 × 20) :**
  - **Règle capitale de l'orthographe :** *vingt* prend un **-s** à 80 : **quatre-vingts**.
  - **Dès qu'un nombre s'ajoute, le -s DISPARAÎT :**
    - 81 = **quatre-vingt-un** (Attention : PAS de « et », et PAS de -s sur vingt !)
    - 82 = **quatre-vingt-deux**
    - 83 = **quatre-vingt-trois**
    - 85 = **quatre-vingt-cinq**
    - 89 = **quatre-vingt-neuf**
- **90 à 99 = quatre-vingt + les nombres de 10 à 19 :**
  - 90 = **quatre-vingt-dix** (4 × 20 + 10 — pas de -s sur vingt !)
  - 91 = **quatre-vingt-onze** (PAS de « et » !)
  - 92 = **quatre-vingt-douze**
  - 93 = **quatre-vingt-treize**
  - 94 = **quatre-vingt-quatorze**
  - 95 = **quatre-vingt-quinze**
  - 96 = **quatre-vingt-seize**
  - 97 = **quatre-vingt-dix-sept**
  - 98 = **quatre-vingt-dix-huit**
  - 99 = **quatre-vingt-dix-neuf**

---

## 4. Les Centaines (100 à 999) et la Règle d'Accord de « Cent »

### A. La série des centaines

- 100 = **cent**
- 101 = **cent un** (sans « et » !)
- 114 = **cent quatorze**
- 126 = **cent vingt-six**
- 160 = **cent soixante**
- 178 = **cent soixante-dix-huit**
- 180 = **cent quatre-vingts** (accord avec -s sur vingts !)
- 181 = **cent quatre-vingt-un** (pas d'-s sur vingt)

### B. La règle d'or pour l'accord de « Cent »

**Cent prend un -s au pluriel si et seulement si deux conditions sont réunies :**
1. Il est **multiplié** (deux cents, trois cents, quatre cents, etc.).
2. Il **termine le nombre** (il n'est suivi d'aucun autre chiffre).

> [!IMPORTANT]
> **Exemples comparatifs essentiels :**
> - *200* = **deux cents** (multiplié et termine le nombre -> **-s**)
> - *205* = **deux cent cinq** (suivi de cinq -> **PAS d'-s**)
> - *800* = **huit cents** (termine le nombre -> **-s**)
> - *815* = **huit cent quinze** (suivi de quinze -> **PAS d'-s**)
> - *280* = **deux cent quatre-vingts** (cent est suivi de quatre-vingts donc pas d'-s sur cent, mais vingts termine donc prend un -s !)
> - *283* = **deux cent quatre-vingt-trois** (ni cent ni vingt ne prennent de -s !)

---

## 5. Les Grands Nombres (1 000 et plus), l'Invariable « Mille » et les Dates

### A. L'invariabilité absolue de « Mille »

Le mot **mille** (1 000) est un adjectif numéral invariable. Il ne prend **JAMAIS d'-s** :
- *1 000* = **mille**
- *1 005* = **mille cinq**
- *2 000* = **deux mille** (JAMAIS \\*deux milles !)
- *2 456* = **deux mille quatre cent cinquante-six**
- *10 450* = **dix mille quatre cent cinquante**
- *24 008* = **vingt-quatre mille huit**

### B. « Million » et « Milliard » : des noms à part entière

Contrairement à *mille*, **million** et **milliard** sont de véritables **noms communs** :
- Ils prennent la marque du pluriel (**-s**) dès qu'ils sont multipliés par 2 ou plus :
  - *1 000 000* = **un million**
  - *2 000 000* = **deux millions**
  - *1 000 000 000* = **un milliard**
  - *8 000 000 000* = **huit milliards**
- Devant un nom, ils exigent la préposition **de / d'** :
  - *Il a gagné deux millions **d'**euros.*
  - *Nous sommes plus de huit milliards **d'**êtres humains.*
- Exemples de nombres complexes :
  - *1 230 000* = **un million deux cent trente mille**
  - *30 030 000* = **trente millions trente mille**
  - *1 600 000 000* = **un milliard six cent millions** (ou *six cents millions*)

### C. Comment écrire et lire les années en français

Pour les années, deux tournures coexistent traditionnellement :
1. **Lecture séculaire par centaines (jusqu'en 1999) :**
   - *1978* = **mille neuf cent soixante-dix-huit** OU **dix-neuf cent soixante-dix-huit**
   - *1885* = **mille huit cent quatre-vingt-cinq** OU **dix-huit cent quatre-vingt-cinq**
2. **Lecture directe moderne (depuis l'an 2000) :**
   - *2007* = **deux mille sept**
   - *2023* = **deux mille vingt-trois**
   - *2026* = **deux mille vingt-six**
   - *2028* = **deux mille vingt-huit**
`;

export const CH26_FALLBACK_TOPICS: Topic[] = [
  {
    id: 'ch26-t01',
    chapter_id: 'ch26',
    order_index: 1,
    title: 'Nombres cardinaux de 0 à 50 et particularités phonétiques',
    rule_summary: "Les consonnes finales de cinq, six, huit et dix sont prononcées lorsqu'ils sont isolés, muettes devant consonne, et donnent lieu à des liaisons sonores devant voyelle.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-t02',
    chapter_id: 'ch26',
    order_index: 2,
    title: 'Nombres ordinaux, étages (le rez-de-chaussée) et vocabulaire du Web',
    rule_summary: "Formation en -ième (premier/première et second/seconde comme exceptions). Le rez-de-chaussée correspond au niveau de la rue et le premier étage au niveau supérieur.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-t03',
    chapter_id: 'ch26',
    order_index: 3,
    title: 'Nombres de 50 à 99 et le système vigésimal (soixante-dix, quatre-vingts)',
    rule_summary: "Le compte en base 20 : 70 = soixante-dix, 80 = quatre-vingts (avec un -s), 90 = quatre-vingt-dix. Vingt perd son -s dès qu'un autre chiffre s'ajoute.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-t04',
    chapter_id: 'ch26',
    order_index: 4,
    title: 'Les centaines (100 à 999) et la règle d\'accord de « cent »',
    rule_summary: "Cent prend un -s au pluriel uniquement s'il est multiplié et qu'il termine le nombre (deux cents vs deux cent cinq).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-t05',
    chapter_id: 'ch26',
    order_index: 5,
    title: 'Grands nombres (1 000+), invariabilité de « mille », millions et dates',
    rule_summary: "Mille est strictement invariable. Million et milliard sont des noms et prennent la marque du pluriel -s ainsi que la préposition de devant un nom.",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

export const CH26_FALLBACK_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch26-ex01',
    chapter_id: 'ch26',
    order_index: 1,
    title: 'Exercice 26.1 — Écrire les nombres cardinaux de 0 à 50 en toutes lettres',
    interaction_type: 'fill_blank',
    questions_count: 10,
    instruction: 'Écrivez le nombre en toutes lettres en français.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex02',
    chapter_id: 'ch26',
    order_index: 2,
    title: 'Exercice 26.2 — Nombres ordinaux, étages et expressions de rang',
    interaction_type: 'translation',
    questions_count: 10,
    instruction: 'Traduisez la phrase en portugais ou formulez la compréhension exacte de l\'expression ordinale.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex03',
    chapter_id: 'ch26',
    order_index: 3,
    title: 'Exercice 26.3 — Transcrire les nombres en chiffres (50 à 99)',
    interaction_type: 'fill_blank',
    questions_count: 10,
    instruction: 'Écrivez le nombre en chiffres (ex: 53).',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex04',
    chapter_id: 'ch26',
    order_index: 4,
    title: 'Exercice 26.4 — Écrire les nombres de 100 à 199 en toutes lettres',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    instruction: 'Écrivez le nombre en toutes lettres en français.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex05',
    chapter_id: 'ch26',
    order_index: 5,
    title: 'Exercice 26.5 — Traduire les centaines de l\'anglais vers le français',
    interaction_type: 'translation',
    questions_count: 10,
    instruction: 'Traduisez le nombre en toutes lettres en français.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex06',
    chapter_id: 'ch26',
    order_index: 6,
    title: 'Exercice 26.6 — Centaines et accords de « cent » en toutes lettres',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    instruction: 'Écrivez le nombre en toutes lettres en appliquant la règle d\'accord de cent.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex07',
    chapter_id: 'ch26',
    order_index: 7,
    title: 'Exercice 26.7 — Les grands nombres (1 000 à plus d\'un milliard)',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    instruction: 'Écrivez le grand nombre en toutes lettres en français.',
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-ex08',
    chapter_id: 'ch26',
    order_index: 8,
    title: 'Exercice 26.8 — Nombres réels, dates et statistiques contemporaines',
    interaction_type: 'fill_blank',
    questions_count: 10,
    instruction: 'Transcrivez le nombre souligné en toutes lettres en français.',
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.1 (10 Questions)
// ==========================================
export const CH26_EX01_QUESTIONS: Question[] = [
  {
    id: 'ch26-q01',
    exercise_set_id: 'ch26-ex01',
    order_index: 1,
    prompt: "Écrivez le nombre en toutes lettres : 6",
    instruction: "Écrivez en toutes lettres.",
    options: ['six', 'dix', 'sept', 'huit'],
    tokens: ['six', 'dix', 'sept', 'huit'],
    accepted_answers: ['six'],
    explanation: "6 s'écrit « six ». La consonne finale s'articule /sis/ lorsqu'il est seul.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q02',
    exercise_set_id: 'ch26-ex01',
    order_index: 2,
    prompt: "Écrivez le nombre en toutes lettres : 14",
    instruction: "Écrivez en toutes lettres.",
    options: ['quatorze', 'quinze', 'quatre', 'quarante'],
    tokens: ['quatorze', 'quinze', 'seize', 'treize'],
    accepted_answers: ['quatorze'],
    explanation: "14 s'écrit « quatorze ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q03',
    exercise_set_id: 'ch26-ex01',
    order_index: 3,
    prompt: "Écrivez le nombre en toutes lettres : 23",
    instruction: "Écrivez en toutes lettres avec trait d'union.",
    options: ['vingt-trois', 'vingt et trois', 'trente-trois', 'vingt trois'],
    tokens: ['vingt-trois', 'vingt', 'trois', '-'],
    accepted_answers: ['vingt-trois', 'vingt trois'],
    explanation: "23 s'écrit « vingt-trois ». Les unités au-delà de 1 sont reliées par un trait d'union.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q04',
    exercise_set_id: 'ch26-ex01',
    order_index: 4,
    prompt: "Écrivez le nombre en toutes lettres : 28",
    instruction: "Écrivez en toutes lettres avec trait d'union.",
    options: ['vingt-huit', 'vingt et huit', 'trente-huit', 'dix-huit'],
    tokens: ['vingt-huit', 'vingt', 'huit', '-'],
    accepted_answers: ['vingt-huit', 'vingt huit'],
    explanation: "28 s'écrit « vingt-huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q05',
    exercise_set_id: 'ch26-ex01',
    order_index: 5,
    prompt: "Écrivez le nombre en toutes lettres : 35",
    instruction: "Écrivez en toutes lettres.",
    options: ['trente-cinq', 'trente et cinq', 'quarante-cinq', 'vingt-cinq'],
    tokens: ['trente-cinq', 'trente', 'cinq', '-'],
    accepted_answers: ['trente-cinq', 'trente cinq'],
    explanation: "35 s'écrit « trente-cinq ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q06',
    exercise_set_id: 'ch26-ex01',
    order_index: 6,
    prompt: "Écrivez le nombre en toutes lettres : 39",
    instruction: "Écrivez en toutes lettres.",
    options: ['trente-neuf', 'quarante-neuf', 'trente et neuf', 'vingt-neuf'],
    tokens: ['trente-neuf', 'trente', 'neuf', '-'],
    accepted_answers: ['trente-neuf', 'trente neuf'],
    explanation: "39 s'écrit « trente-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q07',
    exercise_set_id: 'ch26-ex01',
    order_index: 7,
    prompt: "Écrivez le nombre en toutes lettres : 41",
    instruction: "Attention à la conjonction et un !",
    options: ['quarante et un', 'quarante-un', 'quarante-et-un', 'quarante un'],
    tokens: ['quarante', 'et', 'un', '-', 'quarante et un'],
    accepted_answers: ['quarante et un', 'quarante-et-un'],
    explanation: "41 s'écrit traditionnellement « quarante et un » (ou « quarante-et-un » selon la réforme de 1990).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q08',
    exercise_set_id: 'ch26-ex01',
    order_index: 8,
    prompt: "Écrivez le nombre en toutes lettres : 46",
    instruction: "Écrivez en toutes lettres.",
    options: ['quarante-six', 'cinquante-six', 'trente-six', 'quarante six'],
    tokens: ['quarante-six', 'quarante', 'six', '-'],
    accepted_answers: ['quarante-six', 'quarante six'],
    explanation: "46 s'écrit « quarante-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q09',
    exercise_set_id: 'ch26-ex01',
    order_index: 9,
    prompt: "Écrivez le nombre en toutes lettres : 49",
    instruction: "Écrivez en toutes lettres.",
    options: ['quarante-neuf', 'cinquante-neuf', 'trente-neuf', 'quarante neuf'],
    tokens: ['quarante-neuf', 'quarante', 'neuf', '-'],
    accepted_answers: ['quarante-neuf', 'quarante neuf'],
    explanation: "49 s'écrit « quarante-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q10',
    exercise_set_id: 'ch26-ex01',
    order_index: 10,
    prompt: "Écrivez le nombre en toutes lettres : 52",
    instruction: "Écrivez en toutes lettres.",
    options: ['cinquante-deux', 'quarante-deux', 'cinquante et deux', 'soixante-deux'],
    tokens: ['cinquante-deux', 'cinquante', 'deux', '-'],
    accepted_answers: ['cinquante-deux', 'cinquante deux'],
    explanation: "52 s'écrit « cinquante-deux ».",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.2 (10 Questions)
// ==========================================
export const CH26_EX02_QUESTIONS: Question[] = [
  {
    id: 'ch26-q11',
    exercise_set_id: 'ch26-ex02',
    order_index: 1,
    prompt: "Il a perdu pour la troisième fois.",
    instruction: "Traduisez la phrase en anglais ou en portugais.",
    options: null,
    tokens: ['Ele', 'perdeu', 'pela', 'terceira', 'vez', '.', 'He', 'lost', 'for', 'the', 'third', 'time'],
    accepted_answers: [
      'He lost for the third time.',
      'He lost for the 3rd time.',
      'Ele perdeu pela terceira vez.',
      'Ele perdeu pela 3ª vez.'
    ],
    explanation: "« Pour la troisième fois » signifie « pela terceira vez » / « for the third time ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q12',
    exercise_set_id: 'ch26-ex02',
    order_index: 2,
    prompt: "J'habite au trente et unième étage.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Eu', 'moro', 'no', 'trigésimo', 'primeiro', 'andar', '.', 'I', 'live', 'on', 'the', 'thirty-first', 'floor'],
    accepted_answers: [
      'I live on the thirty-first floor.',
      'I live on the 31st floor.',
      'Eu moro no trigésimo primeiro andar.',
      'Moro no trigésimo primeiro andar.',
      'Moro no 31º andar.',
      'Eu moro no 31º andar.'
    ],
    explanation: "« Au trente et unième étage » : notez la forme ordinale régulière « trente et unième ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q13',
    exercise_set_id: 'ch26-ex02',
    order_index: 3,
    prompt: "Elle a vendu sa deuxième voiture.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Ela', 'vendeu', 'seu', 'segundo', 'carro', '.', 'She', 'sold', 'her', 'second', 'car'],
    accepted_answers: [
      'She sold her second car.',
      'Ela vendeu seu segundo carro.',
      'Ela vendeu o seu segundo carro.'
    ],
    explanation: "« Sa deuxième voiture » : deuxième voiture d'une suite potentielle de plusieurs.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q14',
    exercise_set_id: 'ch26-ex02',
    order_index: 4,
    prompt: "C'est son cinquante-huitième anniversaire.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ["It's", 'his', 'her', 'fifty-eighth', 'birthday', '.', 'É', 'o', 'seu', 'quinquagésimo', 'oitavo', 'aniversário'],
    accepted_answers: [
      "It's his fifty-eighth birthday.",
      "It's her fifty-eighth birthday.",
      "It is his fifty-eighth birthday.",
      "It is her fifty-eighth birthday.",
      "It's his/her fifty-eighth birthday.",
      'É o seu quinquagésimo oitavo aniversário.',
      'É o quinquagésimo oitavo aniversário dele.',
      'É o quinquagésimo oitavo aniversário dela.',
      'É o aniversário de 58 anos dele.',
      'É o aniversário de 58 anos dela.'
    ],
    explanation: "« Cinquante-huitième anniversaire » = quinquagésimo oitavo aniversário / 58th birthday.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q15',
    exercise_set_id: 'ch26-ex02',
    order_index: 5,
    prompt: "Nous avons fait du ski pour la première fois.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Nós', 'esquiamos', 'pela', 'primeira', 'vez', '.', 'We', 'skied', 'for', 'the', 'first', 'time'],
    accepted_answers: [
      'We skied for the first time.',
      'We went skiing for the first time.',
      'Nós esquiamos pela primeira vez.',
      'Esquiamos pela primeira vez.',
      'Nós fizemos esqui pela primeira vez.'
    ],
    explanation: "« Pour la première fois » = pela primeira vez / for the first time. « Faire du ski » = esquiar.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q16',
    exercise_set_id: 'ch26-ex02',
    order_index: 6,
    prompt: "C'est la quatrième fois que nous nous croisons dans la rue.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ["It's", 'the', 'fourth', 'time', 'we', 'cross', 'met', 'É', 'a', 'quarta', 'vez', 'que', 'nos', 'cruzamos'],
    accepted_answers: [
      "It's the fourth time we have run into each other on the street.",
      "It's the fourth time that we have run into each other on the street.",
      "It's the fourth time we ran into each other in the street.",
      "It is the fourth time we have run into each other on the street.",
      'É a quarta vez que nos cruzamos na rua.',
      'É a quarta vez que nós nos cruzamos na rua.'
    ],
    explanation: "« Quatrième fois » = quarta vez / fourth time. « Se croiser » = cruzar-se / run into each other.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q17',
    exercise_set_id: 'ch26-ex02',
    order_index: 7,
    prompt: "Il a obtenu la quarante-huitième place.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Ele', 'obteve', 'o', 'quadragésimo', 'oitavo', 'lugar', '.', 'He', 'got', 'forty-eighth', 'place'],
    accepted_answers: [
      'He got forty-eighth place.',
      'He obtained forty-eighth place.',
      'He got the forty-eighth place.',
      'Ele obteve o quadragésimo oitavo lugar.',
      'Ele conseguiu o quadragésimo oitavo lugar.',
      'Ele ficou em quadragésimo oitavo lugar.',
      'Ele ficou no 48º lugar.'
    ],
    explanation: "« Quarante-huitième place » = quadragésimo oitavo lugar / forty-eighth place.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q18',
    exercise_set_id: 'ch26-ex02',
    order_index: 8,
    prompt: "J'adore la neuvième symphonie de Beethoven.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Eu', 'adoro', 'a', 'nona', 'sinfonia', 'de', 'Beethoven', '.', 'I', 'love', "Beethoven's", 'Ninth', 'Symphony'],
    accepted_answers: [
      "I love Beethoven's Ninth Symphony.",
      "I love the Ninth Symphony of Beethoven.",
      "I adore Beethoven's Ninth Symphony.",
      'Eu adoro a nona sinfonia de Beethoven.',
      'Adoro a nona sinfonia de Beethoven.',
      'Eu amo a nona sinfonia de Beethoven.'
    ],
    explanation: "« Neuvième » : notez que le « f » de « neuf » se change en « v » : neuvième !",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q19',
    exercise_set_id: 'ch26-ex02',
    order_index: 9,
    prompt: "Il habite au coin de la vingt-troisième rue et de la septième avenue.",
    instruction: "Traduisez la phrase.",
    options: null,
    tokens: ['Ele', 'mora', 'na', 'esquina', 'da', 'Rua', '23', 'e', 'Sétima', 'Avenida', '.', 'He', 'lives', 'at', 'the', 'corner'],
    accepted_answers: [
      'He lives at the corner of Twenty-third Street and Seventh Avenue.',
      'He lives on the corner of 23rd Street and 7th Avenue.',
      'Ele mora na esquina da Rua 23 com a Sétima Avenida.',
      'Ele mora na esquina da 23ª rua com a 7ª avenida.',
      'Ele mora na esquina da rua vinte e três com a sétima avenida.'
    ],
    explanation: "« Vingt-troisième rue » = 23rd Street / Rua 23 ; « septième avenue » = 7th Avenue / 7ª Avenida.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q20',
    exercise_set_id: 'ch26-ex02',
    order_index: 10,
    prompt: "C'est sa deuxième année ?",
    instruction: "Traduisez la question.",
    options: null,
    tokens: ['Is', 'it', 'his', 'her', 'second', 'year', '?', 'É', 'o', 'seu', 'segundo', 'ano'],
    accepted_answers: [
      'Is it his second year?',
      'Is it her second year?',
      'Is it his/her second year?',
      'É o seu segundo ano?',
      'É o segundo ano dele?',
      'É o segundo ano dela?'
    ],
    explanation: "« Deuxième année » = segundo ano / second year.",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.3 (10 Questions)
// ==========================================
export const CH26_EX03_QUESTIONS: Question[] = [
  {
    id: 'ch26-q21',
    exercise_set_id: 'ch26-ex03',
    order_index: 1,
    prompt: "Transcrivez en chiffres : cinquante-trois",
    instruction: "Écrivez le nombre en chiffres.",
    options: ['53', '35', '63', '43'],
    tokens: ['53', '35', '63', '43'],
    accepted_answers: ['53'],
    explanation: "« Cinquante-trois » = 53.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q22',
    exercise_set_id: 'ch26-ex03',
    order_index: 2,
    prompt: "Transcrivez en chiffres : cinquante-neuf",
    instruction: "Écrivez le nombre en chiffres.",
    options: ['59', '95', '69', '49'],
    tokens: ['59', '95', '69', '49'],
    accepted_answers: ['59'],
    explanation: "« Cinquante-neuf » = 59.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q23',
    exercise_set_id: 'ch26-ex03',
    order_index: 3,
    prompt: "Transcrivez en chiffres : soixante-deux",
    instruction: "Écrivez le nombre en chiffres.",
    options: ['62', '72', '52', '26'],
    tokens: ['62', '72', '52', '26'],
    accepted_answers: ['62'],
    explanation: "« Soixante-deux » = 62.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q24',
    exercise_set_id: 'ch26-ex03',
    order_index: 4,
    prompt: "Transcrivez en chiffres : soixante-dix",
    instruction: "Écrivez le nombre en chiffres (système vigésimal : 60 + 10).",
    options: ['70', '60', '80', '90'],
    tokens: ['70', '60', '80', '90'],
    accepted_answers: ['70'],
    explanation: "« Soixante-dix » = 60 + 10 = 70 !",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q25',
    exercise_set_id: 'ch26-ex03',
    order_index: 5,
    prompt: "Transcrivez en chiffres : soixante et onze",
    instruction: "Écrivez le nombre en chiffres (60 + 11).",
    options: ['71', '61', '81', '91'],
    tokens: ['71', '61', '81', '91'],
    accepted_answers: ['71'],
    explanation: "« Soixante et onze » = 60 + 11 = 71.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q26',
    exercise_set_id: 'ch26-ex03',
    order_index: 6,
    prompt: "Transcrivez en chiffres : soixante-dix-huit",
    instruction: "Écrivez le nombre en chiffres (60 + 18).",
    options: ['78', '68', '88', '98'],
    tokens: ['78', '68', '88', '98'],
    accepted_answers: ['78'],
    explanation: "« Soixante-dix-huit » = 60 + 18 = 78.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q27',
    exercise_set_id: 'ch26-ex03',
    order_index: 7,
    prompt: "Transcrivez en chiffres : quatre-vingt-trois",
    instruction: "Écrivez le nombre en chiffres (4 × 20 + 3).",
    options: ['83', '93', '73', '84'],
    tokens: ['83', '93', '73', '84'],
    accepted_answers: ['83'],
    explanation: "« Quatre-vingt-trois » = 4 × 20 + 3 = 83.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q28',
    exercise_set_id: 'ch26-ex03',
    order_index: 8,
    prompt: "Transcrivez en chiffres : quatre-vingt-sept",
    instruction: "Écrivez le nombre en chiffres (4 × 20 + 7).",
    options: ['87', '97', '77', '88'],
    tokens: ['87', '97', '77', '88'],
    accepted_answers: ['87'],
    explanation: "« Quatre-vingt-sept » = 4 × 20 + 7 = 87.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q29',
    exercise_set_id: 'ch26-ex03',
    order_index: 9,
    prompt: "Transcrivez en chiffres : quatre-vingt-dix",
    instruction: "Écrivez le nombre en chiffres (4 × 20 + 10).",
    options: ['90', '80', '70', '100'],
    tokens: ['90', '80', '70', '100'],
    accepted_answers: ['90'],
    explanation: "« Quatre-vingt-dix » = 4 × 20 + 10 = 90.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q30',
    exercise_set_id: 'ch26-ex03',
    order_index: 10,
    prompt: "Transcrivez en chiffres : quatre-vingt-treize",
    instruction: "Écrivez le nombre en chiffres (4 × 20 + 13).",
    options: ['93', '83', '73', '94'],
    tokens: ['93', '83', '73', '94'],
    accepted_answers: ['93'],
    explanation: "« Quatre-vingt-treize » = 4 × 20 + 13 = 93.",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.4 (10 Questions)
// ==========================================
export const CH26_EX04_QUESTIONS: Question[] = [
  {
    id: 'ch26-q31',
    exercise_set_id: 'ch26-ex04',
    order_index: 1,
    prompt: "Écrivez en toutes lettres le nombre : 101",
    instruction: "Écrivez en toutes lettres (sans « et » !).",
    options: null,
    tokens: ['cent', 'un', 'et', 'cent un'],
    accepted_answers: ['cent un', 'cent-un'],
    explanation: "101 s'écrit « cent un » (jamais \\*cent et un).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q32',
    exercise_set_id: 'ch26-ex04',
    order_index: 2,
    prompt: "Écrivez en toutes lettres le nombre : 114",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'quatorze', 'cent quatorze'],
    accepted_answers: ['cent quatorze', 'cent-quatorze'],
    explanation: "114 s'écrit « cent quatorze ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q33',
    exercise_set_id: 'ch26-ex04',
    order_index: 3,
    prompt: "Écrivez en toutes lettres le nombre : 126",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'vingt-six', 'vingt', 'six', '-'],
    accepted_answers: ['cent vingt-six', 'cent-vingt-six', 'cent vingt six'],
    explanation: "126 s'écrit « cent vingt-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q34',
    exercise_set_id: 'ch26-ex04',
    order_index: 4,
    prompt: "Écrivez en toutes lettres le nombre : 139",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'trente-neuf', 'trente', 'neuf', '-'],
    accepted_answers: ['cent trente-neuf', 'cent-trente-neuf', 'cent trente neuf'],
    explanation: "139 s'écrit « cent trente-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q35',
    exercise_set_id: 'ch26-ex04',
    order_index: 5,
    prompt: "Écrivez en toutes lettres le nombre : 145",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'quarante-cinq', 'quarante', 'cinq', '-'],
    accepted_answers: ['cent quarante-cinq', 'cent-quarante-cinq', 'cent quarante cinq'],
    explanation: "145 s'écrit « cent quarante-cinq ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q36',
    exercise_set_id: 'ch26-ex04',
    order_index: 6,
    prompt: "Écrivez en toutes lettres le nombre : 156",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'cinquante-six', 'cinquante', 'six', '-'],
    accepted_answers: ['cent cinquante-six', 'cent-cinquante-six', 'cent cinquante six'],
    explanation: "156 s'écrit « cent cinquante-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q37',
    exercise_set_id: 'ch26-ex04',
    order_index: 7,
    prompt: "Écrivez en toutes lettres le nombre : 160",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cent', 'soixante', 'cent soixante'],
    accepted_answers: ['cent soixante', 'cent-soixante'],
    explanation: "160 s'écrit « cent soixante ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q38',
    exercise_set_id: 'ch26-ex04',
    order_index: 8,
    prompt: "Écrivez en toutes lettres le nombre : 178",
    instruction: "Écrivez en toutes lettres (système : 100 + 60 + 18).",
    options: null,
    tokens: ['cent', 'soixante-dix-huit', 'soixante', 'dix-huit', '-'],
    accepted_answers: ['cent soixante-dix-huit', 'cent soixante dix-huit', 'cent-soixante-dix-huit'],
    explanation: "178 s'écrit « cent soixante-dix-huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q39',
    exercise_set_id: 'ch26-ex04',
    order_index: 9,
    prompt: "Écrivez en toutes lettres le nombre : 181",
    instruction: "Attention : pas de « et », et pas de -s sur vingt !",
    options: null,
    tokens: ['cent', 'quatre-vingt-un', 'quatre-vingt', 'un', '-'],
    accepted_answers: ['cent quatre-vingt-un', 'cent-quatre-vingt-un', 'cent quatre vingt un'],
    explanation: "181 s'écrit « cent quatre-vingt-un ». Vingt perd son -s car il est suivi de un.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q40',
    exercise_set_id: 'ch26-ex04',
    order_index: 10,
    prompt: "Écrivez en toutes lettres le nombre : 199",
    instruction: "Écrivez en toutes lettres (100 + 4 × 20 + 19).",
    options: null,
    tokens: ['cent', 'quatre-vingt-dix-neuf', 'quatre-vingt', 'dix-neuf', '-'],
    accepted_answers: ['cent quatre-vingt-dix-neuf', 'cent-quatre-vingt-dix-neuf'],
    explanation: "199 s'écrit « cent quatre-vingt-dix-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.5 (10 Questions)
// ==========================================
export const CH26_EX05_QUESTIONS: Question[] = [
  {
    id: 'ch26-q41',
    exercise_set_id: 'ch26-ex05',
    order_index: 1,
    prompt: "Traduisez en toutes lettres : two hundred twelve",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['deux', 'cent', 'douze', 'deux cent douze'],
    accepted_answers: ['deux cent douze', 'deux-cent-douze'],
    explanation: "« Two hundred twelve » = 212 = « deux cent douze » (pas d'-s sur cent car il est suivi d'un chiffre).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q42',
    exercise_set_id: 'ch26-ex05',
    order_index: 2,
    prompt: "Traduisez en toutes lettres : three hundred fifteen",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['trois', 'cent', 'quinze', 'trois cent quinze'],
    accepted_answers: ['trois cent quinze', 'trois-cent-quinze'],
    explanation: "« Three hundred fifteen » = 315 = « trois cent quinze ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q43',
    exercise_set_id: 'ch26-ex05',
    order_index: 3,
    prompt: "Traduisez en toutes lettres : four hundred twenty",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['quatre', 'cent', 'vingt', 'quatre cent vingt'],
    accepted_answers: ['quatre cent vingt', 'quatre-cent-vingt'],
    explanation: "« Four hundred twenty » = 420 = « quatre cent vingt » (pas d'-s sur cent car suivi de vingt).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q44',
    exercise_set_id: 'ch26-ex05',
    order_index: 4,
    prompt: "Traduisez en toutes lettres : five hundred thirty-one",
    instruction: "Traduisez en français en toutes lettres (attention à et un).",
    options: null,
    tokens: ['cinq', 'cent', 'trente', 'et', 'un', 'cinq cent trente et un'],
    accepted_answers: ['cinq cent trente et un', 'cinq-cent-trente-et-un', 'cinq cent trente-et-un'],
    explanation: "« Five hundred thirty-one » = 531 = « cinq cent trente et un ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q45',
    exercise_set_id: 'ch26-ex05',
    order_index: 5,
    prompt: "Traduisez en toutes lettres : six hundred twenty-three",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['six', 'cent', 'vingt-trois', 'six cent vingt-trois'],
    accepted_answers: ['six cent vingt-trois', 'six-cent-vingt-trois', 'six cent vingt trois'],
    explanation: "« Six hundred twenty-three » = 623 = « six cent vingt-trois ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q46',
    exercise_set_id: 'ch26-ex05',
    order_index: 6,
    prompt: "Traduisez en toutes lettres : seven hundred ninety",
    instruction: "Traduisez en français en toutes lettres (700 + 90).",
    options: null,
    tokens: ['sept', 'cent', 'quatre-vingt-dix', 'sept cent quatre-vingt-dix'],
    accepted_answers: ['sept cent quatre-vingt-dix', 'sept-cent-quatre-vingt-dix'],
    explanation: "« Seven hundred ninety » = 790 = « sept cent quatre-vingt-dix ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q47',
    exercise_set_id: 'ch26-ex05',
    order_index: 7,
    prompt: "Traduisez en toutes lettres : eight hundred forty-eight",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['huit', 'cent', 'quarante-huit', 'huit cent quarante-huit'],
    accepted_answers: ['huit cent quarante-huit', 'huit-cent-quarante-huit', 'huit cent quarante huit'],
    explanation: "« Eight hundred forty-eight » = 848 = « huit cent quarante-huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q48',
    exercise_set_id: 'ch26-ex05',
    order_index: 8,
    prompt: "Traduisez en toutes lettres : nine hundred four",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['neuf', 'cent', 'quatre', 'neuf cent quatre'],
    accepted_answers: ['neuf cent quatre', 'neuf-cent-quatre'],
    explanation: "« Nine hundred four » = 904 = « neuf cent quatre ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q49',
    exercise_set_id: 'ch26-ex05',
    order_index: 9,
    prompt: "Traduisez en toutes lettres : six hundred forty-five",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['six', 'cent', 'quarante-cinq', 'six cent quarante-cinq'],
    accepted_answers: ['six cent quarante-cinq', 'six-cent-quarante-cinq', 'six cent quarante cinq'],
    explanation: "« Six hundred forty-five » = 645 = « six cent quarante-cinq ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q50',
    exercise_set_id: 'ch26-ex05',
    order_index: 10,
    prompt: "Traduisez en toutes lettres : one hundred one",
    instruction: "Traduisez en français en toutes lettres.",
    options: null,
    tokens: ['cent', 'un', 'cent un'],
    accepted_answers: ['cent un', 'cent-un'],
    explanation: "« One hundred one » = 101 = « cent un » (sans « et » !).",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.6 (10 Questions)
// ==========================================
export const CH26_EX06_QUESTIONS: Question[] = [
  {
    id: 'ch26-q51',
    exercise_set_id: 'ch26-ex06',
    order_index: 1,
    prompt: "Écrivez le nombre en toutes lettres : 205",
    instruction: "Écrivez en toutes lettres (attention à l'accord de cent).",
    options: null,
    tokens: ['deux', 'cent', 'cinq', 'deux cent cinq'],
    accepted_answers: ['deux cent cinq', 'deux-cent-cinq'],
    explanation: "205 = « deux cent cinq ». Cent est suivi de cinq, il ne prend donc PAS de -s.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q52',
    exercise_set_id: 'ch26-ex06',
    order_index: 2,
    prompt: "Écrivez le nombre en toutes lettres : 389",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['trois', 'cent', 'quatre-vingt-neuf', 'trois cent quatre-vingt-neuf'],
    accepted_answers: ['trois cent quatre-vingt-neuf', 'trois-cent-quatre-vingt-neuf'],
    explanation: "389 = « trois cent quatre-vingt-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q53',
    exercise_set_id: 'ch26-ex06',
    order_index: 3,
    prompt: "Écrivez le nombre en toutes lettres : 456",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['quatre', 'cent', 'cinquante-six', 'quatre cent cinquante-six'],
    accepted_answers: ['quatre cent cinquante-six', 'quatre-cent-cinquante-six', 'quatre cent cinquante six'],
    explanation: "456 = « quatre cent cinquante-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q54',
    exercise_set_id: 'ch26-ex06',
    order_index: 4,
    prompt: "Écrivez le nombre en toutes lettres : 504",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['cinq', 'cent', 'quatre', 'cinq cent quatre'],
    accepted_answers: ['cinq cent quatre', 'cinq-cent-quatre'],
    explanation: "504 = « cinq cent quatre ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q55',
    exercise_set_id: 'ch26-ex06',
    order_index: 5,
    prompt: "Écrivez le nombre en toutes lettres : 678",
    instruction: "Écrivez en toutes lettres (600 + 78).",
    options: null,
    tokens: ['six', 'cent', 'soixante-dix-huit', 'six cent soixante-dix-huit'],
    accepted_answers: ['six cent soixante-dix-huit', 'six cent soixante dix-huit', 'six-cent-soixante-dix-huit'],
    explanation: "678 = « six cent soixante-dix-huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q56',
    exercise_set_id: 'ch26-ex06',
    order_index: 6,
    prompt: "Écrivez le nombre en toutes lettres : 745",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['sept', 'cent', 'quarante-cinq', 'sept cent quarante-cinq'],
    accepted_answers: ['sept cent quarante-cinq', 'sept-cent-quarante-cinq', 'sept cent quarante cinq'],
    explanation: "745 = « sept cent quarante-cinq ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q57',
    exercise_set_id: 'ch26-ex06',
    order_index: 7,
    prompt: "Écrivez le nombre en toutes lettres : 800",
    instruction: "Attention : cent est multiplié et termine le nombre !",
    options: null,
    tokens: ['huit', 'cents', 'cent', 'huit cents'],
    accepted_answers: ['huit cents', 'huit-cents', 'huit cent'],
    explanation: "800 = « huit cents ». Cent est multiplié par huit et n'est suivi d'aucun autre chiffre : il prend donc impérativement un -s !",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q58',
    exercise_set_id: 'ch26-ex06',
    order_index: 8,
    prompt: "Écrivez le nombre en toutes lettres : 815",
    instruction: "Attention : cent est suivi de quinze !",
    options: null,
    tokens: ['huit', 'cent', 'quinze', 'huit cent quinze'],
    accepted_answers: ['huit cent quinze', 'huit-cent-quinze'],
    explanation: "815 = « huit cent quinze ». Cent est suivi de quinze : il perd donc son -s !",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q59',
    exercise_set_id: 'ch26-ex06',
    order_index: 9,
    prompt: "Écrivez le nombre en toutes lettres : 901",
    instruction: "Écrivez en toutes lettres (sans « et » !).",
    options: null,
    tokens: ['neuf', 'cent', 'un', 'neuf cent un'],
    accepted_answers: ['neuf cent un', 'neuf-cent-un'],
    explanation: "901 = « neuf cent un ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q60',
    exercise_set_id: 'ch26-ex06',
    order_index: 10,
    prompt: "Écrivez le nombre en toutes lettres : 940",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['neuf', 'cent', 'quarante', 'neuf cent quarante'],
    accepted_answers: ['neuf cent quarante', 'neuf-cent-quarante'],
    explanation: "940 = « neuf cent quarante ».",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.7 (10 Questions)
// ==========================================
export const CH26_EX07_QUESTIONS: Question[] = [
  {
    id: 'ch26-q61',
    exercise_set_id: 'ch26-ex07',
    order_index: 1,
    prompt: "Écrivez en toutes lettres le grand nombre : 1 005",
    instruction: "Écrivez en toutes lettres (mille est invariable).",
    options: null,
    tokens: ['mille', 'cinq', 'mille cinq'],
    accepted_answers: ['mille cinq', 'mille-cinq'],
    explanation: "1 005 = « mille cinq ». Notez que mille ne prend jamais de -s et qu'on ne met pas de « et ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q62',
    exercise_set_id: 'ch26-ex07',
    order_index: 2,
    prompt: "Écrivez en toutes lettres le grand nombre : 2 456",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['deux', 'mille', 'quatre', 'cent', 'cinquante-six'],
    accepted_answers: [
      'deux mille quatre cent cinquante-six',
      'deux-mille-quatre-cent-cinquante-six',
      'deux mille quatre cent cinquante six'
    ],
    explanation: "2 456 = « deux mille quatre cent cinquante-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q63',
    exercise_set_id: 'ch26-ex07',
    order_index: 3,
    prompt: "Écrivez en toutes lettres le grand nombre : 3 021",
    instruction: "Écrivez en toutes lettres (3 000 + 21).",
    options: null,
    tokens: ['trois', 'mille', 'vingt', 'et', 'un'],
    accepted_answers: [
      'trois mille vingt et un',
      'trois-mille-vingt-et-un',
      'trois mille vingt-et-un'
    ],
    explanation: "3 021 = « trois mille vingt et un ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q64',
    exercise_set_id: 'ch26-ex07',
    order_index: 4,
    prompt: "Écrivez en toutes lettres le grand nombre : 4 789",
    instruction: "Écrivez en toutes lettres (4 000 + 700 + 89).",
    options: null,
    tokens: ['quatre', 'mille', 'sept', 'cent', 'quatre-vingt-neuf'],
    accepted_answers: [
      'quatre mille sept cent quatre-vingt-neuf',
      'quatre-mille-sept-cent-quatre-vingt-neuf'
    ],
    explanation: "4 789 = « quatre mille sept cent quatre-vingt-neuf ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q65',
    exercise_set_id: 'ch26-ex07',
    order_index: 5,
    prompt: "Écrivez en toutes lettres le grand nombre : 10 450",
    instruction: "Écrivez en toutes lettres (10 000 + 450).",
    options: null,
    tokens: ['dix', 'mille', 'quatre', 'cent', 'cinquante'],
    accepted_answers: [
      'dix mille quatre cent cinquante',
      'dix-mille-quatre-cent-cinquante'
    ],
    explanation: "10 450 = « dix mille quatre cent cinquante ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q66',
    exercise_set_id: 'ch26-ex07',
    order_index: 6,
    prompt: "Écrivez en toutes lettres le grand nombre : 24 008",
    instruction: "Écrivez en toutes lettres.",
    options: null,
    tokens: ['vingt-quatre', 'mille', 'huit', 'vingt-quatre mille huit'],
    accepted_answers: [
      'vingt-quatre mille huit',
      'vingt-quatre-mille-huit',
      'vingt quatre mille huit'
    ],
    explanation: "24 008 = « vingt-quatre mille huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q67',
    exercise_set_id: 'ch26-ex07',
    order_index: 7,
    prompt: "Écrivez en toutes lettres le grand nombre : 170 890",
    instruction: "Écrivez en toutes lettres (170 000 + 890).",
    options: null,
    tokens: ['cent', 'soixante-dix', 'mille', 'huit', 'cent', 'quatre-vingt-dix'],
    accepted_answers: [
      'cent soixante-dix mille huit cent quatre-vingt-dix',
      'cent soixante-dix mille huit-cent-quatre-vingt-dix',
      'cent-soixante-dix-mille-huit-cent-quatre-vingt-dix'
    ],
    explanation: "170 890 = « cent soixante-dix mille huit cent quatre-vingt-dix ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q68',
    exercise_set_id: 'ch26-ex07',
    order_index: 8,
    prompt: "Écrivez en toutes lettres le grand nombre : 1 230 000",
    instruction: "Écrivez en toutes lettres (million au singulier car précédé de un).",
    options: null,
    tokens: ['un', 'million', 'deux', 'cent', 'trente', 'mille'],
    accepted_answers: [
      'un million deux cent trente mille',
      'un-million-deux-cent-trente-mille'
    ],
    explanation: "1 230 000 = « un million deux cent trente mille ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q69',
    exercise_set_id: 'ch26-ex07',
    order_index: 9,
    prompt: "Écrivez en toutes lettres le grand nombre : 30 030 000",
    instruction: "Attention : millions prend un -s car il est au pluriel !",
    options: null,
    tokens: ['trente', 'millions', 'trente', 'mille'],
    accepted_answers: [
      'trente millions trente mille',
      'trente-millions-trente-mille',
      'trente million trente mille'
    ],
    explanation: "30 030 000 = « trente millions trente mille ». Million est un nom et prend la marque du pluriel -s.",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q70',
    exercise_set_id: 'ch26-ex07',
    order_index: 10,
    prompt: "Écrivez en toutes lettres le grand nombre : 1 600 000 000",
    instruction: "Écrivez en toutes lettres (un milliard + 600 millions).",
    options: null,
    tokens: ['un', 'milliard', 'six', 'cent', 'millions', 'six cents millions'],
    accepted_answers: [
      'un milliard six cent millions',
      'un milliard six cents millions',
      'un-milliard-six-cent-millions',
      'un-milliard-six-cents-millions'
    ],
    explanation: "1 600 000 000 = « un milliard six cent millions » (ou « six cents millions »).",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

// ==========================================
// EXERCICE 26.8 (10 Questions)
// ==========================================
export const CH26_EX08_QUESTIONS: Question[] = [
  {
    id: 'ch26-q71',
    exercise_set_id: 'ch26-ex08',
    order_index: 1,
    prompt: "Leur bibliothèque numérique sera prête en 2026.",
    instruction: "Transcrivez l'année 2026 en toutes lettres.",
    options: null,
    tokens: ['deux', 'mille', 'vingt-six', 'deux mille vingt-six'],
    accepted_answers: [
      'deux mille vingt-six',
      'deux-mille-vingt-six',
      'deux mille vingt six',
      'deux mille vingt-huit'
    ],
    explanation: "2026 se transcrit « deux mille vingt-six ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q72',
    exercise_set_id: 'ch26-ex08',
    order_index: 2,
    prompt: "Cet appartement coûte 750 000 euros.",
    instruction: "Transcrivez 750 000 en toutes lettres.",
    options: null,
    tokens: ['sept', 'cent', 'cinquante', 'mille', 'sept cent cinquante mille'],
    accepted_answers: [
      'sept cent cinquante mille',
      'sept-cent-cinquante-mille'
    ],
    explanation: "750 000 se transcrit « sept cent cinquante mille ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q73',
    exercise_set_id: 'ch26-ex08',
    order_index: 3,
    prompt: "Hier, j'ai bu du Saint-Émilion 1978.",
    instruction: "Transcrivez l'année 1978 en toutes lettres.",
    options: null,
    tokens: ['mille', 'neuf', 'cent', 'soixante-dix-huit', 'dix-neuf'],
    accepted_answers: [
      'mille neuf cent soixante-dix-huit',
      'dix-neuf cent soixante-dix-huit',
      'mille neuf cent soixante dix-huit',
      'mille-neuf-cent-soixante-dix-huit',
      'dix-neuf-cent-soixante-dix-huit'
    ],
    explanation: "1978 se transcrit « mille neuf cent soixante-dix-huit » ou « dix-neuf cent soixante-dix-huit ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q74',
    exercise_set_id: 'ch26-ex08',
    order_index: 4,
    prompt: "Le soixantième Festival de Cannes a lieu en mai 2007.",
    instruction: "Transcrivez l'année 2007 en toutes lettres.",
    options: null,
    tokens: ['deux', 'mille', 'sept', 'deux mille sept'],
    accepted_answers: [
      'deux mille sept',
      'deux-mille-sept'
    ],
    explanation: "2007 se transcrit « deux mille sept ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q75',
    exercise_set_id: 'ch26-ex08',
    order_index: 5,
    prompt: "Il y a plus d'1 000 000 000 d'étoiles dans le ciel.",
    instruction: "Transcrivez 1 000 000 000 en toutes lettres.",
    options: null,
    tokens: ['un', 'milliard', 'un milliard'],
    accepted_answers: [
      'un milliard',
      'un-milliard'
    ],
    explanation: "1 000 000 000 se transcrit « un milliard ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q76',
    exercise_set_id: 'ch26-ex08',
    order_index: 6,
    prompt: "Il a remporté la médaille d'or du 1 500 mètres.",
    instruction: "Transcrivez 1 500 en toutes lettres.",
    options: null,
    tokens: ['mille', 'cinq', 'cents', 'quinze'],
    accepted_answers: [
      'mille cinq cents',
      'mille cinq cent',
      'quinze cents',
      'mille-cinq-cents',
      'quinze-cents'
    ],
    explanation: "1 500 se transcrit « mille cinq cents » (ou « quinze cents »).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q77',
    exercise_set_id: 'ch26-ex08',
    order_index: 7,
    prompt: "D'après un sondage réalisé en 2023, Instagram compte près de 3 000 000 000 d'utilisateurs mensuels.",
    instruction: "Transcrivez les nombres 2023 et 3 000 000 000 en toutes lettres.",
    options: null,
    tokens: ['deux', 'mille', 'vingt-trois', 'trois', 'milliards', '/', 'et'],
    accepted_answers: [
      'deux mille vingt-trois / trois milliards',
      'deux mille vingt-trois et trois milliards',
      'deux mille vingt-trois, trois milliards',
      'deux-mille-vingt-trois / trois milliards',
      'trois milliards',
      'deux mille vingt-trois'
    ],
    explanation: "2023 = « deux mille vingt-trois » et 3 000 000 000 = « trois milliards ».",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q78',
    exercise_set_id: 'ch26-ex08',
    order_index: 8,
    prompt: "Victor Hugo est mort en 1885.",
    instruction: "Transcrivez l'année 1885 en toutes lettres.",
    options: null,
    tokens: ['mille', 'huit', 'cent', 'quatre-vingt-cinq', 'dix-huit'],
    accepted_answers: [
      'mille huit cent quatre-vingt-cinq',
      'dix-huit cent quatre-vingt-cinq',
      'mille-huit-cent-quatre-vingt-cinq',
      'dix-huit-cent-quatre-vingt-cinq'
    ],
    explanation: "1885 se transcrit « mille huit cent quatre-vingt-cinq » (ou « dix-huit cent quatre-vingt-cinq »).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q79',
    exercise_set_id: 'ch26-ex08',
    order_index: 9,
    prompt: "Cet administrateur de site gagne 5 000 euros par mois.",
    instruction: "Transcrivez 5 000 en toutes lettres.",
    options: null,
    tokens: ['cinq', 'mille', 'cinq mille'],
    accepted_answers: [
      'cinq mille',
      'cinq-mille'
    ],
    explanation: "5 000 se transcrit « cinq mille » (mille ne prend jamais de -s).",
    created_at: '2026-10-20T00:00:00.000Z'
  },
  {
    id: 'ch26-q80',
    exercise_set_id: 'ch26-ex08',
    order_index: 10,
    prompt: "Nous sommes plus de 8 000 000 000 sur cette planète.",
    instruction: "Transcrivez 8 000 000 000 en toutes lettres.",
    options: null,
    tokens: ['huit', 'milliards', 'huit milliards'],
    accepted_answers: [
      'huit milliards',
      'huit-milliards'
    ],
    explanation: "8 000 000 000 se transcrit « huit milliards » (milliard est un nom et prend un -s).",
    created_at: '2026-10-20T00:00:00.000Z'
  }
];

export const CHAPTER_26_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch26-ex01': CH26_EX01_QUESTIONS,
  'ch26-ex02': CH26_EX02_QUESTIONS,
  'ch26-ex03': CH26_EX03_QUESTIONS,
  'ch26-ex04': CH26_EX04_QUESTIONS,
  'ch26-ex05': CH26_EX05_QUESTIONS,
  'ch26-ex06': CH26_EX06_QUESTIONS,
  'ch26-ex07': CH26_EX07_QUESTIONS,
  'ch26-ex08': CH26_EX08_QUESTIONS
};

export const CH26_FALLBACK_THEORY = {
  markdown: CHAPTER_26_THEORY_MARKDOWN,
  topics: CH26_FALLBACK_TOPICS,
  exerciseSets: CH26_FALLBACK_EXERCISE_SETS,
  questionsMap: CHAPTER_26_QUESTIONS_MAP
};
