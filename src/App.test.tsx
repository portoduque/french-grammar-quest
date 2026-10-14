import { describe, it, expect } from 'vitest';
import { CHAPTERS_SUMMARY } from './data/chaptersSummary';

describe('French Grammar Quest curriculum', () => {
  it('loads all 28 audited chapters', () => {
    expect(CHAPTERS_SUMMARY).toHaveLength(28);
  });

  it('contains Chapter 01 regular -er verbs', () => {
    const ch01 = CHAPTERS_SUMMARY.find((c) => c.number === 1);
    expect(ch01).toBeDefined();
    expect(ch01?.title).toContain('regular -er verbs');
    expect(ch01?.exerciseGroups).toBe(10);
  });
});
