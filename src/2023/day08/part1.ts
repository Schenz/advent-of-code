// Advent of Code - Day 8 - Part One

export const part1 = (input: string[]): number => {
    const moves = input[0].split('');
    const map = parse(input);
    let pos = 'AAA';
    for (let i = 0; ; i++) {
        const m = moves[i % moves.length];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pos = map.get(pos)![m === 'L' ? 0 : 1];
        if (pos === 'ZZZ') {
            return i + 1;
        }
    }
};

export const parse = (input: string[]): Map<string, string[]> => {
    const map = new Map(
        input
            .map((l) => l.replaceAll(/= \(|,|\)/g, '').split(' '))
            .map((l) => [l[0], l.slice(1)])
    );
    return map;
};
