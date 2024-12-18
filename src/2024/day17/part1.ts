// Advent of Code - Day 17 - Part One

import { Input } from './input';
import { runProgram } from './runProgram';

export const part1 = (input: Input): string => {
    return runProgram(input).output.join(',');
};
