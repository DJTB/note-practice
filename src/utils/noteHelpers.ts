import { omitBy } from './omitBy';
import { shuffle } from './shuffle';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type NoteMod = '♯' | '♭';

export type NoteSetFilter = 'any' | 'naturals' | 'sharps' | 'flats' | 'inversions';

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: number;
};

const NATURAL_NOTES: NoteLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SHARP_NOTES = omitBy(NATURAL_NOTES, ['B', 'E']).map((note) => note + '♯');
const FLAT_NOTES = omitBy(NATURAL_NOTES, ['C', 'F']).map((note) => note + '♭');

const INVERSION_GROUPS = [
  ['C', 'F', 'G'],
  ['A', 'D', 'E'],
  ['Ab', 'Db', 'Eb'],
  ['B', 'Bb', 'Gb'],
];

export const getNaturalSet = () => [...NATURAL_NOTES];
export const getSharpSet = () => [...getNaturalSet(), ...SHARP_NOTES];
export const getFlatSet = () => [...getNaturalSet(), ...FLAT_NOTES];

export const getInversionSets = () => [...INVERSION_GROUPS];

export const getRandomSet = () => (Math.random() > 0.5 ? getSharpSet() : getFlatSet());

export const getNoteSet = (key: NoteSetFilter) => {
  switch (key) {
    case 'any':
      return getRandomSet();
    case 'naturals':
      return getNaturalSet();
    case 'sharps':
      return getSharpSet();
    case 'flats':
      return getFlatSet();
    case 'inversions':
      return getInversionSets();
  }
};

export const getNotes = ({ filter = 'any', count = 6 }: NoteSetConfig = {}): string[] => {
  let notes = shuffle(getNoteSet(filter));

  // e.g. inversion groups
  if (notes.some(Array.isArray)) {
    notes = notes.flatMap((g) => shuffle(g));
  }

  return notes.slice(0, count);
};
