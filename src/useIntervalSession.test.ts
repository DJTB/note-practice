import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useIntervalSession } from './useIntervalSession';
import { createRandom, type Random } from './random';
import { INTERVALS } from './interval';
import { format, type Note } from './note';

afterEach(() => {
  vi.useRealTimers();
});

// Stable rng instance whose stream advances across renders (see usePracticeSession.test).
const renderSession = (rng: Random) => renderHook(() => useIntervalSession(rng));

// One full challenge cycle: reveal, then draw the next.
const nextChallenge = (result: { current: { advance: () => void } }) => {
  act(() => result.current.advance());
  act(() => result.current.advance());
};

describe('useIntervalSession — initial state', () => {
  it('starts hidden with a challenge drawn from the enabled intervals', () => {
    const { result } = renderSession(createRandom(1));

    expect(result.current.revealed).toBe(false);
    expect(INTERVALS).toContainEqual(result.current.challenge.interval);
    expect('letter' in result.current.challenge.root).toBe(true);
  });

  it('enables all nine intervals by default', () => {
    const { result } = renderSession(createRandom(1));
    expect(result.current.enabledIntervalNames).toEqual(INTERVALS.map((i) => i.name));
  });
});

describe('useIntervalSession — advance is a two-phase machine', () => {
  it('reveals the answer when hidden, then draws the next challenge when revealed', () => {
    const { result } = renderSession(createRandom(1));
    const first = result.current.challenge;

    act(() => result.current.advance()); // hidden -> revealed
    expect(result.current.revealed).toBe(true);
    expect(result.current.challenge).toBe(first); // same challenge, now shown

    act(() => result.current.advance()); // revealed -> next, hidden
    expect(result.current.revealed).toBe(false);
  });
});

describe('useIntervalSession — answer wiring', () => {
  it('exposes the theory-correct answer and its simplified name', () => {
    // Identity shuffle picks the first option every draw: root C, interval minor 3rd.
    const stub: Random = { chance: () => false, shuffle: (arr) => arr };
    const { result } = renderSession(stub);

    expect(result.current.challenge.root).toEqual({ letter: 'C', offset: 0 });
    expect(result.current.challenge.interval.name).toBe('minor 3rd');
    // A minor 3rd above C is E♭ — theory truth, not recomputed from the impl.
    expect(format(result.current.answer)).toBe('E♭');
    expect(format(result.current.simplified)).toBe('E♭');
  });
});

describe('useIntervalSession — deterministic generation', () => {
  const collectRoots = (seed: number, rounds: number): Note[] => {
    const { result } = renderSession(createRandom(seed));
    const roots = [result.current.challenge.root];
    for (let i = 1; i < rounds; i++) {
      nextChallenge(result);
      roots.push(result.current.challenge.root);
    }
    return roots;
  };

  it('produces the same challenge sequence for the same seed', () => {
    expect(collectRoots(5, 20)).toEqual(collectRoots(5, 20));
  });

  it('spells black-key roots both ways over many draws', () => {
    const roots = collectRoots(5, 200);
    expect(roots.some((r) => r.offset === 1)).toBe(true); // some sharp spelling
    expect(roots.some((r) => r.offset === -1)).toBe(true); // some flat spelling
  });
});

describe('useIntervalSession — interval subset restricts generation', () => {
  it('never draws a disabled interval', () => {
    const { result } = renderSession(createRandom(9));

    act(() => result.current.toggleInterval('minor 3rd'));
    expect(result.current.enabledIntervalNames).not.toContain('minor 3rd');

    for (let i = 0; i < 300; i++) {
      nextChallenge(result);
      expect(result.current.challenge.interval.name).not.toBe('minor 3rd');
    }
  });

  it('keeps at least one interval enabled', () => {
    const { result } = renderSession(createRandom(9));

    act(() => {
      for (const { name } of INTERVALS) result.current.toggleInterval(name);
    });

    expect(result.current.enabledIntervalNames.length).toBeGreaterThanOrEqual(1);
  });
});

describe('useIntervalSession — timer drives advance', () => {
  it('advances on each interval tick', () => {
    vi.useFakeTimers();
    const { result } = renderSession(createRandom(3));
    expect(result.current.revealed).toBe(false);

    act(() => result.current.setTimerSeconds(2));
    act(() => vi.advanceTimersByTime(2000));

    expect(result.current.revealed).toBe(true); // tick revealed the answer
  });

  it('pauses when the timer is set to zero', () => {
    vi.useFakeTimers();
    const { result } = renderSession(createRandom(3));

    act(() => result.current.setTimerSeconds(0));
    act(() => vi.advanceTimersByTime(10000));

    expect(result.current.revealed).toBe(false);
  });
});
