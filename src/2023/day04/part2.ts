// Advent of Code - Day 4 - Part Two

import { ScratchCard } from './main';

export const part2 = (cards: ScratchCard[]): number => {
    const total = new Array(cards.length).fill(1);

    for (const [index, [winningNumbers, yourNumbers]] of cards.entries()) {
        let winners = yourNumbers.filter((number) =>
            winningNumbers.includes(number)
        ).length;

        while (winners) {
            total[index + winners--] += total[index];
        }
    }

    return total.reduce((acc, x) => {
        return (acc += x);
    });
};
