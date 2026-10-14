# Prompts iniciais — escolha apenas o seu agente

Estes prompts são usados **uma vez na configuração inicial de cada projeto**. Depois disso, as regras versionadas no próprio repositório continuam orientando o agente.

---

# Projeto NOVO

## Codex

```text
Antes de alterar o projeto, leia AGENTS.md, docs/ENGINEERING_RULES.md, docs/COST_GUARDRAILS.md, docs/ETAPAS_MANUAIS.md e .secure-vibe/config.json.

Este repositório usa o padrão Secure Vibe Coding. Analise o projeto e a stack real antes de instalar ou alterar ferramentas.

Sua tarefa é concluir a configuração inicial de qualidade e segurança:
1. execute `python scripts/bootstrap.py --detect`;
2. revise a stack e os comandos detectados;
3. configure/adapte formatter, lint, typecheck, testes, build e E2E somente quando fizer sentido para esta stack;
4. preencha somente o que for necessário em `.secure-vibe/config.json`;
5. preserve Gitleaks, Semgrep CE, Trivy, GitHub Actions, Dependabot e os guardrails de custo;
6. não inicie trial, não faça upgrade e não habilite recurso pago;
7. não desabilite nem suprima checks apenas para obter resultado verde;
8. execute `python scripts/bootstrap.py --install-local` para instalar o pre-commit neste clone;
9. execute `python scripts/verify_fast.py` e corrija falhas reais;
10. execute `python scripts/verify_ci.py` se a stack já estiver pronta para CI;
11. execute `python scripts/doctor.py` e corrija qualquer problema local apontado.

Ao terminar, me entregue um resumo curto com:
- stack detectada;
- checks configurados;
- resultado das verificações;
- qualquer etapa MANUAL que ainda dependa de mim no GitHub, SonarQube Cloud ou staging.
```

## Google Antigravity

Antes de enviar o prompt:

1. abra o projeto no Antigravity;
2. abra **Customizations → Rules**;
3. confirme a regra em `.agents/rules/secure-vibe-engineering.md`;
4. configure essa regra como **Always On**.

Depois envie:

```text
A regra Secure Vibe Engineering deste workspace deve permanecer Always On.
Leia também docs/ENGINEERING_RULES.md, docs/COST_GUARDRAILS.md, docs/ETAPAS_MANUAIS.md e .secure-vibe/config.json.

Analise o projeto e a stack real antes de alterar ferramentas.

Sua tarefa é concluir a configuração inicial:
1. execute `python scripts/bootstrap.py --detect`;
2. revise os comandos detectados;
3. adapte formatter, lint, typecheck, testes, build e E2E somente quando fizer sentido para esta stack;
4. preencha somente o necessário em `.secure-vibe/config.json`;
5. preserve Gitleaks, Semgrep CE, Trivy, GitHub Actions, Dependabot e os guardrails de custo;
6. não inicie trial, não faça upgrade e não habilite recurso pago;
7. nunca desabilite checks para fazê-los passar;
8. execute `python scripts/bootstrap.py --install-local`;
9. execute `python scripts/verify_fast.py` e corrija falhas reais;
10. execute `python scripts/verify_ci.py` se a stack já estiver pronta para CI;
11. execute `python scripts/doctor.py` e corrija qualquer problema local apontado.

Ao terminar, informe resumidamente o que foi configurado e quais etapas MANUAIS ainda dependem de mim.
```

## Claude Code

```text
Antes de alterar o projeto, leia CLAUDE.md e as instruções que ele importa, além de `.secure-vibe/config.json` e `docs/ETAPAS_MANUAIS.md`.

Este repositório usa Secure Vibe Coding. Analise primeiro a stack real.

Sua tarefa é concluir a configuração inicial:
1. execute `python scripts/bootstrap.py --detect`;
2. revise os comandos detectados;
3. adapte formatter, lint, typecheck, testes, build e E2E somente quando fizer sentido;
4. configure somente o necessário em `.secure-vibe/config.json`;
5. preserve Gitleaks, Semgrep CE, Trivy, GitHub Actions, Dependabot e guardrails de custo;
6. não inicie trial, não faça upgrade e não habilite recurso pago;
7. não desabilite nem enfraqueça checks para obter resultado verde;
8. execute `python scripts/bootstrap.py --install-local`;
9. execute `python scripts/verify_fast.py` e corrija falhas reais;
10. execute `python scripts/verify_ci.py` se o projeto já estiver pronto para CI;
11. execute `python scripts/doctor.py` e corrija qualquer problema local apontado.

No final, diga resumidamente o que foi configurado e quais etapas MANUAIS ainda dependem de mim.
```

---

# Projeto EXISTENTE

Use o instalador primeiro, conforme `GUIA_PASSO_A_PASSO.md`. Depois envie este prompt ao agente escolhido:

```text
O Secure Vibe Coding acabou de ser instalado neste projeto existente.

Antes de mudar configurações, analise o projeto e leia as regras Secure Vibe correspondentes ao seu agente, `docs/ENGINEERING_RULES.md`, `docs/COST_GUARDRAILS.md`, `docs/ETAPAS_MANUAIS.md` e `.secure-vibe/config.json`.

Se existir `.secure-vibe/merge-needed/`, revise cada arquivo de conflito e faça um merge cuidadoso. Preserve configurações funcionais existentes. Não substitua uma configuração só porque a versão do template é diferente.

Depois:
1. execute `python scripts/bootstrap.py --detect`;
2. adapte formatter, lint, typecheck, testes, build e E2E à stack real;
3. preserve comportamento funcional da aplicação;
4. não desabilite checks nem crie suppressions sem justificativa técnica;
5. não habilite trial, upgrade ou recurso pago;
6. execute `python scripts/bootstrap.py --install-local`;
7. execute `python scripts/verify_fast.py`;
8. se possível, execute `python scripts/verify_ci.py`;
9. execute `python scripts/doctor.py` e corrija qualquer problema local apontado;
10. corrija falhas reais e informe qualquer pendência manual.

No final, me mostre de forma curta:
- o que já existia e foi preservado;
- o que foi adicionado;
- conflitos que foram resolvidos;
- checks que passaram/falharam;
- passos manuais que ainda preciso fazer.
```
