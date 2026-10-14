# Guia passo a passo — Secure Vibe Coding

Este guia foi escrito para ser seguido **sem precisar entender DevSecOps**. Faça uma etapa por vez e só avance quando o resultado esperado acontecer.

> Se acabou de descompactar o ZIP, leia primeiro `00_COMECE_AQUI.md`.

---

# 1. O que este pacote faz

Ele cria a mesma camada de qualidade e segurança independentemente de você programar com:

- Codex;
- Google Antigravity;
- Claude Code.

O agente escreve/adapta código, mas as verificações ficam no repositório e no GitHub.

```text
SEU COMPUTADOR
├─ pre-commit
├─ formatter/lint/typecheck/testes rápidos da stack
└─ Gitleaks
        ↓ push / Pull Request
GITHUB ACTIONS
├─ qualidade + testes + build
├─ Gitleaks
├─ Semgrep Community Edition
└─ Trivy
        ↓
SONARQUBE CLOUD FREE (opcional)
        ↓
OWASP ZAP (manual contra staging)
```

---

# 2. Antes de começar — pré-requisitos

Você precisa de:

1. **Git** instalado.
2. **Python 3.10 ou superior**.
3. Conta no **GitHub**.
4. Pelo menos um agente: Codex, Antigravity ou Claude Code.
5. A runtime da aplicação quando o projeto já tiver uma stack (Node, Java, Go etc.).

Docker **não é obrigatório no seu computador** para o template-base. Os scans pesados usam o runner do GitHub.

## 2.1 Confira Git e Python

Abra Terminal/PowerShell dentro de qualquer pasta e rode:

```bash
git --version
python --version
```

Resultado esperado: aparecerem versões, por exemplo `git version ...` e `Python 3.13...`.

### Se `python` não funcionar mas `python3` funcionar

Use `python3` no lugar de `python` em todos os comandos deste guia.

Teste:

```bash
python3 --version
```

> Os scripts auxiliares Secure Vibe exigem Python **3.10 ou superior**. Se uma aplicação legada precisar de Python mais antigo, peça ao agente para separar o runtime da aplicação do runtime usado pelos scripts Secure Vibe.

### Se Git ou Python não existirem

Instale antes de continuar. Não avance com mensagens como `command not found`.

---

# 3. Depois de baixar o ZIP

## 3.1 Descompacte completamente

Não execute scripts de dentro da visualização do ZIP.

Exemplo:

```text
Downloads/
└─ secure-vibe-coding-template-v1.1.0/
   ├─ 00_COMECE_AQUI.md
   ├─ .github/
   ├─ .agents/
   ├─ scripts/
   └─ ...
```

**Importante:** `.github`, `.agents` e `.secure-vibe` começam com ponto e podem ficar ocultas no gerenciador de arquivos. Elas fazem parte do template. Não as apague.

Agora escolha um caminho:

- **CAMINHO A:** quero preparar o template mestre para todos os projetos futuros.
- **CAMINHO B:** quero instalar isto em um projeto que já existe.

---

# CAMINHO A — preparar o template mestre uma única vez

Você faz esta seção **uma vez só**.

## A1. Crie um repositório vazio no GitHub

No GitHub:

1. clique em **New repository**;
2. nome sugerido: `secure-vibe-coding-template`;
3. escolha Public ou Private;
4. **não** marque README, `.gitignore` ou License, porque o ZIP já tem arquivos;
5. crie o repositório.

Deixe a página do repositório aberta. Ela mostrará a URL Git, parecida com:

```text
https://github.com/SEU-USUARIO/secure-vibe-coding-template.git
```

## A2. Abra o terminal NA PASTA descompactada

Você precisa estar na pasta que contém `00_COMECE_AQUI.md`.

Confira:

Linux/macOS:

```bash
pwd
ls -la
```

Windows PowerShell:

```powershell
Get-Location
Get-ChildItem -Force
```

Você deve conseguir ver `.github`, `.agents` e `.secure-vibe`.

## A3. Envie o template inteiro para o GitHub

Execute, uma linha por vez:

```bash
git init
git add .
git commit -m "Initial Secure Vibe Coding template"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/secure-vibe-coding-template.git
git push -u origin main
```

Substitua a URL pela URL do seu repositório.

### Se o Git pedir nome/e-mail no primeiro commit

Ele mostrará os comandos necessários. Exemplo:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Depois repita:

```bash
git commit -m "Initial Secure Vibe Coding template"
```

### Como saber se deu certo

Atualize a página do GitHub. Você deve ver arquivos como:

