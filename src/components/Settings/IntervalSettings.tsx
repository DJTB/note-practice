import { FC } from 'react';

import type { IntervalName } from '../../interval';

import { IntervalSubset } from './IntervalSubset';
import { Timer } from './Timer';

// The interval-mode settings row: the interval-subset selector and the shared
// Timer. No Count in this mode. Parallel to the note-practice Settings.
export const IntervalSettings: FC<{
  enabledIntervalNames: IntervalName[];
  toggleInterval: (name: IntervalName) => void;
  setTimerSeconds: (seconds: number | null) => void;
}> = ({ enabledIntervalNames, toggleInterval, setTimerSeconds }) => (
  <div className="flex flex-col items-center gap-4 px-4 pt-4 md:flex-row md:justify-between">
    <IntervalSubset enabled={enabledIntervalNames} toggle={toggleInterval} />
    <Timer onValue={setTimerSeconds} />
  </div>
);
