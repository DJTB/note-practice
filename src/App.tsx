import { useCallback, useState } from 'react';

import { DEFAULT_NOTES_COUNT } from './consts';
import { DEFAULT_NOTES_FILTER, getNotes, NoteSetFilter } from './noteSets';
import { Notes } from './components/Notes';
import { Settings } from './components/Settings';
import { useInterval } from './useInterval';

const App = () => {
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

  useInterval(changeNotes, timerDelay);

  return (
    <div className="flex flex-col h-dvh bg-gray-900">
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
