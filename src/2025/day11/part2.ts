// Advent of Code - Day 11 - Part Two

import { countPathsWithRequiredNodes } from '../../utils/graphTraversal';

export const part2 = (input: string[]): number => {
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

    // Determine the starting node: use 'svr' if it exists (test case), otherwise 'you' (real data)
    const startNode = graph.has('svr') ? 'svr' : 'you';

    // Count all paths that visit both 'dac' and 'fft'
    return countPathsWithRequiredNodes(graph, startNode, 'out', ['dac', 'fft']);
};
