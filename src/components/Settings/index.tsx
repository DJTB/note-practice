import { ChangeEvent, FC, FocusEvent, memo, useCallback } from 'react';

import { NoteSetFilter } from '../../noteSets';

import { Filter } from './Filter';
import { Timer } from './Timer';
import { Count } from './Count';

type InputEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

// The DOM adapter: it turns raw input events into domain calls on the session's
// setters. All parse/clamp lives in the leaf controls (Count/Timer) and the
// session enforces its own invariants — Settings only translates.
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

  const handleCountChange = useCallback(
    ({ target }: InputEvent) => setCount(parseInt(target.value)),
    [setCount]
  );

  const handleTimerChange = useCallback(
    ({ target }: InputEvent) => setTimerSeconds(parseInt(target.value)),
    [setTimerSeconds]
  );

  return (
    <>
      <div className="flex justify-center mb-4 md:justify-start">
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      <div className="flex justify-center mb-4 ">
        <Timer onChange={handleTimerChange} />
      </div>
      <div className="flex justify-center mb-4 md:justify-end">
        <Count value={count} max={maxCount} onChange={handleCountChange} />
      </div>
    </>
  );
});
