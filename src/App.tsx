import React, { useCallback, useState, useEffect } from 'react';
import { useWindowSize, useInterval } from 'react-use';

import { DEFAULT_NOTES_COUNT, DEFAULT_NOTES_FILTER, NATURAL_NOTES_COUNT } from './consts';
import { Notes } from './components/Notes';
import { Settings } from './components/Settings';

import { getNotes, NoteSetFilter } from './utils/noteHelpers';

const App = () => {
  const windowSize = useWindowSize();
  const [count, setCount] = useState(DEFAULT_NOTES_COUNT);
  const [filter, setFilter] = useState<NoteSetFilter>(DEFAULT_NOTES_FILTER);
  const [notes, setNotes] = useState(getNotes({ filter, count }));

  // null pauses timer
  const [timerDelay, setTimerDelay] = useState<number | null>(null);

  const changeNotes = useCallback(
    (overrides = {}) => setNotes(getNotes({ filter, count, ...overrides })),
    [filter, count, setNotes]
  );

  const handleTap = useCallback(() => {
    if (timerDelay !== null) {
      // force interval to reset by adding 1ms in case value was the same
      setTimerDelay(timerDelay + 1);
    }
    changeNotes();
  }, [changeNotes, timerDelay, setTimerDelay]);

  // reduce count if filter returns less notes
  useEffect(() => {
    if (filter === 'naturals' && count > NATURAL_NOTES_COUNT) {
      setCount(NATURAL_NOTES_COUNT);
    }
  }, [filter, count]);

  useInterval(changeNotes, timerDelay);

  return (
    <div className="flex flex-col bg-gray-900" style={{ height: windowSize.height }}>
      <div className="flex-1 w-full max-w-6xl p-4 mx-auto select-none" onClick={handleTap}>
        <Notes notes={notes} />
      </div>
      <div className="my-4 text-sm italic text-center text-gray-100 opacity-25">
        Tap screen to refresh notes
      </div>
      <div className="grid grid-rows-3 px-4 pt-4 bg-gray-300 md:grid-cols-3 md:grid-rows-1">
        <Settings
          count={count}
          filter={filter}
          setFilter={setFilter}
          setTimerDelay={setTimerDelay}
          setCount={setCount}
          changeNotes={changeNotes}
        />
      </div>
    </div>
  );
};

export default App;
