// Advent of Code - Day 13 - Part Two

import { getLowestScore } from './getLowestScore';
import { parseInput } from './parseInput';

export const part2 = (input: string): number =>
    parseInput(input)
        .map(([button1, button2, [targetX, targetY]]) => [
            button1,
            button2,
            [targetX + 10000000000000, targetY + 10000000000000],
        ])
        .reduce(getLowestScore, 0);
