import { describe, it, expect } from 'vitest';
import { INTERVALS, simplify, transpose, type IntervalName } from './interval';
import { flat, format, natural, pitchClass, sharp, type Note } from './note';
import type { NoteLetter } from './consts';

const by = (name: IntervalName) => INTERVALS.find((i) => i.name === name)!;

describe('Interval registry', () => {
  it('lists the nine ascending intervals in order', () => {
    expect(INTERVALS.map((i) => i.name)).toEqual([
      'minor 3rd',
      'major 3rd',
      '4th',
      'tritone',
      '5th',
      'minor 6th',
      'major 6th',
      'minor 7th',
      'major 7th',
    ]);
  });

  it('pairs each interval with its letter-step and semitone counts', () => {
    expect(INTERVALS.map((i) => [i.letterSteps, i.semitones])).toEqual([
      [2, 3],
      [2, 4],
      [3, 5],
      [3, 6],
      [4, 7],
      [5, 8],
      [5, 9],
      [6, 10],
      [6, 11],
    ]);
  });

  it('models the tritone as an augmented 4th (letterSteps 3)', () => {
    const tritone = INTERVALS.find((i) => i.name === 'tritone');
    expect(tritone?.letterSteps).toBe(3);
  });
});

describe('transpose (theory-correct spelling)', () => {
  const cases: [Note, IntervalName, string][] = [
    // Every interval from C — hand-authored so each interval's letter advance
    // and accidental is pinned by an independent theory value, not the impl.
    [natural('C'), 'minor 3rd', 'E♭'],
    [natural('C'), 'major 3rd', 'E'],
    [natural('C'), '4th', 'F'],
    [natural('C'), 'tritone', 'F♯'], // augmented 4th, not G♭
    [natural('C'), '5th', 'G'],
    [natural('C'), 'minor 6th', 'A♭'],
    [natural('C'), 'major 6th', 'A'],
    [natural('C'), 'minor 7th', 'B♭'],
    [natural('C'), 'major 7th', 'B'],
    // Other starts, including accidental and double-accidental answers.
    [natural('B'), 'minor 3rd', 'D'],
    [natural('B'), '5th', 'F♯'],
    [sharp('G'), 'major 7th', 'F𝄪'], // double sharp
    [flat('B'), '5th', 'F'],
  ];

  it.each(cases)('%o + %s = %s', (root, name, expected) => {
    expect(format(transpose(root, by(name)))).toBe(expected);
  });

  it('advances the answer letter by the interval letter-steps', () => {
    // tritone from C advances 3 letters: C -> F (spelled F♯, not G♭)
    expect(transpose(natural('C'), by('tritone')).letter).toBe('F');
  });
});

describe('simplify (enharmonic-simplest display name)', () => {
  const cases: [Note, string][] = [
    [{ letter: 'F', offset: 2 }, 'G'], // F𝄪 -> G
    [{ letter: 'B', offset: -2 }, 'A'], // B𝄫 -> A
    [flat('C'), 'B'], // C♭ -> B
    [sharp('E'), 'F'], // E♯ -> F
    [natural('C'), 'C'], // already simplest
    [sharp('C'), 'C♯'], // single accidental stays single
  ];

  it.each(cases)('%o -> %s', (note, expected) => {
    expect(format(simplify(note))).toBe(expected);
  });

  it('never returns more than a single accidental', () => {
    const doubles: Note[] = [
      { letter: 'F', offset: 2 },
      { letter: 'B', offset: -2 },
      { letter: 'C', offset: 2 },
      { letter: 'A', offset: -2 },
    ];
    for (const note of doubles) {
      expect(Math.abs(simplify(note).offset)).toBeLessThanOrEqual(1);
    }
  });

  it('preserves the minor quality', () => {
    expect(format(simplify({ letter: 'F', offset: 2, quality: 'minor' }))).toBe('Gm');
  });
});

describe('exhaustive: every single-accidental root x every interval', () => {
  // The musical alphabet as an independent source of truth for letter advance.
  const ALPHABET: NoteLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const ROOTS: Note[] = ALPHABET.flatMap((letter) => [
    flat(letter),
    natural(letter),
    sharp(letter),
  ]);

  it.each(ROOTS)('%o transposes and simplifies correctly across all intervals', (root) => {
    for (const interval of INTERVALS) {
      const result = transpose(root, interval);

      // Letter advances by the interval's letter-steps along the alphabet.
      const expectedLetter =
        ALPHABET[(ALPHABET.indexOf(root.letter) + interval.letterSteps) % 7];
      expect(result.letter).toBe(expectedLetter);

      // The answer sounds the theory-correct pitch...
      expect(pitchClass(result)).toBe((pitchClass(root) + interval.semitones) % 12);
      // ...within a double accidental at most.
      expect(Math.abs(result.offset)).toBeLessThanOrEqual(2);

      // simplify keeps the pitch but never exceeds a single accidental.
      const simple = simplify(result);
      expect(pitchClass(simple)).toBe(pitchClass(result));
      expect(Math.abs(simple.offset)).toBeLessThanOrEqual(1);
    }
  });
});
