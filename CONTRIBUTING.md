# Contributing

Thanks for your interest in contributing to React Hook Directory! This document explains how to file issues, propose changes, and submit hooks, examples, and docs.

## Quick start

1. Fork the repository and create a branch from `main`:

   - Branch name examples: `fix/<short-description>`, `feat/<short-description>`, `docs/<topic>`

2. Install dependencies:

```bash
npm install
```

3. (Optional but recommended) Generate compiled JS snippets used by the docs before running the dev server:

```bash
# install esbuild if you haven't already
npm install --save-dev esbuild

# compile TypeScript hooks -> public/compiledHooks.json
npm run build:snippets
```

4. Start the dev server:

```bash
npm run dev
```

If you plan to iterate on hooks frequently, run the snippet watcher in parallel:

```bash
npm run watch:snippets
npm run dev
```

## Filing issues

- Search existing issues before opening a new one.
- Use a descriptive title and include steps to reproduce, expected behavior, and environment (Node/Vite/OS) when applicable.
- Tag the issue: `bug`, `enhancement`, `docs`, or `question`.

## Pull request guidelines

- Keep changes small and focused (one hook or one logical change per PR).
- Use the provided branch naming conventions.
- Include tests when applicable (behavioral tests for hooks are encouraged).
- Add or update documentation in `src/docs` or the hook's top-level comment.
- If your PR changes the public API of a hook, update the `README.md` and any examples.

## Coding conventions

- Hooks are written in TypeScript. Follow the existing project style.
- Prefer small single-file hooks. Keep code readable and well-documented with a short top-level comment explaining motivation and edge cases.
- Use `useRef` for stable callbacks where appropriate and guard DOM/window access for SSR safety.
- Keep dependencies minimal and avoid introducing heavy runtime dependencies.

## Tests and validation

- Run the test suite (if present) and linters before opening PRs. Example commands:

```bash
npm run lint
npm run test
```

- If you are adding a hook, include at least one unit test that validates its main behavior or logic paths.

## How to add a new hook

1. Add a new file under `src/hooks` named `useYourHook.ts` (or `.tsx` if it contains JSX).
2. Keep the file self-contained and export the hook as the default export.
3. Add a short JSDoc/top comment describing purpose, arguments, returns, and edge cases.
4. Update `src/docs/hooksIndex.ts` to add an entry with metadata and a `?raw` import for the source. Follow the pattern used by other hooks.
5. Run `npm run build:snippets` so the docs show a clean JS tab for the new hook.

## Docs and examples

- The docs UI (`src/docs/HookDocs.tsx`) reads `public/compiledHooks.json` to show the JS version of hooks. For the JS tab to be clean, run `npm run build:snippets` before opening the docs.
- Keep examples small and focused — add them under `src/examples` when needed.

## Commit message style

- Use clear, imperative messages. Examples:
  - `fix(use-foo): handle null input`
  - `feat(use-bar): add onComplete callback`
  - `docs: update hooking docs for use-baz`

## Review and merging

- Maintainers will review PRs and may request changes. Address feedback in the same branch.
- After approval, a maintainer will merge. If your change is significant, the maintainer may squash commits.

## Security

- Don’t include secrets or tokens in PRs. If your change requires credentials for CI or publishing, open an issue so a maintainer can coordinate secure access.

## License

This repository is licensed under the MIT license. By contributing you agree to license your contributions under the project's license.

---

If you have any questions about the contribution process, open an issue and tag it `question` — maintainers will help. Thanks for helping improve React Hook Directory!
