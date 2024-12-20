// Advent of Code - Day 19 - Part One

import { countPossibleWays } from './countPossibleWays';
import { parseInput } from './parseInput';

export const part1 = (input: string[]): number => {
    const inputData = parseInput(input);

    return inputData.designs.reduce(
        (sum, design) => (countPossibleWays(design, inputData.possibleTowels, new Map()) ? sum + 1 : sum),
        0
    );
};
