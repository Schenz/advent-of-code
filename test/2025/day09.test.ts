// Advent of Code - Day 9
/* eslint-disable no-console */

import { part1, part2 } from '../../src/2025/day09';
import { readFile } from 'fs/promises';

const testData = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(50);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    if (
      !input ||
      (Array.isArray(input) && input.length === 0) ||
      (typeof input === 'string' && input.trim().length === 0)
    ) {
      console.warn('No input file; skipping real-data test');
      return;
    }

    expect(part1(input.split(/\r?\n/))).toBe(4750297200);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(24);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    if (
      !input ||
      (Array.isArray(input) && input.length === 0) ||
      (typeof input === 'string' && input.trim().length === 0)
    ) {
      console.warn('No input file; skipping real-data test');
      return;
    }

    expect(part2(input.split(/\r?\n/))).toBe(1578115935);
  });
});

const getData = async (): Promise<string> => {
  try {
    const input: string = await readFile(
      'src/2025/day09/resources/input.txt',
      'utf8'
    );

    return input.trim();
  } catch {
    return '';
  }
};
