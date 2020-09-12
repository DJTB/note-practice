import React, { useCallback, Dispatch, SetStateAction, FC, memo } from 'react';

import { Filter } from './Filter';
import { Timer } from './Timer';
import { Count } from './Count';

import { NoteSetFilter } from '../../utils/noteHelpers';
import { NATURAL_NOTES_COUNT, MAX_NOTES_COUNT } from '../../consts';

// seconds -> ms | null
const parseDelay = (timerDelay: string): number | null => {
  const val = parseInt(timerDelay);
  const shouldReset = !Number.isFinite(val) || val <= 0;
  return shouldReset ? null : val * 1000;
};

export const Settings: FC<{
  filter: NoteSetFilter;
  count: number;
  setTimerDelay: Dispatch<SetStateAction<number | null>>;
  setCount: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<NoteSetFilter>>;
  changeNotes: (overrides?: { filter?: number; count?: number }) => void;
}> = memo(({ filter, count, setTimerDelay, setCount, setFilter, changeNotes }) => {
  const maxNoteCount = filter === 'naturals' ? NATURAL_NOTES_COUNT : MAX_NOTES_COUNT;

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
        <Timer onChange={handleDelayChange} />
      </div>
      <div className="flex justify-center mb-4 md:justify-end">
        <Count value={count} max={maxNoteCount} onChange={handleCountChange} />
      </div>
    </>
  );
});
