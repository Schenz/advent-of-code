// Advent of Code - Day 11

import { part1, part2 } from '../../src/2023/day11';

const testData = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(374);
    });
});

describe('part two tests', () => {
    it('part two test at 10x', () => {
        expect(part2(testData, 10)).toBe(1030);
    });
    it('part two test at 100x', () => {
        expect(part2(testData, 100)).toBe(8410);
    });
});
