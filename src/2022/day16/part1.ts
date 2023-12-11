// Advent of Code - Day 16 - Part One

import { graphSearch } from './graphSearch';
import { readData } from './readData';

export const part1 = (data: string): number => {
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

    let answer1 = 0;

    graphSearch(
        30,
        nodesWithFlow,
        flowNodeIndexes,
        shortestPaths,
        flowRates,
        (item) => {
            answer1 = Math.max(item.total, answer1);
        }
    );

    return answer1;
};
