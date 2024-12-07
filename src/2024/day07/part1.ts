// Advent of Code - Day 7 - Part One

import { isPossibleCombination } from './utils';

export const part1 = (input: string[]): number => {
    let totalSum = 0;

    for (const line of input) {
        const [answer, ...numbers] = line.split(/[: ]+/).map(Number);
        if (isPossibleCombination(answer, numbers, ['+', '*'])) {
            totalSum += answer;
        }
    }

    return totalSum;
};
