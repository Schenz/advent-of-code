// Advent of Code - Day 14

import { part1, part2 } from '../../src/2023/day14';

const testData = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(136);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(64);
    });
});
