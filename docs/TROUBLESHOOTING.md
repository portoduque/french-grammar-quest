# Troubleshooting — quando algo der errado

Use esta página antes de tentar pular um check.

## 1. `python: command not found`

Tente:

```bash
python3 --version
```

Se funcionar, troque `python` por `python3` nos comandos manuais deste guia.

O template pressupõe Python **3.10 ou superior** para seus scripts auxiliares. Se seu projeto precisa de Python mais antigo, peça ao agente para manter o runtime Secure Vibe separado do runtime da aplicação.

## 2. `git: command not found`

Git não está instalado/disponível no terminal. Instale o Git antes de continuar. Não rode o instalador de projeto existente em uma pasta aleatória sem Git.

## 3. `pre-commit` não está disponível

Não é necessário instalar globalmente. Rode:

```bash
python scripts/bootstrap.py --install-local
```

O bootstrap primeiro tenta reutilizar uma instalação existente. Se não encontrar, cria um ambiente isolado em:

```text
.secure-vibe/runtime/precommit-venv/
```

Depois teste todos os hooks com:

```bash
python scripts/bootstrap.py --run-precommit-all
```

Na primeira vez, internet é necessária para baixar os hooks.

### Linux: erro ao criar ambiente virtual

Em Debian/Ubuntu/Pop!_OS pode faltar o suporte a `venv`. O erro do bootstrap indicará isso. Instale o pacote de `venv` correspondente à sua versão do Python e repita o comando.

## 4. `verify_fast.py` ou `verify_ci.py` diz que existem zero checks

### Projeto ainda vazio

Se não existe `package.json`, `pyproject.toml`, `go.mod`, `pom.xml`, Gradle etc., isso é normal.

### Projeto já tem uma stack

A validação **falha de propósito**. Execute:

```bash
python scripts/bootstrap.py --detect
```

Depois peça ao agente para configurar os checks aplicáveis em `.secure-vibe/config.json`.

## 5. `.secure-vibe/config.json` inválido

Não apague o arquivo para “resolver”. Peça ao agente para corrigir o JSON. O bootstrap evita sobrescrever um arquivo inválido para não destruir configuração personalizada.

## 6. Existe `.secure-vibe/merge-needed/`

Isso acontece em projeto existente quando o instalador encontra um arquivo com o mesmo nome, mas conteúdo diferente.

Significa:

```text
arquivo do projeto foi preservado
+
versão Secure Vibe foi colocada em merge-needed
```

Abra cada par com o agente e faça um merge consciente. Não copie tudo cegamente por cima.

## 7. `.github/` ou `.agents/` “sumiu”

Pastas que começam com ponto podem ficar ocultas no gerenciador de arquivos.

No terminal Linux/macOS:

```bash
ls -la
```

No PowerShell:

```powershell
Get-ChildItem -Force
```

Se `.github/` não foi enviado ao GitHub, GitHub Actions não existe para aquele projeto.

## 8. Gitleaks encontrou segredo

1. Não faça bypass do hook.
2. Remova o segredo do arquivo.
3. Se o segredo já foi commitado/publicado, considere-o comprometido e rotacione-o.
4. Se necessário, limpe o histórico Git com procedimento apropriado.

Nunca transforme uma credencial real em allowlist só para o check passar.

## 9. Semgrep encontrou alerta

Peça ao agente para explicar o fluxo vulnerável e corrigir a causa. Não adicione `nosemgrep` automaticamente.

Se for falso positivo, documente por que é falso e suprima somente o menor trecho necessário.

## 10. Trivy encontrou CVE

Ordem recomendada:

1. atualizar dependência/imagem;
2. remover dependência desnecessária;
3. confirmar se o CVE afeta seu contexto;
4. só então documentar uma exceção temporária, se realmente necessária.

## 11. Node: `pnpm` ou `yarn` não encontrado

O instalador tenta usar o gerenciador indicado pelo lockfile/`packageManager`, depois tenta Corepack e por último npm. Se ainda falhar, peça ao agente para conferir a versão declarada no projeto e configurar `commands.install` explicitamente.

## 12. Python: dependências não instalaram

O instalador conhece `uv.lock`, `poetry.lock`, `Pipfile`, `requirements-dev.txt`, `requirements.txt` e `pyproject.toml` simples.

Projetos com instalação especial devem preencher:

```json
"commands": {
  "install": ["SEU COMANDO DE INSTALAÇÃO"]
}
```

Esse comando tem prioridade sobre a autodetecção.

## 13. Go falha no GitHub Actions com `go: command not found`

A versão auditada do template prepara Go automaticamente quando existe `go.mod` usando `actions/setup-go`. Se isso ocorrer, confira se você está usando a versão atual do workflow e se `go.mod` está na raiz. Monorepos podem exigir adaptação do agente.

## 14. Maven/Gradle falha no GitHub Actions com Java ausente

A versão auditada prepara Java quando detecta Maven/Gradle. Ela usa `.java-version` quando presente e Java 21 como fallback.

Se seu projeto exige outra versão e não possui `.java-version`, peça ao agente para criar/adaptar a indicação de runtime em vez de simplesmente trocar o código da aplicação.

## 15. Wrapper Maven/Gradle retorna `Permission denied`

O wrapper Secure Vibe tenta executar `mvnw`/`gradlew` por `bash` quando o bit executável foi perdido ao extrair um ZIP.

Mesmo assim, é boa prática versionar o bit executável no Git quando aplicável.

## 16. GitHub Actions não apareceu

Confira:

1. `.github/workflows/` existe no repositório **no GitHub**;
2. os arquivos `.yml` foram commitados/pushados;
3. Actions não está desabilitado nas configurações do repositório;
4. abra a aba **Actions** e procure os workflows Secure Vibe.

## 17. GitHub Actions parou por cota/orçamento

Isso é preferível a gerar cobrança. Consulte `docs/COST_GUARDRAILS.md` e espere a renovação da franquia ou rode os checks localmente. Não aumente o orçamento automaticamente.

## 18. Sonar não executou

O workflow é opcional e só executa o scan quando existem:

- Secret `SONAR_TOKEN`;
- Variable `SONAR_PROJECT_KEY`;
- Variable `SONAR_ORGANIZATION`.

Confirme também que a organização permanece no plano **Free** e dentro do limite definido em `docs/COST_GUARDRAILS.md`.

## 19. Sonar diz que o scanner genérico não serve para Maven/Gradle

Algumas stacks usam integração nativa de scanner/build. Peça ao agente para seguir o método oficial indicado pelo Sonar para aquela stack, preservando o Free tier. Não force o workflow genérico.

## 20. ZAP não executou

O ZAP é **manual por padrão**.

GitHub → Actions → `Secure Vibe - OWASP ZAP` → **Run workflow** → informe a URL de staging.

Use apenas URL de sistema sob seu controle ou com autorização explícita.

## 21. ZAP abriu uma Issue no GitHub

É comportamento esperado do workflow atual quando encontra resultados/reporta o scan. A permissão `issues: write` existe apenas nesse workflow manual.

## 22. Um agente sugere `--no-verify`, desativar teste ou ignorar scanner

Não aceite como correção. Responda:

```text
Investigue e corrija a causa raiz. Se for falso positivo, explique tecnicamente antes de propor a menor supressão possível.
```

## 23. `doctor.py` mostra `[ERRO]`

Não ignore. O Doctor não corrige nada sozinho: ele aponta instalação incompleta, pre-commit ausente, conflito pendente ou stack sem checks. Entregue a saída ao agente e corrija antes de considerar o setup concluído.
