// Advent of Code - Day 22

import { part1, part2 } from '../../src/2024/day22';
import { readFile } from 'fs/promises';

const testData = `15887950
16495136
527345
704524
1553684
12683156
11100544
12249484
7753432
5908254`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(94558292n);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(21147129593n);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(90);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(2445);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day22/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
