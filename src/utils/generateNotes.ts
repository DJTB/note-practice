import { omitBy } from './omitBy';
import { shuffle } from './shuffle';

export type NoteSet = string[];
export type NoteSetFilter = 'any' | 'naturals' | 'sharps' | 'flats';
export type NoteSetCount = number;

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: NoteSetCount;
};

const NATURAL_NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SHARP_NOTES = omitBy(NATURAL_NOTES, ['B', 'E']).map((note) => note + '♯');
const FLAT_NOTES = omitBy(NATURAL_NOTES, ['C', 'F']).map((note) => note + '♭');

const getNaturalSet = () => [...NATURAL_NOTES];
const getSharpSet = () => [...getNaturalSet(), ...SHARP_NOTES];
const getFlatSet = () => [...getNaturalSet(), ...FLAT_NOTES];
const getRandomSet = () => (Math.random() > 0.5 ? getSharpSet() : getFlatSet());

const getNoteSet = (key: NoteSetFilter) => {
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
export const getRandomNoteSet = ({ filter = 'any', count = 6 }: NoteSetConfig = {}): NoteSet => {
  return shuffle(getNoteSet(filter)).slice(0, count);
};
