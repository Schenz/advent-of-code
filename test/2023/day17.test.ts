// Advent of Code - Day 17

import { part1, part2 } from '../../src/2023/day17';

const testData1 = [
    '2413432311323',
    '3215453535623',
    '3255245654254',
    '3446585845452',
    '4546657867536',
    '1438598798454',
    '4457876987766',
    '3637877979653',
    '4654967986887',
    '4564679986453',
    '1224686865563',
    '2546548887735',
    '4322674655533',
];

const testData2 = [
    '111111111111',
    '999999999991',
    '999999999991',
    '999999999991',
    '999999999991',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData1.join('\n'))).toBe(102);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData1.join('\n'))).toBe(94);
    });
    it('part two test with testData2', () => {
        expect(part2(testData2.join('\n'))).toBe(71);
    });
});
