import React, { useCallback, useState } from 'react';
import { useInterval } from 'ahooks';

import './global.css';

import { DEFAULT_COUNT, DEFAULT_FILTER } from './consts';
import { Notes } from './components/Notes';
import { Filter } from './components/Filter';
import { Timer } from './components/Timer';
import { Count } from './components/Count';

import { getShuffledNoteSet, NoteSetFilter } from './utils/noteHelpers';

const App = () => {
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [filter, setFilter] = useState<NoteSetFilter>(DEFAULT_FILTER);
  const [notes, setNotes] = useState(getShuffledNoteSet({ filter, count }));

  // null pauses timer
  const [timerDelay, setTimerDelay] = useState<number | null>(null);

  const changeNotes = useCallback(
    (overrides = {}) => setNotes(getShuffledNoteSet({ filter, count, ...overrides })),
    [filter, count, setNotes]
  );

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

  const handleTap = useCallback(() => {
    if (timerDelay !== null) {
      // force interval to reset by adding 1ms in case value was the same
      setTimerDelay(timerDelay + 1);
    } else {
      changeNotes();
    }
  }, [changeNotes, timerDelay, setTimerDelay]);

  useInterval(changeNotes, timerDelay, { immediate: true });

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 w-full max-w-6xl p-4 mx-auto select-none" onClick={handleTap}>
        <Notes notes={notes} />
      </div>
      <div className="my-4 text-sm italic text-center text-gray-100 opacity-25">
        Tap screen to refresh notes
      </div>
      <div className="grid grid-rows-3 px-4 pt-4 bg-gray-700 md:grid-cols-3 md:grid-rows-1">
        <div className="flex justify-center mb-4 md:justify-start">
          <Filter value={filter} onChange={handleFilterChange} />
        </div>
        <div className="flex justify-center mb-4 ">
          <Timer value={formatDelay(timerDelay)} onChange={handleDelayChange} />
        </div>
        <div className="flex justify-center mb-4 md:justify-end">
          <Count value={count} onChange={handleCountChange} />
        </div>
      </div>
    </div>
  );
};

// ms -> seconds
// returns floored integer(to strip trailing digit ms)
const formatDelay = (timerDelay: number | null): number => {
  return timerDelay === null ? 0 : Math.floor(timerDelay / 1000);
};

// seconds -> ms | null
const parseDelay = (timerDelay: number | string): number | null => {
  const num = parseInt(timerDelay as string, 10);
  return num === 0 ? null : num * 1000;
};

export default App;
