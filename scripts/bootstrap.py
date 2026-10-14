#!/usr/bin/env python3
"""Detecta stacks, atualiza a configuração e prepara o pre-commit local.

O script é conservador:
- preserva comandos personalizados;
- adiciona chaves novas de configuração sem apagar valores existentes;
- não instala frameworks da aplicação;
- o pre-commit local pode usar um ambiente isolado em .secure-vibe/runtime/.
"""
from __future__ import annotations

import argparse
import copy
import json
import os
import shutil
import subprocess
import sys
import venv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / ".secure-vibe" / "config.json"
RUNTIME_DIR = ROOT / ".secure-vibe" / "runtime"
PRECOMMIT_VENV = RUNTIME_DIR / "precommit-venv"

COMMAND_KEYS = (
    "install",
    "format_check",
    "lint",
    "typecheck",
    "unit_tests",
    "integration_tests",
    "build",
    "e2e",
)

DEFAULT_CONFIG = {
    "schema_version": 2,
    "detected_stacks": [],
    "package_manager": None,
    "commands": {key: [] for key in COMMAND_KEYS},
    "sonar": {"internal_private_loc_limit": 45000},
    "zap": {"manual_only": True},
}


def load_json(path: Path, default: dict, *, fatal: bool = False) -> dict:
    if not path.exists():
        return copy.deepcopy(default)
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(value, dict):
            raise ValueError("o JSON raiz precisa ser um objeto")
        return value
    except Exception as exc:
        if fatal:
            raise SystemExit(
                f"[secure-vibe] ERRO: {path} contém JSON inválido: {exc}. "
                "Corrija o arquivo antes de continuar para não perder configuração."
            )
        print(f"[secure-vibe] AVISO ao ler {path}: {exc}")
        return copy.deepcopy(default)


def merge_defaults(default: dict, current: dict) -> dict:
    """Adiciona chaves ausentes sem sobrescrever valores do usuário."""
    result = copy.deepcopy(default)
    for key, value in current.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = merge_defaults(result[key], value)
        else:
            result[key] = value
    return result




def validate_config_shape(cfg: dict) -> None:
    commands = cfg.get("commands")
    if not isinstance(commands, dict):
        raise SystemExit(
            "[secure-vibe] ERRO: .secure-vibe/config.json possui 'commands' inválido. "
            "Ele precisa ser um objeto JSON. Peça ao agente para corrigir o arquivo; ele não será sobrescrito automaticamente."
        )
    for key in COMMAND_KEYS:
        value = commands.get(key, [])
        if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
            raise SystemExit(
                f"[secure-vibe] ERRO: commands.{key} precisa ser uma lista de strings em .secure-vibe/config.json."
            )
    if not isinstance(cfg.get("detected_stacks", []), list):
        raise SystemExit("[secure-vibe] ERRO: detected_stacks precisa ser uma lista em .secure-vibe/config.json.")

def append_unique(values: list[str], value: str | None) -> None:
    if value and value not in values:
        values.append(value)


def detect_node(cfg: dict) -> None:
    package_file = ROOT / "package.json"
    if not package_file.exists():
        return

    append_unique(cfg["detected_stacks"], "node")
    pkg = load_json(package_file, {})
    scripts = pkg.get("scripts", {}) or {}

    declared_pm = str(pkg.get("packageManager", "")).split("@", 1)[0].strip().lower()
    if (ROOT / "pnpm-lock.yaml").exists():
        pm = "pnpm"
    elif (ROOT / "yarn.lock").exists():
        pm = "yarn"
    elif (ROOT / "package-lock.json").exists() or (ROOT / "npm-shrinkwrap.json").exists():
        pm = "npm"
    elif declared_pm in {"npm", "pnpm", "yarn"}:
        pm = declared_pm
    else:
        pm = "npm"
    cfg["package_manager"] = pm

    def run_script(name: str) -> str:
        return f"{pm} run {name}" if pm != "npm" else f"npm run {name}"

    mapping = {
        "format_check": ["format:check", "format-check", "check:format"],
        "lint": ["lint"],
        "typecheck": ["typecheck", "type-check", "check:types"],
        "unit_tests": ["test:unit", "test"],
        "integration_tests": ["test:integration", "test:integration:ci"],
        "build": ["build"],
        "e2e": ["test:e2e", "e2e", "playwright:test"],
    }
    for group, names in mapping.items():
        if cfg["commands"].get(group):
            continue
        for name in names:
            if name in scripts:
                cfg["commands"][group] = [run_script(name)]
                break


