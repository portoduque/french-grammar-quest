import { Topic, ExerciseSet, Question } from '@/types/database';
import { MatchingOption } from '@/components/exercises/interactions';

export const CHAPTER_04_THEORY_MARKDOWN = `# Chapitre 04 — Aller, Venir, Faire et les Périphrases Temporelles

> [!TIP]
> ### 👨‍🏫 Dica do Professor de Francês (FLE) : Regras de Ouro do Capítulo 4
> 1. **A Família do « Aller » e a Contração Preposicional Obrigatória (à + le = au, à + les = aux)** :
>    - Em francês, para indicar destino ou localização com verbos de movimento como *aller*, utiliza-se obrigatoriamente a preposição **à**, que se funde com os artigos definidos masculinos e plurais:
>      - *à + le* ➔ **au** (*Je vais au cinéma, au théâtre, au supermarché, au Brésil*).
>      - *à + la* ➔ **à la** (*Elle va à la plage, à la bibliothèque, à la gare*).
>      - *à + l'* ➔ **à l'** diante de palavra iniciada por vogal ou *h* mudo (*Il va à l'école, à l'opéra, à l'hôpital*).
>      - *à + les* ➔ **aux** (*Chloé veut aller aux États-Unis, aux toilettes, aux Galeries*).
>    - **Atenção lusófonos** : Em português é comum dizer *"Vou no cinema"* (em + o). Em francês, **NUNCA** use a preposição *en* para substantivos masculinos comuns (*Je vais en cinéma* é um erro grave!).
> 2. **O « Futur Proche » (Futur Immédiat) : A Périphrase Temporal mais Viva do Francês** :
>    - Fórmula : **ALLER (au présent) + Verbo Principal no Infinitivo**.
>    - Exemplos : *Je vais acheter une voiture en mai* ; *Nous allons faire un voyage en avril*.
>    - No cotidiano francês, o *futur proche* é infinitamente mais usado que o *futur simple* para expressar ações imediatas, planos já decididos ou previsões quase certas.
>    - **Negação** : Os elementos negativos *ne... pas* abraçam **exclusivamente o verbo auxiliar aller** : *Elle **ne va pas** déménager* ; *Je **ne vais pas** partir*.
> 3. **O « Passé Récent » (Passé Immédiat) : VENIR + DE/D' + Infinitivo** :
>    - Exprime uma ação que acabou de acontecer ("acabei de fazer...", "ele acabou de sair...").
>    - Embora o verbo *venir* esteja conjugado no presente, o sentido temporal equivale ao passado recente.
>    - **Alerta de Elisão Fonética** : Diante de verbos iniciados por vogal ou *h* mudo, a preposição **de** contrai-se obrigatoriamente em **d'** :
>      - *Il vient **d'**annuler son vol.* (Ele acabou de cancelar seu voo.)
>      - *Tu viens **d'**avoir trente ans.* (Você acabou de fazer trinta anos.)
>      - *Il vient **d'**achever ses études.* (Ele acabou de concluir seus estudos.)
> 4. **O Verbo VENIR e seus Derivados (*Revenir, Devenir, Prévenir, Survenir*)** :
>    - Apresenta radical duplo e fonética nasal sutil :
>      - Singular : *je viens, tu viens, il vient* ➔ Terminações nasais **[vjɛ̃]**.
>      - Plural com *ils/elles* : **ils/elles viennent** ➔ Pronuncia-se **[vjɛn]** (a vogal *e* abre-se como em "festa", e o *nn* é pronunciado, perdendo a nasalidade!).
>    - Seus derivados conjugam-se com a mesmíssima morfologia : *revenir* (voltar), *devenir* (tornar-se), *prévenir* (avisar/informar), *survenir* (ocorrer repentinamente).
> 5. **O Verbo TENIR e sua Riqueza Polissêmica** :
>    - Conjuga-se exatamente como *venir* (*je tiens, tu tiens, il tient, nous tenons, vous tenez, ils tiennent*).
>    - Possui nuances essenciais de vocabulário :
>      - *Tenir ses promesses* : cumprir promessas (*respecter ses engagements*).
>      - *Tenir compte de* : levar em consideração / não ignorar.
>      - *Tenir un restaurant / un magasin* : gerenciar / administrar um negócio.
>      - *Tenir dans une valise* : caber no espaço da mala.
>      - *Tenir à quelque chose / quelqu'un* : ter grande apego afetivo (*être attaché à*).
>      - *Tenir à + infinitif* : fazer muita questão de / insistir em (*vouloir absolument*).
>      - *Tenir de quelqu'un* : puxar a / parecer-se com um parente (*ressembler à un parent*).
> 6. **O Verbo FAIRE : Pronúncia [fəzɔ̃], Formas Especiais e Clima** :
>    - Conjugação : *je fais, tu fais, il fait, nous faisons, vous faites, ils font*.
>    - **ARMADILHA 1** : A 2ª pessoa do plural é **vous faites** (e NUNCA *vous faisez*!).
>    - **ARMADILHA 2** : A 3ª pessoa do plural é **ils/elles font** (e NUNCA *ils faillent* ou *ils faisent*!).
>    - **ARMADILHA 3 (FONÉTICA)** : *Nous faisons* escreve-se com *ai*, mas pronuncia-se historicamente com a vogal média [ə] : **[nu fəzɔ̃]**!
>    - **Météo** : Usa-se o pronome impessoal *il* com *faire* (*Il fait beau, il fait chaud, il fait froid, il fait frais, il fait doux*), mas fenômenos específicos dispensam *faire* : *Il pleut* (chove), *il neige* (neva), *il grêle* (cai granizo), *il bruine* (garoa).
> 7. **A Forma Causativa (« Faire Causatif ») : Faire + Infinitivo** :
>    - Indica que o sujeito não realiza a ação ele mesmo, mas manda alguém fazer ou faz com que algo aconteça :
>      - *Elle écrit la lettre.* (Ela mesma escreve.) ➔ *Elle **fait écrire** la lettre par sa secrétaire.* (Ela manda a secretária escrever.)
>      - *Il répare la télévision.* ➔ *Il **fait réparer** la télévision.* (Ele manda consertar a TV.)
>      - *Elle fait la robe.* (Ela costura o vestido.) ➔ *Elle **fait faire** la robe.* (Ela manda fazer o vestido por uma costureira.)

---

## 1. Le Verbe Aller (Ir) & les Prépositions de Lieu

O verbo **aller** é um verbo irregular do 3º grupo terminado em *-er*. É indispensável para indicar deslocamentos, cumprimentos sociais e construir o futuro próximo.

### 📋 Conjugação Completa no Presente do Indicativo

| Pronome Sujeito | Conjugação | Fonética (IPA) | Tradução em Português |
| :--- | :--- | :--- | :--- |
| **je** | **je vais** | [ʒə vɛ] | eu vou |
| **tu** | **tu vas** | [ty va] | você vai *(informal)* |
| **il / elle / on** | **il / elle / on va** | [il va / ɛl va / ɔ̃-n-va] | ele / ela / a gente vai |
| **nous** | **nous allons** | [nu-z-alɔ̃] | nós vamos *(liaison obrigatória em [z])* |
| **vous** | **vous allez** | [vu-z-ale] | vocês vão / o senhor vai *(liaison em [z])* |
| **ils / elles** | **ils / elles vont** | [il vɔ̃ / ɛl vɔ̃] | eles / elas vão |

### 🗺️ Regra das Contrações Preposicionais com Destinos (*à*)

Para dizer para onde você vai, a preposição **à** combina-se com os artigos definidos :

| Regência + Artigo | Resultado Contraído | Exemplo em Francês | Tradução em Português |
| :--- | :--- | :--- | :--- |
| **à + le** *(masculino singular)* | **au** | *Je vais **au** théâtre ce soir.* | Eu vou ao teatro esta noite. |
| **à + la** *(feminino singular)* | **à la** | *Léa va **à la** bibliothèque.* | Léa vai à biblioteca. |
| **à + l'** *(vogal ou h mudo)* | **à l'** | *Elle va souvent **à l'**opéra.* | Ela vai frequentemente à ópera. |
| **à + les** *(plural masculino/feminino)* | **aux** | *Chloé veut aller **aux** États-Unis.* | Chloé quer ir aos Estados Unidos. |

### 💬 Expressões Idiomáticas Frequentes com Aller

- *Ça va ?* (Tudo bem? / Como vão as coisas?) ➔ Resposta : *Ça va bien, merci !*
- *Comment allez-vous ?* (Como o senhor vai? / Como vocês estão? — formal)
- *Comment vas-tu ?* (Como você vai? — informal)
- *Ce tailleur vous va bien.* (Este terno/conjunto cai muito bem em você.)
- *Ce chapeau te va bien.* (Este chapéu fica ótimo em você.)
- *Comment va la famille ?* (Como vai a família?)

---

## 2. Vocabulaire Fondamental : Jours de la Semaine, Mois et Saisons

Para falar sobre seus compromissos, viagens e estações do ano, este vocabulário temporal é de domínio obrigatório.

### 📅 Les 7 Jours de la Semaine (Os 7 Dias da Semana)

> [!NOTE]
> Em francês, os dias da semana **começam com letra minúscula** (ao contrário do inglês).
> Quando usamos o artigo definido singular **le** diante do dia (*Le lundi...*), expressamos um hábito repetido : *"Às segundas-feiras / Toda segunda-feira"*.

| Francês | Português | Exemplo de Aplicação |
| :--- | :--- | :--- |
| **lundi** | segunda-feira | *Le lundi, il va à son cours d'anglais.* (Às segundas, ele vai ao curso de inglês.) |
| **mardi** | terça-feira | *Mardi prochain, nous allons visiter le musée.* (Na próxima terça, visitaremos o museu.) |
| **mercredi** | quarta-feira | *Les enfants ne vont pas à l'école le mercredi.* (As crianças não vão à escola às quartas.) |
| **jeudi** | quinta-feira | *Je vais au cinéma jeudi soir.* (Vou ao cinema quinta à noite.) |
| **vendredi** | sexta-feira | *Vendredi est le dernier jour de la semaine.* (Sexta é o último dia da semana útil.) |
| **samedi** | sábado | *Il va à la bibliothèque le samedi.* (Ele vai à biblioteca aos sábados.) |
| **dimanche** | domingo | *Vas-tu au cinéma dimanche ?* (Você vai ao cinema no domingo?) |

### 🗓️ Les 12 Mois de l'Année (Os 12 Meses do Ano)

Usa-se a preposição **en** diante dos meses do ano (*en janvier, en mai, en décembre*) :

| Mês em Francês | Tradução | Exemplo com Preposição |
| :--- | :--- | :--- |
| **janvier** | janeiro | *Ils déménagent **en janvier**.* |
| **février** | fevereiro | *Il fait froid en février.* |
| **mars** | março | *Le printemps commence fin mars.* |
| **avril** | abril | *Nous allons faire un voyage **en avril**.* |
| **mai** | maio | *Je vais acheter une voiture **en mai**.* |
| **juin** | junho | *Les examens ont lieu en juin.* |
| **juillet** | julho | *En juillet, les plages sont bondées.* |
| **août** | agosto | *Les Français prennent des vacances en août.* |
| **septembre** | setembro | *La rentrée scolaire est en septembre.* |
| **octobre** | outubro | *Les feuilles tombent en octobre.* |
| **novembre** | novembro | *Il pleut souvent en novembre.* |
| **décembre** | dezembro | *Ils vont à Tahiti **en décembre**.* |

### 🍂 Les 4 Saisons (As 4 Estações do Ano)

> [!WARNING]
> **Atenção à Regência das Estações** :
> - Masculino iniciado por consoante : **au** printemps.
> - Estações iniciadas por vogal : **en** été, **en** automne, **en** hiver.

| Estação em Francês | Gênero | Tradução | Preposição Correta |
| :--- | :--- | :--- | :--- |
| **le printemps** | Masculino | a primavera | **au printemps** (*Les fleurs s'ouvrent au printemps*) |
| **l'été** | Masculino | o verão | **en été** (*Il fait très chaud en été*) |
| **l'automne** | Masculino | o outono | **en automne** (*Il prend des vacances cet automne*) |
| **l'hiver** | Masculino | o inverno | **en hiver** (*Il neige souvent en hiver*) |

---

## 3. Le Futur Proche (Futur Immédiat)

O **futur proche** (ou futur immédiat) expressa uma ação que vai acontecer num futuro próximo ou uma intenção firme de realização.

### ⚙️ Estrutura Gramatical

$$\mathbf{Sujeto} + \mathbf{ALLER\ (ao\ presente)} + \mathbf{Verbo\ Principal\ (no\ Infinitivo)}$$

#### Exemplos Fundamentais :
- *Je **vais acheter** une nouvelle voiture en mai.* (Eu vou comprar um carro novo em maio.)
- *Nous **allons faire** un voyage en avril.* (Nós vamos fazer uma viagem em abril.)
- *Elle **va apprendre** le chinois.* (Ela vai aprender chinês.)
- *Ils **vont bientôt déménager**.* (Eles vão se mudar em breve.)
- *Cette agence **va promouvoir** cette marchandise.* (Esta agência vai promover esta mercadoria.)

### 🗣️ O Futur Proche na Conversação Cotidiana

Na língua falada do dia a dia, o *futur proche* frequentemente substitui tanto o presente quanto o *futur simple* :

1. **Substituindo o Presente Coloquial** :
   - *Vous déjeunez avec nous ?* ➔ *Vous **allez déjeuner** avec nous ?*
   - *Est-ce que tu acceptes leur offre ?* ➔ *Est-ce que tu **vas accepter** leur offre ?*
2. **Substituindo o Futur Simple Formal** :
   - *Vous partirez la semaine prochaine ?* ➔ *Vous **allez partir** la semaine prochaine ?*
   - *Vous prendrez des vacances ?* ➔ *Vous **allez prendre** des vacances ?*

### 🛑 Negação no Futur Proche

A negação *ne... pas* envolve estritamente o verbo auxiliar *aller* :
- *Elle **ne va pas** à l'école demain.*
- *Nous **n'allons pas** accepter ces conditions.*

---

## 4. Le Verbe Venir (Vir) et ses Dérivés

O verbo **venir** é um dos verbos irregulares mais importantes do francês.

### 📋 Conjugação Completa no Presente do Indicativo

| Pronome Sujeito | Conjugação | Fonética (IPA) | Tradução em Português |
| :--- | :--- | :--- | :--- |
| **je** | **je viens** | [ʒə vjɛ̃] | eu venho |
| **tu** | **tu viens** | [ty vjɛ̃] | você vem |
| **il / elle / on** | **il / elle / on vient** | [il vjɛ̃ / ɛl vjɛ̃] | ele / ela / a gente vem |
| **nous** | **nous venons** | [nu vənɔ̃] | nós递归 vimos / nós viemos |
| **vous** | **vous venez** | [vu vəne] | vocês vêm / o senhor vem |
| **ils / elles** | **ils / elles viennent** | [il vjɛn / ɛl vjɛn] | eles / elas vêm *(som aberto e consonantal)* |

### 🌿 A Família dos Derivados de Venir

Todos estes verbos compartilham as mesmas terminações e alternâncias de radical :
- **devenir** (tornar-se, vir a ser) : *Il **devient** fou avec tout ce travail.*
- **revenir** (voltar, retornar) : *Vous **revenez** des Maldives ?* / *Vous **revenez** cet après-midi ?*
- **prévenir** (avisar, informar, prevenir) : *Elle nous **prévient** toujours à la dernière minute.* / *N'oubliez pas de nous **prévenir**.*
- **survenir** (ocorrer de improviso, sobrevir) : *Un problème peut **survenir**.*

---

## 5. Le Passé Récent (Passé Immédiat)

O **passé récent** (passé immédiat) expressa uma ação que acabou de ser concluída há poucos instantes.

### ⚙️ Estrutura Gramatical

$$\mathbf{Sujeto} + \mathbf{VENIR\ (ao\ presente)} + \mathbf{DE\ /\ D'\ } + \mathbf{Verbo\ Principal\ (no\ Infinitivo)}$$

> [!IMPORTANT]
> Embora a locução utilize o verbo *venir* no presente do indicativo, em português ela se traduz pelo verbo auxiliar "acabar de" no passado :
> - *Il **vient de partir**.* ➔ Ele **acabou de sair**.
> - *Elle **vient de vendre** sa voiture.* ➔ Ela **acabou de vender** seu carro.

### ✂️ A Elisão Obrigatória : « De » vira « D' »

Quando o verbo no infinitivo começa por vogal ou *h* mudo, o *de* elide-se obrigatoriamente :
- *Il vient **d'annuler** son vol.* (E não *de annuler*!)
- *Tu viens **d'avoir** trente ans.* (E não *de avoir*!)
- *Il vient **d'achever** ses études.* (E não *de achever*!)
- *Elle vient **d'appeler** François.* (E não *de appeler*!)

#### Outros Exemplos de Aplicação :
- *Je **viens de téléphoner** à Bernard.* (Acabei de telefonar para o Bernard.)
- *Elle **vient de remplacer** tous ses meubles.* (Ela acabou de trocar todos os seus móveis.)
- *La police **vient de révéler** le secret.* (A polícia acabou de revelar o segredo.)
- *Vous **venez de commencer** à travailler.* (Vocês acabaram de começar a trabalhar.)
- *Ils **viennent de voir** un bon film.* (Eles acabaram de ver um bom filme.)

---

## 6. Le Verbe Tenir (Segurar / Manter / Cumprir / Puxar)

O verbo **tenir** conjuga-se com exata simetria ao verbo *venir*. É um dos verbos mais ricos e versáteis do vocabulário francês.

### 📋 Conjugação Completa no Presente do Indicativo

| Pronome Sujeito | Conjugação | Fonética (IPA) | Tradução em Português |
| :--- | :--- | :--- | :--- |
| **je** | **je tiens** | [ʒə tjɛ̃] | eu seguro / mantenho |
| **tu** | **tu tiens** | [ty tjɛ̃] | você segura |
| **il / elle / on** | **il / elle / on tient** | [il tjɛ̃ / ɛl tjɛ̃] | ele / ela segura |
| **nous** | **nous tenons** | [nu tənɔ̃] | nós seguramos |
| **vous** | **vous tenez** | [vu təne] | vocês seguram |
| **ils / elles** | **ils / elles tiennent** | [il tjɛn / ɛl tjɛn] | eles / elas seguram |

### 🎭 As Múltiplas Faces Semânticas de Tenir

1. **Segurar fisicamente com as mãos** :
   - *Il **tient** ses gants à la main.* (Ele segura as luvas na mão.)
   - *Il **tient** son fils par la main.* (Ele segura o filho pela mão.)
   - *Elle **tient** un vase.* (Ela está segurando um vaso.)
   - *Tiens la porte !* (Segure a porta!)
2. **Cumprir promessas e compromissos** :
   - *Le directeur ne **tient** jamais ses promesses.* (O diretor nunca cumpre suas promessas / *ne respecte pas ses engagements*.)
3. **Manter em um estado contínuo** :
   - *La caféine la **tient** éveillée.* (A cafeína a mantém acordada.)
   - *Ils **tiennent** le rythme.* (Eles mantêm o ritmo / continuam no mesmo ritmo.)
4. **Administrar / Gerenciar um estabelecimento** :
   - *Ils **tiennent** un restaurant à Nice.* (Eles gerenciam/tocam um restaurante em Nice.)
5. **Caber / Ter espaço** :
   - *Toutes ces affaires ne vont pas **tenir** dans ta valise.* (Todas essas coisas não vão caber na sua mala.)
6. **Levar em consideração** :
   - *Elle **tient compte de** vos commentaires.* (Ela leva em conta os seus comentários / *ne les ignore pas*.)
   - *Il ne **tient compte de** rien.* (Ele não leva nada em consideração / *il ignore tout*.)
7. **Interjeições de surpresa ou oferta** :
   - *Tiens, tiens, c'est étrange...* (Ora, ora, isso é muito estranho...)
   - *Tiens, prends ces trois livres.* (Toma, pega aqui estes três livros.)

### 🧭 Regências Especiais : « Tenir à » vs « Tenir de »

- **Tenir à + Objeto / Pessoa** : Ter forte apego sentimental (*être attaché à*) :
  - *Elle **tient à** ses bijoux.* (Ela tem muito apego às suas joias.)
  - *Ils **tiennent à** leurs amis.* (Eles prezam muito os seus amigos / são muito apegados.)
  - *Il **tient à** sa voiture.* (Ele é apegado ao seu carro.)
- **Tenir à + Verbo no Infinitivo** : Fazer muita questão de / querer encarecidamente (*vouloir absolument / insister pour*) :
  - *Marc **tient à** vous voir.* (Marc faz muita questão de vê-lo.)
  - *Il **tient à** te parler.* (Ele insiste em falar com você / quer muito conversar contigo.)
  - *Il **tient à** chanter cette chanson.* (Ele faz questão absoluta de cantar esta música.)
- **Tenir de + Parente** : Puxar a / parecer-se física ou psicologicamente com um ancestral (*ressembler à un parent*) :
  - *De qui **tient-elle** ?* (A quem ela puxou?)
  - *Elle **tient de** sa mère.* (Ela puxou à mãe / parece-se com a mãe.)
  - *Il **tient de** sa sœur.* (Ele parece-se com sua irmã / parente.)
  - *Il **tient de** son père.* (Ele puxou ao pai.)

---

## 7. Le Verbe Faire (Fazer) & la Météo

O verbo **faire** é um dos mais dinâmicos e frequentes da língua francesa, atuando em dezenas de expressões de tarefas, lazer e meteorologia.

### 📋 Conjugação Completa no Presente do Indicativo

| Pronome Sujeito | Conjugação | Fonética (IPA) | Tradução em Português |
| :--- | :--- | :--- | :--- |
| **je** | **je fais** | [ʒə fɛ] | eu faço |
| **tu** | **tu fais** | [ty fɛ] | você faz |
| **il / elle / on** | **il / elle / on fait** | [il fɛ / ɛl fɛ] | ele / ela / a gente faz |
| **nous** | **nous faisons** | [nu fəzɔ̃] | nós fazemos *(pronúncia especial [fəzɔ̃]!)* |
| **vous** | **vous faites** | [vu fɛt] | vocês fazem / o senhor faz *(e NUNCA *faisez*!)* |
| **ils / elles** | **ils / elles font** | [il fɔ̃ / ɛl fɔ̃] | eles / elas fazem *(e NUNCA *faisent*!)* |

### 🧹 Atividades Cotidianas e Esportes com Faire

- *faire les courses* : fazer compras (de mercado/alimentos).
- *faire la cuisine* : cozinhar (*Est-ce que vous savez faire la cuisine ?*).
- *faire le ménage* : fazer a faxina da casa (*Il fait le ménage le samedi*).
- *faire la vaisselle* : lavar a louça (*L'enfant fait la vaisselle*).
- *faire la queue* : ficar / entrar na fila (*Je fais la queue depuis dix minutes*).
- *faire une promenade* : fazer um passeio / passear (*Nous faisons une promenade*).
- *faire du vélo* / *faire du sport* : andar de bicicleta / praticar esportes.
- *Ça fait combien ?* : Quanto custa? / Qual o total da conta?
- *faire des grimaces* : fazer caretas diante do espelho.

### ☀️ A Meteorologia : Expressões Impessoais com « Il fait »

Para descrever o tempo atmosférico geral, usa-se a construção impessoal **Il fait + adjetivo** :
- *Quel temps fait-il ?* (Como está o tempo? / Que tempo está fazendo?)
- *Il fait beau.* (O tempo está bom / bonito.)
- *Il fait mauvais.* (O tempo está ruim / feio.)
- *Il fait chaud.* (Está quente / calor.)
- *Il fait froid.* (Está frio.)
- *Il fait frais.* (Está fresco.)
- *Il fait doux.* (O clima está ameno / suave.)

> [!NOTE]
> **Verbos Meteorológicos Sem o Verbo Faire** :
> Fenômenos naturais específicos possuem verbos próprios conjugados unicamente na 3ª pessoa do singular com o pronome neutro *il* :
> - **Il pleut.** (Está chovendo. — verbo *pleuvoir*)
> - **Il neige.** (Está nevando. — verbo *neiger*)
> - **Il grêle.** (Está caindo granizo. — verbo *grêler*)
> - **Il bruine.** (Está garoando. — verbo *bruiner*)

---

## 8. La Forme Causative (Faire Causatif)

A **forma causativa** (*faire causatif*) é usada quando o sujeito não executa pessoalmente a ação com as próprias mãos, mas sim **faz com que outra pessoa a execute**, manda fazer ou delega a tarefa.

### ⚙️ Estrutura Gramatical

$$\mathbf{Sujeto} + \mathbf{FAIRE\ (ao\ presente)} + \mathbf{Verbo\ Principal\ (no\ Infinitivo)}$$

### ⚖️ Comparação Didática : Ação Direta vs Forma Causativa

| Ação Executada Pelo Próprio Sujeito | Forma Causativa (Mandar Fazer / Terceirizar) |
| :--- | :--- |
| *Elle écrit la lettre elle-même.* (Ela mesma escreve a carta.) | *Elle **fait écrire** la lettre par sa secrétaire.* (Ela manda a secretária escrever.) |
| *Ils envoient le document.* (Eles mesmos despacham o documento.) | *Ils **font envoyer** le document.* (Eles mandam enviar o documento.) |
| *Elle fait la robe.* (Ela mesma confecciona o vestido.) | *Elle **fait faire** la robe.* (Ela manda fazer o vestido por um alfaiate.) |
| *Je lis le dossier.* (Eu mesmo leio o processo.) | *Je **fais lire** le dossier.* (Mando ler / providencio a leitura do processo.) |
| *Vous lavez la voiture.* (Vocês mesmos lavam o carro.) | *Vous **faites laver** la voiture.* (Vocês mandam lavar o carro no lava-jato.) |
| *Il répare la télévision.* (Ele mesmo conserta a TV.) | *Il **fait réparer** la télévision.* (Ele manda consertar a televisão.) |
| *Elle investit sa fortune.* | *Elle **fait investir** sa fortune.* (Ela faz com que seus corretores invistam.) |
| *Je corrige les copies des étudiants.* | *Je **fais corriger** les copies des étudiants.* (Mando assistentes corrigirem as provas.) |
`;

