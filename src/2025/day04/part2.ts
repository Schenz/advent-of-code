// Advent of Code - Day 4 - Part Two

import { parseGrid, countNeighborsMatching } from '../../utils/grid';

export const part2 = (input: string[]): number => {
    const grid = parseGrid(input);

    if (grid.length === 0) {
        return 0;
    }

    let totalRemoved = 0;
    let removedInPass = true;

    // Keep removing accessible rolls until no more can be removed
    while (removedInPass) {
        // Find all rolls that can be accessed (fewer than 4 adjacent rolls)
        const toRemove = grid.flatMap((row, y) =>
            row
                .map((cell, x) => ({ cell, x, y }))
                .filter(({ cell, x, y }) => {
                    if (cell !== '@') {
                        return false;
                    }

                    const adjacentRolls = countNeighborsMatching(grid, x, y, (c) => c === '@', true);

                    return adjacentRolls < 4;
                })
                .map(({ x, y }) => ({ x, y })),
        );

        // Remove all accessible rolls
        if (toRemove.length > 0) {
            totalRemoved += toRemove.length;
            toRemove.forEach(({ x, y }) => {
                grid[y][x] = '.';
            });
            removedInPass = true;
        } else {
            removedInPass = false;
        }
    }

    return totalRemoved;
};
