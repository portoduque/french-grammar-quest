# PRD — French Grammar Quest
## Product Requirements Document | Visão completa do produto

> **Status:** especificação de produto, não implementação · **Versão:** 1.0 · **Data:** 12/10/2026 · **Repositório:** privado, portoduque/french-grammar-quest · **Idioma deste PRD:** português (Brasil) · **Idiomas da experiência do estudante:** explicações em inglês e idioma-alvo francês.
>
> **LEGENDA:** **[DECIDIDO]** acordo explícito de produto/stack; **[PROPOSTO]** comportamento recomendado neste PRD, sujeito a aprovação; **[DEPENDÊNCIA]** condição bloqueante antes do lançamento. Esta especificação não significa que funcionalidades ou revisão editorial já tenham sido implementadas.

## 1. Resumo executivo

**French Grammar Quest** será uma aplicação web privada, gamificada, voltada ao aprendizado estruturado da gramática francesa a partir de uma base de conhecimento organizada em **28 capítulos**. A experiência deve transformar teoria, exemplos e exercícios em **missões interativas reutilizáveis** (não apenas exibir um PDF ou um questionário monótono), acompanhando progresso, domínio, revisões, conquistas e histórico **individual por conta**.

O público inicial é o proprietário do projeto e, **caso exista autorização de direitos para compartilhar os materiais utilizados**, um pequeno grupo de pessoas convidadas. O projeto deve operar com serviços gratuitos ou tiers gratuitos, mantendo arquitetura simples, manutenível, segura e adequada a desenvolvimento apoiado por Antigravity/Codex/Claude Code. Não se trata, inicialmente, de uma plataforma SaaS pública.

**Proposta de valor:** estudar uma regra, praticá-la imediatamente, receber feedback pedagógico, revisar erros e perceber a evolução como uma jornada de capítulos, missões e desafios, preservando correspondência entre o conteúdo educativo e sua origem.

**Princípio de lançamento:** dados de exercícios que passam na auditoria de estrutura **não são automaticamente conteúdo editorialmente aprovado ou autorizado para distribuição**. O motor do app poderá ser construído com conteúdo original ou fictício até a revisão/autorização do corpus.

## 2. Histórico, base atual e rastreabilidade

### 2.1 Origem e estado do repositório

O repositório privado já contém a **base de conteúdo** entregue nas Fases A, B e C. Nenhum frontend React, backend de produção, mecanismo de login, sistema de pontos nem minijogo está implementado no estado verificado para este PRD. Não confundir conteúdo estruturado com aplicação funcional.

| Item existente | Situação encontrada |
|---|---|
| Fonte | Annie Heminway, *Practice Makes Perfect: Complete French Grammar*, Premium Fifth Edition, McGraw Hill |
| Arquivo-fonte | PDF de 527 páginas; SHA-256 registrado em `manifest.json` |
| Capítulos | 28/28 indexados, com títulos e intervalo de páginas |
| Páginas dos capítulos | 372, do PDF 14 ao 385 |
| Exercícios agrupados | 233 conjuntos, inclusive numerações anômalas no original |
| Perguntas e respostas da editora | 2.227 perguntas com entrada de gabarito associada |
| Tabelas e glossários | 113 páginas de referências indexadas (386–498) |
| Gabarito do livro | Páginas PDF 499–527 |
| Contratos | `schemas/chapter.schema.json` e `schemas/exercise.schema.json` |
| Controle de qualidade | `scripts/validate_content.py`, `scripts/validate_phase_b.py` e `scripts/audit_phase_c.py` |
| Gate estrutural automático | Aprovado na Fase C |
| Gate editorial de fidelidade visual | **PENDENTE**: não existe certificação integral palavra por palavra |

**Limitações concretas já conhecidas:** imagem da página 28 com traduções inglesas cortadas; exercício com elisão de `Je` para `J’` no capítulo 1; exceção informal `tu` em exercício que usa `vous` como instrução geral; numeração duplicada no capítulo 26; numeração de item repetida no exercício 28·15; 29 enunciados anteriormente contaminados por teoria, cujos textos foram preservados e reparados com sinalização editorial; tabelas de vários capítulos ainda não normalizadas.

**Fontes autoritativas:** `manifest.json`, `chapters/NN/metadata.json`, `chapters/NN/theory.md`, `chapters/NN/exercises.json`, `chapters/NN/lesson-sequence.json`, `chapters/NN/theory-source.md`, `reports/phase-c-machine-audit.json`, `reports/phase-c-final-validation.md`, `NOTICE.md` e `docs/editorial-qa-checklist.md`. Este PRD **não altera** os textos, números, gabaritos ou classificações editoriais existentes.

### 2.2 Direitos sobre a fonte — condição obrigatória

O livro é protegido por direito autoral. **Um repositório privado, convite de acesso, login ou compra individual do exemplar não substitui licença para republicação/redistribuição do conteúdo.** O corpus extraído só poderá ser disponibilizado aos amigos se houver direitos/autorizações adequados para esse uso. Sem essa autorização, a versão compartilhada deve usar conteúdo original, devidamente licenciado ou obtido de outra fonte permitida. O acesso ao corpus privado fica restrito ao uso cuja legitimidade tenha sido confirmada; não copiar teoria, questões ou gabaritos para bundles estáticos públicos, bancos públicos, páginas abertas ou CDN desprotegida.

A operação deve ter **gate legal/ editorial independente do gate técnico**, inclusive por capítulo/versão de conteúdo. O PRD especifica a arquitetura para ambos os cenários, **mas não presume permissão de distribuir o livro**.

## 3. Problema e oportunidade

### 3.1 Problemas a resolver

- Estudo de gramática baseado em livro pode parecer linear e pouco estimulante, com feedback tardio.
- Conteúdo e exercícios não mostram, por si, uma progressão persistente por estudante, tópicos dominados ou erros recorrentes.
- Repetir exercícios inteiros pode desperdiçar tempo quando somente determinadas regras precisam de reforço.
- Listas de exercícios são heterogêneas: conjugação, completar lacuna, tradução, associação, reconstrução de frase, reformulação e perguntas abertas exigem interações diferentes.
- Correção literal de tradução frequentemente rejeita soluções válidas, causando desconfiança pedagógica.
- A versão estruturada do corpus ainda contém risco editorial; lançá-la sem triagem poderia ensinar algo errado.

### 3.2 Jobs to Be Done

1. **Ao aprender um assunto:** ler uma explicação curta, consultar exemplos claros, praticar poucos itens e entender os erros.
2. **Ao retomar o estudo:** voltar exatamente ao ponto em que parou, em qualquer dispositivo autenticado.
3. **Ao revisar:** focar regras e questões com mais erros, sem precisar procurar manualmente no livro.
4. **Ao alcançar uma meta:** sentir progresso visível por XP, estrelas, conquistas e conclusão de capítulos.
5. **Ao criar conteúdo ou manter a aplicação:** rastrear cada missão até suas questões e versão editorial sem copiar/manipular manualmente centenas de strings na interface.

## 4. Público-alvo e personas

| Perfil | Necessidade | Prioridade |
|---|---|---|
| **Estudante proprietário** | Aprender francês com base inglesa, controle detalhado de progresso e acesso a todo conteúdo autorizado | P0 |
| **Estudante convidado** | Login próprio, histórico isolado, progressão e revisão independentes | P0 após autorização do conteúdo compartilhável |
| **Administrador/editor** | Gerir convites, versões de lições, status editorial, bugs e publicações | P0 mínimo / P1 ferramentas avançadas |
| **Revisor editorial** | Comparar fonte, tradução, exemplos e chave de respostas; aprovar ou bloquear conteúdo | P1 |

**Premissas [PROPOSTO]:** estudantes adultos, motivados a aprender sozinhos, com desktop e smartphone; proficiência inicial não deve ser inferida automaticamente de capítulos; a base é inglês → francês, sem conversão pedagógica automática para português. Acessibilidade faz parte da definição de pronto.

## 5. Objetivos, métricas e antiobjetivos

### 5.1 Objetivos [DECIDIDO + PROPOSTO]

