// Advent of Code - Day 6 - Part Two

type Position = {
    y: number;
    x: number;
};
const DIRECTIONS = ['Top', 'Right', 'Bottom', 'Left'] as const;
type Direction = (typeof DIRECTIONS)[number];

export const part2 = (input: string[]): number => {
    let validObstructionsCount = 0;

    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === '.' && isLoop(placeObstruction(input, { y, x }))) {
                validObstructionsCount++;
            }
        }
    }

    return validObstructionsCount;
};

function isLoop(map: string[]): boolean {
    let position: Position = findStartingPosition(map);
    let prevPosition: Position = position;
    let direction: Direction = 'Top';
    let value: string | undefined = '^';

    const visitedPositions = new Set<string>();

    while (value !== undefined) {
        const positionAndDirection = `${position.y},${position.x},${direction}`;

        if (visitedPositions.has(positionAndDirection)) {
            return true;
        }

        visitedPositions.add(`${position.y},${position.x},${direction}`);

        prevPosition = position;
        position = getNextPosition(position, direction);
        value = getValueAtPosition(map, position);

        if (value === '#') {
            direction = rotate90Right(direction);
            position = prevPosition;
        }
    }

    return false;
}

function getNextPosition({ y, x }: Position, direction: Direction): Position {
    if (direction === 'Top') return { y: y - 1, x };
    if (direction === 'Right') return { y, x: x + 1 };
    if (direction === 'Bottom') return { y: y + 1, x };
    if (direction === 'Left') return { y, x: x - 1 };

    return { y, x };
}

function findStartingPosition(map: string[]): Position {
    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            const val = row[x];
            if (val === '^') {
                return { y, x };
            }
        }
    }

    throw 'starting position missing';
}

const getValueAtPosition = (map: string[], { y, x }: Position): string | undefined => map[y]?.[x]

const rotate90Right = (direction: Direction): Direction => DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length]

function placeObstruction(map: string[], { y, x }: Position): string[] {
    const newMap = [...map];
    const row = newMap[y];

    newMap[y] = row.slice(0, x) + '#' + row.slice(x + 1);

    return newMap;
}