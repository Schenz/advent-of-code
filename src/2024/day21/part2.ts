// Advent of Code - Day 21 - Part Two

import { calculateMinLength } from './utils';

export const part2 = (input: string[]): number =>
    input
        .filter((line) => /\d{3}A/.test(line))
        .reduce((total, code) => total + calculateMinLength(code, 25) * parseInt(code.slice(0, 3), 10), 0);
