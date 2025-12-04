// Advent of Code - Day 3

import { part1, part2 } from '../../src/2025/day03';
import { readFile } from 'fs/promises';

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(357);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

    expect(part1(input.split(/\r?\n/))).toBe(17766);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(3121910778619);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim().length === 0)) { console.warn('No input file; skipping real-data test'); return; }

    expect(part2(input.split(/\r?\n/))).toBe(176582889354075);
  });
});

const getData = async (): Promise<string> => {
  try {
    const input: string = await readFile(
      'src/2025/day03/resources/input.txt',
      'utf8'
    );

    return input.trim();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Failed to read input file: ${err.message}`);
    }
    throw err;
  }
};
