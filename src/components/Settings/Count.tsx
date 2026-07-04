import { FC } from 'react';

import { useClampedNumberInput } from '../../useClampedNumberInput';
import { Label } from './Label';

export const Count: FC<{
  value: number;
  max: number;
  onValue: (count: number) => void;
}> = ({ value, max, onValue }) => {
  const input = useClampedNumberInput({ value, min: 1, max, onValue, resetTo: 'last-valid' });

  return (
    <div className="flex items-center">
      <Label name="note-count">Count</Label>
      <input
        id="note-count"
        className="w-12 px-1 py-1 text-gray-900 bg-white border border-gray-400 rounded"
        type="number"
        {...input}
      />
    </div>
  );
};
