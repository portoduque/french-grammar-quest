# Plan de Validation Manuelle : Chapitre 23

## Objectif
Valider la clarté pédagogique FLE, la gamification fluide et la réactivité mobile stricte (sans débordement horizontal ni superposition) pour le **Chapitre 23** (*Adjectifs et pronoms démonstratifs et possessifs*).

---

## 1. Validation Pédagogique FLE (Vision Professeur FLE & Lusophone)
- [ ] **Accès au Chapitre 23** : Naviguer vers `/chapters/ch23`.
- [ ] **Onglet Théorie** :
  - Vérifier la présence des explications euphoniques (*cet auteur*, *mon amie*, *son honnêteté*).
  - Vérifier la clarté de la règle contrastive : l'adjectif possessif s'accorde avec le nom possédé (*son roman* = romance dele ou dela).
  - Vérifier le tableau des pronoms possessifs avec accents circonflexes (*le nôtre*, *le vôtre*) et contractions (*au mien*, *du sien*).
  - Vérifier les explications sur les pronoms démonstratifs simples (*celui qui/que/de*) et composés (*celui-ci, celle-là*).
  - Vérifier la section des expressions idiomatiques (*faire des siennes*, *y mettre du sien*, *à la tienne !*).
- [ ] **Onglet Astuces FLE** :
  - Vérifier l'affichage des 6 cartes d'astuces pédagogiques :
    1. L'Euphonie de « Cet »
    2. Adjectifs Possessifs : L'Accord avec l'Objet Possédé
    3. La Règle d'Or d'Euphonie (« Mon amie »)
    4. Pronoms Possessifs : Circonflexe et Contractions
    5. Pronoms Démonstratifs : Simples vs Composés
    6. Le Neutre « C'est » et les Expressions Idiomatiques

---

## 2. Validation Gamification & Moteurs de Jeu (9 Séries, 82 Questions)
- [ ] **Série 23.1 (`ch23-ex01` - 10 Q - `fill_blank`)** :
  - Sélectionner les chips d'adjectifs démonstratifs (`ce`, `cet`, `cette`, `ces`).
  - Vérifier la question 9 (*Cette famille... ce quartier*).
- [ ] **Série 23.2 (`ch23-ex02` - 10 Q - `fill_blank`)** :
  - Vérifier la distinction *-ci* et *-là*.
  - Vérifier la facilité de saisie ou sélection des tokens.
- [ ] **Série 23.3 (`ch23-ex03` - 10 Q - `fill_blank`)** :
  - Compléter les adjectifs possessifs (`sa nouvelle pièce`, `son nouveau conte de fée`, etc.).
- [ ] **Série 23.4 (`ch23-ex04` - 5 Q - `matching`)** :
  - Associer chaque substantif (`frère`, `amies`, `oncle`, `maison`, `belle-sœur`) à `mon`, `ma` ou `mes`.
- [ ] **Série 23.5 (`ch23-ex05` - 10 Q - `fill_blank`)** :
  - Compléter les pronoms possessifs (*Les siens*, *Les miens*, *le mien*, *le vôtre*, *les nôtres*).
- [ ] **Série 23.6 (`ch23-ex06` - 10 Q - `translation`)** :
  - Traduire les phrases comparatives (*Ma famille est plus grande que la vôtre*, etc.).
- [ ] **Série 23.7 (`ch23-ex07` - 10 Q - `translation`)** :
  - Traduire les répliques avec pronoms démonstratifs (*Celle que j'ai achetée à Paris*, *C'est affreux !*, *C'est beau !*).
- [ ] **Série 23.8 (`ch23-ex08` - 10 Q - `sentence_rewrite`)** :
  - Remplacer les adjectifs démonstratifs par les formes composées (*Celle-ci est rose. Celle-là est blanche.*).
- [ ] **Série 23.9 (`ch23-ex09` - 7 Q - `translation`)** :
  - Traduire les expressions idiomatiques (*chez les siens*, *parmi les siens*, *faire des siennes*, *à la tienne !*, *y mettre du sien*).

---

## 3. Validation Mobile (Touch-First & Non-Breaking Layout)
- [ ] Ouvrir les devtools navigateur en vue mobile (375px et 414px de largeur).
- [ ] Vérifier qu'aucun débordement horizontal (*horizontal scroll*) n'apparaît.
- [ ] Vérifier que les boutons, options et jetons de réponse font au moins 44px de hauteur tactile.
- [ ] Vérifier l'intégration fluide de l'AccentToolbar pour la saisie des caractères accentués (`é`, `è`, `ê`, `à`, `ô`, `ç`).
- [ ] Vérifier que le panneau de score et de progression ne recouvre aucun élément interactif.
