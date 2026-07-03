# Vite as the build tool, replacing Create React App

Create React App (`react-scripts`) was officially deprecated by the React team in February 2025 and is no longer maintained. We migrated the build, dev server, and Tailwind pipeline to **Vite**, and the test runner to **Vitest** (its native partner — one shared transform config). Next.js was rejected as over-scoped: this is a single-screen tap-to-refresh tool with no routing or SSR needs. A side benefit is that Vite's Tailwind v4 plugin lets us delete the custom `build:tailwind` / `watch:tailwind` / chokidar / npm-run-all scripts entirely.
