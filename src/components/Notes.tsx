import React from 'react';
import type { NoteSet } from '../utils/generateNotes';

const colors: { [key: string]: string } = {
  A: 'text-blue-400',
  B: 'text-purple-400',
  C: 'text-red-400',
  D: 'text-yellow-400',
  E: 'text-orange-400',
  F: 'text-green-400',
  G: 'text-teal-400',
};

export const Note = ({ note = '' }) => {
  const [letter, mod] = note;
  const textColor = colors[letter];

  return (
    <div className={`flex content-center justify-center text-auto-size ${textColor}`}>
      <span>{letter}</span>
      {mod && <sup style={{ lineHeight: 'inherit', top: 0, fontSize: '0.5em' }}>{mod}</sup>}
    </div>
  );
};

export const Notes = ({ notes = [] }: { notes: NoteSet }) => {
  return (
    <div className="flex items-center content-center justify-evenly row-wrap">
      {notes.map((n, i) => (
        <Note key={n + i} note={n} />
      ))}
    </div>
  );
};
