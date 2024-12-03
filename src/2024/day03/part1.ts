// Advent of Code - Day 3 - Part One

export const part1 = (input: string[]): number => input.reduce((sum, line) => {
    const matches = line.match(/mul\(\d+,\d+\)/g);
    if (!matches) return sum;

    return sum + matches.reduce((acc, match) => {
        const [a, b] = match.slice(4, -1).split(',').map(Number);
        return acc + (a * b);
    }, 0);;
}, 0);
