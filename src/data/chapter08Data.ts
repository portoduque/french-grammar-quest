import { Topic, ExerciseSet, Question } from '@/types/database';

export const CHAPTER_08_THEORY_MARKDOWN = `# Chapitre 08 — L'Imparfait : Description, Habitude et Continuité

> [!TIP]
> ### 👨‍🏫 Dica do Professor de Francês (FLE) : Regras de Ouro do Imparfait
> 1. **O Sentido Essencial do Imparfait : Cenário, Duração e Hábito** :
>    - Enquanto o *passé composé* conta o que **aconteceu** (ações pontuais, sucessivas, concluídas), o **imparfait** descreve **como as coisas eram**, o que **estava acontecendo** ao redor ou o que se **costumava fazer**.
>    - Equivale frequentemente ao nosso *Pretérito Imperfeito* em português (*"eu falava", "ela ia", "nós éramos"*).
> 2. **A Fórmula Morfológica Infalível : O Radical de NOUS** :
>    - Para conjugar qualquer verbo no *imparfait* (regular ou irregular) :
>      1. Pegue a forma do presente do indicativo com **NOUS** : *nous parlons*, *nous finissons*, *nous prenons*, *nous buvons*.
>      2. Corte a terminação **-ons** para isolar o radical : *parl-*, *finiss-*, *pren-*, *buv-*.
>      3. Adicione as terminações universais do imparfait :
>         $$\\textbf{-ais, -ais, -ait, -ions, -iez, -aient}$$
> 3. **O Segredo Fonético : 4 Pessoas com o Mesmíssimo Som [ɛ]** :
>    - As terminações **-ais, -ais, -ait, -aient** pronunciam-se com a vogal média aberta **/ɛ/** (como em "café" ou "festa").
>    - *Je parlais*, *tu parlais*, *il parlait*, *ils parlaient* soam **exatamente iguais** : **/paʁlɛ/** !
>    - Apenas *nous* (**-ions** ➔ [jɔ̃]) e *vous* (**-iez** ➔ [je]) têm pronúncias distintas.
> 4. **A Única Exceção de Radical em Toda a Língua Francesa : ÊTRE** :
>    - O único verbo cujo radical não vem de *nous* é o verbo **être** (pois *nous sommes* não possui terminação *-ons*).
>    - Seu radical é **ét-** : *j'étais, tu étais, il/elle/on était, nous étions, vous étiez, ils/elles étaient*.
>    - Todos os outros verbos do francês (incluindo *avoir ➔ nous avons ➔ av- ➔ j'avais*, *faire ➔ fais-*, *aller ➔ all-*) seguem a regra estritamente !
> 5. **Ajustes Ortográficos em -GER e -CER** :
>    - Verbos em **-ger** (*voyager, manger, partager*) : conservam o **e** antes de *a* para soar [ʒ] (*je voyageais, il partageait, ils encourageaient*), mas **perdem o e** diante de *i* (*nous voyagions, vous partagiez*).
>    - Verbos em **-cer** (*commencer, avancer, remplacer*) : ganham cedilha **ç** antes de *a* para soar [s] (*j'avançais, il remplaçait*), mas **não têm cedilha** diante de *i* (*nous avancions, vous remplaciez*).
> 6. **Ação Contínua Interrompida : Imparfait + QUAND + Passé Composé** :
>    - Quando uma ação prolongada no passado é interrompida por um evento súbito :
>      - *Je **dormais** (imparfait, ação contínua) quand le chat **a sauté** sur mon lit (passé composé, evento pontual).*
>      - *Nous **attendions** le bus quand il **a commencé** à pleuvoir.*
> 7. **A Sugestão Charmosa com « Si on + Imparfait »** :
>    - Para propor um passeio, almoço ou café ("Que tal se nós...", "E se a gente..."), use **Si on + verbo no imparfait** :
>      - *Si on **prenait** un café ?* (Que tal tomarmos um café?)
>      - *Si on **allait** se promener ?* (Que tal darmos uma caminhada?)
>      - Como o sujeito é *on*, o verbo termina **sempre em -ait** !

---

## 1. Formation Régulière de l'Imparfait

L'imparfait est l'un des temps les plus réguliers du français. Pour tout verbe, on prend la forme de la 1ʳᵉ personne du pluriel (**nous**) au présent de l'indicatif, on retire *-ons* et on ajoute les terminaisons :

| Pronom | Terminaison | Parler (*nous parlons*) | Finir (*nous finissons*) | Vendre (*nous vendons*) | Être (*irrégulier*) |
|---|---|---|---|---|---|
| **Je / J'** | **-ais** | je parlais | je finissais | je vendais | j'étais |
| **Tu** | **-ais** | tu parlais | tu finissais | tu vendais | tu étais |
| **Il / Elle / On** | **-ait** | il parlait | elle finissait | on vendait | il était |
| **Nous** | **-ions** | nous parlions | nous finissions | nous vendions | nous étions |
| **Vous** | **-iez** | vous parliez | vous finissiez | vous vendiez | vous étiez |
| **Ils / Elles** | **-aient** | ils parlaient | elles finissaient | ils vendaient | ils étaient |

### Verbes Fréquents au Radical Particulier
- **Faire** : *nous faisons* ➔ radical **fais-** (*je faisais, tu faisais, il faisait, nous faisions, ils faisaient*).
- **Prendre** : *nous prenons* ➔ radical **pren-** (*je prenais, ils prenaient*).
- **Boire** : *nous buvons* ➔ radical **buv-** (*je buvais, ils buvaient*).
- **Aller** : *nous allons* ➔ radical **all-** (*j'allais, ils allaient*).
- **Avoir** : *nous avons* ➔ radical **av-** (*j'avais, ils avaient*).

---

## 2. Les Trois Grandes Valeurs de l'Imparfait

### A. La Description et le Décor (L'Arrière-plan)
L'imparfait campe le décor spatio-temporel et décrit l'état d'esprit, les émotions ou les sensations physiques :
- *Le temps :* Il **faisait** froid à la montagne.
- *L'environnement :* La campagne **était** si belle. Les rues **étaient** bondées.
- *L'état physique / mental :* Il **avait** faim. Elle **pensait** à ses prochaines vacances. Je **savais** qu'il avait raison.

### B. L'Habitude et la Répétition dans le Passé
L'imparfait décrit une action coutumière, souvent accompagnée d'indicateurs de fréquence :
- *Tous les jeudis :* Je **jouais** au tennis tous les jeudis.
- *Chaque année :* Il **voyageait** chaque année en Australie.
- *Autrefois :* Autrefois, ils **habitaient** en banlieue.
- *Tous les dimanches :* Nous **faisions** la grasse matinée tous les dimanches.

### C. L'Action Continue Interrompue & la Durée avec « Depuis »
L'action était en cours de déroulement quand un événement soudain (au passé composé) a surgi :
- *Elle **étudiait** quand le téléphone **a sonné**.*
- *Nous **bavardions** depuis une heure quand il **est arrivé**.*
- *J'**attendais** Roland depuis dix minutes quand enfin il **est arrivé**.*

---

## 3. Le Grand Duel : Imparfait vs Passé Composé

| Critère | Imparfait | Passé Composé |
|---|---|---|
| **Nature de l'action** | Continue, inachevée, état, habitude | Ponctuelle, achevée, événement précis |
| **Question clé** | Que se passait-il ? Comment c'était ? | Que s'est-il passé ensuite ? |
| **Mots déclencheurs** | *souvent, toujours, autrefois, le mardi, chaque jour* | *hier, soudain, tout à coup, ce jour-là, une fois* |
| **Rôle dans le récit** | Le décor, l'atmosphère de fond | L'action qui fait avancer l'intrigue |

### Changement de Sens de Verbes d'État
- **Savoir** : *Je savais* (eu sabia - état) vs *J'ai su* (eu soube / descobri - événement soudain).
- **Connaître** : *Je connaissais* (eu conhecia) vs *J'ai connu* (conheci pela primeira vez).
- **Sembler** : *Il semblait triste* (parecia) vs *Tout à coup, il a semblé comprendre* (de repente deu mostras de compreender).

---

## 4. Constructions Spéciales avec l'Imparfait

1. **La Suggestion : « Si on + imparfait »** :
   - *Si on **déjeunait** ensemble ?* (Et si nous déjeunions ensemble ?)
   - *Si on **allait** se promener dans la forêt ?*
   - *Si on **prenait** un café ?*
2. **Le Regret ou le Souhait : « Si seulement + imparfait »** :
   - *Si seulement on **pouvait** prendre des vacances !*
   - *Si seulement elle **était** à l'heure !*
3. **Le Passé Récent dans le Passé : « Venir (à l'imparfait) + de + infinitif »** :
   - *Elle **venait de téléphoner** quand il est entré.* (Elle avait tout juste appelé).
`;

