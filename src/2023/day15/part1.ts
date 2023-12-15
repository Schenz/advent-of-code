// Advent of Code - Day 15 - Part One

import { hash } from './hash';

export const part1 = (input: string): number =>
    input
        .replace(/(\r\n|\n|\r)/gm, '')
        .split(',')
        .reduce((acc, curr) => acc + hash(curr), 0);
