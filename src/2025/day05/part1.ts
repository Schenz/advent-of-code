// Advent of Code - Day 5 - Part One
// Count available ingredient IDs that fall inside any fresh range.
import {
    normalizeLines,
    trimEdges,
    splitSections,
    parseIntervals,
    mergeIntervals,
    countAvailableInMerged,
} from './utils';

export const part1 = (input: string[]): number => {
    const lines = normalizeLines(input);
    const trimmed = trimEdges(lines);
    const { rangesLines, availLines } = splitSections(trimmed);

    const intervals = parseIntervals(rangesLines);

    if (intervals.length === 0) {
        return 0;
    }

    const merged = mergeIntervals(intervals);

    return countAvailableInMerged(availLines, merged);
};
