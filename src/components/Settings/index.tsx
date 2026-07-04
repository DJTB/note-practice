import { ChangeEvent, FC, memo, useCallback } from 'react';

import { NoteSetFilter } from '../../noteSets';

import { Filter } from './Filter';
import { Timer } from './Timer';
import { Count } from './Count';

// The settings row wires the session's domain setters to the three controls.
// Count and Timer own their own parse/clamp (via useClampedNumberInput); Filter
// is a plain select. Settings only forwards.
export const Settings: FC<{
  filter: NoteSetFilter;
  count: number;
  maxCount: number;
  setFilter: (filter: NoteSetFilter) => void;
  setCount: (count: number) => void;
  setTimerSeconds: (seconds: number | null) => void;
}> = memo(({ filter, count, maxCount, setFilter, setCount, setTimerSeconds }) => {
  const handleFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => setFilter(target.value as NoteSetFilter),
    [setFilter]
  );

  return (
    <>
      <div className="flex justify-center mb-4 md:justify-start">
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      <div className="flex justify-center mb-4 ">
        <Timer onValue={setTimerSeconds} />
      </div>
      <div className="flex justify-center mb-4 md:justify-end">
        <Count value={count} max={maxCount} onValue={setCount} />
      </div>
    </>
  );
});
