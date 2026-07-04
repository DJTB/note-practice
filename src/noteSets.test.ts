import { describe, it, expect } from 'vitest';
import { getNotes, noteSets, NOTE_FILTERS } from './noteSets';
import { createRandom, type Random } from './random';
import { format, natural, type Note } from './note';
import { NATURAL_NOTES, FLAT_NOTES, SHARP_NOTES, CIRCLE_OF_FIFTHS } from './consts';

const asFormatted = (notes: Note[]) => notes.map(format).sort();
const asSet = (arr: string[]) => [...arr].sort();

describe('getNotes per filter (seeded Random)', () => {
  it('naturals returns the seven natural letters', () => {
    const notes = getNotes({ filter: 'naturals', count: 7 }, createRandom(1));
    expect(asSet(notes.map((n) => n.letter))).toEqual(asSet(NATURAL_NOTES));
    expect(notes.every((n) => n.offset === 0 && n.quality === undefined)).toBe(true);
  });

  it('flats draws from naturals plus flats', () => {
    const notes = getNotes({ filter: 'flats', count: 12 }, createRandom(1));
    expect(asFormatted(notes)).toEqual(
      asFormatted([...NATURAL_NOTES.map(natural), ...FLAT_NOTES])
    );
    expect(notes.some((n) => format(n).endsWith('♭'))).toBe(true);
  });

  it('sharps draws from naturals plus sharps', () => {
    const notes = getNotes({ filter: 'sharps', count: 12 }, createRandom(1));
    expect(asFormatted(notes)).toEqual(
      asFormatted([...NATURAL_NOTES.map(natural), ...SHARP_NOTES])
    );
    expect(notes.some((n) => format(n).endsWith('♯'))).toBe(true);
  });

  it('fifths returns the circle of fifths in order', () => {
    const notes = getNotes({ filter: 'fifths', count: 12 }, createRandom(1));
    expect(notes).toEqual(CIRCLE_OF_FIFTHS);
  });

  it('any yields a full octave of naturals plus one accidental family', () => {
    const notes = getNotes({ filter: 'any', count: 12 }, createRandom(1));
    expect(notes).toHaveLength(12);
    const letters = notes.map((n) => n.letter);
    expect(asSet([...new Set(letters)])).toEqual(asSet(NATURAL_NOTES));
  });

  it('is deterministic for a given seed', () => {
    const a = getNotes({ filter: 'any', count: 12 }, createRandom(42));
    const b = getNotes({ filter: 'any', count: 12 }, createRandom(42));
    expect(a).toEqual(b);
  });
});

describe('count slicing', () => {
  it('slices to the requested count', () => {
    expect(getNotes({ filter: 'flats', count: 4 }, createRandom(3))).toHaveLength(4);
  });

  it('caps naturals at seven even when more are requested', () => {
    expect(getNotes({ filter: 'naturals', count: 12 }, createRandom(3))).toHaveLength(7);
  });
});

describe('40% minor probability (any-add-minor)', () => {
  it('marks roughly 40% of notes minor over many rounds', () => {
    const rng = createRandom(2024);
    let total = 0;
    let minors = 0;
    for (let round = 0; round < 3000; round++) {
      const notes = getNotes({ filter: 'any-add-minor', count: 12 }, rng);
      total += notes.length;
      minors += notes.filter((n) => n.quality === 'minor').length;
    }
    expect(minors / total).toBeCloseTo(0.4, 1);
  });

  it('applies minors deterministically under a stubbed Random', () => {
    // chance(0.5) picks the accidental family; chance(0.4) decides each minor.
    // Stub: never flat (use sharps), always minor; identity shuffle.
    const stub: Random = { chance: (p) => p !== 0.5, shuffle: (arr) => arr };
    const notes = getNotes({ filter: 'any-add-minor', count: 12 }, stub);
    expect(notes.every((n) => n.quality === 'minor')).toBe(true);
    expect(notes.every((n) => format(n).endsWith('m'))).toBe(true);
    const bases = notes.map((n) => ({ letter: n.letter, offset: n.offset }));
    expect(bases).toEqual(
      [...NATURAL_NOTES.map(natural), ...SHARP_NOTES].map((n) => ({
        letter: n.letter,
        offset: n.offset,
      }))
    );
  });
});

describe('registry drives the derived surfaces', () => {
  it('excludes the parked fifths-flats / fifths-sharps filters', () => {
    const ids = noteSets.map((s) => s.id);
    expect(ids).not.toContain('fifths-flats');
    expect(ids).not.toContain('fifths-sharps');
    expect(ids).toContain('fifths');
  });

  it('NOTE_FILTERS matches the registry order and labels', () => {
    expect(NOTE_FILTERS).toEqual(noteSets.map((s) => ({ value: s.id, label: s.label })));
  });
});
