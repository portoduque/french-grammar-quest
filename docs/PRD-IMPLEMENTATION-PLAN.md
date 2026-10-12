# French Grammar Quest — Plano de implementação, backlog e critérios de aceite
> **Complemento operacional de:** [PRD principal](./PRD.md) · **Estado:** planejamento proposto, sujeito à validação. Não é evidência de implementação. · **Regra central:** o código da app e o conteúdo editorial são trilhas distintas de aprovação.

## 1. Propósito e instruções para agente desenvolvedor

Implementar incrementalmente a plataforma French Grammar Quest a partir do PRD e da base já existente. Trabalhar com mudanças pequenas, testáveis e revisáveis, sem adicionar tecnologias não justificadas. O repositório tem conteúdo de livro protegido; **não enviar esses arquivos em solicitações a serviços externos ou bundles frontend, nem disponibilizá-los a usuários convidados sem autorização apropriada**.

**Fontes em ordem de precedência:** decisões explícitas do usuário → `docs/PRD.md` → contratos `schemas/*.schema.json` + corpus atual → decisões propostas do plano. Diante de conflito ou ausência de dados: registrar divergência, apresentar alternativas, **não inventar** texto de livro, correção de língua ou aceite do usuário.

Antes de criar código, registrar `docs/implementation-decisions.md` (novo documento, a ser criado futuramente) com decisões [PROPOSTO] aprovadas e prioridades. O PRD não autoriza alterar a base atual nem iniciar implementação sem nova solicitação.

## 2. Estrutura sugerida de aplicação (monólito de frontend e backend gerenciado)

```text
/
├── docs/
│   ├── PRD.md
│   ├── PRD-IMPLEMENTATION-PLAN.md
│   ├── ai-integration-guide.md
│   └── ...
├── chapters/                        # fonte privada original, NÃO importar em bundle
├── references/                      # fonte privada, não publicar diretamente
├── schemas/                         # contratos de corpus existentes
├── scripts/                         # auditores já existentes
├── src/                             # só depois de autorização para app
│   ├── app/                          # Router, providers, guards de interface
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── learning-path/
│   │   ├── theory/
│   │   ├── exercise-engine/
│   │   │   ├── interactions/
│   │   │   ├── grading/
│   │   │   └── sessions/
│   │   ├── review/
│   │   ├── progress/
│   │   ├── achievements/
│   │   └── admin/
│   ├── components/ui/
│   ├── lib/supabase/
│   ├── contracts/                    # DTO do app, versionados
│   └── styles/
├── supabase/
│   ├── migrations/
│   ├── seed/                          # APENAS fixtures originais/licenciadas para teste
│   ├── functions/                     # somente quando regra confiável exigir servidor
│   └── tests/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── accessibility/
└── .github/workflows/
```

**Não impor o diretório acima enquanto não existir aplicação.** Preservar scripts Python, arquivos Markdown/JSON, hashes, IDs e o CI existente. Não criar um serviço Spring Boot separado sem requisito novo. Compartilhar lógica de validação apenas quando fizer sentido; não tentar executar Python do corpus no browser.

## 3. Plano de entregas e gates

### Entrega 0 — Fundação editorial e autorização

**Objetivo:** impedir que a pressa para criar interface publique conteúdo incorreto ou protegido.

| Task | Requisito | Dependência | Critério de aceite |
|---|---|---|---|
| P0-01 | Matriz de audiência/licença | Revisar finalidade de uso e direitos | Registrar quem pode ler **qual corpus**, base jurídica/licença e se o conteúdo será substituído |
| P0-02 | Revisão do capítulo piloto | PDF autorizado local | Tópicos, tabelas, 10 exercícios e 100 gabaritos revistos visualmente ou marcados individualmente como bloqueados |
| P0-03 | Versão editorial do conteúdo | P0-02 | Estados máquina/editorial/direitos independentes; conteúdo rascunho não exposto |
| P0-04 | Fixtures sintéticas | P0-01 | Jogo demonstrável sem textos de livro publicados; corretas e expressamente fictícias |
| P0-05 | Documento de decisões MVP | Aprovação | Escolhas em aberto marcadas aprovado/rejeitado/adiado |

