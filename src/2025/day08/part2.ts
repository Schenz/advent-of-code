// Advent of Code - Day 8 - Part Two

import { UnionFind } from '../../utils/UnionFind';
import { parsePoints, calculateEdges } from './utils';

export const part2 = (input: string[]): number => {
    const points = parsePoints(input);
    const edges = calculateEdges(points);
    const n = points.length;

    // Connect pairs until all are in one circuit
    const uf = new UnionFind(n);
    let lastConnectionIndices: [number, number] = [0, 0];

    for (const edge of edges) {
        // Try to union the two nodes
        const wasUnioned = uf.union(edge.i, edge.j);

        // If they were actually connected (not already in same set)
        if (wasUnioned) {
            lastConnectionIndices = [edge.i, edge.j];

            // Check if all nodes are now in one circuit
            if (uf.getSetCount() === 1) {
                break;
            }
        }
    }

    // Return product of X coordinates of the last two connected junction boxes
    const [i, j] = lastConnectionIndices;
    return points[i][0] * points[j][0];
};
