// Advent of Code - Day 19 - Part Two

import { countPossibleWays } from './countPossibleWays';
import { parseInput } from './parseInput';

export const part2 = (input: string[]): number => {
    const inputData = parseInput(input);

    return inputData.designs.reduce(
        (sum, design) => sum + countPossibleWays(design, inputData.possibleTowels, new Map()),
        0
    );
};
