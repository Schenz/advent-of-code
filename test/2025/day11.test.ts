// Advent of Code - Day 11
/* eslint-disable no-console */

import { part1, part2 } from '../../src/2025/day11';
import { readFile } from 'fs/promises';

const testData = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`;

const testData2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`;

describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData.split(/\r?\n/))).toBe(5);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        if (
            !input ||
            (Array.isArray(input) && input.length === 0) ||
            (typeof input === 'string' && input.trim().length === 0)
        ) {
            console.warn('No input file; skipping real-data test');
            return;
        }

        expect(part1(input.split(/\r?\n/))).toBe(428);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData2.split(/\r?\n/))).toBe(2);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        if (
            !input ||
            (Array.isArray(input) && input.length === 0) ||
            (typeof input === 'string' && input.trim().length === 0)
        ) {
            console.warn('No input file; skipping real-data test');
            return;
        }

        expect(part2(input.split(/\r?\n/))).toBe(331468292364745);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2025/day11/resources/input.txt', 'utf8');

        return input.trim();
    } catch {
        return '';
    }
};
