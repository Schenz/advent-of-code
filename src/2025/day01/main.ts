// Advent of Code - Day 1

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';

const main = async (): Promise<void> => {
    try {
        const input: string = await readFile(
            'src/2025/day01/resources/input.txt',
            'utf8'
        );

        console.log('--- Part One ---');
        console.log('Result', part1(input.trim().split(/\r?\n/)));

        console.log('--- Part Two ---');
        console.log('Result', part2(input.trim().split(/\r?\n/)));
    } catch (err) {
        console.error('Error running solution:');
        if (err instanceof Error) {
            console.error(`  Message: ${err.message}`);
            if (err.stack) {
                console.error(`  Stack:\n${err.stack}`);
            }
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

main();
