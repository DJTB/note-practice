import { FC } from 'react';

import type { IntervalName } from '../../interval';

import { IntervalSubset } from './IntervalSubset';
import { Timer } from './Timer';

// The interval-mode settings row: the interval-subset selector and the shared
// Timer. No Count in this mode. On wide screens a 1fr | auto | 1fr grid keeps
// the subset centred while the Timer sits in its own right-hand column (so they
// can never overlap); on narrow screens they stack, centred. Vertical padding
// keeps nothing flush with the bottom edge.
export const IntervalSettings: FC<{
  enabledIntervalNames: IntervalName[];
  toggleInterval: (name: IntervalName) => void;
  setTimerSeconds: (seconds: number | null) => void;
}> = ({ enabledIntervalNames, toggleInterval, setTimerSeconds }) => (
  <div className="grid items-center justify-items-center gap-4 px-4 py-6 md:grid-cols-[1fr_auto_1fr] md:py-8">
    <div className="hidden md:block" />
    <IntervalSubset enabled={enabledIntervalNames} toggle={toggleInterval} />
    <div className="md:justify-self-end">
      <Timer onValue={setTimerSeconds} />
    </div>
  </div>
);
