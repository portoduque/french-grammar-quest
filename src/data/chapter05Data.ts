import { Topic, ExerciseSet, Question } from '@/types/database';
import { MatchingOption } from '@/components/exercises/interactions';

export const CHAPTER_05_THEORY_MARKDOWN = `# Chapitre 5 : Le Verbe Devoir, les Formules Impersonnelles et les Verbes en -eindre/-aindre

Bienvenue dans le **Chapitre 5** ! Dans ce module fondamental, vous allez maîtriser un des verbes les plus riches et polyvalents de la langue française : **devoir**, ainsi que deux expressions idiomatiques incontournables (**il y a** et **il s'agit de**) et une famille de verbes du troisième groupe aux sonorités élégantes : les verbes en **-eindre** et **-aindre** (*peindre*, *craindre*...).

---

## 1. Le Verbe « Devoir » : Morphologie et Phonétique

Le verbe **devoir** est un verbe irrégulier du 3ᵉ groupe. Sa conjugaison au présent de l'indicatif présente une alternance de radicaux qu'il faut mémoriser :

| Pronom Sujet | Forme Conjuguée | Prononciation API | Traduction de Référence |
| :--- | :--- | :--- | :--- |
| **Je** | **dois** | /ʒə dwa/ | eu devo / tenho que |
| **Tu** | **dois** | /ty dwa/ | tu deves / tens que |
| **Il / Elle / On** | **doit** | /il dwa/ | ele / ela deve / tem que |
| **Nous** | **devons** | /nu də.vɔ̃/ | nós devemos / temos que |
| **Vous** | **devez** | /vu də.ve/ | você deve / vocês devem |
| **Ils / Elles** | **doivent** | /il dwav/ | eles / elas devem |

> 💡 **Le Saviez-Vous ? (Astuce Phonétique du Professeur)**
> - Les trois personnes du singulier (*dois, dois, doit*) se prononcent de façon strictement identique : **/dwa/**. Les consonnes finales *-s* et *-t* sont muettes.
> - À la troisième personne du pluriel (*ils/elles doivent*), la terminaison *-ent* est muette, mais elle fait sonner le **v** final : on prononce distinctement **/dwav/** !

---

## 2. Les 4 Visages Sémantiques de « Devoir »

En français, **devoir** exprime quatre réalités fondamentales selon la structure de la phrase :

### A. La Dette Matérielle ou Morale (*Dívida Financeira ou Gratidão*)
Quand *devoir* est suivi directement d'un nom (ou d'un montant), il signifie « dever algo a alguém » :
- *Combien est-ce qu'on vous **doit** ?* (Quanto lhe devemos?)
- *Elle me **doit** mille euros.* (Ela me deve mil euros.)
- *Je vous **dois** quelque chose ?* (Devo-lhe alguma coisa?)
- *Elle **doit** une excuse à Carole.* (Ela deve um pedido de desculpas à Carole.)
- *Il **doit** sa vie à son chirurgien.* (Ele deve sua vida ao seu cirurgião.)

### B. L'Obligation Absolue (*Obrigação / Necessidade Estrita*)
Suivi d'un verbe à l'infinitif, *devoir* exprime un ordre ou une nécessité :
- *Vous **devez assister** à la réunion demain matin.* (Vocês devem comparecer à reunião amanhã de manhã.)
- *L'enfant **doit obéir** à ses parents.* (A criança deve obedecer aos pais.)
- ⚠️ **Attention au Faux-Ami Négatif :**
  - *Vous **ne devez pas** y aller.* = **Proibição estrita** (Vocês NÃO devem / NÃO podem ir lá).
  - En portugais, "você não tem que ir" significa às vezes "não é necessário". Em francês, *ne pas devoir* significa estrita proibição!

### C. La Probabilité et l'Horaire Prévu (*Suposição / Horário Marcado*)
*Devoir* exprime également ce qui est supposé ou programmé pour arriver :
- *L'avion **doit atterrir** à dix heures.* (O avião deve pousar às dez horas / está previsto para pousar às 10h.)
- *Son livre **doit sortir** la semaine prochaine.* (O livro dela deve sair na próxima semana.)
- *Il **doit venir** ce soir.* (Ele deve vir hoje à noite.)
  - *Note :* À l'oral, l'intonation et le contexte permettent de distinguer l'obligation (« ele tem que vir ») de la simple supposition (« é provável que ele venha »).

### D. Le Conseil Atténué : Le Conditionnel (*« Deveria »*)
Pour donner un conseil amical sans imposer une obligation brute, on emploie le conditionnel présent : **devrais, devrais, devrait, devrions, devriez, devraient** :
- *Vous **devriez** appeler Vincent.* (Você deveria ligar para o Vincent. — Tom cortês/aconselhamento.)
- *Vous **ne devriez pas** inviter Pierre.* (Você não deveria convidar o Pierre.)
- *Tu **ne devrais pas** lui prêter d'argent.* (Você não deveria emprestar-lhe dinheiro.)
- *Elles **devraient** apprendre une langue étrangère.* (Elas deveriam aprender uma língua estrangeira.)

---

## 3. Le Vocabulaire des Transports et Déplacements

Le chapitre utilise un vocabulaire riche lié aux voyages et déplacements :
- **une voiture** : um carro
- **un autobus / un bus** : um ônibus
- **un taxi** : um táxi
- **un train** : um trem
- **un avion** : um avião
- **une navette** : uma van / ônibus de traslado (shuttle)
- **la circulation** : o trânsito / tráfego
- **embarquer** : embarcar (em avião, navio, ferry)
- **débarquer** : desembarcar
- **atterrir** : pousar / aterrissar
- **décoller** : decolar
- **manquer le train** : perder o trem
- **conduire** : dirigir / conduzir
- **tomber en panne** : enguiçar / quebrar (o veículo)
- **faire le plein** : encher o tanque / abastecer
- **monter / descendre** : subir / descer (entrar ou sair do veículo)
- **voyager** : viajar

---

## 4. L'Expression Impersonnelle « Il y a »

L'expression **il y a** correspond au portugais *há* ou *tem* (no sentido existencial) et à l'anglais *there is / there are*.

### Règle d'Or : L'Invariabilité Absolue !
Contrairement au portugais parlé où l'on entend parfois "tinham pessoas", en français, **il y a** est strictement invariable. On ne dit JAMAIS « *ils y ont* » !
- *Il y a **un** chat sur le canapé.* (Há um gato no sofá.)
- *Il y a **des** livres sur la table.* (Há livros sobre a mesa.)

### Négation et Interrogation
- **Négation :** *Il n'y a pas de...* / *Il n'y a plus rien dans le frigo.* (Não há mais nada na geladeira.)
- **Interrogation avec « Est-ce que » :** *Est-ce qu'il y a un ordinateur ?* (Há um computador?)
- **Interrogation avec inversion :** *Y a-t-il un problème ?*

### Expressions Idiomatiques Courantes
- **Qu'est-ce qu'il y a ?** : O que foi? / O que está acontecendo?
- **Il n'y a qu'à + infinitif** : É só... / Basta... (*Il n'y a qu'à leur dire* = Basta dizer a eles).
- **Il y avait une fois...** : Era uma vez... (início clássico de contos de fadas).
- **Distance spatiale :** *Il y a cinquante kilomètres d'ici à Paris.* (São 50 km daqui até Paris.)
- **Temps écoulé :** *Je suis arrivé il y a trois jours.* (Cheguei há três dias.)

---

## 5. La Formule Impersonnelle « Il s'agit de »

**Il s'agit de** est l'une des expressions les plus élégantes et fréquentes du français formel. Elle signifie « trata-se de », « é uma questão de », « o tema é ».

### Le Piège Typique des Lusophones
En portugais, on dit naturellement : *« Este livro trata do presidente francês »* ou *« O filme é sobre um crime »*.
En français, le sujet grammatical est **toujours le pronom impersonnel neutre IL** !
- ✅ *Dans ce livre, **il s'agit du** président français.*
- ✅ *Dans ce film, **il s'agit d'un** crime.*
- ❌ Ne dites jamais : « *Ce livre s'agit de...* » !

### Formes Fréquentes
- **Question sur le sujet :** *De quoi est-ce qu'il s'agit ?* / *De quoi s'agit-il ?* (De que se trata? / É sobre o quê?)
- **L'enjeu d'une situation :** *Il s'agit de ton avenir.* (Trata-se do teu futuro / O teu futuro está em jogo.)
- **L'urgence :** *Il s'agit de faire vite.* (Trata-se de agir rápido / É preciso pressa.)
- **L'essence d'un sentiment :** *Il s'agit d'amour.* / *Il s'agit de passion.* (Trata-se de amor / É uma questão de paixão.)
- **La mise au point :** *Il ne s'agit pas de plaisanter.* (Não é hora de brincadeiras.)

---

## 6. Les Verbes en « -eindre » et « -aindre »

Certains verbes du 3ᵉ groupe se terminent par **-eindre** ou **-aindre** :
- **peindre** (pintar)
- **craindre** (temer / ter medo)
- **plaindre** (ter pena / lastimar)
- **se plaindre** (reclamar / queixar-se)
- **feindre** (fingir / simular)
- **teindre** (tingir)
- **ceindre** (cingir / rodear)

### Le Mystère Morphologique : L'Apparition du « GN »
Au singulier, le radical perd le *-d-* et prend les terminaisons régulières **-s, -s, -t** (et non « -d » comme *vendre* !) :
- *je pein**s**, tu pein**s**, il pein**t***
- *je crain**s**, tu crain**s**, il crain**t***

Au pluriel, la magie de l'étymologie latine fait apparaître la consonne nasale palatale **gn** (/ɲ/, comme le *nh* portugais) :

| Pronom | Conjugaison de **Peindre** | Conjugaison de **Craindre** |
| :--- | :--- | :--- |
| **Je** | pein**s** | crain**s** |
| **Tu** | pein**s** | crain**s** |
| **Il / Elle** | pein**t** | crain**t** |
| **Nous** | pei**gnons** | crai**gnons** |
| **Vous** | pei**gnez** | crai**gnez** |
| **Ils / Elles** | pei**gnent** | crai**gnent** |

> 🎯 **Exemples en Contexte :**
> - *Le peintre **peint** le plafond de l'opéra.* (O pintor pinta o teto da ópera.)
> - *Vous **peignez** un tableau abstrait.* (Vocês pintam um quadro abstrato.)
> - *Ils **craignent** le pire.* (Eles temem o pior.)
> - *Il ne **craint** pas la douleur.* (Ele não teme a dor.)
> - *Elle **se plaint** tout le temps.* (Ela reclama o tempo todo.)

---

Vous disposez maintenant de tous les repères théoriques, morphologiques et phonétiques pour aborder les 5 séries d'exercices avec succès !
`;

