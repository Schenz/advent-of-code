// Advent of Code - Day 21 - Part One

import { calculateMinLength } from './utils';

export const part1 = (input: string[]): number =>
    input
        .filter((line) => /\d{3}A/.test(line))
        .reduce((total, code) => total + calculateMinLength(code) * parseInt(code.slice(0, 3), 10), 0);
