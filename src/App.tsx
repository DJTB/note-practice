import { Notes } from './components/Notes';
import { Settings } from './components/Settings';
import { usePracticeSession } from './usePracticeSession';

const App = () => {
  const { notes, filter, setFilter, count, setCount, maxCount, setTimerSeconds, refresh } =
    usePracticeSession();

  return (
    <div className="flex flex-col h-dvh bg-gray-900">
      <div className="flex-1 w-full max-w-6xl p-4 mx-auto select-none" onClick={refresh}>
        <Notes notes={notes} />
      </div>
      <div className="my-4 text-sm italic text-center text-gray-100 opacity-25">
        Tap screen to refresh notes
      </div>
      <div className="grid grid-rows-3 px-4 pt-4 bg-gray-300 md:grid-cols-3 md:grid-rows-1">
        <Settings
          filter={filter}
          setFilter={setFilter}
          count={count}
          maxCount={maxCount}
          setCount={setCount}
          setTimerSeconds={setTimerSeconds}
        />
      </div>
    </div>
  );
};

export default App;
