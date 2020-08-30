import React, { FC } from 'react';

import { NOTE_COLORS } from '../consts';
import type { NoteLetter, NoteMod } from '../utils/noteHelpers';

export const Note: FC<{
  letter: NoteLetter;
  mod: NoteMod | undefined;
  color: string;
  shouldOffset?: boolean;
}> = ({ letter, mod, color, shouldOffset = false }) => {
  const textColor = `text-${color}-400`;
  const offset = shouldOffset ? 'ml-1' : '';
  const classes = `flex content-center justify-center text-auto-size ${textColor} ${offset}`;

  return (
    <div className={classes}>
      <span>{letter}</span>
      {mod && <sup style={{ lineHeight: 'inherit', top: 0, fontSize: '0.5em' }}>{mod}</sup>}
    </div>
  );
};

export const Notes: FC<{ notes: string[] }> = ({ notes = [] }) => {
  return (
    <div className="grid items-center content-center grid-cols-6 justify-evenly">
      {notes.map((note, index) => {
        const letter = note[0] as NoteLetter;
        const mod = note[1] as NoteMod | undefined;
        const color = NOTE_COLORS[letter];
        const prev = index - 1 < notes.length && notes[index - 1];
        const prevHadMod = Boolean(prev && prev[1]);
        const shouldOffset = Boolean(mod && prev && !prevHadMod);

        return (
          <Note
            key={note + index}
            letter={letter}
            mod={mod}
            color={color}
            shouldOffset={shouldOffset}
          />
        );
      })}
    </div>
  );
};
