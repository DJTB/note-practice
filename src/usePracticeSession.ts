import { useCallback, useState } from 'react';

import { DEFAULT_NOTES_COUNT, MAX_NOTES_COUNT, NATURAL_NOTES_COUNT } from './consts';
import { DEFAULT_NOTES_FILTER, getNotes, type NoteSetFilter } from './noteSets';
import { defaultRandom, type Random } from './random';
import type { Note } from './note';
import { useInterval } from './useInterval';

// The maximum notes a filter can offer: naturals is a seven-note octave,
// every other filter is a full twelve.
const maxCountFor = (filter: NoteSetFilter): number =>
  filter === 'naturals' ? NATURAL_NOTES_COUNT : MAX_NOTES_COUNT;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// seconds -> interval delay in ms, or null to pause. Zero, negative, or
// non-numeric input all pause the timer.
const secondsToDelay = (seconds: number | null): number | null => {
  if (seconds === null || !Number.isFinite(seconds) || seconds <= 0) return null;
  return seconds * 1000;
};

export type PracticeSession = {
  notes: Note[];
  filter: NoteSetFilter;
  setFilter: (filter: NoteSetFilter) => void;
  count: number;
  setCount: (count: number) => void;
  maxCount: number;
  setTimerSeconds: (seconds: number | null) => void;
  refresh: () => void;
};

// One DOM-free module owning the whole practice session: the filter, count,
// current Note Set, and the auto-refresh timer with its reset-on-tap. It speaks
// domain types only (never DOM events) and holds the regenerate-on-change rule
// and the `count <= maxCount` invariant internally. Randomness is injected and
// defaults to production, so the app call site stays argument-free.
export const usePracticeSession = (rng: Random = defaultRandom): PracticeSession => {
  const [filter, setFilterState] = useState<NoteSetFilter>(DEFAULT_NOTES_FILTER);
  const [count, setCountState] = useState(DEFAULT_NOTES_COUNT);
  const [notes, setNotes] = useState<Note[]>(() =>
    getNotes({ filter: DEFAULT_NOTES_FILTER, count: DEFAULT_NOTES_COUNT }, rng)
  );
  // null pauses the timer; a positive number is the auto-refresh delay in ms.
  const [timerDelay, setTimerDelay] = useState<number | null>(null);
  // Bumped on every refresh to restart the interval — the hidden reset-on-tap.
  const [timerNonce, setTimerNonce] = useState(0);

  const maxCount = maxCountFor(filter);

  // The regenerate-on-change rule in one place: any filter/count change draws a
  // fresh Note Set for that pair.
  const regenerate = useCallback(
    (nextFilter: NoteSetFilter, nextCount: number) => {
      setNotes(getNotes({ filter: nextFilter, count: nextCount }, rng));
    },
    [rng]
  );

  const refresh = useCallback(() => {
    regenerate(filter, count);
    setTimerNonce((nonce) => nonce + 1);
  }, [filter, count, regenerate]);

  const setFilter = useCallback(
    (next: NoteSetFilter) => {
      const nextCount = clamp(count, 1, maxCountFor(next));
      setFilterState(next);
      setCountState(nextCount);
      regenerate(next, nextCount);
    },
    [count, regenerate]
  );

  const setCount = useCallback(
    (next: number) => {
      const nextCount = clamp(next, 1, maxCountFor(filter));
      setCountState(nextCount);
      regenerate(filter, nextCount);
    },
    [filter, regenerate]
  );

  const setTimerSeconds = useCallback((seconds: number | null) => {
    setTimerDelay(secondsToDelay(seconds));
  }, []);

  useInterval(refresh, timerDelay, timerNonce);

  return {
    notes,
    filter,
    setFilter,
    count,
    setCount,
    maxCount,
    setTimerSeconds,
    refresh,
  };
};
