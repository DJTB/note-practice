import React, { useCallback, useState } from 'react';
import { useInterval } from 'ahooks';

import './global.css';

import { Notes } from './components/Notes';
import { getRandomNoteSet, NoteSetFilter, NoteSetCount } from './utils/generateNotes';

const App = () => {
  const [count, setCount] = useState<NoteSetCount>(6);
  const [delay, setDelay] = useState<number | null>(null);
  const [filter, setFilter] = useState<NoteSetFilter>('any');
  const [notes, setNotes] = useState(getRandomNoteSet({ filter, count }));

  const changeNotes = useCallback(
    (overrides = {}) => setNotes(getRandomNoteSet({ filter, count, ...overrides })),
    [filter, count, setNotes]
  );

  const parseDelay = (delay: number) => (delay === 0 ? null : delay * 1000);

  const formatDelay = (delay: number | null) => {
    if (delay === null) {
      return 0;
    }
    // use floor to avoid decimal result due to 1ms addition in handleTap()
    return Math.floor(delay / 1000);
  };

  const changeDelay = useCallback(({ target }) => setDelay(parseDelay(target.value)), [setDelay]);

  const changeCount = useCallback(
    ({ target }) => {
      const count = target.value;
      setCount(count);
      changeNotes({ count });
    },
    [setCount, changeNotes]
  );

  const changeFilter = useCallback(
    ({ target }) => {
      const filter = target.value;
      setFilter(filter);
      changeNotes({ filter });
    },
    [setFilter, changeNotes]
  );

  const handleTap = useCallback(() => {
    if (delay) {
      // if the delay is the same we won't get a value change
      // we'll force interval to reset by adding 1ms
      setDelay(delay + 1);
    } else {
      changeNotes();
    }
  }, [changeNotes, delay]);

  useInterval(changeNotes, delay, { immediate: true });

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 w-full max-w-6xl p-4 mx-auto" onClick={handleTap}>
        <Notes notes={notes} />
      </div>
      <div className="pb-4 text-sm italic text-center text-gray-100 opacity-25">
        Tap screen to refresh notes
      </div>
      <div className="grid grid-rows-3 px-4 pt-4 bg-gray-700 md:grid-cols-3 md:grid-rows-1">
        <div className="flex justify-center mb-4 md:justify-start">
          <label className="mr-2 text-gray-400" htmlFor="note-filter">
            Notes:
          </label>
          <select
            className="px-1 rounded-sm"
            name="note-filter"
            value={filter}
            onChange={changeFilter}
          >
            <option value="any">Any</option>
            <option value="naturals">Naturals Only</option>
            <option value="sharps">Naturals + Sharps</option>
            <option value="flats">Naturals + Flats</option>
          </select>
        </div>
        <div className="flex justify-center mb-4 ">
          <label className="mr-2 text-gray-400" htmlFor="note-timer">
            Refresh Timer:
          </label>
          <input
            className="w-12 px-1 rounded-sm"
            name="note-timer"
            type="number"
            min={0}
            max={60}
            step={1}
            value={formatDelay(delay)}
            onChange={changeDelay}
          />
        </div>
        <div className="flex justify-center mb-4 md:justify-end">
          <label className="mr-2 text-gray-400" htmlFor="note-count">
            Count:
          </label>
          <input
            className="w-10 px-1 rounded-sm"
            name="note-count"
            type="number"
            min={1}
            max={12}
            value={count}
            onChange={changeCount}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
