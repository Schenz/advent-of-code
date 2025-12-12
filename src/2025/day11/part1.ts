// Advent of Code - Day 11 - Part One

import { countAllPaths } from '../../utils/graphTraversal';

export const part1 = (input: string[]): number => {
    // Parse the graph from input
    const graph: Map<string, string[]> = new Map();

    for (const line of input) {
        const trimmed = line.trim();

        if (!trimmed) {
            continue;
        }

        const [source, destStr] = trimmed.split(':');
        const destinations = destStr
            .split(' ')
            .map((d) => d.trim())
            .filter((d) => d.length > 0);

        graph.set(source.trim(), destinations);
    }

    // Count all paths from 'you' to 'out'
    return countAllPaths(graph, 'you', 'out');
};
