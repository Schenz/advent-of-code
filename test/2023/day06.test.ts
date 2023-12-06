// Advent of Code - Day 6

import { part1, part2 } from '../../src/2023/day06';

const testData = [
  "Time:      7  15   30",
  "Distance:  9  40  200"
];
describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(testData)).toBe(288);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(testData)).toBe(71503);
  });
});
