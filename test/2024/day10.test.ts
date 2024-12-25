// Advent of Code - Day 10

import { part1, part2 } from '../../src/2024/day10';
import { readFile } from 'fs/promises';

const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(36);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(820);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(81);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(1786);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day10/resources/input.txt', 'utf8');

    return input.trim();
};