export const CHAPTER_08_TOPICS: Topic[] = [
  {
    id: 'ch08-t01',
    chapter_id: 'ch08',
    order_index: 1,
    title: 'Formation & Règles Phonétiques de l\'Imparfait',
    rule_summary: 'Radical de nous au présent + terminaisons universelles (-ais, -ais, -ait, -ions, -iez, -aient), radical irrégulier ét- et particularités en -ger / -cer.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-t02',
    chapter_id: 'ch08',
    order_index: 2,
    title: 'Description, Habitude & Action Continue Interrompue',
    rule_summary: 'L\'imparfait pour camper le décor, exprimer une routine répétée dans le passé et traduire l\'action continue interrompue par le passé composé.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-t03',
    chapter_id: 'ch08',
    order_index: 3,
    title: 'Constructions Spéciales & Duel Imparfait vs Passé Composé',
    rule_summary: 'Suggestions avec Si on + imparfait, souhaits avec Si seulement, passé récent dans le passé et choix en contexte entre passé composé et imparfait.',
    created_at: new Date().toISOString()
  }
];

export const CHAPTER_08_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch08-ex01',
    chapter_id: 'ch08',
    order_index: 1,
    title: 'Exercice 8.1 — Conjugaison régulière et particularités orthographiques',
    instruction: 'Mettre les verbes entre parenthèses à l\'imparfait.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex02',
    chapter_id: 'ch08',
    order_index: 2,
    title: 'Exercice 8.2 — Description et états d\'esprit à l\'imparfait',
    instruction: 'Mettre les verbes entre parenthèses à l\'imparfait pour décrire une situation ou un état.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex03',
    chapter_id: 'ch08',
    order_index: 3,
    title: 'Exercice 8.3 — Habitude et répétition dans le passé',
    instruction: 'Mettre les verbes entre parenthèses à l\'imparfait d\'habitude.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex04',
    chapter_id: 'ch08',
    order_index: 4,
    title: 'Exercice 8.4 — Action continue interrompue et durée avec depuis',
    instruction: 'Mettre les verbes entre parenthèses à l\'imparfait.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex05',
    chapter_id: 'ch08',
    order_index: 5,
    title: 'Exercice 8.5 — Traduction active vers le français',
    instruction: 'Traduire les phrases vers le français à l\'imparfait (utiliser la forme tu si nécessaire).',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex06',
    chapter_id: 'ch08',
    order_index: 6,
    title: 'Exercice 8.6 — Suggestions avec « Si on + imparfait »',
    instruction: 'Mettre les verbes entre parenthèses à l\'imparfait dans les formules de suggestion.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch08-ex07',
    chapter_id: 'ch08',
    order_index: 7,
    title: 'Exercice 8.7 — Passé composé ou imparfait ?',
    instruction: 'Mettre les verbes entre parenthèses au passé composé ou à l\'imparfait selon le contexte.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  }
];

