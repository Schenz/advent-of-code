// Advent of Code - Day 14

import { part1, part2 } from '../../src/2024/day14';
import { readFile } from 'fs/promises';

const testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/), [11, 7])).toBe(12);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/), [103, 101])).toBe(219512160);
    });
});

describe('part two tests', () => {
    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(6398);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile('src/2024/day14/resources/input.txt', 'utf8');

    return input.trim();
};
