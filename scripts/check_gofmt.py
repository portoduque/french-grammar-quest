#!/usr/bin/env python3
from __future__ import annotations
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
proc = subprocess.run(["gofmt", "-l", "."], cwd=root, text=True, capture_output=True)
if proc.returncode != 0:
    print(proc.stderr)
    raise SystemExit(proc.returncode)
files = [line for line in proc.stdout.splitlines() if line.strip()]
if files:
    print("Arquivos Go fora do gofmt:")
    print("\n".join(files))
    raise SystemExit(1)
print("gofmt OK")
