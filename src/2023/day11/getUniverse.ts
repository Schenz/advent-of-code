import { Position } from '../../utils/dijkstra/Position';
import { Space } from './space';

export const getUniverse = (input: string): Space => {
    let width = 0,
        height = 0;
    const galaxies: Position[] = [];

    for (const line of input.trim().split(/\n/)) {
        for (const m of line.matchAll(/#/g)) {
            galaxies.push([height, m.index] as Position);
        }
        width = line.length;
        height++;
    }
    return { width, height, galaxies };
};
