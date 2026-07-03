// A testable seam for randomness. Owns the coin-flip arithmetic and the
// Fisher-Yates shuffle so no domain code touches a raw random source.
export type Random = {
  // True with probability `p` (0 => never, 1 => always).
  chance(p: number): boolean;
  // A shuffled copy of `arr`; never mutates the input.
  shuffle<T>(arr: T[]): T[];
};

// Build a Random from a source of floats in [0, 1).
const makeRandom = (next: () => number): Random => ({
  chance: (p) => next() < p,
  shuffle: ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(next() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  },
});

// mulberry32: a small, fast, seedable PRNG. Deterministic for a given seed.
const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Production randomness. Application call sites use this by default.
export const defaultRandom: Random = makeRandom(Math.random);

// Reproducible randomness for tests: same seed => same sequence.
export const createRandom = (seed: number): Random => makeRandom(mulberry32(seed));
