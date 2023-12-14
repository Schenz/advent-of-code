import { Position } from '../../utils/dijkstra/Position';
import { Space } from './space';

export const calculateDistance = (
    universe: Space,
    emptyRows: boolean[],
    emptyCols: boolean[],
    rate: number
): number => {
    const distance = (p1: Position, p2: Position): number => {
        const r1 = Math.min(p1[0], p2[0]);
        const r2 = Math.max(p1[0], p2[0]);
        const c1 = Math.min(p1[1], p2[1]);
        const c2 = Math.max(p1[1], p2[1]);
        let result = r2 - r1 + (c2 - c1);

        result += Array.from({ length: r2 - r1 }, (_, r) =>
            emptyRows[r1 + r] ? rate : 0
        ).reduce((acc, val) => acc + val, 0);

        result += Array.from({ length: c2 - c1 }, (_, c) =>
            emptyCols[c1 + c] ? rate : 0
        ).reduce((acc, val) => acc + val, 0);

        return result;
    };

    const galaxies = universe.galaxies;
    const totalDistance = galaxies
        .flatMap((p1, i) => galaxies.slice(i + 1).map((p2) => distance(p1, p2)))
        .reduce((acc, val) => acc + val, 0);

    return totalDistance;
};
