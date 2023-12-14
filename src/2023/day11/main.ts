// Advent of Code - Day 11

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';

const main = async (): Promise<void> => {
    try {
        const input: string = await readFile(
            'src/2023/day11/resources/input.txt',
            'utf8'
        );

        console.log('--- Part One ---');
        console.log('Result', part1(input));

        console.log('--- Part Two ---');
        console.log('Result', part2(input, 1000000));
    } catch (err) {
        console.error(err);
    }
};

main();
