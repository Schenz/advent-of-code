// Advent of Code - Day 6 - Part One

import { calculateWins } from './calculateWins';

export const part1 = (input: string[]): number => {
    const times: number[] = input[0]
        .split(' ')
        .filter((x) => !isNaN(+x) && x !== '')
        .map((x) => +x);
    const distances: number[] = input[1]
        .split(' ')
        .filter((x) => !isNaN(+x) && x !== '')
        .map((x) => +x);
    const wins = calculateWins(times, distances);

    return wins.reduce((acc, win) => acc * win);
};
