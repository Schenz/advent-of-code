// Advent of Code - Day 7

import { part1, part2 } from '../../src/2024/day07';
import { readFile } from 'fs/promises';

const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(3749);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input.split(/\r?\n/))).toBe(2314935962622);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(11387);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(input.split(/\r?\n/))).toBe(401477450831495);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day07/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
