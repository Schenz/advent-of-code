// Advent of Code - Day 2

import { part1, part2 } from '../../src/2024/day02';
import { readFile } from 'fs/promises';

const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(2);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(359);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(4);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(418);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day02/resources/input.txt', 'utf8');

    return input.trim();
};
