// Advent of Code - Day 4

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';

export type Card = [winning: number[], yours: number[]];

(async function() {
  try {
    const input: string = await readFile('src/2023/day04/resources/input.txt', 'utf8');

    let cards = input.split(/\r?\n/).map((line) => {
      const allNumbers = line.split(':')[1];
  
      return allNumbers.split('|').map((numbers) => {
        return [...numbers.matchAll(/\d+/g)].map(Number);
      });
    }) as Card[];

    console.log("--- Part One ---");
    console.log("Result", part1(cards));

    console.log("--- Part Two ---");
    console.log("Result", part2(cards));

  } catch (err) {
      console.error(err);
  }
})()
