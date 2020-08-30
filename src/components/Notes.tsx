import React, { FC } from 'react';

import { NOTE_COLORS } from '../consts';
import type { NoteLetter, NoteMod } from '../utils/noteHelpers';

export const Note: FC<{ note: string }> = ({ note = '' }) => {
  const letter = note[0] as NoteLetter;
  const mod = note[1] as NoteMod | undefined;

  const textColor = `text-${NOTE_COLORS[letter]}-400`;

  return (
    <div className={`flex content-center justify-center text-auto-size ${textColor}`}>
      <span>{letter}</span>
      {mod && <sup style={{ lineHeight: 'inherit', top: 0, fontSize: '0.5em' }}>{mod}</sup>}
    </div>
  );
};

export const Notes: FC<{ notes: string[] }> = ({ notes = [] }) => {
  return (
    <div className="flex items-center content-center justify-evenly row-wrap">
      {notes.map((n, i) => (
        <Note key={n + i} note={n} />
      ))}
    </div>
  );
};
