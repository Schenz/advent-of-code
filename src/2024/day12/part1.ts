// Advent of Code - Day 12 - Part One

import { calculateRegionDetails } from './calculateRegionDetails';

export const part1 = (input: string[]): number => {
    const region = new Set<string>();

    return input.reduce((totalSum, row, y) => {
        row.split('').forEach((_, x) => {
            if (!region.has(`${x},${y}`)) {
                const details = calculateRegionDetails(input, x, y, region);
                const perimeterLength = Object.values(details.perimeter).reduce((sum, array) => sum + array.length, 0);

                totalSum += details.cellCount * perimeterLength;
            }
        });
        return totalSum;
    }, 0);
};
