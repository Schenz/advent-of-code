import { Position } from '../../utils/dijkstra/Position';

export const calculateDistance = (from: Position, to: Position): number =>
    Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
