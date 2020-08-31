import React, { ChangeEventHandler, FC } from 'react';
import { NoteSetFilter } from '../../utils/noteHelpers';
import { Label } from './Label';

export const Filter: FC<{
  value: NoteSetFilter;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => (
  <>
    <Label name="note-filter">Notes:</Label>
    <select className="px-1 rounded-sm" name="note-filter" value={value} onChange={onChange}>
      <option value="any">Any</option>
      <option value="naturals">Naturals Only</option>
      <option value="sharps">Naturals + Sharps</option>
      <option value="flats">Naturals + Flats</option>
    </select>
  </>
);
