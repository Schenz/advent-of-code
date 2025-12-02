// Advent of Code - Day 2 - Part One

import { parseRanges, sumInvalidIds, isRepeatedPattern } from './utils';

const isInvalidId = (id: number): boolean => {
    const str = id.toString();
    // Invalid if the pattern is repeated exactly twice
    return isRepeatedPattern(str, 2);
};

export const part1 = (input: string[]): number => {
    const ranges = parseRanges(input);
    return sumInvalidIds(ranges, isInvalidId);
};
