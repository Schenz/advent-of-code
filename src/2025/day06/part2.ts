// Advent of Code - Day 6 - Part Two

import { parseBlocks, evaluateBlock } from './helpers';

export const part2 = (input: string[]): number => {
    const blocks = parseBlocks(input);

    return blocks.reduce((acc, b) => acc + evaluateBlock(b, 'vertical'), 0);
};
