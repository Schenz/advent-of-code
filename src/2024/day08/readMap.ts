import { Position } from '../../utils/dijkstra/Position';

export const readMap = (
    input: string[],
    antennas: Record<string, Position[]>,
    lenX: number
): number => {
    input.forEach((line, j) => {
        line.split('').forEach((char, i) => {
            if (char !== '.') {
                if (!antennas[char]) {
                    antennas[char] = [];
                }
                antennas[char].push([j, i]);
            }
            lenX = Math.max(lenX, i + 1);
        });
    });
    return lenX;
};
