// ms -> seconds

import React, { useCallback, Dispatch, SetStateAction, FC } from 'react';
import { Filter } from './Filter';
import { Timer } from './Timer';
import { Count } from './Count';
import { NoteSetFilter } from '../../utils/noteHelpers';

// returns floored integer (to strip trailing digit ms)
const formatDelay = (timerDelay: number | null): number => {
  return timerDelay === null ? 0 : Math.floor(timerDelay / 1000);
};

// seconds -> ms | null
const parseDelay = (timerDelay: number | string): number | null => {
  const num = parseInt(timerDelay as string, 10);
  const shouldReset = !Number.isFinite(num) || num <= 0;
  return shouldReset ? null : num * 1000;
};

export const Settings: FC<{
  filter: NoteSetFilter;
  count: number;
  timerDelay: number | null;
  setTimerDelay: Dispatch<SetStateAction<number | null>>;
  setCount: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<NoteSetFilter>>;
  changeNotes: (overrides?: { filter?: number; count?: number }) => void;
}> = ({ filter, count, timerDelay, setTimerDelay, setCount, setFilter, changeNotes }) => {
  const handleDelayChange = useCallback(
    ({ target }) => {
      setTimerDelay(parseDelay(target.value));
    },
    [setTimerDelay]
  );

  const handleCountChange = useCallback(
    ({ target }) => {
      const count = target.value;
      setCount(count);
      changeNotes({ count });
    },
    [setCount, changeNotes]
  );

  const handleFilterChange = useCallback(
    ({ target }) => {
      const filter = target.value;
      setFilter(filter);
      changeNotes({ filter });
    },
    [setFilter, changeNotes]
  );

  return (
    <>
      <div className="flex justify-center mb-4 md:justify-start">
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      <div className="flex justify-center mb-4 ">
        <Timer value={formatDelay(timerDelay)} onChange={handleDelayChange} />
      </div>
      <div className="flex justify-center mb-4 md:justify-end">
        <Count value={count} onChange={handleCountChange} />
      </div>
    </>
  );
};
