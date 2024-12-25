// Advent of Code - Day 1

import { part1, part2 } from '../../src/2024/day01';
import { readFile } from 'fs/promises';

const testData = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(11);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(1765812);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(31);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(20520794);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day01/resources/input.txt', 'utf8');

    return input.trim();
};