export const CHAPTER_04_TOPICS: Topic[] = [
  {
    id: 'ch04-t01',
    chapter_id: 'ch04',
    order_index: 1,
    title: 'The verb aller (to go) & preposition à',
    rule_summary: "Conjugaison irrégulière au présent (je vais, tu vas, il va, nous allons, vous allez, ils vont) et contractions obligatoires de la préposition à (au, à la, à l', aux).",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t02',
    chapter_id: 'ch04',
    order_index: 2,
    title: 'Calendar vocabulary & the immediate future tense (futur proche)',
    rule_summary: "Vocabulaire thématique des jours, mois et saisons, et structure du futur proche : aller au présent suivi immédiatement d'un verbe à l'infinitif.",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t03',
    chapter_id: 'ch04',
    order_index: 3,
    title: 'The verb venir (to come) & its derivatives',
    rule_summary: "Morphologie au présent de venir, devenir, prévenir, survenir (je viens, tu viens, il vient, nous venons, vous venez, ils viennent) avec alternance de radical.",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t04',
    chapter_id: 'ch04',
    order_index: 4,
    title: 'The immediate past (passé récent)',
    rule_summary: "Périphrase temporelle pour les actions tout juste achevées : venir au présent + de/d' + verbe à l'infinitif avec élision obligatoire devant voyelle.",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t05',
    chapter_id: 'ch04',
    order_index: 5,
    title: 'Tenir : Meanings, idioms, and prepositions (tenir à vs tenir de)',
    rule_summary: "Conjugaison identique à venir, polysémie idiomatique (promesses, rythme, compte de), et régences essentielles : tenir à (attachement) et tenir de (ressemblance familiale).",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t06',
    chapter_id: 'ch04',
    order_index: 6,
    title: 'The verb faire (to do, to make), daily chores & weather',
    rule_summary: "Conjugaison de faire (attention à vous faites et ils font, prononciation nous faisons [fəzɔ̃]), tâches du quotidien et expressions météorologiques impersonnelles avec il fait.",
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-t07',
    chapter_id: 'ch04',
    order_index: 7,
    title: 'The causative form (faire + infinitif)',
    rule_summary: "Structure causative pour exprimer l'action déléguée ou faite par autrui : sujet + faire au présent + verbe à l'infinitif.",
    created_at: new Date().toISOString()
  }
];

