// Advent of Code - Day 5

import { part1, part2 } from '.';

const main = async () => {
    try {
        console.log('--- Part One ---');
        console.log('Result', part1('src/2023/day05/resources/input.txt'));

        console.log('--- Part Two ---');
        console.log('Result', part2('src/2023/day05/resources/input.txt'));
    } catch (err) {
        console.error(err);
    }
};

main();
