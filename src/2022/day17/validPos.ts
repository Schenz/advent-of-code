import { Position } from '../../utils/dijkstra/Position';
import { Shape } from './Shape';

export const validPos = (pos: Position, shape: Shape, map: Map<string, boolean>): boolean => {
    if (pos[1] < 0) {
        return false;
    }

    if (pos[0] < 0 || pos[0] + shape.width > 7) {
        return false;
    }
    for (let i = 0; i < shape.form.length; i++) {
        for (let j = 0; j < shape.form[0].length; j++) {
            if (shape.form[i][j] === '#') {
                if (map.has([pos[0] + j, pos[1] + i].toString())) {
                    return false;
                }
            }
        }
    }
    return true;
};
