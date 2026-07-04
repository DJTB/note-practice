import { describe, it, expect } from 'vitest';
import { flat, format, natural, pitchClass, sharp, type Note } from './note';

describe('format accidental glyphs', () => {
  it('renders single accidentals and naturals as before', () => {
    expect(format(natural('A'))).toBe('A');
    expect(format(sharp('A'))).toBe('A♯');
    expect(format(flat('A'))).toBe('A♭');
  });

  it('renders the minor quality suffix', () => {
    expect(format({ letter: 'C', offset: 1, quality: 'minor' })).toBe('C♯m');
  });

  it('renders double accidentals', () => {
    expect(format({ letter: 'F', offset: 2 })).toBe('F𝄪');
    expect(format({ letter: 'B', offset: -2 })).toBe('B𝄫');
  });
});

describe('pitchClass', () => {
  it('returns the chromatic pitch class 0-11 for naturals', () => {
    // C=0, D=2, E=4, F=5, G=7, A=9, B=11
    const expected: Record<string, number> = {
      C: 0,
      D: 2,
      E: 4,
      F: 5,
      G: 7,
      A: 9,
      B: 11,
    };
    for (const [letter, pc] of Object.entries(expected)) {
      expect(pitchClass(natural(letter as Note['letter']))).toBe(pc);
    }
  });

  it('applies the accidental offset, wrapping into 0-11', () => {
    expect(pitchClass(sharp('C'))).toBe(1);
    expect(pitchClass(flat('C'))).toBe(11); // C♭ = B
    expect(pitchClass(sharp('B'))).toBe(0); // B♯ = C
    expect(pitchClass({ letter: 'F', offset: 2 })).toBe(7); // F𝄪 = G
    expect(pitchClass({ letter: 'B', offset: -2 })).toBe(9); // B𝄫 = A
  });
});
