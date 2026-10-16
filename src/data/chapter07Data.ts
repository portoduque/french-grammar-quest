import { Topic, ExerciseSet, Question } from '@/types/database';
import { MatchingOption } from '@/components/exercises/interactions';

export const CHAPTER_07_THEORY_MARKDOWN = `# Chapitre 07 — Le Passé Composé : Maîtrise Complète, Auxiliaires et Accords

> [!TIP]
> ### 👨‍🏫 Dica do Professor de Francês (FLE) : Regras de Ouro do Passé Composé
> 1. **Passé Composé vs. Pretérito Perfeito em Português** :
>    - Em português, dizemos *"eu comi"*, *"ela viajou"*, *"eles saíram"* com uma única palavra conjugada (pretérito perfeito simples).
>    - Em francês moderno, esse passado pontual é **SEMPRE composto** por duas peças obrigatórias :
>      $$\\text{Sujet} + \\text{Auxiliaire (Avoir ou Être au présent)} + \\text{Participe Passé}$$
>    - **Alerta de Falso Amigo** : Em português, *"tenho falado"* indica uma ação repetida e contínua no presente (*action itérative*). Em francês, **« J'ai parlé »** NÃO é contínuo : significa exatamente *"eu falei"* ou *"eu tenho falado"* no sentido de ação concluída no passado (*passé ponctuel achevé*).
> 2. **A Grande Escolha : AVOIR ou ÊTRE ?** :
>    - **Mais de 90% dos verbos** utilizam o auxiliar **AVOIR** (*j'ai mangé, nous avons regardé, ils ont fini*).
>    - O auxiliar **ÊTRE** é reservado com rigor absoluto para :
>      - **A Casa do Être (*La Maison d'Être / DR & MRS VANDERTRAMP*)** : 14 a 16 verbos intransitivos de movimento, deslocamento ou mudança de estado (*aller/venir, naître/mourir, monter/descendre, entrer/sortir, arriver/partir, retourner, passer, tomber, rester, devenir, revenir*).
>      - **TODOS os Verbos Pronominais** (*se réveiller, se promener, s'évanouir, se brosser*).
> 3. **O Acordo do Particípio com ÊTRE (Regra do Sujeito)** :
>    - Quando o verbo se conjuga com **Être**, o particípio passado concorda **obrigatoriamente em gênero e número com o sujeito** :
>      - Masculino singular : *Il est parti.*
>      - Feminino singular : *Elle est parti**e**.*
>      - Masculino plural : *Ils sont parti**s**.*
>      - Feminino plural : *Elles sont parti**es**.*
> 4. **O Acordo com AVOIR : A Regra Sagrada do C.O.D. Anteposto** :
>    - Regra geral : Com o auxiliar **avoir**, o particípio **NUNCA concorda com o sujeito** (*Elle a acheté une robe, Ils ont lu les lettres*).
>    - **Exceção de Ouro** : Se o **Objeto Direto (C.O.D.) estiver posicionado ANTES do verbo**, o particípio concorda em gênero e número com esse C.O.D. :
>      - *Il a pris la bonne décision.* ➔ C.O.D. depois : sem acordo.
>      - *La bonne décision qu'il a pris**e**.* ➔ C.O.D. antes (*la décision* = fem. sing.) : particípio concorda !
>      - *Il **l'**a pris**e**.* ➔ Pronome C.O.D. antes (*l'* = la décision) : concorda !
>      - *Elle a compris ses erreurs.* ➔ C.O.D. depois : sem acordo.
>      - *Elle **les** a compris**es**.* ➔ Pronome C.O.D. antes (*les* = ses erreurs, fem. pl.) : concorda !
> 5. **Os 6 Verbos Camaleões a Duplo Auxiliar (*Monter, Descendre, Sortir, Rentrer, Passer, Retourner*)** :
>    - **Sem C.O.D. (Movimento intransitivo)** ➔ Auxiliar **ÊTRE** (com acordo) :
>      - *Elle **est sortie** avec ses amis.* (Ela saiu com os amigos.)
>      - *Elle **est descendue** au rez-de-chaussée.* (Ela desceu ao térreo.)
>      - *Je **suis passée** devant la boulangerie.* (Passei na frente da padaria.)
>    - **Com C.O.D. (Ação transitiva direta)** ➔ Auxiliar **AVOIR** (sem acordo com o sujeito) :
>      - *Elle **a sorti** la voiture du garage.* (Ela tirou o carro da garagem — C.O.D. = *la voiture*).
>      - *Elle **a descendu** les poubelles / les valises.* (Ela desceu o lixo / as malas).
>      - *J'**ai passé** trois semaines à Tokyo.* (Passei três semanas em Tóquio — complemento de duração).
>      - *Il **a retourné** l'omelette / le bifteck.* (Ele virou a omelete / o bife).
> 6. **Verbos Pronominais e Partes do Corpo** :
>    - Verbos pronominais usam **être**, mas atenção às partes do corpo :
>      - *Elle s'est lavé**e**.* (Ela lavou-se ➔ o pronome reflexivo é C.O.D. ➔ concorda !).
>      - *Elle s'est lavé **les mains**.* (Ela lavou as mãos ➔ o C.O.D. é *les mains*, colocado depois ➔ o particípio fica invariável !).
>      - *Il s'est brossé **les dents**.* (Ele escovou os dentes ➔ invariável ! E lembre-se: diz-se *les dents*, nunca *ses dents*).
> 7. **Verbos Réciproques com Objeto Indireto (COI) : JAMAIS de Acordo !** :
>    - Quando a reciprocidade se constrói com a preposição *à* subentendida (*parler à, téléphoner à, écrire à, plaire à, sourire à, succéder à*), o pronome reflexivo é **C.O.I.** (objeto indireto). Portanto, o particípio **NUNCA concorda** :
>      - *Ils se sont téléphoné.* (Téléphoner **à** qqn ➔ sem *s* !).
>      - *Elles se sont parlé.* (Parler **à** qqn ➔ sem *es* !).
>      - *Ils se sont écrit régulièrement.* (Écrire **à** qqn ➔ sem *s* !).

---

## 1. La Formation Régulière du Participe Passé

Pour former le participe passé des verbes réguliers :
- **Verbes en -ER** : on remplace *-er* par **-é** (*parler ➔ parlé*, *manger ➔ mangé*, *inviter ➔ invité*, *voyager ➔ voyagé*).
- **Verbes en -IR (réguliers / 2ᵉ groupe)** : on remplace *-ir* par **-i** (*finir ➔ fini*, *choisir ➔ choisi*, *réfléchir ➔ réfléchi*, *applaudir ➔ applaudi*).
- **Verbes en -RE (réguliers)** : on remplace *-re* par **-u** (*attendre ➔ attendu*, *vendre ➔ vendu*, *perdre ➔ perdu*, *entendre ➔ entendu*).

### La Négation au Passé Composé
La négation **ne ... pas** encadre **uniquement l'auxiliaire** :
- *Il a vendu sa voiture.* ➔ *Il **n'a pas vendu** sa voiture.*
- *Ils ont dîné au restaurant.* ➔ *Ils **n'ont pas dîné** au restaurant.*
- *Elle est partie hier.* ➔ *Elle **n'est pas partie** hier.*
- *Nous nous sommes levés tôt.* ➔ *Nous **ne nous sommes pas levés** tôt.*

### L'Interrogation au Passé Composé
Il existe trois registres d'interrogation :
1. **Intonation montante (familier / oral)** : *Vous avez aimé la pièce ?*
2. **Avec « Est-ce que » (courant / standard)** : *Est-ce que vous avez aimé la pièce ?*
3. **Inversion sujet-auxiliaire (soutenu / formel)** :
   - *Avez-vous aimé la pièce ?*
   - *Est-il monté sur scène ?*
   - *Quel jour est-il parti ?*
   - Note : si le verbe se termine par une voyelle et le pronom commence par une voyelle, on ajoute un **-t-** euphonique : *A-t-il compris ?*, *A-t-elle téléphoné ?*.

---

## 2. Le Participe Passé avec AVOIR et l'Accord du C.O.D.

Avec l'auxiliaire **avoir**, la règle de base est qu'il n'y a **aucun accord avec le sujet** :
- *Marie a acheté des fruits.*
- *Les garçons ont regardé le match.*

Toutefois, le participe s'accorde en **genre et en nombre** avec le **Complément d'Objet Direct (C.O.D.)** lorsque celui-ci est placé **avant** le verbe. Cela se produit dans trois cas très fréquents :
1. **Avec un pronom personnel C.O.D. (le, la, l', les)** :
   - *Ces erreurs ? Elle les a comprises.* (*les* = ses erreurs, féminin pluriel ➔ +es).
   - *La décision ? Il l'a prise.* (*l'* = la décision, féminin singulier ➔ +e).
2. **Avec le pronom relatif « que »** :
   - *La lettre que j'ai écrite.* (*la lettre* est antécédent de *que* ➔ +e).
   - *Les films que nous avons vus.* (*les films* = masculin pluriel ➔ +s).
3. **Dans une question avec un mot interrogatif portant sur le C.O.D. (quel, quelle, quels, quelles, combien de)** :
   - *Quelle pièce avez-vous vue ?* (féminin singulier ➔ +e).
   - *Combien de livres as-tu achetés ?* (masculin pluriel ➔ +s).

---

## 3. Les Participes Passés Irréguliers par Familles

De nombreux verbes fréquents conjugués avec **avoir** ont un participe passé irrégulier qu'il est indispensable de mémoriser. Les regrouper par familles phonétiques facilite considérablement l'apprentissage :

| Famille | Infinitif | Participe Passé | Traduction / Exemple |
|---|---|---|---|
| **En -U** | *avoir* | **eu** (prononcé [y]) | J'ai eu un accident. |
| | *boire* | **bu** | Tu as bu un café. |
| | *connaître* | **connu** | Nous avons connu ce chanteur. |
| | *croire* | **cru** | Il a cru cette histoire. |
| | *devoir* | **dû** (avec accent circonflexe !) | Il a dû partir à cinq heures. |
| | *falloir* | **fallu** (impersonnel) | Il a fallu attendre. |
| | *lire* | **lu** | Elle a lu le roman de Zola. |
| | *pleuvoir* | **plu** (impersonnel) | Il a plu tout l'après-midi. |
| | *plaire* | **plu** | La pièce a plu au public. |
| | *pouvoir* | **pu** | Nous n'avons pas pu venir. |
| | *recevoir* | **reçu** (avec cédille !) | Vous avez reçu des compliments. |
| | *savoir* | **su** | J'ai su la vérité. |
| | *vivre* | **vécu** | Ils ont vécu en Italie. |
| | *voir* | **vu** | J'ai vu ce documentaire. |
| | *vouloir* | **voulu** | Il a voulu tout savoir. |
| **En -IS** | *prendre* | **pris** | J'ai pris le train à Lille. |
| | *apprendre* | **appris** | Il a appris le français. |
| | *comprendre* | **compris** | Tu as compris les explications. |
| | *mettre* | **mis** | Il a mis son chapeau gris. |
| **En -IT** | *conduire* | **conduit** | Elle a conduit à toute vitesse. |
| | *dire* | **dit** | Elle m'a dit bonjour. |
| | *écrire* | **écrit** | J'ai écrit une longue lettre. |
| **En -ERT** | *ouvrir* | **ouvert** | Elle a ouvert les fenêtres. |
| | *offrir* | **offert** | Il a offert des fleurs. |
| | *découvrir* | **découvert** | Nous avons découvert un musée. |
| **En -AINT / -EINT** | *craindre* | **craint** | Il a craint le pire. |
| | *peindre* | **peint** | Elle a peint un paysage breton. |
| **Cas Historiques** | *être* | **été** (invariable) | J'ai été très occupé. |
| | *faire* | **fait** | J'ai fait la cuisine. |
| | *naître* | **né** (auxiliaire être) | Il est né en France. |
| | *mourir* | **mort** (auxiliaire être) | Molière est mort en 1673. |
| | *rire* | **ri** | Nous avons ri aux éclats. |
| | *suivre* | **suivi** | Ils ont suivi un cours d'anglais. |

---

## 4. Le Passé Composé avec ÊTRE (La Maison d'Être)

Quatorze verbes de mouvement intransitifs et de changement d'état se conjuguent avec **être**. Le participe passé s'accorde **toujours en genre et en nombre avec le sujet** :

1. **Naître** ➔ *né(e)(s)* (*Il est né*, *Elle est née*)
2. **Mourir** ➔ *mort(e)(s)* (*Il est mort*, *Elle est morte*)
3. **Aller** ➔ *allé(e)(s)* (*Il est allé*, *Elles sont allées*)
4. **Venir** ➔ *venu(e)(s)* (*Il est venu*, *Elles sont venues*)
5. **Arriver** ➔ *arrivé(e)(s)* (*Le train est arrivé*, *La lettre est arrivée*)
6. **Partir** ➔ *parti(e)(s)* (*Ils sont partis*, *Elles sont parties*)
7. **Entrer** ➔ *entré(e)(s)* (*Il est entré*)
8. **Sortir** ➔ *sorti(e)(s)* (*Elle est sortie*)
9. **Monter** ➔ *monté(e)(s)* (*Ils sont montés*)
10. **Descendre** ➔ *descendu(e)(s)* (*Elles sont descendues*)
11. **Retourner** ➔ *retourné(e)(s)* (*Elle est retournée à Rome*)
12. **Tomber** ➔ *tombé(e)(s)* (*La voiture est tombée en panne*)
13. **Rester** ➔ *resté(e)(s)* (*Le metteur en scène est resté dans les coulisses*)
14. **Passer** ➔ *passé(e)(s)* (*Je suis passée devant la poste*)

Ainsi que leurs dérivés directs : *revenir* (revenu), *devenir* (devenu), *rentrer* (rentré).

---

## 5. Les Verbes à Double Auxiliaire (*Avoir* vs *Être*)

Six verbes parmi ceux de la liste ci-dessus peuvent être construits soit de façon intransitive (mouvement du sujet), soit de façon transitive directe (avec un C.O.D.) :
**monter, descendre, sortir, rentrer, passer, retourner**.

| Verbe | Avec ÊTRE (Intransitif : mouvement du sujet) | Avec AVOIR (Transitif : action exercée sur un C.O.D.) |
|---|---|---|
| **Monter** | *Ils **sont montés** au grenier.* | *Ils **ont monté** les malles au grenier.* (C.O.D. = les malles) |
| **Descendre** | *Elle **est descendue** au rez-de-chaussée.* | *Elle **a descendu** les poubelles / les valises.* (C.O.D.) |
| **Sortir** | *Elle **est sortie** avec des amis.* | *Elle **a sorti** la voiture / les chaises de jardin.* (C.O.D.) |
| **Rentrer** | *Elle **est rentrée** très tard hier.* | *Elle **a rentré** les géraniums dans le salon.* (C.O.D.) |
| **Passer** | *Je **suis passée** devant le boulanger.* | *J'**ai passé** un mois en Chine.* (C.O.D. / durée) |
| **Retourner** | *Elle **est retournée** à Rome.* | *Il **a retourné** l'omelette / le bifteck.* (C.O.D.) |

---

## 6. Les Verbes Pronominaux au Passé Composé

Tous les verbes pronominaux se conjuguent **exclusivement avec l'auxiliaire ÊTRE** au passé composé :
$$\\text{Sujet} + \\text{Pronom réfléchi (me, te, se, nous, vous, se)} + \\text{Être au présent} + \\text{Participe Passé}$$

- *Je me suis réveillé(e)*
- *Tu t'es réveillé(e)*
- *Il s'est réveillé / Elle s'est réveillée*
- *Nous nous sommes réveillé(e)s*
- *Vous vous êtes réveillé(e)(s)*
- *Ils se sont réveillés / Elles se sont réveillées*

### Les 3 Règles d'Accord des Pronominaux
1. **Verbe réfléchi direct (le pronom est C.O.D.)** ➔ **ACCORD AVEC LE SUJET** :
   - *Elles se sont maquillées pour aller au bal.* (Maquiller qui ? Elles-mêmes = C.O.D. antéposé).
   - *Ils se sont rencontrés à une conférence.* (Rencontrer qui ? L'un l'autre = C.O.D.).
   - *Anna s'est arrêtée dix minutes.* (Arrêter qui ? Elle-même = C.O.D.).
2. **Verbe avec C.O.D. postposé (parties du corps, objets)** ➔ **PAS D'ACCORD** :
   - *Tu t'es coupé le doigt.* (Le C.O.D. *le doigt* est placé APRÈS le verbe ➔ *coupé* reste invariable !).
   - *Il s'est brossé les dents.* (Le C.O.D. *les dents* est placé APRÈS ➔ *brossé* reste invariable !).
   - *Nous nous sommes demandé pourquoi il était absent.* (Le C.O.D. est la subordonnée ➔ invariable !).
3. **Verbe réciproque transitif indirect (C.O.I. en « à »)** ➔ **PAS D'ACCORD** :
   - *Ils se sont écrit régulièrement.* (On écrit **à** quelqu'un ➔ *se* est C.O.I. ➔ *écrit* sans *s* !).
   - *Elles se sont téléphoné hier soir.* (On téléphone **à** quelqu'un ➔ C.O.I. ➔ *téléphoné* invariable !).
   - *Ils se sont parlé pendant une heure.* (On parle **à** quelqu'un ➔ C.O.I. ➔ *parlé* invariable !).
`;

