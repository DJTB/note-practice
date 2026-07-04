import { FC } from 'react';

import { TIMER_MAX_SECONDS } from '../../consts';
import { useClampedNumberInput } from '../../useClampedNumberInput';
import { Label } from './Label';

export const Timer: FC<{
  onValue: (seconds: number) => void;
}> = ({ onValue }) => {
  // The timer has no external source of truth — it starts paused at 0 and the
  // input owns its value from there.
  const input = useClampedNumberInput({
    value: 0,
    min: 0,
    max: TIMER_MAX_SECONDS,
    onValue,
    resetTo: 'min',
  });

  return (
    <div className="flex items-center">
      <Label name="note-timer">Timer</Label>
      <input
        id="note-timer"
        className="w-16 px-1 py-1 text-gray-900 bg-white border border-gray-400 rounded"
        type="number"
        {...input}
      />
    </div>
  );
};
