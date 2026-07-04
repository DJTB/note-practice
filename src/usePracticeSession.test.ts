import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { usePracticeSession } from './usePracticeSession';
import { createRandom } from './random';
import { DEFAULT_NOTES_COUNT, MAX_NOTES_COUNT, NATURAL_NOTES_COUNT } from './consts';
import { DEFAULT_NOTES_FILTER } from './noteSets';

afterEach(() => {
  vi.useRealTimers();
});

// Build the Random once so it is a stable instance whose stream advances across
// renders — mirroring the production singleton. Creating it inside the render
// callback would reset the seed every render and defeat the determinism.
const renderSession = (seed: number) => {
  const rng = createRandom(seed);
  return renderHook(() => usePracticeSession(rng));
};

describe('usePracticeSession — initial state', () => {
  it('starts on the default filter and count with a full Note Set', () => {
    const { result } = renderSession(1);

    expect(result.current.filter).toBe(DEFAULT_NOTES_FILTER);
    expect(result.current.count).toBe(DEFAULT_NOTES_COUNT);
    expect(result.current.maxCount).toBe(MAX_NOTES_COUNT);
    expect(result.current.notes).toHaveLength(DEFAULT_NOTES_COUNT);
  });
});

describe('usePracticeSession — regenerate on change', () => {
  it('setFilter switches the filter and regenerates the Note Set', () => {
    const { result } = renderSession(1);

    act(() => result.current.setFilter('naturals'));

    expect(result.current.filter).toBe('naturals');
    // naturals are the seven plain letters — offset 0, no quality.
    expect(result.current.notes.every((n) => n.offset === 0 && n.quality === undefined)).toBe(true);
  });

  it('setCount changes the count and reslices the Note Set', () => {
    const { result } = renderSession(1);

    act(() => result.current.setCount(4));

    expect(result.current.count).toBe(4);
    expect(result.current.notes).toHaveLength(4);
  });

  it('refresh draws a fresh Note Set', () => {
    const { result } = renderSession(7);
    const before = result.current.notes;

    act(() => result.current.refresh());

    expect(result.current.notes).not.toBe(before);
    expect(result.current.notes).not.toEqual(before);
  });

  it('setTimerSeconds does not regenerate the Note Set', () => {
    const { result } = renderSession(1);
    const before = result.current.notes;

    act(() => result.current.setTimerSeconds(5));

    expect(result.current.notes).toBe(before);
  });
});

describe('usePracticeSession — count <= maxCount invariant', () => {
  it('clamps count down when a filter change lowers the maximum', () => {
    const { result } = renderSession(1);
    expect(result.current.count).toBe(DEFAULT_NOTES_COUNT); // 12

    act(() => result.current.setFilter('naturals')); // max drops to 7

    expect(result.current.maxCount).toBe(NATURAL_NOTES_COUNT);
    expect(result.current.count).toBe(NATURAL_NOTES_COUNT);
    expect(result.current.notes).toHaveLength(NATURAL_NOTES_COUNT);
  });

  it('caps a too-large count at the current maximum', () => {
    const { result } = renderSession(1);

    act(() => result.current.setCount(999));

    expect(result.current.count).toBe(MAX_NOTES_COUNT);
  });
});

describe('usePracticeSession — timer', () => {
  it('auto-refreshes the Note Set on each interval tick', () => {
    vi.useFakeTimers();
    const { result } = renderSession(3);
    const before = result.current.notes;

    act(() => result.current.setTimerSeconds(2));
    act(() => vi.advanceTimersByTime(2000));

    expect(result.current.notes).not.toEqual(before);
  });

  it('pauses when the timer is set to zero', () => {
    vi.useFakeTimers();
    const { result } = renderSession(3);

    act(() => result.current.setTimerSeconds(2));
    act(() => result.current.setTimerSeconds(0));
    const paused = result.current.notes;
    act(() => vi.advanceTimersByTime(10000));

    expect(result.current.notes).toBe(paused);
  });

  it('refresh resets the countdown so the interval starts over', () => {
    vi.useFakeTimers();
    const { result } = renderSession(3);

    act(() => result.current.setTimerSeconds(2));
    act(() => vi.advanceTimersByTime(1500)); // no tick yet
    act(() => result.current.refresh()); // manual refresh resets the interval
    const afterRefresh = result.current.notes;
    act(() => vi.advanceTimersByTime(1500)); // only 1.5s since reset < 2s

    expect(result.current.notes).toBe(afterRefresh);
  });
});
