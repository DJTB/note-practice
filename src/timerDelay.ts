// seconds -> interval delay in ms, or null to pause. Zero, negative, or
// non-numeric input all pause the timer. Shared by every practice session.
export const secondsToDelay = (seconds: number | null): number | null => {
  if (seconds === null || !Number.isFinite(seconds) || seconds <= 0) return null;
  return seconds * 1000;
};