**Gate E0:** conteúdo de teste seguro disponível; fluxo jurídico/editorial conhecido; pendências documentadas. Sem isso, é permitido trabalhar no esqueleto técnico sem fonte distribuída.

### Entrega 1 — Setup, Auth e RLS

| Task | Requisito | Dependência | Critério de aceite |
|---|---|---|---|
| P1-01 | React + Vite + TypeScript | Nenhuma | App sobe local com README claro e build reproduzível |
| P1-02 | Design system responsivo | P1-01 | Tokens, tema, tipografia, foco, botões, inputs e estados base |
| P1-03 | Configuração Supabase | P1-01 | Variáveis públicas vs secretas separadas; dois ambientes isolados |
| P1-04 | Auth e convite restrito | P1-03 | Usuário fora da allowlist não consegue acessar conteúdo/conta, nem por API |
| P1-05 | Perfis e papéis | P1-04 | Student/admin com privilégio mínimo; não é possível autopromover papel |
| P1-06 | RLS do progresso | P1-05 | Usuário A não lê nem grava dados do usuário B |
| P1-07 | Logs e tratamento de erro | P1-03 | Sem tokens/texto sensível em log; sessão inválida tratada |
| P1-08 | CI inicial | P1-01 | typecheck, lint, build e testes sem substituir auditores Python |

**Gate E1:** 2 contas de teste, RLS validada, convite/expiração/revogação testados, CI verde; sem liberação de conteúdo protegido.

### Entrega 2 — Leitor, catálogo e motor mínimo

| Task | Requisito | Dependência | Critério de aceite |
|---|---|---|---|
| P2-01 | Manifest importado como catálogo | E1 | 28 capítulos e títulos/ordem correspondem ao manifesto |
| P2-02 | Política de publicação de conteúdo | E0+E1 | Somente versões autorizadas são retornadas por API |
| P2-03 | Mapa de capítulos | P2-01 | Estados bloqueado/revisando/publicado/iniciado/concluído distinguíveis |
| P2-04 | Chapter overview | P2-01 | Tópicos e missões em ordem, sem presumir 10 questões |
| P2-05 | Leitor Markdown | P2-02 | Tabelas, acentos, exemplos e sanitização; sem XSS |
| P2-06 | Componente `fill_blank` | P2-04 | Questões simples com teclado e feedback |
| P2-07 | Componente `matching` | P2-04 | Seleção e teclado; ordem das alternativas e labels preservados |
| P2-08 | `translation`/resposta aberta | P2-04 | Não marca frase válida diferente da chave como errada de modo automático |
| P2-09 | `sentence_rewrite` | P2-04 | Permite frase completa e correção conforme política |
| P2-10 | Feedback/referência de teoria | P2-05–09 | Explica resposta somente quando informação autorizada/revisada |

**Gate E2:** demonstrar uma missão por tipo implementado usando fixtures e, quando autorizado, corpus revisado; teclado e navegação sem perda de dados.

### Entrega 3 — Sessões, pontuação, revisão

| Task | Requisito | Dependência | Critério de aceite |
|---|---|---|---|
| P3-01 | Sessões e tentativa versionada | E2 | `content_version` fixo durante sessão |
| P3-02 | Autosave seguro | P3-01 | Refresh/restauração sem duplo envio |
| P3-03 | Avaliador determinístico | E2 | Unicode, acentos e morfologia contextuais; casos de regressão |
| P3-04 | Resposta livre pendente/self-review | P3-03 | Não contamina score verificado |
| P3-05 | XP ledger idempotente | P3-01 | Replay de mesma submissão concede XP uma vez |
| P3-06 | Estrelas/domínio verificável | P3-05 | Separação correta entre completa/avaliada/autoavaliada |
| P3-07 | Dashboard individual | P3-01 | Continue learning e progresso corretos |
| P3-08 | Histórico de erros | P3-03 | Lista paginada e filtrável, só própria |
| P3-09 | Revisão direcionada | P3-08 | Seleciona erros reais sem comprometer fonte |
| P3-10 | Testes de migração de conteúdo | P3-01 | Histórico não muda silenciosamente após release novo |

