type Position = { x: number; y: number };

export const findStartAndEndPositions = (grid: string[][]): { startPos: Position; endPos: Position } => {
    let startPos: Position = { x: 0, y: 0 };
    let endPos: Position = { x: 0, y: 0 };

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'S') {
                startPos = { x, y };
            } else if (grid[y][x] === 'E') {
                endPos = { x, y };
            }
        }
    }

    return { startPos, endPos };
};

export const calculateSkips = (pathPositions: Position[], maxDistance: number, minSaved: number): number => {
    let skips = 0;
    const savedArr: { [key: number]: number } = {};

    for (let firstPos = 0; firstPos < pathPositions.length - 1; firstPos++) {
        for (let secondPos = firstPos + 1; secondPos < pathPositions.length; secondPos++) {
            const savedBySkipping: number = secondPos - firstPos;

            const xDiff: number = Math.abs(pathPositions[firstPos].x - pathPositions[secondPos].x);
            const yDiff: number = Math.abs(pathPositions[firstPos].y - pathPositions[secondPos].y);

            if (xDiff + yDiff <= maxDistance) {
                const saved: number = savedBySkipping - (xDiff + yDiff);

                if (saved >= minSaved) {
                    skips++;

                    savedArr[saved] = savedArr[saved] ? savedArr[saved] + 1 : 1;
                }
            }
        }
    }

    return skips;
};

export const findPathPositions = (startPos: Position, endPos: Position, grid: string[][]): Position[] => {
    const pathPositions: Position[] = [];
    const visited: Set<string> = new Set();
    const queue: Position[] = [{ ...startPos }];

    while (queue.length > 0) {
        const current = queue.shift();

        if (!current) {
            continue;
        }

        const { x, y } = current;

        pathPositions.push({ x, y });

        //if its the end,stop
        if (x === endPos.x && y === endPos.y) {
            break;
        }

        //mark as visited
        visited.add(`${x},${y}`);

        const nei: [number, number][] = getNeighborsLocationWithCondition(x, y, grid, (x, y, v) => {
            return v !== '#' && !visited.has(`${x},${y}`);
        });

        if (nei.length > 0) {
            queue.push({ x: nei[0][0], y: nei[0][1] });
        }
    }

    return pathPositions;
};

const getNeighborsLocationWithCondition = (
    x: number,
    y: number,
    grid: string[][],
    condition: (x: number, y: number, value: string) => boolean
): [number, number][] => {
    const neighbors: ([number, number] | null)[] = [
        //orth
        x > 0 ? [x - 1, y] : null,
        x < grid[0].length - 1 ? [x + 1, y] : null,
        y > 0 ? [x, y - 1] : null,
        y < grid.length - 1 ? [x, y + 1] : null,
        //diag
        x > 0 && y > 0 ? [x - 1, y - 1] : null,
        x > 0 && y < grid.length - 1 ? [x - 1, y + 1] : null,
        x < grid[0].length - 1 && y > 0 ? [x + 1, y - 1] : null,
        x < grid[0].length - 1 && y < grid.length - 1 ? [x + 1, y + 1] : null,
    ];

    return neighbors.filter((k): k is [number, number] => k !== null && condition(k[0], k[1], grid[k[1]][k[0]]));
};
