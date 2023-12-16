// Advent of Code - Day 16 - Part Two

import { Matrix } from '../../utils/matrix';
import { energize } from './energize';

export const part2 = (input: string): number => {
    const grid = Matrix.parse(input);

    const startingPoints = [];

    for (const x in grid.xRange) {
        startingPoints.push([x, 0, 0, 1]);
        startingPoints.push([x, grid.height - 1, 0, -1]);
    }
    for (const y in grid.yRange) {
        startingPoints.push([0, y, 1, 0]);
        startingPoints.push([grid.width - 1, y, -1, 0]);
    }

    return Math.max(
        ...startingPoints.map(([x, y, dx, dy]) =>
            energize(grid, Number(x), Number(y), Number(dx), Number(dy))
        )
    );
};
