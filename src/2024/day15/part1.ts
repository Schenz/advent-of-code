// Advent of Code - Day 15 - Part One

import { addTuples, DIRECTIONS, DIRECTION_SYMBOLS } from './common';

export const part1 = (input: string): number => {
    const [gridSection, movesSection] = input.split('\n\n');
    const gridLines = gridSection.split('\n');
    const moves = movesSection;
    let moveInstructions: [number, number][] = [];

    moveInstructions = moves
        .replace(/\n/g, '')
        .split('')
        .map((move) => DIRECTIONS[DIRECTION_SYMBOLS.indexOf(move)]);

    const wallPositions = new Set<string>();
    const boxPositions = new Set<string>();
    let robotPosition: [number, number] | undefined;

    // Parsing the grid and initializing walls, boxes, and robot position
    gridLines.forEach((line, rowIndex) => {
        for (let colIndex = 0; colIndex < line.length; colIndex++) {
            const char = line[colIndex];

            if (char === '#') {
                wallPositions.add(`${rowIndex},${colIndex}`);
            }

            if (char === 'O') {
                boxPositions.add(`${rowIndex},${colIndex}`);
            }

            if (char === '@') {
                robotPosition = [rowIndex, colIndex];
            }
        }
    });

    if (!robotPosition) {
        throw new Error('Robot position not found in input.');
    }

    // Function to push a box in a given direction
    const pushBox = (box: [number, number], direction: [number, number]): boolean => {
        const nextPosition = addTuples(box, direction);
        const nextPositionKey = `${nextPosition[0]},${nextPosition[1]}`;
        const boxKey = `${box[0]},${box[1]}`;

        if (wallPositions.has(nextPositionKey)) {
            return false;
        }

        if (boxPositions.has(nextPositionKey)) {
            if (!pushBox(nextPosition, direction)) {
                return false;
            }
        }
        boxPositions.delete(boxKey);
        boxPositions.add(nextPositionKey);
        return true;
    };

    moveInstructions.forEach((move) => {
        if (!robotPosition) {
            return;
        }
        const nextPosition = addTuples(robotPosition, move);
        const nextPositionKey = `${nextPosition[0]},${nextPosition[1]}`;

        if (wallPositions.has(nextPositionKey)) {
            return;
        }

        if (boxPositions.has(nextPositionKey)) {
            if (!pushBox(nextPosition, move)) {
                return;
            }
        }

        if (!boxPositions.has(nextPositionKey)) {
            robotPosition = nextPosition;
        }
    });

    // Calculating the final result
    let result = 0;

    boxPositions.forEach((box) => {
        const [x, y] = box.split(',').map(Number);

        result += 100 * x + y;
    });

    return result;
};
