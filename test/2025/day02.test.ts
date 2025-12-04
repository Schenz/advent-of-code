// Advent of Code - Day 2

import { part1, part2 } from '../../src/2025/day02';
import { readFile } from 'fs/promises';

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(1227775554);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    if (!input) { console.warn('No input file; skipping real-data test'); return; }

    expect(part1(input.split(/\r?\n/))).toBe(40055209690);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(4174379265);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    if (!input) { console.warn('No input file; skipping real-data test'); return; }

    expect(part2(input.split(/\r?\n/))).toBe(50857215650);
  });
});

const getData = async (): Promise<string> => {
  try {
    const input: string = await readFile(
      'src/2025/day02/resources/input.txt',
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
