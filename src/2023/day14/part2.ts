// Advent of Code - Day 14 - Part Two

import { Matrix } from '../../utils/matrix';
import { calc_load } from './part1';

export const part2 = (input: string): number => {
    const grid = Matrix.parse(input);
    const CYCLES = 1000000000;
    const seen: { [key: string]: number } = { [grid.asStr('')]: 0 };

    let cycle = 0;

    // run the cycles until you see dup pattern then time jump
    while (cycle < CYCLES) {
        cycle += 1;
        run_cycle(grid);
        const key = grid.asStr('');

        if (key in seen) {
            const delta = cycle - seen[key];
            const rem = CYCLES - cycle;
            const time_skip = Math.floor(rem / delta) * delta;

            cycle += time_skip;
            break;
        }

        seen[key] = cycle;
    }

    // finish the cycles after time jump
    while (cycle < CYCLES) {
        cycle += 1;
        run_cycle(grid);
    }

    return calc_load(grid);
};

// TODO: refactor to make it less brute force
const run_cycle = (grid: Matrix): void => {
    // North
    for (const y of grid.yRange) {
        for (const x of grid.xRange) {
            const c: string = grid.getItem([x, y]);

            if (c === 'O') {
                let y2: number = y;

                while (y2 > 0) {
                    if (grid.getItem([x, y2 - 1]) === '.') {
                        y2 -= 1;
                    } else {
                        break;
                    }
                }
                grid.setItem([x, y], '.');
                grid.setItem([x, y2], 'O');
            }
        }
    }

    // West
    for (const y of grid.yRange) {
        for (const x of grid.xRange) {
            const c: string = grid.getItem([x, y]);

            if (c === 'O') {
                let x2: number = x;

                while (x2 > 0) {
                    if (grid.getItem([x2 - 1, y]) === '.') {
                        x2 -= 1;
                    } else {
                        break;
                    }
                }
                grid.setItem([x, y], '.');
                grid.setItem([x2, y], 'O');
            }
        }
    }

    // South
    for (const y of grid.yRange.slice().reverse()) {
        for (const x of grid.xRange) {
            const c: string = grid.getItem([x, y]);

            if (c === 'O') {
                let y2: number = y;

                while (y2 < grid.height - 1) {
                    if (grid.getItem([x, y2 + 1]) === '.') {
                        y2 += 1;
                    } else {
                        break;
                    }
                }
                grid.setItem([x, y], '.');
                grid.setItem([x, y2], 'O');
            }
        }
    }

    // East
    for (const y of grid.yRange) {
        for (const x of grid.xRange.slice().reverse()) {
            const c: string = grid.getItem([x, y]);

            if (c === 'O') {
                let x2: number = x;

                while (x2 < grid.width - 1) {
                    if (grid.getItem([x2 + 1, y]) === '.') {
                        x2 += 1;
                    } else {
                        break;
                    }
                }
                grid.setItem([x, y], '.');
                grid.setItem([x2, y], 'O');
            }
        }
    }
};
