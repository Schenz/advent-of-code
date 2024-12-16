// Advent of Code - Day 15 - Part Two

import { addTuples, DIRECTIONS, DIRECTION_SYMBOLS, moveLeft, moveRight } from './common';

export const part2 = (input: string): number => {
    const [gridSection, movesSection] = input.split('\n\n');
    const gridLines = gridSection.split('\n');
    const moves = movesSection;
    let moveInstructions: [number, number][] = [];

    moveInstructions = moves
        .replace(/\n/g, '')
        .split('')
        .map((move) => DIRECTIONS[DIRECTION_SYMBOLS.indexOf(move)]);

    const wallPositions = new Set<string>();
    let boxPositions = new Set<string>();
    let robotPosition: [number, number] | undefined;

    // Parsing the grid and initializing walls, boxes, and robot position
    gridLines.forEach((line, rowIndex) => {
        for (let colIndex = 0; colIndex < line.length; colIndex++) {
            const char = line[colIndex];
            const col = colIndex * 2;

            if (char === '#') {
                wallPositions.add(`${rowIndex},${col}`);
                wallPositions.add(`${rowIndex},${col + 1}`);
            }

            if (char === 'O') {
                boxPositions.add(`${rowIndex},${col}`);
            }

            if (char === '@') {
                robotPosition = [rowIndex, col];
            }
        }
    });

    if (!robotPosition) {
        throw new Error('Robot position not found in input.');
    }

    // Function to push a box in a given direction
    const pushBox = (box: [number, number], direction: [number, number]): boolean | null => {
        const boxKey = `${box[0]},${box[1]}`;

        if (!boxPositions.has(boxKey)) {
            throw new Error('Box not found in boxes set.');
        }

        const nextPosition = addTuples(box, direction);
        const nextPositionKey = `${nextPosition[0]},${nextPosition[1]}`;

        if (wallPositions.has(nextPositionKey) || wallPositions.has(`${nextPosition[0]},${nextPosition[1] + 1}`)) {
            return null;
        }

        if (direction[0] !== 0) {
            // Moving up or down
            if (boxPositions.has(nextPositionKey)) {
                if (pushBox(nextPosition, direction) === null) {
                    return null;
                }
            }

            if (boxPositions.has(`${nextPosition[0]},${nextPosition[1] - 1}`)) {
                if (pushBox(moveLeft(nextPosition), direction) === null) {
                    return null;
                }
            }

            if (boxPositions.has(`${nextPosition[0]},${nextPosition[1] + 1}`)) {
                if (pushBox(moveRight(nextPosition), direction) === null) {
                    return null;
                }
            }
        } else if (direction[1] === 1) {
            // Pushing right
            if (boxPositions.has(`${nextPosition[0]},${nextPosition[1] + 1}`)) {
                if (pushBox(moveRight(nextPosition), direction) === null) {
                    return null;
                }
            }
        } else if (direction[1] === -1) {
            // Pushing left
            if (boxPositions.has(`${nextPosition[0]},${nextPosition[1] - 1}`)) {
                if (pushBox(moveLeft(nextPosition), direction) === null) {
                    return null;
                }
            }
        }

        boxPositions.delete(boxKey);
        boxPositions.add(nextPositionKey);
        return true;
    };

    // Simulating the moves
    moveInstructions.forEach((move) => {
        if (!robotPosition) {
            throw new Error('Robot position not found.');
        }

        boxPositions.forEach((box) => {
            const [x, y] = box.split(',').map(Number);

            if (wallPositions.has(`${x},${y + 1}`) || boxPositions.has(`${x},${y + 1}`)) {
                throw new Error('Invalid configuration: overlapping boxes or walls.');
            }
        });

        const nextPosition = addTuples(robotPosition, move);
        const nextPositionKey = `${nextPosition[0]},${nextPosition[1]}`;

        if (wallPositions.has(nextPositionKey)) {
            return;
        }

        if (boxPositions.has(nextPositionKey)) {
            const copy = new Set(boxPositions);

            if (pushBox(nextPosition, move) === null) {
                boxPositions = copy;
                return;
            }
        } else if (boxPositions.has(`${nextPosition[0]},${nextPosition[1] - 1}`)) {
            const copy = new Set(boxPositions);

            if (pushBox(moveLeft(nextPosition), move) === null) {
                boxPositions = copy;
                return;
            }
        }

        if (!boxPositions.has(nextPositionKey) && !boxPositions.has(`${nextPosition[0]},${nextPosition[1] - 1}`)) {
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
