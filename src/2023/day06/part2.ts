// Advent of Code - Day 6 - Part Two

import { calculateWins } from './calculateWins';

export const part2 = (input: string[]): number => {
    const times: number[] = input[0].replace(/\s+/g, '').match(/\d+/g)?.map(Number) || [];
    const distances: number[] = input[1].replace(/\s+/g, '').match(/\d+/g)?.map(Number) || [];
    const wins = calculateWins(times, distances);

    return wins.reduce((acc, win) => acc * win);
};