export const CHAPTER_04_EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 'ch04-ex01',
    chapter_id: 'ch04',
    order_index: 1,
    title: 'Exercice 4.1',
    instruction: 'Mettre au présent les verbes entre parenthèses (verbe aller).',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex02',
    chapter_id: 'ch04',
    order_index: 2,
    title: 'Exercice 4.2',
    instruction: 'Mettre les phrases suivantes au futur immédiat (aller + infinitif).',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex03',
    chapter_id: 'ch04',
    order_index: 3,
    title: 'Exercice 4.3',
    instruction: 'Mettre au présent les verbes entre parenthèses (verbe venir et ses dérivés).',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex04',
    chapter_id: 'ch04',
    order_index: 4,
    title: 'Exercice 4.4',
    instruction: 'Mettre les phrases suivantes au passé immédiat (venir de + infinitif).',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex05',
    chapter_id: 'ch04',
    order_index: 5,
    title: 'Exercice 4.5',
    instruction: "Traduire les phrases suivantes en utilisant tu et l'inversion si nécessaire.",
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex06',
    chapter_id: 'ch04',
    order_index: 6,
    title: 'Exercice 4.6',
    instruction: 'Faire correspondre chaque phrase avec sa signification ou son équivalent.',
    interaction_type: 'matching',
    questions_count: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex07',
    chapter_id: 'ch04',
    order_index: 7,
    title: 'Exercice 4.7',
    instruction: 'Mettre au présent les verbes entre parenthèses (verbe faire).',
    interaction_type: 'fill_blank',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex08',
    chapter_id: 'ch04',
    order_index: 8,
    title: 'Exercice 4.8',
    instruction: 'Mettre les phrases suivantes à la forme causative (faire + infinitif).',
    interaction_type: 'sentence_rewrite',
    questions_count: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ch04-ex09',
    chapter_id: 'ch04',
    order_index: 9,
    title: 'Exercice 4.9',
    instruction: "Traduire les phrases suivantes en utilisant vous et la forme est-ce que si nécessaire.",
    interaction_type: 'translation',
    questions_count: 10,
    created_at: new Date().toISOString()
  }
];

