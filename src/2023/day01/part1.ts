// Advent of Code - Day 1 - Part One

export function part1(input: string[]): number {
  return input.reduce((acc, line) => {
    const digits = line.split('').map(char => parseInt(char)).filter(n => !!n);
    return acc + Number('' + digits[0] + digits.at(-1));
  }, 0);
}