- Proporcionar uma jornada de 28 capítulos, com trilhas coerentes com a fonte.
- Reusar formatos de jogos para servir a múltiplos capítulos, preservando **o objetivo pedagógico de cada questão**.
- Salvar progresso, conquistas e tentativas **por usuário** sem vazamento entre contas.
- Operar inicialmente com o máximo de custo previsível possível em tiers gratuitos.
- Priorizar resposta rápida, clareza, previsibilidade, acessibilidade e baixa fricção.
- Garantir versões de conteúdo auditáveis e revisáveis, sem publicar itens bloqueados.

### 5.2 Métricas de produto (instrumentar; metas iniciais a validar)

| Métrica | Definição | Meta de partida proposta |
|---|---|---|
| Ativação | Convidado que conclui a primeira missão após autenticar | ≥ 70% dos convidados ativos |
| Finalização de missão | Missões iniciadas e completadas, descontando saídas acidentais | ≥ 75% |
| Retenção D7 | Usuários que estudaram no dia 0 e retornam até o dia 7 | Monitorar antes de fixar meta |
| Tempo para retomar | Abrir dashboard → continuar exercício | p75 ≤ 3 cliques |
| Correção confiável | Respostas objetivas validadas por testes sem falsos negativos conhecidos | 100% dos casos de teste aprovados |
| Erros pedagógicos publicados | Incidentes de conteúdo incorreto publicados por engano | Zero bloqueios conhecidos liberados |
| Privacidade | Consultas entre dois usuários não autorizados | 0 acesso indevido |
| Custos | Consumo do projeto | Dentro dos limites gratuitos enquanto viável |

Métricas não serão usadas para punir nem comparar estudantes sem consentimento.

### 5.3 Fora de escopo do MVP

Marketplace, monetização, compras, assinaturas, sala de aula multi-organização, videoconferência, voz/pronúncia com avaliação por IA, chatbot de língua ilimitado, sistema social aberto, ranking público global, app nativo iOS/Android, importação automática de qualquer PDF, AR/VR e tradução generalizada para português. Conteúdo licenciado para amigos e recursos sociais são **dependências posteriores**.

## 6. Princípios de produto e UX

1. **Aprender antes de pontuar:** diversão não pode substituir explicação correta e feedback útil.
2. **Uma mecânica por interação:** evitar sobrecarga; apresentar objetivo, instrução, progresso e ação principal.
3. **Reaproveitar componentes:** 6–8 motores de interação devem cobrir as 28 ambientações.
4. **Preservar a identidade do livro:** sequência de capítulos, dificuldade, exemplos e origem rastreável.
5. **Conteúdo e interface desacoplados:** jogos consomem contratos normalizados e não dependem de parsing de Markdown ou PDF em tempo de execução.
6. **Não inventar acertos:** incerteza em resposta livre e em extração editorial deve aparecer claramente.
7. **Retomar sem medo:** salvamento contínuo e recuperação após queda de conexão.
8. **Acessível de verdade:** teclado, foco, leitores de tela, movimento reduzido, cores contrastantes; arrastar nunca será a única forma de responder.
9. **Segurança por padrão:** banco e regras de acesso no servidor; não incluir chaves privilegiadas no navegador.
10. **Simplicidade para vibe coding:** módulos claros, testes úteis, poucas dependências; não usar Phaser/microserviços sem necessidade comprovada.

## 7. Escopo e épicos (priorização)

| Épico | Descrição | Prioridade |
|---|---|---|
| EP-01 | Acesso privado e convite controlado | P0 |
| EP-02 | Onboarding e preferências básicas | P0 |
| EP-03 | Mapa dos 28 capítulos, lições e teoria | P0 |
| EP-04 | Motor de missões e apresentação das questões | P0 |
| EP-05 | Correção sensível ao tipo de questão | P0 |
| EP-06 | Tentativas, XP, progresso, retomada e indicadores | P0 |
| EP-07 | Revisão dos erros e reforço por tópico | P0 |
| EP-08 | Catálogo privado, status editorial e versões | P0 técnico / P1 editorial visual |
| EP-09 | Administração mínima (convites e bloqueio de conteúdo) | P0 |
| EP-10 | Conquistas, streak, desafios e final boss | P1 |
| EP-11 | Referências: verbos e glossários | P1 após revisão |
| EP-12 | PWA instalável e preferências visuais | P1 |
| EP-13 | Métricas e diagnóstico de qualidade | P1 |
| EP-14 | Recursos sociais opt-in | P2, condicionados a direitos de conteúdo |

**P0 = necessário para MVP com capítulo piloto autorizado. P1 = completar experiência e expansão. P2 = posterior.**

## 8. Jornada do usuário

### 8.1 Primeiro acesso

1. Administrador cadastra e autoriza o e-mail do convidado (se uso compartilhado for permitido).
2. Usuário recebe link de convite de curta duração ou faz login pelo provedor permitido; cadastro público livre é bloqueado.
3. API verifica identidade **e** pertencimento à lista de acesso antes de devolver dados de conteúdo e progresso.
4. Usuário escolhe apelido, tema visual e se deseja um tutorial; o idioma pedagógico inicial é inglês.
5. Dashboard exibe capítulo disponível, trilha, botão **Continue learning**, resumo de XP/progresso e última atividade.
6. Usuário escolhe um capítulo já disponível para si; o catálogo diferencia rascunho/bloqueado/publicado.

### 8.2 Fluxo de uma lição e exercício

1. Abrir capítulo → lista de tópicos e missões, estimativa aproximada baseada na contagem de questões (sem prometer duração).
2. Ver a teoria por subseção, com tabelas e exemplos; botão **Practice** inicia exercício correspondente.
3. Mostrar instrução original adaptada à mecânica, número da questão e estado da tentativa.
4. Resolver questão; para resposta objetiva, feedback preciso e explicação curta derivada de conteúdo validado.
5. Permitir **Try again** quando apropriado, sem fazer feedback revelar resposta antes da tentativa.
6. Ao finalizar o conjunto, exibir acertos verificáveis, respostas autodeclaradas/revisões pendentes separadas, erros por tópico, XP/estrelas e ações **Review mistakes / Continue**.
7. Persistir cada passo com idempotência; ao retornar, reconstituir estado.
8. Não alterar a tentativa original quando uma revisão posterior mudar o gabarito; gerar nova revisão de conteúdo ou evento de reavaliação auditável.

### 8.3 Revisão e retorno

