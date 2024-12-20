// Advent of Code - Day 20

import { part1, part2 } from '../../src/2024/day20';
import { readFile } from 'fs/promises';

const testData = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe('part one tests', () => {
  xit('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(0);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(1321);
  });
});

describe('part two tests', () => {
  xit('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(0);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(971737);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day20/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
