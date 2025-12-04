// Advent of Code - Day 3 - Part Two

import { selectLargestSubsequence, digitsStringToBigInt } from './common';

export const part2 = (input: string[]): number => {
    const k = 12;

    const total = input.reduce((acc, line) => {
        if (!line) return acc;

        const s = selectLargestSubsequence(line, k);
        return acc + digitsStringToBigInt(s);
    }, 0n);

    return Number(total);
};
