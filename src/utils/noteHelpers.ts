import { omitBy } from './omitBy';
import { shuffle } from './shuffle';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type NoteMod = '♯' | '♭';

export type NoteSetFilter = 'any' | 'naturals' | 'sharps' | 'flats';

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: number;
};

const NATURAL_NOTES: NoteLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SHARP_NOTES = omitBy(NATURAL_NOTES, ['B', 'E']).map((note) => note + '♯');
const FLAT_NOTES = omitBy(NATURAL_NOTES, ['C', 'F']).map((note) => note + '♭');

export const getNaturalSet = () => [...NATURAL_NOTES];
export const getSharpSet = () => [...getNaturalSet(), ...SHARP_NOTES];
export const getFlatSet = () => [...getNaturalSet(), ...FLAT_NOTES];
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
    default:
      return getRandomSet();
  }
};

export const getShuffledNoteSet = ({ filter = 'any', count = 6 }: NoteSetConfig = {}) => {
  return shuffle(getNoteSet(filter)).slice(0, count);
};
