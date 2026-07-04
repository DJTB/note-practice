import { FC } from 'react';

// The practice modes. Application state; adding a third mode means an entry
// here, its own `*Practice` component (session + view), and a branch in App.
export type PracticeMode = 'notes' | 'intervals';

const MODES: { value: PracticeMode; label: string }[] = [
  { value: 'notes', label: 'Notes' },
  { value: 'intervals', label: 'Intervals' },
];

export const ModeSwitch: FC<{
  mode: PracticeMode;
  setMode: (mode: PracticeMode) => void;
}> = ({ mode, setMode }) => (
  <div className="inline-flex overflow-hidden border border-gray-400 rounded" role="group">
    {MODES.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        aria-pressed={mode === value}
        onClick={() => setMode(value)}
        className={`px-3 py-1 ${
          mode === value ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);
