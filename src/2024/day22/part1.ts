// Advent of Code - Day 22 - Part One

import { randomNumber } from './randomNumber';

export const part1 = (input: string[]): bigint => {
    return input
        .map((num) => BigInt(num))
        .reduce((sum, num) => {
            let seed = num;

            for (let i = 0; i < 2000; i++) {
                seed = randomNumber(seed);
            }
            return sum + seed;
        }, 0n);
};
