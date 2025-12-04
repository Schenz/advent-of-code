// Advent of Code - Day 23

import { part1, part2 } from '../../src/2024/day23';
import { readFile } from 'fs/promises';

const testData = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(7);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(1163);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe('co,de,ka,ta');
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe('bm,bo,ee,fo,gt,hv,jv,kd,md,mu,nm,wx,xh');
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day23/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
