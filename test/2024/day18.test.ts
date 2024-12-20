// Advent of Code - Day 18

import { part1, part2 } from '../../src/2024/day18';
import { readFile } from 'fs/promises';

const testData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData, 7, 12)).toBe(22);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input, 71, 1024)).toBe(276);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData, 7, 12)).toBe('6,1');
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input, 71, 1024)).toBe('60,37');
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day18/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
