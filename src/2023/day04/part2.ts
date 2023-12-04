// Advent of Code - Day 4 - Part Two

import { ScratchCard } from "./main";

export function part2(cards: ScratchCard[]): number {
  let total = new Array(cards.length).fill(1);

	for (const [index, [winningNumbers, yourNumbers]] of cards.entries()) {
		let winners = yourNumbers.filter((number) =>
			winningNumbers.includes(number)
		).length;

		while (winners) {
			total[index + winners--] += total[index];
		}
	}

	return total.reduce((acc, x) => {
    return acc += x;
  });
}