export const CHAPTER_07_TOPICS: Topic[] = [
  {
    id: 'ch07-t01',
    chapter_id: 'ch07',
    order_index: 1,
    title: 'Formation Régulière & Auxiliaire Avoir',
    rule_summary: 'Formation du participe passé régulier (-é, -i, -u), négation ne... pas et interrogation au passé composé.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-t02',
    chapter_id: 'ch07',
    order_index: 2,
    title: 'Participe avec Avoir & Règle d\'Accord du C.O.D.',
    rule_summary: 'Invariabilité de principe du participe avec avoir et accord obligatoire avec le C.O.D. placé avant le verbe.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-t03',
    chapter_id: 'ch07',
    order_index: 3,
    title: 'Les Participes Passés Irréguliers par Familles',
    rule_summary: 'Mémorisation raisonnée des participes fréquents en -u, -is, -it, -ert, -eint et cas historiques (été, fait, né, mort).',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-t04',
    chapter_id: 'ch07',
    order_index: 4,
    title: 'Le Passé Composé avec ÊTRE (La Maison d\'Être)',
    rule_summary: 'Les 14 verbes intransitifs de mouvement et de changement d\'état avec accord systématique en genre et nombre avec le sujet.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-t05',
    chapter_id: 'ch07',
    order_index: 5,
    title: 'Les Verbes à Double Auxiliaire (Avoir vs Être)',
    rule_summary: 'Monter, descendre, sortir, rentrer, passer, retourner : sens de déplacement avec être vs transitif avec C.O.D. avec avoir.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-t06',
    chapter_id: 'ch07',
    order_index: 6,
    title: 'Les Verbes Pronominaux au Passé Composé',
    rule_summary: 'Conjugaison exclusive avec être, règles d\'accord réfléchi (C.O.D.), parties du corps et verbes réciproques indirects.',
    created_at: new Date().toISOString()
  }
];

