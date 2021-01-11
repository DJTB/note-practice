import { omitBy } from './utils/omitBy';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type NoteMod = '♯' | '♭';
export type ChordMod = 'M' | 'm'; // TODO: sus, diminished etc - could use –+Δo7 etc

export type NoteSetFilter =
  | 'any'
  | 'any-add-minor'
  | 'naturals'
  | 'sharps'
  | 'flats'
  | 'inversions'
  | 'fifths'
  | 'fifths-flats'
  | 'fifths-sharps';

export const DEFAULT_NOTES_COUNT = 12;
export const NATURAL_NOTES_COUNT = 7;
export const MAX_NOTES_COUNT = 12;

export const DEFAULT_NOTES_FILTER: NoteSetFilter = 'any';

export const TIMER_MAX_SECONDS = 60;

export const NOTE_COLORS = {
  A: 'blue',
  B: 'purple',
  C: 'red',
  D: 'yellow',
  E: 'orange',
  F: 'green',
  G: 'teal',
} as const;

export const NOTE_FILTERS: { label: string; value: NoteSetFilter }[] = [
  { label: 'Any', value: 'any' },
  { label: 'Any + Minor', value: 'any-add-minor' },
  { label: 'Naturals Only', value: 'naturals' },
  { label: 'Naturals + Flats', value: 'flats' },
  { label: 'Naturals + Sharps', value: 'sharps' },
  { label: 'Inversion Groups', value: 'inversions' },
  { label: 'Fifths', value: 'fifths' },
  // { label: 'Fifths (Flats)', value: 'fifths-flats' },
  // { label: 'Fifths (Sharps)', value: 'fifths-sharps' },
];

export const NATURAL_NOTES: NoteLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const SHARP_NOTES = omitBy(NATURAL_NOTES, ['B', 'E']).map((note) => note + '♯');
export const FLAT_NOTES = omitBy(NATURAL_NOTES, ['C', 'F']).map((note) => note + '♭');

export const INVERSION_GROUPS = [
  ['C', 'F', 'G'],
  ['A', 'D', 'E'],
  ['Ab', 'Db', 'Eb'],
  ['B', 'Bb', 'Gb'],
];

export const CIRCLE_OF_FIFTHS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];
/* Are these all Major? */
/* Are these actually in the right order ?*/
export const CIRCLE_OF_FIFTHS_FLATS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
export const CIRCLE_OF_FIFTHS_SHARPS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
