// Advent of Code - Day 11

import { part1, part2 } from '../../src/2022/day11';
import { Monkey } from '../../src/2022/day11/Monkey';

const parseMonkeys = (data: string): Monkey[] => data.split('Monkey ').slice(1).map((monkey) => ({
  items: monkey.split(':')[2].split(',').map((item) => parseInt(item)),
  operation: monkey.split('new = ')[1].split('\n')[0].trim(),
  test: parseInt(monkey.split(':')[4].split('divisible by ')[1]),
  trueMonkey: parseInt(monkey.split(':')[5].split('throw to monkey')[1]),
  falseMonkey: parseInt(monkey.split(':')[6].split('throw to monkey')[1]),
  inspected: 0
}));

const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

describe('part one tests', () => {
  it('part one test', () => {
    expect(part1(parseMonkeys(input), 20, (frustration) => Math.floor(frustration / 3))).toBe(10605);
  });
});

describe('part two tests', () => {
  it('part two test', () => {
    expect(part2(parseMonkeys(input), 10000, (frustration) => frustration % parseMonkeys(input).reduce((a, b) => a * b.test, 1))).toBe(2713310158);
  });
});
