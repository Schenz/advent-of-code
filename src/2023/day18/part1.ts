// Advent of Code - Day 18 - Part One

import { Point } from './Point';
import { polyArea } from './polyArea';

export const part1 = (input: string[]): number => {
    const startingLocation: Point = { x: 0, y: 0 };
    const visitedPoints = new Set<string>();
    const xCoordinates: number[] = [];
    const yCoordinates: number[] = [];
    const directionMap: { [key: string]: Point } = {
        u: { x: 1, y: 0 },
        d: { x: -1, y: 0 },
        r: { x: 0, y: 1 },
        l: { x: 0, y: -1 },
    };

    visitedPoints.add(`${startingLocation.x},${startingLocation.y}`);
    input.forEach((line) => {
        const [direction, distance] = line.split(' ');
        const currentDirection = directionMap[direction.toLowerCase()];
        const currentDistance = parseInt(distance, 10);

        for (let i = 0; i <= currentDistance; i++) {
            const newPoint: Point = {
                x: startingLocation.x + i * currentDirection.x,
                y: startingLocation.y + i * currentDirection.y,
            };

            visitedPoints.add(`${newPoint.x},${newPoint.y}`);
        }

        startingLocation.x += currentDistance * currentDirection.x;
        startingLocation.y += currentDistance * currentDirection.y;
        xCoordinates.push(startingLocation.x);
        yCoordinates.push(startingLocation.y);
    });

    const area = polyArea(xCoordinates, yCoordinates);
    const totalVisitedPoints = visitedPoints.size;
    const innerPointsCount = area + 1 - totalVisitedPoints / 2;

    return innerPointsCount + totalVisitedPoints;
};
