// Advent of Code - Day 7 - Part Two

import { isPossibleCombination } from './utils';

export const part2 = (input: string[]): number =>
    input.reduce((totalSum, line) => {
        const [answer, ...numbers] = line.split(/[: ]+/).map(Number);

        if (isPossibleCombination(answer, numbers, ['+', '*', '||'])) {
            return (totalSum += answer);
        }
        return totalSum;
    }, 0);
