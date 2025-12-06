// Advent of Code - Day 5 - Part Two
// Count total number of ingredient IDs considered fresh by the ranges (union size).
import { normalizeLines, trimEdges, splitSections, parseIntervals, mergeIntervals, mergedUnionSize } from './utils';

export const part2 = (input: string[]): number => {
    const lines = normalizeLines(input);
    const trimmed = trimEdges(lines);
    const { rangesLines } = splitSections(trimmed);

    const intervals = parseIntervals(rangesLines);

    if (intervals.length === 0) {
        return 0;
    }

    const merged = mergeIntervals(intervals);

    return mergedUnionSize(merged);
};
