// Advent of Code - Day 3

import { part1, part2 } from '../../src/2024/day03';
import { readFile } from 'fs/promises';

const testData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testData2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(161);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input.split(/\r?\n/))).toBe(168539636);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData2.split(/\r?\n/))).toBe(48);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(input.split(/\r?\n/))).toBe(97529391);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day03/resources/input.txt', 'utf8');

    return input.trim();
};
