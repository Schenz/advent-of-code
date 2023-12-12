// Advent of Code - Day 12 - Part One

import { checkSpringsMemo } from './checkSprings';

export const part1 = (input: string[]): number =>
    input.reduce((acc, line) => {
        const s = line.split(' ')[0];
        const v = line.split(' ')[1].split(',').map(Number);
        return acc + checkSpringsMemo(s, null, v, new Map());
    }, 0);
