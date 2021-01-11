import {
  CIRCLE_OF_FIFTHS,
  CIRCLE_OF_FIFTHS_FLATS,
  CIRCLE_OF_FIFTHS_SHARPS,
  FLAT_NOTES,
  INVERSION_GROUPS,
  NATURAL_NOTES,
  SHARP_NOTES,
  NoteSetFilter,
} from '../consts';

import { shuffle } from './shuffle';

export type NoteSetConfig = {
  filter?: NoteSetFilter;
  count?: number;
  randomize?: boolean;
};

export const getOctaveSet = ({ flats = false, sharps = false, minors = false } = {}) => {
  let notes: string[] = [...NATURAL_NOTES];

  if (flats) notes = [...NATURAL_NOTES, ...FLAT_NOTES];
  if (sharps) notes = [...NATURAL_NOTES, ...SHARP_NOTES];
  if (minors) notes = notes.map((n) => (Math.random() >= 0.6 ? n + 'm' : n));

  return notes;
};

export const getRandomSet = ({ minors = false } = {}) => {
  const useFlats = Math.random() >= 0.5;
  return getOctaveSet({ flats: useFlats, sharps: !useFlats, minors });
};

export const getInversionSets = () => [...INVERSION_GROUPS];

export const getFifthsSet = ({ flats = false, sharps = false } = {}) => {
  if (flats) return [...CIRCLE_OF_FIFTHS_FLATS];
  if (sharps) return [...CIRCLE_OF_FIFTHS_SHARPS];
  return [...CIRCLE_OF_FIFTHS];
};

export const getNoteSet = (key: NoteSetFilter) => {
  switch (key) {
    case 'any':
      return shuffle(getRandomSet());
    case 'any-add-minor':
      return shuffle(getRandomSet({ minors: true }));
    case 'naturals':
      return shuffle(getOctaveSet());
    case 'flats':
      return shuffle(getOctaveSet({ flats: true }));
    case 'sharps':
      return shuffle(getOctaveSet({ sharps: true }));
    case 'inversions':
      return getInversionSets().flatMap((set) => shuffle(set));
    case 'fifths':
      return getFifthsSet({});
    case 'fifths-flats':
      return getFifthsSet({ flats: true });
    case 'fifths-sharps':
      return getFifthsSet({ sharps: true });
  }
};

export const getNotes = ({ filter = 'any', count = 6 }: NoteSetConfig = {}): string[] => {
  return getNoteSet(filter).slice(0, count);
};
