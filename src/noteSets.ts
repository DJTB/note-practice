import {
  CIRCLE_OF_FIFTHS,
  FLAT_NOTES,
  INVERSION_GROUPS,
  NATURAL_NOTES,
  SHARP_NOTES,
} from './consts';
import { minor, natural, type Note } from './note';
import { defaultRandom, type Random } from './random';

// Probability a note is presented as minor (see PRD — preserved exactly).
const MINOR_PROBABILITY = 0.4;

// One octave of naturals, optionally widened with flats or sharps and
// optionally sprinkled with minors. Module-private; randomness injected.
const getOctaveSet = (
  rng: Random,
  { flats = false, sharps = false, minors = false } = {}
): Note[] => {
  const naturals = NATURAL_NOTES.map(natural);
  let notes: Note[] = naturals;

  if (flats) notes = [...naturals, ...FLAT_NOTES];
  if (sharps) notes = [...naturals, ...SHARP_NOTES];
  if (minors) notes = notes.map((n) => (rng.chance(MINOR_PROBABILITY) ? minor(n) : n));

  return notes;
};

// A full octave that randomly leans flat or sharp (a fair coin flip).
const getRandomSet = (rng: Random, { minors = false } = {}): Note[] => {
  const useFlats = rng.chance(0.5);
  return getOctaveSet(rng, { flats: useFlats, sharps: !useFlats, minors });
};

// Ordered registry: adding or reordering a filter is a single edit here, and
// the NoteSetFilter type, the dropdown list, and dispatch all derive from it.
export const noteSets = [
  { id: 'any', label: 'Any', generate: (rng: Random) => rng.shuffle(getRandomSet(rng)) },
  {
    id: 'any-add-minor',
    label: 'Any + Minor',
    generate: (rng: Random) => rng.shuffle(getRandomSet(rng, { minors: true })),
  },
  {
    id: 'naturals',
    label: 'Naturals Only',
    generate: (rng: Random) => rng.shuffle(getOctaveSet(rng)),
  },
  {
    id: 'flats',
    label: 'Naturals + Flats',
    generate: (rng: Random) => rng.shuffle(getOctaveSet(rng, { flats: true })),
  },
  {
    id: 'sharps',
    label: 'Naturals + Sharps',
    generate: (rng: Random) => rng.shuffle(getOctaveSet(rng, { sharps: true })),
  },
  {
    id: 'inversions',
    label: 'Inversion Groups',
    generate: (rng: Random) => INVERSION_GROUPS.flatMap((group) => rng.shuffle(group)),
  },
  { id: 'fifths', label: 'Fifths', generate: () => [...CIRCLE_OF_FIFTHS] },
] as const;

export type NoteSetFilter = (typeof noteSets)[number]['id'];

export const DEFAULT_NOTES_FILTER: NoteSetFilter = 'any';

// Derived dropdown options — always in sync with the registry.
export const NOTE_FILTERS: { label: string; value: NoteSetFilter }[] = noteSets.map(
  ({ id, label }) => ({ value: id, label })
);

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: number;
};

// The single interface for generating a Note Set. Randomness is injected and
// defaults to production, so application call sites are unchanged.
export const getNotes = (
  { filter = DEFAULT_NOTES_FILTER, count = 6 }: NoteSetConfig = {},
  rng: Random = defaultRandom
): Note[] => {
  const noteSet = noteSets.find((set) => set.id === filter) ?? noteSets[0];
  return noteSet.generate(rng).slice(0, count);
};
