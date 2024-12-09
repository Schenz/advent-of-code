// Advent of Code - Day 6 - Part Two

import { Position } from '../../utils/dijkstra/Position';

const DIRECTIONS = ['Top', 'Right', 'Bottom', 'Left'] as const;

type Direction = (typeof DIRECTIONS)[number];

export const part2 = (input: string[]): number => {
    let validObstructionsCount = 0;

    for (let y = 0; y < input.length; y++) {
        const row = input[y];

        for (let x = 0; x < row.length; x++) {
            if (row[x] === '.' && isLoop(placeObstruction(input, [y, x]))) {
                validObstructionsCount++;
            }
        }
    }

    return validObstructionsCount;
};

const isLoop = (map: string[]): boolean => {
    let position: Position = findStartingPosition(map);
    let prevPosition: Position = position;
    let direction: Direction = 'Top';
    let value: string | undefined = '^';

    const visitedPositions = new Set<string>();

    while (value !== undefined) {
        const positionAndDirection = `${position[0]},${position[1]},${direction}`;

        if (visitedPositions.has(positionAndDirection)) {
            return true;
        }

        visitedPositions.add(`${position[0]},${position[1]},${direction}`);

        prevPosition = position;
        position = getNextPosition(position, direction);
        value = getValueAtPosition(map, position);

        if (value === '#') {
            direction = rotate90Right(direction);
            position = prevPosition;
        }
    }

    return false;
};

const getNextPosition = (
    position: Position,
    direction: Direction
): Position => {
    if (direction === 'Top') {
        return [position[0] - 1, position[1]];
    }

    if (direction === 'Right') {
        return [position[0], position[1] + 1];
    }

    if (direction === 'Bottom') {
        return [position[0] + 1, position[1]];
    }

    if (direction === 'Left') {
        return [position[0], position[1] - 1];
    }

    return position;
};

const findStartingPosition = (map: string[]): Position => {
    for (let y = 0; y < map.length; y++) {
        const row = map[y];

        for (let x = 0; x < row.length; x++) {
            const val = row[x];

            if (val === '^') {
                return [y, x];
            }
        }
    }

    throw 'starting position missing';
};

const getValueAtPosition = (
    map: string[],
    position: Position
): string | undefined => map[position[0]]?.[position[1]];

const rotate90Right = (direction: Direction): Direction =>
    DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length];

const placeObstruction = (map: string[], position: Position): string[] => {
    const newMap = [...map];
    const row = newMap[position[0]];

    newMap[position[0]] =
        row.slice(0, position[1]) + '#' + row.slice(position[1] + 1);

    return newMap;
};
