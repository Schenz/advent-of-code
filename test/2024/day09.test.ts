// Advent of Code - Day 9

import { part1, part2 } from '../../src/2024/day09';
import { readFile } from 'fs/promises';

const testData = `2333133121414131402`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(1928);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(6310675819476);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(2858);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(6335972980679);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day09/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
