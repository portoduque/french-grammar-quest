# Guardrails de custo — objetivo R$ 0

Este template foi desenhado para projetos pessoais com **custo das ferramentas de qualidade/segurança igual a R$ 0**.

## Regra global

Nenhum agente está autorizado a:

- iniciar trial pago;
- cadastrar cartão para “desbloquear” ferramenta deste fluxo;
- fazer upgrade de plano;
- habilitar cobrança por consumo;
- aceitar aumento automático de limite;
- trocar para runner pago/maior apenas para o CI passar.

Se um free tier for insuficiente, o recurso deve parar, ser executado localmente quando possível ou ser substituído por alternativa gratuita/open source.

## GitHub Actions

No GitHub Free, repositórios privados possuem atualmente **2.000 minutos/mês** de GitHub Actions incluídos em runners padrão.

Proteção obrigatória para este template:

1. abra Billing/Budgets da sua conta ou organização;
2. confirme orçamento/alertas para Actions;
3. quando a interface oferecer **Stop usage when budget limit is reached**, mantenha ativado;
4. não autorize gasto adicional;
5. não use Larger runners.

Em alguns escopos o GitHub pode aplicar hard stop automaticamente; nesse caso confirme que não existe orçamento que autorize consumo adicional.

Para economizar minutos:

- pre-commit + `verify_fast` rodam localmente;
- CI/security rodam em push/PR;
- ZAP é manual;
- Sonar só roda quando configurado;
- não usamos matriz de vários sistemas operacionais/versões por padrão.

## SonarQube Cloud Free

Política interna do template:

- até 35k LOC privadas: normal;
- 35k–40k: monitorar;
- 40k–45k: alerta;
- **45k LOC: limite operacional interno**;
- limite oficial atual do Free: **50k LOC privadas por organização**;
- Free atualmente também limita a organização a até 5 membros.

O Free não deve ser convertido para Team por automação. Upgrade exige uma ação explícita de conta/billing; o agente não está autorizado a fazer isso.

Se chegar perto de 45k, remova do Sonar projetos privados que não precisam do dashboard ou use SonarQube Community local quando realmente houver necessidade.

## Ferramentas sem cobrança por uso no fluxo-base

- pre-commit;
- Gitleaks;
- Semgrep Community Edition;
- Trivy;
- Playwright;
- OWASP ZAP;
- linters/formatters/typecheckers/test frameworks open source escolhidos pela stack.

## Dependabot

Use o que está incluído no GitHub Free. Não transforme recursos pagos do GitHub Advanced Security em requisito deste template.

## Regra final

Se alguma tela pedir **cartão, trial, Team/Pro/Enterprise, créditos pagos ou aumento de orçamento**, pare e consulte `docs/ETAPAS_MANUAIS.md` antes de aceitar qualquer coisa.
