# 00 — COMECE AQUI

Se você acabou de baixar e descompactar este ZIP, **não saia executando arquivos aleatoriamente**.

## Escolha UMA situação

### A) Quero deixar este ZIP como meu template permanente para projetos futuros

Siga `GUIA_PASSO_A_PASSO.md` → **CAMINHO A — preparar o template mestre uma única vez**.

Você fará isso **uma vez só**. Depois, cada projeto novo será criado no GitHub por **Use this template**.

### B) Quero colocar o Secure Vibe em um projeto que já existe

Siga `GUIA_PASSO_A_PASSO.md` → **CAMINHO B — instalar em projeto existente**.

Não copie os arquivos deste ZIP manualmente por cima do projeto.

---

## O que o agente vai fazer por você

Codex, Antigravity ou Claude Code pode:

- detectar a stack;
- adaptar lint, formatter, typecheck e testes;
- configurar os comandos do Secure Vibe;
- executar bootstrap e verificações;
- corrigir falhas técnicas;
- revisar conflitos ao instalar em projeto existente.

## O que continua sendo responsabilidade sua

Algumas etapas são de conta/interface e **não devem ser automatizadas sem você saber**:

1. criar/selecionar o repositório no GitHub;
2. configurar o bloqueio de gastos do GitHub Actions;
3. no Antigravity, confirmar a regra como **Always On**;
4. opcionalmente criar/configurar o SonarQube Cloud Free e seus secrets;
5. informar manualmente a URL de staging quando quiser executar o ZAP.

Tudo isso está explicado passo a passo no guia.

---

## Depois que um projeto estiver configurado

O fluxo diário será:

```text
IA desenvolve
   ↓
verify_fast
   ↓
git commit → pre-commit
   ↓
push / Pull Request
   ↓
GitHub Actions
├─ qualidade/testes/build
├─ Gitleaks
├─ Semgrep CE
└─ Trivy
   ↓
SonarQube Cloud Free (se habilitado)
   ↓
ZAP manual quando houver staging
```

## Arquivos para você ler

1. **Primeiro:** `GUIA_PASSO_A_PASSO.md`
2. Para copiar o prompt correto: `PROMPTS_INICIAIS.md`
3. Se algo der errado: `docs/TROUBLESHOOTING.md`
4. Para saber o que você ainda precisa fazer manualmente: `docs/ETAPAS_MANUAIS.md`

> Regra de custo: o template foi desenhado para **R$ 0**. Não autorize trial, upgrade ou cobrança para “resolver” uma falha.
