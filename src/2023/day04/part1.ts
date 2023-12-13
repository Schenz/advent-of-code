// Advent of Code - Day 4 - Part One

import { ScratchCard } from './main';

export const part1 = (cards: ScratchCard[]): number => {
    let points = 0;

    for (const [winningNumbers, yourNumbers] of cards) {
        const overlap = yourNumbers.filter((number) =>
            winningNumbers.includes(number)
        );

        points += Math.floor(2 ** (overlap.length - 1));
    }

    return points;
};
