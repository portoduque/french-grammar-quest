#!/usr/bin/env python3
"""Check-up local simples do Secure Vibe Coding.

Não acessa contas externas nem substitui GitHub Actions/Sonar/ZAP.
Retorna 0 quando a instalação local está coerente e 1 quando existe algo que
precisa ser corrigido antes de considerar o setup concluído.
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / ".secure-vibe" / "config.json"
REQUIRED = (
    "AGENTS.md",
    "CLAUDE.md",
    ".agents/rules/secure-vibe-engineering.md",
    ".pre-commit-config.yaml",
    ".github/workflows/secure-vibe-ci.yml",
    ".github/workflows/secure-vibe-security.yml",
    ".github/workflows/secure-vibe-sonar.yml",
    ".github/workflows/secure-vibe-zap.yml",
    ".github/dependabot.yml",
    ".secure-vibe/config.json",
    "scripts/bootstrap.py",
    "scripts/verify_fast.py",
    "scripts/verify_ci.py",
)
STACK_MARKERS = (
    "package.json", "pyproject.toml", "requirements.txt", "requirements-dev.txt",
    "Pipfile", "poetry.lock", "uv.lock", "go.mod", "pom.xml", "build.gradle",
    "build.gradle.kts", "settings.gradle", "settings.gradle.kts",
)
CHECK_GROUPS = (
    "format_check", "lint", "typecheck", "unit_tests", "integration_tests", "build", "e2e"
)


def ok(message: str) -> None:
    print(f"[OK] {message}")


def warn(message: str) -> None:
    print(f"[AVISO] {message}")


def fail(message: str) -> None:
    print(f"[ERRO] {message}")


def git(*args: str) -> subprocess.CompletedProcess[str] | None:
    if not shutil.which("git"):
        return None
    return subprocess.run(
        ["git", *args], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        text=True, check=False,
    )


def main() -> int:
    print("Secure Vibe Doctor — check-up local\n")
    errors = 0

    if sys.version_info >= (3, 10):
        ok(f"Python {sys.version_info.major}.{sys.version_info.minor}")
    else:
        fail("Python 3.10+ é necessário para os scripts Secure Vibe.")
        errors += 1

    if shutil.which("git"):
        ok("Git encontrado")
    else:
        fail("Git não encontrado no PATH")
        errors += 1

    for rel in REQUIRED:
        if (ROOT / rel).exists():
            continue
        fail(f"arquivo obrigatório ausente: {rel}")
        errors += 1
    if errors == 0:
        ok("arquivos-base Secure Vibe presentes")

    cfg = None
    if CONFIG.exists():
        try:
            cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
            if not isinstance(cfg.get("commands"), dict):
                raise ValueError("commands precisa ser objeto")
            ok(".secure-vibe/config.json válido")
        except Exception as exc:
            fail(f"config.json inválido: {exc}")
            errors += 1

    repo = git("rev-parse", "--is-inside-work-tree")
    if repo is None:
        pass
    elif repo.returncode == 0 and repo.stdout.strip() == "true":
        ok("diretório é um repositório Git")
        hook = ROOT / ".git" / "hooks" / "pre-commit"
        git_dir = git("rev-parse", "--git-dir")
        if git_dir and git_dir.returncode == 0:
            actual_hook = (ROOT / git_dir.stdout.strip() / "hooks" / "pre-commit").resolve()
            hook = actual_hook
        if hook.exists():
            ok("hook pre-commit instalado neste clone")
        else:
            fail("hook pre-commit ainda não está instalado. Rode: python scripts/bootstrap.py --install-local")
            errors += 1

        remote = git("remote", "get-url", "origin")
        if remote and remote.returncode == 0 and remote.stdout.strip():
            ok("remote Git 'origin' configurado")
        else:
            warn("remote 'origin' não configurado; GitHub Actions só funcionará depois de enviar o projeto ao GitHub")
    else:
        fail("esta pasta ainda não é um repositório Git")
        errors += 1

    merge_dir = ROOT / ".secure-vibe" / "merge-needed"
    pending = [p for p in merge_dir.rglob("*") if p.is_file()] if merge_dir.exists() else []
    if pending:
        fail(f"existem {len(pending)} arquivo(s) pendente(s) em .secure-vibe/merge-needed/")
        errors += 1
    else:
        ok("nenhum conflito Secure Vibe pendente")

    has_stack = any((ROOT / marker).exists() for marker in STACK_MARKERS)
    if cfg and has_stack:
        configured = sum(len(cfg.get("commands", {}).get(group, []) or []) for group in CHECK_GROUPS)
        if configured:
            ok(f"stack possui {configured} check(s) de qualidade/teste/build configurado(s)")
        else:
            fail("stack detectável existe, mas nenhum check de qualidade/teste/build foi configurado")
            errors += 1
    elif has_stack:
        fail("stack detectável existe, mas config não pôde ser validado")
        errors += 1
    else:
        warn("nenhuma stack de aplicação detectada; normal se este ainda for apenas o template vazio")

    if errors:
        print(f"\nRESULTADO: {errors} problema(s) local(is) precisam de correção.")
        print("Abra docs/TROUBLESHOOTING.md ou entregue esta saída ao seu agente.")
        return 1

    print("\nRESULTADO: instalação local coerente.")
    print("Ainda confirme manualmente GitHub Actions/custos e integrações externas conforme docs/ETAPAS_MANUAIS.md.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
