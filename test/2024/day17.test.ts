// Advent of Code - Day 17

import { part1, part2 } from '../../src/2024/day17';
import { readFile } from 'fs/promises';
import { parse } from '../../src/2024/day17/input';

const testData = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const part2TestData = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(parse(testData))).toBe('4,6,3,5,6,3,5,2,1,0');
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(parse(input))).toBe('7,3,0,5,7,1,4,0,5');
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(parse(part2TestData))).toBe(117440n);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(parse(input))).toBe(202972175280682n);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day17/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
