// Advent of Code - Day 18

import { part1, part2 } from '../../src/2022/day18';

const testData = [
    '2,2,2',
    '1,2,2',
    '3,2,2',
    '2,1,2',
    '2,3,2',
    '2,2,1',
    '2,2,3',
    '2,2,4',
    '2,2,6',
    '1,2,5',
    '3,2,5',
    '2,1,5',
    '2,3,5',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(64);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(58);
    });
});
