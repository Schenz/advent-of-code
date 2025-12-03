// Advent of Code - Day 3 - Part One

import { selectLargestSubsequence, digitsStringToBigInt } from './common';

export const part1 = (input: string[]): number => {
    const total = input.reduce((acc, line) => {
        if (!line) return acc;

        const s = selectLargestSubsequence(line, 2);
        return acc + digitsStringToBigInt(s);
    }, 0n);

    return Number(total);

};
