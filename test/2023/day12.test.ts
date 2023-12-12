// Advent of Code - Day 12

import { part1, part2 } from '../../src/2023/day12';

const testData = [
    '???.### 1,1,3',
    '.??..??...?##. 1,1,3',
    '?#?#?#?#?#?#?#? 1,3,1,6',
    '????.#...#... 4,1,1',
    '????.######..#####. 1,6,5',
    '?###???????? 3,2,1',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(21);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(525152);
    });
});
