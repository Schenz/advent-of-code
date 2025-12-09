// Advent of Code - Day 8
/* eslint-disable no-console */

import { part1, part2 } from '../../src/2025/day08';
import { readFile } from 'fs/promises';

const testData = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(40);
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

    expect(part1(input.split(/\r?\n/))).toBe(115885);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(25272);
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

    expect(part2(input.split(/\r?\n/))).toBe(274150525);
  });
});

const getData = async (): Promise<string> => {
  try {
    const input: string = await readFile(
      'src/2025/day08/resources/input.txt',
      'utf8'
    );

    return input.trim();
  } catch {
    return '';
  }
};
