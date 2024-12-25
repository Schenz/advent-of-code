// Advent of Code - Day 25 - Part One

import { fromText, get, points, Grid, splitIntoGroups } from './grid';

export const part1 = (input: string[]): number => {
    const grids = splitIntoGroups(input).map(fromText);

    const { locks, keys } = grids.reduce(
        (acc, grid) => {
            const topLeft = get(grid, { x: 0, y: 0 });

            (topLeft === '#' ? acc.locks : acc.keys).push(grid);
            return acc;
        },
        { locks: [] as Grid[], keys: [] as Grid[] }
    );

    return locks.reduce(
        (matches, lock) =>
            matches +
            keys.filter((key) => points(lock).every((point) => get(lock, point) !== '#' || get(key, point) !== '#'))
                .length,
        0
    );
};
