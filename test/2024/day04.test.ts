// Advent of Code - Day 4

import { part1, part2 } from '../../src/2024/day04';
import { readFile } from 'fs/promises';

const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(18);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input.split(/\r?\n/))).toBe(2573);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(9);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(input.split(/\r?\n/))).toBe(1850);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day04/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