export const CHAPTER_05_TOPICS: Topic[] = [
  {
    id: 'ch05-t01',
    chapter_id: 'ch05',
    order_index: 1,
    title: 'The verb devoir (to have to, must)',
    rule_summary: 'Conjugaison au présent, les 4 emplois majeurs (dette matérielle, devoir moral, probabilité/horaire, conseil au conditionnel « devriez »).',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-t02',
    chapter_id: 'ch05',
    order_index: 2,
    title: 'Il y a (there is, there are)',
    rule_summary: 'Règle d’invariabilité absolue, négation en « pas de », interrogation avec « est-ce que » et tournures idiomatiques (distance, temps).',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-t03',
    chapter_id: 'ch05',
    order_index: 3,
    title: 'Il s’agit de (it is a matter of, it’s about)',
    rule_summary: 'Usage du pronom neutre obligatoire, introduction du sujet d’un film/livre et expression d’enjeux existentiels.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-t04',
    chapter_id: 'ch05',
    order_index: 4,
    title: 'Verbs ending in -eindre and -aindre',
    rule_summary: 'Terminaisons -s, -s, -t au singulier et apparition du son nasal palatal /ɲ/ (-gn-) au pluriel pour peindre, craindre, plaindre et feindre.',
    created_at: new Date().toISOString()
  }
];

