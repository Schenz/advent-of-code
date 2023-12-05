// Advent of Code - Day 5

import { part1, part2 } from '../../src/2023/day05';

const data = `src/2023/day05/resources/sample.txt`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(data)).toBe(35);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(data)).toBe(46);
  });
});
