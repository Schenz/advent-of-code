// Advent of Code - Day 5

import { part1, part2 } from '../../src/2024/day05';
import { readFile } from 'fs/promises';

const testData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData.split(/\r?\n/))).toBe(143);
  });

  it('part one test - real data', async () => {
    const input = await getData();

    expect(part1(input.split(/\r?\n/))).toBe(5275);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData.split(/\r?\n/))).toBe(123);
  });

  it('part two test - real data', async () => {
    const input = await getData();

    expect(part2(input.split(/\r?\n/))).toBe(6191);
  });
});

const getData = async (): Promise<string> => {
  const input: string = await readFile(
    'src/2024/day05/resources/input.txt',
    'utf8'
  );

  return input.trim();
};
