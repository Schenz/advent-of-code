// Advent of Code - Day 14 - Part One

import { Matrix } from '../../utils/matrix';

export const part1 = (input: string): number => {
    const grid = Matrix.parse(input);

    for (const y of grid.yRange) {
        for (const x of grid.xRange) {
            const c = grid.getItem([x, y]);

            if (c === 'O') {
                let y2 = y;

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

    return calcLoad(grid);
};

export const calcLoad = (grid: Matrix): number => {
    let load = 0;

    for (const [x, y] of grid.items()) {
        const c = grid.getItem([x, y]);

        if (c === 'O') {
            load += grid.height - y;
        }
    }
    return load;
};
