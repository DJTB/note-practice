import { FC } from 'react';

import { NOTE_COLORS } from '../consts';
import { format, type Note } from '../note';
import type { Challenge } from '../useIntervalSession';
import { NoteView } from './Notes';

// Prompt shows the Root and Interval name for a cold attempt. On reveal it shows
// the simplified answer prominently, with the theory-correct spelling as a small
// caption — and only when it differs (e.g. F𝄪 vs G), since an identical caption
// would be redundant.
export const IntervalChallenge: FC<{
  challenge: Challenge;
  revealed: boolean;
  answer: Note;
  simplified: Note;
}> = ({ challenge, revealed, answer, simplified }) => {
  const { root, interval } = challenge;
  const spellingDiffers = format(simplified) !== format(answer);

  return (
    <div className="flex flex-col items-center content-center justify-center h-full gap-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <NoteView colorClass={NOTE_COLORS[root.letter]} text={format(root)} />
        <span className="text-2xl italic text-gray-400 md:text-4xl">{interval.name}</span>
      </div>

      {revealed && (
        <div className="flex flex-col items-center gap-2">
          <NoteView colorClass={NOTE_COLORS[simplified.letter]} text={format(simplified)} />
          {spellingDiffers && (
            <span className="text-sm text-gray-400">spelled {format(answer)}</span>
          )}
        </div>
      )}
    </div>
  );
};
