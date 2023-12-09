// Advent of Code - Day 13 - Part One

import { compare } from './compare';

export const part1 = (input: string): number => {
    let sum = 0;
    for (const [i, lines] of input.split('\n\n').entries()) {
        const [one, two] = lines.split('\n').map((raw) => JSON.parse(raw));
        if (compare(one, two)) sum += i + 1;
    }
    return sum;
};
