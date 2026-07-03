import { ChangeEventHandler, FC } from 'react';

import { NOTE_FILTERS, NoteSetFilter } from '../../noteSets';
import { Label } from './Label';

export const Filter: FC<{
  value: NoteSetFilter;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}> = ({ value, onChange }) => (
  <div className="flex items-center">
    <Label name="note-filter">Display</Label>
    <select
      id="note-filter"
      className="px-1 py-1 text-gray-900 bg-white border border-gray-400 rounded"
      value={value}
      onChange={onChange}
    >
      {NOTE_FILTERS.map((filter) => (
        <option key={filter.value} value={filter.value}>
          {filter.label}
        </option>
      ))}
    </select>
  </div>
);
