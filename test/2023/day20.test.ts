// Advent of Code - Day 20

import { part1, part2 } from '../../src/2023/day20';
import { readFile } from 'fs/promises';

const testData1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const testData2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

describe('part one tests', () => {
    it('part one 1a test', () => {
        expect(part1(testData1)).toBe(32000000);
    });

    it('part one 1b test', () => {
        expect(part1(testData2)).toBe(11687500);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input)).toBe(938065580);
    });
});

describe('part two tests', () => {
    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(input.split(/\r?\n/))).toBe(250628960065793);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2023/day20/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