**Gate E3:** fluxo completo login → conteúdo permitido → responder → salvar → sair → voltar → revisar → recomeçar; validação com dois usuários e sessão concorrente.

### Entrega 4 — Gamificação e usabilidade avançada

| Task | Requisito | Dependência | Critério de aceite |
|---|---|---|---|
| P4-01 | Mundos temáticos | E3 | 28 ambientes com identidade visual consistente; 8 motores reutilizáveis |
| P4-02 | Conquistas | E3 | Critérios determinísticos e não duplicáveis |
| P4-03 | Revisão cumulativa/boss | E3 e conteúdo publicado | 35 conjuntos/345 questões do capítulo 28 com checkpoints |
| P4-04 | Estatísticas pessoais | E3 | Gráficos mostram dados corretos e estados pendentes |
| P4-05 | Preferências e reduced motion | E2 | Animacões respeitam preferências |
| P4-06 | PWA | E3 | Cache não armazena livro/segredo indevidamente |
| P4-07 | Referências verbais/glossários | E0 por material | Busca em corpus editorialmente revisado e autorizado |
| P4-08 | Admin/editorial UI ampliada | E1/E0 | Publicação e bloqueio protegidos por papel + evidência |
| P4-09 | E2E de acessibilidade | E2/E3 | WCAG 2.2 AA nos fluxos principais |

**Gate E4:** desempenho e acessibilidade medidos, conteúdo editorial conforme autorização, UX testada em mobile/desktop, sem custo inesperado.

### Entrega 5 — Disponibilização e expansão

- Expandir capítulo por capítulo e conferir todas as 2.227 questões com ferramentas editoriais.
- Publicar conteúdo apenas após gate E0 por release/audiência.
- Implantar no Vercel com domínios, CSP, cabeçalhos de segurança, previews sem conteúdo restrito.
- Documentar backup, restauração, incidentes, revogação e rollback.
- Monitorar custo do free tier, quotas e abuso; provisionar migração de tier apenas se necessário.
- Medir ativação, retenção e dificuldades de aprendizado; não expandir para plataforma comercial sem novo PRD.

## 4. Histórias de usuário — critérios verificáveis

### US-001 — Entrar com conta autorizada (P0)

**Como** estudante convidado, **quero** autenticar com meu e-mail autorizado, **para** continuar minhas lições privadas.

**Critérios:**
- Given um e-mail na allowlist ativa, When a autenticação válida termina, Then usuário recebe sessão e identidade consistente.
- Given um e-mail não autorizado, When autentica diretamente no provedor, Then a API da app recusa catálogo e progresso; cliente exibe acesso negado.
- Given convite expirado ou revogado, When tenta entrar, Then é recusado sem revelar outras contas.
- Given token inválido, When chama endpoint protegido, Then resposta é 401/403 e nenhum dado sensível é retornado.

### US-002 — Ver o próprio progresso (P0)

**Como** estudante, **quero** ver progresso individual, **para** acompanhar meu aprendizado.

**Critérios:**
- Dois usuários diferentes visualizam dados diferentes para a mesma lição.
- Estatística de acertos indica denominador verificável; respostas `self_reviewed` não são contadas como `correct`.
- Consulta com user ID alheio é bloqueada pelo banco independentemente de parâmetros do frontend.

### US-003 — Continuar exercício interrompido (P0)

**Critérios:**
- Última questão e respostas salvas restauram após refresh/logout/login.
- Ao enviar requisição idêntica duas vezes, o registro fica único/idempotente e XP não aumenta duas vezes.
- Tentativa mantém sua versão mesmo após publicação de novo gabarito.

### US-004 — Estudar teoria (P0)

