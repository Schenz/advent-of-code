// Advent of Code - Day 15

import { part1, part2 } from '../../src/2023/day15';
import { hash } from '../../src/2023/day15/hash';

const testData = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
const testHash = 'HASH';

describe('hash test', () => {
    it('full hash test', () => {
        expect(hash(testHash)).toBe(52);
    });
});

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData)).toBe(1320);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData)).toBe(145);
    });
});
