import { omitBy } from './omitBy';
import { shuffle } from './shuffle';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type NoteMod = '♯' | '♭';

export type NoteSetFilter = 'any' | 'naturals' | 'sharps' | 'flats' | 'inversions' | 'sequence';

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: number;
  randomize?: boolean;
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

const SEQUENCE_SET = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];

export const getNaturalSet = () => [...NATURAL_NOTES];
export const getSharpSet = () => [...getNaturalSet(), ...SHARP_NOTES];
export const getFlatSet = () => [...getNaturalSet(), ...FLAT_NOTES];

export const getInversionSets = () => [...INVERSION_GROUPS];
export const getSequenceSet = () => [...SEQUENCE_SET];

export const getRandomSet = () => (Math.random() > 0.5 ? getSharpSet() : getFlatSet());

export const getNoteSet = (key: NoteSetFilter) => {
  switch (key) {
    case 'any':
      return shuffle(getRandomSet());
    case 'naturals':
      return shuffle(getNaturalSet());
    case 'sharps':
      return shuffle(getSharpSet());
    case 'flats':
      return shuffle(getFlatSet());
    case 'inversions':
      return getInversionSets().flatMap((set) => shuffle(set));
    case 'sequence':
      return getSequenceSet();
  }
};

export const getNotes = ({ filter = 'any', count = 6 }: NoteSetConfig = {}): string[] => {
  return getNoteSet(filter).slice(0, count);
};
