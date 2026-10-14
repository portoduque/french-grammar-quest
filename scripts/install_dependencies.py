#!/usr/bin/env python3
"""Instala dependências no CI com regras conservadoras e adaptáveis.

Se `.secure-vibe/config.json` possuir `commands.install`, esses comandos têm prioridade.
Caso contrário, usa autodetecção para gerenciadores comuns.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / ".secure-vibe" / "config.json"


def run(cmd: list[str]) -> None:
    print("[secure-vibe:deps] $", " ".join(cmd), flush=True)
    subprocess.check_call(cmd, cwd=ROOT, env=os.environ.copy())


def run_shell(command: str) -> None:
    print(f"[secure-vibe:deps] $ {command}", flush=True)
    subprocess.check_call(command, cwd=ROOT, env=os.environ.copy(), shell=True)


def configured_install(cfg: dict) -> bool:
    commands = cfg.get("commands", {}).get("install", []) or []
    if not commands:
        return False
    for command in commands:
        run_shell(command)
    return True


def package_manager_declared() -> tuple[str | None, str | None]:
    package = ROOT / "package.json"
    if not package.exists():
        return None, None
    try:
        pkg = json.loads(package.read_text(encoding="utf-8"))
        value = str(pkg.get("packageManager", "")).strip()
        if "@" in value:
            name, version = value.split("@", 1)
            return name.lower(), version
        return (value.lower() or None), None
    except Exception:
        return None, None


def ensure_node_manager(manager: str) -> None:
    if shutil.which(manager):
        return

    declared, version = package_manager_declared()
    requested = version if declared == manager and version else None
    corepack = shutil.which("corepack")

    if corepack:
        try:
            run([corepack, "enable"])
        except subprocess.CalledProcessError:
            print("[secure-vibe:deps] corepack enable falhou; tentando ativação sem depender do shim global.")
        if shutil.which(manager):
            return
        if requested:
            try:
                run([corepack, "prepare", f"{manager}@{requested}", "--activate"])
            except subprocess.CalledProcessError:
                pass
        if shutil.which(manager):
            return

    npm = shutil.which("npm")
    if not npm:
        raise SystemExit(f"{manager} é necessário, mas npm/corepack não estão disponíveis no runner.")
    target = f"{manager}@{requested}" if requested else ("yarn@1" if manager == "yarn" else manager)
    run([npm, "install", "--global", target, "--no-audit", "--no-fund"])


def node_install(cfg: dict) -> None:
    if not (ROOT / "package.json").exists():
        return

    if (ROOT / "pnpm-lock.yaml").exists():
        ensure_node_manager("pnpm")
        run(["pnpm", "install", "--frozen-lockfile"])
    elif (ROOT / "yarn.lock").exists():
        ensure_node_manager("yarn")
        pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        declared = str(pkg.get("packageManager", ""))
        yarn_flag = "--frozen-lockfile" if declared.startswith("yarn@1.") or not declared else "--immutable"
        run(["yarn", "install", yarn_flag])
    elif (ROOT / "package-lock.json").exists() or (ROOT / "npm-shrinkwrap.json").exists():
        run(["npm", "ci", "--no-audit", "--no-fund"])
    else:
        run(["npm", "install", "--no-audit", "--no-fund"])

    # Browser E2E só quando o projeto declarou E2E e Playwright está instalado.
    if cfg.get("commands", {}).get("e2e"):
        try:
            pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
            deps = {**(pkg.get("dependencies") or {}), **(pkg.get("devDependencies") or {})}
            if "@playwright/test" in deps or "playwright" in deps:
                run(["npx", "playwright", "install", "--with-deps", "chromium"])
        except Exception as exc:
            print(f"[secure-vibe:deps] aviso ao detectar Playwright: {exc}")


def pip_install(*args: str) -> None:
    run([sys.executable, "-m", "pip", "install", "--disable-pip-version-check", *args])


def python_install() -> None:
    markers = ("pyproject.toml", "requirements.txt", "requirements-dev.txt", "setup.py", "uv.lock", "poetry.lock", "Pipfile")
    if not any((ROOT / name).exists() for name in markers):
        return

    if (ROOT / "uv.lock").exists():
        if not shutil.which("uv"):
            pip_install("uv")
        run(["uv", "sync", "--frozen"])
        return

    if (ROOT / "poetry.lock").exists():
        if not shutil.which("poetry"):
            pip_install("poetry")
        run(["poetry", "install", "--no-interaction"])
        return

    if (ROOT / "Pipfile").exists():
        if not shutil.which("pipenv"):
            pip_install("pipenv")
        run(["pipenv", "sync", "--dev"])
        return

    if (ROOT / "requirements-dev.txt").exists():
        pip_install("-r", "requirements-dev.txt")
    elif (ROOT / "requirements.txt").exists():
        pip_install("-r", "requirements.txt")
    elif (ROOT / "pyproject.toml").exists():
        try:
            pip_install("-e", ".[dev]")
        except subprocess.CalledProcessError:
            print("[secure-vibe:deps] Extra [dev] não disponível; tentando instalação editável padrão.")
            pip_install("-e", ".")


def go_install() -> None:
    if (ROOT / "go.mod").exists():
        if not shutil.which("go"):
            raise SystemExit("Go não está disponível no runner. O workflow Secure Vibe deveria ter executado actions/setup-go.")
        run(["go", "mod", "download"])


def main() -> int:
    cfg = json.loads(CONFIG.read_text(encoding="utf-8")) if CONFIG.exists() else {"commands": {}}

    if configured_install(cfg):
        print("[secure-vibe:deps] Instalação personalizada concluída; autodetecção ignorada.")
        return 0

    node_install(cfg)
    python_install()
    go_install()
    # Maven/Gradle resolvem dependências durante wrapper/test/build.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
