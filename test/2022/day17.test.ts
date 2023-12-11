// Advent of Code - Day 17

import { part1, part2 } from '../../src/2022/day17';

const testData = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(3068);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(1571428571428);
    });
});
