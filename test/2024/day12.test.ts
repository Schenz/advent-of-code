// Advent of Code - Day 12

import { part1, part2 } from '../../src/2024/day12';
import { readFile } from 'fs/promises';

const testData = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const part2a = `AAAA
BBCD
BBCC
EEEC`;

const part2b = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

const part2c = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(1930);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(1363484);
    });
});

describe('part two tests', () => {
    it.each`
        input       | expected
        ${part2a}   | ${80}
        ${part2b}   | ${236}
        ${part2c}   | ${368}
        ${testData} | ${1206}
    `('returns $expected when $input is passed to function', ({ input, expected }) => {
        expect(part2(input.split(/\r?\n/))).toBe(expected);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(838988);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day12/resources/input.txt', 'utf8');

    return input.trim();
};
