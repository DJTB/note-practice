# No component library — native inputs styled with Tailwind

We removed `@material-ui/core` rather than upgrading it to v5+. The app used MUI for exactly three controls — a `<select>` (Filter) and two number inputs (Count, Timer) — while Tailwind already did all real styling. Keeping MUI would have added the emotion runtime and MUI peer dependencies to render three form controls, and left two styling systems coexisting awkwardly.

**Decision:** three controls are now native `<select>` / `<input type="number">` styled with Tailwind (the previously-unused `Label.tsx` is now wired up). One styling system, no emotion, a large dependency gone.

**Note for future readers:** this is deliberate — do not reach for MUI/Chakra/Radix to "fix" the plain inputs. Revisit only if the UI grows enough controls that a component library earns its weight.
