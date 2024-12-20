export const parseInput = (rawInput: string): number[][] =>
    rawInput.split('\n').map((line) => line.split(',').map(Number));
