import React, { FC } from 'react';

import { NOTE_COLORS, NoteLetter } from '../consts';

export const Notes: FC<{ notes: string[] }> = ({ notes = [] }) => {
  return (
    <div className="flex flex-wrap items-center content-center justify-center gap-4">
      {notes.map((note, index) => {
        const color = NOTE_COLORS[note[0] as NoteLetter];
        return <Note key={note + index} color={color} text={note} />;
      })}
    </div>
  );
};

export const Note: FC<{
  color: string;
  text: string;
}> = ({ text, color }) => {
  const textColor = `text-${color}-400`;
  const wrapperClasses = `inline-flex content-center justify-center text-auto-size ${textColor}`;
  const wrapperStyle = { flexBasis: '10vw' };

  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      {text}
    </div>
  );
};
