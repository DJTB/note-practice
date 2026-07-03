import { FC } from 'react';

import { NOTE_COLORS, NoteLetter } from '../consts';

export const Notes: FC<{ notes: string[] }> = ({ notes = [] }) => {
  return (
    <div className="flex flex-wrap items-center content-center justify-center gap-4">
      {notes.map((note, index) => {
        const colorClass = NOTE_COLORS[note[0] as NoteLetter];
        return <Note key={note + index} colorClass={colorClass} text={note} />;
      })}
    </div>
  );
};

export const Note: FC<{
  colorClass: string;
  text: string;
}> = ({ text, colorClass }) => {
  const wrapperClasses = `inline-flex content-center justify-center text-auto-size ${colorClass}`;
  const wrapperStyle = { flexBasis: '10vw' };

  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      {text}
    </div>
  );
};
