import React, { ChangeEventHandler, FC } from 'react';
import { NoteSetFilter } from '../utils/noteHelpers';
import { SettingsLabel } from './SettingsLabel';

export const Filter: FC<{
  value: NoteSetFilter;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => (
  <>
    <SettingsLabel name="note-filter">Notes:</SettingsLabel>
    <select className="px-1 rounded-sm" name="note-filter" value={value} onChange={onChange}>
      <option value="any">Any</option>
      <option value="naturals">Naturals Only</option>
      <option value="sharps">Naturals + Sharps</option>
      <option value="flats">Naturals + Flats</option>
    </select>
  </>
);
