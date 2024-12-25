// Advent of Code - Day 8

import { part1, part2 } from '../../src/2023/day08';

const testData = ['LLR', '', 'AAA = (BBB, BBB)', 'BBB = (AAA, ZZZ)', 'ZZZ = (ZZZ, ZZZ)'];

const testData2 = [
    'LR',
    '',
    '11A = (11B, XXX)',
    '11B = (XXX, 11Z)',
    '11Z = (11B, XXX)',
    '22A = (22B, XXX)',
    '22B = (22C, 22C)',
    '22C = (22Z, 22Z)',
    '22Z = (22B, 22B)',
    'XXX = (XXX, XXX)',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(6);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData2)).toBe(6);
    });
});
