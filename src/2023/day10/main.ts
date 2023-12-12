// Advent of Code - Day 10

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';

const main = async () => {
    try {
        const input: string = await readFile(
            'src/2023/day10/resources/input.txt',
            'utf8'
        );

        console.log('--- Part One ---');
        console.log('Result', part1(input.split(/\r?\n/)));

        console.log('--- Part Two ---');
        console.log('Result', part2(input.split(/\r?\n/)));
    } catch (err) {
        console.error(err);
    }
};

main();