def detect_python(cfg: dict) -> None:
    pyproject = ROOT / "pyproject.toml"
    markers = [
        pyproject,
        ROOT / "requirements.txt",
        ROOT / "requirements-dev.txt",
        ROOT / "pytest.ini",
        ROOT / "setup.cfg",
        ROOT / "setup.py",
        ROOT / "uv.lock",
        ROOT / "poetry.lock",
        ROOT / "Pipfile",
    ]
    if not any(p.exists() for p in markers):
        return

    append_unique(cfg["detected_stacks"], "python")
    text = pyproject.read_text(encoding="utf-8", errors="ignore") if pyproject.exists() else ""

    if not cfg["commands"].get("format_check") and "[tool.ruff" in text:
        cfg["commands"]["format_check"] = ["python -m ruff format --check ."]
    if not cfg["commands"].get("lint") and "[tool.ruff" in text:
        cfg["commands"]["lint"] = ["python -m ruff check ."]
    if not cfg["commands"].get("typecheck"):
        if "[tool.mypy" in text:
            cfg["commands"]["typecheck"] = ["python -m mypy ."]
        elif "[tool.pyright" in text:
            cfg["commands"]["typecheck"] = ["pyright"]
    if not cfg["commands"].get("unit_tests"):
        if "[tool.pytest" in text or (ROOT / "pytest.ini").exists() or (ROOT / "tests").exists():
            cfg["commands"]["unit_tests"] = ["python -m pytest -q"]


def detect_go(cfg: dict) -> None:
    if not (ROOT / "go.mod").exists():
        return
    append_unique(cfg["detected_stacks"], "go")
    if not cfg["commands"].get("format_check"):
        cfg["commands"]["format_check"] = ["python scripts/check_gofmt.py"]
    if not cfg["commands"].get("lint"):
        cfg["commands"]["lint"] = ["go vet ./..."]
    if not cfg["commands"].get("unit_tests"):
        cfg["commands"]["unit_tests"] = ["go test ./..."]
    if not cfg["commands"].get("build"):
        cfg["commands"]["build"] = ["go build ./..."]


def detect_java(cfg: dict) -> None:
    if (ROOT / "pom.xml").exists():
        append_unique(cfg["detected_stacks"], "java-maven")
        if not cfg["commands"].get("unit_tests"):
            cfg["commands"]["unit_tests"] = ["python scripts/run_build_tool.py maven test"]
        if not cfg["commands"].get("build"):
            cfg["commands"]["build"] = ["python scripts/run_build_tool.py maven build"]

    if (ROOT / "build.gradle").exists() or (ROOT / "build.gradle.kts").exists():
        append_unique(cfg["detected_stacks"], "java-gradle")
        if not cfg["commands"].get("unit_tests"):
            cfg["commands"]["unit_tests"] = ["python scripts/run_build_tool.py gradle test"]
        if not cfg["commands"].get("build"):
            cfg["commands"]["build"] = ["python scripts/run_build_tool.py gradle build"]


def update_dependabot(stacks: list[str]) -> None:
    path = ROOT / ".github" / "dependabot.yml"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    if "# SECURE-VIBE-MANAGED" not in text:
        print("[secure-vibe] Dependabot existente não é gerenciado pelo template; não foi alterado.")
        return

    additions: list[str] = []
    specs = [
        ("node", "npm"),
        ("python", "pip"),
        ("go", "gomod"),
        ("java-maven", "maven"),
        ("java-gradle", "gradle"),
    ]
    for stack, ecosystem in specs:
        if stack in stacks and f'package-ecosystem: "{ecosystem}"' not in text:
            additions.append(
                f'''\n  - package-ecosystem: "{ecosystem}"\n'''
                '    directory: "/"\n'
                '    schedule:\n'
                '      interval: "weekly"\n'
                '    open-pull-requests-limit: 5\n'
            )
    if additions:
        path.write_text(text.rstrip() + "\n" + "".join(additions), encoding="utf-8")
        print("[secure-vibe] Dependabot atualizado para a(s) stack(s) detectada(s).")


def ensure_gitignore() -> None:
    target = ROOT / ".gitignore"
    source = ROOT / ".gitignore.secure-vibe"
    if not source.exists():
        return
    lines = source.read_text(encoding="utf-8").splitlines()
    if not target.exists():
        target.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return
    current_lines = target.read_text(encoding="utf-8").splitlines()
    missing = [line for line in lines if line and not line.startswith("#") and line not in current_lines]
    if missing:
        with target.open("a", encoding="utf-8") as handle:
            handle.write("\n# Secure Vibe Coding\n")
            for line in missing:
                handle.write(line + "\n")


def is_git_repository() -> bool:
    try:
        proc = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return proc.returncode == 0
    except FileNotFoundError:
        raise SystemExit("[secure-vibe] Git não foi encontrado no PATH. Instale/configure o Git antes de instalar o hook local.")


def venv_python() -> Path:
    if os.name == "nt":
        return PRECOMMIT_VENV / "Scripts" / "python.exe"
    return PRECOMMIT_VENV / "bin" / "python"


