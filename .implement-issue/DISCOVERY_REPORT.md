# Relatório de Descoberta do Projeto (Discovery Report)

**Data:** 2026-10-13
**Repositório:** `portoduque/french-grammar-quest`
**Perfil Persistido:** `.implement-issue/PROJECT_PROFILE.yaml` (aprovado)

---

## 1. Contexto e Classificação
- **Classificação do Repositório**: `single-project` — Repositório de base de conteúdo e especificação pedagógica/funcional (*Content Foundation & PRD*).
- **Status da Aplicação**: Não há aplicativo construído (sem React, Vue, Supabase, Vercel ou game engine atualmente no repositório).
- **Corpus de Dados**: 28 capítulos estruturados em Markdown e JSON, com 527 páginas indexadas, 233 grupos de exercícios e 2.227 questões rastreáveis contra as páginas de origem.

## 2. Tecnologias e Runtimes
- **Linguagens**: Python (scripts de auditoria/validação), JSON / JSON Schema (dados e esquemas estruturados), Markdown (teoria e documentação).
- **Runtimes**: Python 3.12 (configurado no GitHub Actions) e Python 3.13 (ambiente local do usuário).
- **Gerenciador de Pacotes**: `pip` (dependência: `jsonschema>=4.23,<5`).

## 3. Qualidade, Testes e Verificação Executável
- **CI/CD**: GitHub Actions via `.github/workflows/content-validation.yml`.
- **Scripts de Validação Testados com Sucesso Localmente**:
  - `python -m py_compile scripts/*.py`: compilação limpa.
  - `python scripts/validate_content.py`: validação pública do manifesto e esquemas.
  - `python scripts/validate_content.py --private .`: validação privada de 100 questões/respostas e integridade do Capítulo 01.
  - `python scripts/validate_phase_b.py`: validação dos Capítulos 02 a 28 (2.127 questões e 223 exercícios).
  - `python scripts/audit_phase_c.py --check-report`: auditoria completa de 28 capítulos e 2.227 itens.
  - `python scripts/validate_prd.py`: validação de cobertura do PRD (73 requisitos, 18 critérios de aceite).

## 4. Observações e Guardrails
- **Direitos Autorais e Privacidade**: Repositório privado com conteúdo de terceiros. Verificações de segurança e privacidade impedem publicação acidental em CDNs públicas ou bancos não autenticados.
- **Finais de Linha (CRLF vs LF no Windows)**: O repositório realiza hash SHA-1 de blobs brutos (ex: `chapters/01/theory-source.md`). No Windows, o Git deve manter finais de linha em `LF` para evitar divergência nos hashes calculados.
