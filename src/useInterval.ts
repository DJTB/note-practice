import { useEffect, useRef } from 'react';

// Self-hosted interval (replaces react-use's useInterval). A null delay pauses.
// Changing `resetKey` restarts the interval without changing the delay, so a
// caller can reset the countdown (e.g. on a manual tap) as a hidden detail.
export const useInterval = (callback: () => void, delay: number | null, resetKey?: unknown) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay, resetKey]);
};
