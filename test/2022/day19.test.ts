// Advent of Code - Day 19

import { part1, part2 } from '../../src/2022/day19';
import { readFile } from 'fs/promises';

// const testData = `
// Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
// Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
// `;

const testData = [
  'Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.'
];

describe('part one tests', () => {
    it('part one test', () => {
      //expect(part1(testData)).toBe(33);
      expect(part1(testData)).toBe(9);
    });

    xit('part one test - real data', async () => {
      const input = await getData();

      expect(part1(input.split(/\r?\n/))).toBe(0);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
      expect(part2(testData)).toBe(0);
    });

    xit('part two test - real data', async () => {
      const input = await getData();

      expect(part2(input.split(/\r?\n/))).toBe(0);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile(
        'src/2022/day19/resources/input.txt',
        'utf8'
    );

    return input.trim();
};
