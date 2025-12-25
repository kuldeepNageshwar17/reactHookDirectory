# @reactcraft/use-hooks

Small, well-typed React hooks implemented in TypeScript. This repo is both a tiny utility library and a teaching resource: clear implementations, explanatory comments, and an interactive docs UI.

Why this repo exists

- A compact set of practical hooks used in real apps (no heavy dependencies).
- Educational: code is written to show patterns and explain reasoning, not to be clever.
- Single-file hooks are tree-shakable and easy to import into other projects.

Repository overview

- `src/hooks/` — individual hook source files (one hook per file).
- `src/docs/` — the local documentation UI used while developing this repo.
- `public/` — static assets; `public/compiledHooks.json` may be generated to power the docs' JS view.
- `scripts/` — helper scripts (compile hooks to JS for docs, watch changes).

Quick setup (developer)

1. Install dependencies

```bash
npm install
```

2. (Recommended) Generate compiled JS snippets for the docs

```bash
# installs esbuild as a dev dependency
npm install --save-dev esbuild

# compile TypeScript hook files -> public/compiledHooks.json
npm run build:snippets
```

3. Start the docs app (Vite)

```bash
npm run dev
```

Developer workflow notes

- The docs UI (`src/docs/HookDocs.tsx`) prefers precompiled JavaScript snippets from `public/compiledHooks.json` so the JS tab is accurate and clean. If that file isn't present the docs fall back to showing the raw TypeScript source.
- For iterative development, run the snippet watcher and the dev server in parallel:

```bash
npm run watch:snippets   # regenerates compiled snippets when files under src/hooks change
npm run dev              # open the docs in the browser
```

Build and lint

- Type-check + build:

```bash
npm run build
```

- Lint the codebase:

```bash
npm run lint
```

Conventions and tips

- Keep each hook focused and well-documented. Add a short top-level comment explaining the motivation and any edge cases.
- Guard access to `window`/`document` for SSR safety.
- Use `useRef` to store the latest callback when wiring timers/listeners so re-subscriptions are minimized.

How to contribute

1. Open an issue describing the change or enhancement.
2. Create a small, focused branch and a PR. Keep PRs to one hook or one logical change.
3. Add tests for behavior when appropriate.

License

MIT

