// Advent of Code - Day 22 - Part Two

import { parseAndArrangeBlocks } from './brickUtils';

export const part2 = (input: string[]): number => {
    const { bricks, kSupportsV, vSupportsK } = parseAndArrangeBlocks(input);

    return bricks.reduce((total, _, i) => {
        const falling = Array.from(kSupportsV[i])
            .filter((j) => vSupportsK[j].size === 1)
            .reduce((set, j) => {
                set.add(j);
                return set;
            }, new Set<number>([i]));

        const processQueue = (q: number[]): void => {
            if (q.length > 0) {
                const j = q.shift();

                if (j !== undefined) {
                    Array.from(kSupportsV[j]).forEach((k) => {
                        if (
                            !falling.has(k) &&
                            isSubset(vSupportsK[k], falling)
                        ) {
                            q.push(k);
                            falling.add(k);
                        }
                    });
                    processQueue(q);
                }
            }
        };

        processQueue(Array.from(falling));

        return total + falling.size - 1;
    }, 0);
};

const isSubset = (set1: Set<number>, set2: Set<number>): boolean =>
    [...set1].every((element) => set2.has(element));
