# Note accidental is a signed semitone offset, not a sharp/flat string

A Note carries its accidental as `offset: -1 | 0 | 1` (♭ = -1, ♮ = 0, ♯ = +1) rather than a `'sharp' | 'flat' | 'natural'` string. Note practice only ever uses these three values, so a string union would model the domain just as faithfully today.

**Decision:** represent the accidental as a signed numeric offset. The `natural` / `sharp` / `flat` constructors map to `0` / `+1` / `-1`; `format` turns the offset back into a glyph via a single lookup.

**Why:** a planned later feature — interval practice (#30/#31) — needs double accidentals (𝄫/𝄪) and arithmetic (`pitchClass`, `transpose`, `simplify`). With the offset already in place, that is a one-line widening of the range from `-1..+1` to `-2..+2`, not a representation migration touching every note constructor and consumer. This is a deliberate, zero-cost prefactor.

**Note for future readers:** do **not** add ±2 support or interval logic to satisfy this ADR alone — the range stays `-1..+1` until interval practice actually lands. This records only *why* the representation is numeric.
