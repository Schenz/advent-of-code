// Advent of Code - Day 4 - Part One

export const part1 = (input: string[]): number => {
    let match = 0;

    input.forEach((value) => {
        const [first, second] = getPairs(value);

        if (first.from >= second.from && first.to <= second.to) {
            match++;
        } else if (second.from >= first.from && second.to <= first.to) {
            match++;
        }
    });

    return match;
};

const getPairs = (line: string): [Pair, Pair] => {
    const splitted = line.split(',');
    const first = splitted[0].split('-');
    const second = splitted[1].split('-');
    const firstPair: Pair = { from: Number(first[0]), to: Number(first[1]) };
    const secondPair: Pair = { from: Number(second[0]), to: Number(second[1]) };

    return [firstPair, secondPair];
};

interface Pair {
    from: number;
    to: number;
}