def module_precommit_command(python_exe: str | Path) -> list[str] | None:
    try:
        subprocess.check_call(
            [str(python_exe), "-m", "pre_commit", "--version"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return [str(python_exe), "-m", "pre_commit"]
    except Exception:
        return None


def existing_precommit_command() -> list[str] | None:
    local_python = venv_python()
    if local_python.exists():
        cmd = module_precommit_command(local_python)
        if cmd:
            return cmd

    cmd = module_precommit_command(sys.executable)
    if cmd:
        return cmd

    exe = shutil.which("pre-commit")
    return [exe] if exe else None


def create_isolated_precommit() -> list[str]:
    RUNTIME_DIR.mkdir(parents=True, exist_ok=True)
    print(f"[secure-vibe] Criando ambiente isolado do pre-commit em {PRECOMMIT_VENV.relative_to(ROOT)}...")
    try:
        venv.EnvBuilder(with_pip=True, clear=False).create(PRECOMMIT_VENV)
    except Exception as exc:
        raise SystemExit(
            "Não foi possível criar o ambiente virtual do pre-commit. "
            "Em Debian/Ubuntu/Pop!_OS talvez seja necessário instalar o pacote python3-venv. "
            f"Erro original: {exc}"
        )

    py = venv_python()
    try:
        subprocess.check_call([str(py), "-m", "pip", "install", "--disable-pip-version-check", "pre-commit>=4,<5"])
    except subprocess.CalledProcessError as exc:
        raise SystemExit(
            "Não foi possível baixar/instalar pre-commit. Confira sua conexão com a internet e tente novamente. "
            f"Código de saída: {exc.returncode}"
        )

    cmd = module_precommit_command(py)
    if not cmd:
        raise SystemExit("O ambiente do pre-commit foi criado, mas o módulo não pôde ser executado.")
    return cmd


def get_or_install_precommit() -> list[str]:
    return existing_precommit_command() or create_isolated_precommit()


def install_local() -> None:
    if not is_git_repository():
        raise SystemExit(
            "[secure-vibe] Este diretório ainda não é um repositório Git. "
            "Clone/crie o repositório primeiro e rode --install-local dentro dele."
        )
    print("[secure-vibe] Instalando/validando pre-commit local...")
    cmd = get_or_install_precommit()
    subprocess.check_call(cmd + ["install", "--install-hooks"], cwd=ROOT)
    print("[secure-vibe] Hook pre-commit instalado neste clone do repositório.")


def run_precommit_all() -> None:
    if not is_git_repository():
        raise SystemExit("[secure-vibe] Rode este comando dentro de um repositório Git.")
    cmd = existing_precommit_command()
    if not cmd:
        print("[secure-vibe] pre-commit ainda não está preparado; instalando agora...")
        cmd = get_or_install_precommit()
        subprocess.check_call(cmd + ["install", "--install-hooks"], cwd=ROOT)
    raise SystemExit(subprocess.call(cmd + ["run", "--all-files"], cwd=ROOT))


def print_summary(cfg: dict) -> None:
    print("[secure-vibe] Stacks detectadas:", ", ".join(cfg["detected_stacks"]) or "nenhuma")
    if cfg.get("package_manager"):
        print("[secure-vibe] Package manager Node:", cfg["package_manager"])
    print("[secure-vibe] Configuração:", CONFIG_PATH.relative_to(ROOT))

    configured = []
    for key in COMMAND_KEYS:
        if cfg.get("commands", {}).get(key):
            configured.append(key)
    if configured:
        print("[secure-vibe] Grupos de comandos configurados:", ", ".join(configured))
    elif cfg["detected_stacks"]:
        print("[secure-vibe] ATENÇÃO: stack detectada, mas nenhum check foi configurado ainda. Peça ao agente para adaptar o projeto.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Bootstrap do Secure Vibe Coding")
    parser.add_argument("--detect", action="store_true", help="Detecta stack e atualiza configuração (também é o comportamento padrão).")
    parser.add_argument("--install-local", action="store_true", help="Detecta e instala o hook pre-commit neste clone.")
    parser.add_argument("--run-precommit-all", action="store_true", help="Executa todos os hooks do pre-commit em todos os arquivos.")
    parser.add_argument("--ci", action="store_true", help="Modo não interativo usado pelo GitHub Actions.")
    args = parser.parse_args()

    if args.run_precommit_all:
        run_precommit_all()
        return 0

    current = load_json(CONFIG_PATH, DEFAULT_CONFIG, fatal=True)
    cfg = merge_defaults(DEFAULT_CONFIG, current)
    validate_config_shape(cfg)
    cfg["schema_version"] = DEFAULT_CONFIG["schema_version"]
    cfg["detected_stacks"] = []

    detect_node(cfg)
    detect_python(cfg)
    detect_go(cfg)
    detect_java(cfg)

    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CONFIG_PATH.write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if not args.ci:
        ensure_gitignore()
        update_dependabot(cfg["detected_stacks"])

    print_summary(cfg)

    if args.install_local and not args.ci:
        install_local()

    if not cfg["detected_stacks"]:
        print("[secure-vibe] Projeto sem stack detectável ainda. Isso é normal para template novo.")
        print("[secure-vibe] Inicialize a stack com seu agente e rode bootstrap novamente.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
