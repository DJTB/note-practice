import { useCallback, useState } from 'react';

import { secondsToDelay } from './timerDelay';

export type AutoAdvanceTimer = {
  delay: number | null; // ms between ticks, or null to pause
  nonce: number; // bump to restart the interval
  setTimerSeconds: (seconds: number | null) => void;
  reset: () => void;
};

// The auto-advance timer shared by every practice session: a delay (ms, or null
// to pause) plus a nonce that restarts the interval on demand — the hidden
// reset-on-advance. Pair it with `useInterval(advance, delay, nonce)` at the
// call site and call `reset()` whenever `advance` runs, so a manual tap starts
// the countdown over.
export const useAutoAdvanceTimer = (): AutoAdvanceTimer => {
  const [delay, setDelay] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);

  const setTimerSeconds = useCallback(
    (seconds: number | null) => setDelay(secondsToDelay(seconds)),
    []
  );
  const reset = useCallback(() => setNonce((n) => n + 1), []);

  return { delay, nonce, setTimerSeconds, reset };
};
