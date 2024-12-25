// Advent of Code - Day 9

import { part1, part2 } from '../../src/2023/day09';
import { predictNextValue } from '../../src/2023/day09/predictNextValue';

const testData = ['0 3 6 9 12 15', '1 3 6 10 15 21', '10 13 16 21 30 45'];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(114);
    });
    it('part one test line 1', () => {
        expect(predictNextValue(testData[0].split(/\s+/g).map((n) => parseInt(n)))).toBe(18);
    });
    it('part one test line 2', () => {
        expect(predictNextValue(testData[1].split(/\s+/g).map((n) => parseInt(n)))).toBe(28);
    });
    it('part one test line 3', () => {
        expect(predictNextValue(testData[2].split(/\s+/g).map((n) => parseInt(n)))).toBe(68);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(2);
    });
});
