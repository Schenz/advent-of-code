// Advent of Code - Day 4 - Part One

import { parseGrid, countNeighborsMatching } from '../../utils/grid';

export const part1 = (input: string[]): number => {
    const grid = parseGrid(input);

    if (grid.length === 0) {
        return 0;
    }

    // Count accessible rolls using functional approach
    return grid.reduce((count, row, y) => {
        return (
            count +
            row.filter((cell, x) => {
                // Only check positions that have a paper roll
                if (cell !== '@') {
                    return false;
                }

                // Count adjacent paper rolls and check if accessible
                const adjacentRolls = countNeighborsMatching(grid, x, y, (c) => c === '@', true);

                return adjacentRolls < 4;
            }).length
        );
    }, 0);
};
