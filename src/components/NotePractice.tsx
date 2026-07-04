import { FC, ReactNode } from 'react';

import { usePracticeSession } from '../usePracticeSession';
import { Notes } from './Notes';
import { Settings } from './Settings';
import { Shell } from './Shell';

// Note practice: the original drill, now hosted in the shared Shell. Mounted
// only while active, so its session (and auto-refresh timer) exists only then.
export const NotePractice: FC<{ header: ReactNode }> = ({ header }) => {
  const session = usePracticeSession();

  return (
    <Shell
      header={header}
      onAdvance={session.refresh}
      hint="Tap screen to refresh notes"
      settings={
        <div className="grid grid-rows-3 px-4 pt-4 md:grid-cols-3 md:grid-rows-1">
          <Settings
            filter={session.filter}
            setFilter={session.setFilter}
            count={session.count}
            maxCount={session.maxCount}
            setCount={session.setCount}
            setTimerSeconds={session.setTimerSeconds}
          />
        </div>
      }
    >
      <Notes notes={session.notes} />
    </Shell>
  );
};
