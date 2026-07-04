import type { NoteLetter } from './consts';

// A structured note value. `offset` is a signed semitone offset from the
// natural letter (♭ = -1, ♮ = 0, ♯ = +1). Note practice only ever uses
// -1 | 0 | 1; the signed representation lets interval practice later widen
// the range to double accidentals (see #31) as a one-line change rather than
// a representation migration.
export type Offset = -1 | 0 | 1;

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

const ACCIDENTAL: Record<Offset, string> = { [-1]: '♭', [0]: '', [1]: '♯' };

// Rendered form, e.g. 'A', 'A♯', 'A♭', 'Am', 'A♯m'. Called only at the render leaf.
export const format = (note: Note): string =>
  `${note.letter}${ACCIDENTAL[note.offset]}${note.quality === 'minor' ? 'm' : ''}`;
