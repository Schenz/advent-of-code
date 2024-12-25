// Advent of Code - Day 11

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';
import { Monkey } from './Monkey';

const main = async (): Promise<void> => {
    try {
        const input: string = await readFile('src/2022/day11/resources/input.txt', 'utf8');

        const parseMonkeys = (data: string): Monkey[] =>
            data
                .split('Monkey ')
                .slice(1)
                .map((monkey) => ({
                    items: monkey
                        .split(':')[2]
                        .split(',')
                        .map((item) => parseInt(item)),
                    operation: monkey.split('new = ')[1].split('\n')[0].trim(),
                    test: parseInt(monkey.split(':')[4].split('divisible by ')[1]),
                    trueMonkey: parseInt(monkey.split(':')[5].split('throw to monkey')[1]),
                    falseMonkey: parseInt(monkey.split(':')[6].split('throw to monkey')[1]),
                    inspected: 0,
                }));

        console.log('--- Part One ---');
        console.log(
            'Result',
            part1(parseMonkeys(input), 20, (frustration) => Math.floor(frustration / 3))
        );

        console.log('--- Part Two ---');
        console.log(
            'Result',
            part2(
                parseMonkeys(input),
                10000,
                (frustration) => frustration % parseMonkeys(input).reduce((a, b) => a * b.test, 1)
            )
        );
    } catch (err) {
        console.error(err);
    }
};

main();
