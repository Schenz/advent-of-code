// Advent of Code - Day 25

import { readFile } from 'fs/promises';
import { part1 } from '.';

const main = async (): Promise<void> => {
    try {
        const input: string = await readFile('src/2023/day25/resources/input.txt', 'utf8');

        console.log('--- Part One ---');
        console.log('Result', part1(input.trim().split(/\r?\n/)));
    } catch (err) {
        console.error(err);
    }
};

main();
