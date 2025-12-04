# PR Review Guidelines (Human + AI)

Purpose: make reviews consistent and safe when humans or agents perform changes.

1) Basic acceptance criteria
- Tests: all relevant tests for the changed day(s) must pass locally and in CI.
- Exports: `src/{YEAR}/dayNN/index.ts` must only re-export `part1`/`part2` unless intentionally changed.
- Inputs: `resources/input.txt` should only be updated for real-data corrections and called out in the PR.

2) How to run checks (examples)
- Install deps: `yarn install`
- Run a day's tests: `yarn test day02` or `npm run test -- day02`
- Run year tests: `yarn test-all` (runs tests for the current year)
- Generate scaffold: `yarn gen day05`

3) AI / Agent policy
- The agent may run read-only commands and non-destructive tests without explicit permission.
- The agent must obtain explicit permission before creating commits, pushing branches, or opening PRs.
- When asking an agent to act, always specify the target day in the prompt (format: `dayNN`) to avoid ambiguity.

4) What reviewers should check
- Correctness: unit tests and real-data assertions pass.
- Style: follow existing code patterns and `utils/` for shared helpers.
- Performance: avoid adding heavy dependencies without justification.
- Commit scope: commits should be minimal and well-described.

5) Troubleshooting pointers
- If tests fail due to environment: confirm Node version (`node -v`) and rerun `yarn install`.
- If CI uses secrets (e.g. `AOC_SESSION`), ensure they are set in repository settings and not committed.

6) Escalation
- If you are unsure about an AI-suggested change, request a human reviewer or revert and open a discussion.

--
These guidelines are intentionally concise — expand them if your team needs more detailed policies.
