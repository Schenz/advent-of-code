// Advent of Code - Day 22 - Part One

import { parseAndArrangeBlocks } from './brickUtils';

export const part1 = (input: string[]): number => {
    const { bricks, kSupportsV, vSupportsK } = parseAndArrangeBlocks(input);

    return bricks.filter((_, i) =>
        Array.from(kSupportsV[i]).every((j) => vSupportsK[j].size >= 2)
    ).length;
};
