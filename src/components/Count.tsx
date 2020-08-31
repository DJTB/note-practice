import React, { ChangeEventHandler, FC, useRef } from 'react';
import { SettingsLabel } from './SettingsLabel';

export const Count: FC<{
  value: number;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <SettingsLabel name="note-count">Count:</SettingsLabel>
      <input
        ref={inputRef}
        className="w-10 px-1 rounded-sm"
        name="note-count"
        type="number"
        min={1}
        max={12}
        value={value}
        onChange={onChange}
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            inputRef.current?.blur();
          }
        }}
      />
    </>
  );
};
