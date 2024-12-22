// Advent of Code - Day 22 - Part Two

import { randomNumber } from './randomNumber';

export const part2 = (input: string[]): number => {
    const ranges: { [key: string]: number[] } = {};

    input
        .map((num) => BigInt(num))
        .forEach((num) => {
            let seed = num;
            const visited = new Set<string>();
            const changes: number[] = [];

            for (let i = 0; i < 2000; i++) {
                const nextSeed = randomNumber(seed);

                changes.push(Number((nextSeed % 10n) - (seed % 10n)));
                seed = nextSeed;

                if (changes.length === 4) {
                    const key = changes.join(',');

                    if (!visited.has(key)) {
                        if (ranges[key] === undefined) {
                            ranges[key] = [];
                        }
                        ranges[key].push(Number(nextSeed % 10n));
                        visited.add(key);
                    }
                    changes.shift();
                }
            }
        });

    return Math.max(...Object.values(ranges).map((range) => range.reduce((sum, num) => sum + num, 0)));
};
