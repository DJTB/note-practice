# Note colours are full literal Tailwind classes, never interpolated

Tailwind v3+ (and v4) scan source for complete class strings at build time; a dynamically-constructed class name like `` `text-${color}-400` `` is invisible to that scan and gets stripped from the output. Under the old Tailwind v1 setup the committed stylesheet was the *unpurged* full build, so interpolated classes happened to work — that safety net is gone.

**Decision:** `NOTE_COLORS` maps each note letter to a **full literal class string** (`'text-blue-400'`), not a colour fragment. No Tailwind class name is ever built by string interpolation anywhere in the app.

**Note for future readers:** this looks repetitive and someone will be tempted to DRY it back into `` `text-${color}-400` `` — **don't**. That silently removes every note colour from the production build. If the map must shrink, use a Tailwind safelist explicitly; do not interpolate.
