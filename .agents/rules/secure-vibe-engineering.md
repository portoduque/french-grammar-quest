# Secure Vibe Engineering — regra de workspace

@../../docs/ENGINEERING_RULES.md
@../../docs/COST_GUARDRAILS.md

Esta regra deve ser configurada como **Always On** no workspace do Antigravity.

Antes de encerrar uma tarefa:

1. Execute `python scripts/verify_fast.py`.
2. Corrija falhas reais em vez de desabilitar checks.
3. Para PR/release, execute `python scripts/verify_ci.py`.
4. Nunca use `git commit --no-verify` para contornar o pre-commit.
5. Nunca habilite trial, plano pago ou upgrade de ferramentas sem pedido explícito do usuário.
6. Se a stack ainda não estiver configurada, execute `python scripts/bootstrap.py --detect` e adapte `.secure-vibe/config.json`.
7. Se houver `.secure-vibe/merge-needed/`, revise os conflitos antes de concluir.
