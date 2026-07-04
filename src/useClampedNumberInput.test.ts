import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useClampedNumberInput, type ResetTo } from './useClampedNumberInput';

// A minimal stand-in for the input event the handlers read.
const event = (value: string) => ({ target: { value } }) as React.ChangeEvent<HTMLInputElement>;

const setup = (
  overrides: Partial<{
    value: number;
    min: number;
    max: number;
    resetTo: ResetTo;
  }> = {}
) => {
  const onValue = vi.fn();
  const props = { value: 6, min: 1, max: 12, resetTo: 'last-valid' as ResetTo, onValue, ...overrides };
  const view = renderHook((p: typeof props) => useClampedNumberInput(p), { initialProps: props });
  return { onValue, ...view };
};

describe('useClampedNumberInput — display', () => {
  it('shows the initial value as a string', () => {
    const { result } = setup({ value: 6 });
    expect(result.current.value).toBe('6');
  });

  it('mirrors an external value change', () => {
    const { result, rerender } = setup({ value: 12 });
    expect(result.current.value).toBe('12');
    // e.g. a filter change clamps the session count down to 7
    rerender({ value: 7, min: 1, max: 7, resetTo: 'last-valid', onValue: vi.fn() });
    expect(result.current.value).toBe('7');
  });

  it('keeps a locally-typed value when the external value is static (timer-style)', () => {
    const { result, rerender } = setup({ value: 0, min: 0, max: 60, resetTo: 'min' });
    act(() => result.current.onChange(event('30')));
    expect(result.current.value).toBe('30');
    // A re-render that does not change the external value must not clobber the display.
    rerender({ value: 0, min: 0, max: 60, resetTo: 'min', onValue: vi.fn() });
    expect(result.current.value).toBe('30');
  });
});

describe('useClampedNumberInput — clamp on change', () => {
  it('clamps a value above the max and emits the clamped number', () => {
    const { result, onValue } = setup({ min: 1, max: 12 });
    act(() => result.current.onChange(event('99')));
    expect(result.current.value).toBe('12');
    expect(onValue).toHaveBeenLastCalledWith(12);
  });

  it('clamps a value below the min and emits the clamped number', () => {
    const { result, onValue } = setup({ min: 1, max: 12 });
    act(() => result.current.onChange(event('0')));
    expect(result.current.value).toBe('1');
    expect(onValue).toHaveBeenLastCalledWith(1);
  });

  it('passes an in-range value straight through', () => {
    const { result, onValue } = setup({ min: 1, max: 12 });
    act(() => result.current.onChange(event('5')));
    expect(result.current.value).toBe('5');
    expect(onValue).toHaveBeenLastCalledWith(5);
  });

  it('allows the field to be emptied without emitting a value (mobile stuck-0 fix)', () => {
    const { result, onValue } = setup({ min: 0, max: 60 });
    act(() => result.current.onChange(event('')));
    expect(result.current.value).toBe('');
    expect(onValue).not.toHaveBeenCalled();
  });
});

describe('useClampedNumberInput — resetTo on blur', () => {
  it("'last-valid' restores the previous valid value when cleared", () => {
    const { result, onValue } = setup({ value: 6, min: 1, max: 12, resetTo: 'last-valid' });
    act(() => result.current.onChange(event('9'))); // 9 becomes the last valid value
    act(() => result.current.onChange(event(''))); // cleared
    onValue.mockClear();
    act(() => result.current.onBlur(event('')));
    expect(result.current.value).toBe('9');
    expect(onValue).toHaveBeenLastCalledWith(9);
  });

  it("'min' resets to the minimum when cleared", () => {
    const { result, onValue } = setup({ value: 0, min: 0, max: 60, resetTo: 'min' });
    act(() => result.current.onChange(event('30')));
    act(() => result.current.onChange(event('')));
    onValue.mockClear();
    act(() => result.current.onBlur(event('')));
    expect(result.current.value).toBe('0');
    expect(onValue).toHaveBeenLastCalledWith(0);
  });

  it('leaves a valid value untouched on blur', () => {
    const { result } = setup({ value: 6, min: 1, max: 12, resetTo: 'last-valid' });
    act(() => result.current.onChange(event('8')));
    act(() => result.current.onBlur(event('8')));
    expect(result.current.value).toBe('8');
  });
});