**Critérios:**
- Aluno vê teoria por capítulo/subtópico, exemplos e tabelas legíveis.
- HTML/JavaScript arbitrário no Markdown não executa.
- Coluna bilíngue que exige revisão permanece bloqueada ou com aviso interno apropriado, sem falsa impressão de estar corrigida.
- Se o release foi bloqueado, API não retorna texto ou tabela.

### US-005 — Responder conjugação (P0)

**Critérios:**
- Input aceita caracteres franceses e apóstrofos.
- Pontuação/acentos não são simplesmente apagados para considerar correto.
- Avaliador respeita pessoas, tempos, flexões e aceitabilidade definida pelo conteúdo aprovado.
- Questão com `Je` → `J’` permite reescrita apropriada.

### US-006 — Responder associação (P0)

**Critérios:**
- Opções com letras a–j preservadas e cada letra associada ao ID correto.
- Movimento de drag é opcional; teclado e clique resolvem integralmente a missão.
- Um par incorreto retorna feedback sem destruir relações de origem.

### US-007 — Traduzir de inglês para francês (P0)

**Critérios:**
- Resposta de referência do gabarito fica associada ao item/versão.
- Diferença de string **não equivale** a erro se não houver avaliador confiável.
- Interface oferece `Compare with reference` e rotula autoavaliação com precisão.
- XP/domínio verificados não são falsamente incrementados.

### US-008 — Receber recompensas (P0)

**Critérios:**
- XP calculado no serviço e persistido em ledger idempotente.
- Acerto repetido por replay não aumenta pontuação.
- Critérios de estrelas não atribuem 3 estrelas a um conjunto com somente respostas autoavaliadas.
- Alteração posterior de régua cria versão de regra e preserva histórico explicável.

### US-009 — Revisar dificuldades (P0)

**Critérios:**
- Tela de revisão mostra apenas erros do próprio usuário.
- Filtrar por assunto, capítulo e prioridade.
- Abrir questão antiga mostra status da versão; se removida por motivo editorial ou legal, não exibe conteúdo indisponível.

### US-010 — Administrar acesso (P0)

**Critérios:**
- Admin autoriza e revoga por e-mail, sem expor dados pessoais aos alunos.
- Requisição com token de estudante recebe 403, não importa qual componente UI esteja aberto.
- Revogação de acesso se reflete na próxima chamada protegida e impede vazamento de conteúdo.

### US-011 — Publicar capítulo (P0 técnico, P1 UI)

**Critérios:**
- Release sem aprovação editorial ou autorização jurídica adequada é rejeitado para audiência correspondente.
- IDs, gabarito, páginas e status têm validações antes de publicar.
- Log da publicação registra ator, versão, data e resultado.
- Rollback conserva histórico sem expor conteúdo retirado.

### US-012 — Jogar o Final Boss (P1)

**Critérios:**
- Capítulo 28 aparece com 35 exercícios e 345 questões do corpus (não 10 por grupo).
- Sessão pode ser pausada em checkpoints; retorno não reinicia tudo.
- Pontuação distingue itens verificados e autoavaliados.
- Todo erro pode levar a assunto de revisão onde existir relação editorial validada.

### US-013 — Usar leitor no celular e teclado (P0)

**Critérios:**
- Largura mínima 320px, sem rolagem horizontal nos controles essenciais.
- Foco evidente e ordem lógica.
- Leitores de tela anunciam pergunta e feedback.
- A interface não exige gestos complexos para responder.

### US-014 — Proteger conteúdo de terceiros (P0)

**Critérios:**
- Build `dist`, previews, CDN e repositório público não contêm corpus protegido.
- Usuário não convidado não recebe corpo de questão via API.
- Convidados sem autorização correspondente **não** recebem conteúdo de livro, mesmo se puderem usar aplicativo com material alternativo.
- Mudança de status `rights_cleared` para falso bloqueia novas leituras aplicáveis.

## 5. Matriz de testes para casos difíceis

