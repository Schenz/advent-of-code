// Advent of Code - Day 17 - Part Two

import Heap from 'heap-js';
import { Step, cacheKey, direction, getNextPositions } from './types';

export const part2 = (input: string): number => {
    const map = input.split('\n').map((line) => line.split('').map(Number));
    const endX = map[0].length - 1;
    const endY = map.length - 1;

    const startX = 0;
    const startY = 0;

    const startingStepEast: Step = [0, [startX, startY, direction.e], 0, 0];
    const startingStepSouth: Step = [0, [startX, startY, direction.s], 0, 0];

    const queue = new Heap<Step>(([hA], [hB]) => hA - hB);

    queue.push(startingStepEast);
    queue.push(startingStepSouth);

    const visited = new Set<number>();

    while (queue.size() > 0) {
        const queueResult = queue.pop();

        if (queueResult !== undefined) {
            const [, [x, y, direction], heatLoss, steps] = queueResult;

            if (x === endX && y === endY) {
                if (steps < 4) {
                    continue;
                }
                return heatLoss;
            }

            const nextPositions = getNextPositions[direction](x, y)
                .filter(([, , newDirection]) => {
                    if (steps < 4) {
                        return newDirection === direction;
                    }

                    if (steps > 9) {
                        return newDirection !== direction;
                    }
                    return true;
                })
                .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

            for (const [nextX, nextY, newDirection] of nextPositions) {
                const nextStep: Step = [
                    heatLoss + map[nextY][nextX] + endX - nextX + endY - nextY,
                    [nextX, nextY, newDirection],
                    heatLoss + map[nextY][nextX],
                    newDirection === direction ? steps + 1 : 1,
                ];

                const key = cacheKey(nextStep);

                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push(nextStep);
                }
            }
        }
    }

    return -1;
};
