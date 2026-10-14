#!/usr/bin/env python3
"""Phase C integrity gate; use --pdf original.pdf to verify the original bytes/text.

This is a structural machine audit, NOT a visual/grammatical proof of fidelity.
"""
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUPPLEMENTS = (("verb-tables", 386, 391),
               ("french-english-glossary", 392, 444),
               ("english-french-glossary", 445, 498))

def require(test, reason):
    if not test:
        raise AssertionError(reason)

def read(path):
    return json.loads(path.read_text(encoding="utf-8"))

def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + "\n"

def audit(pdf=None):
    manifest = read(ROOT / "manifest.json")
    require(len(manifest["chapters"]) == 28, "manifest must have 28 chapters")
    sha = manifest["source"]["source_sha256"]
    doc = None
    if pdf:
        import fitz
        pdf_path = Path(pdf).resolve()
        require(pdf_path.is_file(), f"PDF file not found: {pdf_path}")
        content = pdf_path.read_bytes()
        require(hashlib.sha256(content).hexdigest() == sha, "wrong source PDF SHA-256")
        doc = fitz.open(stream=content, filetype="pdf")
        require(len(doc) == 527, "wrong PDF length")
    from jsonschema import Draft202012Validator
    cv = Draft202012Validator(read(ROOT / "schemas/chapter.schema.json"))
    ev = Draft202012Validator(read(ROOT / "schemas/exercise.schema.json"))
    all_groups, all_questions = set(), set()
    all_pages = []
    rows = []
    for n, entry in enumerate(manifest["chapters"], 1):
        base = ROOT / "chapters" / f"{n:02}"
        m, x, seq = [read(base / p) for p in ("metadata.json", "exercises.json", "lesson-sequence.json")]
        cv.validate(m)
        ev.validate(x)
        require(m["chapter"] == x["chapter"] == n, f"chapter {n} number")
        require(m["title"] == entry["title"], f"chapter {n} book title")
        markdown = (base / "theory.md").read_text(encoding="utf-8")
        require(markdown.startswith(f"# Chapter {n:02} — {entry['title']}"), f"chapter {n} markdown heading")
        require(m["source"]["source_sha256"] == sha, f"chapter {n} source mismatch")
        a,b = m["source"]["pdf_pages"]
        require((a,b) == (entry["pdf_page_start"], entry["pdf_page_end"]), f"chapter {n} PDF range")
        pages = {}
        for p in range(a,b+1):
            pages[p] = (base / "source-pages" / f"page-{p:03}.txt").read_text(encoding="utf-8")
            if doc:
                require(pages[p] == doc[p-1].get_text(sort=True), f"PDF source different at page {p}")
        all_pages.extend(pages)
        ids = set()
        bypage = {}
        for fragment in seq:
            require(fragment["content_id"] not in ids, f"chapter {n} duplicate source fragment")
            ids.add(fragment["content_id"])
            bypage.setdefault(fragment["pdf_page"], []).append(fragment)
        for p,source in pages.items():
            spans = bypage.get(p, [])
            require(spans, f"missing source fragment on page {p}")
            cursor = 0
            for f in spans:
                require(f["page_char_start"] == cursor, f"fragment overlap/gap on page {p}")
                require(f["page_char_end"] - cursor == f["chars"], f"bad fragment length on page {p}")
                cursor = f["page_char_end"]
            require(cursor == len(source), f"unmapped source characters on page {p}")
        if n > 1:
            require((base / "theory-source.md").read_text(encoding="utf-8") == "".join(pages.values()),
                    f"chapter {n} raw source changed")
        groups = x["exercises"]
        require([e["id"] for e in groups] == m["exercise_ids"], f"chapter {n} exercise IDs")
        require(len(groups) == entry["exercise_group_markers_detected"], f"chapter {n} groups")
        require(m["question_total"] == sum(len(e["questions"]) for e in groups), f"chapter {n} item count")
        parent = {t["id"] for t in m["topics"]}
        subs = {t["id"] for t in m.get("subtopics", [])}
        for topic in m.get("subtopics", []):
            require(topic["parent_topic_id"] in parent, f"chapter {n} orphan subtopic")
        for group in groups:
            gid = group["id"]
            require(gid not in all_groups, f"duplicate exercise {gid}")
            all_groups.add(gid)
            require(set(group["topic_ids"]) <= parent, f"unknown topic {gid}")
            require(set(group.get("subtopic_ids", [])) <= subs, f"unknown subtopic {gid}")
            require(len(group["questions"]) == group["validation"]["question_count"], f"question count {gid}")
            if group["interaction_type"] in ("translation", "free_response", "sentence_rewrite"):
                require(group["grading_policy"]["strategy"] == "semantic_review_required",
                        f"unsafe translation grade in {gid}")
            for q in group["questions"]:
                qid = q["id"]
                require(qid not in all_questions, f"duplicate question {qid}")
                all_questions.add(qid)
                require(q["prompt"].strip() and q["source_raw_prompt"].strip(), f"empty prompt {qid}")
                if n > 1:
                    require(len(q["prompt"]) <= 250, f"likely theory text merged into question {qid}")
                require(set(q["pdf_pages"]) <= set(pages), f"question page {qid}")
                require(q["answer"]["source_key"].strip() and q["answer"]["accepted"], f"empty key {qid}")
                if n > 1:
                    require(q["source_raw_prompt"] in "".join(pages.values()),
                            f"question {qid} is not found verbatim in preserved PDF text")
        rows.append({"chapter": n, "pages": len(pages), "groups": len(groups),
                     "questions": m["question_total"], "subtopics": len(subs),
                     "raw_code_blocks": markdown.count(chr(96)*3+"text"),
                     "machine_gate": "pass", "visual_gate": "pending"})
    require(sorted(all_pages) == list(range(14,386)), "book chapter page coverage 14–385")
    require((len(all_groups), len(all_questions)) == (233,2227), "book exercise/item totals changed")
    recovered = sum(1 for n in range(2, 29) for ex in read(ROOT / "chapters" / f"{n:02}" / "exercises.json")["exercises"] for q in ex["questions"] if "editorial_recovery" in q)
    require(recovered == 29, f"expected 29 repaired question/theory boundary cases, got {recovered}")
    references = []
    for name,a,b in SUPPLEMENTS:
        md = (ROOT / "references" / (name + ".md")).read_text(encoding="utf-8")
        parts = re.findall(r"<!-- PDF page (\d+) -->\s*" + chr(96)*3 +
                           r"text\n(.*?)\n" + chr(96)*3, md, re.S)
        require([int(p) for p,_ in parts] == list(range(a,b+1)), f"{name}: reference page omission")
        if doc:
            for p,s in parts:
                require(doc[int(p)-1].get_text(sort=True).rstrip().endswith(s.rstrip()),
                        f"{name} page {p}: changed source text")
        references.append({"name": name, "pages": len(parts), "visual_gate": "pending"})
    return {
        "schema_version": 1, "source_sha256": sha, "chapters": rows,
        "references": references,
        "totals": {"chapters": 28, "chapter_pages": 372, "exercise_groups": 233,
                   "questions": 2227, "publisher_keys": 2227, "reference_pages": 113,
                   "front_matter_pages": 13, "answer_key_pages": 29, "pdf_pages": 527},
        "machine_gate": "pass", "editorial_gate": "pending_human_visual_proof",
        "known_blockers": [
            "Source page 28 contains visibly clipped English translations",
            "PDF chapter 26 repeats the printed 26.1 exercise number",
            "Chapter 28 exercise 28.15 contains duplicated printed item numbering",
            "Theory tables in chapters 02–27 are not completely semantically structured",
            "Verb tables and both glossaries require page-by-page visual quality review",
            "Publisher keys do not exhaust all valid free-response translations",
            "The 13-page front matter is not converted into lessons",
            "Manual word-by-word visual proof and independent grammatical review remain pending",
        ],
    }

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--pdf", help="Local original PDF; never commit the PDF")
    p.add_argument("--write-report", action="store_true")
    p.add_argument("--check-report", action="store_true")
    args = p.parse_args()
    report = audit(args.pdf)
    dest = ROOT / "reports/phase-c-machine-audit.json"
    if args.write_report:
        dest.write_text(canonical(report), encoding="utf-8")
    if args.check_report:
        require(dest.exists() and read(dest) == report,
                "phase-c-machine-audit.json is stale; run --write-report")
    print("PASS 28 chapters, 372 source pages, 233 groups, 2227 items and 113 reference pages")
    print("SOURCE PDF:", "SHA + text checked" if args.pdf else "not supplied (local snapshots only)")
    print("EDITORIAL: manual visual and semantic proof remains pending")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)
