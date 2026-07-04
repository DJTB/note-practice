import { omitBy } from './utils/omitBy';

export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type NoteMod = '♯' | '♭';
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
export const SHARP_NOTES = omitBy(NATURAL_NOTES, ['B', 'E']).map((note) => note + '♯');
export const FLAT_NOTES = omitBy(NATURAL_NOTES, ['C', 'F']).map((note) => note + '♭');

export const INVERSION_GROUPS = [
  ['C', 'F', 'G'],
  ['A', 'D', 'E'],
  ['Ab', 'Db', 'Eb'],
  ['B', 'Bb', 'Gb'],
];

export const CIRCLE_OF_FIFTHS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];

// Parked: raw data for the fifths-flats / fifths-sharps filters. Left out of the
// note-set registry (unshippable until verified) but retained here — see noteSets.ts.
/* Are these all Major? */
/* Are these actually in the right order ?*/
export const CIRCLE_OF_FIFTHS_FLATS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
export const CIRCLE_OF_FIFTHS_SHARPS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
