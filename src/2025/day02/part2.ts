// Advent of Code - Day 2 - Part Two

import { parseRanges, sumInvalidIds, isRepeatedPattern } from './utils';

const isInvalidId = (id: number): boolean => {
    const str = id.toString();
    const len = str.length;

    // Try all possible repetition counts from 2 to len
    // The pattern must repeat at least twice
    for (let times = 2; times <= len; times++) {
        if (isRepeatedPattern(str, times)) {
            return true;
        }
    }

    return false;
};

export const part2 = (input: string[]): number => {
    const ranges = parseRanges(input);
    return sumInvalidIds(ranges, isInvalidId);
};