export const CHAPTER_05_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch05-ex01',
    chapter_id: 'ch05',
    order_index: 1,
    title: 'Exercice 5.1',
    instruction: 'Mettre au présent les verbes entre parenthèses.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-ex02',
    chapter_id: 'ch05',
    order_index: 2,
    title: 'Exercice 5.2',
    instruction: 'Traduire les phrases suivantes en utilisant vous et la forme est-ce que si nécessaire.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-ex03',
    chapter_id: 'ch05',
    order_index: 3,
    title: 'Exercice 5.3',
    instruction: 'Faire correspondre les deux colonnes.',
    interaction_type: 'matching',
    questions_count: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-ex04',
    chapter_id: 'ch05',
    order_index: 4,
    title: 'Exercice 5.4',
    instruction: 'Conjuguer au présent les verbes entre parenthèses.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch05-ex05',
    chapter_id: 'ch05',
    order_index: 5,
    title: 'Exercice 5.5',
    instruction: 'Traduire les phrases suivantes en utilisant tu et la forme est-ce que si nécessaire.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  }
];

export const CH05_EX03_MATCHING_OPTIONS: MatchingOption[] = [
  { label: 'a', text: 'Elle doit la vie à son médecin.' },
  { label: 'b', text: 'Elle doit être prudente.' },
  { label: 'c', text: 'Elle doit faire la cuisine.' },
  { label: 'd', text: 'Elle doit partir en vacances.' },
  { label: 'e', text: 'Elle doit de l’argent.' }
];

