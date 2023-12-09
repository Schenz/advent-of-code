// Advent of Code - Day 14

import { part1, part2 } from '../../src/2022/day14';

const testData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(24);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(93);
    });
});
