import { ChangeEvent, FC, FocusEvent, useCallback, useState } from 'react';

import { TIMER_MAX_SECONDS } from '../../consts';
import { Label } from './Label';

type InputEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

export const Timer: FC<{
  onChange: (event: InputEvent) => void;
}> = ({ onChange }) => {
  // track input val internally (but still broadcast change)
  // otherwise we can get stuck with a `0` on mobile
  // that cannot be deleted for fresh input due
  // to null being used as delay value for useInterval
  const [value, setValue] = useState('0');

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
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
    (ev: FocusEvent<HTMLInputElement>) => {
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
    <div className="flex items-center">
      <Label name="note-timer">Timer</Label>
      <input
        id="note-timer"
        className="w-16 px-1 py-1 text-gray-900 bg-white border border-gray-400 rounded"
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
