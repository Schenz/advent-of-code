// Advent of Code - Day 18 - Part One

import { bfs } from './bfs';
import { parseInput } from './parseInput';

export const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

export const part1 = (rawInput: string, size: number, bytes: number): number => {
    const input = parseInput(rawInput);

    return bfs(input, bytes, size);
};
