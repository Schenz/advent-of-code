// Advent of Code - Day 21

import { part1, part2 } from '../../src/2023/day21';
import { readFile } from 'fs/promises';

const testData = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData, 6)).toBe(16);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input, 64)).toBe(3770);
    });
});

describe('part two tests', () => {
    it('part two test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part2(input, 26501365)).toBe(628206330073385);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2023/day21/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