| ID | Tipo | Condição a provocar | Resultado esperado |
|---|---|---|---|
| T-001 | Unidade | `é` / `e` como resposta comparada | Não declarar iguais indiscriminadamente |
| T-002 | Unidade | `l’` / `le` contração contextual | Respeitar frase completa |
| T-003 | Unidade | `Je` + lacuna + habiter | Produzir/aceitar `J’habite` conforme regra |
| T-004 | Unidade | Questão de `tu` sob cabeçalho geral `vous` | Prevalece instrução da questão |
| T-005 | Unidade | Resposta aberta diferente da chave | `needs_review`/`self_reviewed`, nunca falso `incorrect` |
| T-006 | Unidade | Duplo envio idempotente | Mesma tentativa/XP uma vez |
| T-007 | Unidade | Conjunto com 3, 5, 8, 10 ou mais questões | Navegação não quebra |
| T-008 | Integração | Usuário A consulta sessão B | Bloqueio RLS |
| T-009 | Integração | Conta removida da allowlist | Próxima requisição privada bloqueada |
| T-010 | Integração | Estudante grava XP diretamente no banco | Bloqueado por RLS/função |
| T-011 | Integração | Release rascunho | Sem leitura de teoria/itens pelo estudante |
| T-012 | Integração | Direitos de audiência ausentes | Sem publicação/retorno de corpus |
| T-013 | Integração | Alterar gabarito durante sessão | Sessão original mantém release fixo |
| T-014 | Contrato | ID duplicado em capítulo 26 | IDs internos exclusivos; marcador impresso mantido |
| T-015 | Contrato | Item repetido em 28·15 | Todos os itens continuam distintos |
| T-016 | Contrato | 29 campos `editorial_recovery` | Rastros e textos originais preservados |
| T-017 | Contrato | Quebrar intervalo de páginas/offsets | CI falha |
| T-018 | E2E | Refresh no meio da missão | Sem perda de progresso |
| T-019 | E2E | Estudante tenta acesso via URL direta | Navegação/servidor recusam |
| T-020 | E2E | Offline breve durante resposta | Retry idempotente; estado recuperável |
| T-021 | A11y | Jogo de associação sem mouse | Todo fluxo possível por teclado |
| T-022 | A11y | Movimento reduzido | Animações não essenciais desativadas |
| T-023 | Segurança | Markdown com script/eventos HTML | Nenhuma execução no browser |
| T-024 | Segurança | Chave de service role no build | Build/CI falham antes de publicação |
| T-025 | Privacidade | Analítica e log durante tradução | Não registrar texto e e-mail sem necessidade |
| T-026 | Operação | Migration + rollback em staging | Integridade e RLS preservados |
| T-027 | Produto | Usuário sem erros para revisar | Empty state didático correto |
| T-028 | Produto | Missão com maioria de respostas abertas | Não declarar domínio 100% verificado |
| T-029 | Produto | PDF página 28 cortada | Sem texto inventado/publicação incorreta |
| T-030 | Produto | Global chapter 28 | 345 itens e checkpoints funcionais |

## 6. Contratos recomendados da aplicação (conceituais)

A fonte atualmente usa ``answer.source_key``, ``question.prompt``, ``source_raw_prompt``, ``source.pdf_pages``, ``interaction_type``, ``grading_policy`` e ``editorial_recovery``. Criar adaptador tipado que não modifique essa fonte.

### 6.1 PlayableQuestion

```ts
type EvaluationState =
  | "correct" | "incorrect" | "needs_review"
  | "self_reviewed" | "ungradable" | "blocked";

type ContentPublication = {
  releaseId: string;
  contentVersion: string;
  editorialApproved: boolean;
  rightsClearedForAudience: boolean;
  published: boolean;
};

type PlayableQuestion = {
  id: string;
  chapterId: string;
  exerciseId: string;
  topicIds: string[];
  sourcePdfPages: number[];
  contentVersion: string;
  interactionType:
    | "fill_blank" | "matching" | "translation"
    | "sentence_rewrite" | "free_response"
    | "ordering" | "multiple_choice" | "other";
  prompt: string;
  instruction: string;
  presentation?: Record<string, unknown>;
  gradingPolicy: "choice_label" | "morphology_or_slot" | "semantic_review_required";
  canAutoGrade: boolean;
};
```

