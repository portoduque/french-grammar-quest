#!/usr/bin/env python3
"""Validate PRD structure and factual traceability against the private content manifest.

Checks documentation integrity, not legal permission, user approval, editorial accuracy,
or implementation of the app. Standard library only.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

def assert_ok(test, message):
    if not test:
        raise AssertionError(message)

def sequential(prefix, text, expected):
    present = {int(x) for x in re.findall(r"\b" + prefix + r"-(\d{2,3})\b", text)}
    missing = sorted(set(range(1, expected + 1)) - present)
    assert_ok(not missing, f"{prefix} has missing IDs: {missing}")
    return len(present)

def check_links(filename, content):
    for target in re.findall(r"\[[^\]]+\]\((\./[^)#]+)\)", content):
        ref = (DOCS / filename).parent / target
        assert_ok(ref.is_file(), f"broken relative Markdown link in {filename}: {target}")

def main():
    files = ("PRD.md", "PRD-IMPLEMENTATION-PLAN.md", "PRD-CONTENT-MAP.md")
    data = {name: (DOCS / name).read_text(encoding="utf-8") for name in files}
    prd, plan, cmap = (data[name] for name in files)
    for name, content in data.items():
        assert_ok(content.startswith("# "), f"{name}: no H1")
        assert_ok(len(content) > 5000, f"{name}: suspiciously incomplete")
        check_links(name, content)
    headings = [int(x) for x in re.findall(r"^## (\d+)\. ", prd, flags=re.M)]
    assert_ok(headings == list(range(1, 31)), f"PRD 30 main sections: got {headings}")
    assert_ok(sequential("RF", prd, 73) == 73, "RF IDs not uniquely enumerated")
    assert_ok(sequential("AC", prd, 18) >= 18, "Acceptance matrix incomplete")
    assert_ok(sequential("UX", prd, 17) >= 17, "UI screen inventory incomplete")
    assert_ok(sequential("US", plan, 14) >= 14, "User stories incomplete")
    assert_ok(sequential("T", plan, 30) >= 30, "Test scenarios incomplete")
    assert_ok("P0-01" in plan and "P4-09" in plan, "Roadmap/backlog incomplete")
    assert_ok(all(x in prd for x in ("Vite", "React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Vercel")), "Stack decisions absent")
    for sensitive in ("rights_cleared", "direito autoral", "editorial", "privado", "resposta livre", "2.227"):
        assert_ok(sensitive.casefold() in prd.casefold(), f"Missing essential PRD concern: {sensitive}")
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    report = json.loads((ROOT / "reports/phase-c-machine-audit.json").read_text(encoding="utf-8"))
    assert_ok(len(manifest["chapters"]) == len(report["chapters"]) == 28, "28 chapters required")
    assert_ok(report["totals"]["exercise_groups"] == 233 and report["totals"]["questions"] == 2227, "Source totals changed")
    assert_ok(report["totals"]["reference_pages"] == 113, "Reference pages count changed")
    for chapter, evidence in zip(manifest["chapters"], report["chapters"]):
        n = chapter["number"]
        assert_ok(n == evidence["chapter"], f"Chapter {n}: evidence order mismatch")
        assert_ok(evidence["groups"] == chapter["exercise_group_markers_detected"], f"Chapter {n}: group count mismatch")
        assert_ok(chapter["title"] in cmap, f"Chapter {n}: missing source title in content map")
        row = next((line for line in cmap.splitlines() if line.startswith(f"| {n:02} |")), None)
        assert_ok(row is not None, f"Chapter {n}: missing table row")
        cells = [v.strip() for v in row.strip("|").split("|")]
        assert_ok(cells[3] == str(evidence["groups"]), f"Chapter {n}: exercise count mismatch")
        assert_ok(cells[4] == str(evidence["questions"]), f"Chapter {n}: question count mismatch")
    assert_ok("PENDENTE" in cmap and "PENDENTE" in prd, "Pending legal/editorial conditions obscured")
    print("PASS: PRD 30 sections / 73 RF / 18 AC / 17 UX / 14 US / 30 tests")
    print("PASS: all 28 source chapters, 233 groups, 2,227 questions and 113 reference pages reconciled")
    print("NOTE: no app implemented, legal rights and full editorial approval remain independent gates")

if __name__ == "__main__":
    try:
        main()
    except (AssertionError, OSError, ValueError, KeyError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