export const CHAPTER_07_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch07-ex01',
    chapter_id: 'ch07',
    order_index: 1,
    title: 'Exercice 7.1 — Verbes réguliers en -er avec avoir',
    instruction: 'Mettre les verbes entre parenthèses au passé composé avec l\'auxiliaire avoir.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex02',
    chapter_id: 'ch07',
    order_index: 2,
    title: 'Exercice 7.2 — Verbes réguliers en -ir et -re avec avoir',
    instruction: 'Mettre les verbes entre parenthèses au passé composé avec l\'auxiliaire avoir.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex03',
    chapter_id: 'ch07',
    order_index: 3,
    title: 'Exercice 7.3 — Traduction active vers le français (avoir)',
    instruction: 'Traduire les phrases vers le français au passé composé avec l\'auxiliaire avoir.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex04',
    chapter_id: 'ch07',
    order_index: 4,
    title: 'Exercice 7.4 — Participes passés irréguliers fréquents',
    instruction: 'Mettre les verbes entre parenthèses au passé composé en utilisant le bon participe irrégulier.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex05',
    chapter_id: 'ch07',
    order_index: 5,
    title: 'Exercice 7.5 — Association logique verbe et complément',
    instruction: 'Associer chaque sujet et verbe conjugué au passé composé avec son complément logique.',
    interaction_type: 'matching',
    questions_count: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex06',
    chapter_id: 'ch07',
    order_index: 6,
    title: 'Exercice 7.6 — Passé composé avec l\'auxiliaire être et accords',
    instruction: 'Mettre les verbes entre parenthèses au passé composé avec être, en accordant le participe et en utilisant l\'inversion si nécessaire.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex07',
    chapter_id: 'ch07',
    order_index: 7,
    title: 'Exercice 7.7 — Traduction active : avoir ou être',
    instruction: 'Traduire les phrases vers le français au passé composé en choisissant le bon auxiliaire.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex08',
    chapter_id: 'ch07',
    order_index: 8,
    title: 'Exercice 7.8 — Verbes pronominaux au passé composé',
    instruction: 'Mettre au passé composé les verbes pronominaux entre parenthèses en respectant les règles d\'accord.',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex09',
    chapter_id: 'ch07',
    order_index: 9,
    title: 'Exercice 7.9 — Verbes à double auxiliaire (avoir vs être)',
    instruction: 'Associer chaque début de phrase avec le complément qui justifie l\'emploi de l\'auxiliaire avoir ou être.',
    interaction_type: 'matching',
    questions_count: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch07-ex10',
    chapter_id: 'ch07',
    order_index: 10,
    title: 'Exercice 7.10 — Traduction de synthèse (pronominaux & double auxiliaire)',
    instruction: 'Traduire les phrases en français en appliquant les règles des verbes pronominaux et du double auxiliaire.',
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  }
];

