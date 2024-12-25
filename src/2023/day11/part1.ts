// Advent of Code - Day 11 - Part One

import { calculateDistance } from './calculateDistance';
import { fillUniverseWithEmptySpace } from './fillUniverseWithEmptySpace';

export const part1 = (input: string): number => {
    const { universe, emptyRows, emptyCols } = fillUniverseWithEmptySpace(input);

    return calculateDistance(universe, emptyRows, emptyCols, 1);
};
