#!/usr/bin/env python3
"""Source-preserving Phase B audit. Validates files, not full human PDF proofreading."""
import json,re,sys,hashlib,collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def check(ok,message):
 if not ok:raise AssertionError(message)

def load(path):return json.loads(path.read_text(encoding='utf-8'))

def validate():
 report=load(ROOT/'reports'/'phase-b-summary.json')
 expected_sha=report['source_sha256'];totalgroups=totalq=totalpages=0
 globalids=set();source={}
 for ch in range(2,29):
  path=ROOT/'chapters'/f'{ch:02}'; meta=load(path/'metadata.json');data=load(path/'exercises.json');seq=load(path/'lesson-sequence.json')
  s,e=meta['source']['pdf_pages']; check(meta['chapter']==ch and data['chapter']==ch,f'ch {ch} number');check(meta['source']['source_sha256']==expected_sha,f'ch{ch} PDF hash')
  pages={i:(path/'source-pages'/f'page-{i:03}.txt').read_text(encoding='utf-8') for i in range(s,e+1)}
  check(len(pages)==e-s+1,f'ch {ch}: page count');check((path/'theory-source.md').read_text(encoding='utf-8')==''.join(pages.values()), f'ch{ch}: raw text mismatch')
  check(len({x['content_id'] for x in seq})==len(seq),f'ch{ch}: duplicate fragment ID')
  for pg,txt in pages.items():
   frags=[x for x in seq if x['pdf_page']==pg]
   check(frags and all(x['page_char_start']<=x['page_char_end'] and x['page_char_end']-x['page_char_start']==x['chars'] for x in frags), f'ch{ch}: offset size')
   check(frags[0]['page_char_start']==0 and frags[-1]['page_char_end']==len(txt),f'ch{ch}: page offset bounds')
   check(all(a['page_char_end']==b['page_char_start'] for a,b in zip(frags,frags[1:])),f'ch{ch}: gap overlap on page {pg}')
   check(''.join(txt[x['page_char_start']:x['page_char_end']] for x in frags)==txt, f'ch{ch}: page text divergence {pg}')
   source[pg]=txt
  groups=data['exercises'];check(len(groups)>0 and meta['exercise_ids']==[x['id'] for x in groups],f'ch{ch}: group ids')
  topics={x['id'] for x in meta['topics']};subs={x['id'] for x in meta['subtopics']};check(len(topics)==len(meta['topics']) and len(subs)==len(meta['subtopics']),f'ch{ch} subtopics dup')
  exercise_ids=set(x['id'] for x in groups)
  for tp in meta['topics']:check(set(tp['exercise_ids'])<=exercise_ids, f'ch{ch}: orphan exercise reference')
  for st in meta['subtopics']:
   check(st['parent_topic_id'] in topics,f'ch{ch}: orphan topic parent')
   check(set(st['exercise_ids'])<=exercise_ids,f'ch{ch}: orphan subtopic exercise')
  for pos,ex in enumerate(groups,1):
   check(ex['id']==f'ch{ch:02}-ex{pos:02}',f'ch{ch}: group order')
   check(ex['topic_ids'] and all(x in topics for x in ex['topic_ids']),f'{ex["id"]}: unknown parent topic')
   check(ex['subtopic_ids'] and all(x in subs for x in ex['subtopic_ids']),f'{ex["id"]}: orphan subtopic')
   check(ex['instruction'] and ex['source']['pdf_pages'],f'{ex["id"]}: instruction/ref')
   check(len(ex['questions'])==ex['validation']['question_count'],f'{ex["id"]}: declared question count')
   check(ex['validation']['answer_key_aligned'],f'{ex["id"]}: missing key')
   if ex['interaction_type'] in {'translation','sentence_rewrite','free_response'}:
    check(ex['grading_policy']['strategy']=='semantic_review_required',f'{ex["id"]}: unsafe answer matching')
   for idx,q in enumerate(ex['questions'],1):
    check(q['id']==f'{ex["id"]}-q{idx:02}' and q['id'] not in globalids,f'{ex["id"]}: duplicate item')
    globalids.add(q['id'])
    check(q['prompt'] and q['source_raw_prompt'] and q['pdf_pages'],f'{q["id"]}: missing prompt')
    check(all(p in pages for p in q['pdf_pages']),f'{q["id"]}: bad page')
    check(q['answer']['source_key'] and q['answer']['accepted'],f'{q["id"]}: missing publisher key')
    check(not re.search(r'(?<!\w)(?:[2-9]|10)\.\s+',q['answer']['source_key']),f'{q["id"]}: likely merged key')
  totalgroups+=len(groups);totalq+=sum(len(e['questions']) for e in groups);totalpages+=len(pages)
  print(f'PASS chapter {ch:02}: {len(pages)} pages | {len(groups)} groups | {meta["question_total"]} questions')
 check(totalpages==355 and set(source)==set(range(31,386)),'chapter PDF page coverage 31–385 incomplete')
 check(totalgroups==223 and totalq==2127,'Phase B exercise or answer totals mismatch')
 check(len(globalids)==totalq,'cross chapter IDs duplicated')
 references={'verb-tables':(386,391),'french-english-glossary':(392,444),'english-french-glossary':(445,498)}
 for name,(a,b) in references.items():
  contents=(ROOT/'references'/f'{name}.md').read_text(encoding='utf-8')
  check(all(f'<!-- PDF page {n} -->' in contents for n in range(a,b+1)),f'empty reference page: {name}')
 check(report['total']['questions']==totalq and report['total']['publisher_keys']==totalq,'report totals mismatch')
 print(f'PASS Phase B: 27 chapters, {totalpages} pages, {totalgroups} exercises, {totalq} questions and keys, 113 reference pages')
 print('NOTE: automatic source text coverage is not proof of visual fidelity or complete correct alternatives')
if __name__=='__main__':
 try:validate()
 except Exception as ex:print('FAIL:',repr(ex),file=sys.stderr);sys.exit(1)
