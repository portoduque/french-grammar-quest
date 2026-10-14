import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCatalog, WORLDS_CONFIG, getWorldForChapter } from './useCatalog';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCatalog Hook', () => {
  it('loads all 28 chapters in order from 1 to 28', async () => {
    const { result } = renderHook(() => useCatalog(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.chapters.length).toBe(28);
    });

    const numbers = result.current.chapters.map((c) => c.number);
    expect(numbers).toEqual(Array.from({ length: 28 }, (_, i) => i + 1));
  });

  it('correctly maps chapters to their 5 worlds', () => {
    expect(WORLDS_CONFIG.length).toBe(5);

    // World 1: 1-6
    expect(getWorldForChapter(1).worldNumber).toBe(1);
    expect(getWorldForChapter(6).worldNumber).toBe(1);

    // World 2: 7-12
    expect(getWorldForChapter(7).worldNumber).toBe(2);
    expect(getWorldForChapter(12).worldNumber).toBe(2);

    // World 3: 13-18
    expect(getWorldForChapter(13).worldNumber).toBe(3);
    expect(getWorldForChapter(18).worldNumber).toBe(3);

    // World 4: 19-24
    expect(getWorldForChapter(19).worldNumber).toBe(4);
    expect(getWorldForChapter(24).worldNumber).toBe(4);

    // World 5: 25-28
    expect(getWorldForChapter(25).worldNumber).toBe(5);
    expect(getWorldForChapter(28).worldNumber).toBe(5);
  });

  it('groups chapters into chaptersByWorld array', async () => {
    const { result } = renderHook(() => useCatalog(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.chaptersByWorld.length).toBe(5);
    });

    const [w1, w2, w3, w4, w5] = result.current.chaptersByWorld;
    expect(w1.chapters.length).toBe(6); // Ch 1 to 6
    expect(w2.chapters.length).toBe(6); // Ch 7 to 12
    expect(w3.chapters.length).toBe(6); // Ch 13 to 18
    expect(w4.chapters.length).toBe(6); // Ch 19 to 24
    expect(w5.chapters.length).toBe(4); // Ch 25 to 28
  });
});
