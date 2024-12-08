// Advent of Code - Day 8 - Part Two

import { combinations } from './combinations';
import { Position } from '../../utils/dijkstra/Position';
import { readMap } from './readMap';

export const part2 = (input: string[]): number => {
    const antennas: Record<string, Position[]> = {};
    const lenY = input.length;
    const lenX = readMap(input, antennas, 0);

    const antinodes: number[][] = Array.from({ length: lenY }, () =>
        Array(lenX).fill(0)
    );

    for (const positions of Object.values(antennas)) {
        for (const [a, b] of combinations(positions, 2)) {
            const dist: Position = [b[0] - a[0], b[1] - a[1]];

            antinodes[a[0]][a[1]] = 1;
            antinodes[b[0]][b[1]] = 1;

            let n: Position = [a[0] - dist[0], a[1] - dist[1]];

            while (n[0] >= 0 && n[0] < lenY && n[1] >= 0 && n[1] < lenX) {
                antinodes[n[0]][n[1]] = 1;
                n = [n[0] - dist[0], n[1] - dist[1]];
            }

            n = [b[0] + dist[0], b[1] + dist[1]];
            while (n[0] >= 0 && n[0] < lenY && n[1] >= 0 && n[1] < lenX) {
                antinodes[n[0]][n[1]] = 1;
                n = [n[0] + dist[0], n[1] + dist[1]];
            }
        }
    }

    return antinodes.reduce(
        (total, row) => total + row.reduce((sum, value) => sum + value, 0),
        0
    );
};
