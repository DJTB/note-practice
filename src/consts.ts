import { omitBy } from './utils/omitBy';
import { flat, natural, sharp, type Note } from './note';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type ChordMod = 'M' | 'm'; // TODO: sus, diminished etc - could use –+Δo7 etc

export const DEFAULT_NOTES_COUNT = 12;
export const NATURAL_NOTES_COUNT = 7;
export const MAX_NOTES_COUNT = 12;

export const TIMER_MAX_SECONDS = 60;

// Full literal Tailwind classes, never interpolated (see ADR-0003).
export const NOTE_COLORS: Record<NoteLetter, string> = {
  A: 'text-blue-400',
  B: 'text-purple-400',
  C: 'text-red-400',
  D: 'text-yellow-400',
  E: 'text-orange-400',
  F: 'text-green-400',
  G: 'text-teal-400',
};

export const NATURAL_NOTES: NoteLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const SHARP_NOTES: Note[] = omitBy<NoteLetter>(NATURAL_NOTES, ['B', 'E']).map(sharp);
export const FLAT_NOTES: Note[] = omitBy<NoteLetter>(NATURAL_NOTES, ['C', 'F']).map(flat);

export const INVERSION_GROUPS: Note[][] = [
  [natural('C'), natural('F'), natural('G')],
  [natural('A'), natural('D'), natural('E')],
  [flat('A'), flat('D'), flat('E')],
  [natural('B'), flat('B'), flat('G')],
];

export const CIRCLE_OF_FIFTHS: Note[] = [
  natural('C'),
  natural('F'),
  flat('B'),
  flat('E'),
  flat('A'),
  flat('D'),
  flat('G'),
  natural('B'),
  natural('E'),
  natural('A'),
  natural('D'),
  natural('G'),
];

// Parked: raw data for the fifths-flats / fifths-sharps filters. Left out of the
// note-set registry (unshippable until verified) but retained here — see noteSets.ts.
/* Are these all Major? */
/* Are these actually in the right order ?*/
export const CIRCLE_OF_FIFTHS_FLATS: Note[] = [
  natural('C'),
  natural('F'),
  flat('B'),
  flat('E'),
  flat('A'),
  flat('D'),
  flat('G'),
  flat('C'),
];
export const CIRCLE_OF_FIFTHS_SHARPS: Note[] = [
  natural('C'),
  natural('G'),
  natural('D'),
  natural('A'),
  natural('E'),
  natural('B'),
  sharp('F'),
  sharp('C'),
];
