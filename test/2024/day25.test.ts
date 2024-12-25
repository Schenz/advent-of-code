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

        expect(part1(input.split(/\r?\n/))).toBe(2933);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day25/resources/input.txt', 'utf8');

    return input.trim();
};
