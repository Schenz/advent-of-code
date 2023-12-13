// Advent of Code - Day 1 - Part Two

import { Elf } from './Elf';

export const part2 = (input: string[]): number => {
    const elves: Array<Elf> = [];
    let elfNumber = 1;
    let calories = 0;

    input.forEach((value) => {
        if (isNaN(parseInt(value))) {
            elves.push(new Elf(elfNumber, calories));

            elfNumber++;
            calories = 0;
        } else {
            calories += parseInt(value);
        }
    });

    const sortedElves = elves.sort((a: Elf, b: Elf) => {
        if (b.calories > a.calories) {
            return 1;
        }

        if (b.calories < a.calories) {
            return -1;
        }

        return 0;
    });

    return (
        sortedElves[0].calories +
        sortedElves[1].calories +
        sortedElves[2].calories
    );
};
