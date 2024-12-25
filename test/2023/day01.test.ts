// Advent of Code - Day 1

import { part1, part2 } from '../../src/2023/day01';

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'])).toBe(142);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(
            part2([
                'two1nine',
                'eightwothree',
                'abcone2threexyz',
                'xtwone3four',
                '4nineeightseven2',
                'zoneight234',
                '7pqrstsixteen',
            ])
        ).toBe(281);
    });
});
