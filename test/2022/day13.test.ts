// Advent of Code - Day 13

import { part1, part2 } from '../../src/2022/day13';

const testData = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(13);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(140);
    });
});