export const CH04_EX06_MATCHING_OPTIONS: MatchingOption[] = [
  { label: 'a', text: 'Il ressemble à sa parente.' },
  { label: 'b', text: 'Il veut discuter avec toi.' },
  { label: 'c', text: 'Il est attaché à cette chose.' },
  { label: 'd', text: 'Il ignore tout.' },
  { label: 'e', text: 'Il ne respecte pas ses engagements.' }
];

export const CHAPTER_04_QUESTIONS_MAP: Record<string, Question[]> = {
  'ch04-ex01': [
    {
      id: 'ch04-ex01-q01',
      exercise_set_id: 'ch04-ex01',
      order_index: 1,
      prompt: 'Nous (aller) _________________ à la plage cet après-midi.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['allons'],
      explanation: "Verbe aller avec nous : « Nous allons à la plage cet après-midi. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q02',
      exercise_set_id: 'ch04-ex01',
      order_index: 2,
      prompt: 'Ils (aller) _________________ à Tahiti en décembre.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vont'],
      explanation: "Verbe aller à la 3e personne du pluriel (ils) : « Ils vont à Tahiti en décembre. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q03',
      exercise_set_id: 'ch04-ex01',
      order_index: 3,
      prompt: 'Je (aller) _________________ chez le dentiste demain matin.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vais'],
      explanation: "Verbe aller à la 1re personne du singulier : « Je vais chez le dentiste demain matin. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q04',
      exercise_set_id: 'ch04-ex01',
      order_index: 4,
      prompt: "Le lundi, il (aller) _________________ à son cours d'anglais.",
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['va'],
      explanation: "Verbe aller à la 3e personne du singulier : « Le lundi, il va à son cours d'anglais. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q05',
      exercise_set_id: 'ch04-ex01',
      order_index: 5,
      prompt: 'Vous (aller) _________________ en vacances à la fin de la semaine.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['allez'],
      explanation: "Verbe aller avec vous : « Vous allez en vacances à la fin de la semaine. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q06',
      exercise_set_id: 'ch04-ex01',
      order_index: 6,
      prompt: 'Ça (aller) _________________ ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['va'],
      explanation: "Expression familière incontournable : « Ça va ? » (le pronom démonstratif 'ça' prend la 3e personne du singulier).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q07',
      exercise_set_id: 'ch04-ex01',
      order_index: 7,
      prompt: 'Elle (aller) _________________ à la banque cet après-midi.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['va'],
      explanation: "Verbe aller avec elle : « Elle va à la banque cet après-midi. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q08',
      exercise_set_id: 'ch04-ex01',
      order_index: 8,
      prompt: 'Je (aller) _________________ en Afrique avec mes amis.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vais'],
      explanation: "1re personne du singulier : « Je vais en Afrique avec mes amis. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q09',
      exercise_set_id: 'ch04-ex01',
      order_index: 9,
      prompt: 'Il (aller) _________________ au match de base-ball ce soir.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['va'],
      explanation: "3e personne du singulier : « Il va au match de base-ball ce soir. » (à + le match = au match).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex01-q10',
      exercise_set_id: 'ch04-ex01',
      order_index: 10,
      prompt: 'Comment (aller) _________________-vous ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['allez'],
      explanation: "Formule de politesse inversée : « Comment allez-vous ? » (avec liaison sonore [z] : [kɔ.mɑ̃.ta.le.vu]).",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex02': [
    {
      id: 'ch04-ex02-q01',
      exercise_set_id: 'ch04-ex02',
      order_index: 1,
      prompt: 'Nous achetons une nouvelle machine à laver.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous allons acheter une nouvelle machine à laver.',
        'Nous allons acheter une nouvelle machine à laver'
      ],
      explanation: "Futur proche : auxiliaire aller (nous allons) + infinitif acheter ➔ « Nous allons acheter une nouvelle machine à laver. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q02',
      exercise_set_id: 'ch04-ex02',
      order_index: 2,
      prompt: 'Il prend des vacances cet automne.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il va prendre des vacances cet automne.',
        'Il va prendre des vacances cet automne'
      ],
      explanation: "Futur proche : il va + infinitif prendre ➔ « Il va prendre des vacances cet automne. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q03',
      exercise_set_id: 'ch04-ex02',
      order_index: 3,
      prompt: 'Vous investissez au Japon.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous allez investir au Japon.',
        'Vous allez investir au Japon'
      ],
      explanation: "Futur proche : vous allez + infinitif investir ➔ « Vous allez investir au Japon. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q04',
      exercise_set_id: 'ch04-ex02',
      order_index: 4,
      prompt: 'Elle a vingt ans.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle va avoir vingt ans.',
        'Elle va avoir vingt ans'
      ],
      explanation: "Futur proche avec avoir : « Elle va avoir vingt ans. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q05',
      exercise_set_id: 'ch04-ex02',
      order_index: 5,
      prompt: 'Cette agence promeut cette marchandise.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Cette agence va promouvoir cette marchandise.',
        'Cette agence va promouvoir cette marchandise'
      ],
      explanation: "L'infinitif du verbe est promouvoir : « Cette agence va promouvoir cette marchandise. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q06',
      exercise_set_id: 'ch04-ex02',
      order_index: 6,
      prompt: 'Il est président.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il va être président.',
        'Il va être président'
      ],
      explanation: "Futur proche avec le verbe être : « Il va être président. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q07',
      exercise_set_id: 'ch04-ex02',
      order_index: 7,
      prompt: 'Nous choisissons un cadeau.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous allons choisir un cadeau.',
        'Nous allons choisir un cadeau'
      ],
      explanation: "Infinitif du verbe du 2e groupe choisir : « Nous allons choisir un cadeau. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q08',
      exercise_set_id: 'ch04-ex02',
      order_index: 8,
      prompt: 'Tu dînes au restaurant.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Tu vas dîner au restaurant.',
        'Tu vas dîner au restaurant'
      ],
      explanation: "Futur proche : tu vas + dîner au restaurant ➔ « Tu vas dîner au restaurant. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q09',
      exercise_set_id: 'ch04-ex02',
      order_index: 9,
      prompt: 'Ils déménagent en janvier.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils vont déménager en janvier.',
        'Ils vont déménager en janvier',
        'Elles vont déménager en janvier.',
        'Elles vont déménager en janvier'
      ],
      explanation: "Futur proche : ils vont + infinitif déménager ➔ « Ils vont déménager en janvier. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex02-q10',
      exercise_set_id: 'ch04-ex02',
      order_index: 10,
      prompt: 'Elle travaille au centre-ville.',
      instruction: 'Mettre la phrase au futur immédiat (aller + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle va travailler au centre-ville.',
        'Elle va travailler au centre-ville'
      ],
      explanation: "Futur proche : elle va + travailler au centre-ville ➔ « Elle va travailler au centre-ville. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex03': [
    {
      id: 'ch04-ex03-q01',
      exercise_set_id: 'ch04-ex03',
      order_index: 1,
      prompt: "Il (venir) _________________ d'Espagne.",
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vient'],
      explanation: "Verbe venir avec il : « Il vient d'Espagne. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q02',
      exercise_set_id: 'ch04-ex03',
      order_index: 2,
      prompt: "Est-ce qu'elles (venir) _________________ ce midi ?",
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['viennent'],
      explanation: "Verbe venir avec elles : « Est-ce qu'elles viennent ce midi ? » (prononcé [vjɛn]).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q03',
      exercise_set_id: 'ch04-ex03',
      order_index: 3,
      prompt: 'Tu (venir) _________________ avec nous ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['viens'],
      explanation: "Verbe venir avec tu : « Tu viens avec nous ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q04',
      exercise_set_id: 'ch04-ex03',
      order_index: 4,
      prompt: 'Elle (venir) _________________ du Canada.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['vient'],
      explanation: "Verbe venir avec elle : « Elle vient du Canada. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q05',
      exercise_set_id: 'ch04-ex03',
      order_index: 5,
      prompt: 'Vous (revenir) _________________ des Maldives ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['revenez'],
      explanation: "Dérivé revenir avec vous : « Vous revenez des Maldives ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q06',
      exercise_set_id: 'ch04-ex03',
      order_index: 6,
      prompt: 'Elle nous (prévenir) _________________ toujours à la dernière minute.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['prévient'],
      explanation: "Dérivé prévenir avec elle : « Elle nous prévient toujours à la dernière minute. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q07',
      exercise_set_id: 'ch04-ex03',
      order_index: 7,
      prompt: 'Nous (venir) _________________ tous ce soir.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['venons'],
      explanation: "Verbe venir avec nous : « Nous venons tous ce soir. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q08',
      exercise_set_id: 'ch04-ex03',
      order_index: 8,
      prompt: 'Il (devenir) _________________ fou avec tout ce travail.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['devient'],
      explanation: "Dérivé devenir avec il : « Il devient fou avec tout ce travail. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q09',
      exercise_set_id: 'ch04-ex03',
      order_index: 9,
      prompt: 'Vous (revenir) _________________ cet après-midi ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['revenez'],
      explanation: "Dérivé revenir avec vous : « Vous revenez cet après-midi ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex03-q10',
      exercise_set_id: 'ch04-ex03',
      order_index: 10,
      prompt: 'Je (venir) _________________ de la contacter.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['viens'],
      explanation: "1re personne du singulier dans une construction de passé récent : « Je viens de la contacter. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex04': [
    {
      id: 'ch04-ex04-q01',
      exercise_set_id: 'ch04-ex04',
      order_index: 1,
      prompt: 'Je téléphone à Bernard.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je viens de téléphoner à Bernard.',
        'Je viens de téléphoner à Bernard'
      ],
      explanation: "Passé immédiat : venir au présent (je viens) + de + infinitif téléphoner ➔ « Je viens de téléphoner à Bernard. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q02',
      exercise_set_id: 'ch04-ex04',
      order_index: 2,
      prompt: 'Il annule son vol.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Il vient d'annuler son vol.",
        "Il vient d'annuler son vol",
        "Il vient d’annuler son vol.",
        "Il vient d’annuler son vol"
      ],
      explanation: "Élision obligatoire devant la voyelle a- de annuler : « Il vient d'annuler son vol. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q03',
      exercise_set_id: 'ch04-ex04',
      order_index: 3,
      prompt: 'Elle remplace tous ses meubles.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle vient de remplacer tous ses meubles.',
        'Elle vient de remplacer tous ses meubles'
      ],
      explanation: "Passé immédiat : elle vient de + remplacer ➔ « Elle vient de remplacer tous ses meubles. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q04',
      exercise_set_id: 'ch04-ex04',
      order_index: 4,
      prompt: 'La police révèle le secret.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'La police vient de révéler le secret.',
        'La police vient de révéler le secret'
      ],
      explanation: "Passé immédiat : la police vient de + révéler ➔ « La police vient de révéler le secret. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q05',
      exercise_set_id: 'ch04-ex04',
      order_index: 5,
      prompt: 'Vous commencez à travailler.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous venez de commencer à travailler.',
        'Vous venez de commencer à travailler'
      ],
      explanation: "Passé immédiat avec vous : « Vous venez de commencer à travailler. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q06',
      exercise_set_id: 'ch04-ex04',
      order_index: 6,
      prompt: 'Elle manque le train.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle vient de manquer le train.',
        'Elle vient de manquer le train'
      ],
      explanation: "Passé immédiat : « Elle vient de manquer le train. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q07',
      exercise_set_id: 'ch04-ex04',
      order_index: 7,
      prompt: 'Tu as trente ans.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Tu viens d'avoir trente ans.",
        "Tu viens d'avoir trente ans",
        "Tu viens d’avoir trente ans.",
        "Tu viens d’avoir trente ans"
      ],
      explanation: "Élision obligatoire devant l'infinitif avoir : « Tu viens d'avoir trente ans. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q08',
      exercise_set_id: 'ch04-ex04',
      order_index: 8,
      prompt: 'Il achève ses études.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Il vient d'achever ses études.",
        "Il vient d'achever ses études",
        "Il vient d’achever ses études.",
        "Il vient d’achever ses études"
      ],
      explanation: "Élision obligatoire devant l'infinitif achever : « Il vient d'achever ses études. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q09',
      exercise_set_id: 'ch04-ex04',
      order_index: 9,
      prompt: 'Nous parlons à la directrice.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Nous venons de parler à la directrice.',
        'Nous venons de parler à la directrice'
      ],
      explanation: "Passé immédiat : nous venons de + parler ➔ « Nous venons de parler à la directrice. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex04-q10',
      exercise_set_id: 'ch04-ex04',
      order_index: 10,
      prompt: 'Ils voient un bon film.',
      instruction: 'Mettre la phrase au passé immédiat (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils viennent de voir un bon film.',
        'Ils viennent de voir un bon film',
        'Elles viennent de voir un bon film.',
        'Elles viennent de voir un bon film'
      ],
      explanation: "Passé immédiat avec l'infinitif voir : « Ils viennent de voir un bon film. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex05': [
    {
      id: 'ch04-ex05-q01',
      exercise_set_id: 'ch04-ex05',
      order_index: 1,
      prompt: 'Are you going to the movies on Sunday?',
      instruction: "Traduire en utilisant tu et l'inversion obligatoire.",
      tokens: null,
      options: null,
      accepted_answers: [
        'Vas-tu au cinéma dimanche ?',
        'Vas-tu au cinéma dimanche?',
        'Vas-tu au cinéma le dimanche ?',
        'Vas-tu au cinéma le dimanche?',
        'Vas-tu au cinéma dimanche',
        'Tu vas au cinéma dimanche ?',
        'Tu vas au cinéma dimanche?'
      ],
      explanation: "Inversion verbe-sujeito avec tu : « Vas-tu au cinéma dimanche ? » (à + le cinéma = au cinéma).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q02',
      exercise_set_id: 'ch04-ex05',
      order_index: 2,
      prompt: 'They are going to move soon.',
      instruction: 'Traduire au futur proche.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils vont bientôt déménager.',
        'Ils vont bientôt déménager',
        'Elles vont bientôt déménager.',
        'Elles vont bientôt déménager',
        'Ils (Elles) vont bientôt déménager.',
        'Ils vont déménager bientôt.',
        'Ils vont déménager bientôt'
      ],
      explanation: "Futur proche avec l'adverbe bientôt intercalé : « Ils vont bientôt déménager. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q03',
      exercise_set_id: 'ch04-ex05',
      order_index: 3,
      prompt: 'How are you doing?',
      instruction: "Traduire en utilisant tu et l'inversion.",
      tokens: null,
      options: null,
      accepted_answers: [
        'Comment vas-tu ?',
        'Comment vas-tu?',
        'Comment vas-tu',
        'Comment tu vas ?',
        'Ça va ?'
      ],
      explanation: "Inversion avec le verbe aller et tu : « Comment vas-tu ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q04',
      exercise_set_id: 'ch04-ex05',
      order_index: 4,
      prompt: 'They are going to invest in Portugal.',
      instruction: 'Traduire au futur proche.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils vont investir au Portugal.',
        'Ils vont investir au Portugal',
        'Elles vont investir au Portugal.',
        'Elles vont investir au Portugal',
        'Ils (Elles) vont investir au Portugal.'
      ],
      explanation: "Futur proche et préposition de pays masculin (au Portugal) : « Ils vont investir au Portugal. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q05',
      exercise_set_id: 'ch04-ex05',
      order_index: 5,
      prompt: "She's just started a new job.",
      instruction: 'Traduire au passé récent (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle vient de commencer un nouveau travail.',
        'Elle vient de commencer un nouveau travail',
        'Elle vient de commencer un nouvel emploi.',
        'Elle vient de commencer un nouvel emploi',
        'Elle vient de débuter un nouveau travail.'
      ],
      explanation: "Passé immédiat : « Elle vient de commencer un nouveau travail. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q06',
      exercise_set_id: 'ch04-ex05',
      order_index: 6,
      prompt: 'This hat looks good on you.',
      instruction: 'Traduire en utilisant tu.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ce chapeau te va bien.',
        'Ce chapeau te va bien'
      ],
      explanation: "Expression idiomatique de seyance avec aller : « Ce chapeau te va bien. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q07',
      exercise_set_id: 'ch04-ex05',
      order_index: 7,
      prompt: 'They just canceled my flight.',
      instruction: 'Traduire au passé récent (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Ils viennent d'annuler mon vol.",
        "Ils viennent d'annuler mon vol",
        "Ils viennent d’annuler mon vol.",
        "Ils viennent d’annuler mon vol",
        "Elles viennent d'annuler mon vol.",
        "Elles viennent d'annuler mon vol"
      ],
      explanation: "Passé récent avec élision devant annuler : « Ils viennent d'annuler mon vol. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q08',
      exercise_set_id: 'ch04-ex05',
      order_index: 8,
      prompt: 'He goes to the library on Saturdays.',
      instruction: 'Traduire au présent.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il va à la bibliothèque le samedi.',
        'Il va à la bibliothèque le samedi',
        'Il va à la bibliothèque les samedis.',
        'Il va à la bibliothèque les samedis'
      ],
      explanation: "L'habitude régulière le samedi s'exprime par le singulier avec article : « Il va à la bibliothèque le samedi. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q09',
      exercise_set_id: 'ch04-ex05',
      order_index: 9,
      prompt: 'She just called François.',
      instruction: 'Traduire au passé récent (venir de + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Elle vient d'appeler François.",
        "Elle vient d'appeler François",
        "Elle vient d’appeler François.",
        "Elle vient d’appeler François",
        'Elle vient de téléphoner à François.',
        'Elle vient de téléphoner à François'
      ],
      explanation: "Passé récent avec élision devant appeler : « Elle vient d'appeler François. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex05-q10',
      exercise_set_id: 'ch04-ex05',
      order_index: 10,
      prompt: 'She is going to finish the book this afternoon.',
      instruction: 'Traduire au futur proche.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle va finir le livre cet après-midi.',
        'Elle va finir le livre cet après-midi',
        'Elle va terminer le livre cet après-midi.',
        'Elle va terminer le livre cet après-midi'
      ],
      explanation: "Futur proche : elle va + infinitif finir ➔ « Elle va finir le livre cet après-midi. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex06': [
    {
      id: 'ch04-ex06-q01',
      exercise_set_id: 'ch04-ex06',
      order_index: 1,
      prompt: 'Il tient à sa voiture.',
      instruction: null,
      tokens: null,
      options: CH04_EX06_MATCHING_OPTIONS,
      accepted_answers: [
        'c',
        'Il est attaché à cette chose.',
        'Il est attaché à cette chose',
        'c. Il est attaché à cette chose.'
      ],
      explanation: "« Tenir à quelque chose » exprime un fort attachement : « Il est attaché à cette chose. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex06-q02',
      exercise_set_id: 'ch04-ex06',
      order_index: 2,
      prompt: 'Il ne tient compte de rien.',
      instruction: null,
      tokens: null,
      options: CH04_EX06_MATCHING_OPTIONS,
      accepted_answers: [
        'd',
        'Il ignore tout.',
        'Il ignore tout',
        'd. Il ignore tout.'
      ],
      explanation: "« Ne tenir compte de rien » signifie n'accorder aucune importance / ignorer : « Il ignore tout. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex06-q03',
      exercise_set_id: 'ch04-ex06',
      order_index: 3,
      prompt: 'Il ne tient pas ses promesses.',
      instruction: null,
      tokens: null,
      options: CH04_EX06_MATCHING_OPTIONS,
      accepted_answers: [
        'e',
        'Il ne respecte pas ses engagements.',
        'Il ne respecte pas ses engagements',
        'e. Il ne respecte pas ses engagements.'
      ],
      explanation: "« Ne pas tenir ses promesses » signifie manquer à sa parole : « Il ne respecte pas ses engagements. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex06-q04',
      exercise_set_id: 'ch04-ex06',
      order_index: 4,
      prompt: 'Il tient de sa sœur.',
      instruction: null,
      tokens: null,
      options: CH04_EX06_MATCHING_OPTIONS,
      accepted_answers: [
        'a',
        'Il ressemble à sa parente.',
        'Il ressemble à sa parente',
        'a. Il ressemble à sa parente.'
      ],
      explanation: "« Tenir de quelqu'un » signifie hériter de ses traits ou lui ressembler : « Il ressemble à sa parente. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex06-q05',
      exercise_set_id: 'ch04-ex06',
      order_index: 5,
      prompt: 'Il tient à te parler.',
      instruction: null,
      tokens: null,
      options: CH04_EX06_MATCHING_OPTIONS,
      accepted_answers: [
        'b',
        'Il veut discuter avec toi.',
        'Il veut discuter avec toi',
        'b. Il veut discuter avec toi.'
      ],
      explanation: "« Tenir à + infinitif » exprime le désir ardent d'accomplir une action : « Il veut discuter avec toi. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex07': [
    {
      id: 'ch04-ex07-q01',
      exercise_set_id: 'ch04-ex07',
      order_index: 1,
      prompt: 'Qui (faire) _________________ quoi dans cette entreprise ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fait'],
      explanation: "Le pronom interrogatif 'qui' sujet appelle la 3e personne du singulier : « Qui fait quoi dans cette entreprise ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q02',
      exercise_set_id: 'ch04-ex07',
      order_index: 2,
      prompt: 'Ils (faire) _________________ un grand voyage chaque année.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['font'],
      explanation: "Verbe faire à la 3e personne du pluriel : « Ils font un grand voyage chaque année. » (irrégulier font).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q03',
      exercise_set_id: 'ch04-ex07',
      order_index: 3,
      prompt: 'Tu (faire) _________________ la cuisine ?',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fais'],
      explanation: "Verbe faire avec tu : « Tu fais la cuisine ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q04',
      exercise_set_id: 'ch04-ex07',
      order_index: 4,
      prompt: "Quel temps (faire) _________________-il à Rome aujourd'hui ?",
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fait'],
      explanation: "Expression météorologique impersonnelle : « Quel temps fait-il à Rome aujourd'hui ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q05',
      exercise_set_id: 'ch04-ex07',
      order_index: 5,
      prompt: 'Nous (faire) _________________ une promenade dans les jardins du Luxembourg.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faisons'],
      explanation: "Verbe faire avec nous : « Nous faisons une promenade... » (prononciation [nu fəzɔ̃]).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q06',
      exercise_set_id: 'ch04-ex07',
      order_index: 6,
      prompt: 'Elle (faire) _________________ le marché le samedi matin.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fait'],
      explanation: "3e personne du singulier : « Elle fait le marché le samedi matin. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q07',
      exercise_set_id: 'ch04-ex07',
      order_index: 7,
      prompt: 'On (faire) _________________ la queue depuis une demi-heure !',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fait'],
      explanation: "Le pronom indéfini 'on' prend la 3e personne du singulier : « On fait la queue depuis une demi-heure ! »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q08',
      exercise_set_id: 'ch04-ex07',
      order_index: 8,
      prompt: 'Ils (faire) _________________ la sieste de trois à cinq heures.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['font'],
      explanation: "3e personne du pluriel : « Ils font la sieste de trois à cinq heures. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q09',
      exercise_set_id: 'ch04-ex07',
      order_index: 9,
      prompt: "Vous (faire) _________________ de l'exercice pour rester en forme ?",
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['faites'],
      explanation: "2e personne du pluriel irrégulière : « Vous faites de l'exercice... » (et jamais *faisez* !).",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex07-q10',
      exercise_set_id: 'ch04-ex07',
      order_index: 10,
      prompt: 'Il (faire) _________________ des grimaces devant le miroir.',
      instruction: null,
      tokens: null,
      options: null,
      accepted_answers: ['fait'],
      explanation: "3e pessoa do singular : « Il fait des grimaces devant le miroir. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex08': [
    {
      id: 'ch04-ex08-q01',
      exercise_set_id: 'ch04-ex08',
      order_index: 1,
      prompt: 'Je lis le dossier.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je fais lire le dossier.',
        'Je fais lire le dossier'
      ],
      explanation: "Forme causative : faire au présent (je fais) + infinitif lire ➔ « Je fais lire le dossier. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q02',
      exercise_set_id: 'ch04-ex08',
      order_index: 2,
      prompt: 'Vous lavez la voiture.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Vous faites laver la voiture.',
        'Vous faites laver la voiture'
      ],
      explanation: "Forme causative : vous faites + infinitif laver ➔ « Vous faites laver la voiture. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q03',
      exercise_set_id: 'ch04-ex08',
      order_index: 3,
      prompt: 'Il répare la télévision.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il fait réparer la télévision.',
        'Il fait réparer la télévision'
      ],
      explanation: "Forme causative : il fait + infinitif réparer ➔ « Il fait réparer la télévision. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q04',
      exercise_set_id: 'ch04-ex08',
      order_index: 4,
      prompt: 'Elle investit sa fortune.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle fait investir sa fortune.',
        'Elle fait investir sa fortune'
      ],
      explanation: "Forme causative : elle fait + infinitif investir ➔ « Elle fait investir sa fortune. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q05',
      exercise_set_id: 'ch04-ex08',
      order_index: 5,
      prompt: "J'envoie le paquet.",
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je fais envoyer le paquet.',
        'Je fais envoyer le paquet'
      ],
      explanation: "Forme causative : je fais + infinitif envoyer ➔ « Je fais envoyer le paquet. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q06',
      exercise_set_id: 'ch04-ex08',
      order_index: 6,
      prompt: 'Il annule le voyage.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il fait annuler le voyage.',
        'Il fait annuler le voyage'
      ],
      explanation: "Forme causative : il fait + infinitif annuler ➔ « Il fait annuler le voyage. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q07',
      exercise_set_id: 'ch04-ex08',
      order_index: 7,
      prompt: "Tu remplaces l'employé malade.",
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Tu fais remplacer l'employé malade.",
        "Tu fais remplacer l'employé malade",
        "Tu fais remplacer l’employé malade.",
        "Tu fais remplacer l’employé malade"
      ],
      explanation: "Forme causative : tu fais + infinitif remplacer ➔ « Tu fais remplacer l'employé malade. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q08',
      exercise_set_id: 'ch04-ex08',
      order_index: 8,
      prompt: "Il visite l'entreprise.",
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        "Il fait visiter l'entreprise.",
        "Il fait visiter l'entreprise",
        "Il fait visiter l’entreprise.",
        "Il fait visiter l’entreprise"
      ],
      explanation: "Forme causative : il fait + infinitif visiter ➔ « Il fait visiter l'entreprise. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q09',
      exercise_set_id: 'ch04-ex08',
      order_index: 9,
      prompt: 'Je corrige les copies des étudiants.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je fais corriger les copies des étudiants.',
        'Je fais corriger les copies des étudiants'
      ],
      explanation: "Forme causative : je fais + infinitif corriger ➔ « Je fais corriger les copies des étudiants. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex08-q10',
      exercise_set_id: 'ch04-ex08',
      order_index: 10,
      prompt: 'Je chante la chanson.',
      instruction: 'Mettre la phrase à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je fais chanter la chanson.',
        'Je fais chanter la chanson'
      ],
      explanation: "Forme causative : je fais + infinitif chanter ➔ « Je fais chanter la chanson. »",
      created_at: new Date().toISOString()
    }
  ],

  'ch04-ex09': [
    {
      id: 'ch04-ex09-q01',
      exercise_set_id: 'ch04-ex09',
      order_index: 1,
      prompt: 'They have the letter sent to Paris.',
      instruction: 'Traduire en utilisant la forme causative.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils font envoyer la lettre à Paris.',
        'Ils font envoyer la lettre à Paris',
        'Elles font envoyer la lettre à Paris.',
        'Elles font envoyer la lettre à Paris',
        'Ils (Elles) font envoyer la lettre à Paris.'
      ],
      explanation: "Forme causative avec envoyer : « Ils font envoyer la lettre à Paris. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q02',
      exercise_set_id: 'ch04-ex09',
      order_index: 2,
      prompt: 'I have been standing in line for ten minutes.',
      instruction: 'Traduire au présent avec depuis.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Je fais la queue depuis dix minutes.',
        'Je fais la queue depuis dix minutes',
        'Je fais la queue depuis 10 minutes.',
        'Je fais la queue depuis 10 minutes'
      ],
      explanation: "Action commencée dans le passé qui continue dans le présent : « Je fais la queue depuis dix minutes. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q03',
      exercise_set_id: 'ch04-ex09',
      order_index: 3,
      prompt: 'They are attached to their friends.',
      instruction: 'Traduire en utilisant le verbe tenir.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Ils tiennent à leurs amis.',
        'Ils tiennent à leurs amis',
        'Elles tiennent à leurs amis.',
        'Elles tiennent à leurs amis',
        'Ils (Elles) tiennent à leurs amis.'
      ],
      explanation: "Expression 'tenir à quelqu'un' (être attaché à) : « Ils tiennent à leurs amis. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q04',
      exercise_set_id: 'ch04-ex09',
      order_index: 4,
      prompt: 'He really wants to sing this song.',
      instruction: 'Traduire en utilisant le verbe tenir.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il tient à chanter cette chanson.',
        'Il tient à chanter cette chanson'
      ],
      explanation: "Expression 'tenir à + infinitif' (vouloir absolument) : « Il tient à chanter cette chanson. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q05',
      exercise_set_id: 'ch04-ex09',
      order_index: 5,
      prompt: 'She is holding a vase.',
      instruction: 'Traduire en utilisant le verbe tenir.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle tient un vase.',
        'Elle tient un vase'
      ],
      explanation: "Sens physique premier de tenir : « Elle tient un vase. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q06',
      exercise_set_id: 'ch04-ex09',
      order_index: 6,
      prompt: 'He looks like his father.',
      instruction: 'Traduire en utilisant le verbe tenir.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il tient de son père.',
        'Il tient de son père',
        'Il ressemble à son père.',
        'Il ressemble à son père'
      ],
      explanation: "Expression idiomatique de ressemblance familiale : « Il tient de son père. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q07',
      exercise_set_id: 'ch04-ex09',
      order_index: 7,
      prompt: "It's raining.",
      instruction: 'Traduire avec le verbe météorologique approprié.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il pleut.',
        'Il pleut'
      ],
      explanation: "Verbe météorologique impersonnel pleuvoir : « Il pleut. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q08',
      exercise_set_id: 'ch04-ex09',
      order_index: 8,
      prompt: 'Can you cook?',
      instruction: 'Traduire en utilisant vous et la forme est-ce que si nécessaire.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Est-ce que vous savez faire la cuisine ?',
        'Est-ce que vous savez faire la cuisine?',
        'Est-ce que vous savez faire la cuisine',
        'Savez-vous faire la cuisine ?',
        'Savez-vous faire la cuisine?',
        'Savez-vous faire la cuisine',
        'Vous savez faire la cuisine ?',
        'Vous savez faire la cuisine?'
      ],
      explanation: "Interrogation avec est-ce que et savoir faire la cuisine : « Est-ce que vous savez faire la cuisine ? »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q09',
      exercise_set_id: 'ch04-ex09',
      order_index: 9,
      prompt: 'She has her car washed.',
      instruction: 'Traduire à la forme causative (faire + infinitif).',
      tokens: null,
      options: null,
      accepted_answers: [
        'Elle fait laver sa voiture.',
        'Elle fait laver sa voiture'
      ],
      explanation: "Forme causative : elle fait + laver sa voiture ➔ « Elle fait laver sa voiture. »",
      created_at: new Date().toISOString()
    },
    {
      id: 'ch04-ex09-q10',
      exercise_set_id: 'ch04-ex09',
      order_index: 10,
      prompt: "It's cold.",
      instruction: 'Traduire avec faire impersonnel.',
      tokens: null,
      options: null,
      accepted_answers: [
        'Il fait froid.',
        'Il fait froid'
      ],
      explanation: "Météo impersonnelle avec faire : « Il fait froid. »",
      created_at: new Date().toISOString()
    }
  ]
};
