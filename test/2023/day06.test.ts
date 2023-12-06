// Advent of Code - Day 6

import { part1, part2 } from '../../src/2023/day06';

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1([
      "Time:      7  15   30",
      "Distance:  9  40  200"
    ])).toBe(288);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2([
      "Time:      7  15   30",
      "Distance:  9  40  200"
    ])).toBe(71503);
  });
});
