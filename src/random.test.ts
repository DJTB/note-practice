import { describe, it, expect } from 'vitest';
import { createRandom, defaultRandom } from './random';

describe('Random.chance', () => {
  it('never fires at p=0', () => {
    const rng = createRandom(1);
    for (let i = 0; i < 100; i++) expect(rng.chance(0)).toBe(false);
  });

  it('always fires at p=1', () => {
    const rng = createRandom(1);
    for (let i = 0; i < 100; i++) expect(rng.chance(1)).toBe(true);
  });

  it('approximates the requested probability over many draws', () => {
    const rng = createRandom(42);
    let hits = 0;
    const n = 10000;
    for (let i = 0; i < n; i++) if (rng.chance(0.4)) hits++;
    expect(hits / n).toBeCloseTo(0.4, 1);
  });
});

describe('Random.shuffle', () => {
  it('returns a permutation of the input (same multiset)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const out = createRandom(7).shuffle(input);
    expect([...out].sort((a, b) => a - b)).toEqual(input);
  });

  it('does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5];
    const snapshot = [...input];
    createRandom(7).shuffle(input);
    expect(input).toEqual(snapshot);
  });

  it('is deterministic for a given seed', () => {
    const a = createRandom(99).shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
    const b = createRandom(99).shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(a).toEqual(b);
  });
});

describe('createRandom reproducibility', () => {
  it('same seed produces the same sequence of draws', () => {
    const a = createRandom(123);
    const b = createRandom(123);
    const seqA = Array.from({ length: 20 }, () => a.chance(0.5));
    const seqB = Array.from({ length: 20 }, () => b.chance(0.5));
    expect(seqA).toEqual(seqB);
  });

  it('different seeds diverge', () => {
    const a = Array.from({ length: 20 }, (_, i) => createRandom(1).shuffle([1, 2, 3, 4, 5])[i % 5]);
    const b = Array.from({ length: 20 }, (_, i) => createRandom(2).shuffle([1, 2, 3, 4, 5])[i % 5]);
    expect(a).not.toEqual(b);
  });
});

describe('defaultRandom', () => {
  it('exposes the Random interface', () => {
    expect(typeof defaultRandom.chance).toBe('function');
    expect(typeof defaultRandom.shuffle).toBe('function');
  });
});
