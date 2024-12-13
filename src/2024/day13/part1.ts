// Advent of Code - Day 13 - Part One

import { getLowestScore } from './getLowestScore';
import { parseInput } from './parseInput';

export const part1 = (input: string): number => parseInput(input).reduce(getLowestScore, 0);
