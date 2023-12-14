// Advent of Code - Day 7

import { readFileSync } from 'fs';
import { part1, part2 } from '.';

const main = async (): Promise<void> => {
    try {
        const input: string = readFileSync(
            'src/2023/day07/resources/input.txt',
            'utf8'
        )
            .replace(/A/g, 'Z')
            .replace(/K/g, 'Y')
            .replace(/Q/g, 'X')
            .replace(/J/g, 'W')
            .replace(/T/g, 'V');

        console.log('--- Part One ---');
        console.log(
            'Result',
            part1(
                input
                    .split('\n')
                    .filter(Boolean)
                    .map((e) => e.split(' ').filter(Boolean))
            )
        );

        console.log('--- Part Two ---');
        console.log(
            'Result',
            part2(
                input
                    .replace(/W/g, '0')
                    .split('\n')
                    .filter(Boolean)
                    .map((e) => e.split(' ').filter(Boolean))
            )
        );
    } catch (err) {
        console.error(err);
    }
};

main();
