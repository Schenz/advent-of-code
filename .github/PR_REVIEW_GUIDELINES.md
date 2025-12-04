# PR Review Guidelines (Human + AI)

Purpose: make reviews consistent and safe when humans or agents perform changes.

1. Basic acceptance criteria

- Tests: all relevant tests for the changed day(s) must pass locally. If CI is present it should run only the targeted day tests (not the whole repo).
- Exports: `src/{YEAR}/dayNN/index.ts` must only re-export `part1`/`part2` unless intentionally changed.
- Inputs: `resources/input.txt` should only be updated for real-data corrections and called out in the PR.

2. How to run checks (examples)

- Install deps: `yarn install`
- Run a day's tests: `yarn test day02` or `npm run test -- day02`
- Run year tests: `yarn test-all` (runs tests for the current year)
- Generate scaffold: `yarn gen day05`

Note: there is no CI configured in this repository by default. Prefer a targeted CI workflow that runs tests only for the changed day(s) instead of running all tests.

3. AI / Agent policy

- The agent may run read-only commands and non-destructive tests without explicit permission.
- The agent must obtain explicit permission before creating commits, pushing branches, or opening PRs.
- When asking an agent to act, always specify the target day in the prompt (format: `dayNN`) to avoid ambiguity.

Optional: Targeted CI workflow (example)

Below is a minimal idea for a GitHub Actions workflow that runs tests only for the day(s) modified in a PR. I can add this file as `.github/workflows/targeted-tests.yml` if you want.

```yaml
name: Targeted Day Tests

on:
  pull_request:
    paths:
      - 'src/**/day**/**'
      - 'test/**/day**.test.ts'

jobs:
  targeted-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install
        run: yarn install --frozen-lockfile
      - name: Determine changed days
        run: |
          git fetch --no-tags --depth=1 origin ${{ github.event.pull_request.base.ref }}
          git diff --name-only origin/${{ github.event.pull_request.base.ref }}...${{ github.sha }} | grep -oE 'src/[0-9]{4}/day[0-9]{2}' | sort -u > days.txt || true
      - name: Run targeted tests
        run: |
          if [ -s days.txt ]; then
            while read d; do
              year=$(echo "$d" | cut -d'/' -f2)
              day=$(echo "$d" | cut -d'/' -f3)
              echo "Running tests for $year/$day"
              yarn test ${day}
            done < days.txt
          else
            echo "No day-specific changes detected; skipping targeted tests"
          fi
```

This workflow is intentionally small: it detects changed `src/{YEAR}/dayNN` folders and runs `yarn test dayNN` for each. It avoids running the entire test suite.

4. What reviewers should check

- Correctness: unit tests and real-data assertions pass.
- Style: follow existing code patterns and `utils/` for shared helpers.
- Performance: avoid adding heavy dependencies without justification.
- Commit scope: commits should be minimal and well-described.

5. Troubleshooting pointers

- If tests fail due to environment: confirm Node version (`node -v`) and rerun `yarn install`.
- If CI uses secrets (e.g. `AOC_SESSION`), ensure they are set in repository settings and not committed.

6. Escalation

- If you are unsure about an AI-suggested change, request a human reviewer or revert and open a discussion.

--
These guidelines are intentionally concise — expand them if your team needs more detailed policies.
