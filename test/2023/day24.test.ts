// Advent of Code - Day 24

import { part1, part2 } from '../../src/2023/day24';
import { readFile } from 'fs/promises';

const testData = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

describe('part one tests', () => {
    it('gets it', () => {
        expect(part1(testData.split(/\r?\n/), 7, 27)).toBe(2);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(
            part1(input.split(/\r?\n/), 200000000000000, 400000000000000)
        ).toBe(19976);
    });
});

describe('part two tests', () => {
    it('part two test', async () => {
        const result = await part2(testData.split(/\r?\n/));

        expect(result).toBe(47);
    });
    it('part two test - real data', async () => {
        const input = await getData();
        const result = await part2(input.split(/\r?\n/));

        expect(result).toBe(849377770236905);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile(
        'src/2023/day24/resources/input.txt',
        'utf8'
    );

    return input.trim();
};
