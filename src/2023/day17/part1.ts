// Advent of Code - Day 17 - Part One

import Heap from 'heap-js';
import { Step, cacheKey, direction, getNextPositions } from './types';

export const part1 = (input: string): number => {
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

    while (queue.size() >= 0) {
        const queueResult = queue.pop();

        if (queueResult !== undefined) {
            const [, [x, y, direction], heatLoss, steps] = queueResult;

            if (x === endX && y === endY) {
                return heatLoss;
            }

            const nextPositions = getNextPositions[direction](x, y)
                .filter(([, , newDirection]) =>
                    steps > 2 ? newDirection !== direction : true
                )
                .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

            for (const [nextX, nextY, nextDirection] of nextPositions) {
                const nextStep: Step = [
                    heatLoss + map[nextY][nextX] + endX - nextX + endY - nextY,
                    [nextX, nextY, nextDirection],
                    heatLoss + map[nextY][nextX],
                    nextDirection === direction ? steps + 1 : 1,
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
