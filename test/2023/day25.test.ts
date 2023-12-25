// Advent of Code - Day 25

import { part1, part2 } from '../../src/2023/day25';
import { readFile } from 'fs/promises';

const testData = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(54);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input.split(/\r?\n/))).toBe(552682);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData.split(/\r?\n/))).toBe(0);
    });

    xit('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input.split(/\r?\n/))).toBe(0);
    });
});

const getData = async (): Promise<string> => {
    const input: string = await readFile(
        'src/2023/day25/resources/input.txt',
        'utf8'
    );

    return input.trim();
};
