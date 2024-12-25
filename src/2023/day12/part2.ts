// Advent of Code - Day 12 - Part Two

import { checkSpringsMemo } from './checkSprings';

export const part2 = (input: string[]): number =>
    input.reduce((acc, line) => {
        const s = line.split(' ')[0];
        const v = line.split(' ')[1].split(',').map(Number);

        let copies = '';

        for (let j = 0; j < 5; j++) {
            copies += '?';
            copies += s;
        }

        return acc + checkSpringsMemo(copies.slice(1), null, [...v, ...v, ...v, ...v, ...v], new Map());
    }, 0);
