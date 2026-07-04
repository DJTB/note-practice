# Note Practice

A drilling tool that shows random sets of musical notes to practise recall — a digital version of a physical flashcard resource.

## Language

**Note**:
A single letter A–G, optionally carrying an accidental and a quality. The atom the tool displays.
_Avoid_: card, symbol, token.

**Accidental**:
The sharp (♯) or flat (♭) raising or lowering a note. Sharp and flat are the same pitch under different names.
_Avoid_: modifier, sign.

**Quality**:
Whether a note is presented as major or minor (the `m` suffix). Independent of accidental.
_Avoid_: mod, type.

**Note Set**:
The ordered collection of Notes produced for one practice round. What the screen shows between taps.
_Avoid_: list, batch, group, deck.

**Filter**:
A named rule that decides which Note Set to generate — e.g. Any, Naturals, Fifths. The user picks one from the Display dropdown.
_Avoid_: mode, category, option, set type.

**Circle of Fifths**:
The sequence of notes each a fifth apart. One basis for a Filter.

**Inversion Group**:
A cluster of notes treated as related for inversion practice (e.g. C/F/G). One basis for a Filter.

**Interval**:
The distance between two Notes, named by its number and quality (e.g. major 3rd, tritone). Modelled as a letter-step count plus a semitone count, so its spelling is theory-correct. One of an ordered registry, parallel to Filter.
_Avoid_: gap, distance, step.

**Root**:
The Note an Interval is measured from — the question in interval practice; transposing it by an Interval gives the answer Note.
_Avoid_: start note, base, origin.

**Challenge**:
One interval-practice question: a Root plus an Interval. Shown as a prompt; tapping reveals its answer Note, tapping again draws the next. The interval-mode counterpart of a Note Set.
_Avoid_: question, card, problem.

**Practice mode**:
Which drill the app is running — note practice or interval practice — chosen from the top-level switch. Each mode has its own session; the shell hosts whichever is active.
_Avoid_: screen, tab, page, view.

**Offset**:
A Note's accidental as a signed semitone shift from its natural letter: 𝄫 −2, ♭ −1, ♮ 0, ♯ +1, 𝄪 +2. Note practice uses only −1..+1; interval answers may reach ±2.
_Avoid_: accidental value, shift amount.

**Pitch class**:
The 0–11 chromatic value a Note sounds (letter + offset, mod 12). Enharmonic Notes share a pitch class (A♯ and B♭ are both 10).
_Avoid_: pitch, semitone, tone.

**Transpose**:
Compute the theory-correct answer Note an Interval above a Root — the answer's letter is advanced by the Interval's letter-steps, its offset set to hit the semitone count. The domain's source of truth; may yield a double accidental.
_Avoid_: shift, move, add.

**Simplify**:
Re-spell any Note as its enharmonic-simplest name (0–1 accidental) for display. Never the source of truth — a render-leaf concern, like formatting. See ADR-0005.
_Avoid_: normalise, reduce, resolve.
