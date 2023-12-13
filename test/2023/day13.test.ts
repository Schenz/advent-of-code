// Advent of Code - Day 13

import { part1, part2 } from '../../src/2023/day13';

const testData = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(405);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(400);
    });
});
