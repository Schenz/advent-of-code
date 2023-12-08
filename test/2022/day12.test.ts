// Advent of Code - Day 12

import { part1, part2 } from '../../src/2022/day12';

const testData = ['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(31);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(29);
    });
});
