// Advent of Code - Day 9 - Part Two

import { predictNextValue } from './predictNextValue';

export const part2 = (input: string[]): number => {
    return input.reduce((acc, line) => {
        const histories = line.split(/\s+/g).map((n) => parseInt(n));
        histories.reverse();
        return acc + predictNextValue(histories);
    }, 0);
};
