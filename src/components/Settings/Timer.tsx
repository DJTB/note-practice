import React, { ChangeEventHandler, FC, useRef, useState, useCallback } from 'react';
import { TextField } from '@material-ui/core';

import { TIMER_MAX_SECONDS } from '../../consts';

export const Timer: FC<{
  onChange: ChangeEventHandler;
}> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // track input val internally (but still broadcast change)
  // otherwise we can get stuck with a `0` on mobile
  // that cannot be deleted for fresh input due
  // to null being used as delay value for useInterval
  const [value, setValue] = useState('0');

  const handleChange = useCallback(
    (ev) => {
      const num = parseInt(ev.target.value);
      let newVal = ev.target.value;

      if (num < 0) {
        newVal = '0';
      } else if (num > TIMER_MAX_SECONDS) {
        newVal = `${TIMER_MAX_SECONDS}`;
      }

      setValue(newVal);
      onChange(ev);
    },
    [onChange, setValue]
  );

  const handleBlur = useCallback(
    (ev) => {
      const val = ev.target.value;
      const num = parseInt(val);

      // empty input, reset to 0
      if (!Number.isFinite(num)) {
        setValue('0');
      } else {
        setValue(val);
      }

      onChange(ev);
    },
    [onChange, setValue]
  );

  return (
    <>
      <TextField
        id="note-timer"
        className="w-16 px-1"
        ref={inputRef}
        label="Timer"
        size="small"
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};