**Nota de segurança:** este DTO de visualização não precisa incluir `source_raw_prompt` nem `answer.source_key` antes do momento permitido; a fonte do repositório pode ter campos de auditoria que a API da app **não** deve transmitir indiscriminadamente.

### 6.2 Session event

```ts
type StudyEvent = {
  eventId: string;                // UUID e chave de idempotência
  userId: string;                 // obtido da sessão no servidor
  sessionId: string;
  questionId: string;
  contentVersion: string;
  attemptNumber: number;
  kind: "answer_submitted" | "hint_used" | "self_reviewed" | "session_completed";
  occurredAt: string;             // ISO-8601 UTC
};
```

O servidor revalida ``userId`` e acesso à versão; não aceita `userId` fornecido pelo cliente como prova de identidade. Falhas de rede devem permitir reprocessar a mesma chave sem duplo evento.

### 6.3 Persistência e evolução

- Migrações do banco em ordem, sem editar migration aplicada em produção.
- Eventos históricos guardam conteúdo/regras de pontuação de sua versão.
- A evolução de schema do corpus passa por importação versionada; nenhum frontend altera arquivos fonte originais.
- Progresso agregado pode ser reconstruído do ledger/tentativas; simular rebuild em staging.

## 7. Exemplos textuais de fluxos de UX

### 7.1 Desktop — Chapter Overview

```text
[Sidebar] Dashboard | Learning Path | Review | Achievements | Profile
-------------------------------------------------------------------
World 07 — Past Detective
Chapter 07: The passé composé                     [continue]
Progress: 4 of 10 missions done  | verified mastery: 72% of 65 graded
-------------------------------------------------------------------
[Theory: past participles]  [Auxiliary avoir] [Auxiliary être]
Exercise 7·1  — Completed      [Review mistakes]
Exercise 7·2  — In progress    [Continue]
Exercise 7·3  — Available      [Start]
...
[Note: some content awaiting editorial review — not published]
```

Estes rótulos são **exemplo de interface**, não números reais do histórico do usuário.

### 7.2 Mobile — Mission

```text
[←] Exercise 01·06                            6 / 10
----------------------------------------------------
Conjugate the verb in the present tense.
[Je ... au dixième étage.]
[ text input with correct full-phrase support       ]
----------------------------------------------------
[Hint] [Check answer]
After checking: source-aligned explanation | Next →
```

Se a questão pede elisão, editar/reescrever o trecho exigido; não permitir o resultado gramaticalmente incorreto "Je J’habite".

### 7.3 Resultado com resposta não verificada

```text
Mission complete
6 objectively correct · 2 objective mistakes · 2 self-reviewed
Verified accuracy: 6 / 8 verifiable answers
Unverified: 2 open translations (not included in verified accuracy)
[Review mistakes] [Compare reference answers] [Continue]
```

Nunca exibir apenas "80% correct" somando autoavaliação sem evidência.

## 8. Riscos e critérios de não avançar (STOP conditions)

**Bloquear merge de código de produção** se alguma das condições ocorrer:

1. Testes unitários ou CI do corpus falham.
2. Migration permite leitura de progresso de outro estudante ou gravação arbitrária de XP.
3. Material de livro aparece em `dist` ou em rota pública sem controle ou sem direitos.
4. Questão/teoria não revisada é publicada como se tivesse gate editorial aprovado.
5. Resposta aberta é automaticamente marcada errada só por não coincidir com a chave.
6. A mudança altera IDs, autoria de respostas ou páginas sem registro/revisão.
7. O autor do PR não consegue explicar como reproduzir e reverter mudança.
8. O acesso do administrador depende somente de esconder botão no frontend.

Um bloqueio pode ser isolado por capítulo ou release, permitindo continuar a codificar funções independentes com dados fictícios/permitidos.

## 9. Monitoramento e aceite pós-lançamento

### Qualidade técnica