export const CHAPTER_05_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch05-ex01': [
    {
      id: 'ch05-ex01-q01',
      exercise_set_id: 'ch05-ex01',
      order_index: 1,
      prompt: 'Elle (devoir) __ prévenir sa mère.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['doit'],
      explanation: 'À la 3ᵉ personne du singulier (elle), devoir prend la terminaison -t : « elle doit » (se prononce /dwa/).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q02',
      exercise_set_id: 'ch05-ex01',
      order_index: 2,
      prompt: 'Tu (devoir) __ partir immédiatement.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dois'],
      explanation: 'À la 2ᵉ personne du singulier (tu), la terminaison est -s : « tu dois ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q03',
      exercise_set_id: 'ch05-ex01',
      order_index: 3,
      prompt: 'Vous (devoir) __ refuser leur offre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['devez'],
      explanation: 'À la 2ᵉ personne du pluriel (vous), le radical régulier en dev- prend la désinence -ez : « vous devez ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q04',
      exercise_set_id: 'ch05-ex01',
      order_index: 4,
      prompt: 'Elle (devoir) __ prendre une navette.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['doit'],
      explanation: 'Sujet singulier « elle » ➔ « doit » (expression de l’obligation ou de la nécessité).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q05',
      exercise_set_id: 'ch05-ex01',
      order_index: 5,
      prompt: 'Ils (ne pas devoir) __ arriver avant dimanche.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ne doivent pas', 'ne doivent pas.'],
      explanation: 'Forme négative à la 3ᵉ personne du pluriel : « ne » + « doivent » + « pas ». Notez que -ent est muet mais le « v » sonne (/dwav/).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q06',
      exercise_set_id: 'ch05-ex01',
      order_index: 6,
      prompt: 'Je (devoir) __ appeler Michel ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dois'],
      explanation: 'À la 1ʳᵉ personne du singulier (je), la forme est « je dois » avec un -s final muet.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q07',
      exercise_set_id: 'ch05-ex01',
      order_index: 7,
      prompt: 'L’avion (devoir) __ décoller dans quelques minutes.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['doit'],
      explanation: 'Le sujet « l’avion » est équivalent à « il » (3ᵉ personne du singulier) ➔ « doit ». Exprime ici un horaire prévu.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q08',
      exercise_set_id: 'ch05-ex01',
      order_index: 8,
      prompt: 'Les voitures (devoir) __ embarquer sur le ferry.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['doivent'],
      explanation: 'Le sujet « les voitures » est au pluriel (« elles ») ➔ « doivent » (/dwav/).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q09',
      exercise_set_id: 'ch05-ex01',
      order_index: 9,
      prompt: 'Je (devoir) __ préparer le dîner.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dois'],
      explanation: 'Sujet « je » ➔ « dois » avec un -s muet final.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex01-q10',
      exercise_set_id: 'ch05-ex01',
      order_index: 10,
      prompt: 'Tu (devoir) __ faire le plein sur l’autoroute.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dois'],
      explanation: 'Sujet « tu » ➔ « dois ». « Faire le plein » signifie abastecer / encher o tanque.',
      created_at: new Date().toISOString()
    }
  ],

  'ch05-ex02': [
    {
      id: 'ch05-ex02-q01',
      exercise_set_id: 'ch05-ex02',
      order_index: 1,
      prompt: 'You must cook tonight.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous devez faire la cuisine ce soir.',
        'Vous devez faire la cuisine ce soir',
        'Vous devez cuisiner ce soir.',
        'Vous devez cuisiner ce soir'
      ],
      explanation: '« Faire la cuisine » est la locution consacrée pour cuisiner. Le sujet imposé est « vous » ➔ « Vous devez faire la cuisine ce soir. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q02',
      exercise_set_id: 'ch05-ex02',
      order_index: 2,
      prompt: 'She must not work today.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle ne doit pas travailler aujourd’hui.',
        'Elle ne doit pas travailler aujourd’hui',
        'Elle ne doit pas travailler aujourd\'hui.',
        'Elle ne doit pas travailler aujourd\'hui'
      ],
      explanation: 'La négation encadre l’auxiliaire doit : « Elle ne doit pas travailler aujourd’hui. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q03',
      exercise_set_id: 'ch05-ex02',
      order_index: 3,
      prompt: 'At what time is he supposed to arrive?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'À quelle heure est-ce qu’il doit arriver ?',
        'À quelle heure est-ce qu’il doit arriver?',
        'À quelle heure est-ce qu\'il doit arriver ?',
        'À quelle heure est-ce qu\'il doit arriver?',
        'A quelle heure est-ce qu’il doit arriver ?',
        'A quelle heure est-ce qu’il doit arriver?',
        'A quelle heure est-ce qu\'il doit arriver ?',
        'A quelle heure est-ce qu\'il doit arriver?'
      ],
      explanation: '« Is supposed to » se traduit élégamment par devoir au présent : « À quelle heure est-ce qu’il doit arriver ? »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q04',
      exercise_set_id: 'ch05-ex02',
      order_index: 4,
      prompt: 'How much do I owe you?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Combien est-ce que je vous dois ?',
        'Combien est-ce que je vous dois?',
        'Combien je vous dois ?',
        'Combien je vous dois?'
      ],
      explanation: 'Devoir exprime la dette : « Combien est-ce que je vous dois ? »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q05',
      exercise_set_id: 'ch05-ex02',
      order_index: 5,
      prompt: 'Why must he sell his car?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Pourquoi est-ce qu’il doit vendre sa voiture ?',
        'Pourquoi est-ce qu’il doit vendre sa voiture?',
        'Pourquoi est-ce qu\'il doit vendre sa voiture ?',
        'Pourquoi est-ce qu\'il doit vendre sa voiture?'
      ],
      explanation: 'Interrogation avec « pourquoi » + « est-ce qu’il doit » + « vendre sa voiture ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q06',
      exercise_set_id: 'ch05-ex02',
      order_index: 6,
      prompt: 'She owes an excuse to Carole.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle doit une excuse à Carole.',
        'Elle doit une excuse à Carole',
        'Elle doit une excuse a Carole.',
        'Elle doit une excuse a Carole'
      ],
      explanation: 'Devoir au sens figuré de dette morale : « Elle doit une excuse à Carole. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q07',
      exercise_set_id: 'ch05-ex02',
      order_index: 7,
      prompt: 'Are we supposed to know these verbs?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Est-ce que nous devons connaître ces verbes ?',
        'Est-ce que nous devons connaître ces verbes?',
        'Est-ce que nous devons connaitre ces verbes ?',
        'Est-ce que nous devons connaitre ces verbes?'
      ],
      explanation: '« Are we supposed to » ➔ « Est-ce que nous devons » + infinitif « connaître » + adjectif démonstratif « ces verbes ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q08',
      exercise_set_id: 'ch05-ex02',
      order_index: 8,
      prompt: 'He owes two thousand dollars to the bank.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il doit deux mille dollars à la banque.',
        'Il doit deux mille dollars à la banque',
        'Il doit deux mille dollars a la banque.',
        'Il doit deux mille dollars a la banque'
      ],
      explanation: 'Dette financière : « Il doit deux mille dollars à la banque. » (« mille » est invariable).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q09',
      exercise_set_id: 'ch05-ex02',
      order_index: 9,
      prompt: 'You should call Vincent.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous devriez appeler Vincent.',
        'Vous devriez appeler Vincent'
      ],
      explanation: '« Should » traduit un conseil et s’exprime par le conditionnel de politesse : « Vous devriez appeler Vincent. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex02-q10',
      exercise_set_id: 'ch05-ex02',
      order_index: 10,
      prompt: 'You should not invite Pierre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous ne devriez pas inviter Pierre.',
        'Vous ne devriez pas inviter Pierre'
      ],
      explanation: 'Conseil négatif au conditionnel : « Vous ne devriez pas inviter Pierre. »',
      created_at: new Date().toISOString()
    }
  ],

  'ch05-ex03': [
    {
      id: 'ch05-ex03-q01',
      exercise_set_id: 'ch05-ex03',
      order_index: 1,
      prompt: 'Elle a des dettes.',
      instruction: null,
      tokens: null,
      options: CH05_EX03_MATCHING_OPTIONS,
      accepted_answers: ['e', 'Elle doit de l’argent.', 'Elle doit de l\'argent.'],
      explanation: 'Avoir des dettes signifie matériellement devoir de l’argent : « Elle doit de l’argent. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex03-q02',
      exercise_set_id: 'ch05-ex03',
      order_index: 2,
      prompt: 'Elle n’est pas morte.',
      instruction: null,
      tokens: null,
      options: CH05_EX03_MATCHING_OPTIONS,
      accepted_answers: ['a', 'Elle doit la vie à son médecin.'],
      explanation: 'Elle a survécu grâce aux soins médicaux : « Elle doit la vie à son médecin. » (dette de reconnaissance).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex03-q03',
      exercise_set_id: 'ch05-ex03',
      order_index: 3,
      prompt: 'Elle va peut-être voyager.',
      instruction: null,
      tokens: null,
      options: CH05_EX03_MATCHING_OPTIONS,
      accepted_answers: ['d', 'Elle doit partir en vacances.'],
      explanation: 'L’éventualité d’un voyage correspond à l’obligation ou la probabilité de départ : « Elle doit partir en vacances. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex03-q04',
      exercise_set_id: 'ch05-ex03',
      order_index: 4,
      prompt: 'Elle a des invités.',
      instruction: null,
      tokens: null,
      options: CH05_EX03_MATCHING_OPTIONS,
      accepted_answers: ['c', 'Elle doit faire la cuisine.'],
      explanation: 'Recevoir des invités implique de préparer le repas : « Elle doit faire la cuisine. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex03-q05',
      exercise_set_id: 'ch05-ex03',
      order_index: 5,
      prompt: 'Elle hésite encore.',
      instruction: null,
      tokens: null,
      options: CH05_EX03_MATCHING_OPTIONS,
      accepted_answers: ['b', 'Elle doit être prudente.'],
      explanation: 'L’hésitation recommande la prudence : « Elle doit être prudente. »',
      created_at: new Date().toISOString()
    }
  ],

  'ch05-ex04': [
    {
      id: 'ch05-ex04-q01',
      exercise_set_id: 'ch05-ex04',
      order_index: 1,
      prompt: 'Elle (craindre) __ de profonds changements.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['craint'],
      explanation: 'Verbe craindre au singulier avec « elle » : la désinence est un -t final ➔ « craint ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q02',
      exercise_set_id: 'ch05-ex04',
      order_index: 2,
      prompt: 'Il (feindre) __ la tristesse.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['feint'],
      explanation: 'Verbe feindre (fingir) avec « il » ➔ « feint » (désinence -t).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q03',
      exercise_set_id: 'ch05-ex04',
      order_index: 3,
      prompt: 'Ils (plaindre) __ la pauvre femme.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['plaignent'],
      explanation: 'Au pluriel (ils), le verbe plaindre développe le son nasal palatal /ɲ/ représenté par « gn » : « plaignent ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q04',
      exercise_set_id: 'ch05-ex04',
      order_index: 4,
      prompt: 'La muraille (ceindre) __ la ville.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ceint'],
      explanation: 'Verbe ceindre (entourer, cercar) au singulier avec « la muraille » ➔ « ceint ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q05',
      exercise_set_id: 'ch05-ex04',
      order_index: 5,
      prompt: 'Vous (feindre) __ l’indifférence.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['feignez'],
      explanation: 'Avec « vous », apparition du groupe « gn » et désinence -ez : « feignez ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q06',
      exercise_set_id: 'ch05-ex04',
      order_index: 6,
      prompt: 'Nous (craindre) __ le ridicule.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['craignons'],
      explanation: 'Avec « nous », radical en « craign- » + désinence -ons : « craignons ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q07',
      exercise_set_id: 'ch05-ex04',
      order_index: 7,
      prompt: 'Vous (peindre) __ le mur en bleu.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['peignez'],
      explanation: 'Verbe peindre avec « vous » : « vous peignez » (radical peign-).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q08',
      exercise_set_id: 'ch05-ex04',
      order_index: 8,
      prompt: 'Ils (craindre) __ le froid.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['craignent'],
      explanation: 'Verbe craindre à la 3ᵉ personne du pluriel : « craignent » (/kʁɛɲ/).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q09',
      exercise_set_id: 'ch05-ex04',
      order_index: 9,
      prompt: 'Elle (teindre) __ en blond les moustaches de l’acteur.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['teint'],
      explanation: 'Verbe teindre (tingir) à la 3ᵉ personne du singulier ➔ « teint ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex04-q10',
      exercise_set_id: 'ch05-ex04',
      order_index: 10,
      prompt: 'Elle (se plaindre) __ tout le temps.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se plaint'],
      explanation: 'Verbe pronominal se plaindre (queixar-se/reclamar) : pronom réfléchi « se » + forme singulière en -t « plaint ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch05-ex05': [
    {
      id: 'ch05-ex05-q01',
      exercise_set_id: 'ch05-ex05',
      order_index: 1,
      prompt: 'She is painting the kitchen.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle peint la cuisine.',
        'Elle peint la cuisine'
      ],
      explanation: 'Présent de peindre avec « elle » ➔ « Elle peint la cuisine. » (le présent progressif anglais se rend par le présent simple).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q02',
      exercise_set_id: 'ch05-ex05',
      order_index: 2,
      prompt: 'There is a dog in the car.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il y a un chien dans la voiture.',
        'Il y a un chien dans la voiture'
      ],
      explanation: 'Formule impersonnelle existentielle : « Il y a un chien dans la voiture. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q03',
      exercise_set_id: 'ch05-ex05',
      order_index: 3,
      prompt: 'They pity the poor child.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils plaignent le pauvre enfant.',
        'Ils plaignent le pauvre enfant',
        'Elles plaignent le pauvre enfant.',
        'Elles plaignent le pauvre enfant',
        'Ils (Elles) plaignent le pauvre enfant.',
        'Ils (Elles) plaignent le pauvre enfant'
      ],
      explanation: 'Verbe plaindre au pluriel (ils/elles plaignent) + le pauvre enfant.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q04',
      exercise_set_id: 'ch05-ex05',
      order_index: 4,
      prompt: 'This book is about the French president.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Dans ce livre, il s’agit du président français.',
        'Dans ce livre, il s’agit du président français',
        'Dans ce livre, il s\'agit du président français.',
        'Dans ce livre, il s\'agit du président français',
        'Dans ce livre il s’agit du président français.',
        'Dans ce livre il s\'agit du président français.'
      ],
      explanation: 'Tournure idiomatique : « Dans ce livre, il s’agit du... » (« de + le » se contracte obligatoirement en « du »).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q05',
      exercise_set_id: 'ch05-ex05',
      order_index: 5,
      prompt: 'What is it about?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'De quoi est-ce qu’il s’agit ?',
        'De quoi est-ce qu’il s’agit?',
        'De quoi est-ce qu\'il s\'agit ?',
        'De quoi est-ce qu\'il s\'agit?',
        'De quoi s’agit-il ?',
        'De quoi s’agit-il?',
        'De quoi s\'agit-il ?',
        'De quoi s\'agit-il?'
      ],
      explanation: 'Interrogation sur le sujet avec la formule « est-ce que » : « De quoi est-ce qu’il s’agit ? »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q06',
      exercise_set_id: 'ch05-ex05',
      order_index: 6,
      prompt: 'He fears the worst.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il craint le pire.',
        'Il craint le pire'
      ],
      explanation: 'Verbe craindre au singulier (craint) + le pire : « Il craint le pire. »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q07',
      exercise_set_id: 'ch05-ex05',
      order_index: 7,
      prompt: 'There are books on the table.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il y a des livres sur la table.',
        'Il y a des livres sur la table'
      ],
      explanation: '« Il y a » reste invariable même avec un complément pluriel (« des livres »).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q08',
      exercise_set_id: 'ch05-ex05',
      order_index: 8,
      prompt: 'Is there a computer?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Est-ce qu’il y a un ordinateur ?',
        'Est-ce qu’il y a un ordinateur?',
        'Est-ce qu\'il y a un ordinateur ?',
        'Est-ce qu\'il y a un ordinateur?',
        'Y a-t-il un ordinateur ?',
        'Y a-t-il un ordinateur?'
      ],
      explanation: 'Interrogation avec est-ce que appliquée à « il y a » : « Est-ce qu’il y a un ordinateur ? »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q09',
      exercise_set_id: 'ch05-ex05',
      order_index: 9,
      prompt: 'Are you painting the flowers?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Est-ce que tu peins les fleurs ?',
        'Est-ce que tu peins les fleurs?',
        'Tu peins les fleurs ?',
        'Tu peins les fleurs?'
      ],
      explanation: 'L’instruction impose le pronom « tu » et « est-ce que » : « Est-ce que tu peins les fleurs ? »',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch05-ex05-q10',
      exercise_set_id: 'ch05-ex05',
      order_index: 10,
      prompt: 'It’s a matter of passion.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il s’agit de passion.',
        'Il s’agit de passion',
        'Il s\'agit de passion.',
        'Il s\'agit de passion'
      ],
      explanation: 'Tournure impersonnelle « Il s’agit de » + nom indénombrable : « Il s’agit de passion. »',
      created_at: new Date().toISOString()
    }
  ]
};
