import { Point } from './Point';
import { Position } from './Position';

export const getNeightbors = (from: Position, map: Point[][]): Position[] => {
    return [
        [from[0] - 1, from[1]],
        [from[0], from[1] - 1],
        [from[0] + 1, from[1]],
        [from[0], from[1] + 1],
    ].filter(([x, y]) => x >= 0 && y >= 0 && x < map.length && y < map[0].length) as Position[];
};
