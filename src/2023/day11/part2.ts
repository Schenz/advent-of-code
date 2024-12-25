// Advent of Code - Day 11 - Part Two

import { calculateDistance } from './calculateDistance';
import { fillUniverseWithEmptySpace } from './fillUniverseWithEmptySpace';

export const part2 = (input: string, rate: number): number => {
    const { universe, emptyRows, emptyCols } = fillUniverseWithEmptySpace(input);

    return calculateDistance(universe, emptyRows, emptyCols, rate - 1);
};
