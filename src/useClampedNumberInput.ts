import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from 'react';

// How the control recovers when the field is left empty/invalid on blur:
// 'last-valid' restores the previous valid value (Count); 'min' resets to the
// minimum (Timer, so a stuck value can always be cleared back to paused).
export type ResetTo = 'last-valid' | 'min';

type InputEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

type Options = {
  // The controlled value — the domain's source of truth for this input.
  value: number;
  min: number;
  max: number;
  onValue: (value: number) => void;
  resetTo: ResetTo;
};

const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

// One home for clamped numeric input: parse, clamp to [min, max], the display
// string that lets the field go transiently empty while editing (the mobile
// stuck-`0` workaround), and the blur-reset strategy. Emits only valid, clamped
// numbers through `onValue`; the display mirrors the external `value` so a change
// elsewhere (e.g. a filter lowering the count) is reflected here.
export const useClampedNumberInput = ({ value, min, max, onValue, resetTo }: Options) => {
  const [display, setDisplay] = useState(String(value));
  const lastValid = useRef(String(value));

  useEffect(() => {
    setDisplay(String(value));
    lastValid.current = String(value);
  }, [value]);

  // Clamp, display, remember, and emit — the shared path for every valid number.
  const commit = useCallback(
    (num: number) => {
      const clamped = clamp(num, min, max);
      setDisplay(String(clamped));
      lastValid.current = String(clamped);
      onValue(clamped);
    },
    [min, max, onValue]
  );

  const onChange = useCallback(
    ({ target }: InputEvent) => {
      const num = parseInt(target.value);
      // Empty or non-numeric: keep the raw text so the field can be edited, but
      // push nothing to the domain until it is valid again.
      if (!Number.isFinite(num)) {
        setDisplay(target.value);
        return;
      }
      commit(num);
    },
    [commit]
  );

  const onBlur = useCallback(
    ({ target }: InputEvent) => {
      const num = parseInt(target.value);
      // Empty/invalid on blur recovers per strategy; otherwise commit as typed.
      commit(Number.isFinite(num) ? num : resetTo === 'min' ? min : parseInt(lastValid.current));
    },
    [commit, min, resetTo]
  );

  return { value: display, onChange, onBlur };
};
