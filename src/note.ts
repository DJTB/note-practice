import type { NoteLetter } from './consts';

// A structured note value. `offset` is a signed semitone offset from the
// natural letter (𝄫 = -2, ♭ = -1, ♮ = 0, ♯ = +1, 𝄪 = +2). Note practice only
// ever uses -1 | 0 | 1; interval practice (#31) widens the range to double
// accidentals for theory-correct transposition (see ADR-0004, ADR-0005).
export type Offset = -2 | -1 | 0 | 1 | 2;

export type Note = {
  letter: NoteLetter;
  offset: Offset;
  quality?: 'minor';
};

// The app originates every note, so there is no `parse`: a note-string parser
// would be a hypothetical seam with no caller.
export const natural = (letter: NoteLetter): Note => ({ letter, offset: 0 });
export const sharp = (letter: NoteLetter): Note => ({ letter, offset: 1 });
export const flat = (letter: NoteLetter): Note => ({ letter, offset: -1 });
export const minor = (note: Note): Note => ({ ...note, quality: 'minor' });

// A natural note renders as the bare letter (offset 0 → ''), so the ♮ sign is
// never emitted for a standalone note — this keeps note-practice display
// unchanged while the double accidentals 𝄫/𝄪 support interval answers.
const ACCIDENTAL: Record<Offset, string> = {
  [-2]: '𝄫',
  [-1]: '♭',
  [0]: '',
  [1]: '♯',
  [2]: '𝄪',
};

// Rendered form, e.g. 'A', 'A♯', 'A♭', 'Am', 'F𝄪'. Called only at the render leaf.
export const format = (note: Note): string =>
  `${note.letter}${ACCIDENTAL[note.offset]}${note.quality === 'minor' ? 'm' : ''}`;

// Semitones above C for each natural letter.
const LETTER_SEMITONES: Record<NoteLetter, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

// The chromatic pitch class (0-11) a note sounds, folding the accidental in.
export const pitchClass = (note: Note): number =>
  (((LETTER_SEMITONES[note.letter] + note.offset) % 12) + 12) % 12;
