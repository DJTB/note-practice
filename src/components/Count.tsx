import React, { ChangeEventHandler, FC } from 'react';
import { SettingsLabel } from './SettingsLabel';

export const Count: FC<{
  value: number;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => (
  <>
    <SettingsLabel name="note-count">Count:</SettingsLabel>
    <input
      className="w-10 px-1 rounded-sm"
      name="note-count"
      type="number"
      min={1}
      max={12}
      value={value}
      onChange={onChange}
    />
  </>
);