```text
00_COMECE_AQUI.md
AGENTS.md
CLAUDE.md
.github/
.agents/
scripts/
docs/
```

Se `.github` não estiver no GitHub, **pare**: o CI não funcionará.

## A4. Transforme o repositório em Template Repository

No repositório do GitHub:

1. abra **Settings**;
2. em **General**, encontre a opção **Template repository**;
3. marque-a.

Pronto. Essa etapa é feita uma vez.

---

# CAMINHO A2 — criar CADA projeto novo no futuro

A partir daqui, sempre que quiser um projeto novo:

## A2.1 Crie o repositório pelo template

No GitHub, abra `secure-vibe-coding-template`:

1. clique em **Use this template**;
2. **Create a new repository**;
3. dê o nome do sistema;
4. prefira **Private** quando o código não deve ser público;
5. clique em criar.

## A2.2 Clone o projeto novo

Copie a URL Git do projeto novo e execute:

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-PROJETO.git
cd NOME-DO-PROJETO
```

Agora você deve estar **no projeto novo**, não na pasta do template mestre.

## A2.3 Abra o projeto no agente que vai usar

Abra exatamente essa pasta no Codex, Antigravity ou Claude Code.

Depois abra `PROMPTS_INICIAIS.md` e copie **somente o prompt do seu agente na seção Projeto NOVO**.

O prompt já manda o agente:

- detectar a stack;
- adaptar os checks;
- instalar o pre-commit neste clone;
- executar verificações;
- informar o que ainda depende de você.

### Antigravity — um clique manual extra

Antes do prompt:

1. abra **Customizations → Rules**;
2. localize `secure-vibe-engineering`;
3. configure como **Always On**.

## A2.4 Não se assuste se o projeto estiver vazio

Se nenhuma stack existir ainda, o bootstrap dirá algo como:

```text
Stacks detectadas: nenhuma
Projeto sem stack detectável ainda.
```

Isso é normal. Peça ao agente para criar/inicializar a stack do sistema e ele rodará o bootstrap novamente.

## A2.5 Confirme o pre-commit

Depois que o agente terminar, execute na raiz do projeto:

```bash
python scripts/bootstrap.py --install-local
```

É seguro repetir esse comando. Ele prepara o hook naquele clone.

Depois rode **este comando do próprio template**:

```bash
python scripts/bootstrap.py --run-precommit-all
```

Você não precisa descobrir onde o executável `pre-commit` foi instalado; o bootstrap localiza o ambiente correto para você.

Resultado esperado: os hooks aparecem como `Passed` ou, se encontrarem um problema, mostram exatamente o que precisa ser corrigido.

Alguns hooks simples podem **corrigir o arquivo automaticamente** (por exemplo, espaço sobrando ou fim de arquivo). Nesse caso:

1. veja `git diff`;
2. confirme que a correção faz sentido;
3. rode `python scripts/bootstrap.py --run-precommit-all` novamente.

> A primeira execução pode demorar mais porque o pre-commit baixa os ambientes dos hooks. Ela precisa de internet.

## A2.6 Faça o primeiro push e veja o GitHub Actions

Depois de uma alteração/commit válido:

```bash
git push
```

No GitHub:

1. abra o repositório;
2. clique em **Actions**;
3. procure `Secure Vibe - CI` e `Secure Vibe - Security`.

Verde = passou. Vermelho = abra o job e entregue o erro ao agente para corrigir a causa.

---

# CAMINHO B — instalar em projeto existente

Use este caminho quando o sistema já tem código.

## B1. Faça uma segurança básica antes

O projeto existente deve estar em Git e sem alterações importantes soltas.

Dentro do projeto:

```bash
git status
```

Se houver mudanças não commitadas que você não quer perder, commit/stash antes.

## B2. Não copie arquivos manualmente

Volte ao terminal na pasta **descompactada do Secure Vibe** e execute:

Linux/macOS:

```bash
python tools/install_into_existing.py /caminho/do/seu/projeto
```

Exemplo:

```bash
python tools/install_into_existing.py ~/Projetos/meu-sistema
```

Windows PowerShell:

```powershell
python tools/install_into_existing.py "C:\Projetos\meu-sistema"
```

Se houver espaços no caminho, mantenha as aspas.

## B3. O que o instalador faz

Ele:

- adiciona os arquivos Secure Vibe que estiverem faltando;
- preserva arquivos existentes;
- **não sobrescreve silenciosamente** sua configuração;
- coloca versões que precisam de revisão em `.secure-vibe/merge-needed/`;
- preserva os valores já personalizados de `.secure-vibe/config.json`;
- acrescenta ponteiros às instruções existentes de Codex/Claude quando necessário.

## B4. Abra O PROJETO EXISTENTE no agente

Não abra a pasta do ZIP. Abra o projeto real.

Depois copie o prompt **Projeto EXISTENTE** de `PROMPTS_INICIAIS.md`.

O agente deverá revisar `.secure-vibe/merge-needed/` antes de finalizar.

## B5. Instale o hook local e valide

Dentro do projeto existente:

```bash
python scripts/bootstrap.py --install-local
python scripts/bootstrap.py --run-precommit-all
python scripts/verify_fast.py
```

Quando a configuração estiver pronta:

```bash
python scripts/verify_ci.py
python scripts/doctor.py
```

O `doctor.py` é o check-up local final. Se ele mostrar `[ERRO]`, entregue a saída ao agente e não avance até corrigir.

## B6. Commit e push

Revise o que foi alterado:

```bash
git status
git diff
```

Depois:

```bash
git add .
git commit -m "Add Secure Vibe Coding checks"
git push
```

Abra **Actions** no GitHub e confirme os workflows.

---

# 4. Entendendo `.secure-vibe/config.json`

Esse arquivo é a ponte entre qualquer stack e os scripts universais.

Exemplo:

```json
{
  "commands": {
    "install": [],
    "format_check": ["npm run format:check"],
    "lint": ["npm run lint"],
    "typecheck": ["npm run typecheck"],
    "unit_tests": ["npm run test"],
    "integration_tests": [],
    "build": ["npm run build"],
    "e2e": []
  }
}
```

O bootstrap tenta preencher o que consegue detectar com segurança. O agente completa o restante.

**Nunca coloque tokens, senhas ou chaves nesse arquivo.**

---

# 5. Como o pre-commit funciona

Quando você ou o agente faz:

```bash
git commit -m "Minha alteração"
```

rodam automaticamente:

- validações básicas de arquivos;
- Gitleaks;
- `verify_fast.py`.

Se algo falhar, o commit é bloqueado.

Não aceite esta “solução”:

```bash
git commit --no-verify
```

O objetivo é corrigir o problema, não pular o fiscal.

---

# 6. Como o GitHub Actions funciona

Arquivos em `.github/workflows/` são executados pelo GitHub.

## `secure-vibe-ci.yml`

Prepara apenas os runtimes necessários e executa os comandos de qualidade/testes/build configurados.

## `secure-vibe-security.yml`

Executa:

- Gitleaks;
- Semgrep Community Edition;
- Trivy.

## `secure-vibe-sonar.yml`

É opcional. Só faz scan quando você configurar o SonarQube Cloud e o token.

## `secure-vibe-zap.yml`

É manual. Você informa uma URL de staging que controla.

---

# 7. ETAPA MANUAL OBRIGATÓRIA — impedir gasto no GitHub Actions

Não pule esta etapa se o repositório for privado.

O GitHub Free atualmente inclui uma franquia mensal de minutos para Actions em repositórios privados. O Secure Vibe não precisa de runner pago.

Abra no GitHub:

1. **Settings** da sua conta/organização;
2. **Billing and licensing** / **Budgets and alerts**;
3. crie/revise um orçamento para GitHub Actions;
4. mantenha o gasto permitido em **R$ 0 / US$ 0 além da franquia**;
5. quando a interface oferecer **Stop usage when budget limit is reached**, deixe ativado;
6. habilite alertas de uso.

Em alguns escopos de conta pessoal, o hard stop já é obrigatório; nesse caso a opção pode não aparecer. O importante é confirmar que você não autorizou gasto adicional.

Nunca troque `ubuntu-latest` por **Larger runner** neste template.

Mais detalhes: `docs/COST_GUARDRAILS.md`.

---

# 8. Dependabot

O template monitora as próprias GitHub Actions semanalmente.

O bootstrap também adiciona ecossistemas comuns quando detecta a stack, como npm, pip, gomod, Maven e Gradle.

Quando o Dependabot abrir um PR:

1. não aceite automaticamente;
2. deixe o CI rodar;
3. aceite somente se os checks passarem e a atualização fizer sentido.

---

# 9. SonarQube Cloud Free — opcional

Use somente se quiser o dashboard de qualidade do Sonar.

## 9.1 Regra financeira

- plano: **Free**;
- limite oficial atual: **50k LOC privadas por organização**;
- limite operacional Secure Vibe: **45k LOC privadas**;
- esse limite de 45k é um **guardrail operacional/manual**, não uma compra automática nem um contador implementado pelo template;
- consulte o uso do Sonar antes de adicionar outro projeto privado quando estiver próximo do limite;
- não iniciar Team trial;
- não cadastrar cartão para esse fluxo;
- não fazer upgrade para “resolver quota”.

## 9.2 Configuração

No SonarQube Cloud:

1. entre com GitHub;
2. crie/importe o projeto;
3. confirme que sua organização está no **Free**;
4. siga o tutorial do próprio projeto para GitHub Actions;
5. gere um token de análise Free/PAT.

No GitHub do projeto, abra **Settings → Secrets and variables → Actions**.

Crie um **Repository secret**:

```text
SONAR_TOKEN
```

Crie duas **Repository variables**:

```text
SONAR_PROJECT_KEY
SONAR_ORGANIZATION
```

O workflow `Secure Vibe - SonarQube Cloud` passará a executar o scan.

> Para Maven/Gradle ou stacks especiais, o agente deve revisar o método de scanner recomendado pelo Sonar para a stack. O workflow genérico é uma base, não deve destruir a configuração nativa do projeto.

---

# 10. Playwright

Playwright não é instalado à força em todo projeto.

Se existir app web e testes E2E fizerem sentido, peça ao agente:

```text
Configure Playwright somente para os fluxos críticos deste projeto. Adicione o comando E2E em `.secure-vibe/config.json` e mantenha a suíte enxuta para não desperdiçar minutos do GitHub Actions.
```

Exemplos de fluxos críticos:

- login;
- cadastro;
- operação principal do sistema;
- autorização/permissões importantes.

---

# 11. OWASP ZAP

Só use quando houver uma aplicação web rodando.

No GitHub:

1. abra **Actions**;
2. escolha **Secure Vibe - OWASP ZAP**;
3. clique em **Run workflow**;
4. informe a URL de staging;
5. execute.

Exemplo:

```text
https://staging.meuprojeto.com
```

Use apenas em ambiente seu ou para o qual tenha autorização explícita.

ZAP é manual de propósito: evita desperdício de minutos e scans acidentais.

---

# 12. Fluxo diário depois de tudo funcionando

```text
1. abre Codex / Antigravity / Claude Code
2. pede feature/correção
3. agente implementa
4. agente roda verify_fast
5. commit → pre-commit fiscaliza
6. push / Pull Request
7. GitHub Actions fiscaliza novamente
8. Sonar analisa, se habilitado
9. falhou? agente corrige a causa
10. passou? merge
11. quando staging estiver relevante → ZAP manual
```

Você não precisa lembrar os comandos internos de Semgrep, Trivy ou Gitleaks.

---

# 13. Checklist final — só considere instalado quando isto estiver certo

```text
[ ] estou trabalhando no PROJETO correto, não na pasta errada do ZIP
[ ] .github/ existe e foi enviado ao GitHub
[ ] .agents/ existe se eu puder usar Antigravity
[ ] AGENTS.md existe para Codex
[ ] CLAUDE.md existe para Claude Code
[ ] agente leu as regras Secure Vibe
[ ] bootstrap detectou/adaptou a stack
[ ] .secure-vibe/config.json foi revisado pelo agente
[ ] pre-commit foi instalado neste clone
[ ] `python scripts/bootstrap.py --run-precommit-all` passou
[ ] `python scripts/verify_fast.py` passou
[ ] `python scripts/verify_ci.py` passou quando a stack já está pronta
[ ] `python scripts/doctor.py` terminou sem `[ERRO]`
[ ] GitHub Actions CI executou
[ ] GitHub Actions Security executou
[ ] hard stop/orçamento do GitHub Actions foi confirmado
[ ] Dependabot está ativo
[ ] SonarQube Cloud permanece Free, se eu optei por usá-lo
[ ] entendi o limite interno Sonar de 45k LOC privadas
[ ] Playwright só foi adicionado se E2E realmente fizer sentido
[ ] ZAP ficou manual e será usado apenas contra staging autorizado
```

Se algum item falhar, abra `docs/TROUBLESHOOTING.md` antes de tentar contornar a proteção.

---

# 14. Regra de ouro para qualquer IA

Se o agente disser algo equivalente a “vou desativar o scanner/teste para fazer passar”, responda:

```text
Não. Investigue e corrija a causa raiz. Se for falso positivo, explique tecnicamente antes de propor a menor supressão possível.
```

---

# 15. Onde está o prompt que devo mandar para a IA?

Em:

```text
PROMPTS_INICIAIS.md
```

Escolha **um** agente e **um** cenário (novo ou existente). Não é necessário colar os três prompts.
