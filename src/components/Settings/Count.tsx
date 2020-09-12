import React, { ChangeEventHandler, FC, useCallback, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { DEFAULT_NOTES_COUNT } from '../../consts';

export const Count: FC<{
  value: number;
  max: number;
  onChange: ChangeEventHandler;
}> = ({ value, max, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastValidValue = useRef(DEFAULT_NOTES_COUNT);

  const handleChange = useCallback(
    (ev) => {
      let newValue = ev.target.value;
      const num = parseInt(ev.target.value);

      if (num <= 0) {
        newValue = '1';
      } else if (num > max) {
        newValue = `${max}`;
      }

      // hold onto last valid value for reset in blur
      if (Number.isFinite(num)) {
        lastValidValue.current = newValue;
      }

      // update displayed value regardless
      ev.target.value = newValue;
      onChange(ev);
    },
    [max, onChange]
  );

  const handleBlur = useCallback(
    (ev) => {
      // input empty/invalid, reset to last valid value
      if (!Number.isFinite(ev.target.value)) {
        ev.target.value = lastValidValue.current;
      }

      onChange(ev);
    },
    [onChange]
  );

  return (
    <TextField
      id="note-count"
      className="w-10 px-1"
      ref={inputRef}
      label="Count"
      type="number"
      value={value}
      size="small"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
