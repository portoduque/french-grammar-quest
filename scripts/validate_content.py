#!/usr/bin/env python3
"""Phase A inventory validation; standard library only."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
m = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
assert m["source"]["pdf_page_count"] == 527
assert len(m["chapters"]) == 28
ids = [c["id"] for c in m["chapters"]]
assert len(set(ids)) == 28
assert sum(c["exercise_group_markers_detected"] for c in m["chapters"]) == 233
expected_start = 14
for index, c in enumerate(m["chapters"], 1):
    assert c["number"] == index
    assert c["pdf_page_start"] == expected_start
    assert c["pdf_page_end"] >= expected_start
    topic_ids = [topic["id"] for topic in c["topics"]]
    assert len(topic_ids) == len(set(topic_ids))
    expected_start = c["pdf_page_end"] + 1
assert expected_start == 386
for schema in (ROOT / "schemas").glob("*.json"):
    d = json.loads(schema.read_text(encoding="utf-8"))
    assert d.get("$schema"), schema
assert m["chapters"][25]["exercise_group_markers_detected"] == 8
print("PASS: 28 chapter records; 233 exercise markers; contiguous pages 14-385; schemas parse")
print("LIMITATION: does not verify copyrighted content extraction, visual fidelity or answer keys")
