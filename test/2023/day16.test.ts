// Advent of Code - Day 16

import { part1, part2 } from '../../src/2023/day16';

const testData = [
    '.|...\\....',
    '|.-.\\.....',
    '.....|-...',
    '........|.',
    '..........',
    '.........\\',
    '..../.\\\\..',
    '.-.-/..|..',
    '.|....-|.\\',
    '..//.|....',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.join('\n'))).toBe(46);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.join('\n'))).toBe(51);
    });
});
