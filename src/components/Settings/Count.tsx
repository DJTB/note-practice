import React, { ChangeEventHandler, FC, useRef } from 'react';
import { Label } from './Label';

export const Count: FC<{
  value: number;
  onChange: ChangeEventHandler;
}> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Label name="note-count">Count:</Label>
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
