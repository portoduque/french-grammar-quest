# Relatório de validação — Secure Vibe Coding 1.1.0

Data da auditoria: **2026-08-29**.

Este documento registra o que foi revisado e testado antes da geração do ZIP auditado.

## O que foi corrigido nesta auditoria

1. CI passou a preparar **Go e Java** quando essas stacks são detectadas.
2. GitHub Actions principais foram atualizadas para versões atuais verificadas nas fontes oficiais.
3. O instalador de projeto existente deixou de sobrescrever arquivos/configurações diferentes silenciosamente.
4. `.secure-vibe/config.json` personalizado passou a ser preservado e apenas recebe chaves padrão ausentes.
5. Reinstalação do Secure Vibe em projeto existente foi tornada idempotente.
6. Caminhos `@...` da regra do Antigravity foram corrigidos para resolver a partir de `.agents/rules/`.
7. O bootstrap ganhou mensagens claras para Git/Python/pre-commit ausentes e JSON inválido.
8. `verify_fast.py` e `verify_ci.py` agora falham quando existe stack real mas nenhum check foi configurado.
9. Wrapper Maven/Gradle passou a tolerar perda do bit executável comum em arquivos extraídos de ZIP.
10. O guia ganhou `00_COMECE_AQUI.md`, prompts separados e etapas manuais explícitas.
11. Foi adicionado `scripts/doctor.py` para check-up final da instalação local.
12. SonarQube Cloud e ZAP permaneceram opcionais/manualizados para reduzir custo e complexidade.
13. Guardrails financeiros foram reforçados para objetivo **R$ 0**.

## Testes executados localmente

- compilação/sintaxe de todos os scripts Python;
- parse de todos os JSON;
- parse de todos os YAML/YML;
- validação dos caminhos importados pela regra do Antigravity;
- validação de links Markdown locais;
- template vazio: bootstrap + `verify_fast` + `verify_ci`;
- projeto Node sem checks: falha esperada e mensagem clara;
- projeto Node com formatter/lint/typecheck/test/build: checks passaram;
- projeto Python com pytest: detecção e teste passaram;
- projeto Go: gofmt/vet/test/build passaram;
- Maven com wrapper sem bit executável: test/build wrapper passaram;
- Gradle com wrapper sem bit executável: test/build wrapper passaram;
- config JSON inválido: falha clara sem traceback e sem sobrescrever;
- config com estrutura errada: falha clara sem traceback;
- projeto existente com `AGENTS.md`, `CLAUDE.md`, pre-commit, Dependabot e config próprios: conteúdo preservado;
- instalador de projeto existente executado duas vezes: valores personalizados continuaram preservados;
- `doctor.py`: cenário local completo retornou sucesso.

## O que NÃO pode ser executado neste ambiente de auditoria

Este ambiente não possui acesso externo irrestrito. Por isso, não foi possível executar de ponta a ponta:

- download inicial dos ambientes do pre-commit/Gitleaks;
- um workflow real em runner do GitHub;
- uma análise real no SonarQube Cloud;
- um scan real do ZAP contra staging.

Nesses pontos a validação foi feita contra a documentação oficial atual e a sintaxe/configuração dos arquivos. A primeira execução real ainda depende da sua conexão, conta GitHub e, opcionalmente, Sonar/staging.

## Auditoria arquivo por arquivo

| Arquivo | Status | O que foi conferido |
|---|---|---|
| `00_COMECE_AQUI.md` | OK | Ponto de entrada único e escolha clara entre projeto novo/existente. |
| `README.md` | OK | Visão geral, fluxo e mapa dos arquivos. |
| `GUIA_PASSO_A_PASSO.md` | OK | Caminho do download até validação local/Actions, com comandos exatos e etapas manuais. |
| `PROMPTS_INICIAIS.md` | OK | Prompts separados para Codex, Antigravity, Claude Code e projeto existente. |
| `AGENTS.md` | OK | Regras persistentes do Codex e barreiras de segurança/custo. |
| `CLAUDE.md` | OK | Importa `AGENTS.md` e mantém instruções específicas do Claude Code. |
| `.agents/rules/secure-vibe-engineering.md` | OK | Imports corrigidos e instrução `Always On`. |
| `.secure-vibe/config.json` | OK | Schema universal, comandos por grupo, Sonar 45k e ZAP manual. |
| `.pre-commit-config.yaml` | OK | Hooks básicos, Gitleaks e verificação rápida da stack. |
| `.gitignore` | OK | Defaults seguros para template novo. |
| `.gitignore.secure-vibe` | OK | Fragmento conservador para projeto existente. |
| `.github/dependabot.yml` | OK | Atualização semanal de Actions; bootstrap adiciona ecossistemas detectados. |
| `.github/workflows/secure-vibe-ci.yml` | OK | Runtimes condicionais Node/Go/Java/Python + dependências + checks. |
| `.github/workflows/secure-vibe-security.yml` | OK | Gitleaks, Semgrep CE e Trivy com permissões `contents: read`. |
| `.github/workflows/secure-vibe-sonar.yml` | OK | Opcional; só roda quando variables/token existem. |
| `.github/workflows/secure-vibe-zap.yml` | OK | Manual; URL fornecida pelo usuário; autorização explicitada. |
| `scripts/bootstrap.py` | OK | Detecta stacks, preserva config, prepara pre-commit e Dependabot. |
| `scripts/verify_fast.py` | OK | Checks rápidos; não aceita stack real sem checks. |
| `scripts/verify_ci.py` | OK | Checks completos; não aceita stack real sem checks. |
| `scripts/install_dependencies.py` | OK | Instalação customizável + npm/pnpm/yarn/Python/Go comuns. |
| `scripts/check_gofmt.py` | OK | Verifica arquivos Go fora do `gofmt`. |
| `scripts/run_build_tool.py` | OK | Maven/Gradle cross-platform e wrappers sem bit executável. |
| `scripts/doctor.py` | OK | Check-up final local: Git, arquivos, config, hook, remote, conflitos e checks. |
| `tools/install_into_existing.py` | OK | Não sobrescreve arquivo diferente; cria `merge-needed`; preserva config. |
| `docs/ENGINEERING_RULES.md` | OK | Regras centrais contra bypass e suppressions indevidas. |
| `docs/COST_GUARDRAILS.md` | OK | Regras R$ 0, cota Actions e limite interno Sonar. |
| `docs/ETAPAS_MANUAIS.md` | OK | Separa claramente o que exige conta/clique/autorização do usuário. |
| `docs/TOOLS.md` | OK | Explicação curta de cada ferramenta. |
| `docs/TROUBLESHOOTING.md` | OK | Erros comuns e instruções sem bypass. |
| `SOURCES.md` | OK | Fontes oficiais e versões verificadas. |
| `MANIFEST.txt` | OK | Inventário do pacote. |
| `VERSION.txt` | OK | Versão e alvo do pacote. |

## Critério de conclusão

O pacote foi considerado pronto para entrega quando:

- arquivos estruturais passaram na validação local;
- cenários suportados passaram nos testes executáveis;
- falhas comuns produziram mensagens orientativas;
- instalação em projeto existente preservou conteúdo;
- documentação iniciou por um único ponto (`00_COMECE_AQUI.md`);
- as etapas que realmente dependem de conta externa ficaram explicitamente manuais.

Nenhuma ferramenta pode garantir software perfeito ou invulnerável. O objetivo deste template é fornecer um **baseline consistente, automatizado, gratuito e difícil de contornar por acidente**.
