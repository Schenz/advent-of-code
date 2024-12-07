// Advent of Code - Day 7 - Part One

import { isPossibleCombination } from './utils';

export const part1 = (input: string[]): number => input.reduce((totalSum, line) => {
    const [answer, ...numbers] = line.split(/[: ]+/).map(Number);
    if (isPossibleCombination(answer, numbers, ['+', '*'])) {
        return totalSum += answer;
    }
    return totalSum;
}, 0);
