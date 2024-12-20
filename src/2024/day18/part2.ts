// Advent of Code - Day 18 - Part Two

import { bfs } from './bfs';
import { parseInput } from './parseInput';

export const part2 = (rawInput: string, size: number, bytes: number): string => {
    const input = parseInput(rawInput);
    let right = input.length;
    let s = 0;

    // Finally a binary search this AoC <3
    while (bytes <= right) {
        const mid = Math.floor((bytes + right) / 2);

        if (bfs(input, mid, size) !== -1) {
            s = mid;
            bytes = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return input[s].join(',');
};
