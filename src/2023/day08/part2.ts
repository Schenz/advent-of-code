// Advent of Code - Day 8 - Part Two

import { parse } from './part1';

export const part2 = (input: string[]): number => {
    const moves = input[0].split('');
    const map = parse(input);
    return [...map.keys()]
        .filter((k) => k.endsWith('A'))
        .map((p) => countSteps(p, moves, map))
        .reduce((a, b) => leastCommonMultiple(a, b), 1);
};

export const countSteps = (
    pos: string,
    moves: string[],
    map: Map<string, string[]>
): number => {
    for (let i = 0; ; i++) {
        const m = moves[i % moves.length];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pos = map.get(pos)![m === 'L' ? 0 : 1];
        if (pos.endsWith('Z')) {
            return i + 1;
        }
    }
};

export const leastCommonMultiple = (a: number, b: number): number => {
    return (a * b) / greatestCommonDivisor(a, b);
};

export const greatestCommonDivisor = (a: number, b: number): number => {
    return !b ? a : greatestCommonDivisor(b, a % b);
};