export const MATCHING_OPTIONS_7_5: MatchingOption[] = [
  { label: 'a', text: 'le journal' },
  { label: 'b', text: 'un accident' },
  { label: 'c', text: 'une promenade' },
  { label: 'd', text: 'les explications' },
  { label: 'e', text: 'à toute vitesse' }
];

export const MATCHING_OPTIONS_7_9: MatchingOption[] = [
  { label: 'a', text: 'le bifteck' },
  { label: 'b', text: 'devant le boulanger' },
  { label: 'c', text: 'pour la cinquième fois' },
  { label: 'd', text: 'très tard' },
  { label: 'e', text: 'les chaises de jardin' }
];

export const CHAPTER_07_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch07-ex01': [
    {
      id: 'ch07-ex01-q01',
      exercise_set_id: 'ch07-ex01',
      order_index: 1,
      prompt: 'Il (inviter) ___ beaucoup de monde.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a invité', 'a invite'],
      explanation: 'Le verbe régulier « inviter » forme son participe passé en -é (« invité »). Avec le sujet « il », l\'auxiliaire avoir est « a ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q02',
      exercise_set_id: 'ch07-ex01',
      order_index: 2,
      prompt: 'Nous (refuser) ___ leur invitation.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avons refusé', 'avons refuse'],
      explanation: 'Avec « nous », avoir donne « avons », et refuser donne « refusé ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q03',
      exercise_set_id: 'ch07-ex01',
      order_index: 3,
      prompt: 'Tu (travailler) ___ hier matin?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['as travaillé', 'as travaille'],
      explanation: 'Avec « tu », avoir donne « as », et travailler donne « travaillé ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q04',
      exercise_set_id: 'ch07-ex01',
      order_index: 4,
      prompt: 'Il (comprendre) ___ l\'intrigue.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a compris'],
      explanation: 'Comprendre appartient à la famille de « prendre » : son participe passé est « compris ». Il a compris.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q05',
      exercise_set_id: 'ch07-ex01',
      order_index: 5,
      prompt: 'Elle (apporter) ___ un joli cadeau.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a apporté', 'a apporte'],
      explanation: 'Apporter est un verbe régulier en -er : participe « apporté ». Elle a apporté.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q06',
      exercise_set_id: 'ch07-ex01',
      order_index: 6,
      prompt: 'Je (voyager) ___ avec Rémi.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'ai voyagé', 'J’ai voyagé', 'ai voyagé', 'ai voyage', 'j\'ai voyage', 'j’ai voyage'],
      explanation: 'L\'élision est obligatoire : « j\'ai voyagé ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q07',
      exercise_set_id: 'ch07-ex01',
      order_index: 7,
      prompt: 'Vous (louer) ___ une voiture?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avez loué', 'avez loue'],
      explanation: 'Vous avez loué.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q08',
      exercise_set_id: 'ch07-ex01',
      order_index: 8,
      prompt: 'Elle (sous-titrer) ___ le film.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a sous-titré', 'a sous-titre'],
      explanation: 'Elle a sous-titré le film.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q09',
      exercise_set_id: 'ch07-ex01',
      order_index: 9,
      prompt: 'Vous (téléphoner) ___ à vos cousins.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avez téléphoné', 'avez telephone'],
      explanation: 'Vous avez téléphoné à vos cousins.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex01-q010',
      exercise_set_id: 'ch07-ex01',
      order_index: 10,
      prompt: 'Tu (assister) ___ à la pièce de théâtre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['as assisté', 'as assiste'],
      explanation: 'Assister à = assister / être présent à un spectacle. Tu as assisté.',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex02': [
    {
      id: 'ch07-ex02-q01',
      exercise_set_id: 'ch07-ex02',
      order_index: 1,
      prompt: 'Ils (investir) ___ une grosse somme.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ont investi'],
      explanation: 'Investir est du 2ᵉ groupe : participe en -i (« investi »). Ils ont investi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q02',
      exercise_set_id: 'ch07-ex02',
      order_index: 2,
      prompt: 'Le public (applaudir) ___ les comédiens.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a applaudi'],
      explanation: 'Le public est singulier en français : il a applaudi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q03',
      exercise_set_id: 'ch07-ex02',
      order_index: 3,
      prompt: 'Elles (réfléchir) ___ toute la journée.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ont réfléchi', 'ont reflechi'],
      explanation: 'Elles ont réfléchi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q04',
      exercise_set_id: 'ch07-ex02',
      order_index: 4,
      prompt: 'La voiture (ralentir) ___ au carrefour.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a ralenti'],
      explanation: 'La voiture a ralenti.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q05',
      exercise_set_id: 'ch07-ex02',
      order_index: 5,
      prompt: 'Ils (attendre) ___ le train une demi-heure.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ont attendu'],
      explanation: 'Attendre fait « attendu ». Ils ont attendu.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q06',
      exercise_set_id: 'ch07-ex02',
      order_index: 6,
      prompt: 'Nous (réussir) ___ à les convaincre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avons réussi', 'avons reussi'],
      explanation: 'Réussir fait « réussi ». Nous avons réussi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q07',
      exercise_set_id: 'ch07-ex02',
      order_index: 7,
      prompt: 'Elle (perdre) ___ ses bijoux en vacances.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a perdu'],
      explanation: 'Perdre fait « perdu ». Elle a perdu.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q08',
      exercise_set_id: 'ch07-ex02',
      order_index: 8,
      prompt: 'Tu (grandir) ___ en Europe?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['as grandi'],
      explanation: 'Grandir fait « grandi ». Tu as grandi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q09',
      exercise_set_id: 'ch07-ex02',
      order_index: 9,
      prompt: 'Elle (sentir) ___ une bonne odeur venant de la cuisine.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a senti'],
      explanation: 'Sentir se conjugue avec avoir : elle a senti.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex02-q010',
      exercise_set_id: 'ch07-ex02',
      order_index: 10,
      prompt: 'Le théâtre (vendre) ___ beaucoup de billets.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a vendu'],
      explanation: 'Vendre fait « vendu ». Le théâtre a vendu.',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex03': [
    {
      id: 'ch07-ex03-q01',
      exercise_set_id: 'ch07-ex03',
      order_index: 1,
      prompt: 'Traduire : "They sold the house in France."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont vendu la maison en France.',
        'Elles ont vendu la maison en France.',
        'Ils ont vendu la maison en France',
        'Elles ont vendu la maison en France'
      ],
      explanation: '« They » peut se traduire par « Ils » ou « Elles ». Le verbe vendre donne « ont vendu ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q02',
      exercise_set_id: 'ch07-ex03',
      order_index: 2,
      prompt: 'Traduire : "I waited ten minutes."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'J\'ai attendu dix minutes.',
        'J’ai attendu dix minutes.',
        'J\'ai attendu dix minutes',
        'J’ai attendu dix minutes'
      ],
      explanation: '« I waited » = « J\'ai attendu ». « Ten minutes » = « dix minutes ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q03',
      exercise_set_id: 'ch07-ex03',
      order_index: 3,
      prompt: 'Traduire : "He finished the novel."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il a fini le roman.',
        'Il a fini le roman'
      ],
      explanation: '« He finished » = « Il a fini ». « The novel » = « le roman ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q04',
      exercise_set_id: 'ch07-ex03',
      order_index: 4,
      prompt: 'Traduire : "She lost her dictionary."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle a perdu son dictionnaire.',
        'Elle a perdu son dictionnaire'
      ],
      explanation: '« She lost » = « Elle a perdu ». Dictionnaire étant masculin en français, on utilise « son dictionnaire ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q05',
      exercise_set_id: 'ch07-ex03',
      order_index: 5,
      prompt: 'Traduire : "I called Marc."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'J\'ai appelé Marc.',
        'J’ai appelé Marc.',
        'J\'ai appelé Marc',
        'J’ai appelé Marc',
        'J\'ai appele Marc.',
        'J’ai appele Marc'
      ],
      explanation: '« I called » = « J\'ai appelé Marc ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q06',
      exercise_set_id: 'ch07-ex03',
      order_index: 6,
      prompt: 'Traduire : "They served an elegant dinner."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont servi un dîner élégant.',
        'Elles ont servi un dîner élégant.',
        'Ils ont servi un dîner élégant',
        'Elles ont servi un dîner élégant',
        'Ils ont servi un diner elegant.',
        'Elles ont servi un diner elegant.'
      ],
      explanation: 'Servir est régulier au participe : « servi ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q07',
      exercise_set_id: 'ch07-ex03',
      order_index: 7,
      prompt: 'Traduire : "He bought a car."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il a acheté une voiture.',
        'Il a acheté une voiture',
        'Il a achete une voiture.',
        'Il a achete une voiture'
      ],
      explanation: '« He bought » = « Il a acheté ». « A car » = « une voiture ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q08',
      exercise_set_id: 'ch07-ex03',
      order_index: 8,
      prompt: 'Traduire : "I chose a very good cheese."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'J\'ai choisi un très bon fromage.',
        'J’ai choisi un très bon fromage.',
        'J\'ai choisi un très bon fromage',
        'J’ai choisi un très bon fromage',
        'J\'ai choisi un tres bon fromage.',
        'J’ai choisi un tres bon fromage.'
      ],
      explanation: '« I chose » = « J\'ai choisi ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q09',
      exercise_set_id: 'ch07-ex03',
      order_index: 9,
      prompt: 'Traduire : "We watched the film."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous avons regardé le film.',
        'Nous avons regardé le film',
        'Nous avons regarde le film.',
        'Nous avons regarde le film',
        'On a regardé le film.',
        'On a regardé le film'
      ],
      explanation: '« We watched » = « Nous avons regardé le film ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex03-q010',
      exercise_set_id: 'ch07-ex03',
      order_index: 10,
      prompt: 'Traduire : "They applauded the actor."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont applaudi le comédien.',
        'Elles ont applaudi le comédien.',
        'Ils ont applaudi le comédien',
        'Elles ont applaudi le comédien',
        'Ils ont applaudi l\'acteur.',
        'Elles ont applaudi l\'acteur.',
        'Ils ont applaudi l’acteur.',
        'Elles ont applaudi l’acteur.',
        'Ils ont applaudi le comedien.',
        'Elles ont applaudi le comedien.'
      ],
      explanation: 'Dans le vocabulaire du chapitre, « actor » au théâtre est « le comédien ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex04': [
    {
      id: 'ch07-ex04-q01',
      exercise_set_id: 'ch07-ex04',
      order_index: 1,
      prompt: 'Je (prendre) ___ le train à Lille.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'ai pris', 'J’ai pris', 'ai pris', 'j\'ai pris', 'j’ai pris'],
      explanation: 'Prendre a pour participe « pris ». J\'ai pris le train.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q02',
      exercise_set_id: 'ch07-ex04',
      order_index: 2,
      prompt: 'Nous (ne pas pouvoir) ___ joindre les Quentin.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['n\'avons pas pu', 'n’avons pas pu'],
      explanation: 'Pouvoir donne « pu ». Négation : « n\'avons pas pu ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q03',
      exercise_set_id: 'ch07-ex04',
      order_index: 3,
      prompt: 'Ils (suivre) ___ un cours d\'anglais en Angleterre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['ont suivi'],
      explanation: 'Suivre a pour participe passé « suivi ». Ils ont suivi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q04',
      exercise_set_id: 'ch07-ex04',
      order_index: 4,
      prompt: 'Elle (peindre) ___ un paysage breton.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a peint'],
      explanation: 'Peindre donne « peint » au participe passé. Elle a peint.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q05',
      exercise_set_id: 'ch07-ex04',
      order_index: 5,
      prompt: 'Il (pleuvoir) ___ tout l\'après-midi.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a plu'],
      explanation: 'Pleuvoir donne « plu ». Il a plu tout l\'après-midi.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q06',
      exercise_set_id: 'ch07-ex04',
      order_index: 6,
      prompt: 'Vous (recevoir) ___ beaucoup de compliments.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avez reçu', 'avez recu'],
      explanation: 'Recevoir donne « reçu ». Vous avez reçu.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q07',
      exercise_set_id: 'ch07-ex04',
      order_index: 7,
      prompt: 'Nous (lire) ___ un roman de Zola.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['avons lu'],
      explanation: 'Lire donne « lu ». Nous avons lu.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q08',
      exercise_set_id: 'ch07-ex04',
      order_index: 8,
      prompt: 'Je (faire) ___ la cuisine pour toute la famille.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['J\'ai fait', 'J’ai fait', 'ai fait', 'j\'ai fait', 'j’ai fait'],
      explanation: 'Faire donne « fait ». J\'ai fait la cuisine.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q09',
      exercise_set_id: 'ch07-ex04',
      order_index: 9,
      prompt: 'Il (mettre) ___ son chapeau gris.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a mis'],
      explanation: 'Mettre donne « mis ». Il a mis son chapeau.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex04-q010',
      exercise_set_id: 'ch07-ex04',
      order_index: 10,
      prompt: 'Elle (ouvrir) ___ les fenêtres.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['a ouvert'],
      explanation: 'Ouvrir donne « ouvert ». Elle a ouvert.',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex05': [
    {
      id: 'ch07-ex05-q01',
      exercise_set_id: 'ch07-ex05',
      order_index: 1,
      prompt: 'Elle a conduit',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_5,
      accepted_answers: ['e', 'à toute vitesse', 'a toute vitesse'],
      explanation: '« Elle a conduit à toute vitesse » (conduire à toute vitesse = diriger em alta velocidade).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex05-q02',
      exercise_set_id: 'ch07-ex05',
      order_index: 2,
      prompt: 'Tu as compris',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_5,
      accepted_answers: ['d', 'les explications'],
      explanation: '« Tu as compris les explications » (compreender as explicações).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex05-q03',
      exercise_set_id: 'ch07-ex05',
      order_index: 3,
      prompt: 'Vous avez lu',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_5,
      accepted_answers: ['a', 'le journal'],
      explanation: '« Vous avez lu le journal » (ler o jornal).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex05-q04',
      exercise_set_id: 'ch07-ex05',
      order_index: 4,
      prompt: 'Il a eu',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_5,
      accepted_answers: ['b', 'un accident'],
      explanation: '« Il a eu un accident » (ter um acidente).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex05-q05',
      exercise_set_id: 'ch07-ex05',
      order_index: 5,
      prompt: 'Nous avons fait',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_5,
      accepted_answers: ['c', 'une promenade'],
      explanation: '« Nous avons fait une promenade » (fazer um passeio / dar uma caminhada).',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex06': [
    {
      id: 'ch07-ex06-q01',
      exercise_set_id: 'ch07-ex06',
      order_index: 1,
      prompt: 'À quel âge ce comédien (monter) ___ sur scène?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est-il monté', 'est-il monte'],
      explanation: 'Monter sans C.O.D. utilise l\'auxiliaire être. Dans cette question soutenue, on applique l\'inversion sujet-auxiliaire : « est-il monté ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q02',
      exercise_set_id: 'ch07-ex06',
      order_index: 2,
      prompt: 'Nous (rentrer) ___ du théâtre à minuit.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['sommes rentrés', 'sommes rentrées', 'sommes rentré(e)s', 'sommes rentres', 'sommes rentrees'],
      explanation: 'Rentrer utilise être. Le participe s\'accorde avec le sujet nous : « sommes rentrés » (ou « rentrées » si féminin).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q03',
      exercise_set_id: 'ch07-ex06',
      order_index: 3,
      prompt: 'La voiture (tomber) ___ en panne près de Madrid.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est tombée', 'est tombee'],
      explanation: 'Tomber en panne se conjugue avec être : la voiture est tombée en panne.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q04',
      exercise_set_id: 'ch07-ex06',
      order_index: 4,
      prompt: 'Ils (descendre) ___ par l\'escalier.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['sont descendus'],
      explanation: 'Mouvement intransitif : ils sont descendus par l\'escalier.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q05',
      exercise_set_id: 'ch07-ex06',
      order_index: 5,
      prompt: 'Elles (revenir) ___ de vacances mardi.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['sont revenues'],
      explanation: 'Elles sont revenues de vacances.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q06',
      exercise_set_id: 'ch07-ex06',
      order_index: 6,
      prompt: 'Quel jour (il; partir) ___ ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est-il parti'],
      explanation: 'Partir prend l\'auxiliaire être. L\'inversion donne « est-il parti ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q07',
      exercise_set_id: 'ch07-ex06',
      order_index: 7,
      prompt: 'Elle (aller) ___ à l\'opéra hier soir.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est allée', 'est allee'],
      explanation: 'Elle est allée à l\'opéra.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q08',
      exercise_set_id: 'ch07-ex06',
      order_index: 8,
      prompt: 'Luc (aller) ___ au Mexique l\'hiver dernier.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est allé', 'est alle'],
      explanation: 'Luc est allé au Mexique.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q09',
      exercise_set_id: 'ch07-ex06',
      order_index: 9,
      prompt: 'Molière (mourir) ___ en 1673.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est mort'],
      explanation: 'Molière est mort en 1673.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex06-q010',
      exercise_set_id: 'ch07-ex06',
      order_index: 10,
      prompt: 'Le metteur en scène (rester) ___ dans les coulisses.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['est resté', 'est reste'],
      explanation: 'Le metteur en scène est resté dans les coulisses.',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex07': [
    {
      id: 'ch07-ex07-q01',
      exercise_set_id: 'ch07-ex07',
      order_index: 1,
      prompt: 'Traduire : "She read the newspaper."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle a lu le journal.',
        'Elle a lu le journal'
      ],
      explanation: '« She read » = « Elle a lu ». « The newspaper » = « le journal ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q02',
      exercise_set_id: 'ch07-ex07',
      order_index: 2,
      prompt: 'Traduire : "We went to Paris."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous sommes allés à Paris.',
        'Nous sommes allées à Paris.',
        'Nous sommes allé(e)s à Paris.',
        'Nous sommes allés à Paris',
        'Nous sommes allées à Paris',
        'Nous sommes alles a Paris.',
        'On est allés à Paris.',
        'On est allé à Paris.'
      ],
      explanation: '« We went » = « Nous sommes allés à Paris » (ou « allées » si groupe féminin).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q03',
      exercise_set_id: 'ch07-ex07',
      order_index: 3,
      prompt: 'Traduire : "They left last night."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils sont partis hier soir.',
        'Elles sont parties hier soir.',
        'Ils sont partis hier soir',
        'Elles sont parties hier soir'
      ],
      explanation: '« They left » = « Ils sont partis » ou « Elles sont parties ». « Last night » = « hier soir ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q04',
      exercise_set_id: 'ch07-ex07',
      order_index: 4,
      prompt: 'Traduire : "He had to leave at five o\'clock."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il a dû partir à cinq heures.',
        'Il a dû partir à cinq heures',
        'Il a du partir a cinq heures.',
        'Il a du partir a cinq heures'
      ],
      explanation: '« He had to leave » = « Il a dû partir ». « At five o\'clock » = « à cinq heures ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q05',
      exercise_set_id: 'ch07-ex07',
      order_index: 5,
      prompt: 'Traduire : "They lived in Italy."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont habité en Italie.',
        'Elles ont habité en Italie.',
        'Ils ont habité en Italie',
        'Elles ont habité en Italie',
        'Ils ont vécu en Italie.',
        'Elles ont vécu en Italie.',
        'Ils ont habite en Italie.',
        'Elles ont habite en Italie.'
      ],
      explanation: '« They lived » = « Ils ont habité en Italie » (ou « Ils ont vécu en Italie »).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q06',
      exercise_set_id: 'ch07-ex07',
      order_index: 6,
      prompt: 'Traduire : "Zola died in 1902."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Zola est mort en 1902.',
        'Zola est mort en 1902'
      ],
      explanation: '« Zola died » = « Zola est mort en 1902 ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q07',
      exercise_set_id: 'ch07-ex07',
      order_index: 7,
      prompt: 'Traduire : "I wrote a long letter."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'J\'ai écrit une longue lettre.',
        'J’ai écrit une longue lettre.',
        'J\'ai écrit une longue lettre',
        'J’ai écrit une longue lettre',
        'J\'ai ecrit une longue lettre.',
        'J’ai ecrit une longue lettre.'
      ],
      explanation: '« I wrote » = « J\'ai écrit une longue lettre ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q08',
      exercise_set_id: 'ch07-ex07',
      order_index: 8,
      prompt: 'Traduire : "She has painted the wall white."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle a peint le mur en blanc.',
        'Elle a peint le mur en blanc'
      ],
      explanation: '« She has painted the wall white » = « Elle a peint le mur en blanc ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q09',
      exercise_set_id: 'ch07-ex07',
      order_index: 9,
      prompt: 'Traduire : "She stayed at home."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle est restée à la maison.',
        'Elle est restée à la maison',
        'Elle est restee a la maison.',
        'Elle est restée chez elle.',
        'Elle est restee chez elle.'
      ],
      explanation: '« She stayed at home » = « Elle est restée à la maison ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex07-q010',
      exercise_set_id: 'ch07-ex07',
      order_index: 10,
      prompt: 'Traduire : "He took a week\'s vacation."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il a pris une semaine de vacances.',
        'Il a pris une semaine de vacances'
      ],
      explanation: '« He took a week\'s vacation » = « Il a pris une semaine de vacances ».',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex08': [
    {
      id: 'ch07-ex08-q01',
      exercise_set_id: 'ch07-ex08',
      order_index: 1,
      prompt: 'Ils (se promener) ___ le long de la rivière.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont promenés', 'se sont promenes'],
      explanation: 'Se promener : le pronom réfléchi « se » est C.O.D. antéposé, le participe s\'accorde avec « ils » ➔ « se sont promenés ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q02',
      exercise_set_id: 'ch07-ex08',
      order_index: 2,
      prompt: 'Il (se douter) ___ de quelque chose.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['s\'est douté', 's’est douté', 's\'est doute', 's’est doute'],
      explanation: 'Se douter de = suspeitar. Il s\'est douté de quelque chose.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q03',
      exercise_set_id: 'ch07-ex08',
      order_index: 3,
      prompt: 'Elles (se maquiller) ___ pour aller au bal.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont maquillées', 'se sont maquillees'],
      explanation: 'Elles se sont maquillées (maquiller qui ? elles-mêmes ➔ accord).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q04',
      exercise_set_id: 'ch07-ex08',
      order_index: 4,
      prompt: 'Ils (s\'écrire) ___ régulièrement.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont écrit', 'se sont ecrit'],
      explanation: 'Règle essentielle de FLE : « s\'écrire » signifie « écrire l\'un à l\'autre ». Le pronom est un complément d\'objet indirect (C.O.I.). Le participe reste donc invariable : « écrit » sans -s !',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q05',
      exercise_set_id: 'ch07-ex08',
      order_index: 5,
      prompt: 'Nous (s\'arrêter) ___ au bord de la route.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'nous sommes arrêtés',
        'nous sommes arrêtées',
        'nous sommes arrêté(e)s',
        'nous sommes arretes',
        'nous sommes arretees'
      ],
      explanation: 'S\'arrêter : nous nous sommes arrêtés (ou arrêtées).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q06',
      exercise_set_id: 'ch07-ex08',
      order_index: 6,
      prompt: 'Ils (s\'occuper) ___ de tout.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont occupés', 'se sont occupes'],
      explanation: 'S\'occuper de : ils se sont occupés de tout.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q07',
      exercise_set_id: 'ch07-ex08',
      order_index: 7,
      prompt: 'Elles (se balader) ___ à la campagne.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont baladées', 'se sont baladees'],
      explanation: 'Se balader (promener) : elles se sont baladées.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q08',
      exercise_set_id: 'ch07-ex08',
      order_index: 8,
      prompt: 'Ils (se rencontrer) ___ à une conférence.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['se sont rencontrés', 'se sont rencontres'],
      explanation: 'Ils se sont rencontrés.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q09',
      exercise_set_id: 'ch07-ex08',
      order_index: 9,
      prompt: 'Tu (se couper) ___ le doigt.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['t\'es coupé', 't’es coupé', 't\'es coupe', 't’es coupe'],
      explanation: 'Règle des parties du corps : « Tu t\'es coupé le doigt ». Le C.O.D. est « le doigt », situé après le verbe. Le participe ne prend aucun accord particulier.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex08-q010',
      exercise_set_id: 'ch07-ex08',
      order_index: 10,
      prompt: 'Nous (se demander) ___ pourquoi il était absent.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['nous sommes demandé', 'nous sommes demande'],
      explanation: 'Se demander quelque chose : le C.O.D. est placé après (« pourquoi il était absent »). Le participe « demandé » reste invariable (pas de -s) !',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex09': [
    {
      id: 'ch07-ex09-q01',
      exercise_set_id: 'ch07-ex09',
      order_index: 1,
      prompt: 'Elle a sorti',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_9,
      accepted_answers: ['e', 'les chaises de jardin'],
      explanation: '« Elle a sorti les chaises de jardin » (auxiliaire avoir car « les chaises » est C.O.D. direct).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex09-q02',
      exercise_set_id: 'ch07-ex09',
      order_index: 2,
      prompt: 'Il a retourné',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_9,
      accepted_answers: ['a', 'le bifteck'],
      explanation: '« Il a retourné le bifteck » (auxiliaire avoir car « le bifteck » est C.O.D. direct).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex09-q03',
      exercise_set_id: 'ch07-ex09',
      order_index: 3,
      prompt: 'Elle est rentrée',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_9,
      accepted_answers: ['d', 'très tard'],
      explanation: '« Elle est rentrée très tard » (auxiliaire être car mouvement intransitif sans C.O.D.).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex09-q04',
      exercise_set_id: 'ch07-ex09',
      order_index: 4,
      prompt: 'Je suis passée',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_9,
      accepted_answers: ['b', 'devant le boulanger'],
      explanation: '« Je suis passée devant le boulanger » (auxiliaire être car déplacement du sujet).',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex09-q05',
      exercise_set_id: 'ch07-ex09',
      order_index: 5,
      prompt: 'Elle est retournée à Rome',
      instruction: null,
      tokens: null,
      options: MATCHING_OPTIONS_7_9,
      accepted_answers: ['c', 'pour la cinquième fois'],
      explanation: '« Elle est retournée à Rome pour la cinquième fois » (retour dans une ville = intransitif avec être).',
      created_at: new Date().toISOString()
    }
  ],

  'ch07-ex10': [
    {
      id: 'ch07-ex10-q01',
      exercise_set_id: 'ch07-ex10',
      order_index: 1,
      prompt: 'Traduire : "They spent a month in China."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils ont passé un mois en Chine.',
        'Elles ont passé un mois en Chine.',
        'Ils ont passé un mois en Chine',
        'Elles ont passé un mois en Chine',
        'Ils ont passe un mois en Chine.',
        'Elles ont passe un mois en Chine.'
      ],
      explanation: 'Quand passer exprime une durée (« passer un mois »), on utilise l\'auxiliaire AVOIR.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q02',
      exercise_set_id: 'ch07-ex10',
      order_index: 2,
      prompt: 'Traduire : "She fainted."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle s\'est évanouie.',
        'Elle s’est évanouie.',
        'Elle s\'est évanouie',
        'Elle s’est évanouie',
        'Elle s\'est evanouie.',
        'Elle s’est evanouie.'
      ],
      explanation: 'S\'évanouir prend être : « Elle s\'est évanouie ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q03',
      exercise_set_id: 'ch07-ex10',
      order_index: 3,
      prompt: 'Traduire : "They kissed each other."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils se sont embrassés.',
        'Elles se sont embrassées.',
        'Ils se sont embrassés',
        'Elles se sont embrassées',
        'Ils se sont embrasses.',
        'Elles se sont embrassees.'
      ],
      explanation: 'Embrasser quelqu\'un est transitif direct : « Ils se sont embrassés ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q04',
      exercise_set_id: 'ch07-ex10',
      order_index: 4,
      prompt: 'Traduire : "They had fun at the party."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils se sont amusés à la soirée.',
        'Elles se sont amusées à la soirée.',
        'Ils se sont amusés à la fête.',
        'Elles se sont amusées à la fête.',
        'Ils se sont amusés à la soirée',
        'Elles se sont amusées à la soirée',
        'Ils se sont amuses a la soiree.',
        'Elles se sont amusees a la soiree.'
      ],
      explanation: '« To have fun » = « s\'amuser ». Ils se sont amusés à la soirée.',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q05',
      exercise_set_id: 'ch07-ex10',
      order_index: 5,
      prompt: 'Traduire : "She took the suitcases down."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle a descendu les valises.',
        'Elle a descendu les valises'
      ],
      explanation: 'Descendre est transitif ici : « Elle a descendu les valises ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q06',
      exercise_set_id: 'ch07-ex10',
      order_index: 6,
      prompt: 'Traduire : "He brushed his teeth."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il s\'est brossé les dents.',
        'Il s’est brossé les dents.',
        'Il s\'est brossé les dents',
        'Il s’est brossé les dents',
        'Il s\'est brosse les dents.',
        'Il s’est brosse les dents.'
      ],
      explanation: 'En français : « Il s\'est brossé les dents ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q07',
      exercise_set_id: 'ch07-ex10',
      order_index: 7,
      prompt: 'Traduire : "He woke up tired."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il s\'est réveillé fatigué.',
        'Il s’est réveillé fatigué.',
        'Il s\'est réveillé fatigué',
        'Il s’est réveillé fatigué',
        'Il s\'est reveille fatigue.',
        'Il s’est reveille fatigue.'
      ],
      explanation: '« He woke up tired » = « Il s\'est réveillé fatigué ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q08',
      exercise_set_id: 'ch07-ex10',
      order_index: 8,
      prompt: 'Traduire : "They wrote each other regularly."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils se sont écrit régulièrement.',
        'Elles se sont écrit régulièrement.',
        'Ils se sont écrit régulièrement',
        'Elles se sont écrit régulièrement',
        'Ils se sont ecrit regulierement.',
        'Elles se sont ecrit regulierement.'
      ],
      explanation: 'S\'écrire = écrire l\'un à l\'autre (C.O.I.). Le participe passé reste invariable : « Ils se sont écrit régulièrement ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q09',
      exercise_set_id: 'ch07-ex10',
      order_index: 9,
      prompt: 'Traduire : "Anna stopped for ten minutes."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Anna s\'est arrêtée dix minutes.',
        'Anna s’est arrêtée dix minutes.',
        'Anna s\'est arrêtée dix minutes',
        'Anna s’est arrêtée dix minutes',
        'Anna s\'est arretee dix minutes.',
        'Anna s’est arretee dix minutes.'
      ],
      explanation: 'Anna est un sujet féminin singulier : « Anna s\'est arrêtée dix minutes ».',
      created_at: new Date().toISOString()
    },
    {
      id: 'ch07-ex10-q010',
      exercise_set_id: 'ch07-ex10',
      order_index: 10,
      prompt: 'Traduire : "He flipped the omelette."',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: [
        'Il a retourné l\'omelette.',
        'Il a retourné l’omelette.',
        'Il a retourné l\'omelette',
        'Il a retourné l’omelette',
        'Il a retourne l\'omelette.',
        'Il a retourne l’omelette.'
      ],
      explanation: 'Retourner l\'omelette : emploi transitif direct avec AVOIR. « Il a retourné l\'omelette ».',
      created_at: new Date().toISOString()
    }
  ]
};
