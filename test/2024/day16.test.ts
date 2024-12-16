// Advent of Code - Day 16

import { part1, part2 } from '../../src/2024/day16';
import { readFile } from 'fs/promises';

const testData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(7036);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(73404);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(45);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(449);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day16/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
