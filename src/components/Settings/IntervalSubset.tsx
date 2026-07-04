import { FC } from 'react';

import { INTERVALS, type IntervalName } from '../../interval';

// The interval-subset selector: the nine intervals as toggles, parallel to the
// Filter dropdown. Disabling an interval removes it from challenge generation.
export const IntervalSubset: FC<{
  enabled: IntervalName[];
  toggle: (name: IntervalName) => void;
}> = ({ enabled, toggle }) => (
  <fieldset className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
    <legend className="mb-1 text-gray-400">Intervals</legend>
    {INTERVALS.map(({ name }) => (
      <label key={name} className="flex items-center gap-1 text-gray-700">
        <input
          type="checkbox"
          checked={enabled.includes(name)}
          onChange={() => toggle(name)}
        />
        {name}
      </label>
    ))}
  </fieldset>
);
