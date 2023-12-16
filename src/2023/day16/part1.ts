// Advent of Code - Day 16 - Part One

import { Matrix } from '../../utils/matrix';
import { energize } from './energize';

export const part1 = (input: string): number =>
    energize(Matrix.parse(input), 0, 0, 1, 0);
