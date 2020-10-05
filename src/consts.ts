import { NoteSetFilter } from './utils/noteHelpers';

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
  { label: 'All Notes', value: 'any' },
  { label: 'Naturals Only', value: 'naturals' },
  { label: 'Naturals + Sharps', value: 'sharps' },
  { label: 'Naturals + Flats', value: 'flats' },
  { label: 'Inversion Groups', value: 'inversions' },
  { label: 'The Sequence', value: 'sequence' },
];
