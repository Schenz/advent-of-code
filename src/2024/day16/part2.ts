// Advent of Code - Day 16 - Part Two

import { processInput } from './utils';

export const part2 = (input: string[]): number => Object.keys(processInput(input).stops).length;
