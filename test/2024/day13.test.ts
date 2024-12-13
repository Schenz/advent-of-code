// Advent of Code - Day 13

import { part1, part2 } from '../../src/2024/day13';
import { readFile } from 'fs/promises';

const testData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData)).toBe(480);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input)).toBe(39290);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData)).toBe(875318608908);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input)).toBe(73458657399094);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day13/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
