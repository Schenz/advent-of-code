// Advent of Code - Day 3 - Part Two

import { getAdj } from './part1';

export const part2 = (input: string): number => {
    const lines = input.split('\n');

    const gears: number[] = [];
    const possibleGears = [];

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === '*') {
                possibleGears.push([y, x]);
            }
        }
    }
    possibleGears.forEach(([y, x]) => {
        const ns = [
            ...new Set(
                getAdj(y, x)
                    .map((a) => numberAt(input, a) || '')
                    .filter((n) => !!n)
                    .map((n) => n)
            ),
        ].map((n) => parseInt(n));

        if (ns.length === 2) {
            gears.push(ns[0] * ns[1]);
        }
    });

    return gears.reduce((a, b) => a + b, 0);
};

const numberAt = (input: string, [y, x]: [number, number], back = true, forward = true): string | undefined => {
    const char = input.split('\n')[y][x];
    let seq = '';

    if (char >= '0' && char <= '9') {
        seq += char;
    } else {
        return undefined;
    }

    if (back) {
        const prev = numberAt(input, [y, x - 1], true, false);

        if (prev) {
            seq = prev + seq;
        }
    }

    if (forward) {
        const next = numberAt(input, [y, x + 1], false, true);

        if (next) {
            seq += next;
        }
    }
    return seq;
};
