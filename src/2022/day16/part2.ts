// Advent of Code - Day 16 - Part Two

import { graphSearch } from './graphSearch';
import { readData } from './readData';

export const part2 = (data: string): number => {
    const {
        nodesWithFlow,
        flowNodeIndexes,
        shortestPaths,
        flowRates,
    }: {
        nodesWithFlow: string[];
        flowNodeIndexes: Record<string, number>;
        shortestPaths: Record<string, number>;
        flowRates: Record<string, number>;
    } = readData(data);

    let answer2 = 0;
    const bestAt26 = new Map<number, number>();

    graphSearch(
        26,
        nodesWithFlow,
        flowNodeIndexes,
        shortestPaths,
        flowRates,
        (item) => {
            bestAt26.set(
                item.openMask,
                Math.max(bestAt26.get(item.openMask) ?? 0, item.total)
            );
        }
    );

    for (const [openMask1, best1] of bestAt26) {
        for (const [openMask2, best2] of bestAt26) {
            const overlap = openMask1 & openMask2;

            if (overlap !== 0) {
                continue;
            }
            answer2 = Math.max(answer2, best1 + best2);
        }
    }

    return answer2;
};
