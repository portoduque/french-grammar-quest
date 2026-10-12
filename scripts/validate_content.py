#!/usr/bin/env python3
"""Phase A inventory validator; optionally checks the private Chapter 1 conversion.

Usage:
    python scripts/validate_content.py
    python scripts/validate_content.py --private /path/to/unzipped/private-root
Requires only Python stdlib. Full copyrighted content stays OUT of GitHub.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def must(ok, why):
    if not ok:
        raise ValueError(why)

def read(path):
    return json.loads(path.read_text(encoding="utf-8"))

def public_checks():
    manifest = read(ROOT / "manifest.json")
    must(manifest["source"]["pdf_page_count"] == 527, "unexpected PDF page count")
    must(manifest["language_base"] == "en" and manifest["language_target"] == "fr", "languages")
    chapters = manifest["chapters"]
    must(len(chapters) == 28, "expected 28 chapters")
    must(sum(ch["exercise_group_markers_detected"] for ch in chapters) == 233, "233 source markers expected")
    page, ids = 14, set()
    for number, ch in enumerate(chapters, start=1):
        must(ch["number"] == number, f"chapter number: {number}")
        must(ch["pdf_page_start"] == page, f"non-contiguous chapter {number}")
        must(ch["pdf_page_end"] >= page, f"bad chapter end {number}")
        must(ch["id"] not in ids, f"duplicate chapter {ch['id']}")
        ids.add(ch["id"])
        topicids = [t["id"] for t in ch["topics"]]
        must(len(topicids) == len(set(topicids)), f"duplicate topic in chapter {number}")
        page = ch["pdf_page_end"] + 1
    must(page == 386, "chapter 28 must end on page 385")
    for path in (ROOT / "schemas").glob("*.json"):
        must(read(path).get("$schema") == "https://json-schema.org/draft/2020-12/schema", f"bad schema: {path}")
    print("PASS public: 28 chapters / 233 markers / contiguous chapter pages / schemas parse")
    return manifest

def private_checks(root, manifest):
    base = Path(root)
    ch = base / "chapters" / "01" if (base / "chapters" / "01").is_dir() else base
    metadata = read(ch / "metadata.json")
    payload = read(ch / "exercises.json")
    seq = read(ch / "lesson-sequence.json")
    theory = (ch / "theory.md").read_text(encoding="utf-8")
    pages = {int(p.stem[5:]): p.read_text(encoding="utf-8")
             for p in (ch / "source-pages").glob("page-*.txt")}
    must(set(pages) == set(range(14, 31)), "source pages 14–30 incomplete")
    must(metadata["chapter"] == payload["chapter"] == 1, "chapter mismatch")
    must(metadata["source"]["source_sha256"] == manifest["source"]["source_sha256"], "different source PDF")
    must(metadata["source"]["pdf_pages"] == [14, 30], "chapter source range")
    must(len(metadata["topics"]) == 3, "expected three primary topics")
    must(set(x["pdf_page"] for x in seq) == set(pages), "page trace incomplete")
    must(sum(x["chars"] for x in seq) == sum(len(s) for s in pages.values()),
         "theory/exercise text partition lost characters")
    must({x["kind"] for x in seq} == {"theory", "exercise"}, "bad content classes")
    must(len(re.findall(r"<!-- PDF page \d+ -->", theory)) >= 10, "theory sources missing")
    exercises = payload["exercises"]
    must(len(exercises) == 10, "not all chapter 1 exercises present")
    qids = set()
    for exnum, ex in enumerate(exercises, 1):
        must(ex["id"] == f"ch01-ex{exnum:02}", "exercise ID sequence")
        must(ex["source"]["chapter"] == 1 and ex["source"]["exercise"] == f"1.{exnum}", "exercise source reference")
        must(ex["topic_ids"] and ex["instruction"].strip(), "topic/instruction missing")
        must(len(ex["questions"]) == 10, f"exercise {exnum} does not have ten questions")
        for qnum, q in enumerate(ex["questions"], 1):
            must(q["id"] == f"ch01-ex{exnum:02}-q{qnum:02}", "question ID")
            must(q["id"] not in qids, "duplicate question ID")
            qids.add(q["id"])
            must(q["number"] == qnum, "question number")
            must(q["prompt"].strip() and q["source_raw_prompt"].strip(), "question text missing")
            must(q["pdf_pages"] and set(q["pdf_pages"]) <= set(pages), "unresolved source page")
            must(q["answer"]["source_key"].strip() and q["answer"]["accepted"], "missing publisher key")
    must(len(qids) == 100, "expected 100 unique questions")
    must(exercises[0]["questions"][0]["answer"]["source_key"] == "travaille", "first key wrong")
    must(exercises[-1]["questions"][-1]["answer"]["source_key"] == "Je pèse les légumes.", "last key wrong")
    must(exercises[6]["interaction_type"] == "matching", "matching type lost")
    must(len({q["parallel_option"]["label"] for q in exercises[6]["questions"]}) == 10, "matching choices")
    must(exercises[5]["questions"][8]["prompt"].endswith("pause-café."), "French hyphen lost")
    must(exercises[5]["questions"][5]["answer"]["source_key"] == "J’habite", "source-key anomaly lost")
    try:
        from jsonschema import Draft202012Validator
    except ImportError:
        print("NOTE: install jsonschema to add complete Draft 2020-12 data-schema checks")
    else:
        for filename, data in [("chapter.schema.json", metadata), ("exercise.schema.json", payload)]:
            schema = read(ROOT / "schemas" / filename)
            Draft202012Validator.check_schema(schema)
            Draft202012Validator(schema).validate(data)
        print("PASS private: both JSON Schemas validate")
    print("PASS private: 17/17 pages, 10/10 exercise groups, 100/100 questions + keys")
    print("NOTE: source page 28 is visually clipped; a separate human visual proof is still required")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--private", help="Unzipped private Phase A root (contains chapters/01)")
    args = ap.parse_args()
    manifest = public_checks()
    if args.private:
        private_checks(args.private, manifest)
    else:
        print("NOTE: private book-content tests require --private PATH")

if __name__ == "__main__":
    try:
        main()
    except (KeyError, ValueError, TypeError, FileNotFoundError, AssertionError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
