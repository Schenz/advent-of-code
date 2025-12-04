// Advent of Code - Day 25

import { part1 } from '../../src/2024/day25';
import { readFile } from 'fs/promises';

const testData = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(3);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

        expect(part1(input.split(/\r?\n/))).toBe(2933);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day25/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
