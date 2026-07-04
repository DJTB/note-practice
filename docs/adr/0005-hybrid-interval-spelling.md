# Interval spelling is theory-correct in the domain, simplified only for display

Interval practice asks "what note is a given interval above a Root?". A
given pitch has several enharmonic names (F♯ = G♭), and the *correct* answer
depends on the interval's spelling: a tritone above C spelled as an augmented
4th is F♯, spelled as a diminished 5th it is G♭. Computing the answer by pitch
alone loses this — and iteratively re-spelling to "look nice" is where naive
implementations get intervals wrong.

**Decision:** split the two concerns.

- `transpose(note, interval)` is the **source of truth**. The answer letter is
  the Root letter advanced by the interval's `letterSteps`; the accidental
  offset is then whatever hits the target pitch class. This is theory-correct
  and may return **double accidentals** — the major 7th above G♯ is F𝄪, not G.
  The `Interval` registry encodes each interval as `(letterSteps, semitones)`,
  so the tritone is modelled as an augmented 4th (`letterSteps` 3) and spells
  F♯ from C, never G♭.
- `simplify(note)` is **for display only**. It maps any Note — including
  doubles — to its enharmonic-simplest name (0–1 accidental) via a fixed
  pitch-class → name table. It preserves pitch, never spelling.

This is the "hybrid spelling" design: keep the theory-correct note internally,
show the readable one. The ADR-0004 signed `offset` representation is what makes
the double-accidental range a one-line widening (`-1..+1` → `-2..+2`).

**Why not simplify eagerly (store only simplified notes)?** Then the domain
could no longer distinguish an augmented 4th from a diminished 5th, and interval
answers would be wrong for exactly the cases that make interval practice worth
doing. The double accidental is a feature of correctness, not a defect to be
normalised away.

**Note for future readers:** never route `transpose` output through `simplify`
before comparing or storing it — `simplify` is a render-leaf concern, the same
way `Note.format` is. Comparisons and further transposition use the
theory-correct value.
