// Advent of Code - Day 6 - Part One

import { parseBlocks, evaluateBlock } from './helpers';

export const part1 = (input: string[]): number => {
    const blocks = parseBlocks(input);

    return blocks.reduce((acc, b) => acc + evaluateBlock(b, 'horizontal'), 0);
};
