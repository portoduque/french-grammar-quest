#!/usr/bin/env python3
"""Executa todas as verificações de qualidade/teste/build configuradas."""
from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / ".secure-vibe" / "config.json"
GROUPS = (
    "format_check",
    "lint",
    "typecheck",
    "unit_tests",
    "integration_tests",
    "build",
    "e2e",
)
STACK_MARKERS = (
    "package.json", "pyproject.toml", "requirements.txt", "requirements-dev.txt",
    "Pipfile", "poetry.lock", "uv.lock", "go.mod", "pom.xml", "build.gradle",
    "build.gradle.kts", "settings.gradle", "settings.gradle.kts",
)


def load_config() -> dict | None:
    if not CONFIG.exists():
        print("[secure-vibe] ERRO: config ausente. Execute bootstrap.")
        return None
    try:
        data = json.loads(CONFIG.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"[secure-vibe] ERRO: config.json inválido: {exc}")
        return None
    if not isinstance(data.get("commands", {}), dict):
        print("[secure-vibe] ERRO: 'commands' precisa ser um objeto JSON.")
        return None
    return data


def main() -> int:
    cfg = load_config()
    if cfg is None:
        return 1

    commands = cfg.get("commands", {})
    total = 0
    failures: list[str] = []

    for group in GROUPS:
        values = commands.get(group, []) or []
        if not isinstance(values, list):
            print(f"[secure-vibe] ERRO: commands.{group} precisa ser uma lista.")
            return 1
        for command in values:
            if not isinstance(command, str) or not command.strip():
                print(f"[secure-vibe] ERRO: comando inválido em commands.{group}.")
                return 1
            total += 1
            print(f"\n[secure-vibe:{group}] $ {command}", flush=True)
            code = subprocess.call(command, cwd=ROOT, shell=True, env=os.environ.copy())
            if code != 0:
                failures.append(f"{group}: {command}")

    if failures:
        print("\n[secure-vibe] CI LOCAL FALHOU:")
        for item in failures:
            print(f"  - {item}")
        return 1

    has_stack = any((ROOT / marker).exists() for marker in STACK_MARKERS)
    if total == 0 and has_stack:
        print("\n[secure-vibe] ERRO: stack detectada, mas nenhuma verificação de qualidade/teste/build foi configurada.")
        print("[secure-vibe] Rode bootstrap e peça ao agente para completar .secure-vibe/config.json.")
        return 1

    if total == 0:
        print("[secure-vibe] Template sem stack de aplicação; nenhum check de stack é necessário ainda.")
        return 0

    print(f"\n[secure-vibe] OK — {total} verificação(ões) de CI passaram.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
