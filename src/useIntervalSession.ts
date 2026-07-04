import { useCallback, useMemo, useState } from 'react';

import { INTERVALS, simplify, transpose, type Interval, type IntervalName } from './interval';
import { flat, natural, sharp, type Note } from './note';
import { defaultRandom, type Random } from './random';
import { useAutoAdvanceTimer } from './useAutoAdvanceTimer';
import { useInterval } from './useInterval';

// A Challenge is what interval practice asks: an interval above a Root Note.
export type Challenge = {
  root: Note;
  interval: Interval;
};

// The single-accidental spelling(s) of each pitch class, in Root order. White
// keys have one natural spelling; black keys carry both names so a Root can be
// read either way (e.g. G♯ or A♭).
const ROOT_SPELLINGS: Note[][] = [
  [natural('C')],
  [sharp('C'), flat('D')],
  [natural('D')],
  [sharp('D'), flat('E')],
  [natural('E')],
  [natural('F')],
  [sharp('F'), flat('G')],
  [natural('G')],
  [sharp('G'), flat('A')],
  [natural('A')],
  [sharp('A'), flat('B')],
  [natural('B')],
];

// A single random choice from `arr`, drawn through the injected Random so the
// draw is deterministic under a seed (Random exposes only chance/shuffle).
const pick = <T>(rng: Random, arr: T[]): T => rng.shuffle(arr)[0];

// Draw a Root: pick one of the twelve pitch classes, then — for a black key —
// pick one of its two spellings. Both draws go through the Random.
const drawRoot = (rng: Random): Note => pick(rng, pick(rng, ROOT_SPELLINGS));

const drawChallenge = (rng: Random, intervals: Interval[]): Challenge => ({
  root: drawRoot(rng),
  interval: pick(rng, intervals),
});

export type IntervalSession = {
  challenge: Challenge;
  revealed: boolean;
  answer: Note; // theory-correct spelling (may be a double accidental)
  simplified: Note; // enharmonic-simplest name, for prominent display
  enabledIntervalNames: IntervalName[];
  toggleInterval: (name: IntervalName) => void;
  setTimerSeconds: (seconds: number | null) => void;
  advance: () => void;
};

// One DOM-free module owning the whole interval-practice session: the current
// Challenge, the two-phase reveal state, the enabled interval subset, and the
// auto-advance timer. Parallel to usePracticeSession. Randomness is injected and
// defaults to production, so the app call site stays argument-free.
export const useIntervalSession = (rng: Random = defaultRandom): IntervalSession => {
  const [enabled, setEnabled] = useState<Set<IntervalName>>(
    () => new Set(INTERVALS.map((i) => i.name))
  );
  const [challenge, setChallenge] = useState<Challenge>(() => drawChallenge(rng, [...INTERVALS]));
  const [revealed, setRevealed] = useState(false);
  const timer = useAutoAdvanceTimer();

  // Enabled intervals in registry order, both as objects (for drawing) and as
  // names (for the selector).
  const enabledObjects = useMemo(() => INTERVALS.filter((i) => enabled.has(i.name)), [enabled]);
  const enabledIntervalNames = useMemo(() => enabledObjects.map((i) => i.name), [enabledObjects]);

  const answer = useMemo(() => transpose(challenge.root, challenge.interval), [challenge]);
  const simplified = useMemo(() => simplify(answer), [answer]);

  // Two-phase machine: reveal the hidden answer, else draw the next Challenge.
  // Both a tap and a timer tick call this.
  const advance = useCallback(() => {
    if (revealed) {
      setChallenge(drawChallenge(rng, enabledObjects));
      setRevealed(false);
    } else {
      setRevealed(true);
    }
    timer.reset();
  }, [revealed, rng, enabledObjects, timer]);

  const toggleInterval = useCallback((name: IntervalName) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        // Keep at least one enabled — an empty subset has nothing to draw.
        if (next.size > 1) next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  useInterval(advance, timer.delay, timer.nonce);

  return {
    challenge,
    revealed,
    answer,
    simplified,
    enabledIntervalNames,
    toggleInterval,
    setTimerSeconds: timer.setTimerSeconds,
    advance,
  };
};
