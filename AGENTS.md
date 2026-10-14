# Instruções do projeto para Codex

Antes de alterar código, leia:

- `docs/ENGINEERING_RULES.md`
- `docs/COST_GUARDRAILS.md`
- `docs/ETAPAS_MANUAIS.md`
- `.secure-vibe/config.json`

Regras obrigatórias:

1. Preserve o comportamento existente salvo quando a tarefa exigir mudança.
2. Não desative testes, hooks, lint, typecheck, Gitleaks, Semgrep, Trivy, Sonar ou ZAP apenas para fazer uma tarefa passar.
3. Não use `--no-verify` como solução para falhas de pre-commit.
4. Correções de bugs devem incluir teste de regressão quando tecnicamente aplicável.
5. Antes de concluir uma tarefa, execute `python scripts/verify_fast.py`.
6. Antes de considerar uma alteração pronta para PR/release, execute `python scripts/verify_ci.py`.
7. Se um check falhar, corrija a causa raiz. Supressões só podem ser propostas ao usuário com justificativa técnica explícita.
8. Não habilite planos pagos, trials ou upgrades de ferramentas. Consulte `docs/COST_GUARDRAILS.md`.
9. Se houver `.secure-vibe/merge-needed/`, revise os conflitos em vez de ignorá-los.
10. Informe claramente qualquer etapa manual que dependa da conta do usuário (GitHub billing, Sonar, Antigravity Rules, staging).
11. Análise Pedagógica de Francês Obrigatória: Em qualquer tarefa que envolva capítulos, teorias, exercícios, feedbacks ou mecânicas de estudo, analise sempre sob a ótica de um Professor de Francês (FLE) experiente e didático (rigor gramatical, elisões fonéticas, acentuação, registro de língua e feedback formativo encorajador para lusófonos).

Quando a stack ainda não estiver adaptada, execute `python scripts/bootstrap.py --detect` e configure os comandos faltantes em `.secure-vibe/config.json`.
