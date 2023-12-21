// Advent of Code - Day 21 - Part One

import { findPlots } from './findPlots';

export const part1 = (input: string, steps: number): number => {
    const map = input.split('\n').map((line) => line.split(''));

    const startY = map.findIndex((line) => line.includes('S'));
    const startX = map[startY].findIndex((char) => char === 'S');

    map[startY][startX] = '.';

    return findPlots(map, startX, startY, steps);
};
