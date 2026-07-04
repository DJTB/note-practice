import { natural, pitchClass, type Note, type Offset } from './note';
import { NATURAL_NOTES } from './consts';

// The musical alphabet in order, used to advance the answer letter by an
// interval's letter-steps (wrapping A→G→A). This is the natural-note sequence.
const LETTERS = NATURAL_NOTES;

// Fold a raw semitone difference into the nearest signed offset. A properly
// paired interval (matched letterSteps/semitones) always lands within ±2; the
// window is (-6, 6] so a mispaired row surfaces as an out-of-range value that
// `transpose` rejects rather than silently mis-spelling.
const normalizeOffset = (diff: number): number => {
  const d = ((diff % 12) + 12) % 12;
  return d > 6 ? d - 12 : d;
};

// An ascending interval. `letterSteps` is how far the answer letter advances
// along the musical alphabet (a 3rd advances 2 letters); `semitones` is the
// chromatic distance. The pair fixes the theory-correct spelling — the tritone
// is an augmented 4th (letterSteps 3), so from C it spells F♯, not G♭.
export type Interval = {
  name: string;
  letterSteps: number;
  semitones: number;
};

// Ordered registry (same single-source-of-truth pattern as the note-set Filter
// registry): adding or reordering an interval is a single edit here.
export const INTERVALS = [
  { name: 'minor 3rd', letterSteps: 2, semitones: 3 },
  { name: 'major 3rd', letterSteps: 2, semitones: 4 },
  { name: '4th', letterSteps: 3, semitones: 5 },
  { name: 'tritone', letterSteps: 3, semitones: 6 },
  { name: '5th', letterSteps: 4, semitones: 7 },
  { name: 'minor 6th', letterSteps: 5, semitones: 8 },
  { name: 'major 6th', letterSteps: 5, semitones: 9 },
  { name: 'minor 7th', letterSteps: 6, semitones: 10 },
  { name: 'major 7th', letterSteps: 6, semitones: 11 },
] as const satisfies readonly Interval[];

export type IntervalName = (typeof INTERVALS)[number]['name'];

// The theory-correct answer note an interval above `root`. The answer letter
// advances by `letterSteps`; its accidental offset is whatever hits the target
// pitch class — which may be a double accidental (major 7th above G♯ = F𝄪).
// Source of truth for spelling; `simplify` is for display.
export const transpose = (root: Note, interval: Interval): Note => {
  const letter = LETTERS[(LETTERS.indexOf(root.letter) + interval.letterSteps) % 7];
  const targetPitch = (pitchClass(root) + interval.semitones) % 12;
  const offset = normalizeOffset(targetPitch - pitchClass(natural(letter)));
  // Guards the `as Offset` cast: a proper interval never exceeds a double
  // accidental, so an out-of-range value means a bad registry row, not input.
  if (offset < -2 || offset > 2) {
    throw new Error(`Interval ${interval.name} produced an out-of-range offset ${offset}`);
  }
  return { letter, offset: offset as Offset };
};

// The enharmonic-simplest spelling (0-1 accidental) for each pitch class.
const SIMPLEST: Omit<Note, 'quality'>[] = [
  { letter: 'C', offset: 0 }, // 0
  { letter: 'C', offset: 1 }, // 1  C♯
  { letter: 'D', offset: 0 }, // 2
  { letter: 'E', offset: -1 }, // 3  E♭
  { letter: 'E', offset: 0 }, // 4
  { letter: 'F', offset: 0 }, // 5
  { letter: 'F', offset: 1 }, // 6  F♯
  { letter: 'G', offset: 0 }, // 7
  { letter: 'A', offset: -1 }, // 8  A♭
  { letter: 'A', offset: 0 }, // 9
  { letter: 'B', offset: -1 }, // 10 B♭
  { letter: 'B', offset: 0 }, // 11
];

// Re-spell any note (including double accidentals) as its enharmonic-simplest
// name for display. Quality is orthogonal to pitch, so it is carried through.
export const simplify = (note: Note): Note => ({
  ...SIMPLEST[pitchClass(note)],
  ...(note.quality ? { quality: note.quality } : {}),
});
