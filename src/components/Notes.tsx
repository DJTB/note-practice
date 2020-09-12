import React, { FC } from 'react';

import { NOTE_COLORS } from '../consts';
import type { NoteLetter, NoteMod } from '../utils/noteHelpers';

export const Notes: FC<{ notes: string[] }> = ({ notes = [] }) => {
  return (
    <div className="flex flex-wrap items-center content-center justify-center gap-4">
      {notes.map((note, index) => {
        const letter = note[0] as NoteLetter;
        const mod = note[1] as NoteMod | undefined;
        const color = NOTE_COLORS[letter];

        return <Note key={note + index} letter={letter} mod={mod} color={color} />;
      })}
    </div>
  );
};

export const Note: FC<{
  letter: NoteLetter;
  mod: NoteMod | undefined;
  color: string;
}> = ({ letter, mod, color }) => {
  const textColor = `text-${color}-400`;
  const wrapperClasses = `inline-flex content-center justify-center text-auto-size ${textColor}`;
  const wrapperStyle = { flexBasis: '10vw' };
  const modStyle = { lineHeight: 'inherit', top: 0, fontSize: '0.5em' };

  /* we render 2 mods to ensure perfect spacing, but only show the right one when relevant */
  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      <sup className="invisible" style={modStyle}>
        {mod}
      </sup>
      <span>{letter}</span>
      <sup className={mod ? '' : 'invisible'} style={{ ...modStyle }}>
        {mod}
      </sup>
    </div>
  );
};
