import { FC } from 'react';

import { NOTE_COLORS } from '../consts';
import { format, type Note } from '../note';

export const Notes: FC<{ notes: Note[] }> = ({ notes = [] }) => {
  return (
    <div className="flex flex-wrap items-center content-center justify-center h-full gap-4">
      {notes.map((note, index) => {
        const colorClass = NOTE_COLORS[note.letter];
        return <NoteView key={format(note) + index} colorClass={colorClass} text={format(note)} />;
      })}
    </div>
  );
};

export const NoteView: FC<{
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
