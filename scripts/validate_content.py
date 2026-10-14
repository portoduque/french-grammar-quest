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
import hashlib
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
    # Page-level partition must be lossless, ordered and uniquely addressable.
    spans = {}
    fragment_ids = set()
    for item in seq:
        page = item["pdf_page"]
        fid = item["content_id"]
        must(fid not in fragment_ids, f"duplicate fragment ID: {fid}")
        fragment_ids.add(fid)
        left, right = item["page_char_start"], item["page_char_end"]
        must(left == spans.get(page, 0), f"gap or overlap on PDF page {page}")
        must(right - left == item["chars"], f"span length mismatch for {fid}")
        must(right <= len(pages[page]), f"span out of bounds for {fid}")
        spans[page] = right
    must(all(spans[p] == len(pages[p]) for p in pages), "not all page characters traced")

    # Hierarchical subtopics and chapter/exercise bidirectional cross-references.
    topics = {t["id"] for t in metadata["topics"]}
    subtopics = {s["id"]: s for s in metadata["subtopics"]}
    must(len(subtopics) == 13, "expected 13 specific chapter-01 subtopics")
    must(all(s["parent_topic_id"] in topics for s in subtopics.values()),
         "orphan subtopic")
    must(all(len(s["pdf_pages"]) == 2 and 14 <= s["pdf_pages"][0] <= s["pdf_pages"][1] <= 30
             for s in subtopics.values()), "invalid subtopic PDF page range")
    for ex in exercises:
        must(len(ex["subtopic_ids"]) > 0 and len(set(ex["subtopic_ids"])) == len(ex["subtopic_ids"]),
             "missing/duplicate exercise-to-subtopic link")
        for sid in ex["subtopic_ids"]:
            must(sid in subtopics and ex["id"] in subtopics[sid]["exercise_ids"],
                 f"broken bidirectional subtopic link: {ex['id']} -> {sid}")
    for sid, section in subtopics.items():
        for exid in section["exercise_ids"]:
            found = next((e for e in exercises if e["id"] == exid), None)
            must(found is not None and sid in found["subtopic_ids"], f"reverse link missing: {sid}/{exid}")

    # Lock the source questions and publisher answers against silent editorial drift.
    raw_key_lines = [f"{q['id']}\t{q['source_raw_prompt']}\t{q['answer']['source_key']}"
                     for ex in exercises for q in ex["questions"]]
    locked = hashlib.sha256(("\n".join(raw_key_lines) + "\n").encode("utf-8")).hexdigest()
    must(locked == "6c92a82c2f9faa3edf26f8a179bb792853b7317f08c427602da17df9c5709a15",
         "the original 100 source prompts or publisher answers changed")

    # Retain exact previous extraction even as theory.md becomes human-readable.
    raw_theory = (ch / "theory-source.md").read_bytes()
    git_blob_sha = hashlib.sha1(b"blob " + str(len(raw_theory)).encode() + b"\0" + raw_theory, usedforsecurity=False).hexdigest()
    must(git_blob_sha == "5b1861900d00dc84b5ea116d3995c225354aea46",
         "original theory extraction no longer matches the preserved Git blob")
    must("&#" not in theory and "```text" not in theory, "theory still contains raw code blocks")
    must(theory.count("| French | English") >= 10 and theory.count("| --- |") >= 25,
         "not enough semantic Markdown tables")
    must("<!-- PDF page 28:" in theory and "[source clipped]" in theory,
         "lost original page-28 clipping warning")
    for section in subtopics:
        must(f"<!-- subtopic_id: {section} -->" in theory,
             f"no theory anchor for {section}")

    # Gameplay exceptions must be explicit and safe for future grading.
    e7 = exercises[6]
    must(set(x["label"] for x in e7["choices"]) == set("abcdefghij"),
         "matching options incomplete or duplicated")
    must(set(q["answer"]["source_key"] for q in e7["questions"]) == set("abcdefghij"),
         "matching answer mapping not a bijection")
    special = exercises[5]["questions"][5]
    must(special["answer"]["source_key"] == "J’habite", "publisher elision altered")
    must(special["presentation"]["mode"] == "replace_subject_and_blank"
         and special["presentation"]["complete_sentence"] == "J’habite au dixième étage.",
         "elision-aware rendering not configured")
    informal = exercises[9]["questions"][5]
    must(informal["presentation"]["register"] == "informal"
         and informal["presentation"]["pronoun"] == "tu",
         "question-specific informal form missing")
    for ex in exercises:
        if ex["interaction_type"] in ("translation", "sentence_rewrite", "free_response"):
            must(ex["grading_policy"]["strategy"] == "semantic_review_required"
                 and ex["grading_policy"]["publisher_key_is_exhaustive"] is False,
                 f"unsafe exact-match grading on {ex['id']}")
    print("PASS chapter 01: 31 unique fragments; contiguous source spans; 13 subtopics")
    print("PASS chapter 01: original 100 question/key texts locked; exceptions and tables covered")

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
