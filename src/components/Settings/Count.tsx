import { ChangeEvent, FC, FocusEvent, useCallback, useRef } from 'react';
import { DEFAULT_NOTES_COUNT } from '../../consts';
import { Label } from './Label';

type InputEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

export const Count: FC<{
  value: number;
  max: number;
  onChange: (event: InputEvent) => void;
}> = ({ value, max, onChange }) => {
  const lastValidValue = useRef(String(DEFAULT_NOTES_COUNT));

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
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
    (ev: FocusEvent<HTMLInputElement>) => {
      // input empty/invalid, reset to last valid value
      if (!Number.isFinite(parseInt(ev.target.value))) {
        ev.target.value = lastValidValue.current;
      }

      onChange(ev);
    },
    [onChange]
  );

  return (
    <div className="flex items-center">
      <Label name="note-count">Count</Label>
      <input
        id="note-count"
        className="w-12 px-1 py-1 text-gray-900 bg-white border border-gray-400 rounded"
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
