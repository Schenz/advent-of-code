// Advent of Code - Day 9 - Part One

import { parsePoints, rectangleArea } from './helpers';

export const part1 = (input: string[]): number => {
    const points = parsePoints(input);

    let maxArea = 0;

    for (let i = 0; i < points.length; i++) {
        const [x1, y1] = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const [x2, y2] = points[j];
            const area = rectangleArea([x1, y1], [x2, y2]);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    return maxArea;
};
