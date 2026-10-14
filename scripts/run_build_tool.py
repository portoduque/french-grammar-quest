#!/usr/bin/env python3
"""Wrapper cross-platform para Maven/Gradle usado pelos comandos detectados."""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def wrapper_command(path: Path, windows: bool) -> list[str]:
    if windows:
        return [str(path)]
    # Em ZIPs, o bit executável pode se perder. bash evita uma falha confusa de permissão.
    if os.access(path, os.X_OK):
        return [str(path)]
    bash = shutil.which("bash")
    if bash:
        return [bash, str(path)]
    return [str(path)]


def choose(tool: str) -> list[str]:
    windows = os.name == "nt"
    if tool == "maven":
        wrapper = ROOT / ("mvnw.cmd" if windows else "mvnw")
        if wrapper.exists():
            return wrapper_command(wrapper, windows)
        exe = shutil.which("mvn")
        if exe:
            return [exe]
    if tool == "gradle":
        wrapper = ROOT / ("gradlew.bat" if windows else "gradlew")
        if wrapper.exists():
            return wrapper_command(wrapper, windows)
        exe = shutil.which("gradle")
        if exe:
            return [exe]
    raise SystemExit(
        f"{tool} não encontrado. Use o wrapper do projeto (recomendado) ou instale a ferramenta."
    )


def main() -> int:
    if len(sys.argv) != 3 or sys.argv[1] not in {"maven", "gradle"} or sys.argv[2] not in {"test", "build"}:
        print("Uso: python scripts/run_build_tool.py <maven|gradle> <test|build>")
        return 2

    tool, task = sys.argv[1], sys.argv[2]
    cmd = choose(tool)
    if tool == "maven":
        cmd += ["-B", "test"] if task == "test" else ["-B", "package", "-DskipTests"]
    else:
        cmd += ["--no-daemon", "test"] if task == "test" else ["--no-daemon", "assemble"]

    print("[secure-vibe:java] $", " ".join(cmd), flush=True)
    return subprocess.call(cmd, cwd=ROOT)


if __name__ == "__main__":
    raise SystemExit(main())