- Recolher errors por release, latência de conteúdo autenticado, falhas de sessão, frequências de retries e quotas gratuitas.
- Testar restauração de backup periodicamente quando o ambiente tiver dados pessoais.
- Confirmar que revogações removem acesso no tempo esperado.
- Analisar tamanho do bundle, recursos em cache e fontes de dados do browser.

### Qualidade pedagógica

- Taxa de acerto por tipo, sem diagnosticar incapacidade a partir de um score isolado.
- Relatos de falsos negativos, itens bloqueados e traduções alternativas.
- Confiabilidade das tabelas e explicações em cada capítulo antes de liberar.
- Revisar as métricas a partir de feedback dos usuários e manter plano de rollback.

### Critério de estabilização do MVP

A aplicação oferece fluxo end-to-end estável, login fechado, lição piloto editorial/juridicamente autorizada, avaliação contextual, histórico individual, revisão de erros, XP auditável, leitura responsiva e testes de segurança. Nenhuma dependência de liberar todos os 28 capítulos para provar viabilidade do produto.

## 10. Como trabalhar por issue com Antigravity/Codex

Para cada issue futura:

1. **Discovery:** ler o PRD, arquivos do repo, schema real e estado da issue. Não supor que stack ou tabelas já existem.
2. **Risco:** identificar entrada/saída, usuário, página, conteúdo, segurança e migrações envolvidos.
3. **Plano mínimo:** definir arquivos a alterar e testes necessários. Confirmar mudança de escopo com proprietário.
4. **Implementação:** um recorte vertical, sem acrescentar abstrações genéricas não necessárias.
5. **Testes:** unitários e integração; com dois usuários se envolver RLS; CI já existente intacto.
6. **Checklist humano:** roteiro manual reprodutível, resultados esperados, limitações e screenshots se envolver UI.
7. **PR:** resumo, riscos, decisões, logs do teste e rollbacks.
8. **Merge:** só após gate requerido. Não declarar trabalho como concluído se ficou pendente.

### Template de issue

```text
Título: [EP-XX] Nome da tarefa
Contexto: qual dor do usuário resolve
Origem: PRD seção / US / RF / AC
Escopo IN: ...
Escopo OUT: ...
Dependências: ...
Dados de teste: conteúdo original/licenciado ou fixtures sintéticas
Regras de segurança: ...
Critérios de aceite: Given/When/Then
Testes: unit / integration / E2E / A11y / editorial
Passos de validação manual: ...
Rollout/rollback: ...
Gate: Machine | Editorial | Rights | UX
```

## 11. Checklist completo de rastreabilidade documental

Este plano considera:

| Categoria | Onde detalhada |
|---|---|
| Visão/JTBD/personas | PRD ``1–5 |
| Metas/antiobjetivos | PRD ``5–7 |
| Navegação e 17 telas | PRD `9 |
| 73 requisitos funcionais | PRD `10 |
| Oito motores de interação | PRD `11 |
| Mapeamento dos 28 mundos | PRD `12 |
| Pedagogia e domínio | PRD `13 |
| Gabaritos e alternativas | PRD `14 |
| XP/estrelas/streak/boss | PRD `15 |
| React/Vite/Supabase/Vercel | PRD `16 |
| Banco de dados e RLS | PRD ``17–18 |
| Performance/WCAG/responsivo | PRD ``19–20 |
| API e estados de erro | PRD `21 |
| Editor/publicação/licença | PRD `22 |
| Analytics | PRD `23 |
| CI/tests/DoD | PRD `24 |
| Roadmap | PRD `25 e este plano ``2–3 |
| Aceite técnico e funcional | PRD `26 e este plano ``4–5 |
| Riscos | PRD `27 e este plano `8 |
| Decisões abertas e referências | PRD ``28–30 |

**Limitações e condições pendentes:** os documentos de PRD não substituem revisão editorial do PDF, licença da obra ou aprovação do usuário sobre regras propostas de gamificação. Não classificar esses gates como concluídos.

---

**Estado:** documento de planejamento operacional completo, sem implementação da aplicação.
