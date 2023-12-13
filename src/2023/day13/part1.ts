// Advent of Code - Day 13 - Part One

import { findReflection, parseInput } from './utils';

export const part1 = (input: string): number => {
    const data = parseInput(input);

    let answer = 0;

    for (const g of data) {
        const [vert, horiz] = findReflection(g);
        if (vert.length === 1) {
            if (horiz.length === 0) {
                answer += vert[0];
            } else {
                throw new Error('Assertion Error');
            }
        } else {
            if (vert.length === 0 && horiz.length === 1) {
                answer += horiz[0] * 100;
            } else {
                throw new Error('Assertion Error');
            }
        }
    }

    return answer;
};
