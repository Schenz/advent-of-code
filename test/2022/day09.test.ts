// Advent of Code - Day 9

import { part1, part2 } from '../../src/2022/day09';

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(["R 4",
    "U 4",
    "L 3",
    "D 1",
    "R 4",
    "D 1",
    "L 5",
    "R 2"])).toBe(13);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(["R 5",
    "U 8",
    "L 8",
    "D 3",
    "R 17",
    "D 10",
    "L 25",
    "U 20"])).toBe(36);
  });
});
