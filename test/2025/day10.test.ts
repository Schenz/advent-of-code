jest.setTimeout(120000);
// Advent of Code - Day 10
/* eslint-disable no-console */

import { part1, part2 } from '../../src/2025/day10';
import { readFile } from 'fs/promises';

const testData = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(7);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (
            !input ||
            (Array.isArray(input) && input.length === 0) ||
            (typeof input === 'string' && input.trim().length === 0)
        ) {
            console.warn('No input file; skipping real-data test');
            return;
        }

        expect(part1(input.split(/\r?\n/))).toBe(441);
    });
});

describe('part two tests', () => {
    it('part two test', async () => {
        expect(await part2(testData.split(/\r?\n/))).toBe(33);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (
            !input ||
            (Array.isArray(input) && input.length === 0) ||
            (typeof input === 'string' && input.trim().length === 0)
        ) {
            console.warn('No input file; skipping real-data test');
            return;
        }

        expect(await part2(input.split(/\r?\n/))).toBe(18559);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2025/day10/resources/input.txt', 'utf8');

        return input.trim();
    } catch {
        return '';
    }
};