- **Continue learning:** última atividade segura e ainda permitida.
- **My mistakes:** lista de questões erradas, filtrável por capítulo/tópico.
- **Review session:** seleção enxuta de itens errados/recorrentes; evitar blocos repetidos sem aprendizagem.
- **Chapter mastery:** mostra acertos verificados, respostas abertas e conclusão; não confundir quantidade de cliques com domínio.
- **Final Boss:** capítulo 28 como revisão cumulativa; desbloqueio e critérios descritos no `15.

## 9. Estrutura de informação e navegação

### 9.1 Menu principal proposto

**Dashboard · Learning Path · Review · Achievements · Reference · Profile**. Item **Admin** aparece somente para perfil autorizado. Em mobile: barra de navegação com itens mais usados e menu de mais opções; em desktop: barra lateral responsiva. Nunca criar duas arquiteturas de navegação divergentes.

### 9.2 Páginas previstas

| ID | Tela | Dados e componentes | Estado vazio/erro |
|---|---|---|---|
| UX-01 | Convite/login | E-mail, método de login, explicação de acesso restrito | Convite inválido, expirado, conta não autorizada |
| UX-02 | Onboarding | Apelido, objetivos e tutorial dispensável | Padrões seguros |
| UX-03 | Dashboard | Continuar, evolução da trilha, últimos erros, XP, próxima missão | Primeiro uso, sem dados |
| UX-04 | Learning Path | 28 capítulos em ordem, título, status, progresso e pré-requisitos | Conteúdo não publicado |
| UX-05 | Chapter Overview | Descrição, tópicos, subtemas, missões e evidências de domínio | Revisão editorial pendente |
| UX-06 | Theory Reader | Markdown seguro, conjugação, exemplos, glossário contextual, prática relacionada | Tabela indisponível/ambígua |
| UX-07 | Mission | Cabeçalho com progresso, instrução, componente de jogo e navegação clara | Sessão expirada, offline |
| UX-08 | Answer Feedback | Acertou/errou/pendente, resposta explicada, nova tentativa | Resposta aberta sem avaliação objetiva |
| UX-09 | Mission Result | Score, XP, estrelas, erros por habilidade, revisão e próximo passo | Tentativa parcial |
| UX-10 | Review | Filtros por capítulo, habilidade, recorrência e pendência | Sem erros ainda |
| UX-11 | Profile/Progress | Histórico pessoal, progresso por capítulo, preferências, dados | Sem histórico |
| UX-12 | Achievements | Conquistas desbloqueadas, critérios claros | Nenhuma conquista |
| UX-13 | Reference | Tabelas verbais e glossários, com busca e fonte autorizada | Referência não revisada |
| UX-14 | Final Boss | Introdução, checkpoints, conjuntos mistos, resultados | Não elegível |
| UX-15 | Admin Content | Versões, flags editoriais, aprovação, bloqueio e auditoria | Conteúdo sem revisão |
| UX-16 | Admin Access | Convites, revogação e papéis de usuário | Lista vazia |
| UX-17 | Account/Privacy | Sair, preferências, dados pessoais, exclusão/exportação | Falha segura |

### 9.3 Estados de UI obrigatórios

Loading com esqueleto sem deslocamento excessivo; empty state com ação útil; erro de rede com retry seguro; acesso negado sem revelar se determinado conteúdo existe; item sob revisão indisponível; sessão concluída; tentativa pausada; resposta livre pendente; offline com progresso local **não autorizado a sincronizar como oficial sem reconciliação**; erro de sincronização com rascunho recuperável.

## 10. Requisitos funcionais detalhados

### 10.1 Autenticação, acesso e perfil (RF-001 a RF-010)

- **RF-001 [P0]:** cadastro público fechado; somente contas explicitamente permitidas podem acessar área autenticada.
- **RF-002 [P0]:** autenticação segura por Supabase Auth (e-mail magic link ou OAuth permitido); verificação de identidade e allowlist **no backend/RLS**, nunca apenas escondendo botões.
- **RF-003 [P0]:** cada pessoa possui `user_id` imutável, apelido e configurações próprios.
- **RF-004 [P0]:** usuário consegue sair de todos os dispositivos de maneira apropriada aos mecanismos do provedor; sessões revogadas não devem continuar acessando conteúdo.
- **RF-005 [P0]:** permissões mínimas `student` / `admin`; `editor` opcional P1.
- **RF-006 [P0]:** administrador pode convidar, desativar e revogar acesso. Revogação impede novas leituras da API e atualizações de progresso.
- **RF-007 [P0]:** rotas privadas e chamadas ao banco recusam sessão inválida, inclusive chamadas HTTP diretas.
- **RF-008 [P0]:** rate limiting e proteção básica anti-enumeração nas ações de login/convite que expõem backend customizado.
- **RF-009 [P0]:** dados de progresso não podem ser lidos, criados, alterados ou apagados por outro estudante.
- **RF-010 [P1]:** fluxo de exportação e solicitação de exclusão de dados pessoais, respeitando obrigações aplicáveis.

### 10.2 Catálogo, teoria e missões (RF-011 a RF-025)

- **RF-011 [P0]:** exibir os 28 capítulos com títulos idênticos ao manifesto; capítulos não lançados permanecem visíveis como planejados/bloqueados sem expor texto-fonte.
- **RF-012 [P0]:** manter vínculo capítulo → tópicos/subtópicos → exercícios → questões por IDs persistentes, não por índice de array.
- **RF-013 [P0]:** apresentar teoria com renderizador Markdown sanitizado, preservando francês, acentos, apóstrofos, tabelas, separação de colunas e exemplos.
- **RF-014 [P0]:** renderizar apenas lições editorialmente aprovadas **e** cuja licença/uso estejam autorizados para o público específico.
- **RF-015 [P0]:** mostrar instrução de cada exercício, total real de questões e fonte interna correspondente.
- **RF-016 [P0]:** suportar conjuntos com quantidades diferentes de perguntas; não presumir sempre dez.
- **RF-017 [P0]:** preservar IDs distintos para marcadores impressos repetidos (ex.: capítulo 26).
- **RF-018 [P0]:** motor de jogos deve interpretar `interaction_type`; nunca inferir exclusivamente pela aparência do enunciado.
- **RF-019 [P0]:** ordem de exibição padrão segue fonte, mas motor deve permitir revisão embaralhada com seed salva.
- **RF-020 [P0]:** confirmar e recuperar posição da sessão entre recargas, abas e dispositivos autenticados.
- **RF-021 [P0]:** permitir recomeçar um exercício sem apagar histórico anterior.
- **RF-022 [P0]:** impedir publicação se tabelas críticas, traduções cortadas ou respostas tiverem sinalização bloqueante.
- **RF-023 [P1]:** referências verbais/glossários poderão ser pesquisadas apenas depois da conversão estrutural e verificação do conteúdo correspondente.
- **RF-024 [P1]:** leitor pode ativar/ocultar dicas e exemplos válidos; a interface registra o uso da dica para transparência de pontuação.
- **RF-025 [P1]:** navegação por assunto, capítulo, dificuldade e tipo, mantendo ordem original como fonte de referência.

### 10.3 Jogos, entrada e feedback (RF-026 a RF-040)

- **RF-026 [P0]:** suportar `fill_blank` com edição compatível com acentos e contrações.
- **RF-027 [P0]:** suportar `matching` via seleção ou teclado; drag-and-drop é melhoria opcional, nunca obrigatório.
- **RF-028 [P0]:** suportar `translation` e `free_response` com campo textual longo e regras diferenciadas de correção.
- **RF-029 [P0]:** suportar `sentence_rewrite` e `ordering` com acessibilidade por teclado.
- **RF-030 [P0]:** suportar múltipla escolha com alternativas suficientes, distratores editorialmente validados, sem inventar alternativa como fato do livro.
- **RF-031 [P0]:** normalizações seguras (trim, Unicode NFC, espaços repetidos, apóstrofos tipográficos equivalentes quando aceitos) são explicitamente documentadas por tipo de questão.
- **RF-032 [P0]:** **nunca** remover acentos franceses, concordância ou pontuação significativa indiscriminadamente para declarar acerto.
- **RF-033 [P0]:** corrigir formas morfológicas de maneira contextual (ex.: `Je` → `J’`) em vez de simples concatenação de lacuna.
- **RF-034 [P0]:** permitir exceção individual de pronome/registro quando o item exige `tu` apesar de instrução geral com `vous`.
- **RF-035 [P0]:** resposta livre sem grade confiável vai para `self_reviewed` ou `pending_review`, com **acurácia não verificada** claramente identificada; não marcar como erro automaticamente por diferença textual.
- **RF-036 [P0]:** feedback deve distinguir `correct`, `incorrect`, `needs_review`, `self_reviewed`, `blocked` e `ungradable`.
- **RF-037 [P0]:** erro mostra resposta de referência e remissão à teoria, desde que o item esteja aprovado e o usuário tenha acesso ao conteúdo.
- **RF-038 [P0]:** opções de **Try again**, **Skip**, **See explanation** seguem regra da missão e não criam loops de pontuação.
- **RF-039 [P0]:** tempo de resposta não será usado para punir estudante no MVP.
- **RF-040 [P1]:** opções de jogo visual (linha do tempo, reconstrução, escolha contextual) não devem alterar os textos nem o significado do exercício do qual vieram.

### 10.4 Progresso, XP, revisão e relatórios (RF-041 a RF-060)

- **RF-041 [P0]:** registrar tentativas com `user_id`, `question_id`, `content_version`, timestamps, resposta do usuário, número da tentativa, dica e resultado.
- **RF-042 [P0]:** cada questão responde à revisão publicada usada na sessão, mesmo se uma nova versão for ativada durante a tentativa.
- **RF-043 [P0]:** salvar progresso de missão com atualização transacional/idempotente; duplicações de requisições não geram XP duplo.
- **RF-044 [P0]:** definir `not_started`, `in_progress`, `completed` e `needs_review` separadamente para missão.
- **RF-045 [P0]:** exibir proporção de missões concluídas, perguntas respondidas e **domínio verificado**, como indicadores distintos.
- **RF-046 [P0]:** pontos (XP) devem usar valores determinísticos e auditáveis, sem depender de relógio do navegador.
- **RF-047 [P0]:** repetição pode gerar prática, mas não acumular XP ilimitado na mesma questão pelo mesmo usuário.
- **RF-048 [P0]:** estrelas/conquistas não devem basear-se em autoavaliação como se fosse acerto comprovado.
- **RF-049 [P0]:** lista pessoal de erros, revisão pendente e questões difíceis.
- **RF-050 [P0]:** cada erro mantém relação com tópico, capítulo e revisão de conteúdo.
- **RF-051 [P0]:** dashboard permite continuar missão interrompida.
- **RF-052 [P0]:** sessão concluída produz resumo claro: acertos automáticos, erros, autoavaliações e itens não avaliáveis.
- **RF-053 [P0]:** alterações no gabarito por revisão editorial jamais reescrevem silenciosamente o histórico; geram nova versão e eventual reprocessamento explícito.
- **RF-054 [P1]:** revisão adaptativa prioriza maior recorrência de erro e recência; algoritmo deve ser simples e reproduzível.
- **RF-055 [P1]:** streak usa fuso horário configurado ou navegador, documentado; perdas não punem nem bloqueiam conteúdo.
- **RF-056 [P1]:** conquistas por consistência, conclusão e melhoria verificável, sem exigir competição.
- **RF-057 [P1]:** estatísticas semanais por habilidade e capítulo.
- **RF-058 [P1]:** capítulo 28 representa revisão global/final boss, sem eliminar acesso a práticas anteriores.
- **RF-059 [P1]:** metas diárias opcionais, sem notificações obrigatórias.
- **RF-060 [P2]:** ranking privado opt-in, mostrando somente apelidos/autorização; não expor e-mails ou respostas individuais.

### 10.5 Administração de conteúdo e auditoria (RF-061 a RF-073)

- **RF-061 [P0]:** cada pacote de conteúdo possui `content_version`, hash de origem, estado de validação, data e responsável pela publicação.
- **RF-062 [P0]:** estados independentes: `machine_validated`, `editorial_approved`, `rights_cleared` e `published`; o último exige os anteriores apropriados ao público.
- **RF-063 [P0]:** selecionar exatamente quais capítulos/exercícios cada audiência pode receber.
- **RF-064 [P0]:** se algum item é retirado por erro, acesso futuro é bloqueado sem corromper histórico de tentativas.
- **RF-065 [P0]:** confirmar que API e cache não retornam teoria, questões ou gabaritos bloqueados/não autorizados.
- **RF-066 [P0]:** exercícios têm validação contra schema e IDs estáveis; importação falha em duplicidade.
- **RF-067 [P0]:** eventos administrativos relevantes (convite, revogação, publicação, alteração de resposta) deixam trilha de auditoria.
- **RF-068 [P1]:** painel editorial lista pendências por capítulo/página (tabela, imagem cortada, resposta controversa, numeração duplicada).
- **RF-069 [P1]:** editor compara revisão anterior, nova e notas com páginas do PDF de acesso privado.
- **RF-070 [P1]:** publicação exige checklist explícito, não apenas teste de JSON.
- **RF-071 [P1]:** importador de novos capítulos conserva dados-fonte originais e relacionamentos atuais.
- **RF-072 [P1]:** sistema registra mudança de licença/direitos por corpus/escopo de usuário.
- **RF-073 [P1]:** ambiente de homologação usa conteúdo fictício/desidentificado quando necessário e nunca replica dados pessoais sem controle.

## 11. Tipos de desafios e motor reutilizável

Uma **ambientação** não é um novo sistema de correção. Os tipos abaixo compartilham componentes reusáveis.

| Motor | Entrada | Correção | Uso |
|---|---|---|---|
| Verb Builder | sujeito + infinitivo + campo editável | forma morfológica validada/alternativas contextuais | -er/-ir/-re, tempos verbais |
| Fill in the Blank | frase com lacunas | palavras/expressões previstas + elisão | conjugação, pronomes, artigos |
| Match Pairs | duas colunas ou cartões | pares letra–enunciado/ID | vocabulário, tempos, equivalentes |
| Translate/Compose | frase em inglês → resposta francesa | padrão da editora + avaliação semântica/autorrevisão | tradução e resposta aberta |
| Transform Sentence | frase original → nova forma | revisão semântica ou regras específicas confiáveis | voz passiva, indireto, negativos |
| Reorder/Build | tokens/segmentos em ordem | sequência e alternativas editoriais | pronomes, conectores, sintaxe |
| Choose Context | pergunta contextual + opções | opção correta publicada | uso de tempos, classificações |
| Review Gauntlet | seleção de motores existentes | agregação com estado verificável | capítulo 28, revisões gerais |

**Regras:** um jogo só é habilitado para questões com dados suficientes. Não gerar distratores, flexões ou traduções como se fossem do livro sem revisão. Conteúdo com falhas de extração pode permanecer em `blocked` até normalização. Suportar entrada em francês com IME/teclado móvel, seleção de apóstrofo, acentos e edição livre.

### 11.1 Camadas do motor [PROPOSTO]

1. **Content adapter:** lê contratos atuais, aplica versões e fornece objeto normalizado `PlayableQuestion` sem alterar a origem.
2. **Interaction renderer:** seleciona componente React por `interaction_type` ou configuração revisada.
3. **Answer evaluator:** aplica política confiável, produz `evaluation_status` e motivo.
4. **Session manager:** controla ordem, tentativas, dicas, checkpoint e retomada.
5. **Progress service:** valida eventos e contabiliza XP/estrelas/indicadores no servidor.
6. **Review selector:** seleciona erros/pendências por regras auditáveis.

## 12. Mapa de mundos e capítulos

**[PROPOSTO]** nomes e temas visuais são conceitos de interface — os títulos da coluna do livro são a fonte; não se presume que o livro forneça narrativa, jogos ou ilustrações.

| # | Capítulo no livro (resumido) | Tema do mundo | Mecânica predominante |
|---:|---|---|---|
| 01 | Regular -er verbs | Verb Builder | Conjugar -er e preencher |
| 02 | -ir and -re verbs | Verb Factory | Selecionar radical/terminação |
| 03 | To be and to have | Être vs Avoir | Escolher contexto e conjugar |
| 04 | More irregular verbs | Time Machine | Reconhecer estruturas verbais |
| 05 | Devoir | Mission Control | Obrigação/necessidade |
| 06 | Pronominal verbs | Daily Routine | Montar pronome + verbo |
| 07 | Passé composé | Past Detective | Auxiliar/particípio |
| 08 | Imparfait | Memory Stories | Distinguir descrições passadas |
| 09 | Futur simple/antérieur | Future Predictor | Construir futuros |
| 10 | Plus-que-parfait | Timeline Puzzle | Ordenar eventos |
| 11 | Conditionals | What If? | Frases condicionais |
| 12 | Could/should/would | Modal Challenge | Interpretar modalidade |
| 13 | Subjunctive | Subjunctive Quest | Conjugar/selecionar gatilhos |
| 14 | Infinitive | Infinitive Lab | Verbo + preposição |
| 15 | Participles/gerund | Action Mixer | Transformar construções |
| 16 | Passé simple | Historical Chronicles | Reconhecer forma narrativa |
| 17 | Passive voice | Voice Transformer | Ativa → passiva |
| 18 | Indirect speech | Telephone Game | Direto → indireto |
| 19 | Imperative | Command Master | Produzir comandos |
| 20 | Articles/nouns | French Market | Artigos, gênero, plural |
| 21 | Pronouns | Pronoun Maze | Colocar pronomes |
| 22 | Adjectives/comparisons | Sentence Stylist | Concordar/comparar |
| 23 | Demonstrative/possessive | Whose Is It? | Referência/posse |
| 24 | Relative pronouns | Sentence Connector | Unir orações |
| 25 | Adverbs/time/location | Time & Place Quest | Expressões e localização |
| 26 | Numbers | Number Rush | Número cardinal/ordinal |
| 27 | Pot pourri | Grammar Escape Room | Regras mistas |
| 28 | Review exercises | Final Boss | Revisão cumulativa |

A tabela tem **28 propostas de ambientação**, **não 28 motores independentes**. Cada questão mantém seu `interaction_type` efetivo, mesmo que o tema do mundo sugira outra mecânica. A correspondência exercício ↔ componente depende de classificação editorial.

## 13. Modelo pedagógico

### 13.1 Estrutura proposta de cada capítulo

**World Intro → Theory Cards por subtópico → Exercícios como missões → Feedback → Revisão → Resumo e avanço.** Permitir ao estudante pular uma explicação já revisada, mas não expor parte bloqueada/editorialmente não publicada.

- Teoria: conceito em inglês, regra, forma, exemplos franceses, exceções, glossário relacionado.
- Missão: instrução do conjunto, questões do livro com IDs, tipo de jogo e meta de aprendizado.
- Feedback: indicação objetiva e explicação ancorada em trecho revisado.
- Remediação: retornar ao subtópico em que ocorreu o erro.
- Revisão: reapresentar erros sem esconder que a pergunta já foi tentada.
- Mastery: taxa verificável + número de respostas sem correção automática + tendência histórica.

### 13.2 Sequência, desbloqueio e liberdade

**[PROPOSTO]:** capítulos em ordem 1–28; a teoria publicada pode ser consultada livremente. Missão posterior recomendada após finalização da anterior, mas **não manter usuário preso por questão aberta ainda sem correção**. Capítulos poderão ser revisitados sempre. Estados `locked` devem diferenciar (a) não publicado, (b) sem direitos, (c) pré-requisito pedagógico, (d) bloqueio administrativo. Evitar gerar sensação de erro ao estudante quando o motivo é editorial.

### 13.3 Níveis de domínio [PROPOSTO]

- **Iniciante no assunto:** sem tentativa verificada.
- **Praticando:** tentativa ou sessão em andamento.
- **Concluiu:** todas as questões da missão foram respondidas, incluindo revisões abertas classificadas separadamente.
- **Domina (verificado):** no mínimo 80% dos itens **objetivamente avaliáveis** corretos na melhor tentativa concluída, com denominador e cobertura exibidos.
- **Precisa revisar:** abaixo do limiar ou com recorrência de erro.

Não promover domínio de um capítulo quando a maioria dos itens depende de autoavaliação não verificada. Mostrar `verifiable_count / total_count`.

## 14. Política de avaliação e resposta

### 14.1 Estados de avaliação

| Estado | Significado | Conta como acerto verificado? |
|---|---|---|
| `correct` | Avaliação determinística válida | Sim |
| `incorrect` | Resposta objetivamente incorreta segundo regra editorial aprovada | Não |
| `needs_review` | Comparação insuficiente | Não |
| `self_reviewed` | Usuário comparou à chave e declarou seu julgamento | **Não**, em métricas verificadas |
| `ungradable` | Fonte/forma de avaliação ainda não aprovada | Não |
| `blocked` | Questão não licenciada/publicada ou com erro bloqueante | Não deve ser servida |

**O livro não fornece todas as paráfrases válidas.** Para tradução/resposta aberta, mostrar chave de referência autorizada e pedir autoavaliação explicitamente rotulada, ou usar revisão humana se disponível. Não usar LLM como juiz automático infalível no MVP. Uma futura assistência por IA exigiria aprovação explícita, controle de dados enviados, custos, explicabilidade e revisão humana.

### 14.2 Pipeline [PROPOSTO]

**Input → normalização Unicode segura → regras por tipo → alternativas editoriais aprovadas → resultado + evidência/razão → persistência transacional.** Pergunta textual deve manter ``source_raw_prompt`` (origem), ``prompt`` (apresentação corrigida) e ``answer.source_key`` (gabarito impresso). Respostas de múltiplos termos, contrações e gênero não devem ser normalizadas de forma destrutiva.

### 14.3 Exemplos obrigatórios de testes

- `ch01-ex06-q06` requer `J’habite`, com reescrita de `Je` + lacuna, não concatenação literal.
- `ch01-ex10-q06` prioriza instrução individual informal `tu`.
- Pareamento `ch01-ex07` deve preservar 10 alternativas a–j e correspondência correta.
- Capítulo 26 tem marcador impresso repetido; preservar IDs de exercícios estáveis.
- Capítulo 28, exercício 28·15, contém número repetido; não mesclar itens.
- Resposta de tradução correta porém diferente da frase impressa **não** pode ser marcada automaticamente como incorreta quando o mecanismo não comprova equivalência.
- Acentos/sinais significativos preservados: `a` ≠ `à` em contextos pertinentes; elisões e concordância avaliadas conforme regra publicada.

## 15. Gamificação e economia de pontos

### 15.1 MVP [PROPOSTO]

- **XP:** +10 pela primeira resposta objetiva correta em uma questão por usuário e versão, +5 ao concluir uma missão com integridade; perguntas abertas autoavaliadas podem receber +2 por estudo, mas **não** pontos de domínio. Ganhos repetidos da mesma questão/versão nunca duplicam.
- **Estrelas:** 3 quando ≥ 90% de acertos verificados na missão e sem dica; 2 quando ≥ 80%; 1 quando conclusão íntegra sem pontuação suficiente; 0 se não concluída. Quando acertos verificados forem insuficientes para representar a missão, mostrar `not rated` em vez de atribuir 3 estrelas indevidas.
- **Nível visual:** derivado de XP total por limiares versionados, sem poderes, compras ou benefícios de competição.
- **Badge inicial:** primeira missão, primeiro capítulo, sequência de estudos, revisão concluída. Critérios documentados, não aleatórios.
- **Streak P1:** estudo significativo em dias consecutivos, sem penalização por esquecer um dia e com fuso estável.
- **Boss P1:** capítulo 28 tem 35 conjuntos, **345 questões** cadastradas; oferecer checkpoints, não exigir responder todas em uma sessão.
- **Sem corações/vidas punitivas no MVP:** não bloquear estudo por erro nem incentivar uso indevido de conta/pagamento.
- **Sem moedas conversíveis, compras ou sorteios:** evitar complexidade/monetização.

### 15.2 Segurança das métricas

XP calculado/validado no serviço confiável, nunca aceitando números arbitrários do cliente; transações idempotentes por `attempt_id + question_id + reward_type + content_version`; auditoria de concessão e reversões documentadas; contadores derivados de eventos persistentes e reconstruíveis.

## 16. Arquitetura técnica — proposta de referência

### 16.1 Stack acordada e opções

| Camada | Tecnologias | Status |
|---|---|---|
| Frontend SPA | **React + Vite + TypeScript** | **[DECIDIDO]** |
| Hospedagem web | **Vercel** (tier compatível com uso permitido) | **[DECIDIDO]** |
| Autenticação/DB | **Supabase Auth + PostgreSQL + RLS** | **[DECIDIDO]** |
| UI | Tailwind CSS + shadcn/ui, componentes acessíveis | [PROPOSTO / direção previamente preferida] |
| Roteamento | React Router | [PROPOSTO] |
| Estado remoto | TanStack Query; mínimo estado local com hooks ou Zustand quando justificar | [PROPOSTO] |
| Formulários | React Hook Form + Zod onde útil | [PROPOSTO] |
| Animacões | CSS + Motion apenas para feedback leve | [PROPOSTO] |
| Interação drag/drop | dnd-kit somente para desafios que realmente usam arraste | [PROPOSTO] |
| Renderização Markdown | Biblioteca com sanitização e tabela GFM, sem HTML arbitrário | [PROPOSTO] |
| Backend de regras | Funções SQL/RPC com RLS e Edge Functions/endpoint serverless apenas quando necessário | [PROPOSTO] |
| Gráficos | Biblioteca leve ou SVG próprio, só quando justificável | [PROPOSTO] |
| PWA | Instalação opcional, sem cópia do livro em cache público | [PROPOSTO P1] |
| Phaser | **Não adotar no MVP**; avaliar só para minigame com justificativa técnica | [DECISÃO PROPOSTA] |

**Por que React e não Angular:** o usuário escolheu React para esse aplicativo; o ecossistema de jogos/componentes leves, rotas SPA e Vercel atende ao escopo. Não reabrir comparação de frameworks sem mudança de requisito.

### 16.2 Diagrama lógico

```text
Browser (React/Vite; UI pública mínima)
  ├─ Supabase Auth: identidade e renovação de sessão
  ├─ API de conteúdo privado: controle de audiência + versão + direitos + status editorial
  ├─ API de sessão/progresso: valida respostas, grava tentativas, recalcula XP
  └─ UI: trilha, teoria, missão, revisão e perfil
                 ↓
       Supabase PostgreSQL (RLS)
       ├─ acesso e perfis
       ├─ conteúdo e versões aprovadas
       ├─ tentativas/eventos de estudo
       ├─ progresso/XP/cache de projeções
       └─ publicação e auditoria administrativa
