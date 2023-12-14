// Advent of Code - Day 7

import { part1, part2 } from '../../src/2023/day07';

const testData = `32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`
    .replace(/A/g, 'Z')
    .replace(/K/g, 'Y')
    .replace(/Q/g, 'X')
    .replace(/J/g, 'W')
    .replace(/T/g, 'V');

describe('part one tests', () => {
    it('part one test', () => {
        expect(
            part1(
                testData
                    .split('\n')
                    .filter(Boolean)
                    .map((e) => e.split(' ').filter(Boolean))
            )
        ).toBe(6440);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(
            part2(
                testData
                    .replace(/W/g, '0')
                    .split('\n')
                    .filter(Boolean)
                    .map((e) => e.split(' ').filter(Boolean))
            )
        ).toBe(5905);
    });
});
