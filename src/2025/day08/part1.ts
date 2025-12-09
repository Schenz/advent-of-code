// Advent of Code - Day 8 - Part One

import { UnionFind } from '../../utils/UnionFind';
import { parsePoints, calculateEdges } from './utils';

// Per problem requirements:
// - Example input (20 boxes): make 10 connections
// - Real input: make 1000 connections
const EXAMPLE_CONNECTIONS = 10;
const REAL_CONNECTIONS = 1000;

export const part1 = (input: string[]): number => {
    const points = parsePoints(input);
    const edges = calculateEdges(points);
    const n = points.length;

    // Determine which connection count to use based on input size
    // Example input has 20 boxes, real input has ~1000 boxes
    const connections =
        n <= 100 ? EXAMPLE_CONNECTIONS : Math.min(REAL_CONNECTIONS, edges.length);

    const uf = new UnionFind(n);

    for (let k = 0; k < connections; k++) {
        uf.union(edges[k].i, edges[k].j);
    }

    // Get circuit sizes
    const circuitSizes = uf.getSetSizes();

    // Sort in descending order
    circuitSizes.sort((a: number, b: number) => b - a);

    // Return product of three largest circuits
    return circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
};
