// Advent of Code - Day 4 - Part One

import { Card } from "./main";

export function part1(cards: Card[]): number {
  let points = 0;

	for (const [winningNumbers, yourNumbers] of cards) {
		const overlap = yourNumbers.filter((number) =>
			winningNumbers.includes(number)
		);

		points += Math.floor(2 ** (overlap.length - 1));
	}

	return points;
}
