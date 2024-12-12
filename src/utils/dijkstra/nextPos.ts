import { Position } from './Position';

export const nextPos = (curr: Position, occupied: Set<string>, maxDepth?: number): Position | 'stop' => {
    if (maxDepth !== undefined) {
        const down = [curr[0], curr[1] + 1] as Position;
        const downLeft = [curr[0] - 1, curr[1] + 1] as Position;
        const downRight = [curr[0] + 1, curr[1] + 1] as Position;

        if (!occupied.has(down.toString()) && down[1] < maxDepth) {
            return down;
        }

        if (!occupied.has(downLeft.toString()) && down[1] < maxDepth) {
            return downLeft;
        }

        if (!occupied.has(downRight.toString()) && down[1] < maxDepth) {
            return downRight;
        }
    } else {
        const directions: Position[] = [
            [0, 1], // down
            [-1, 1], // downLeft
            [1, 1], // downRight
        ];

        for (const direction of directions) {
            const [dx, dy] = direction;
            const newPos: Position = [curr[0] + dx, curr[1] + dy];

            if (!occupied.has(newPos.toString())) {
                return newPos;
            }
        }
    }

    return 'stop';
};
