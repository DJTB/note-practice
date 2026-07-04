import { FC, ReactNode } from 'react';

import { useIntervalSession } from '../useIntervalSession';
import { IntervalChallenge } from './IntervalChallenge';
import { IntervalSettings } from './Settings/IntervalSettings';
import { Shell } from './Shell';

// Interval practice, hosted in the shared Shell. Mounted only while active, so
// its session (and auto-advance timer) exists only then.
export const IntervalPractice: FC<{ header: ReactNode }> = ({ header }) => {
  const session = useIntervalSession();

  return (
    <Shell
      header={header}
      onAdvance={session.advance}
      hint={session.revealed ? 'Tap for the next challenge' : 'Tap to reveal the answer'}
      settings={
        <IntervalSettings
          enabledIntervalNames={session.enabledIntervalNames}
          toggleInterval={session.toggleInterval}
          setTimerSeconds={session.setTimerSeconds}
        />
      }
    >
      <IntervalChallenge
        challenge={session.challenge}
        revealed={session.revealed}
        answer={session.answer}
        simplified={session.simplified}
      />
    </Shell>
  );
};
