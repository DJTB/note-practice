import React, { ChangeEventHandler, FC, useRef } from 'react';
import { SettingsLabel } from './SettingsLabel';

export const Timer: FC<{
  value: number;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <SettingsLabel name="note-timer">Refresh Timer:</SettingsLabel>
      <input
        ref={inputRef}
        className="w-12 px-1 rounded-sm"
        name="note-timer"
        type="number"
        min={0}
        max={60}
        step={1}
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
