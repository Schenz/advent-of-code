// Advent of Code - Day 8 - Part One

import { UnionFind } from '../../utils/UnionFind';
import { parsePoints, calculateEdges } from './utils';

export const part1 = (input: string[]): number => {
    const points = parsePoints(input);
    const edges = calculateEdges(points);
    const n = points.length;

    // Connect the closest pairs
    // For the example (20 boxes), make 10 connections
    // For the real input, make 1000 connections
    const uf = new UnionFind(n);
    const connectionsToMake = n === 20 ? 10 : Math.min(1000, edges.length);

    for (let k = 0; k < connectionsToMake; k++) {
        uf.union(edges[k].i, edges[k].j);
    }

    // Get circuit sizes
    const circuitSizes = uf.getSetSizes();

    // Sort in descending order
    circuitSizes.sort((a: number, b: number) => b - a);

    // Return product of three largest circuits
    return circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
};
