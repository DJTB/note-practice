import { useState } from 'react';

import { IntervalPractice } from './components/IntervalPractice';
import { ModeSwitch, type PracticeMode } from './components/ModeSwitch';
import { NotePractice } from './components/NotePractice';

const App = () => {
  const [mode, setMode] = useState<PracticeMode>('notes');
  const header = <ModeSwitch mode={mode} setMode={setMode} />;

  // Only the active mode is mounted, so exactly one session (and its timer)
  // ever runs — switching modes tears the other down rather than leaving it
  // ticking in the background.
  return mode === 'intervals' ? (
    <IntervalPractice header={header} />
  ) : (
    <NotePractice header={header} />
  );
};

export default App;
