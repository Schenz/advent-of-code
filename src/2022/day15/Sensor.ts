import { Position } from '../../utils/dijkstra/Position';

export type Sensor = {
    pos: Position;
    beacon: Position;
    view: number;
};
