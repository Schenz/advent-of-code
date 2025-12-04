# Copilot / AI Agent Instructions — Advent of Code (TypeScript)

This repository is a TypeScript Node project that stores Advent of Code solutions by year/day. The goal of an AI coding agent is to be immediately productive: run tests, add or modify solutions, generate new day scaffolding, and keep CI/test flows consistent.

Key structure (examples):

- `src/{YEAR}/dayNN/` — solution code per day. Common files: `index.ts` (re-exports), `main.ts`, `part1.ts`, `part2.ts`, `visualize.ts`, `README.md`, `resources/input.txt`.
- `test/{YEAR}/dayNN.test.ts` — Jest tests that import the day's `index.ts` and read `resources/input.txt` for 'real data' assertions.
- `scripts/` — bash helpers used by package scripts (`gen.sh`, `test.sh`, `test-all.sh`, `fetch-readme.sh`, `visualize.sh`, `lint.sh`). Many developer workflows call these wrappers.
- `scripts/templates/` — ejs templates used by `gen` to create day scaffolds.
- `utils/` — shared helpers (e.g., `grid.ts`, `matrix.ts`, `region.ts`, `dijkstra/`) — prefer reusing these rather than adding duplicates.

How tests and solutions are structured (explicit patterns to follow):

- `index.ts` should only re-export named exports: `export { part1 } from './part1'; export { part2 } from './part2';`.
- Tests import the day like: `import { part1, part2 } from '../../src/2025/day01';` and for real input they read `src/2025/day01/resources/input.txt` with `fs/promises.readFile`, `trim()` and split lines before calling `part1`/`part2`.
- Solution functions are generally pure and accept parsed input (often `string[]`); follow the existing signature patterns.

Developer workflows / commands (use these exact commands):

- Install: `yarn install` (project uses Yarn in README; package.json scripts work with `npm run <script>` as well).
- Run one day: `yarn start day01` or `npm run start -- day01` (calls `scripts/start.sh`).
- Run tests (single day via tests file): `yarn test day01` or `npm run test -- day01` (calls `scripts/test.sh`).
- Run all tests for a year: `yarn test-all` or `npm run test-all` (calls `scripts/test-all.sh`).
- Run all tests for all years: `yarn test-all-years` or `npm run test-all-years`.
- Generate scaffold for a day: `yarn gen day01` or `npm run gen -- day01` (uses `scripts/gen.sh` and templates in `scripts/templates/`).
- Fetch puzzle README: `yarn fetch-readme day01` (requires `AOC_SESSION` optionally set in `.env` or `example.env`).

Project specifics and conventions (do not assume defaults):

- Scripts are bash wrappers — edits to an npm script usually also require adjusting the corresponding `scripts/*.sh` file.
- Many README examples use `yarn` but `package.json` scripts are generic; tests rely on `jest` configured with `@swc/jest`/`ts-jest` in the devDeps.
- Input files live under `src/{YEAR}/dayNN/resources/input.txt`. Tests read those paths directly; do not move them without updating tests.
- New day generation will create `test/{YEAR}/dayNN.test.ts` with the canonical test pattern — follow that pattern when adding tests manually.

Common places to look when editing or debugging:

- `package.json` — exact script names and supported tasks.
- `scripts/` — shell wrappers that orchestrate test, gen and fetch operations.
- `scripts/templates/` — templates for generated files (index, main, part1, part2, tests, readme).
- `src/**/README.md` — per-day fetched puzzle descriptions.
- `utils/` — shared helpers and algos; prefer reuse.

Integration notes / dependencies:

- Node >= 18 required (see `package.json.engines`).
- Tests use Jest + SWC/ts-jest. Keep TypeScript features compatible with the configured toolchain.
- External libs in `dependencies` (priority queues, z3, heap-js) appear in solutions; do not remove without checking consumers in `src`.

When making changes:

- Keep `index.ts` re-exports minimal. Update tests only when changing exported API intentionally.
- Run `yarn test` locally before opening PR. For scaffolding or README fetches, run the corresponding `scripts/*` command.
- If adding helper functions, prefer `utils/` and update imports across days as needed.