export const CHAPTER_08_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch08-ex01': [
    {
      id: 'ch08-ex01-q01',
      exercise_set_id: 'ch08-ex01',
      order_index: 1,
      prompt: 'Il (voyager) ___ chaque année en Australie.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['voyageait'],
      explanation: 'Verbe en -ger : on conserve le « e » avant -ait pour garder le son doux [ʒ] : « voyageait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q02',
      exercise_set_id: 'ch08-ex01',
      order_index: 2,
      prompt: 'Tu (faire) ___ du sport à l\'école?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisais'],
      explanation: 'Radical de nous faisons ➔ fais- + terminaison -ais avec tu ➔ « faisais ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q03',
      exercise_set_id: 'ch08-ex01',
      order_index: 3,
      prompt: 'Nous (être) ___ enchantés de notre expédition.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['étions', 'etions'],
      explanation: 'Être a pour radical unique ét- + terminaison -ions avec nous ➔ « étions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q04',
      exercise_set_id: 'ch08-ex01',
      order_index: 4,
      prompt: 'Ils (boire) ___ du café noir le matin.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['buvaient'],
      explanation: 'Radical de nous buvons ➔ buv- + terminaison -aient ➔ « buvaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q05',
      exercise_set_id: 'ch08-ex01',
      order_index: 5,
      prompt: 'Je (être) ___ champion de tennis.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'étais', 'J’étais', 'étais', 'etais', 'j\'etais', 'j’etais'],
      explanation: 'Être avec je donne « j\'étais » (avec élision obligatoire).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q06',
      exercise_set_id: 'ch08-ex01',
      order_index: 6,
      prompt: 'Nous (aimer) ___ faire la cuisine.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['aimions'],
      explanation: 'Radical aim- + terminaison -ions avec nous ➔ « aimions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q07',
      exercise_set_id: 'ch08-ex01',
      order_index: 7,
      prompt: 'Elles (partager) ___ une chambre à l\'université.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['partageaient'],
      explanation: 'Verbe en -ger : « e » obligatoire devant -aient ➔ « partageaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q08',
      exercise_set_id: 'ch08-ex01',
      order_index: 8,
      prompt: 'Il (prendre) ___ toujours une semaine de vacances en février.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['prenait'],
      explanation: 'Radical de nous prenons ➔ pren- + terminaison -ait ➔ « prenait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q09',
      exercise_set_id: 'ch08-ex01',
      order_index: 9,
      prompt: 'Le guide (encourager) ___ les marcheurs.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['encourageait'],
      explanation: 'Verbe en -ger : maintien du « e » devant -ait ➔ « encourageait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex01-q010',
      exercise_set_id: 'ch08-ex01',
      order_index: 10,
      prompt: 'Vous (aller) ___ au bord de la mer en été.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['alliez'],
      explanation: 'Radical de nous allons ➔ all- + terminaison -iez ➔ « alliez ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex02': [
    {
      id: 'ch08-ex02-q01',
      exercise_set_id: 'ch08-ex02',
      order_index: 1,
      prompt: 'Il (croire) ___ que tu ne voulais pas venir.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['croyait'],
      explanation: 'Radical de nous croyons ➔ croy- + terminaison -ait ➔ « croyait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q02',
      exercise_set_id: 'ch08-ex02',
      order_index: 2,
      prompt: 'Je (être) ___ à la montagne.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'étais', 'J’étais', 'étais', 'etais', 'j\'etais', 'j’etais'],
      explanation: 'Être avec je donne « j\'étais ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q03',
      exercise_set_id: 'ch08-ex02',
      order_index: 3,
      prompt: 'Elle (penser) ___ à ses prochaines vacances.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['pensait'],
      explanation: 'Penser donne « pensait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q04',
      exercise_set_id: 'ch08-ex02',
      order_index: 4,
      prompt: 'Ils (espérer) ___ un miracle.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['espéraient', 'esperaient'],
      explanation: 'Espérer donne « espéraient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q05',
      exercise_set_id: 'ch08-ex02',
      order_index: 5,
      prompt: 'Elle (avoir) ___ très faim.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avait'],
      explanation: 'Avoir donne « avait ». Elle avait très faim.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q06',
      exercise_set_id: 'ch08-ex02',
      order_index: 6,
      prompt: 'Je (savoir) ___ qu\'il avait raison.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['savais'],
      explanation: 'Radical de nous savons ➔ sav- + terminaison -ais ➔ « savais ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q07',
      exercise_set_id: 'ch08-ex02',
      order_index: 7,
      prompt: 'Nous (être) ___ réalistes.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['étions', 'etions'],
      explanation: 'Être donne « étions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q08',
      exercise_set_id: 'ch08-ex02',
      order_index: 8,
      prompt: 'Vous (paraître) ___ sceptique.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['paraissiez'],
      explanation: 'Radical de nous paraissons ➔ paraiss- + terminaison -iez ➔ « paraissiez ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q09',
      exercise_set_id: 'ch08-ex02',
      order_index: 9,
      prompt: 'L\'exposition (être) ___ fascinante.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['était', 'etait'],
      explanation: 'L\'exposition est 3e personne singulier : « était ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex02-q010',
      exercise_set_id: 'ch08-ex02',
      order_index: 10,
      prompt: 'Il (faire) ___ un temps glacial.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisait'],
      explanation: 'Météo à l\'imparfait : « Il faisait un temps glacial ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex03': [
    {
      id: 'ch08-ex03-q01',
      exercise_set_id: 'ch08-ex03',
      order_index: 1,
      prompt: 'Nous (suivre) ___ des cours de danse tous les mardis.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['suivions'],
      explanation: 'Radical de nous suivons ➔ suiv- + terminaison -ions ➔ « suivions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q02',
      exercise_set_id: 'ch08-ex03',
      order_index: 2,
      prompt: 'Je (faire) ___ de la natation tous les jours.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisais'],
      explanation: 'Faire donne « faisais » avec je.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q03',
      exercise_set_id: 'ch08-ex03',
      order_index: 3,
      prompt: 'La vie (être) ___ plus facile.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['était', 'etait'],
      explanation: 'La vie était plus facile.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q04',
      exercise_set_id: 'ch08-ex03',
      order_index: 4,
      prompt: 'Nous (faire) ___ la grasse matinée tous les dimanches.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisions'],
      explanation: 'Faire avec nous ➔ « faisions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q05',
      exercise_set_id: 'ch08-ex03',
      order_index: 5,
      prompt: 'À cette époque, ils (habiter) ___ en banlieue.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['habitaient'],
      explanation: 'Habiter donne « habitaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q06',
      exercise_set_id: 'ch08-ex03',
      order_index: 6,
      prompt: 'Nous (boire) ___ du café.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['buvions'],
      explanation: 'Boire avec nous ➔ « buvions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q07',
      exercise_set_id: 'ch08-ex03',
      order_index: 7,
      prompt: 'Autrefois, ils (assister) ___ à tous les concerts.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['assistaient'],
      explanation: 'Assister donne « assistaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q08',
      exercise_set_id: 'ch08-ex03',
      order_index: 8,
      prompt: 'Dans son enfance, elle (faire) ___ de l\'équitation.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisait'],
      explanation: 'Faire avec elle donne « faisait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q09',
      exercise_set_id: 'ch08-ex03',
      order_index: 9,
      prompt: 'Dans le passé, vous (se voir) ___ plus souvent.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vous voyiez', 'voyiez'],
      explanation: 'Verbe pronominal réciproque : « vous vous voyiez » (avec double « vous » et terminaison -iez).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex03-q010',
      exercise_set_id: 'ch08-ex03',
      order_index: 10,
      prompt: 'Elle (travailler) ___ chez Guerlain.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['travaillait'],
      explanation: 'Travailler donne « travaillait ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex04': [
    {
      id: 'ch08-ex04-q01',
      exercise_set_id: 'ch08-ex04',
      order_index: 1,
      prompt: 'Il (faire) ___ un discours quand quelqu\'un dans l\'assistance l\'a interrompu.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisait'],
      explanation: 'Action en cours de déroulement (imparfait) interrompue par le passé composé : « faisait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q02',
      exercise_set_id: 'ch08-ex04',
      order_index: 2,
      prompt: 'Je (dormir) ___ quand le chat a sauté sur mon lit.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dormais'],
      explanation: 'Dormir avec je ➔ « dormais ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q03',
      exercise_set_id: 'ch08-ex04',
      order_index: 3,
      prompt: 'Nous (bavarder) ___ depuis une heure quand il est arrivé.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['bavardions'],
      explanation: 'Durée continue avec depuis dans le passé : « bavardions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q04',
      exercise_set_id: 'ch08-ex04',
      order_index: 4,
      prompt: 'Ils (se reposer) ___ quand une alarme a retenti.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se reposaient'],
      explanation: 'Pronominal à l\'imparfait : « se reposaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q05',
      exercise_set_id: 'ch08-ex04',
      order_index: 5,
      prompt: 'Vous (parler) ___ depuis un moment quand soudain il s\'est levé.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['parliez'],
      explanation: 'Parler avec vous ➔ « parliez ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q06',
      exercise_set_id: 'ch08-ex04',
      order_index: 6,
      prompt: 'Elle (étudier) ___ l\'architecture depuis un an quand elle a décidé de changer de filière.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['étudiait', 'etudiait'],
      explanation: 'Étudier donne « étudiait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q07',
      exercise_set_id: 'ch08-ex04',
      order_index: 7,
      prompt: 'Ils (danser) ___ quand la musique s\'est arrêtée.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['dansaient'],
      explanation: 'Danser avec ils ➔ « dansaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q08',
      exercise_set_id: 'ch08-ex04',
      order_index: 8,
      prompt: 'Il (réfléchir) ___ quand une idée lui a traversé l\'esprit.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['réfléchissait', 'reflechissait'],
      explanation: 'Réfléchir donne « réfléchissait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q09',
      exercise_set_id: 'ch08-ex04',
      order_index: 9,
      prompt: 'Elle (travailler) ___ dans son bureau quand ils ont frappé à la porte.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['travaillait'],
      explanation: 'Travailler donne « travaillait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex04-q010',
      exercise_set_id: 'ch08-ex04',
      order_index: 10,
      prompt: 'Je (attendre) ___ Roland depuis dix minutes quand enfin il est arrivé.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'attendais', 'J’attendais', 'attendais', 'j\'attendais', 'j’attendais'],
      explanation: 'Attendre donne « j\'attendais » (avec élision).',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex05': [
    {
      id: 'ch08-ex05-q01',
      exercise_set_id: 'ch08-ex05',
      order_index: 1,
      prompt: 'Traduire : "I used to play tennis every Thursday."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Je jouais au tennis tous les jeudis.',
        'Je jouais au tennis tous les jeudis'
      ],
      explanation: '« I used to play » = « Je jouais » (habitude). « Every Thursday » = « tous les jeudis ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q02',
      exercise_set_id: 'ch08-ex05',
      order_index: 2,
      prompt: 'Traduire : "You were studying when the phone rang."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Tu étudiais quand le téléphone a sonné.',
        'Tu étudiais quand le téléphone a sonné',
        'Tu etudiais quand le telephone a sonne.',
        'Tu etudiais quand le telephone a sonne'
      ],
      explanation: 'Action en cours à l\'imparfait interrompue par le passé composé : « Tu étudiais quand le téléphone a sonné ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q03',
      exercise_set_id: 'ch08-ex05',
      order_index: 3,
      prompt: 'Traduire : "We were sleeping when suddenly we heard a loud noise."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous dormions quand tout à coup nous avons entendu un bruit fort.',
        'Nous dormions quand soudain nous avons entendu un bruit fort.',
        'Nous dormions quand tout à coup nous avons entendu un bruit fort',
        'Nous dormions quand soudain nous avons entendu un bruit fort',
        'Nous dormions quand tout a coup nous avons entendu un bruit fort.',
        'On dormait quand tout à coup on a entendu un bruit fort.'
      ],
      explanation: '« We were sleeping » = « Nous dormions ». « Suddenly » = « tout à coup » ou « soudain ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q04',
      exercise_set_id: 'ch08-ex05',
      order_index: 4,
      prompt: 'Traduire : "The restaurant was crowded."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Le restaurant était bondé.',
        'Le restaurant était bondé',
        'Le restaurant etait bonde.',
        'Le restaurant etait bonde'
      ],
      explanation: 'Description d\'un lieu : « Le restaurant était bondé » (bondé = cheio / lotado).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q05',
      exercise_set_id: 'ch08-ex05',
      order_index: 5,
      prompt: 'Traduire : "It was cold in the mountains."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il faisait froid à la montagne.',
        'Il faisait froid à la montagne',
        'Il faisait froid a la montagne.',
        'Il faisait froid a la montagne'
      ],
      explanation: 'Météo à l\'imparfait : « Il faisait froid à la montagne ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q06',
      exercise_set_id: 'ch08-ex05',
      order_index: 6,
      prompt: 'Traduire : "They looked tired."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils avaient l\'air fatigué.',
        'Elles avaient l\'air fatigué.',
        'Ils avaient l’air fatigué.',
        'Elles avaient l’air fatigué.',
        'Ils avaient l\'air fatigué',
        'Elles avaient l\'air fatigué',
        'Ils avaient l\'air fatigués.',
        'Elles avaient l\'air fatiguées.',
        'Ils avaient l\'air fatigue.',
        'Elles avaient l\'air fatigue.'
      ],
      explanation: '« To look tired » = « avoir l\'air fatigué » : « Ils avaient l\'air fatigué ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q07',
      exercise_set_id: 'ch08-ex05',
      order_index: 7,
      prompt: 'Traduire : "The play was fascinating."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'La pièce était fascinante.',
        'La pièce était fascinante',
        'La piece etait fascinante.',
        'La piece etait fascinante'
      ],
      explanation: '« The play » = « La pièce ». « Was fascinating » = « était fascinante ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q08',
      exercise_set_id: 'ch08-ex05',
      order_index: 8,
      prompt: 'Traduire : "She used to work at the Galeries Lafayette."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle travaillait aux Galeries Lafayette.',
        'Elle travaillait aux Galeries Lafayette'
      ],
      explanation: 'Habitude dans le passé : « Elle travaillait aux Galeries Lafayette ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q09',
      exercise_set_id: 'ch08-ex05',
      order_index: 9,
      prompt: 'Traduire : "We were waiting for the bus when it started to rain."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous attendions l\'autobus quand il a commencé à pleuvoir.',
        'Nous attendions l’autobus quand il a commencé à pleuvoir.',
        'Nous attendions le bus quand il a commencé à pleuvoir.',
        'Nous attendions l\'autobus quand il a commencé à pleuvoir',
        'Nous attendions le bus quand il a commencé à pleuvoir',
        'On attendait le bus quand il a commencé à pleuvoir.'
      ],
      explanation: '« We were waiting » = « Nous attendions l\'autobus quand il a commencé à pleuvoir ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex05-q010',
      exercise_set_id: 'ch08-ex05',
      order_index: 10,
      prompt: 'Traduire : "She knew they were wrong."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle savait qu\'ils avaient tort.',
        'Elle savait qu\'elles avaient tort.',
        'Elle savait qu’ils avaient tort.',
        'Elle savait qu’elles avaient tort.',
        'Elle savait qu\'ils avaient tort',
        'Elle savait qu\'elles avaient tort'
      ],
      explanation: '« She knew » = « Elle savait ». « They were wrong » = « qu\'ils avaient tort » (avoir tort = estar errado).',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex06': [
    {
      id: 'ch08-ex06-q01',
      exercise_set_id: 'ch08-ex06',
      order_index: 1,
      prompt: 'Si on (aller) ___ se promener dans la forêt?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['allait'],
      explanation: 'Suggestion avec « Si on + imparfait » : avec le sujet « on », la terminaison est -ait ➔ « allait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q02',
      exercise_set_id: 'ch08-ex06',
      order_index: 2,
      prompt: 'Si on (déjeuner) ___ ensemble?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['déjeunait', 'dejeunait'],
      explanation: 'Déjeuner donne « déjeunait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q03',
      exercise_set_id: 'ch08-ex06',
      order_index: 3,
      prompt: 'Si on (apporter) ___ une boîte de chocolats à Julie?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['apportait'],
      explanation: 'Apporter donne « apportait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q04',
      exercise_set_id: 'ch08-ex06',
      order_index: 4,
      prompt: 'Si on (attendre) ___ encore quelques minutes?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['attendait'],
      explanation: 'Attendre donne « attendait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q05',
      exercise_set_id: 'ch08-ex06',
      order_index: 5,
      prompt: 'Si on (commander) ___ un dessert?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['commandait'],
      explanation: 'Commander donne « commandait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q06',
      exercise_set_id: 'ch08-ex06',
      order_index: 6,
      prompt: 'Si on (faire) ___ un voyage en Grèce?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisait'],
      explanation: 'Faire donne « faisait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q07',
      exercise_set_id: 'ch08-ex06',
      order_index: 7,
      prompt: 'Si on (ouvrir) ___ un restaurant?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ouvrait'],
      explanation: 'Ouvrir donne « ouvrait » (radical de nous ouvrons).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q08',
      exercise_set_id: 'ch08-ex06',
      order_index: 8,
      prompt: 'Si on (investir) ___ dans cette entreprise?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['investissait'],
      explanation: 'Investir donne « investissait » (radical de nous investissons).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q09',
      exercise_set_id: 'ch08-ex06',
      order_index: 9,
      prompt: 'Si on (réfléchir) ___ avant de prendre une décision?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['réfléchissait', 'reflechissait'],
      explanation: 'Réfléchir donne « réfléchissait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex06-q010',
      exercise_set_id: 'ch08-ex06',
      order_index: 10,
      prompt: 'Si on (choisir) ___ une autre formule?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['choisissait'],
      explanation: 'Choisir donne « choisissait ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch08-ex07': [
    {
      id: 'ch08-ex07-q01',
      exercise_set_id: 'ch08-ex07',
      order_index: 1,
      prompt: 'Je (aller) ___ chez le dentiste hier.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Je suis allé',
        'Je suis allée',
        'Je suis allé(e)',
        'suis allé',
        'suis allée',
        'suis alle',
        'suis allee',
        'Je suis allé chez le dentiste hier.',
        'Je suis allée chez le dentiste hier.'
      ],
      explanation: 'Action ponctuelle et précise datée d\'hier ➔ passé composé avec l\'auxiliaire être : « Je suis allé(e) ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q02',
      exercise_set_id: 'ch08-ex07',
      order_index: 2,
      prompt: 'Quand il (être) ___ adolescent, il (jouer) ___ au football.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'était, jouait',
        'était / jouait',
        'etait, jouait',
        'était et jouait',
        'Quand il était adolescent, il jouait au football.',
        'Quand il était adolescent, il jouait au football'
      ],
      explanation: 'Période de la vie (état) et habitude passée ➔ deux verbes à l\'imparfait : « était, jouait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q03',
      exercise_set_id: 'ch08-ex07',
      order_index: 3,
      prompt: 'À cette époque-là, ils (tenir) ___ une brasserie place d\'Italie.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'tenaient',
        'À cette époque-là, ils tenaient une brasserie place d\'Italie.',
        'À cette époque-là, ils tenaient une brasserie place d’Italie.'
      ],
      explanation: 'Situation continue dans une époque passée ➔ imparfait : « tenaient ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q04',
      exercise_set_id: 'ch08-ex07',
      order_index: 4,
      prompt: 'Ils (randonner) ___ dans les Alpes le week-end passé.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'ont randonné',
        'ont randonne',
        'Ils ont randonné dans les Alpes le week-end passé.',
        'Ils ont randonné dans les Alpes le week-end passé'
      ],
      explanation: 'Événement ponctuel et délimité dans le temps (« le week-end passé ») ➔ passé composé : « ont randonné ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q05',
      exercise_set_id: 'ch08-ex07',
      order_index: 5,
      prompt: 'Nous (dîner) ___ dans ce restaurant tous les samedis.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'dînions',
        'dinions',
        'Nous dînions dans ce restaurant tous les samedis.',
        'Nous dînions dans ce restaurant tous les samedis'
      ],
      explanation: 'Répétition habituelle (« tous les samedis ») ➔ imparfait : « dînions ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q06',
      exercise_set_id: 'ch08-ex07',
      order_index: 6,
      prompt: 'Si on (prendre) ___ un café?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'prenait',
        'Si on prenait un café?',
        'Si on prenait un café ?'
      ],
      explanation: 'Formule de suggestion « Si on + imparfait » ➔ « prenait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q07',
      exercise_set_id: 'ch08-ex07',
      order_index: 7,
      prompt: 'Tu (avoir) ___ l\'air fatigué.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'avais',
        'Tu avais l\'air fatigué.',
        'Tu avais l’air fatigué.'
      ],
      explanation: 'Description d\'un état physique ➔ imparfait : « avais ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q08',
      exercise_set_id: 'ch08-ex07',
      order_index: 8,
      prompt: 'Chaque jour, il (écrire) ___ une lettre à son amie.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'écrivait',
        'ecrivait',
        'Chaque jour, il écrivait une lettre à son amie.',
        'Chaque jour, il écrivait une lettre à son amie'
      ],
      explanation: 'Habitude quotidienne (« chaque jour ») ➔ imparfait : « écrivait ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q09',
      exercise_set_id: 'ch08-ex07',
      order_index: 9,
      prompt: 'Je (regarder) ___ un film quand elle (arriver) ___ .',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'regardais, est arrivée',
        'regardais / est arrivée',
        'regardais, est arrivee',
        'regardais et est arrivée',
        'Je regardais un film quand elle est arrivée.',
        'Je regardais un film quand elle est arrivée'
      ],
      explanation: 'Action continue (imparfait : regardais) interrompue par une action ponctuelle (passé composé : est arrivée).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch08-ex07-q010',
      exercise_set_id: 'ch08-ex07',
      order_index: 10,
      prompt: 'La campagne (être) ___ si belle.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'était',
        'etait',
        'La campagne était si belle.',
        'La campagne était si belle'
      ],
      explanation: 'Description d\'un paysage ➔ imparfait : « était ».',
      created_at: new Date().toISOString()
    }
  ]
};
