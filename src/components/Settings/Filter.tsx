import React, { ChangeEventHandler, FC } from 'react';
import { MenuItem, TextField } from '@material-ui/core';

import { NOTE_FILTERS, NoteSetFilter } from '../../consts';

export const Filter: FC<{
  value: NoteSetFilter;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => (
  <TextField
    id="note-filter"
    className="px-1"
    label="Display"
    select
    value={value}
    onChange={onChange}
  >
    {NOTE_FILTERS.map((filter) => (
      <MenuItem key={filter.value} value={filter.value}>
        {filter.label}
      </MenuItem>
    ))}
  </TextField>
);
