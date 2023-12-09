// Advent of Code - Day 9 - Part One

import { predictNextValue } from './predictNextValue';

export const part1 = (input: string[]): number => {
    return input.reduce((acc, line) => {
        return (
            acc + predictNextValue(line.split(/\s+/g).map((n) => parseInt(n)))
        );
    }, 0);
};
