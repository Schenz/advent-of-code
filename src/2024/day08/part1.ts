// Advent of Code - Day 8 - Part One

import { Position } from '../../utils/dijkstra/Position';
import { readMap } from './readMap';

export const part1 = (input: string[]): number => {
    const antennas: Record<string, Position[]> = {};
    const lenY = input.length;
    const lenX = readMap(input, antennas, 0);

    // Create the antinodes grid
    const antinodes: number[][] = Array.from({ length: lenY }, () => Array(lenX).fill(0));

    // Calculate antinodes using all permutations of antenna positions
    for (const positions of Object.values(antennas)) {
        for (let a = 0; a < positions.length; a++) {
            for (let b = 0; b < positions.length; b++) {
                if (a === b) {
                    continue;
                }

                const [x1, y1] = positions[a];
                const [x2, y2] = positions[b];

                const dist = [x2 - x1, y2 - y1];
                const n = [x1 - dist[0], y1 - dist[1]];

                if (n[0] >= 0 && n[0] < lenY && n[1] >= 0 && n[1] < lenX) {
                    antinodes[n[0]][n[1]] = 1;
                }
            }
        }
    }

    return antinodes.reduce((total, row) => total + row.reduce((sum, value) => sum + value, 0), 0);
};
