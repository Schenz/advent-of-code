// Advent of Code - Day 18 - Part Two

import { Point } from './Point';
import { polyArea } from './polyArea';

export const part2 = (input: string[]): number => {
    const directions: Point[] = [
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
    ];
    let currentLocation: Point = { x: 0, y: 0 };
    let totalPoints = 0;
    const xCoordinates: number[] = [];
    const yCoordinates: number[] = [];

    input.forEach((line) => {
        const [, , hexValue] = line.split(' ');

        const currentDirection =
            directions[parseInt(hexValue.charAt(hexValue.length - 2), 10)];
        const currentLength = parseInt(
            hexValue.substring(hexValue.length - 7, hexValue.length - 2),
            16
        );

        totalPoints += currentLength;
        currentLocation = {
            x: currentLocation.x + currentLength * currentDirection.x,
            y: currentLocation.y + currentLength * currentDirection.y,
        };
        xCoordinates.push(currentLocation.x);
        yCoordinates.push(currentLocation.y);
    });

    const area = polyArea(xCoordinates, yCoordinates);
    const totalPointsCount = totalPoints;

    // area = innerPointsCount + totalPointsCount / 2 - 1 -> innerPointsCount = area + 1 - totalPointsCount / 2
    if (totalPointsCount % 2 !== 0) {
        throw new Error('Assertion failed: totalPointsCount must be even.');
    }

    const innerPointsCount = area + 1 - totalPointsCount / 2;

    return innerPointsCount + totalPointsCount;
};