Example: Test → Edit → Run cycle (concise)

1. Run the day's tests to see current failures:
    - `yarn test day01`
2. Inspect failing test and implementation:
    - Open `test/2025/day01.test.ts` and `src/2025/day01/part1.ts` (or `part2.ts`).
3. Reproduce locally by running the failing unit only (Jest):
    - `npm run test -- day01` (the scripts wrapper uses bash; this is equivalent to `yarn test day01`).
4. Make a minimal, pure change in `src/2025/day01/part1.ts` following existing signatures (accept `string[]`, return `number|string` as tests expect).
5. Re-run the focused test until it passes.
6. Run the real-data assertions in `test/2025/day01.test.ts` (they read `src/2025/day01/resources/input.txt`) to validate against the official input.
7. When green, run lint if appropriate: `yarn lint`.

Short checklist for creating a new day (copyable)

- Run: `yarn gen dayNN` → creates `src/{YEAR}/dayNN/*` and `test/{YEAR}/dayNN.test.ts`.
- Edit `src/{YEAR}/dayNN/part1.ts` and `part2.ts` implementing pure functions that accept parsed input (usually `string[]`).
- Ensure `src/{YEAR}/dayNN/index.ts` re-exports `part1`/`part2` only.
- Add/update `resources/input.txt` if you have local inputs.
- Run `yarn test dayNN` until tests pass (both example and real-data assertions).
- (Optional) Run `yarn fetch-readme dayNN` to populate the challenge README if you have `AOC_SESSION` configured.

When to prefer `utils/` helpers vs copying into a day

- Prefer `utils/` for general-purpose algorithms and data structures used by multiple days: `grid`, `matrix`, `region`, `dijkstra`, priority queues, etc.
- Keep per-day helpers in the day's folder when they are tightly coupled to the problem (one-off parsing shapes, problem-specific state machines).
- If two or more days share the same helper, move it to `utils/` and update imports across days.
- Avoid creating circular imports: `utils/` should not depend on `src/{YEAR}`.

Checklist template (copy this into a PR description)

```
- [ ] Generated day scaffolding with `yarn gen dayNN`.
- [ ] Implemented `part1` (pure function, signature matches tests).
- [ ] Implemented `part2` (pure function, signature matches tests).
- [ ] Added/verified `resources/input.txt` for real-data assertions.
- [ ] Ran `yarn test dayNN` and all tests pass.
- [ ] Ran linter: `yarn lint` (if changes affected style).
- [ ] Optional: `yarn fetch-readme dayNN` used to populate README.
```

Quick pointers / gotchas

- Tests read input files with relative path `src/{YEAR}/dayNN/resources/input.txt` — keep that exact path.
- `index.ts` should be a thin re-export only; tests rely on that pattern.
- Scripts in `scripts/` are bash wrappers; edit them instead of the package.json script when behavior must change.

If anything above is unclear or you want a worked example (I can implement a small fix and run `yarn test day01`), tell me which day to operate on and I will run the tests and report results.

Agent behavior / operational rules

- Targeted actions: Always operate on the explicit `dayNN` the user names. If no day is provided, ask for clarification before running tests or making edits.
- Read-only vs write actions: Agents may run read-only commands and non-destructive tests without explicit permission. Obtain explicit permission before creating commits, pushing branches, or opening PRs.
- Tests before change: Run the relevant day's tests locally (`yarn test dayNN`) and report results before making or committing changes.
- Minimal scope & safety: Make the smallest change needed. Never commit or expose secrets (e.g., `AOC_SESSION`) in repo files. Do not modify unrelated days.
- CI & workflow: Prefer targeted CI that runs only the affected day's tests, not full-repo test runs.
- External access: Do not fetch or publish external secrets or credentials. If web/API access is required, request permission and any necessary tokens first.
- Confirm destructive steps: For destructive or long-running actions (installing packages globally, rewriting history, pushing branches, deleting files), ask for explicit approval.
