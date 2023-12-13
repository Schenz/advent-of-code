// Advent of Code - Day 4 - Part Two

export const part2 = (input: string[]): number => {
    let match = 0;

    input.forEach((value) => {
        const [first, second] = getPairs(value);
        const firstSeries = createSeries(first.from, first.to);
        const secondSeries = createSeries(second.from, second.to);

        firstSeries.every((num) => {
            if (secondSeries.includes(num)) {
                match++;
                return false;
            }
            return true;
        });
    });

    return match;
};

const createSeries = (start: number, end: number): number[] => {
    const numbers: number[] = [];

    for (start; start <= end; start++) {
        numbers.push(start);
    }
    return numbers;
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
