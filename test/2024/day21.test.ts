// Advent of Code - Day 21

import { part1, part2 } from '../../src/2024/day21';
import { readFile } from 'fs/promises';

const testData = `029A
980A
179A
456A
379A`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(126384);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(222670);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(154115708116294);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(271397390297138);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day21/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
