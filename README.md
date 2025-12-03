# Advent of Code Typescript Starter

A template for [Advent of Code](https://adventofcode.com) written in Typescript with Node.

## Usage

The project use [Node.js](https://nodejs.org) as javascript runtime, [esbuild](https://esbuild.github.io)
as typescript transpiler and [swc](https://swc.rs) with [Jest](https://jestjs.io) for testing.

    $ git clone https://github.com/ljgago/advent-of-code-typescript-starter aoc-typescript
    $ cd aoc-typescript

    # install dependencies
    $ yarn install

    # check syntax with eslint
    $ yarn lint day01

    # run tests for day01
    $ yarn test day01

    # run all tests for a specific year
    $ yarn test-all

    # run all tests for all years
    $ yarn test-all-years

    # run the day01
    $ yarn start day01

    # visualize day01 solution (run after implementing visualization)
    $ yarn visualize day01

## Generate

You can generate all necesary files for use in the event with a simple
command:

    $ yarn gen day01

This command generate these files:

    * creating src/{YEAR}/day01/resources/input.txt
    * creating src/{YEAR}/day01/index.ts
    * creating src/{YEAR}/day01/main.ts
    * creating src/{YEAR}/day01/part1.ts
    * creating src/{YEAR}/day01/part2.ts
    * creating src/{YEAR}/day01/visualize.ts
    * creating src/{YEAR}/day01/README.md
    * creating test/{YEAR}/day01.test.ts

- `/src/{YEAR}/day01/resources/input.txt`: the input data.
- `/src/{YEAR}/day01/index.ts`: export the modules for testing.
- `/src/{YEAR}/day01/main.ts`: the main module.
- `/src/{YEAR}/day01/part1.ts`: solution for part 1.
- `/src/{YEAR}/day01/part2.ts`: solution for part 2.
- `/src/{YEAR}/day01/visualize.ts`: visualization scaffold for the solution (customize with your visualization logic).
- `/src/{YEAR}/day01/README.md`: templated README with challenge description (can be updated with `yarn fetch-readme`).
- `/tests/{YEAR}/day01.test.ts`: the module where you write the tests.

### Fetching Puzzle Descriptions

After completing the puzzle on the Advent of Code website, you can fetch the full puzzle description
(including Part Two) and populate your README:

    $ yarn fetch-readme day01

This will fetch the puzzle from https://adventofcode.com/{YEAR}/day/{DAY} and convert the HTML to Markdown,
storing it in `/src/{YEAR}/day01/README.md`. You can also specify a different year:

    $ yarn fetch-readme day01 2024

## Config

You can configure the automatic input download from the Advent of Code
session token.

For dowload the inputs from web, you needs to set the environment var
`AOC_SESSION`. You can to get the session token from the cookie web browser.

Also can you set the `AOC_YEAR` to select a certain year.
(It is not mandatory use the `AOC_YEAR`, the `yarn gen` can get the year automatically)

You can set an `.env` file with these variables.

Folder structure:

    ├── src
    │   ├── 2022/
    │   ├── 2023/
    │   ├── 2024/
    │   ├── 2025/
    │   │   └── day01/
    │   │       ├── index.ts
    │   │       ├── main.ts
    │   │       ├── part1.ts
    │   │       ├── part2.ts
    │   │       ├── README.md
    │   │       └── resources/
    │   │           └── input.txt
    │   └── utils/
    │       ├── grid.ts
    │       ├── matrix.ts
    │       ├── region.ts
    │       └── dijkstra/
    └── test
        ├── 2022/
        ├── 2023/
        ├── 2024/
        └── 2025/
            └── day01.test.ts

Happy coding!

[MIT License](LICENSE)
