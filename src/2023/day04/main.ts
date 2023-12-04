// Advent of Code - Day 4

import { readFile } from 'fs/promises';
import { part1, part2 } from '.';

export type ScratchCard = [winning: number[], yours: number[]];

(async function() {
  try {
    const input: string = await readFile('src/2023/day04/resources/input.txt', 'utf8');

// This code snippet takes an input string and splits it into an array of lines. It then extracts all the numbers from each line and converts them into an array of arrays of numbers. Finally, it casts the resulting array as a type called "Scratch
    let cards = input.split(/\r?\n/).map((line) => {
      const allNumbers = line.split(':')[1];
  
      return allNumbers.split('|').map((numbers) => {
        return [...numbers.matchAll(/\d+/g)].map(Number);
      });
    }) as ScratchCard[];

    console.log("--- Part One ---");
    console.log("Result", part1(cards));

    console.log("--- Part Two ---");
    console.log("Result", part2(cards));

  } catch (err) {
      console.error(err);
  }
})()
