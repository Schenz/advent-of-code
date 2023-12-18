// Advent of Code - Day 18

import { part1, part2 } from '../../src/2023/day18';
import { readFile } from 'fs/promises';

const testData = [
    'R 6 (#70c710)',
    'D 5 (#0dc571)',
    'L 2 (#5713f0)',
    'D 2 (#d2c081)',
    'R 2 (#59c680)',
    'D 2 (#411b91)',
    'L 5 (#8ceee2)',
    'U 2 (#caa173)',
    'L 1 (#1b58a2)',
    'U 2 (#caa171)',
    'R 2 (#7807d2)',
    'U 3 (#a77fa3)',
    'L 2 (#015232)',
    'U 2 (#7a21e3)',
];

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(62);
    });

    it('part one test - real data', async () => {
        expect(part1(await getData())).toBe(40131);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(952408144115);
    });

    it('part two test - real data', async () => {
        expect(part2(await getData())).toBe(104454050898331);
    });
});

const getData = async (): Promise<string[]> => {
    const input: string = await readFile(
        'src/2023/day18/resources/input.txt',
        'utf8'
    );

    return input.trim().split(/\r?\n/);
};
