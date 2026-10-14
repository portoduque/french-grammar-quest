#!/usr/bin/env python3
"""Executa as verificações rápidas configuradas em .secure-vibe/config.json."""
from __future__ import annotations

import json
import os
import shlex
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / ".secure-vibe" / "config.json"
FAST_GROUPS = ("format_check", "lint", "typecheck", "unit_tests")
STACK_MARKERS = {
    "node": ("package.json",),
    "python": ("pyproject.toml", "requirements.txt", "requirements-dev.txt", "Pipfile", "poetry.lock", "uv.lock"),
    "go": ("go.mod",),
    "maven": ("pom.xml",),
    "gradle": ("build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"),
}


def load_config() -> dict | None:
    if not CONFIG.exists():
        print("[secure-vibe] ERRO: .secure-vibe/config.json não existe.")
        print("[secure-vibe] Execute: python scripts/bootstrap.py --detect")
        return None
    try:
        data = json.loads(CONFIG.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"[secure-vibe] ERRO: config.json inválido: {exc}")
        print("[secure-vibe] Não sobrescreva o arquivo. Peça ao agente para corrigir o JSON.")
        return None
    if not isinstance(data.get("commands", {}), dict):
        print("[secure-vibe] ERRO: 'commands' precisa ser um objeto JSON.")
        return None
    return data


def detected_stacks() -> list[str]:
    found: list[str] = []
    for stack, markers in STACK_MARKERS.items():
        if any((ROOT / marker).exists() for marker in markers):
            found.append(stack)
    return found


def run_command(command: str) -> int:
    print(f"\n[secure-vibe] $ {command}", flush=True)
    try:
        args = shlex.split(command, posix=(os.name != "nt"))
        return subprocess.call(args, cwd=ROOT, shell=False, env=os.environ.copy())
    except Exception:
        return subprocess.call(shlex.split(command), cwd=ROOT, shell=False, env=os.environ.copy())


def main() -> int:
    cfg = load_config()
    if cfg is None:
        return 1

    commands = cfg.get("commands", {})
    total = 0
    failures: list[str] = []

    for group in FAST_GROUPS:
        values = commands.get(group, []) or []
        if not isinstance(values, list):
            print(f"[secure-vibe] ERRO: commands.{group} precisa ser uma lista.")
            return 1
        for command in values:
            if not isinstance(command, str) or not command.strip():
                print(f"[secure-vibe] ERRO: comando inválido em commands.{group}.")
                return 1
            total += 1
            if run_command(command) != 0:
                failures.append(f"{group}: {command}")

    if failures:
        print("\n[secure-vibe] FALHOU:")
        for item in failures:
            print(f"  - {item}")
        return 1

    stacks = detected_stacks()
    if total == 0 and stacks:
        print("\n[secure-vibe] ERRO: existe um projeto real, mas nenhum check rápido foi configurado.")
        print(f"[secure-vibe] Stack(s) detectada(s): {', '.join(stacks)}")
        print("[secure-vibe] Rode: python scripts/bootstrap.py --detect")
        print("[secure-vibe] Depois peça ao seu agente para configurar lint/typecheck/testes aplicáveis.")
        return 1

    if total == 0:
        print("[secure-vibe] Template ainda sem stack de aplicação. Isso é normal antes de criar o projeto.")
        return 0

    print(f"\n[secure-vibe] OK — {total} verificação(ões) rápida(s) passaram.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
