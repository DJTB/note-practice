import { FC, ReactNode } from 'react';

// The generic shell hosting whichever practice mode is active: the mode switch,
// the full-height tap area, the tap hint, and the settings bar. Both a tap and
// (inside each session) a timer tick drive the active session's advance(); the
// shell wires the tap. Mode-specific content and controls come in as slots.
export const Shell: FC<{
  header: ReactNode; // mode switch
  onAdvance: () => void;
  hint: string;
  settings: ReactNode;
  children: ReactNode; // tap-area content
}> = ({ header, onAdvance, hint, settings, children }) => (
  <div className="flex flex-col h-dvh bg-gray-900">
    <div className="flex justify-center p-2 bg-gray-800">{header}</div>
    <div className="flex-1 w-full max-w-6xl p-4 mx-auto select-none" onClick={onAdvance}>
      {children}
    </div>
    <div className="my-4 text-sm italic text-center text-gray-100 opacity-25">{hint}</div>
    <div className="bg-gray-300">{settings}</div>
  </div>
);
