# Regras de Engenharia — Secure Vibe Coding

Estas regras são independentes de Codex, Antigravity ou Claude Code.

## 1. Regra principal

A IA pode escrever e modificar código, mas a aprovação técnica depende dos checks automatizados do repositório.

## 2. Antes de concluir uma tarefa

Execute:

```bash
python scripts/verify_fast.py
```

O comando deve cobrir, quando configurados para a stack:

- formatter/check de formatação;
- lint;
- typecheck;
- testes unitários rápidos.

O Gitleaks é executado pelo pre-commit e novamente no CI.

## 3. Antes de PR/release

Execute:

```bash
python scripts/verify_ci.py
```

Além dos checks rápidos, ele executa os comandos configurados de:

- testes de integração;
- build;
- E2E/Playwright, quando configurado.

O GitHub Actions executa também os scans universais de segurança.

Após a configuração inicial ou instalação em projeto existente, execute também `python scripts/doctor.py` como check-up local.

## 4. Proibições

O agente NÃO deve, apenas para obter um resultado verde:

- desativar testes;
- remover assertions;
- usar `--no-verify`;
- adicionar `nosemgrep` ou ignore equivalente sem análise;
- reduzir severidade do Trivy para ocultar vulnerabilidade;
- colocar segredos em allowlist do Gitleaks sem justificativa;
- retirar módulos do Sonar para reduzir artificialmente LOC;
- desativar ZAP por encontrar alertas reais.

Uma supressão pode ser necessária em caso de falso positivo, mas o agente deve explicar:

1. qual alerta é falso positivo;
2. por que é falso;
3. qual escopo mínimo será suprimido;
4. qual risco permanece.

## 5. Testes

- Código novo deve ter testes quando aplicável.
- Bug corrigido deve receber teste de regressão quando viável.
- Não escrever testes que apenas reproduzam a implementação sem validar comportamento útil.

## 6. Dependências

- Evitar dependência nova quando a plataforma/stdlib já resolve o problema de forma simples.
- Toda dependência nova deve ter propósito claro.
- Dependabot é usado para atualizações automáticas quando o ecossistema é suportado.

## 7. Secrets

Nunca versionar:

- `.env` real;
- chaves API;
- tokens;
- senhas;
- private keys;
- credenciais cloud.

Use `.env.example` apenas com valores fictícios.

## 8. Segurança prática, sem overengineering

O conjunto padrão é deliberadamente pequeno:

- pre-commit;
- formatter/linter/typecheck/testes da stack;
- Gitleaks;
- Semgrep CE;
- Trivy;
- GitHub Actions;
- Dependabot;
- SonarQube Cloud Free opcional;
- Playwright quando houver E2E;
- ZAP quando houver aplicação web acessível em staging.

Não adicionar ferramenta nova sem uma lacuna real.