```

As APIs podem usar funções Supabase ou endpoints serverless, desde que política de leitura/escrita e privilégio mínimo sejam preservados. **Não adicionar servidor dedicado Java/Node ou microserviços** por padrão para esta aplicação pequena.

### 16.3 Separação entre corpus e código público

Nunca tratar `chapters/NN/*.json` do repositório privado como assets que Vite importaria diretamente para o bundle. Vite gera código acessível a qualquer pessoa que receba o build, mesmo que a origem Git seja privada. O importador autorizado ingere uma **versão publicada/permitida** para armazenamento privado; o frontend recupera somente conteúdo filtrado por acesso e estado editorial. Toda pergunta/gabarito retornado ao navegador fica tecnicamente acessível ao usuário autorizado e não é possível impedir cópia definitiva no client; regras jurídicas permanecem necessárias.

## 17. Modelo de dados — mínimo útil

**Diretriz:** o PostgreSQL é fonte da verdade do progresso. Conteúdo do livro exige camada de distribuição controlada; modelo abaixo é lógico, não migração já implementada.

| Entidade | Campos principais propostos | Regras |
|---|---|---|
| `profiles` | `user_id PK/FK auth.users`, `display_name`, `role`, `timezone`, `preferences` | RLS por próprio usuário; papel admin nunca promovido pelo cliente |
| `access_grants` | `id`, `email_normalized`, `user_id?`, `status`, `invited_by`, `expires_at` | Admin somente; revogação efetiva |
| `content_releases` | `id`, `version`, `source_hash`, `editorial_status`, `rights_status`, `published_at`, `audience` | Publicação atômica e versionada |
| `chapters` | `id`, `release_id`, `order`, `title`, `availability` | Identidade estável por edição |
| `topics` / `subtopics` | `id`, `chapter_id`, `parent_topic_id?`, `source_pages` | FKs e ordem |
| `exercise_sets` | `id`, `chapter_id`, `instruction`, `interaction_type`, `grading_policy`, `content_version` | Instrução distinta de perguntas |
| `questions` | `id`, `exercise_id`, `prompt`, `source_reference`, `render_config`, `review_status` | Fonte protegida, consulta autorizada |
| `answer_keys` | `question_id`, `content_version`, `reference_answer`, `accepted_variants`, `policy` | Não retornar chave antes da política de revelação; sem promessas de segredo no cliente |
| `study_sessions` | `id`, `user_id`, `content_version`, `exercise_id`, `state`, `started_at`, `completed_at?` | Um usuário não acessa sessão alheia |
| `question_attempts` | `id`, `session_id`, `question_id`, `attempt_no`, `response`, `evaluation_status`, `hints_used` | Histórico imutável ou append-only quando viável |
| `progress` | `user_id`, `chapter_id`, `exercise_id`, `best_score`, `stars`, `last_position`, `updated_at` | Projeção recomputável, não fonte primária de pontuação |
| `xp_ledger` | `id`, `user_id`, `source_attempt_id`, `event_type`, `amount`, `unique_key` | Evitar double spend/double reward |
| `achievements` | `id`, `rule_version`, `name`, `criteria` | Metadado do badge |
| `user_achievements` | `user_id`, `achievement_id`, `earned_at` | Unique(user, badge) |
| `editorial_issues` | `id`, `content_id`, `pdf_page`, `severity`, `status`, `resolution` | Acesso editor/admin |
| `audit_log` | `id`, `actor_id`, `action`, `target`, `timestamp` | Sem conteúdo sensível desnecessário |

**Restrições:** chaves estrangeiras e unicidade de `(user_id, question_id, content_version, reward_type)` conforme caso; timestamps UTC no banco; interface com fuso configurável; migrações versionadas; IDs existentes de capítulo/exercício/questão preservados; não armazenar conteúdo completo ou token sensível em logs/analytics.

## 18. Acesso, políticas RLS e segurança

### 18.1 Regras obrigatórias

- `profiles`: aluno só lê/atualiza os campos permitidos do próprio perfil; papel não é alterável por usuário.
- `study_sessions`, `question_attempts`, `progress`, `xp_ledger`: `auth.uid() = user_id` em leitura; escrita validada por função confiável para eventos de score/XP, impedindo fraude direta.
- `access_grants`: somente admin para leitura/escrita; público não consulta se e-mail está convidado.
- `chapters`, `questions`, `answer_keys`: políticas de leitura por usuário autorizado **e** release/audience editorial/legalmente permitidos.
- `editorial_issues` e `audit_log`: acesso somente à operação de administração.
- Views, RPC e Edge Functions devem respeitar autorização, mesmo com `security definer`/service role.
- `service_role`, tokens de administração, chaves de e-mail e outras credenciais só no servidor/secret manager, **jamais** em variáveis `VITE_*` ou localStorage.

### 18.2 Ameaças e controles

| Risco | Mitigação |
|---|---|
| Usuário lê dados de outro estudante | RLS + testes com dois usuários reais de teste |
| Aluno injeta XP/progresso | Funções confiáveis e ledger idempotente |
| Conta não convidada acessa conteúdo | Allowlist server-side e checagem em toda consulta |
| Vazamento do livro em deploy | Não importar JSON do livro no bundle, não publicar assets/release sem autorização |
| XSS por Markdown ou texto de usuário | Renderer seguro, sanitização, CSP; evitar HTML arbitrário |
| SQL injection | Queries parametrizadas/Supabase client, sem SQL concatenado |
| Secrets vazam no frontend/CI | Scans, escopos mínimos, variáveis privadas |
| Token/link de convite exposto | Expiração, uso restrito, HTTPS, não logar link integral |
| Dados pessoais em analytics/log | Minimização, anonimização/pseudonimização; políticas de retenção |
| Mudança de edição do conteúdo altera score | content_version fixo por sessão, migração explícita |
| Disponibilidade do free tier | Monitorar quotas; backups e plano de migração |

### 18.3 Dados pessoais e LGPD

Coletar somente e-mail de login, identificador, apelido, preferências e dados de estudo necessários. Ter política de privacidade aplicável e instrução de exclusão/exportação; controlar período de retenção de logs e backups; evitar usar respostas de alunos para treinamento de modelos externos por padrão. Se o projeto for expandido além de uso estritamente pessoal, realizar avaliação de obrigações e consentimentos adequados.

## 19. Requisitos não funcionais e usabilidade

| Área | Requisito / meta inicial [PROPOSTO] |
|---|---|
| Responsividade | Funcionar de 320px a desktop largo; sem rolagem horizontal para ações |
| Performance | LCP p75 < 2,5 s em rede de referência; TTI fluido em Android intermediário; orçamentos ajustados por medição |
| Navegação | Dashboard → continuar em no máximo três ações |
| Animação | Feedback curto, sem travar resposta; opção reduzida via `prefers-reduced-motion` |
| Acessibilidade | **WCAG 2.2 AA como alvo**; foco visível, rótulos, contraste, leitores de tela |
| Teclado | Todos os minijogos utilizáveis sem arrastar com mouse/toque |
| Erros | Mensagens humanas, ação de retry, sem perda silenciosa de tentativa |
| Internacionalização | UI inicial em inglês; design pronto para strings externas; francês renderizado corretamente |
| Persistência | Pontuação e sessão armazenadas de modo idempotente |
| Privacidade | Nenhum endpoint público retorna questões/gabaritos protegidos |
| Compatibilidade | Chrome/Edge/Firefox/Safari atuais e Android/iOS via navegador, sem dependência de browser experimental |
| Operação | Dev / preview / produção isolados; supabase local ou projeto separado quando viável |
| Observabilidade | Logs estruturados de erros, duração e operação; não registrar respostas ou e-mails em logs indiscriminadamente |
| Custos | Preferência pelo free tier; sem assumir quotas atuais como garantidas; alertas e limites de orçamento |
| Dependências | Preferir soluções consolidadas e gratuitas; evitar overengineering |

## 20. Acessibilidade detalhada

Interações arrastáveis devem ter seleção alternativa; respostas instantâneas precisam de anúncio `aria-live` não intrusivo; foco após feedback retorna ao controle correto; modal não prende foco incorretamente; botões não dependem somente de cor; conteúdo francês recebe idioma `lang=fr` quando necessário; respeitar `prefers-reduced-motion`; permitir zoom de 200% sem perda funcional; teclado virtual no celular não deve encobrir campo/resposta; imagens decorativas possuem texto alternativo apropriado ou `aria-hidden`; capítulos não devem ser diferenciados apenas por tons visuais.

## 21. API e contratos — desenho de alto nível

- **GET /me /access:** identidade, acesso permitido e preferências; nunca revelar grant de outras pessoas.
- **GET /catalog:** apenas releases disponíveis à audiência do usuário; metadados e progresso pessoal.
- **GET /chapters/:id:** título, estado, tópicos, missões e teoria autorizada.
- **POST /sessions:** inicia tentativa para release fixo e retorna idempotency key.
- **POST /sessions/:id/answers:** valida/avalia resposta e registra evento, com proteção a replay.
- **POST /sessions/:id/complete:** consolida sessão, atualiza ledger/projeção, idempotente.
- **GET /progress e /review:** histórico e erros do usuário autenticado.
- **POST /admin/content-releases:** somente admin; exige gates editorial e legal.
- **POST /admin/invitations e /admin/revoke:** somente admin.

**Nota:** são contratos conceituais, não endpoints existentes. A implementação pode consolidar consultas via Supabase RPC para reduzir código, preservando os resultados funcionais. `answer_key` só deve ser revelada conforme estado da questão e permissão do usuário; ocultar no browser não protege uma chave já entregue.

### 21.1 Erros padronizados

`UNAUTHORIZED` (401), `FORBIDDEN` (403), `CONTENT_UNPUBLISHED` (404/403 sem leak), `CONTENT_VERSION_CONFLICT` (409), `SESSION_ALREADY_COMPLETED` (409 ou resposta idempotente), `INVALID_ANSWER_FORMAT` (422), `RATE_LIMITED` (429), `SERVER_ERROR` (500). Nunca expor detalhes SQL, IDs de outros usuários ou material bloqueado.

## 22. Administração e publicação de conteúdo

### 22.1 Estados de conteúdo

**draft → machine_validated → editorial_reviewed → rights_cleared → published → deprecated/blocked**. Na implementação real, editorial, técnico e direitos devem ser eixos independentes; esta sequência é um fluxo didático, não um único campo que possa esconder dependências.

- **Machine gate:** schema, integridade de IDs, contagem e fontes.
- **Editorial gate:** conferência das imagens do PDF, tabelas, explicações, questões, variantes e respostas.
- **Rights gate:** evidência de direito/autorização para audiência específica e forma de uso.
- **Publication gate:** todos aplicáveis aprovados, versão congelada, RLS testada.
- **Rollback:** despublicar versão sem apagar histórico, permitir acesso a progresso com referências históricas limitadas.

### 22.2 Conteúdo progressivamente liberável

MVP poderá disponibilizar o capítulo 1 **somente depois de revisado e autorizado no contexto do usuário alvo**. Os demais capítulos continuam no catálogo como `planned` ou `under_review`, sem textos restritos. A meta geral é suportar os 28 capítulos; **não é critério de lançar o código inicial ter todos os capítulos editorialmente prontos**.

### 22.3 Checklist de lançamento por capítulo

Fonte e hash; título; ordem dos subtópicos; teoria completa; conjugações/vocabulário em colunas corretas; cada exercício/instrução; cada questão e opção; gabarito; variantes aceitas; IDs/páginas; anomalias tratadas; testes automáticos; revisão humana; autorização de uso; smoke test no app; aprovação registrada. Ver `docs/editorial-qa-checklist.md`.

## 23. Analytics, eventos e suporte

Eventos mínimos (sem registrar texto da resposta): `session_started`, `question_answered`, `question_retried`, `hint_used`, `session_completed`, `review_started`, `chapter_completed`, `content_access_denied`, `editorial_blocked`, `sync_failed`. Atributos: `user_id` interno, capítulo, tipo de exercício, status, versão, duração agregada e erro técnico. Para diagnóstico de privacidade, usar IDs internos e evitar logar texto do livro e respostas pessoais.

Feedback interno "Report a content error" deve registrar questão, versão e motivo, sem liberar conteúdo em serviço público de terceiros. Administrador recebe lista de problemas a corrigir com source PDF page.

## 24. Testes e qualidade

### 24.1 Pirâmide pragmática

- **Unitários:** avaliação de formas, normalização, XP, progressão, seleção de revisão e erros.
- **Contratos/schema:** validar `manifest`, capítulo, exercícios, IDs, releases e migrações.
- **Integração:** Supabase Auth, RLS, sessões/ledger e importação de conteúdo.
- **E2E:** convite → login → teoria → missão → correção → conclusão → logout → retorno.
- **Acessibilidade:** axe/inspeção humana, teclado, foco, leitores de tela por jornadas principais.
- **Segurança:** acesso não autorizado ao conteúdo; usuário A tenta ler usuário B; tentativas de forjar score; HTML malicioso na teoria.
- **Editorial:** confronto imagem de fonte × teoria × questão × resposta, feito à parte de testes automáticos.
- **Regressão:** campos especiais capítulo 1, capítulo 26, capítulo 28 e 29 fronteiras de teoria recuperadas.

### 24.2 Pipeline CI/CD recomendado

PR → lint/format/typecheck → unit → build → testes de contrato e corpus → RLS integration em ambiente de teste → E2E smoke → revisão humana → merge → preview/prod conforme aprovação. Usar GitHub Actions, sem quebrar validadores Python existentes. Previews da Vercel **não devem incluir conteúdo do livro sem controles adequados**. Se não houver autenticação efetiva e direitos, usar fixtures originais/fictícias.

### 24.3 DoR, DoD e gates

**Definition of Ready:** requisitos e dados de exemplo permitidos, critérios de aceite, dependências, impacto de privacidade e testes especificados.

**Definition of Done:** teste automatizado + revisão de código + smoke test responsivo/acessível + documentação + segurança + verificação de fluxo + CI aprovado; para conteúdo, adicionar editorial/rights gates. Nenhuma fase avança com omissão não documentada.

## 25. Roadmap, entregas e dependências

As Fases A/B/C anteriores são a **construção da base de conteúdo**, não o desenvolvimento da aplicação. O roadmap abaixo é **proposta** a ser refinada antes de gerar issues.

| Etapa | Entrega | Gate de saída |
|---|---|---|
| 0. Direitos e revisão piloto | Definir audiência legal, revisar capítulo piloto, criar fixtures originais se necessário | Autorização/revisão documentadas |
| 1. Fundação web | Vite/React/TS, design system, rotas, auth privado, Supabase/RLS, ambiente de teste | Login/logout, testes A/B, zero acesso indevido |
| 2. Leitor e trilha | Mapa de capítulos, capítulo 1 com dados publicados/autorizados, leitor, estados de acesso | UX + fonte revisada + desempenho |
| 3. Motor de exercícios | Fill blank, matching, escolha, tradução/rewrite seguro, feedback | Casos capítulo 1 e jogos de teclado aprovados |
| 4. Progresso e XP | Sessões, ledger, tentativa, retomada, estrelas e histórico | Idempotência e isolamento aprovados |
| 5. Revisão e gamificação | Erros, revisões, conquistas iniciais, metas | Métricas verificáveis sem falso domínio |
| 6. Expansão editorial | Disponibilização gradual de novos capítulos e referências | Gates por capítulo e direitos específicos |
| 7. Boss e acabamento | Revisão cumulativa, personalização, PWA opt-in | E2E, acessibilidade e testes de carga básica |

**Não iniciar 28 minijogos isolados.** Entregar um vertical slice com um capítulo real autorizado/fixture primeiro; expandir apenas quando motor e correção forem validados.

## 26. Critérios de aceitação do MVP (alto nível)

| ID | Cenário | Aceite |
|---|---|---|
| AC-01 | Pessoa fora da allowlist abre a app/API | Login/dados privados negados |
| AC-02 | Dois estudantes fazem a mesma missão | Tentativas/progresso/XP totalmente separados |
| AC-03 | Estudante volta após atualizar a página | Retorna ao ponto consistente, sem duplicação |
| AC-04 | Usuário envia a mesma resposta duas vezes | Idempotência e XP sem duplicação |
| AC-05 | Resposta literal com acento errado | Avaliação contextual, nunca remoção cega de acento |
| AC-06 | Exercício 1·6 q6 | Substituição `Je`→`J’` funciona e explica exceção |
| AC-07 | Exercício 1·10 q6 | Instrução informal individual sobrepõe `vous` |
| AC-08 | Tradução aberta alternativa | Não é punida automaticamente sem regra semântica confiável |
| AC-09 | Capítulo em revisão editorial | Não expõe conteúdo nem gabarito |
| AC-10 | Obra sem autorização para compartilhar com convidados | Conteúdo correspondente não é publicado para convidados |
| AC-11 | Usuário tenta `SELECT` de dados de outro usuário | RLS bloqueia |
| AC-12 | Acessibilidade de missão | Toda interação executável sem mouse ou drag obrigatório |
| AC-13 | Conteúdo revisado muda de versão | Sessões antigas seguem versionadas, relatório explica mudança |
| AC-14 | Página cortada/coluna ambígua | Item fica bloqueado ou rotulado não confiável, sem invenção |
| AC-15 | App importada no Vercel | Bundle público não contém corpus editorial protegido |
| AC-16 | Chapter 28 publicado futuramente | Checkpoint permite interromper e continuar 345 questões |
| AC-17 | Migração em staging | RLS e integridade de conteúdo mantidas |
| AC-18 | GitHub PR | CI verde, checklist técnico e editorial aplicável sem gaps ocultos |

Critérios pormenorizados e testáveis por recurso estão em `docs/PRD-IMPLEMENTATION-PLAN.md`.

## 27. Riscos e mitigação

| Risco | Impacto | Ação |
|---|---|---|
| Direitos autorais | Impede disponibilização a amigos/na web | Consulta/licença e conteúdo alternativo autorizado |
| Fonte com erro visual/extração | Ensinar conteúdo incorreto | Gate editorial separado; revisão de páginas e tabelas |
| Tradução livre e respostas alternativas | Falsos negativos | Self-review/pendente, nunca exatidão artificial |
| Escopo de 28 minijogos | Overengineering e atraso | 6–8 motores reusáveis, temas por capítulo |
| Supabase RLS mal configurado | Exposição de dados/conteúdo | Testes de acesso cruzado e políticas server-side |
| Free tier muda ou pausa | Indisponibilidade | Backups e métricas, quotas reavaliadas em implantação |
| Build entrega corpus | Redistribuição indevida | Conteúdo servido por API privada, não em assets públicos |
| Gamificação incentiva chutes | Domínio artificial | Separação XP/avaliação objetiva, política anti-farm |
| Progressão quebra após nova versão | Histórico incoerente | IDs e releases imutáveis por sessão |
| AI-assisted code | Bugs em migrações/segurança | PRs pequenos, testes, verificação humana e documentação |

## 28. Decisões, hipóteses e questões abertas

### 28.1 Já decidido e não deve ser silenciosamente alterado

- Base inglesa → objetivo francês; narrativa educacional baseada na ordem dos 28 capítulos.
- React, Vite, TypeScript, Supabase/PostgreSQL/RLS e hospedagem pretendida na Vercel.
- Repositório privado, uso pessoal e possível acesso de poucos convidados com progresso individual.
- Gamificação com missões/jogos reaproveitáveis, sem criar 28 engines diferentes.
- Conteúdo A/B/C em Markdown/JSON com origem rastreável; preservar fonte/gabaritos e exceções.
- Verificação obrigatória ao final das etapas; CI não equivale a revisão visual.
- Evitar custos e arquitetura excessiva; foco em simplicidade, manutenção e código apto a IA.

### 28.2 Propostas que requerem validação do proprietário

| Questão | Proposta default |
|---|---|
| Nome definitivo, marca e identidade visual | French Grammar Quest, estilo de jornada de mundos |
| Provedor principal de login | Magic link por e-mail; OAuth opcional se realmente necessário |
| Liberação de capítulos | Teoria consultável; missões sequenciais com flexibilidade para revisão |
| XP e estrelas | Fórmulas do `15`, versionadas |
| Ranking/social | Fora do MVP, opt-in futuro |
| Revisão adaptativa | Erros recorrentes/recência, sem IA paga |
| Visibilidade dos gabaritos | Após tentativa/submissão e conforme política específica |
| PWA | Pós-MVP, sem cache persistente de material de terceiro por padrão |
| Administrativo/editorial | MVP com aprovação mínima, painel avançado depois |
| IA para correção | Não usar como avaliador automático no MVP |
| Metas de performance e analytics | Validar após medições com dispositivos reais |
| Direito de distribuir exercícios do livro aos convidados | **Não presumido; exigirá evidência antes de habilitar acesso** |

## 29. Entregáveis documentais e próxima ação

Este PRD deve ser versionado em `docs/PRD.md` junto do plano de execução `docs/PRD-IMPLEMENTATION-PLAN.md`. O documento é instrução de produto para futuros ciclos de desenvolvimento, **não autorização para implementar aplicação ou redistribuir o livro**.

**Próxima ação recomendada:** validar decisões propostas e o gate de direitos, criar um vertical slice com exemplos originais/autorizados e definir prioridades das primeiras issues. Só depois habilitar conteúdo fonte revisado para audiência autorizada.

## 30. Referências internas essenciais

- `manifest.json` — 28 capítulos e fonte.
- `schemas/chapter.schema.json` e `schemas/exercise.schema.json` — contratos atuais, não confundir com banco proposto.
- `reports/phase-c-machine-audit.json` — totais auditados automaticamente.
- `reports/phase-c-final-validation.md` — riscos e pendências editoriais.
- `docs/editorial-qa-checklist.md` — revisão visual e aceite por capítulo.
- `docs/ai-integration-guide.md` — instruções para agentes de IA.
- `docs/content-workflow.md` — governança do corpus.
- `NOTICE.md` — titularidade e restrições de material de terceiros.
- `docs/PRD-IMPLEMENTATION-PLAN.md` — histórias, backlog, critérios de aceite e sequência de desenvolvimento.

---

**Estado do documento:** especificação detalhada pronta para revisão do proprietário. Escopo técnico e proposta de UX definidos; aprovação editorial/legal e detalhes abertos mantidos transparentes.
