# Handoff: Chapitre 23 — Adjectifs et pronoms démonstratifs et possessifs

## 1. Vue d'ensemble pédagogique (FLE & Portugais Comparatif)
Le **Chapitre 23** (*Demonstrative adjectives and pronouns*) a été entièrement calibré pour les apprenants lusophones sous l'angle d'un enseignant de FLE expérimenté et didactique :
- **Adjectifs démonstratifs (*ce, cet, cette, ces*)** :
  - Règle phonétique d'euphonie : *ce* devient obligatoirement **cet** devant voyelle ou *h* muet (*cet homme*, *cet auteur*, *cet appartement* vs *ce livre*).
  - Homophonie orale : *cet* et *cette* se prononcent de façon identique [sɛt] ; *ces* et *ses* se prononcent [se] avec liaison [z] devant voyelle.
  - Suffixes de distinction : *-ci* (proximité) et *-là* (éloignement).
  - Vocabulaire thématique de la famille (*famille recomposée, benjamin, aîné, beau-frère, petite-fille...*).
- **Adjectifs possessifs (*mon, ton, son...*)** :
  - **Règle capitale contrastive** : En français, l'adjectif s'accorde avec **l'objet possédé**, jamais avec le possesseur (*son roman* = o romance dele OU dela).
  - Règle euphonique d'évitement du hiatus : **mon amie**, **ton amitié**, **son honnêteté** (jamais *\*ma amie*).
  - Distinction *leur* (singulier) vs *leurs* (pluriel).
- **Expression de la possession avec *être à*** :
  - *Cette valise est à moi*, *Ce blouson est à lui*, *Ces vélos sont à eux*.
- **Pronoms possessifs (*le mien, la sienne, les nôtres...*)** :
  - Accent circonflexe sur *le nôtre / le vôtre* (différent des adjectifs *notre / votre*).
  - Contractions obligatoires avec *à* et *de* (*au mien, du sien, des leurs*).
  - Usages avec *aussi* et *non plus*.
- **Pronoms démonstratifs simples (*celui, celle, ceux, celles*) vs composés (*celui-ci, celle-là*)** :
  - Les formes simples ne s'emploient jamais seules : toujours suivies de *qui, que, de*.
  - Les formes composées permettent de faire un choix, d'isoler ou d'opposer.
  - Mise en garde sur le registre condescendant de *celui-là !* pour une personne absente.
- **Pronom neutre *ce (c')*, ceci, cela, ça et expressions idiomatiques** :
  - L'attribut après *c'est* est toujours masculin singulier (*Les erreurs qu'elle a faites ! C'est idiot !*).
  - Expressions idiomatiques : *À la tienne !*, *Parmi les siens*, *Faire des siennes* (aprontar), *Y mettre du sien* (colaborar/fazer a sua parte).

---

## 2. Gamification et Répartition des 9 Séries (82 Questions)

| Série | Titre | Interaction | Qtd | Gamification & Adaptation Mobile |
|---|---|---|---|---|
| **23.1** | Adjectifs démonstratifs (*ce, cet, cette, ces*) | `fill_blank` | 10 | Chips d'options rapides (`ce`, `cet`, `cette`, `ces`, `Ce`, `Cette`), sans clavier requis. |
| **23.2** | Distinction de proximité avec *-ci* et *-là* | `fill_blank` | 10 | Tokens de mots faciles à toucher, accepte variantes avec barre oblique ou virgule. |
| **23.3** | Adjectifs possessifs en contexte | `fill_blank` | 10 | Chips d'options (`son`, `sa`, `notre`, `votre`, `leur`, `leurs`), focus sur l'accord avec l'objet. |
| **23.4** | Correspondance possessifs et substantifs | `matching` | 5 | Sélecteur visuel entre `mon`, `ma`, `mes` et leurs substantifs correspondants. |
| **23.5** | Traduction des pronoms possessifs | `fill_blank` | 10 | Choix ou saisie directe des pronoms avec accent circonflexe (*le vôtre, les nôtres*). |
| **23.6** | Comparaisons avec pronoms possessifs | `translation` | 10 | Banque de jetons tactiles ordonnables pour construire la phrase sans coquille. |
| **23.7** | Pronoms démonstratifs en dialogue | `translation` | 10 | Tokens et inversion interrogative pour les répliques naturelles de dialogue. |
| **23.8** | Remplacement par démonstratifs composés | `sentence_rewrite` | 10 | Remplacement fluide (*Cette robe est rose... ➔ Celle-ci est rose. Celle-là est blanche.*). |
| **23.9** | Expressions idiomatiques avec possessifs | `translation` | 7 | Traduction d'expressions courantes (*faire des siennes, y mettre du sien, à la tienne*). |

---

## 3. Fichiers Modifiés et Créés
- `src/data/chapter23Data.ts` : Nouveau fichier complet contenant la théorie FLE comparative, les 5 topics, les 9 séries d'exercices et les 82 questions richement documentées.
- `src/hooks/useTheory.ts` : Intégration du fallback `CH23_FALLBACK_THEORY`, mapping `getFallbackTheory` et `finalTheoryMarkdown`.
- `src/hooks/useExerciseSet.ts` : Intégration du routing `CHAPTER_23_QUESTIONS_MAP` et de `fallbackList`.
- `src/pages/ChapterPage.tsx` : Ajout de 6 cartes d'Astuces FLE immersives pour le chapitre 23.
- `src/pages/ChapterPage.test.tsx` : Mock et test d'intégration complet pour `/chapters/ch23` (théorie, 9 séries, astuces FLE).
- `src/hooks/useTheory.test.tsx` : Tests unitaires de la théorie, des 9 séries (82 questions) et des 5 sujets.
- `src/hooks/useExerciseSet.test.tsx` : Tests unitaires approfondis pour chacune des 9 séries du chapitre 23.

---

## 4. Statut des Vérifications Automatisées
- `npm run typecheck` : 0 erreur (TypeScript strict).
- `python scripts/verify_fast.py` : 7/7 vérifications réussies, 356 tests unitaires passés.
- `python scripts/verify_ci.py` : 9/9 vérifications de CI réussies, compilation Vite propre.
